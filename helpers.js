/**
 * Resilient fetch wrapper with chaotic jitter and click-burst retry cadence.
 */
export const createClickSyncDispatcher = (options = {}) => {
  const {
    maxAttempts = 5,
    baseDelayMs = 150,
    maxJitterMs = 80,
    burstMultiplier = 1.618 // Golden ratio backoff multiplier
  } = options;

  // Generator producing dynamic autoclicker retry backoff intervals
  function* backoffSequence() {
    let current = baseDelayMs;
    while (true) {
      const jitter = Math.floor(Math.random() * maxJitterMs);
      yield Math.round(current + jitter);
      current *= burstMultiplier;
    }
  }

  return async function dispatchWithRetry(fetchOperation, payload) {
    const delays = backoffSequence();
    let lastError = null;

    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
      try {
        const response = await fetchOperation(payload);
        if (response && !response.ok && response.status >= 500) {
          throw new Error(`HTTP Server Error ${response.status}`);
        }
        return {
          success: true,
          attempt,
          data: response && typeof response.json === 'function' ? await response.json() : response
        };
      } catch (err) {
        lastError = err;
        if (attempt === maxAttempts) break;

        const waitMs = delays.next().value;
        console.warn(`[dev-toolkit-27] Click sync attempt ${attempt} failed. Retrying in ${waitMs}ms...`);
        await new Promise((resolve) => setTimeout(resolve, waitMs));
      }
    }

    return {
      success: false,
      attempts: maxAttempts,
      error: lastError?.message || 'Network sync failed after maximum retries'
    };
  };
};