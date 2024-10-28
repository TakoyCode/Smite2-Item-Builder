import { useRouteError } from "react-router-dom";
import NavBar from "../components/Navbar/NavBar";

export default function ErrorPage() {
    const error = useRouteError();
    console.error(error);

    return (
        <div>
            <NavBar />

            <div className="bg-dark text-white container text-center">
                <h1>Oops!</h1>
                <p>Sorry, an unexpected error has occurred.</p>
                <p>
                    <i>{error.statusText || error.message}</i>
                </p>
            </div>
        </div>
    )
}