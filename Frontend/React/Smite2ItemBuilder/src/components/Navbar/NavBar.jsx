import 'bootstrap/dist/js/bootstrap.bundle';
import '../../css/main.min.css'
import './NavBar.css';
import { useState } from 'react';
import { Link } from "react-router-dom";

function NavBar() {
    const [currentLink, setCurrentLink] = useState("/");

    const handleSetCurrentLink = (e) => { setCurrentLink(e.target.attributes.href.value); }

    return (
        <div className="container mt-4">
            <nav className="navbar navbar-expand rounded-4 navbar-background">
                <div className="container-fluid fs-5 navbar-nav px-2">
                    <Link to="/" className="navbar-brand">
                        <img src=".\src\assets\Smite2-Logo_FINAL-Flat-OneColor-Gold1.png"
                            alt="Smite2 Logo NoBackground" height={45} onClick={handleSetCurrentLink} />
                    </Link>
                    <ul className="navbar-nav me-auto">
                        <li className="nav-item ms-3">
                            <Link className={(currentLink === "/" ? "nav-link active" : "nav-link")} to="/" onClick={handleSetCurrentLink}>Gods</Link>
                        </li>
                        <li className="nav-item ms-3">
                            <Link className={(currentLink === "/Items" ? "nav-link active" : "nav-link")} to="/Items" onClick={handleSetCurrentLink}>Items</Link>
                        </li>
                        <li className="nav-item ms-3">
                            <Link className={(currentLink === "/Shop" ? "nav-link active" : "nav-link")} to="/Shop" onClick={handleSetCurrentLink}>Builds</Link>
                        </li>
                        <li className="nav-item ms-3">
                            <Link className={(currentLink === "/Item-Builder" ? "nav-link active" : "nav-link")} to="/Item-Builder" onClick={handleSetCurrentLink}>Item Builder</Link>
                        </li>
                    </ul>
                    <Link className="nav-link" to="#" onClick={handleSetCurrentLink}>Sign In</Link>
                    <img src=".\src\assets\LoginIcon.png"
                        alt="LoginIcon" height={30}
                        className="m-2" />
                </div>
            </nav >
        </div >
    );
}

export default NavBar