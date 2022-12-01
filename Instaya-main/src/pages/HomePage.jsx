

export const HomePage = () => {
    return (
        <main style={{ minHeight: 'calc(100vh - 56px)' }} className='bg-light p-3 fadeIn'>

            <section className="d-flex flex-wrap bg-light py-3 px-3 justify-content-center align-items-center rounded border border-5" style={{ gap: '20px', maxHeight: '400px', minHeight: '300px' }}>
                <div className="border-start border-5 border-danger ps-4">
                    <h1>InstaYa Envios seguros</h1>
                    <p>Transporte, entrega y logistica fisica o digital <br />
                        para ti o tu empresa a tiempo
                    </p>
                    <span><strong>¡Lo tenemos todo!</strong></span>
                </div>

                <img src="/images/camion.jpg" alt="Camion de la empresa" />
            </section>

            <section className="mt-3 bg-light p-3 rounded">
                <h3 className="text-center">Quienes somos y que tenemos</h3>

                <div className="d-flex flex-wrap justify-content-center mt-4" style={{ gap: '40px' }}>
                    <div className="shadow p-3 bg-body rounded" style={{ maxWidth: '330px' }}>
                        <h4 className="text-center">Instaya</h4>
                        <p>Somos la compañía de envios de carga
                            #1 del pais, contamos con sedes en medellin, bogota,
                            barrancabermeja y nuestras oficinas principales se
                            encuentran en bucaramanga
                        </p>
                    </div>

                    <div className="shadow p-3  bg-body rounded" style={{ maxWidth: '330px' }}>
                        <h4 className="text-center">Servicios</h4>
                        <ul className="ps-3">
                            <li>Recogemos la carga en el lugar que residas.</li>
                            <li>Enviamos la carga a cualquier lugar del mundo.</li>
                            <li>Pagos virtuales o contrapago.</li>
                        </ul>

                    </div>

                    <div className="shadow p-3  bg-body rounded" style={{ maxWidth: '330px' }}>
                        <h4 className="text-center">Medio Ambiente</h4>
                        <p>Poseemos la mejor tecnología para cuidar el Ambiente
                            en el que vivimos en cada viaje que hacemos.
                        </p>
                    </div>

                    <div className="shadow p-3  bg-body rounded" style={{ maxWidth: '330px' }}>
                        <h4 className="text-center">Registro</h4>
                        <p>Registrate para poder hacer tu pedido, es muy facil,
                            solo ve a la sección de cuenta y registrate en nuestro formulario.
                            Tendras acceso a nuestros mejores servicios.
                        </p>
                    </div>
                </div>

            </section>

        </main>
    )
}
