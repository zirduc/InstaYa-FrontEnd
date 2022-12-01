import Cookies from "js-cookie";
import { useContext, useMemo, useRef, useState } from "react";
import { AuthContext } from '../context/auth-context'
import Swal from "sweetalert2";
import { instaYaApi } from "../api";




export const UserCard = ({ usuario, color, actualizarUsuario }) => {

    const rolRef = useRef('');
    const { authState } = useContext(AuthContext)

    const onClick = async (uid) => {
        await actualizarUsuario(uid);
    }

    const cambiarRol = async (uid = '', rol = '') => {

        if (rolRef.current.value === rol) {
            return;
        }

        try {
            const token = Cookies.get('token');
            await instaYaApi.put(`/api/usuarios/${uid}`, { rol: rolRef.current.value }, {
                headers: {
                    "x-token": token
                }
            })

            await Swal.fire({
                icon: 'success',
                title: 'Role cambiado'
            });

            location.reload();


        } catch (error) {
            console.log(error);
            return Swal.fire({
                icon: 'error',
                title: 'No se pudo cambiar el rol'
            })
        }
    }


    const onChange = async (uid, rol) => {
        await cambiarRol(uid, rol);
    }



    return (
        <div className='border border-muted p-3 rounded'>
            <h5 className='text-center'>{usuario.nombre}</h5>
            <form className='d-flex align-items-center mb-3'>
                <label htmlFor="rol">Role</label>
                <select className='form-control ms-3' disabled={authState.user.name === usuario.nombre} onChange={() => onChange(usuario.uid, usuario.rol)} ref={rolRef} defaultChecked='USER_ROLE' name="rol" >

                    {
                        usuario.rol === 'ADMIN_ROLE'
                            ? (
                                <>
                                    <option className="text-center" value="ADMIN_ROLE">Admin</option>
                                    <option className="text-center" value="USER_ROLE">User</option>
                                </>

                            )
                            : (
                                <>
                                    <option className="text-center" value="USER_ROLE">User</option>
                                    <option className="text-center" value="ADMIN_ROLE">Admin</option>
                                </>
                            )
                    }


                </select>
            </form>
            <button
                className={`btn btn-${color}`}
                onClick={() => onClick(usuario.uid)}
                disabled={authState.user.name === usuario.nombre}
            >
                {color === 'danger' ? 'Desactivar' : 'Activar'} Usuario
            </button>
        </div>
    )
}
