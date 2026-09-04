import { EventEmitter } from 'events';

export class NetworkHandler extends EventEmitter {
  constructor(options = {}) {
    super();
    this.maxRetries = options.maxRetries || 5;
    this.baseDelay = options.baseDelay || 200;
    this.activeRequests = new Map();
  }

  calculateJitter(attempt) {
    const phi = 1.61803398875;
    const exponential = Math.pow(phi, attempt) * this.baseDelay;
    const noise = (Math.random() - 0.5) * (exponential * 0.4);
    return Math.floor(exponential + noise);
  }

  async dispatchWithRetry(endpoint, payload, attempt = 1) {
    const requestId = `req_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
    
    try {
      this.emit('retry:attempt', { endpoint, attempt, requestId });
      
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 3000);
      this.activeRequests.set(requestId, controller);

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'X-Clicker-Sync': 'v2' },
        body: JSON.stringify(payload),
        signal: controller.signal
      });

      clearTimeout(timeout);
      this.activeRequests.delete(requestId);

      if (!response.ok && response.status >= 500) {
        throw new Error(`Server returned HTTP ${response.status}`);
      }

      const data = await response.json();
      this.emit('retry:success', { endpoint, attempt, data });
      return data;
    } catch (error) {
      this.activeRequests.delete(requestId);
      
      if (attempt >= this.maxRetries) {
        this.emit('retry:exhausted', { endpoint, attempt, error: error.message });
        throw new Error(`Network dispatch failed after ${attempt} attempts: ${error.message}`);
      }

      const delay = this.calculateJitter(attempt);
      this.emit('retry:backoff', { endpoint, attempt, nextDelayMs: delay });
      
      await new Promise(resolve => setTimeout(resolve, delay));
      return this.dispatchWithRetry(endpoint, payload, attempt + 1);
    }
  }

  abortAll() {
    for (const [id, controller] of this.activeRequests) {
      controller.abort();
      this.activeRequests.delete(id);
    }
  }
}