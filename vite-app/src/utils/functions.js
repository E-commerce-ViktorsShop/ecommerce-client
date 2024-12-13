export async function fetchProducts() {
    try {
        const response = await fetch('https://ecommerce-api-sandy.vercel.app/products/?limit=10')
        if (!response.ok) {
            console.error("Error fetching data")
            return;
        }

        return await response.json();

    } catch (error) {
        console.error(error)
        return;
    }

}