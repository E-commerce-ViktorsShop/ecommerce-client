export async function fetchProducts(limit = 10, page = 1) {
    try {
        const response = await fetch(
            `https://ecommerce-api-sandy.vercel.app/products/?limit=${limit}&page=${page}`
        );
        if (!response.ok) {
            console.error('Error fetching data');
            return;
        }

        return await response.json();
    } catch (error) {
        console.error(error);
        return;
    }
}

export async function fetchProductsBySearch(query, page = 1, limit = 10) {
    try {
        const response = await fetch(
            `https://ecommerce-api-sandy.vercel.app/search/${query}?limit=${limit}&page=${page}`
        );
        if (!response.ok) throw new Error('Failed to fetch search results');
        return await response.json();
    } catch (error) {
        console.error('Error fetching search results:', error);
        return [];
    }
}
