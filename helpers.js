// Function to generate a random ID
function generateId(length = 8) {
    return Math.random().toString(36).substr(2, length);
}

// Function to debounce another function
function debounce(func, delay) {
    let timeoutId;
    return function(...args) {
        if (timeoutId) {
            clearTimeout(timeoutId);
        }
        timeoutId = setTimeout(() => {
            func.apply(this, args);
        }, delay);
    };
}

// Function to merge two objects deeply
function deepMerge(target, source) {
    for (const key in source) {
        if (source[key] instanceof Object) {
            Object.assign(source[key], deepMerge(target[key], source[key]));
        }
    }
    Object.assign(target || {}, source);
    return target;
}

// Function to check if a value is promise
function isPromise(value) {
    return value && typeof value.then === 'function';
}

// Function to format date in 'YYYY-MM-DD' format
function formatDate(date) {
    const d = new Date(date);
    return d.toISOString().split('T')[0];
}

// Function to get unique values from an array
function uniqueArray(arr) {
    return [...new Set(arr)];
}
