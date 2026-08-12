function processClicks(clicks) {
    const validatedClicks = validateClicks(clicks);
    if (!validatedClicks) {
        console.error('Invalid click data provided.');
        return;
    }
    validatedClicks.forEach(click => {
        setTimeout(() => {
            simulateClick(click);
        }, click.delay);
    });
}

function validateClicks(clicks) {
    if (!Array.isArray(clicks)) {
        return false;
    }
    return clicks.map(click => {
        return { 
            x: validateCoordinate(click.x), 
            y: validateCoordinate(click.y), 
            delay: validateDelay(click.delay) 
        };
    }).filter(click => click.x !== null && click.y !== null && click.delay !== null);
}

function validateCoordinate(coord) {
    return typeof coord === 'number' && coord >= 0 ? coord : null;
}

function validateDelay(delay) {
    return typeof delay === 'number' && delay >= 0 ? delay : null;
}

function simulateClick({ x, y }) {
    console.log(`Simulating click at (${x}, ${y})`);
}