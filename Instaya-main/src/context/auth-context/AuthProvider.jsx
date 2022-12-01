import { useEffect, useReducer, useState } from "react"
import { AuthContext, authReducer } from "./"
import Cookies from "js-cookie"
import { jwtVerify } from 'jose';
import { instaYaApi } from "../../api";



const initialAuthState = {
    isAuthenticated: 'not-authenticated',
    user: null
}

export const AuthProvider = ({ children }) => {

    const [authState, dispatch] = useReducer(authReducer, JSON.parse(localStorage.getItem('authState')) || initialAuthState)
    const [usuario, setUsuario] = useState('');


    const verificarToken = async () => {
        try {
            const token = Cookies.get('token') || '';
            const secret = new TextEncoder().encode(import.meta.env.VITE_SECRET_JWT_KEY)

            const { payload } = await jwtVerify(token, secret);

            if (payload) {
                const { data } = await instaYaApi.get(`/api/usuarios/${payload.uid}`, {
                    headers: {
                        "x-token": token
                    }
                });
                return setUsuario(data);
            }
            setUsuario('')

        } catch (error) {
            setUsuario('')
            return null;
        }
    }




    useEffect(() => {
        localStorage.setItem('authState', JSON.stringify(authState))
    }, [authState])




    const onAuthLogin = (usuario) => {
        dispatch({ type: '[AUTH] - Login', payload: usuario });
    }

    const onAuthLogout = () => {
        localStorage.clear();
        localStorage.removeItem('authState');
        localStorage.removeItem('state');
        Cookies.remove('token');
    }


    return (
        <AuthContext.Provider value={{
            authState,
            usuario,

            verificarToken,
            onAuthLogin,
            onAuthLogout
        }}>
            {children}
        </AuthContext.Provider>
    )
}
