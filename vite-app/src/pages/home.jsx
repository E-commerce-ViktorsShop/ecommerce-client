import React, {useState, useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {fetchProducts, fetchProductsBySearch} from '../utils/functions.js';
import ProductComp from '../components/productCard.jsx';
import {useLocation} from 'react-router';

export default function HomePage() {
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const location = useLocation();

    async function fetchData(query = '', page = 1, limit = 20) {
        try {
            let data = [];

            // Create a cache key based on query, page, and limit
            const cacheKey = `${query}-${page}-${limit}`;

            const cachedData = localStorage.getItem(cacheKey);

            if (cachedData) {
                try {
                    data = JSON.parse(cachedData);
                } catch (error) {
                    console.error('Error parsing cached data:', error);
                    data = []; // Fallback if parsing fails
                }
            } else {
                // If no cache, fetch the data
                if (query) {
                    // Fetch products by search query
                    data = await fetchProductsBySearch(query, page, limit);
                } else {
                    // Fetch all products (no search query)
                    data = await fetchProducts();
                }

                // Store the fetched data in localStorage under the generated cache key
                localStorage.setItem(cacheKey, JSON.stringify(data));
            }

            // Ensure data is an array before setting the state
            setFilteredProducts(Array.isArray(data) ? data : []);
        } catch (error) {
            console.error('Error fetching products:', error);
            setFilteredProducts([]); // Fallback to an empty array on error
        }
    }

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const searchTerm = queryParams.get('searchTerm') || '';
        setSearchTerm(searchTerm);

        fetchData(searchTerm);
    }, [location.search]);

    return (
        <>
            <img src={"/banners/banner.jpg"} className='mb-2 mt-5 w-100'/>
            <main className='mt-0 mb-5' style={{background: '#f6f6f6'}}>
                <h2 className='text-center mt-5 mb-5'>
                    {searchTerm
                        ? `Visar resultat för "${searchTerm}"`
                        : 'Hitta årets bästa hårda klappar – Tekniken alla vill ha i jul!'}
                </h2>

                <ul
                    id='product-list'
                    className='row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-5 g-3 container-lg m-auto pb-5'
                >
                    {filteredProducts.length > 0
                        ? filteredProducts.map((product) => (
                            <ProductComp key={product._id} product={product}/>
                        ))
                        : // Empty
                        null}
                </ul>
            </main>
        </>
    );
}
