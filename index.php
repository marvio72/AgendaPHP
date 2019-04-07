<?php include 'inc/layout/header.php'; ?>

<div class="contenedor-barra">
    <h1>Agenda de Contactos</h1>
</div>

<div class="bg-amarillo contenedor sombra">
    <form action="#" id="contacto">
        <legend>Añada un contacto <span>Todos los campos son obligatorios</span></legend>
        <div class="campos">
            <div class="campo">
                <label for="nombre">Nombre:</label>
                <input type="text" name="nombre" id="nombre" placeholder="Nombre Contacto">
            </div>
            <div class="campo">
                <label for="empresa">Empresa:</label>
                <input type="text" name="empresa" id="empresa" placeholder="Nombre Empresa">
            </div>
            <div class="campo">
                <label for="telefono">Teléfono:</label>
                <input type="tel" name="telefono" id="telefono" placeholder="Teléfono">
            </div>
        </div>
        <div class="campo enviar">
            <input type="submit" value="Añadir ">
        </div>
    </form>
</div>
<!--Fin de bg-amarillo contenedor sombra-->
<?php include 'inc/layout/footer.php'; ?>