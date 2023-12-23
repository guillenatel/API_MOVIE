const apiKey = '4702015e9dbc3cc6d7a17fa733f61473'; // Cambiar TU-API_KEY por la key otorgada
const url_path = "https://image.tmdb.org/t/p/w500" // Se utiliza esta ulr-path para poder utilizar la img

const getSearch = async (value) => {

    const res =await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${value}`); 
    const data = await res.json();
    const resultado = data.results.filter( movie => movie.title.toLowerCase().includes(value.toLowerCase()));

    const pelisContainer = document.querySelector('#pelis');
    pelisContainer.innerHTML = '';


    resultado.forEach(movie => {
        const voteAverage = movie.vote_average.toFixed(1);
        pelisContainer.innerHTML += `
        <div class="card">
            <div class="card-image"><img src="${url_path}${movie.poster_path}" alt=""></div>
            <div class="card-title">${movie.title}</div>
                <span id="card-vote">${voteAverage}</span>
                <div class="card-body"><p id="descripcion">Descripción General:</p>
                    ${movie.overview}
                    <p id="card-date">Fecha de lanzamiento: ${movie.release_date}</p>
                </div>
        </div>`
        });
}

export {getSearch}; 

