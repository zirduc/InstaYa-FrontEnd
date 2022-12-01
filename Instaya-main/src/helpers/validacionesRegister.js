import Swal from 'sweetalert2';

export const validacionesRegister = ({ nombre, correo, password }) => {

    const validacionCorreo = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
    const errors = {};


    if (nombre.length === 0) {
        errors.erroresNombre = 'El nombre es obligatorio';
    } else if (nombre.trim().length <= 2) {
        errors.erroresNombre = 'El nombre debe tener mas de 2 caracteres';
    }


    if (correo.trim().length === 0) {
        errors.erroresCorreo = 'El correo es obligatiorio';
    }

    else if (!validacionCorreo.test(correo)) {
        errors.erroresCorreo = 'El correo no es valido';
    }

    if (password.trim().length === 0) {
        errors.erroresPassword = 'La contraseña es obligatoria';
    } else if (password.trim().length < 6) {
        errors.erroresPassword = 'El password debe tener 6 caracteres o mas';
    }

    if (errors.erroresNombre || errors.erroresCorreo || errors.erroresPassword) {

        Swal.fire({
            icon: 'error',
            title: 'Error de parametros',
            text: errors.erroresNombre || errors.erroresCorreo || errors.erroresPassword
        })

        return errors
    }

    return null;
}