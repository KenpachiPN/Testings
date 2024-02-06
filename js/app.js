
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
    const btnSubmit = document.querySelector('#formulario button[type="submit"]');
    const spinner = document.querySelector('#spinner');
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

    const verificarCredenciales = async () => {
        // Definimos las variables 
        let usuario_exis = false;
        const json_mult = await fetch('/MultimediaBack/credenciales.json');
        const resp = await json_mult.json();
        // Recorremos el JSON
        for (const data of resp) {
            if (user.value.trim().toLowerCase() === data['Nombre']) {
                usuario_exis = true;
                if (passwd.value.trim().toLowerCase() === data['Contraseña']) {
                    if (user.value.trim().toLowerCase() === 'unidrogasbarr') {
                        while (deposito.options.length > 0) {
                            deposito.remove(0);
                        }
                        const newOption = document.createElement('option');
                        newOption.value = 'Barr';
                        newOption.textContent = 'Depósito Barranquilla';
                        deposito.appendChild(newOption);
                    } else if (user.value.trim().toLowerCase() === 'unidrogasbog') {
                        while (deposito.options.length > 0) {
                            deposito.remove(0);
                        }
                        const newOption = document.createElement('option');
                        newOption.value = 'Bog';
                        newOption.textContent = 'Depósito Bogota';
                        deposito.appendChild(newOption);
                    } else if (user.value.trim().toLowerCase() === 'unidrogasbuc') {
                        while (deposito.options.length > 0) {
                            deposito.remove(0);
                        }
                        const newOption = document.createElement('option');
                        newOption.value = 'Buc';
                        newOption.textContent = 'Depósito Bucaramanga';
                        deposito.appendChild(newOption);
                    } else if (user.value.trim().toLowerCase() === 'dropopular') {
                        while (deposito.options.length > 0) {
                            deposito.remove(0);
                        }
                        const newOption = document.createElement('option');
                        newOption.value = 'Dro';
                        newOption.textContent = 'Depósito Dropopular';
                        deposito.appendChild(newOption);
                    } else if (user.value.trim().toLowerCase() === 'unidrogasmed') {
                        while (deposito.options.length > 0) {
                            deposito.remove(0);
                        }
                        const newOption = document.createElement('option');
                        newOption.value = 'Med';
                        newOption.textContent = 'Depósito Medellin';
                        deposito.appendChild(newOption);
                    } else if (user.value.trim().toLowerCase() === 'unidrogasmon') {
                        while (deposito.options.length > 0) {
                            deposito.remove(0);
                        }
                        const newOption = document.createElement('option');
                        newOption.value = 'Mon';
                        newOption.textContent = 'Depósito Monteria';
                        deposito.appendChild(newOption);
                    } else if (user.value.trim().toLowerCase() === 'unidrogasvall') {
                        while (deposito.options.length > 0) {
                            deposito.remove(0);
                        }
                        const newOption = document.createElement('option');
                        newOption.value = 'Vall';
                        newOption.textContent = 'Depósito Valledupar';
                        deposito.appendChild(newOption);
                    }
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Intenta de nuevo...',
                        text: '¡Contraseña incorrecta!',
                        footer: '<a href="https://soporte.unidrogas.co/zoho/" target="_blank">¿Tienes un problema?</a>'
                    });
                    return;
                }
            }
        }
        if (!usuario_exis) {
            Swal.fire({
                icon: 'error',
                title: 'Credenciales incorrectas...',
                text: '¡El usuario no existe!',
                footer: '<a href="https://soporte.unidrogas.co/zoho/" target="_blank">¿Tienes un problema?</a>'
            });
            return;
        }
    }

    //Envio del formulario 
    const envioFormulario = async e => {
        e.preventDefault();
        const recaptchaValue = recaptchaResponse();
        let rutaDelVideo;
        verificarCredenciales();
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

        const archivoMulti = multimedia.files;

        // Agregar el valor del captcha al formData
        formData.append('recaptchaResponse', datosMultimedia.captcha);
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
            .then(response => {
                if (!response.ok) {
                    Swal.fire({
                        icon: "error",
                        title: "Error interno",
                        text: "¡La multimedia no se pudo guardar!",
                        footer: '<a href="https://soporte.unidrogas.co/zoho/" target="_blank">¿Tienes un problema?</a>'
                    });
                    throw new Error('No responde el backend llamen al senior');
                }
                return response.json()
            })
            .then(data => {
                switch (deposito.value) {
                    case 'Barr':
                    case 'Bog':
                    case 'Buc':
                    case 'Dro':
                    case 'Med':
                    case 'Mon':
                    case 'Vall':
                    default:
                        break;
                }
                if (data.success) {
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: data.message,
                        showConfirmButton: false,
                        timer: 1500
                    });
                    // Obtener la ruta del video desde la respuesta
                    rutaDelVideo = '/MultimediaBack/' + data.data.Multimedia[0].ruta;

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
                console.error(error);
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

                //Damos la indicación al usuario que si no le da click al link no puede enviar mas multimedia
                btnSubmit.addEventListener('click', e => {
                    e.preventDefault();
                    //Desactivamos el botón
                    btnSubmit.disabled = true;
                    Swal.fire({
                        icon: "error",
                        title: "No has previsualizado la multimedia",
                        text: `¡Debes darle click al link para poder enviar nuevamente!`,
                        footer: '<a href="https://soporte.unidrogas.co/zoho/" target="_blank">¿Tienes un problema?</a>'
                    });
                });

                // Eliminamos el link cuando se de click
                prevMulti.addEventListener('click', () => {
                    prevMulti.remove();
                    setTimeout(() => {
                        location.reload();
                        // Eliminar la ruta del video del localStorage
                        localStorage.removeItem('rutaDelVideo');
                    }, 1500);
                });
            });
    }

    // cuando se salga del input validar para poner el depósito
    passwd.addEventListener('blur', verificarCredenciales);

    // Envio del formulario
    formulario.addEventListener('submit', envioFormulario);

    // Agregamos el evento para cuando suban un archivo
    multimedia.addEventListener('change', () => {
        const nombreArchivo = multimedia.files[0].name;
        const extensionArchivo = nombreArchivo.substring(nombreArchivo.lastIndexOf('.'), nombreArchivo.length);
        const extensionesPermitidas = '.mp4';
        if (multimedia.files.length === 0) {
            Swal.fire({
                icon: "error",
                title: "Selecciona un archivo",
                text: `¡El campo de ${multimedia.id} es obligatorio!`,
                footer: '<a href="https://soporte.unidrogas.co/zoho/" target="_blank">¿Tienes un problema?</a>'
            });
            span.textContent = 'Ningún archivo seleccionado'
            return;
        } else if (extensionArchivo !== extensionesPermitidas) {
            Swal.fire({
                icon: "error",
                title: "Selecciona otra extensión",
                text: "Extensión de archivo invalida",
                footer: '<a href="https://soporte.unidrogas.co/zoho/" target="_blank">¿Tienes un problema?</a>'
            });
            multimedia.value = '';
            return;
        } else {
            span.textContent = multimedia.files[0].name;
        }
    });
});

