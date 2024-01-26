
// DOM 
document.addEventListener('DOMContentLoaded', e => {
    // Variables
    const user = document.querySelector('#usuario');
    const passwd = document.querySelector('#contrasena');
    const deposito = document.querySelector('#deposito');
    const multimedia = document.querySelector('#multimedia');
    const span = document.querySelector('.name-file > span');
    const recaptchaResponse = () => grecaptcha.getResponse();
    const formulario = document.querySelector('#formulario');
    const spinner = document.querySelector('#spinner');
    const visPrev = document.querySelector('#preVidMul');
    let formData = new FormData();

    //Objeto que guardará los datos y los convierto a json
    const datosMultimedia = {

    };

    e.preventDefault();

    // Limpiamos el formulario y reiniciamos el objeto
    const limpiarForm = () => {
        // Resetear el form 
        formulario.reset();
        // Resetear el valor del input
        multimedia.value = '';
        span.textContent = 'Ningún archivo seleccionado';
        grecaptcha.reset();
    }

    //Envio del formulario 
    const envioFormulario = async e => {
        e.preventDefault();
        const nombreArchivo = multimedia.files[0].name;
        const extensionArchivo = nombreArchivo.substring(nombreArchivo.lastIndexOf('.'), nombreArchivo.length);
        const extensionesPermitidas = '.mp4';
        const recaptchaValue = recaptchaResponse();
        let rutaDelVideo;
        if (user.value.trim() === '') {
            Swal.fire({
                icon: "error",
                title: "Llena el campo",
                text: `¡El campo de ${user.id} es obligatorio!`,
                footer: '<a href="https://soporte.unidrogas.co/zoho/" target="_blank">¿Tienes un problema?</a>'
            });
            return;
        } else if (passwd.value.trim() === '') {
            Swal.fire({
                icon: "error",
                title: "Llena el campo",
                text: `¡El campo de ${passwd.id} es obligatorio!`,
                footer: '<a href="https://soporte.unidrogas.co/zoho/" target="_blank">¿Tienes un problema?</a>'
            });
            return;
        } else if (deposito.value === 'Seleccione') {
            Swal.fire({
                icon: "error",
                title: "Selecciona un depósito",
                text: `¡El campo de ${deposito.id} es obligatorio!`,
                footer: '<a href="https://soporte.unidrogas.co/zoho/" target="_blank">¿Tienes un problema?</a>'
            });
            return;
        } else if (extensionArchivo !== extensionesPermitidas) {
            Swal.fire({
                icon: "error",
                title: "Selecciona otra extensión",
                text: "Extensión de archivo invalida",
                footer: '<a href="https://soporte.unidrogas.co/zoho/" target="_blank">¿Tienes un problema?</a>'
            });
            return;
        } else if (multimedia.files.length === 0) {
            Swal.fire({
                icon: "error",
                title: "Selecciona un archivo",
                text: `¡El campo de ${multimedia.id} es obligatorio!`,
                footer: '<a href="https://soporte.unidrogas.co/zoho/" target="_blank">¿Tienes un problema?</a>'
            });
            return;
        } else if (!recaptchaValue) {
            Swal.fire({
                icon: "error",
                title: "Validación de reCAPTCHA",
                text: "Completa la verificación de reCAPTCHA",
                footer: '<a href="https://soporte.unidrogas.co/zoho/" target="_blank">¿Tienes un problema?</a>'
            });
            return;
        }
        // Agregamos al objeto los valores
        datosMultimedia.usuario = user.value.trim().toLowerCase();
        datosMultimedia.contrasena = passwd.value.trim().toLowerCase();
        datosMultimedia.deposit = deposito.value;
        datosMultimedia.mutli = multimedia.value;
        datosMultimedia.captcha = 'Este usuario verificó el captcha';

        // Mostramos el spinner
        spinner.hidden = false;
        spinner.classList.add('center-spinner');
        formulario.appendChild(spinner);
        console.log(datosMultimedia);

        const archivoMulti = multimedia.files;

        // Agregar el valor del captcha al formData
        formData.append('recaptchaResponse', 'Verificado');
        formData.append('usuario', datosMultimedia.usuario);
        formData.append('contrasena', datosMultimedia.contrasena);
        formData.append('deposito', datosMultimedia.deposit);
        for (let i = 0; i < archivoMulti.length; i++) {
            formData.append('files[]', archivoMulti[i]);
        }

        fetch('/MultimediaBack/backend.php', {
            method: 'POST',
            body: formData
        })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: data.message,
                        showConfirmButton: false,
                        timer: 1500
                    });
                    // Obtener la ruta del video desde la respuesta
                    rutaDelVideo = data.data.Multimedia[0].ruta;
                    // Almacenar la ruta del video en localStorage
                    localStorage.setItem('rutaDelVideo', rutaDelVideo);
                    limpiarForm();
                } else {
                    Swal.fire({
                        icon: "error",
                        title: "Error",
                        text: data.message,
                        footer: '<a href="https://soporte.unidrogas.co/zoho/" target="_blank">¿Tienes un problema?</a>'
                    });
                }
            })
            .catch(error => {
                console.error('Error en la solicitud:', error);
            })
            .finally(() => {
                spinner.hidden = true;
                spinner.classList.remove('center-spinner');
                // Creamos el link
                const prevMulti = document.createElement('A');
                prevMulti.href = 'vistaMulti.html';
                prevMulti.target = '_blank';
                prevMulti.classList.add('vistaMulti');
                prevMulti.textContent = 'Visualizar multimedia enviada';
                formulario.appendChild(prevMulti);

                // Eliminamos el link cuando se de click
                prevMulti.addEventListener('click', () => {
                    prevMulti.remove();
                });
            });
        // for (let keys of formData.entries()) {
        //     console.log(keys[0] + ', ' + keys[1]);
        // }
    }

    // Envio del formulario
    formulario.addEventListener('submit', envioFormulario);

    // // Agregamos el evento para cuando suban un archivo
    multimedia.addEventListener('change', () => {
        if (multimedia.files.length === 0) {
            span.textContent = 'Ningún archivo seleccionado'
        } else {
            span.textContent = multimedia.files[0].name;
        }
    });
});

