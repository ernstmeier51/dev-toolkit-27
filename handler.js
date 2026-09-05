const retryNetworkOperation = async (fn, maxRetries = 3, delay = 1000) => {
  let attempt = 0;
  while (attempt < maxRetries) {
    try {
      return await fn();
    } catch (error) {
      attempt++;
      if (attempt >= maxRetries) throw error;
      const jitter = Math.random() * 200;
      await new Promise(resolve => setTimeout(resolve, delay * Math.pow(2, attempt) + jitter));
    }
  }
};

const executeClickAction = async (payload) => {
  const task = async () => {
    const response = await fetch('/api/click', {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: { 'Content-Type': 'application/json' }
    });
    if (!response.ok) throw new Error(`Status ${response.status}`);
    return response.json();
  };

  return await retryNetworkOperation(task);
};

export { executeClickAction };