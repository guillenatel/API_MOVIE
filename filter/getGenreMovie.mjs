const apiKey = '4702015e9dbc3cc6d7a17fa733f61473'; // Cambiar TU-API_KEY por la key otorgada
const url_path = "https://image.tmdb.org/t/p/w500" // Se utiliza esta ulr-path para poder utilizar la img


//Cargar las opciones de generos de peliculas
const loadGenreOptions = async () => {
    const res = await fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}`);
    const data = await res.json();

    const genreSelect = document.getElementById('filterGenre');
    genreSelect.innerHTML = '<option selected disabled>Genéro</option>'

    // Agrega las opciones al select
    data.genres.forEach(genre => {
        const option = document.createElement('option');
        option.value = genre.id;
        option.textContent = genre.name;
        genreSelect.appendChild(option);
    });
};

const getGenreMovie = async (genreId) => {
    // Realiza la llamada a la API para obtener las películas
    const res = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=${genreId}`);
    const data = await res.json();
    const movies = data.results;

    // Limpia el contenedor de películas
    const pelisContainer = document.querySelector('#pelis');
    pelisContainer.innerHTML = '';

    // Itera sobre las películas y agrega al contenedor solo las que tienen el genreId específico
    movies.forEach(movie => {
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
        </div>`;
    });
};

export { getGenreMovie, loadGenreOptions};
