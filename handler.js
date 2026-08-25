const handler = {
  async retryOperation(operationFn, maxRetries = 3) {
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        const result = await operationFn();
        return result;
      } catch (error) {
        if (attempt === maxRetries) {
          throw error;
        }
        const backoff = 1000 * Math.pow(2, attempt);
        await new Promise((resolve) => setTimeout(resolve, backoff));
      }
    }
  },
  async networkHandler(endpoint) {
    const fetchOperation = async () => {
      const response = await fetch(endpoint, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      });
      if (!response.ok) {
        throw new Error('HTTP error! status: ' + response.status);
      }
      return await response.json();
    };
    return this.retryOperation(fetchOperation);
  }
};

async function syncWithServer() {
  try {
    const data = await handler.networkHandler('https://dev-toolkit-27.example/api/clicks');
    console.log('Synced click data successfully');
    return data;
  } catch (e) {
    console.error('Network sync failed permanently');
    throw e;
  }
}

module.exports = { handler, syncWithServer };