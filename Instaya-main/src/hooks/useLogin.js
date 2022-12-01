
import { useContext, useRef, useState } from 'react';
import cookies from 'js-cookie';
import { SingleContext } from '../context/single-context';
import { AuthContext } from '../context/auth-context';
import { validacionesLogin } from '../helpers';
import Swal from 'sweetalert2';
import { instaYaApi } from '../api';



export const useLogin = () => {

    const [isLoading, setIsLoading] = useState(false)
    const [errors, setErrors] = useState({
        correo: '',
        password: '',
    });


    const { dispatch } = useContext(SingleContext);
    const { onAuthLogin } = useContext(AuthContext);

    const emailRef = useRef('');
    const passwordRef = useRef('');

    const onSubmit = async (event) => {
        event.preventDefault();
        setIsLoading(true);
        const correo = emailRef.current.value;
        const password = passwordRef.current.value;

        const resp = validacionesLogin({ correo, password });

        if (resp) {
            setIsLoading(false);
            setErrors({
                correo: resp.erroresCorreo,
                password: resp.erroresPassword,
            });
            return Swal.fire({
                icon: 'error',
                title: 'Error en formulario'
            })
        }


        try {
            const { data } = await instaYaApi.post('/api/auth/login', {
                correo,
                password
            });

            const { usuario, token } = data;

            cookies.set('token', token);

            onAuthLogin(usuario);
            setIsLoading(false);
            dispatch({ type: 'HOME' });


        } catch (error) {
            setIsLoading(false);
            Swal.fire({
                icon: 'error',
                title: 'Algo salio mal',
                text: 'Las credenciales no son correctas'
            })
            throw new Error(error);
        }
    }

    return {
        isLoading,
        errors,
        emailRef,
        passwordRef,

        onSubmit,
    }
}