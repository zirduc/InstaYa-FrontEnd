import { useContext, useRef } from "react"
import Swal from "sweetalert2";
import { instaYaApi } from "../api";
import { AuthContext } from "../context/auth-context";
import { SingleContext } from "../context/single-context"

export const NavBar = () => {

    const { dispatch, state } = useContext(SingleContext);
    const { authState, onAuthLogout, usuario } = useContext(AuthContext);

    const numeroSeguimiento = useRef('');

    const onSubmit = async (event) => {
        event.preventDefault();

        try {
            const { data } = await instaYaApi.get(`/api/buscar/ordenes/${numeroSeguimiento.current.value}`);
            console.log(data);

            switch (data.results[0].estado) {
                case 'Guardado':
                    return Swal.fire({
                        icon: 'success',
                        title: 'Tu Orden ya va en camino',
                        text: `La orden con el # ${numeroSeguimiento.current.value} ya fue enviada`
                    });

                case 'Cumplido':
                    return Swal.fire({
                        icon: 'success',
                        title: 'Tu Orden ya esta cumplida',
                        text: `La orden con el # ${numeroSeguimiento.current.value} ya fue recogida en lugar de entrega`
                    });

                case 'Cancelado':
                    return Swal.fire({
                        icon: 'error',
                        title: 'Tu Orden fue cancelada',
                        text: `La orden con el # ${numeroSeguimiento.current.value} fue cancelada`
                    });


                default:
                    return;
            }

        } catch (error) {
            console.log(error);
            return Swal.fire({
                icon: 'error',
                title: 'No se pudo encontrar la orden'
            })
        }
    }
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                <a
                    className="navbar-brand"
                    onClick={() => dispatch({ type: 'HOME' })}
                >
                    InstaYa
                </a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <a
                                className={`nav-link ${state.isInHome ? 'active' : ''}`}
                                aria-current="page"

                                onClick={() => dispatch({ type: 'HOME' })}
                            >
                                Home
                            </a>
                        </li>

                        {
                            (usuario && usuario.rol === 'ADMIN_ROLE') && (
                                <li className="nav-item">
                                    <a className={`nav-link ${state.isInAdmin ? 'active' : ''}`} onClick={() => dispatch({ type: 'ADMIN' })} >Admin</a>
                                </li>
                            )
                        }

                        {
                            (usuario)
                                ? (
                                    <>
                                        <li className="nav-item">
                                            <a className="nav-link text-warning">
                                                {usuario.nombre}
                                            </a>
                                        </li>

                                        <li className="nav-item">
                                            <a
                                                className={`nav-link ${state.isInOrder ? 'active' : ''}`}
                                                onClick={() => dispatch({ type: 'ORDER' })}
                                            >
                                                Realiza tu orden
                                            </a>
                                        </li>

                                        <li className="nav-item">
                                            <a
                                                className={`nav-link ${state.isInListOrder ? 'active' : ''}`}
                                                onClick={() => dispatch({ type: 'LIST-ORDER' })}
                                            >
                                                Tus ordenes
                                            </a>
                                        </li>

                                        <li className="nav-item">
                                            <a
                                                className="nav-link"
                                                onClick={() => {
                                                    onAuthLogout();
                                                    location.reload();
                                                }}
                                            >
                                                Logout
                                            </a>
                                        </li>
                                    </>
                                )
                                : (
                                    <>
                                        <li className="nav-item">
                                            <a
                                                className={`nav-link ${state.isInLogin ? 'active' : ''}`}
                                                onClick={() => dispatch({ type: 'LOGIN' })}
                                            >
                                                Sign in
                                            </a>
                                        </li>

                                        <li className="nav-item">
                                            <a
                                                className={`nav-link ${state.isInRegister ? 'active' : ''}`}
                                                onClick={() => dispatch({ type: 'REGISTER' })}
                                            >
                                                Sign Up
                                            </a>
                                        </li>
                                    </>
                                )
                        }


                    </ul>
                    <form className="d-flex" onSubmit={onSubmit} role="search">
                        <input className="form-control me-2" ref={numeroSeguimiento} type="search" placeholder="# de seguimiento" aria-label="Search" />
                        <button className="btn btn-outline-success" type="submit">Search</button>
                    </form>
                </div>
            </div>
        </nav>
    )
}
