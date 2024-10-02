import 'bootstrap/dist/js/bootstrap.bundle';
import '../../css/main.min.css'
import '../../fonts/Outfit.css'
import './NavBar.css';

function NavBar() {
    return (
        <div className="container mt-4">
            <nav className="navbar navbar-expand rounded-4 navbar-background">
                <div className="container-fluid fs-5 navbar-nav px-2">
                    <a href="#" className="navbar-brand">
                        <img src=".\src\assets\Smite2-Logo_FINAL-Flat-OneColor-Gold1.png"
                            alt="Smite2 Logo NoBackground" height={45} />
                    </a>
                    <ul className="navbar-nav me-auto ">
                        <li className="nav-item ms-3">
                            <a className="nav-link" href="#">Gods</a>
                        </li>
                        <li className="nav-item ms-3">
                            <a className="nav-link" href="#">Builds</a>
                        </li>
                        <li className="nav-item ms-3">
                            <a className="nav-link " href="#">Statistics</a>
                        </li>
                        <li className="nav-item ms-3">
                            <a className="nav-link" href="#">Item Builder</a>
                        </li>
                    </ul>
                    <a className="nav-link" href="#">Sign In</a>
                    <img src=".\src\assets\LoginIcon.png"
                        alt="LoginIcon" height={30}
                        className="m-2" />
                </div>
            </nav >
        </div >
    );
}

export default NavBar