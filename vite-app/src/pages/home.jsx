import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { fetchProducts } from '../utils/functions.js';
import ProductComp from '../components/product.jsx';
/* import banner from '../assets/rb_981.png'; */

export default function HomePage() {
	const [products, setProducts] = useState([]);

	useEffect(() => {
		async function fetchData() {
			const data = await fetchProducts();
			setProducts(data);
			return data;
		}

		fetchData().then((data) => {
			console.log(data);
		});
	}, []);

	return (
		<>
			{/* <img className='w-100' src={banner} alt='Christmas banner' /> */}

			<main className='container-lg' style={{ background: '#f6f6f6' }}>
				<h1 className='text-center mt-5 mb-5'>Välkommen!</h1>
				<h2 className='text-center mb-5'>Kolla in dessa produkter</h2>
				<ul
					id='product-list'
					className='row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-5 g-3'
				>
					{products.map((product) => (
						<ProductComp key={product._id} product={product} />
					))}
				</ul>
			</main>
		</>
	);
}
