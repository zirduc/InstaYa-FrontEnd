import { useContext, useEffect, useState } from "react"
import Cookies from "js-cookie";
import { instaYaApi } from "../api";
import { IsLoading, OrdenCard, OrdenVacia } from "../components";
import { SingleContext } from "../context/single-context";


export const ListOrders = () => {

    const { dispatch } = useContext(SingleContext)

    const [listadoOrdenes, setListadoOrdenes] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const obtenerOrdenes = async () => {
        setIsLoading(true);
        try {
            const token = Cookies.get('token');
            const { data } = await instaYaApi.get('/api/ordenes/lista', {
                headers: {
                    "x-token": token
                }
            });

            setListadoOrdenes(data);
            setIsLoading(false);

        } catch (error) {
            console.log(error);
            setIsLoading(false);
        }
    }

    useEffect(() => {
        obtenerOrdenes();
    }, []);

    if (isLoading) {
        return <IsLoading />
    }

    if (listadoOrdenes.length === 0) {
        return <OrdenVacia />
    }

    return (

        <main className="d-flex flex-column align-items-center p-2 fadeIn">
            <h1 className="text-center mt-2">Este es tu listado de ordenes</h1>


            {
                listadoOrdenes.map(orden => {
                    return (
                        <OrdenCard orden={orden} key={orden.seguimiento} />
                    )
                })
            }

            <button className="btn btn-primary mt-2" onClick={() => dispatch({ type: 'ORDER' })}>Crear una nueva orden</button>

        </main>
    )
}
