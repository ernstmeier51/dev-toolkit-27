function autoclicker(interval, clicks) {
    return new Promise((resolve) => {
        let count = 0;
        const clickInterval = setInterval(() => {
            if (count < clicks) {
                document.dispatchEvent(new MouseEvent('click', { bubbles: true }));
                count++;
            } else {
                clearInterval(clickInterval);
                resolve('Finished clicking');
            }
        }, interval);
    });
}

function stopAutoclicker(timeout) {
    return new Promise((resolve) => {
        setTimeout(() => {
            clearInterval();
            resolve('Autoclicker stopped after timeout');
        }, timeout);
    });
}

function setClickListener(callback) {
    document.addEventListener('click', (event) => {
        callback(event);
    });
}

export { autoclicker, stopAutoclicker, setClickListener };