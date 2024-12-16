import React from 'react';
import '../styles/ProductComp.css'; // External CSS file for styles
import { Link } from 'react-router';

export default function ProductComp({ product }) {
	return (
		<>
			<Link to={`/product/${product._id}`} style={{ textDecoration: 'none' }}>
				<li className='product'>
					<p className='fw-bold'>{product.name}</p>
					<p>{product.description}</p>
					<img className='image' src={product.image + '?trim&w=500'} alt='' />
				</li>
			</Link>
		</>
	);
}
