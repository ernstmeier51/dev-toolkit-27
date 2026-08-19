function randomDelay(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function clickAtRandomInterval(element, minDelay, maxDelay, count) {
    let currentClick = 0;
    const clickInterval = setInterval(() => {
        if (currentClick < count) {
            element.click();
            currentClick++;
        } else {
            clearInterval(clickInterval);
        }
    }, randomDelay(minDelay, maxDelay));
}

function createClickEvent(x, y) {
    const event = new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
        clientX: x,
        clientY: y
    });
    return event;
}

function simulateClicks(element, positions) {
    positions.forEach(pos => {
        const event = createClickEvent(pos.x, pos.y);
        element.dispatchEvent(event);
    });
}

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}