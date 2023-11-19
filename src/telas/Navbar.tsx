import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <>
            <nav className="navbar navbar-expand-lg" data-bs-theme="light">
                <div className="container-fluid">
                    <span className="navbar-brand mb-0 h1">PetLovers</span>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav">
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Cadastrar
                                </a>
                                <ul className="dropdown-menu">
                                    <li><Link to="/cadastrar-cliente" className="dropdown-item">Clientes</Link></li>
                                    <li><Link to="/cadastrar-pet" className="dropdown-item">Pets</Link></li>
                                    <li><hr className="dropdown-divider"/></li>
                                    <li><Link to="/cadastrar-produto" className="dropdown-item">Produtos</Link></li>
                                    <li><Link to="/cadastrar-servico" className="dropdown-item">Serviços</Link></li>
                                </ul>
                            </li>
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Consumir
                                </a>
                                <ul className="dropdown-menu">
                                    <li><Link to="/consumir-produtos" className="dropdown-item">Produtos</Link></li>
                                    <li><Link to="/consumir-servicos" className="dropdown-item">Serviços</Link></li>
                                </ul>
                            </li>
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle"role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Visualisar
                                </a>
                                <ul className="dropdown-menu">
                                    <li><Link to="/clientes" className="dropdown-item">Clientes</Link></li>
                                    <li><Link to="/pets" className="dropdown-item">Pets</Link></li>
                                    <li><hr className="dropdown-divider"/></li>
                                    <li><Link to="/produtos" className="dropdown-item">Produtos</Link></li>
                                    <li><Link to="/servicos" className="dropdown-item">Serviços</Link></li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Navbar;