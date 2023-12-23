import {handlePopularPageChange} from "./Populares/getPopularMovies.mjs"
import { handleUpcomingPageChange} from "./Upcoming/getUpcomingMovies.mjs";
import { getSearch } from "./filter/search.mjs";
import { getGenreMovie, loadGenreOptions} from "./filter/getGenreMovie.mjs";
import { handleNowPlayingPageChange} from "./NowPlaying/getNowPlayingMovie.mjs";


const btnPopular = document.querySelector("#popular"); 
const btnUpcoming = document.querySelector("#upcoming"); 
const search = document.querySelector("#search"); 
const btnNowPlaying = document.querySelector("#nowPlaying"); 
const filterGenre = document.querySelector ("#filterGenre"); 


//Escucha el evento y crear el select con las opciones de genero
filterGenre.addEventListener('click', () => loadGenreOptions());

//Escucha el evento y trae las peliculas del genero elegido pasado por parametro.
filterGenre.addEventListener("change", (event) => {
    const selectedGenreId = event.target.value;
    if (selectedGenreId) {
        // Solo llama a getGeneroMovie si se ha seleccionado un género
        getGenreMovie(selectedGenreId);
    }
});

//Escucha el evento y obtiene las peliculas populares
btnPopular.addEventListener('click',  async () => {
    await handlePopularPageChange(1);
    setupPagination(handlePopularPageChange)
});

//Escucha el evento y obtiene las que estan en cine ahora
btnNowPlaying.addEventListener('click', async () => {
    await handleNowPlayingPageChange(1);
    setupPagination(handleNowPlayingPageChange);
});

// Escucha el evento y obtiene los próximos estrenos de películas
btnUpcoming.addEventListener("click", async () => {
    await handleUpcomingPageChange(1);
    setupPagination(handleUpcomingPageChange);
});

//Escucha el evento y obtiene las peliculas que contiene el titulo pasado por parametro.
search.addEventListener('keydown', (e) => {
    if (e.key === "Enter") {
        e.preventDefault();
        const searchTerm = e.target.value.trim(); // Elimina espacios en blanco al inicio y al final
        if (searchTerm !== "") {
            getSearch(searchTerm);
        }
    }
}); 

// Función para configurar la paginación
const setupPagination = (handlePageChange) => {
    const prevBtn = document.getElementById('prev');
    const nextBtn = document.getElementById('next');
    const currentText = document.getElementById('current');

    // Llamada inicial para cargar la primera página
    handlePageChange(1);

    // Asignar eventos a los botones de página anterior y siguiente
    prevBtn.addEventListener('click', async () => {
    const currentPage = parseInt(currentText.textContent, 10);
        await handlePageChange(currentPage - 1);
    });
    nextBtn.addEventListener('click', async () => {
        const currentPage = parseInt(currentText.textContent, 10);
        await handlePageChange(currentPage + 1);
    });
};

document.addEventListener('DOMContentLoaded', async() => {
    await handleNowPlayingPageChange(1); 
    loadGenreOptions();  
})