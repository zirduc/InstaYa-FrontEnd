
import { useForm } from "../hooks"


export const OrderPage = () => {

    const { inputValue, errores, onChange, onSubmit } = useForm();


    return (

        <main className="d-flex bg-light justify-content-center p-4 fadeIn" style={{ minHeight: 'calc(100vh - 56px)' }}>

            <form className="p-4 bg-dark rounded" onSubmit={onSubmit}>

                <h3 className="text-center text-white">Información personal de quien envía</h3>
                <div className="d-flex flex-wrap justify-content-center mb-3" style={{ columnGap: '30px', rowGap: '10px' }}>

                    <div className="w-100 d-flex flex-column align-items-center" style={{ maxWidth: '200px' }}>
                        <label htmlFor="nombre" className="text-white" style={{ fontWeight: 'bold' }}  >Nombre</label>
                        <input type="text" onChange={onChange} value={inputValue.nombre} name="nombre" id="nombre" className="form-control" />
                        {
                            errores.nombre && <span className="text-danger">{errores.nombre}</span>
                        }
                    </div>

                    <div className="w-100 d-flex flex-column align-items-center" style={{ maxWidth: '200px' }}>
                        <label htmlFor="apellido" className="text-white" style={{ fontWeight: 'bold' }} >Apellido</label>
                        <input type="text" onChange={onChange} value={inputValue.apellido} name="apellido" id="apellido" className="form-control" />
                        {
                            errores.apellido && <span className="text-danger">{errores.apellido}</span>
                        }
                    </div>

                    <div className="w-100 d-flex flex-column align-items-center" style={{ maxWidth: '200px' }}>

                        <label htmlFor="cedula" className="text-white" style={{ fontWeight: 'bold' }} >Cedula</label>
                        <input type="number" onChange={onChange} value={inputValue.cedula} name="cedula" id="cedula" className="form-control" />
                        {
                            errores.cedula && <span className="text-danger">{errores.cedula}</span>
                        }
                    </div>
                </div>

                <h3 className="text-center text-white">Disponibilidad horaria</h3>
                <div className="d-flex flex-wrap justify-content-center mb-3" style={{ columnGap: '50px', rowGap: '10px' }}>
                    <div className="d-flex align-items-center justify-content-around w-100" style={{ maxWidth: '270px', gap: '10px' }}>
                        <label htmlFor="desde" className="text-white" style={{ fontWeight: 'bold' }}>Desde:</label>
                        <input
                            type="datetime-local"
                            onChange={onChange}
                            required
                            value={inputValue.desde}
                            min={`${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()}T${new Date().getHours()}:${new Date().getMinutes().toString().length < 2 ? `0${new Date().getMinutes()}` : new Date().getMinutes()}`}
                            name="desde"
                            id="desde"
                            className="form-control" />
                    </div>
                    <div className="d-flex align-items-center justify-content-around w-100" style={{ maxWidth: '270px', gap: '10px' }}>
                        <label htmlFor="hasta" className="text-white" style={{ fontWeight: 'bold' }}>Hasta:</label>
                        <input
                            type="datetime-local"
                            onChange={onChange}
                            required
                            value={inputValue.hasta}
                            min={`${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()}T${new Date().getHours()}:${new Date().getMinutes().toString().length < 2 ? `0${new Date().getMinutes()}` : new Date().getMinutes()}`}
                            name="hasta"
                            id="hasta"
                            className="form-control"
                        />
                    </div>
                    <div className="d-flex w-100 justify-content-center" >

                        {
                            errores.fecha && <span className="text-danger">{errores.fecha}</span>
                        }
                    </div>
                </div>

                <h3 className="text-center text-white">Caracteristicas de la carga</h3>
                <div className="d-flex flex-wrap justify-content-center mb-3" style={{ columnGap: '20px', rowGap: '10px' }}>
                    <div className="w-100 d-flex flex-column align-items-center" style={{ maxWidth: '150px' }}>
                        <label htmlFor="altura" className="text-white" style={{ fontWeight: 'bold' }}>Altura (cm)</label>
                        <input type="number" onChange={onChange} value={inputValue.altura} name="altura" id="altura" className="form-control" style={{ width: '100%' }} />
                        {
                            errores.altura && <span className="text-danger">{errores.altura}</span>
                        }
                    </div>

                    <div className="w-100 d-flex flex-column align-items-center" style={{ maxWidth: '150px' }}>
                        <label htmlFor="largo" className="text-white" style={{ fontWeight: 'bold' }}>Largo (cm)</label>
                        <input type="number" onChange={onChange} value={inputValue.largo} name="largo" id="largo" className="form-control" style={{ width: '100%' }} />
                        {
                            errores.largo && <span className="text-danger">{errores.largo}</span>
                        }
                    </div>

                    <div className="w-100 d-flex flex-column align-items-center" style={{ maxWidth: '150px' }}>
                        <label htmlFor="peso" className="text-white" style={{ fontWeight: 'bold' }}>Peso (KG)</label>
                        <input type="number" onChange={onChange} value={inputValue.peso} name="peso" id="peso" className="form-control" style={{ width: '100%' }} />
                        {
                            errores.peso && <span className="text-danger">{errores.peso}</span>
                        }
                    </div>

                    <div className="w-100 d-flex flex-column align-items-center" style={{ maxWidth: '150px' }}>
                        <label htmlFor="mercancia" className="text-white" style={{ fontWeight: 'bold' }}>Tipo de mercancía</label>
                        <select onChange={onChange} value={inputValue.mercancia} name="mercancia" id="mercancia" className="form-control">
                            <option hidden>Escoja una opción</option>
                            <option value="delicada">Delicada</option>
                            <option value="dura">Dura</option>
                        </select>
                        {
                            errores.mercancia && <span className="text-danger">{errores.mercancia}</span>
                        }
                    </div>

                </div>

                <h3 className="text-center text-white">Información personal de quien recibe</h3>
                <div className="d-flex flex-wrap justify-content-center mb-3" style={{ columnGap: '30px', rowGap: '10px' }}>
                    <div className="w-100 d-flex flex-column align-items-center" style={{ maxWidth: '200px' }}>
                        <label htmlFor="nombreRecibe" className="text-white" style={{ fontWeight: 'bold' }}>Nombre</label>
                        <input type="text" onChange={onChange} value={inputValue.nombreRecibe} name="nombreRecibe" id="nombreRecibe" className="form-control" />
                        {
                            errores.nombreRecibe && <span className="text-danger">{errores.nombreRecibe}</span>
                        }
                    </div>

                    <div className="w-100 d-flex flex-column align-items-center" style={{ maxWidth: '200px' }}>
                        <label htmlFor="apellidoRecibe" className="text-white" style={{ fontWeight: 'bold' }}>Apellido</label>
                        <input type="text" onChange={onChange} value={inputValue.apellidoRecibe} name="apellidoRecibe" id="apellidoRecibe" className="form-control" />
                        {
                            errores.apellidoRecibe && <span className="text-danger">{errores.apellidoRecibe}</span>
                        }
                    </div>

                    <div className="w-100 d-flex flex-column align-items-center" style={{ maxWidth: '200px' }}>
                        <label htmlFor="cedulaRecibe" className="text-white" style={{ fontWeight: 'bold' }}>Cedula</label>
                        <input type="number" onChange={onChange} value={inputValue.cedulaRecibe} name="cedulaRecibe" id="cedulaRecibe" className="form-control" />
                        {
                            errores.cedulaRecibe && <span className="text-danger">{errores.cedulaRecibe}</span>
                        }
                    </div>
                </div>

                <h3 className="text-center text-white">Direcciónes</h3>
                <div className="d-flex flex-wrap justify-content-center mb-3" style={{ columnGap: '14px' }}>

                    <div className="w-100 d-flex flex-column align-items-center" style={{ maxWidth: '320px' }}>
                        <label htmlFor="direccionRecogida" className="text-white" style={{ fontWeight: 'bold' }}>Dirección Recogida (incluya ciudad)</label>
                        <input type="text" onChange={onChange} value={inputValue.direccionRecogida} name="direccionRecogida" id="direccionRecogida" className="form-control" />
                        {
                            errores.direccionRecogida && <span className="text-danger">{errores.direccionRecogida}</span>
                        }
                    </div>
                    <div className="w-100 d-flex flex-column align-items-center" style={{ maxWidth: '320px' }}>
                        <label htmlFor="direccionEnvio" className="text-white" style={{ fontWeight: 'bold' }}>Dirección de envío (incluya ciudad)</label>
                        <input type="text" onChange={onChange} value={inputValue.direccionEnvio} name="direccionEnvio" id="direccionEnvio" className="form-control" />
                        {
                            errores.direccionEnvio && <span className="text-danger">{errores.direccionEnvio}</span>
                        }
                    </div>

                </div>

                <h3 className="text-center text-white">Sugerencias - Recomendaciones</h3>
                <label htmlFor="comentarios" className="text-white" style={{ fontWeight: 'bold' }}>Comentarios</label>
                <textarea type="text" onChange={onChange} value={inputValue.comentarios} name="comentarios" id="comentarios" className="form-control" />

                <div className="d-flex justify-content-center">
                    <button type="submit" className="btn btn-success mt-3 ">Guardar orden</button>
                </div>

            </form>

        </main>

    )
}
