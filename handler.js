function clickElement(selector) {
    const element = document.querySelector(selector);
    if (element) {
        element.click();
    } else {
        console.error(`Element not found: ${selector}`);
    }
}

function scheduleClick(selector, delay) {
    setTimeout(() => clickElement(selector), delay);
}

function startAutoClicker(selector, interval) {
    const intervalId = setInterval(() => clickElement(selector), interval);
    return intervalId;
}

function stopAutoClicker(intervalId) {
    clearInterval(intervalId);
}

function toggleAutoClicker(selector, interval) {
    let isActive = false;
    let intervalId;
    return function() {
        if (!isActive) {
            isActive = true;
            intervalId = startAutoClicker(selector, interval);
        } else {
            stopAutoClicker(intervalId);
            isActive = false;
        }
    };
}

export { clickElement, scheduleClick, startAutoClicker, stopAutoClicker, toggleAutoClicker };