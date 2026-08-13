// Generates a random delay between min and max
function getRandomDelay(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Checks if an element is visible in the viewport
function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// Clicks on an element after a random delay
function clickElementWithDelay(element, minDelay = 100, maxDelay = 1000) {
    const delay = getRandomDelay(minDelay, maxDelay);
    setTimeout(() => {
        if (isElementInViewport(element)) {
            element.click();
        }
    }, delay);
}

// Creates and returns a promise that resolves after a delay
function delayPromise(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Toggles a class on an element
function toggleClass(element, className) {
    if (element.classList) {
        element.classList.toggle(className);
    } else {
        const classes = element.className.split(' ');
        const existingIndex = classes.indexOf(className);
        if (existingIndex >= 0) {
            classes.splice(existingIndex, 1);
        } else {
            classes.push(className);
        }
        element.className = classes.join(' ');
    }
}
