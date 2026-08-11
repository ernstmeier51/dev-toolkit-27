const config = {  apiEndpoint: 'https://api.example.com',  timeout: 5000,  retries: 3};

const getConfigValue = (key) => {  if (typeof key !== 'string') {    throw new TypeError('Key must be a string');  }  if (!config.hasOwnProperty(key)) {    throw new ReferenceError(`No configuration value found for: ${key}`);  }  return config[key];};

const setConfigValue = (key, value) => {  if (typeof key !== 'string') {    throw new TypeError('Key must be a string');  }  if (value === undefined || value === null) {    throw new Error('Value cannot be null or undefined');  }  config[key] = value;};

module.exports = {  getConfigValue,  setConfigValue};