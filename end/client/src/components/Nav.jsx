import { Link } from "react-router-dom";

export default function Nav() {
    return (<>
        <nav className="navbar sticky top-0 z-10 p-3 bg-base-200 shadow">
            <div className="navbar-start ml-5">
                <Link to="/books" className="text-4xl font-bold px-6">
                    <span className="text-yellow-500">P O K E</span>
                    <span className="text-accent"> A I </span>
                </Link>
            </div>
        </nav>
    </>)
}