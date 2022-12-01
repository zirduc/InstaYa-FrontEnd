import { useContext } from "react"
import { SingleContext } from "../context/single-context";
import { useLogin } from "../hooks/useLogin";
import { IsLoading } from "../components";



export const LoginPage = () => {

    const { isLoading, emailRef, passwordRef, errors, onSubmit } = useLogin();
    const { dispatch } = useContext(SingleContext)

    if (isLoading) {
        return <IsLoading />
    }
    return (
        <main className="d-flex p-3 justify-content-center align-items-center bg-light fadeIn " style={{ height: 'calc(100vh - 56px)', width: '100vw' }}>

            <form className="d-flex flex-column p-3 bg-dark rounded" style={{ height: '400px', width: '100%', maxWidth: '440px' }} noValidate>
                <label htmlFor="email" className="mt-3 text-white" style={{ fontWeight: 'bold' }}>Email</label>
                <input
                    type="email"
                    name="email"
                    id="email"
                    className="form-control"
                    ref={emailRef}
                />
                {
                    errors.correo && <span className="text-danger">{errors.correo}</span>
                }

                <label htmlFor="password" className="mt-2 text-white" style={{ fontWeight: 'bold' }}>Password</label>
                <input
                    type="password"
                    name="password"
                    id="password"
                    className="form-control"
                    ref={passwordRef}
                />
                {
                    errors.password && <span className="text-danger">{errors.password}</span>
                }
                <button
                    type='submit'
                    className="btn btn-primary mt-3"
                    onClick={onSubmit}
                >
                    Login
                </button>

                <a
                    className="btn btn-outline-success mt-3"
                    onClick={() => dispatch({ type: 'REGISTER' })}
                >
                    No tengo cuenta
                </a>
            </form>

        </main>
    )
}
