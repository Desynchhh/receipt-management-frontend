import { Link } from "react-router-dom";

import Guestbar from "./Guestbar";
import Userbar from "./Userbar";

interface Props {
    isLoggedIn: boolean
}

const Navbar = (props:Props) => {
    return(
        <nav className="relative p-6">
            <div className="flex items-center justify-between">
                <div className="p2">
                    <Link to="/"><img className="max-h-16" src="/logo.webp" alt="" /></Link>
                </div>

                <div className="hidden sm:flex">
                    {props.isLoggedIn ? <Userbar /> : <Guestbar />}
                </div>
            </div>
        </nav>
    );
}

export default Navbar;