
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { instaYaApi } from '../api';
import { IsLoading, OrdenCard, UserCard } from '../components';
import Swal from 'sweetalert2';



export const AdminPage = () => {


    const [isLoading, setIsLoading] = useState(false)
    const [usuariosActivos, setUsuariosActivos] = useState([]);
    const [usuariosInactivos, setUsuariosInactivos] = useState([]);
    const [ordenes, setOrdenes] = useState([]);

    const obtenerUsuarios = async (desde, limite) => {
        setIsLoading(true);
        try {
            const token = Cookies.get('token');
            const { data } = await instaYaApi(`/api/usuarios?desde=${desde}&limite=${limite}`, {
                headers: {
                    "x-token": token
                }
            });
            const { usuariosActivos, usuariosInactivos } = data

            setUsuariosActivos(usuariosActivos);
            setUsuariosInactivos(usuariosInactivos);
            setIsLoading(false)
        } catch (error) {
            console.log(error);
            setIsLoading(false);
        }
    }

    const obtenerOrdenes = async () => {
        try {
            const token = Cookies.get('token');
            const { data } = await instaYaApi(`/api/ordenes/todas`, {
                headers: {
                    "x-token": token
                }
            });


            setOrdenes(data);
        } catch (error) {
            console.log(error);
        }
    }

    const borrarUsuario = async (uid = '') => {
        try {
            const token = Cookies.get('token');
            await instaYaApi.delete(`/api/usuarios/${uid}`, {
                headers: {
                    "x-token": token
                }
            })
            await Swal.fire({
                icon: 'success',
                title: 'Usuario eliminado'
            });
            location.reload();


        } catch (error) {
            console.log(error);
            return Swal.fire({
                icon: 'error',
                title: 'Usuario no se pudo eliminar'
            })
        }
    }

    const activarUsuario = async (uid = '') => {
        try {
            const token = Cookies.get('token');
            await instaYaApi.put(`/api/usuarios/${uid}`, { estado: true }, {
                headers: {
                    "x-token": token
                }
            })
            await Swal.fire({
                icon: 'success',
                title: 'Usuario Activado'
            });
            location.reload();

        } catch (error) {
            console.log(error);
            return Swal.fire({
                icon: 'error',
                title: 'No se pudo activar usuario'
            })
        }
    }


    useEffect(() => {
        obtenerUsuarios();
    }, [])

    useEffect(() => {
        obtenerOrdenes();
    }, [])

    if (isLoading) {
        return <IsLoading />
    }


    return (
        <main className='p-3'>
            <h2 className='text-center' style={{ display: usuariosActivos.length === 0 ? 'none' : '' }}>Usuarios de la pagina Activos</h2>
            <div className='d-flex flex-wrap justify-content-center' style={{ gap: '10px' }}>
                {
                    usuariosActivos.map(usuario => (
                        <UserCard
                            key={usuario.uid}
                            actualizarUsuario={borrarUsuario}
                            color='danger'
                            usuario={usuario} />
                    ))
                }
            </div>

            <h2 className='text-center mt-3' style={{ display: usuariosInactivos.length === 0 ? 'none' : '' }}>Usuarios de la pagina Eliminados</h2>
            <div className='d-flex flex-wrap justify-content-center' style={{ gap: '10px' }}>
                {
                    usuariosInactivos.map(usuario => (
                        <UserCard
                            key={usuario.uid}
                            color='success'
                            actualizarUsuario={activarUsuario}
                            usuario={usuario} />
                    ))
                }
            </div>


            <h2 className='text-center mt-3' style={{ display: ordenes.length === 0 ? 'none' : '' }}>Ordenes totales</h2>
            {
                ordenes.map(orden => {
                    return <OrdenCard select={true} orden={orden} key={orden.seguimiento} />
                })
            }



        </main>
    )
}
