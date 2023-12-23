// Función para actualizar la paginación y obtener y mostrar películas
const updatePagination = async (currentPage, totalPages, getMoviesFunction) => {
    const prevBtn = document.getElementById('prev');
    const nextBtn = document.getElementById('next');
    const currentText = document.getElementById('current');

    // Actualizar el número de página actual
    currentText.textContent = currentPage;

    console.log('currentPage:', currentPage);
    console.log('totalPages:', totalPages);

    // Habilitar o deshabilitar los botones según la página actual
    prevBtn.disabled = currentPage <= 1;
    nextBtn.disabled = currentPage >= totalPages || currentPage >= (await totalPages);

    // Llamar a la función para obtener y mostrar películas de la página actual
    await getMoviesFunction(currentPage);
}

// Función para manejar el cambio de página
const createPageHandler = (getMoviesFunction, getTotalPages) => {
    return async (page) => {
        // Llama a la función de paginación actualizada
        await updatePagination(page, getTotalPages(), getMoviesFunction);
    };
};

// Función para obtener el número total de páginas del objeto data
const createGetTotalPages = (url) => async () => {
    const res = await fetch(url);
    const data = await res.json();
    return data.total_pages || 0;
};

// Exportar la función necesaria
export { updatePagination, createPageHandler, createGetTotalPages};



