import { Link } from "react-router-dom";
import { useAuth } from "./AuthProvider";

export const Header = () => {
    const {isAutheticated, logout} = useAuth();

    return (
        <header className="d-flex flex-column align-items-center justify-content-center border-bottom border-light border-5 mb-4 p-2" style={{width: '100vw'}}>
            <div className="container">
                <div className="row">
                    <nav className="navbar navbar-expand-lg">
                        <a className="navbar-brand ms-2 fs-2 fw-bold text-black"> 
                            <Link className="nav-link" to="/products">Ecommerce</Link> 
                        </a>
                        <div className="collapse navbar-collapse">
                            {isAutheticated && <ul className="navbar-nav">
                                <li className="nav-item fs-5"><Link className="nav-link" to="/products">Products</Link></li>
                            </ul> }
                        </div>
                        <ul className="navbar-nav">
                            { !isAutheticated && <li className="nav-item fs-5"><Link className="nav-link" to="/login">Login</Link></li> }
                            { isAutheticated && <li className="nav-item fs-5" onClick={logout}><Link className="nav-link" to="/logout">Logout</Link></li>} 
                        </ul>
                    </nav>
                </div>
            </div>
        </header>
    )
}