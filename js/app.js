const formularioContactos = document.querySelector('#contacto');

eventListeners();

function eventListeners() {
    // Cuando el formulario de crear o editar se ejecuta
    formularioContactos.addEventListener('submit', leerFormulario);
}

function leerFormulario(e) {
    e.preventDefault();
    
    // Leer los datos de los inputs
    const nombre   = document.querySelector('#nombre').value,
          empresa  = document.querySelector('#empresa').value,
          telefono = document.querySelector('#telefono').value,
          accion = document.querySelector('#accion').value;
    
    if (nombre === '' || empresa === '' || telefono === '') {
        // Dos parametros: texto y clase
        mostrarNotificacion('Todos los Campos son Obligatorios', 'error');
    } else {
        //Pasa la validación, crear llamado a Ajax
        const infoContacto = new FormData();
        infoContacto.append('nombre', nombre);
        infoContacto.append('empresa', empresa);
        infoContacto.append('telefono', telefono);
        infoContacto.append('accion', accion);

        if (accion === 'crear') {
            // crearemos un nuevo contacto 
            insertarBD(infoContacto);
        } else {
            // editar el contacto
        }
    }
}

//Inserta en la base de datos via Ajax
function insertarBD(datos){
     //llamado a ajax

     //crear objeto
    const xhr = new XMLHttpRequest();
     //abrir la conexion
    xhr.open('POST','inc/modelos/modelo-contactos.php', true);
     //pasar los datos
    xhr.onload = function(){
        if(this.status === 200) {
            console.log(JSON.parse(xhr.responseText));
            const respuesta = JSON.parse(xhr.responseText);
            console.log(respuesta.telefono);
        }
    }
     //enviar los datos
    xhr.send(datos);
}

// Notificación en pantalla
function mostrarNotificacion(mensaje, clase) {
    const notificacion = document.createElement('div');
    notificacion.classList.add(clase, 'notificacion', 'sombra');
    notificacion.textContent = mensaje;

    //formulario
    formularioContactos.insertBefore(notificacion,document.querySelector('form legend'));

    // Ocultar y Mostrar la notificacion
    setTimeout(() => {
        notificacion.classList.add('visible');
        setTimeout(() => {
            notificacion.classList.remove('visible');
            
            setTimeout(() => {
                notificacion.remove();
            }, 500);
        }, 3000);
    }, 100);
}