import React, {useState, useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {fetchProducts, fetchProductsBySearch} from '../utils/functions.js';
import ProductComp from '../components/productCard.jsx';

import {useLocation} from 'react-router';


export default function HomePage() {
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const location = useLocation();

    async function fetchData(query = '', page = 1, limit = 10) {
        setLoading(true);
        try {
            let data = [];
            if (query) {
                data = await fetchProductsBySearch(query, page, limit);
            } else {
                data = await fetchProducts();
            }

            setFilteredProducts(Array.isArray(data) ? data : []);
        } catch (error) {
            console.error('Error fetching products:', error);

            setFilteredProducts([]);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const searchTerm = queryParams.get('searchTerm') || '';
        console.log('Search Term:', searchTerm);

        fetchData(searchTerm);
    }, [location.search]);

    return (
        <>
            {/* <img className='w-100' src={banner} alt='Christmas banner' /> */}

            <main className='container-lg' style={{background: '#f6f6f6'}}>
                <h1 className='text-center mt-5 mb-5'>Välkommen!</h1>
                <h2 className='text-center mb-5'>Kolla in dessa produkter</h2>

                {/* Loading state */}
                {loading ? (
                    <p className='text-center'>Laddar..</p>
                ) : (
                    <ul
                        id='product-list'
                        className='row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-5 g-3'
                    >
                        {filteredProducts.length > 0 ? (
                            filteredProducts.map((product) => (
                                <ProductComp key={product._id} product={product}/>
                            ))
                        ) : (
                            <li>No products found</li>
                        )}
                    </ul>
                )}
            </main>
        </>
    );
}
