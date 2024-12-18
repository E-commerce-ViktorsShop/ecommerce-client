import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { fetchProductsByCategory } from '../utils/functions.js';
import ProductComp from '../components/productCard.jsx';
import { useParams } from 'react-router-dom';

export default function CategoryPage() {
	const [products, setProducts] = useState([]);
	const params = useParams();
	const category = params.name;

	useEffect(() => {
		async function fetchData() {
			const data = await fetchProductsByCategory(category);
			setProducts(data);
			return data;
		}

		fetchData().then((data) => {
			console.log(data);
		});
	}, []);

	return (
		<>
			<main className='main'>
				<h1
					style={{
						textAlign: 'center',
					}}
				>
					{category}
				</h1>
				<ul
					id='product-list'
					style={{
						display: 'grid',
						gridTemplateColumns: 'repeat(5, 1fr)',
						gridAutoRows: 'auto',
						gridGap: '10px',
					}}
				>
					{products.map((product) => (
						<ProductComp key={product._id} product={product} />
					))}
				</ul>
			</main>
		</>
	);
}
