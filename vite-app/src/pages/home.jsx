import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { fetchProducts, fetchProductsBySearch } from '../utils/functions.js';
import ProductComp from '../components/productCard.jsx';
import { useLocation } from 'react-router';
// import Banner from '../../public/banner.jpg';

export default function HomePage() {
	const [filteredProducts, setFilteredProducts] = useState([]);
	const [searchTerm, setSearchTerm] = useState('');
	const location = useLocation();

	async function fetchData(query = '', page = 1, limit = 20) {
		try {
			let data = [];

			const cachedData = localStorage.getItem(query);
			if (cachedData) {
				console.log('Loading products from localStorage');
				data = JSON.parse(cachedData);
			} else {
				if (query) {
					data = await fetchProductsBySearch(query, page, limit);
				} else {
					data = await fetchProducts();
				}

				localStorage.setItem(query, JSON.stringify(data));
			}

			setFilteredProducts(Array.isArray(data) ? data : []);
		} catch (error) {
			console.error('Error fetching products:', error);
			setFilteredProducts([]);
		}
	}

	useEffect(() => {
		const queryParams = new URLSearchParams(location.search);
		const searchTerm = queryParams.get('searchTerm') || '';
		setSearchTerm(searchTerm);
		console.log('Search Term:', searchTerm);

		fetchData(searchTerm);
	}, [location.search]);

	return (
		<>
			<img src={"/banners/banner.jpg"} className='mb-2 mt-5 w-100' />
			<main className='mt-0 mb-5' style={{ background: '#f6f6f6' }}>
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
								<ProductComp key={product._id} product={product} />
						  ))
						: //Empty
						  null}
				</ul>
			</main>
		</>
	);
}
