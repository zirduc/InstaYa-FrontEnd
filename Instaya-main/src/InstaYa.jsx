import { useContext, useEffect } from "react"
import { NavBar } from "./components"
import { AuthContext } from "./context/auth-context";
import { SingleContext } from './context/single-context';


import { AdminPage, HomePage, ListOrders, LoginPage, OrderPage, RegisterPage } from "./pages"


export const InstaYa = () => {

    const { state } = useContext(SingleContext);
    const { usuario, verificarToken } = useContext(AuthContext)


    useEffect(() => {
        verificarToken()

    }, [state])



    return (
        <>
            <NavBar />

            {
                state.isInHome && <HomePage />
            }

            {
                state.isInLogin && <LoginPage />
            }

            {
                state.isInRegister && <RegisterPage />
            }

            {
                state.isInOrder && < OrderPage />
            }

            {
                state.isInListOrder && <ListOrders />
            }

            {
                state.isInAdmin && <AdminPage />
            }

        </>
    )
}



