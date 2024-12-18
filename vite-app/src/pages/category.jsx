import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {fetchProducts, fetchProductsByCategory, fetchProductsBySearch} from '../utils/functions.js';
import ProductComp from '../components/productCard.jsx';
import { useParams } from 'react-router-dom';



export default function CategoryPage() {
	const [products, setProducts] = useState([]);
	const params = useParams();
	const category = params.name;

	useEffect(() => {
		async function fetchData(category) {
			let data = [];
			const cacheKey = `${category}`;

			const cachedData = localStorage.getItem(cacheKey);
			console.log(cachedData)
			if (cachedData) {
				try {
					data = JSON.parse(cachedData);
					console.log(data)
				} catch (error) {
					console.log('Error parsing cached data:', error);
					data = []; // Fallback if parsing fails
				}
			} else {
				data = await fetchProductsByCategory(category);
				console.log(data)
				localStorage.setItem(cacheKey, JSON.stringify(data));
			}
			setProducts(data);
			return data;
		}

		fetchData(category).then((data) => {
			console.log(data);
		});
	}, [category]);

	return (
		<>
			<main className='main' style={{background: '#f6f6f6'}}>
				<h1
					style={{
						textAlign: 'center',
					}}
				>
					{category}
				</h1>
				<ul
					id='product-list'
					className='row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-5 g-3 container-lg m-auto pb-5'
				>
					{products.map((product) => (
						<ProductComp key={product._id} product={product} />
					))}
				</ul>
			</main>
		</>
	);
}
