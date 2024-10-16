import 'bootstrap/dist/js/bootstrap.bundle';
import '../../css/main.min.css'
import './NavBar.css';
import { Link } from "react-router-dom";

function NavBar() {
    return (
        <div className="container mt-4">
            <nav className="navbar navbar-expand rounded-4 navbar-background">
                <div className="container-fluid fs-5 navbar-nav px-2">
                    <Link to="/" className="navbar-brand">
                        <img src=".\src\assets\Smite2-Logo_FINAL-Flat-OneColor-Gold1.png"
                            alt="Smite2 Logo NoBackground" height={45} />
                    </Link>
                    <ul className="navbar-nav me-auto ">
                        <li className="nav-item ms-3">
                            <Link className="nav-link" to="#">Gods</Link>
                        </li>
                        <li className="nav-item ms-3">
                            <Link className="nav-link" to="/Items">Items</Link>
                        </li>
                        <li className="nav-item ms-3">
                            <Link className="nav-link " to="/Shop">Builds</Link>
                        </li>
                        <li className="nav-item ms-3">
                            <Link className="nav-link" to="/Item-Builder">Item Builder</Link>
                        </li>
                    </ul>
                    <Link className="nav-link" to="#">Sign In</Link>
                    <img src=".\src\assets\LoginIcon.png"
                        alt="LoginIcon" height={30}
                        className="m-2" />
                </div>
            </nav >
        </div >
    );
}

export default NavBar