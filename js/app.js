
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
    usuario: '',
    contrasena: '',
    deposit: '',
    multi: '',
    // captcha: ''
};

// console.log(recaptchaResponse);

// Eventos 
document.addEventListener('DOMContentLoaded', e => {
    e.preventDefault();
    // Validamos si el objeto está lleno o vacio
    const validarObjeto = () => {
        const datos = Object.values(datosMultimedia);
        const camposLlenos = datos.every(dato => dato !== '' && dato !== undefined && dato !== null);
        if (camposLlenos) {
            btnSubmit.disabled = false;
            btnSubmit.classList.remove('opacity-50');
        } else {
            btnSubmit.disabled = true;
            btnSubmit.classList.add('opacity-50');
        }
    }

    // Limpiamos el formulario y reiniciamos el objeto
    const limpiarForm = () => {
        //Reiniciar el objeto
        datosMultimedia.usuario = '',
            datosMultimedia.contrasena = '',
            datosMultimedia.deposit = '',
            datosMultimedia.multi = '';

        // Resetear el form 
        formulario.reset();
        // Resetear el valor del input
        multimedia.value = '';
        icon.textContent = 'Subir archivos';
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
            // Reseteamos el valor del objeto
            datosMultimedia[e.target.name] = '';
            // Validamos el objeto
            validarObjeto();
            return;
        }
        //Asignar los valores al objeto
        datosMultimedia[e.target.name] = e.target.value.trim().toLowerCase();
        validarObjeto();
    }

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

    // Agregamos la función de validar
    user.addEventListener('blur', validarCampos);
    passwd.addEventListener('blur', validarCampos);

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
            // Reseteamos el valor del objeto
            datosMultimedia.deposit = '';
            // Validamos el objeto
            validarObjeto();
            return;
        }
        datosMultimedia.deposit = e.target.value;
        validarObjeto();
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
            // Reseteamos el valor del objeto
            datosMultimedia.multi = '';
            // Validamos el objeto
            validarObjeto();
            // Resetear el valor del input
            multimedia.value = '';
            icon.textContent = 'Subir archivos';
            return;
        }
        icon.textContent = `Archivo subido: ${nombreArchivo}`;
        datosMultimedia.multi = e.target.value;
        validarObjeto();
    });

    // repCaptcha.addEventListener('click', e => {
    //     console.log(e.target.value);
    // });

});

