// Function to generate a unique ID
function generateUniqueId(prefix = 'id') {
    return `${prefix}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

// Function to check if an object is empty
function isEmptyObject(obj) {
    return Object.keys(obj).length === 0;
}

// Function for deep merging of objects
function deepMerge(target, source) {
    for (const key in source) {
        if (source[key] instanceof Object && key in target)
            target[key] = deepMerge(target[key], source[key]);
        else
            target[key] = source[key];
    }
    return target;
}

// Function to debounce another function
function debounce(func, delay) {
    let timeout;
    return function(...args) {
        const context = this;
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(context, args), delay);
    };
}

// Function to format a date to a readable string
function formatDate(date, format = 'YYYY-MM-DD') {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    return new Intl.DateTimeFormat('en-US', options).format(date);
}
