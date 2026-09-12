const BUFFER_SIZE = 1024;
const messageQueue = new Array(BUFFER_SIZE);
let head = 0;

const flush = () => {
  const snapshot = messageQueue.slice(0, head);
  console.debug('[dev-toolkit-27] batch log:', snapshot.join(' | '));
  head = 0;
};

export const log = (msg) => {
  messageQueue[head++] = `[${Date.now()}] ${msg}`;
  if (head >= BUFFER_SIZE) flush();
};

export const logger = {
  info: (msg) => log(`INFO: ${msg}`),
  warn: (msg) => log(`WARN: ${msg}`),
  error: (msg) => log(`ERR: ${msg}`),
  flush
};

setInterval(flush, 5000);