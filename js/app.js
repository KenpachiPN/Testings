
// Variables
const user = document.querySelector('#usuario');
const passwd = document.querySelector('#contrasena');
const deposito = document.querySelector('#deposito');
const multimedia = document.querySelector('#multimedia');
const icon = document.querySelector('#textMulti');
const btnSubmit = document.querySelector('#formulario button[type="submit"]');
const formulario = document.querySelector('#formulario');

//Objeto que guardará los datos y los convierto a json
const datosMultimedia = {
    usuario: '',
    contrasena: '',
    deposit: '',
    multi: ''
};

// Eventos 
document.addEventListener('DOMContentLoaded', e => {
    e.preventDefault();

    // Validamos si el objeto está lleno o vacio
    const validarObjeto = () => {
        const datos = Object.values(datosMultimedia);
        const camposLlenos = datos.every(dato => dato !== '' && dato !== undefined && dato !== null);
        if (camposLlenos) {
            btnSubmit.classList.remove('disabled');
            btnSubmit.classList.remove('opacity-50');
        } else {
            btnSubmit.classList.add('disabled');
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
        validarObjeto();
    }

    //Envio del formulario 
    const envioFormulario = () => {
        // datosMultimedia.forEach(valores => {
        //     console.log(valores);
        // });
    }

    // Agregamos la función de validar
    user.addEventListener('blur', validarCampos);
    passwd.addEventListener('blur', validarCampos);

    // Envio del formulario
    formulario.addEventListener('submit', envioFormulario);

    // Agregamos el evento para cuando seleccionen algo
    deposito.addEventListener('change', e => {
        if (e.target.value === '') {
            Swal.fire({
                icon: "error",
                title: "Selecciona un deposito",
                text: `¡El campo de ${e.target.id} es obligatorio!`,
                footer: '<a href="https://soporte.unidrogas.co/zoho/" target="_blank">¿Tienes un problema?</a>'
            });
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
            // Resetear el valor del input
            multimedia.value = '';
            icon.textContent = 'Subir archivos';
            return;
        }
        icon.textContent = `Archivo subido: ${nombreArchivo}`;
        datosMultimedia.multi = e.target.value;
        validarObjeto();
    });

});

