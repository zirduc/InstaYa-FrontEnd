import Cookies from "js-cookie";
import { useContext, useState } from "react"
import Swal from "sweetalert2";
import { instaYaApi } from "../api";
import { cumplirOrden, validacionesOrdenes } from "../helpers";
import { SingleContext } from '../context/single-context';



export const useForm = () => {


    const [inputValue, setInputValue] = useState({
        nombre: '',
        apellido: '',
        cedula: '',
        desde: '',
        hasta: '',
        altura: '',
        largo: '',
        peso: '',
        mercancia: '',
        nombreRecibe: '',
        apellidoRecibe: '',
        cedulaRecibe: '',
        direccionRecogida: '',
        direccionEnvio: '',
        comentarios: '',
    })

    const { dispatch } = useContext(SingleContext)
    const [errores, setErrores] = useState('');

    const onChange = ({ target }) => {
        const { name, value } = target;
        setInputValue(prev => ({
            ...prev,
            [name]: value
        }))

    }

    const onSubmit = async (event) => {
        event.preventDefault();

        const {
            altura, apellido, apellidoRecibe,
            cedula, cedulaRecibe, comentarios,
            desde, direccionEnvio, direccionRecogida,
            hasta, largo, mercancia, nombre,
            nombreRecibe, peso
        } = inputValue;

        const errors = validacionesOrdenes(inputValue);

        if (errors) {
            setErrores(errors)
            return;
        }

        try {
            const token = Cookies.get('token');
            const { data } = await instaYaApi.post('/api/ordenes', inputValue, {
                headers: {
                    "x-token": token
                }
            });

            instaYaApi.put(`/api/ordenes/async/${data._id}`, { estado: 'Cumplido' }, {
                headers: {
                    "x-token": token
                }
            })

            await Swal.fire({
                icon: 'success',
                title: 'La Orden Ha Sido Creada',
                text: `#seguimiento: ${data._id}`
            })
            cumplirOrden(token, data._id)

            return dispatch({ type: 'HOME' });
        } catch (error) {
            console.log(error);
            return Swal.fire({
                icon: 'error',
                title: 'La orden no fue creada',
                text: 'Revise los errores en consola'
            })
        }


    }

    return {
        inputValue,
        errores,
        onChange,
        onSubmit
    }
}


