import { useContext } from "react"
import { SingleContext } from '../context/single-context';

export const OrdenVacia = () => {

    const { dispatch } = useContext(SingleContext)

    return (
        <main className="d-flex w-100 justify-content-center align-items-center fadeIn" style={{ height: 'calc(100vh - 56px)' }}>
            <div className="border border-muted rounded d-flex flex-column align-items-center justify-content-center" style={{ width: '300px', height: '300px', gap: '10px' }}>
                <img src="https://cdn-icons-png.flaticon.com/128/4080/4080888.png" alt="orden vacía" style={{ height: '100px', width: '100px' }} />
                <h5>No tienes ordenes todavía</h5>
                <button className="btn btn-primary" onClick={() => dispatch({ type: 'ORDER' })}>Realiza tu primer orden</button>
            </div>
        </main>
    )
}
