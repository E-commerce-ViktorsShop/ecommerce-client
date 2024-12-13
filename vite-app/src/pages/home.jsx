import React, { useState, useEffect } from 'react';

export default function HomePage() {
	const [searchValue, setSearchValue] = useState('spider-man');
	const [results, setResults] = useState([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);

	const apiKey = '7db2dcc4';

	// Fetch search results from OMDb API
	const searchOMDb = async (searchValue) => {
		const url = `https://www.omdbapi.com/?s=${encodeURIComponent(
			searchValue
		)}&apikey=${apiKey}`;
		setLoading(true);
		setError(null);

		try {
			const response = await fetch(url);
			if (!response.ok) {
				throw new Error('Empty');
			}
			const data = await response.json();

			if (data.Response === 'True') {
				setResults(data.Search.slice(0, 5)); // Get first 5 results
			} else {
				throw new Error(data.Error);
			}
		} catch (error) {
			setError(error.message);
		} finally {
			setLoading(false);
		}
	};

	// Fetch results on initial render or when searchValue changes
	useEffect(() => {
		searchOMDb(searchValue);
	}, [searchValue]);

	const handleSearchChange = (event) => {
		setSearchValue(event.target.value);
	};

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
