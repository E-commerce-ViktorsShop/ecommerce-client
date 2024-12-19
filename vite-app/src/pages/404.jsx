export default function PageNotFound() {
    return (
        <>
            <main className="p-5">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <div className="text-center">
                                <h2 className="d-flex justify-content-center align-items-center gap-2 mb-4">
                                    <span className="display-1 fw-bold">4</span>
                                    <span className="display-1 fw-bold bsb-flip-h">0</span>
                                    <span className="display-1 fw-bold bsb-flip-h">4</span>
                                </h2>
                                <h3 className="h2 mb-2">Hoppsan! Du är vilse.</h3>
                                <p className="mb-5">Sidan du letar efter finns inte!</p>
                                <a className="btn bsb-btn-5xl btn-dark rounded-pill px-5 fs-6 m-0" href="/"
                                   role="button">Gå tillbaka hem</a>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </>
    )
}