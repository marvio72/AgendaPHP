const formularioContactos = document.querySelector('#contacto');
      listadoContactos = document.querySelector('#listado-contactos tbody');

eventListeners();

function eventListeners() {
    // Cuando el formulario de crear o editar se ejecuta
    formularioContactos.addEventListener('submit', leerFormulario);
    // Listener para el boton eliminar
    listadoContactos.addEventListener('click', eliminarContacto);
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
    xhr.onload = function() {
        if(this.status === 200) {
            console.log(JSON.parse(xhr.responseText));
            // leemos la respuesta de PHP
            const respuesta = JSON.parse(xhr.responseText);
            
            // Inserta un nuevo elemento a la tabla
            const nuevoContacto = document.createElement('tr');

            nuevoContacto.innerHTML = `
                <td>${respuesta.datos.nombre}</td>
                <td>${respuesta.datos.empresa}</td>
                <td>${respuesta.datos.telefono}</td>
            `;

            //crear contenedor para los botones
            const contenedorAcciones = document.createElement('td');

            //crear el icono de Editar
            const iconoEditar = document.createElement('i');
            iconoEditar.classList.add('fas', 'fa-pen-square');

            //crear el enlace para editar
            const btnEditar = document.createElement('a');
            btnEditar.appendChild(iconoEditar);
            btnEditar.href = `editar.php?id=${respuesta.datos.id_insertado}`;
            btnEditar.classList.add('btn', 'btn-editar');

            //agregarlo al padre
            contenedorAcciones.appendChild(btnEditar);

            //crear el icono de eliminar
            const iconoEliminar = document.createElement('i');
            iconoEliminar.classList.add('fas', 'fa-trash-alt');

            //crear boton de Eliminar
            const btnEliminar = document.createElement('button');
            btnEliminar.appendChild(iconoEliminar);
            btnEliminar.setAttribute('data-id', respuesta.datos.id_insertado);
            btnEliminar.classList.add('btn-borrar', 'btn');

            //agregarlo al padre
            contenedorAcciones.appendChild(btnEliminar);

            // Agregar al tr
            nuevoContacto.appendChild(contenedorAcciones);

            //Agregar con los contactos
            listadoContactos.appendChild(nuevoContacto);

            //Resetear el formulario
            document.querySelector('form').reset();
            //Mostrar la notificación
            mostrarNotificacion('Contacto Creado Correctamente', 'correcto');
        }
    }
     //enviar los datos
    xhr.send(datos);
}
// Eliminar el contacto
// e reporta a que elemento le damos clic
// parentElement nos permite ir del hijo hacia el padre. Nos reporta que es el boton y no el icono.
// El codigo de eliminar solo se ejecuta cuando el resultado es true.
function eliminarContacto(e){
    if (e.target.parentElement.classList.contains('btn-borrar')) {
        // tomar el id del elemento que vamos a borrar
        const id = e.target.parentElement.getAttribute('data-id');
        // console.log(id);
        // preguntar al usuario de eliminar el contacto
        const respuesta = confirm('¿Estás Seguro (a) ?');

        if(respuesta) {
            // llamado a ajax
            // crear el objeto
            const xhr = new XMLHttpRequest();

            // abrir la conexión
            xhr.open('GET', `inc/modelos/modelo-contactos.php?id=${id}&accion=borrar`, true);

            // leer la respuesta
            xhr.onload = function() {
                if(this.status === 200) {
                    const resultado = JSON.parse(xhr.responseText);

                    if(resultado.respuesta == 'correcto'){
                        // Eliminar el registro del DOM
                        console.log(e.target.parentElement.parentElement.parentElement);
                        e.target.parentElement.parentElement.parentElement.remove();
                        // mostrar Notificación
                        mostrarNotificacion('Contacto eliminado', 'correcto');
                    } else {
                        // Mostramos una notificacion
                        mostrarNotificacion('Hubo un error...', 'error');
                    }
                }
            }
            // enviar la petición
            xhr.send();
        } 
    }
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