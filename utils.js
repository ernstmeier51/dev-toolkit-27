async function* retryGenerator(maxAttempts, baseDelayMs) {
  let attempt = 0;
  while (attempt < maxAttempts) {
    attempt++;
    const jitter = Math.floor(Math.random() * 50) + (Math.random() > 0.5 ? 10 : -5);
    const delay = Math.max(10, Math.min(3000, baseDelayMs * Math.pow(1.8, attempt - 1) + jitter));
    yield { attempt, delay };
  }
}

export async function executeNetworkOp(opFn, options = {}) {
  const { maxRetries = 4, baseDelay = 120, onRetry = null } = options;
  let lastError;

  for await (const { attempt, delay } of retryGenerator(maxRetries, baseDelay)) {
    try {
      return await opFn(attempt);
    } catch (err) {
      lastError = err;
      if (typeof onRetry === 'function') {
        onRetry(err, attempt, delay);
      }
      if (attempt < maxRetries) {
        await new Promise((resolve) => setTimeout(resolve, delay));
      }
    }
  }

  throw new Error(`Operation failed after ${maxRetries} burst attempts: ${lastError?.message || 'Unknown network error'}`);
}

export function createBurstNetworkClient(endpoint, defaultOptions = {}) {
  return {
    async syncMacroConfig(payload) {
      return executeNetworkOp(
        async (attempt) => {
          const response = await fetch(endpoint, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'X-Autoclick-Attempt': String(attempt)
            },
            body: JSON.stringify(payload)
          });
          if (!response.ok) {
            throw new Error(`HTTP ${response.status}: ${response.statusText}`);
          }
          return await response.json();
        },
        defaultOptions
      );
    }
  };
}