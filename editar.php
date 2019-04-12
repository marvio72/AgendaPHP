<?php include 'inc/funciones/funciones.php'; ?>
<?php include 'inc/layout/header.php'; ?>

<?php 
    // La variable la convierte en entero
    $id = filter_var($_GET['id'],     FILTER_VALIDATE_INT);

    if(!$id) {
        die('No es válido');
    }

    $resultado = obtenerContacto($id);
    $contacto = $resultado->fetch_assoc();

?>

<div class="contenedor-barra">
    <div class="contenedor barra">
        <a href="index.php" class="btn volver">Volver</a>
        <h1>Editar Contacto</h1>
    </div>

</div>

<div class="bg-amarillo contenedor sombra">
    <form action="#" id="contacto">
        <legend>Edite el Contacto</legend>

        <?php include 'inc/layout/formulario.php'; ?>
        
    </form>
</div>
<!--Fin de bg-amarillo contenedor sombra-->

<?php include 'inc/layout/footer.php'; ?>