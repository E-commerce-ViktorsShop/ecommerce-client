import React, { useState, useEffect } from 'react';
import { fetchProducts } from '../utils/functions';

export default function HomePage() {
	const [searchValue, setSearchValue] = useState('spider-man');
	const [results, setResults] = useState([]);
	const [loading, setLoading] = useState(false);

	const apiKey = '';

	// Fetch results on initial render or when searchValue changes
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
			<div className='home-page'>
				<h1>Welcome to Movie Search</h1>
				<input
					type='text'
					value={searchValue}
					onChange={handleSearchChange}
					placeholder='Search for a movie...'
				/>
				{loading && <p>Loading...</p>}
				{error && <p>Error: {error}</p>}
				<div id='promoted-products'>
					{results.length > 0 ? (
						results.map((movie) => (
							<div key={movie.imdbID} className='productBlock'>
								<img
									className='productImg'
									src={movie.Poster}
									alt={movie.Title}
								/>
								<span className='productText'>{`${movie.Title} (${movie.Year})`}</span>
							</div>
						))
					) : (
						<p>No results found</p>
					)}
				</div>
			</div>
		</>
	);
}
