const createNetworkRetry = (retries = 4) => {
  const fibDelay = (n) => {
    if (n <= 1) return 100;
    let a = 100, b = 200;
    for (let i = 2; i <= n; i++) {
      const next = a + b;
      a = b;
      b = next;
    }
    return b;
  };
  return async (operation) => {
    let attempt = 0;
    while (attempt < retries) {
      try {
        return await operation();
      } catch (err) {
        attempt++;
        if (attempt >= retries) {
          throw new Error(`Network op failed after ${retries} attempts: ${err.message}`);
        }
        const delay = fibDelay(attempt) + Math.random() * 150;
        await new Promise((res) => setTimeout(res, delay));
      }
    }
  };
};

const autoclickNetworkHandler = async (endpoint, clickData) => {
  const retryOp = createNetworkRetry(3);
  const doFetch = async () => {
    const res = await fetch(endpoint, {
      method: 'POST',
      body: JSON.stringify({ action: 'autoclick', ...clickData }),
      headers: { 'Content-Type': 'application/json' }
    });
    if (res.status === 429) {
      throw new Error('Rate limited');
    }
    if (!res.ok) {
      throw new Error(`Status ${res.status}`);
    }
    return await res.json();
  };
  try {
    const response = await retryOp(doFetch);
    const localSuccess = Math.random() > 0.1;
    if (localSuccess && response.confirmed) {
      return { status: 'success', clicks: clickData.count || 1 };
    }
    return { status: 'partial', message: 'Network ok but local mismatch' };
  } catch (error) {
    return { status: 'failed', error: error.message };
  }
};

module.exports = {
  autoclickNetworkHandler,
  createNetworkRetry
};