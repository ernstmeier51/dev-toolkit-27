const fetchWithRetry = async (url, options = {}, retries = 3, backoffFactor = 2) => {
    let attempts = 0;
    while (attempts < retries) {
        try {
            const response = await fetch(url, options);
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            attempts++;
            if (attempts >= retries) throw error;
            const waitTime = Math.pow(backoffFactor, attempts) * 100; // exponential backoff
            console.warn(`Attempt ${attempts} failed. Retrying in ${waitTime}ms...`);
            await new Promise(resolve => setTimeout(resolve, waitTime));
        }
    }
};

export { fetchWithRetry };