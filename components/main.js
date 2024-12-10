async function searchOMDb(searchValue) {
	const apiKey = '7db2dcc4';
	const url = `https://www.omdbapi.com/?s=${encodeURIComponent(
		searchValue
	)}&apikey=${apiKey}`;

	try {
		const response = await fetch(url);
		if (!response.ok) {
			throw new Error('Empty');
		}
		const data = await response.json();

		if (data.Response === 'True') {
			const results = data.Search.slice(0, 5);
			return results;
		} else {
			throw new Error(data.Error);
		}
	} catch (error) {
		console.error('Error fetching data:', error);
		return null;
	}
}

function displayResults(results) {
	const resultList = document.getElementById('promoted-products');
	resultList.innerHTML = '';

	if (results && results.length > 0) {
		results.forEach((movie) => {
			const productBlock = document.createElement('div');
			productBlock.className = 'productBlock';
			productBlock.classList.add('product');

			const productImg = document.createElement('img');
			productImg.className = 'productImg';
			productImg.src = movie.Poster;

			const productText = document.createElement('span');
			productText.className = 'productText';
			productText.textContent = `${movie.Title} (${movie.Year})`;

			productBlock.appendChild(productImg);
			productBlock.appendChild(productText);
			resultList.appendChild(productBlock);
		});
	} else {
		console.log(error);
	}
}

async function searchAndDisplayResults() {
	const searchValue = 'spider-man';
	const searchResults = await searchOMDb(searchValue);

	displayResults(searchResults);
}

window.onload = searchAndDisplayResults;
