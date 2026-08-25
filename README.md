# dev-toolkit-27

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

dev-toolkit-27 is a JavaScript-based autoclicker designed to automate mouse interactions for development and quality assurance tasks. It delivers precise control over click frequency, location, and patterns through an intuitive command-line interface.

## Features

- Supports click intervals as low as 10 milliseconds
- Allows specifying exact screen coordinates for clicks
- Includes optional jitter to mimic natural human clicking patterns
- Provides a stop mechanism using the ESC key

## Installation

```bash
git clone https://github.com/developer/dev-toolkit-27.git
cd dev-toolkit-27
npm install
```

## Usage

Run the autoclicker with custom parameters:

```bash
node index.js --x 650 --y 420 --interval 180 --count 150 --jitter 30
```

This performs 150 clicks at the specified coordinates with an average 180ms interval and up to 30ms random variation between clicks.