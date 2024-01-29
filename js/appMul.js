document.addEventListener('DOMContentLoaded', () => {
    const visPrev = document.querySelector('#preVidMul');

    // Obtener la ruta del video desde localStorage
    const rutaDelVideo = localStorage.getItem('rutaDelVideo');

    if (rutaDelVideo) {
        // Creamos el video
        const prevMultiVideo = document.createElement('video');
        prevMultiVideo.controls = true;
        prevMultiVideo.add.classList('videoMulti');

        // Creamos el source
        const path = document.createElement('source');
        path.src = rutaDelVideo;
        path.classList.add('.videoMulti');

        // Adjuntamos el source al video
        prevMultiVideo.appendChild(path);

        // Adjuntamos el video al contenedor en vistaMulti.html
        visPrev.appendChild(prevMultiVideo);
    } else {
        console.error('La ruta del video no está disponible.');
    }
});
