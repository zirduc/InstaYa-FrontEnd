
import Swal from 'sweetalert2';


export const validacionesOrdenes = (inputValue = {}) => {
    const errors = {};
    const {
        altura, apellido, apellidoRecibe,
        cedula, cedulaRecibe, comentarios,
        desde, direccionEnvio, direccionRecogida,
        hasta, largo, mercancia, nombre, nombreRecibe, peso
    } = inputValue;

    if (nombre.length === 0) {
        errors.nombre = 'El nombre es obligatorio'
    } else if (nombre.length < 3) {
        errors.nombre = 'El nombre debe tener mas de 3 caracteres'
    }

    if (apellido.length === 0) {
        errors.apellido = 'El apellido es obligatorio'
    } else if (apellido.length < 3) {
        errors.apellido = 'El apellido debe tener mas de 3 caracteres'
    }

    if (cedula.length === 0) {
        errors.cedula = 'La cedula es obligatoria'
    } else if (cedula.length < 3) {
        errors.cedula = 'La cedula debe tener mas de 3 caracteres'
    }


    if (altura.length === 0) {
        errors.altura = 'Obligatoria'
    } else if (Number(altura) <= 0) {
        errors.altura = 'Debe ser mayor que 0'
    }

    if (largo.length === 0) {
        errors.largo = 'Obligatorio'
    } else if (Number(largo) <= 0) {
        errors.largo = 'Debe ser mayor que 0'
    }

    if (peso.length === 0) {
        errors.peso = 'Obligatorio'
    } else if (Number(peso) <= 0) {
        errors.peso = 'Debe ser mayor que 0'
    }

    if (mercancia.length === 0) {
        errors.mercancia = 'Obligatorio'
    }
    if (nombreRecibe.length === 0) {
        errors.nombreRecibe = 'El nombre es obligatorio'
    } else if (nombreRecibe.length < 3) {
        errors.nombreRecibe = 'El nombre debe tener mas de 3 caracteres'
    }

    if (apellidoRecibe.length === 0) {
        errors.apellidoRecibe = 'El apellido es obligatorio'
    } else if (apellidoRecibe.length < 3) {
        errors.apellidoRecibe = 'El apellido debe tener mas de 3 caracteres'
    }

    if (cedulaRecibe.length === 0) {
        errors.cedulaRecibe = 'La cedula es obligatoria'
    } else if (cedulaRecibe.length < 3) {
        errors.cedulaRecibe = 'La cedula debe tener mas de 3 caracteres'
    }

    if (direccionEnvio.length === 0) {
        errors.direccionEnvio = 'El direccion es obligatorio'
    } else if (direccionEnvio.length < 6) {
        errors.direccionEnvio = 'El direccion debe tener mas de 6 caracteres'
    }

    if (direccionRecogida.length === 0) {
        errors.direccionRecogida = 'La direccion es obligatorio'
    } else if (direccionRecogida.length < 6) {
        errors.direccionRecogida = 'La direccion debe tener mas de 6 caracteres'
    }

    if (new Date(desde) >= new Date(hasta)) {
        errors.fecha = 'Los horarios no son validos'
    }

    if (Object.keys(errors).length > 0) {
        Swal.fire({
            icon: 'error',
            title: 'Error en Formulario',
            text: 'El Formulario no esta correctamente llenado'
        })

        return errors;
    }

    return null

}




