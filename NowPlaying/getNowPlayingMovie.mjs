import {createPageHandler,createGetTotalPages} from "../filter/pagination.mjs"

const apiKey = '4702015e9dbc3cc6d7a17fa733f61473'; // Cambiar TU-API_KEY por la key otorgada
const url_path = "https://image.tmdb.org/t/p/w500" // Se utiliza esta ulr-path para poder utilizar la img
const nowPlayingUrl = `https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}`; 


//Obtener proximos estrenos de peliculas 
const getNowPlayingMovie = async (page=1) => {

    const getTotalPagesFunction = createGetTotalPages(nowPlayingUrl);

    const res =await fetch(`${nowPlayingUrl}&page=${page}`);  
    const data = await res.json();
    const totalPages = await getTotalPagesFunction();

    console.log(totalPages)
    const pelisContainer = document.querySelector('#pelis');
    pelisContainer.innerHTML = '';

    data.results.forEach(movie => {
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

const handleNowPlayingPageChange = createPageHandler(getNowPlayingMovie, createGetTotalPages(nowPlayingUrl));

export{handleNowPlayingPageChange};