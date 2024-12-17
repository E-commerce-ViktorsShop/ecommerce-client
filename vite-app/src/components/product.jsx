import React from 'react';
import '../styles/ProductComp.css'; // External CSS file for styles
import { Link } from 'react-router';

export default function ProductComp({ product }) {
	return (
		<>
			<Link to={`/product/${product._id}`} style={{ textDecoration: 'none' }}>
				<li className='product'>
					<div>
						<p className='fw-bold'>{product.name}</p>
						<p>{product.subTitle}</p>
					</div>
					<img
						className='image'
						src={product.thumbNail + '?trim&w=500'}
						alt=''
					/>
					<p className='fw-bold'>{product.price.$numberDecimal} kr</p>
				</li>
			</Link>
		</>
	);
}
