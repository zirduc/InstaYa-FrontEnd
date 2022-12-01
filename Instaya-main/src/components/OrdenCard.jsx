import Cookies from "js-cookie";
import { useRef } from "react";
import Swal from "sweetalert2";
import { instaYaApi } from '../api';



export const OrdenCard = ({ orden, select }) => {

    const inputRef = useRef('');

    const onChange = async () => {
        const estado = inputRef.current.value;

        try {
            const token = Cookies.get('token');
            const resp = await instaYaApi.put(`/api/ordenes/${orden.seguimiento}`, { estado }, {
                headers: {
                    "x-token": token
                }
            })
            await Swal.fire({
                icon: 'success',
                title: 'Cambio correcto del estado de la orden',
                text: `El estado de la orden con el #${orden.seguimiento} ahora es: ${estado}`
            })
            return location.reload();
        } catch (error) {
            console.log(error);
            return Swal.fire({
                icon: 'error',
                title: 'El estado de la orden no se pudo cambiar'
            })
        }
    }

    return (
        <div className="d-flex flex-wrap justify-content-center rounded mb-1">
            <div className="bg-dark w-100" style={{ maxWidth: '220px' }}>
                <label htmlFor="enviador" className="bg-dark text-white text-center w-100 py-2 border border-primary" >Enviador</label>
                <input type="text" className="w-100 bg-light  text-center border border-primary py-2" readOnly value={orden.enviador} id="enviador" />
            </div>

            <div className="bg-dark w-100" style={{ maxWidth: '220px' }}>
                <label htmlFor="receptor" className="bg-dark text-white text-center w-100 py-2 border border-primary">Receptor</label>
                <input type="text" className="w-100 bg-light  text-center border border-primary py-2" readOnly value={orden.receptor} id="receptor" />
            </div>

            <div className="bg-dark w-100" style={{ maxWidth: '220px' }}>
                <label htmlFor="seguimiento" className="bg-dark text-white text-center w-100 py-2 border border-primary">Seguimiento</label>
                <input type="text" className="w-100 bg-light  text-center border border-primary py-2" readOnly value={orden.seguimiento} id="seguimiento" />
            </div>

            <div className="bg-dark w-100" style={{ maxWidth: '220px' }}>
                <label htmlFor="estado" className="bg-dark text-white text-center w-100 py-2 border border-primary">Estado</label>
                {
                    !select
                        ? <input type="text" onChange={onChange} ref={inputRef} className="w-100 bg-light  text-center border border-primary py-2" readOnly value={orden.estado} id="estado" />
                        : orden.estado === 'Guardado'
                            ? (
                                <select id="estado" onChange={onChange} ref={inputRef} className="w-100 bg-light  text-center border border-primary py-2">
                                    <option value="Guardado">Guardado</option>
                                    <option value="Cumplido">Cumplido</option>
                                    <option value="Cancelado">Cancelado</option>
                                </select>
                            )
                            : orden.estado === 'Cumplido'
                                ? (
                                    <select id="estado" onChange={onChange} ref={inputRef} className="w-100 bg-light  text-center border border-primary py-2">
                                        <option value="Cumplido">Cumplido</option>
                                        <option value="Guardado">Guardado</option>
                                        <option value="Cancelado">Cancelado</option>
                                    </select>
                                )
                                : (
                                    <select id="estado" onChange={onChange} ref={inputRef} className="w-100 bg-light  text-center border border-primary py-2">
                                        <option value="Cancelado">Cancelado</option>
                                        <option value="Guardado">Guardado</option>
                                        <option value="Cumplido">Cumplido</option>
                                    </select>
                                )
                }



            </div>

        </div>


    )
}
