# dev-toolkit-27 [![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

`dev-toolkit-27` is a high-performance, programmable autoclicker engine built in JavaScript for automating repetitive desktop clicks and web-based DOM interactions. It leverages lightweight native system bindings to deliver microsecond-precision clicking patterns without taxing your CPU.

## Features

* **Microsecond Precision:** Execute up to 1,000 clicks per second with custom intervals and smart delay logic.
* **Humanized Jitter:** Add randomized coordinate and timing variance to bypass basic automated-interaction detectors.
* **Dual-Mode Targeting:** Support for both absolute OS screen coordinates and dynamic web-page CSS selectors.
* **Smart Stop Conditions:** Set execution limits based on total click count, elapsed time, or visual pixel color changes.

## Installation

Install the package via npm:

```bash
npm install dev-toolkit-27
```

*Note: On Linux systems, ensure you have `libxtst-dev` installed for native pointer events.*

## Quick Start

Initialize and run a basic clicking sequence at a target coordinate:

```javascript
const { AutoClicker } = require('dev-toolkit-27');

// Configure clicker options
const clicker = new AutoClicker({
  interval: 50,      // Click every 50ms
  jitter: 3,         // Randomize coordinates by +/- 3px
  button: 'left',    // Left-click
  maxClicks: 500     // Auto-stop after 500 clicks
});

// Target specific coordinates (X, Y)
const targetX = 800;
const targetY = 600;

console.log('Starting autoclicker...');
clicker.start(targetX, targetY);

// Listen for completion
clicker.on('complete', () => {
  console.log('Click sequence finished successfully.');
});
```

## License

This project is licensed under the MIT License - see the LICENSE file for details.