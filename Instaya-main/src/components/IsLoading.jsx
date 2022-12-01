
export const IsLoading = () => {
    return (
        <main className="d-flex w-100 justify-content-center align-items-center fadeIn" style={{ height: 'calc(100vh - 56px)' }}>
            <div className=" d-flex flex-column align-items-center justify-content-center" style={{ width: '300px', height: '300px', gap: '10px' }}>
                <img className="rotation" src="https://cdn-icons-png.flaticon.com/128/189/189792.png" alt="cargando" style={{ height: '100px', width: '100px' }} />
                <h5>Cargando...</h5>
            </div>
        </main>
    )
}
