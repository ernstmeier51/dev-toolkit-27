function fetchWithRetry(url, options = {}, retries = 3, delay = 1000) {
    return new Promise((resolve, reject) => {
        const attemptFetch = (n) => {
            fetch(url, options)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then(data => resolve(data))
                .catch(error => {
                    if (n === 1) {
                        return reject(error);
                    }
                    setTimeout(() => attemptFetch(n - 1), delay);
                });
        };
        attemptFetch(retries);
    });
}

// Example usage of fetchWithRetry function
async function exampleNetworkCall() {
    try {
        const data = await fetchWithRetry('https://api.example.com/data', {}, 3, 2000);
        console.log(data);
    } catch (error) {
        console.error('Fetch failed after retries:', error);
    }
}

exampleNetworkCall();