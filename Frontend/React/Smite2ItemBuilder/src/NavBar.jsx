import 'bootstrap/dist/js/bootstrap.bundle';

function NavBar() {
    return (
        <div className="container">
            <nav className="navbar navbar-expand navbar-dark bg-dark">
                <div className="container-fluid">
                    <a href="#" className="navbar-brand">
                        <img src=".\src\assets\Smite2-Logo_FINAL-Flat-OneColor-Gold1.png"
                            alt="Smite2 Logo NoBackground" width={110} height={47} />
                    </a>
                    <span className="navbar-text">Gods</span>
                    <span className="navbar-text">Builds</span>
                    <span className="navbar-text">Statistics</span>
                    <span className="navbar-text">Item Builder</span>
                    <a className="nav-link navbar-text" href="#">
                        <span className="navbar-text">Sign In</span>
                        <img src=".\src\assets\LoginIcon.png"
                            alt="LoginIcon" height={28}
                            className="d-inline-block align-text-top" />
                    </a>
                </div>
            </nav >
        </div>
    );
}

export default NavBar