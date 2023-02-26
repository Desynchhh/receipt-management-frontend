import { Link } from "react-router-dom";

const Guestbar = () => {
    return(
    <>
        <div className="space-x-6">
            <Link to="/user/create" className="hover:text-white">Sign Up</Link>
            <Link to="/user/login" className="hover:text-white">Sign In</Link>
        </div>
    </>
    );
}

export default Guestbar;