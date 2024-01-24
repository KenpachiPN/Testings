

// DOM 
document.addEventListener('DOMContentLoaded', e => {
    // Variables
    const user = document.querySelector('#usuario');
    const passwd = document.querySelector('#contrasena');
    const deposito = document.querySelector('#deposito');
    const multimedia = document.querySelector('#multimedia');
    const recaptchaResponse = () => grecaptcha.getResponse();
    const captchaDiv = document.querySelector('.g-recaptcha');
    const icon = document.querySelector('#textMulti');
    const btnSubmit = document.querySelector('#formulario button[type="submit"]');
    const formulario = document.querySelector('#formulario');
    const spinner = document.querySelector('#spinner');

    console.log('djhdf');
    console.log('mmx');

    //Objeto que guardará los datos y los convierto a json
    const datosMultimedia = {

    };

    e.preventDefault();

    const validacionForm = {
        user: false,
        pass: false,
        deposit: false,
        multi: false,
        captcha: false
    }

    const validCaptcha = () => {
        console.log('validado pa');
        validacionForm.captcha = true;
    }

    const captchaOption = {
        key: '6LcC2a8nAAAAAFDgI8YEFCOvfkYKk7Og0WQ8fuj-',
        callback: validCaptcha
    }

    const captchaComp = () => grecaptcha.render(captchaDiv, captchaOption);
    console.log(captchaComp);

    // Limpiamos el formulario y reiniciamos el objeto
    const limpiarForm = () => {
        // Resetear el form 
        formulario.reset();
        // Resetear el valor del input
        multimedia.value = '';
        icon.textContent = 'Subir archivos';
    }


    // // Validamos los campos de usuario y contraseña
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
        console.log(validacionForm);
    }


    // Agregamos la función de validar
    user.addEventListener('blur', validarCampos);
    passwd.addEventListener('blur', validarCampos, validacionForm.pass = true);

    //Envio del formulario 
    const envioFormulario = e => {
        e.preventDefault();
        spinner.classList.remove('hidden');
        spinner.classList.add('flex');
        const recaptchaValue = recaptchaResponse();
        if (!recaptchaValue) {
            console.log('No has llenado el recapcha mamaguevo');
            Swal.fire({
                icon: "error",
                title: "Validación de reCAPTCHA",
                text: "Completa la verificación de reCAPTCHA",
                footer: '<a href="https://soporte.unidrogas.co/zoho/" target="_blank">¿Tienes un problema?</a>'
            });
            return;
        }
        // Asigancion del valor
        datosMultimedia.captcha = 'Este usuario verificó el captcha';
        setTimeout(() => {
            spinner.classList.add('hidden');
            spinner.classList.remove('flex');
            Swal.fire({
                position: "center",
                icon: "success",
                title: "Multimedia enviada con éxito",
                showConfirmButton: false,
                timer: 1500
            });
            limpiarForm();
        }, 3000);
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
        validacionForm.deposit = true;
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
        validacionForm.multi = true;
    });
});

