import 'bootstrap/dist/js/bootstrap.bundle';
import '../../css/main.min.css'
import './NavBar.css';
import { useState, useEffect } from 'react';
import { Link, useLocation } from "react-router-dom";

function NavBar() {
    const [currentLink, setCurrentLink] = useState(useLocation().pathname);

    useEffect(() => {
        console.log(currentLink)
    }, [currentLink])

    const handleSetCurrentLink = (href) => { setCurrentLink(href); }

    const textLinks = [
        { href: "/", Text: "Gods" },
        { href: "/Items", Text: "Items" },
        { href: "/Shop", Text: "Builds" },
        { href: "/Item-Builder", Text: "Item Builder" },
    ];

    return (
        <div className="container mt-4">
            <nav className="navbar navbar-expand rounded-4 navbar-background">
                <div className="container-fluid fs-5 navbar-nav px-2">
                    <Link className="navbar-brand" to="/" onClick={(e) => setCurrentLink(e.target.parentNode.attributes.href.value)} >
                        <img src=".\src\assets\Smite2-Logo_FINAL-Flat-OneColor-Gold1.png"
                            alt="Smite2 Logo NoBackground" height={45} />
                    </Link>

                    <ul className="navbar-nav me-auto">
                        {
                            textLinks.map((link, i) => (
                                <li className="nav-item ms-3" key={i}>
                                    <Link className={(currentLink === link.href ? "nav-link active" : "nav-link")} to={link.href}
                                        onClick={() => handleSetCurrentLink(link.href)}>{link.Text}</Link>
                                </li>
                            ))
                        }
                    </ul>

                    <Link className="nav-link" to="/" onClick={(e) => handleSetCurrentLink(e.target.attributes.href.value)}>Sign In</Link>
                    <img src=".\src\assets\LoginIcon.png"
                        alt="LoginIcon" height={30}
                        className="m-2" />
                </div>
            </nav >
        </div >
    );
}

export default NavBar