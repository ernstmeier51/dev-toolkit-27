const fetchWithRetry = async (url, options = {}, retries = 3, delay = 1000) => {
    const fetchWithDelay = (ms) => new Promise(res => setTimeout(res, ms));
    try {
        const response = await fetch(url, options);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return await response.json();
    } catch (error) {
        if (retries === 0) {
            console.error('Max retries reached.');
            throw error;
        }
        console.warn(`Fetch error: ${error.message}. Retrying in ${delay}ms...`);
        await fetchWithDelay(delay);
        return fetchWithRetry(url, options, retries - 1, delay);
    }
};

export { fetchWithRetry };