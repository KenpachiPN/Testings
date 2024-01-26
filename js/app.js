

// DOM 
document.addEventListener('DOMContentLoaded', e => {
    // Variables
    const user = document.querySelector('#usuario');
    const passwd = document.querySelector('#contrasena');
    const deposito = document.querySelector('#deposito');
    const multimedia = document.querySelector('#multimedia');
    const recaptchaResponse = () => grecaptcha.getResponse();
    const icon = document.querySelector('#textMulti');
    const btnSubmit = document.querySelector('#formulario button[type="submit"]');
    const formulario = document.querySelector('#formulario');
    const spinner = document.querySelector('#spinner');


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
        icon.textContent = 'Subir archivos';
    }

    // Revision del objeto
    const validarForm = () => {
        const key = Object.keys(datosMultimedia);
        if (key.length === 4) {
            btnSubmit.disabled = false;
            btnSubmit.classList.remove('opacity-50');
        } else {
            btnSubmit.disabled = true;
            btnSubmit.classList.add('opacity-50');
        }
    }

    // Validamos los campos de usuario y contraseña
    const validarCampos = e => {
        if (e.target.value.trim() === '') {
            Swal.fire({
                icon: "error",
                title: "Llena el campo",
                text: `¡El campo de ${e.target.id} es obligatorio!`,
                footer: '<a href="https://soporte.unidrogas.co/zoho/" target="_blank">¿Tienes un problema?</a>'
            });
            return;
        }
        //Asignar los valores al objeto
        datosMultimedia[e.target.name] = e.target.value.trim().toLowerCase();
        validarForm();
    }


    // Agregamos la función de validar
    user.addEventListener('blur', validarCampos);
    passwd.addEventListener('blur', validarCampos);

    //Envio del formulario 
    const envioFormulario = e => {
        e.preventDefault();
        spinner.classList.remove('hidden');
        spinner.classList.add('flex');
        const recaptchaValue = recaptchaResponse();
        const formData = new FormData(formulario);
        console.log(formData);
        if (!recaptchaValue) {
            Swal.fire({
                icon: "error",
                title: "Validación de reCAPTCHA",
                text: "Completa la verificación de reCAPTCHA",
                footer: '<a href="https://soporte.unidrogas.co/zoho/" target="_blank">¿Tienes un problema?</a>'
            });
            spinner.classList.add('hidden');
            spinner.classList.remove('flex');
            return;
        }
        // Asigancion del valor
        datosMultimedia.captcha = 'Este usuario verificó el captcha';
        // Agregar el valor del captcha al formData
        formData.append('recaptchaResponse', 'Verificado');


        // Solicitud al servidor
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
                spinner.classList.add('hidden');
                spinner.classList.remove('flex');
            });

        //ver form
        console.log("Contenido de FormData:");
        for (let keys of formData.entries()) {
            console.log(keys[0] + ', ' + keys[1]);
        }
    }

    // Envio del formulario
    formulario.addEventListener('submit', envioFormulario);

    // Agregamos el evento para cuando seleccionen algo
    deposito.addEventListener('change', e => {
        if (e.target.value === 'Seleccione') {
            Swal.fire({
                icon: "error",
                title: "Selecciona un deposito",
                text: `¡El campo de ${e.target.id} es obligatorio!`,
                footer: '<a href="https://soporte.unidrogas.co/zoho/" target="_blank">¿Tienes un problema?</a>'
            });
            return;
        }
        datosMultimedia.deposit = e.target.value;
        validarForm();
    });

    // Agregamos el evento para cuando suban un archivo
    multimedia.addEventListener('change', e => {
        const nombreArchivo = e.target.files[0].name;
        const extensionArchivo = nombreArchivo.substring(nombreArchivo.lastIndexOf('.'), nombreArchivo.length);
        const extensionesPermitidas = '.mp4';
        if (extensionArchivo !== extensionesPermitidas) {
            Swal.fire({
                icon: "error",
                title: "Selecciona otra extensión",
                text: "Extensión de archivo invalida",
                footer: '<a href="https://soporte.unidrogas.co/zoho/" target="_blank">¿Tienes un problema?</a>'
            });
            multimedia.value = '';
            icon.textContent = 'Subir archivos';
            return;
        }
        icon.textContent = `Archivo subido: ${nombreArchivo}`;
        datosMultimedia.multi = e.target.value;
        console.log(datosMultimedia);
        validarForm();
    });
});

