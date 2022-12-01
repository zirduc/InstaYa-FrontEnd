
import { instaYaApi } from "../api"


export const cumplirOrden = (token, id) => {
    try {

        setTimeout(() => {

            instaYaApi.put(`/api/ordenes/${id}`, { estado: 'Cumplido' }, {
                headers: {
                    "x-token": token
                }
            })
        }, 120000)
        console.log('se hizo')
    } catch (error) {
        console.log('no se hizo')
    }
}