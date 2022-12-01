import Cookies from "js-cookie";
import { useContext, useRef, useState } from "react"
import Swal from "sweetalert2";
import { instaYaApi } from "../api";
import { IsLoading } from "../components";
import { AuthContext } from "../context/auth-context";
import { SingleContext } from '../context/single-context';
import { validacionesRegister } from "../helpers";


export const RegisterPage = () => {

    const [isLoading, setIsLoading] = useState(false)
    const [errors, setErrors] = useState({
        nombre: '',
        correo: '',
        password: '',
    });


    const { dispatch } = useContext(SingleContext)
    const { onAuthLogin } = useContext(AuthContext)

    const nameRef = useRef('');
    const emailRef = useRef('');
    const passwordRef = useRef('');

    const onSubmit = async (event) => {
        event.preventDefault();
        setIsLoading(true);
        // console.log(inputValue)
        const nombre = nameRef.current.value;
        const correo = emailRef.current.value;
        const password = passwordRef.current.value;
        console.log(nombre)
        const resp = validacionesRegister({ nombre, correo, password });

        console.log(resp)
        if (resp) {
            setErrors({
                nombre: resp.erroresNombre,
                correo: resp.erroresCorreo,
                password: resp.erroresPassword,
            });

            setIsLoading(false);

            return Swal.fire({
                icon: 'error',
                title: 'Error en registro',
                text: 'intenta de nuevo'
            })

        }

        try {
            const { data } = await instaYaApi.post('/api/usuarios', {
                nombre,
                correo,
                password,
                rol: 'USER_ROLE'
            });

            Cookies.set('token', data.token);
            onAuthLogin(data.usuario);
            setIsLoading(false);
            dispatch({ type: 'HOME' });

        } catch (error) {
            console.log(error)
            console.log('No se pudo hacer el registro');
            setIsLoading(false);
            return Swal.fire({
                icon: 'error',
                title: 'Error en registro',
                text: 'intenta de nuevo'
            })
        }
    }

    if (isLoading) {
        return <IsLoading />
    }



    return (
        <main className="d-flex p-3 justify-content-center align-items-center bg-light fadeIn " style={{ height: 'calc(100vh - 56px)', width: '100vw' }}>

            <form className="d-flex flex-column p-3 bg-dark rounded" style={{ height: '400px', width: '100%', maxWidth: '440px' }} noValidate>

                <label htmlFor="name" className="text-white" style={{ fontWeight: 'bold' }}>Name</label>
                <input
                    type="text"
                    name="name"
                    id="name"
                    className="form-control"
                    ref={nameRef}
                />
                {
                    errors.nombre && <span className="text-danger">{errors.nombre}</span>
                }

                <label htmlFor="email" className="mt-2 text-white" style={{ fontWeight: 'bold' }}>Email</label>
                <input
                    type="email"
                    name="email"
                    id="email"
                    className="form-control"
                    ref={emailRef}
                />
                {
                    errors.correo && <span className="text-danger">{errors.correo}</span>
                }

                <label htmlFor="password" className="mt-2 text-white" style={{ fontWeight: 'bold' }}>Password</label>
                <input
                    type="password"
                    name="password"
                    id="password"
                    className="form-control"
                    ref={passwordRef}
                />
                {
                    errors.password && <span className="text-danger">{errors.password}</span>
                }

                <button
                    type='submit'
                    className="btn btn-primary mt-2"
                    onClick={onSubmit}
                >
                    Register
                </button>

                <a
                    className="btn btn-outline-success mt-3"
                    onClick={() => dispatch({ type: 'LOGIN' })}
                >
                    Ya tengo cuenta
                </a>
            </form>

        </main>
    )
}