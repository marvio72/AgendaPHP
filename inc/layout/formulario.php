<div class="campos">
    <div class="campo">
        <label for="nombre">Nombre:</label>
        <input type="text" placeholder="Nombre Contacto" name="nombre" id="nombre" value="<?php echo (isset($contacto['nombre'])) ? $contacto['nombre'] : ''; ?>">
    </div>
    <div class="campo">
        <label for="empresa">Empresa:</label>
        <input type="text" placeholder="Nombre Empresa" id="empresa" value="<?php echo (isset($contacto['empresa'])) ? $contacto['empresa'] : ''; ?>">
    </div>
    <div class="campo">
        <label for="telefono">Teléfono:</label>
        <input type="tel" placeholder="Teléfono" id="telefono" value="<?php echo (isset($contacto['telefono'])) ? $contacto['telefono'] : ''; ?>">
    </div>
</div>
<!--Finaliza campos-->
<div class="campo enviar">
    <?php
        $textoBtn = (isset($contacto['nombre'])) ? 'Guardar' : 'Añadir';
        $accion = (isset($contacto['nombre'])) ? 'editar' : 'crear';
    ?>
    <input type="hidden" id="accion" value="<?php echo $accion; ?>">
    <?php if(isset($contacto['id'])) { ?>
        <input type="hidden" id="id" value="<?php echo $contacto['id']; ?>">
    <?php } ?>
    <input type="submit" value="<?php echo $textoBtn; ?>">
</div>
<!--Finaliza enviar-->