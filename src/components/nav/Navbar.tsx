import { Link } from "react-router-dom";
import { useContext } from "react";

import Context from "../../Context";
import { IContext } from "../../@types/receipt-manager";

import Guestbar from "./Guestbar";
import Userbar from "./Userbar";

const Navbar = () => {
    const context = useContext(Context) as IContext;

    const [jwt, setJwt] = context.jwtContext;

    return(
        <nav className="relative p-6">
            <div className="flex items-center justify-between">
                <div className="p2">
                    <Link to="/"><img className="max-h-16" src="/logo.webp" alt="" /></Link>
                </div>

                <div className="hidden sm:flex">
                    {jwt.length >= 1 ? <Userbar /> : <Guestbar />}
                </div>
            </div>
        </nav>
    );
}

export default Navbar;