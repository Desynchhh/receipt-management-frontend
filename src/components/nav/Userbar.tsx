import { Link } from "react-router-dom";

const Userbar = () => {
    return(
    <>
        <div className="space-x-6">
            <Link to="/receipts" className="hover:text-white">Receipt overview</Link>
            <Link to="/receipts/create" className="hover:text-white">Create receipt</Link>
            <Link to="/user/friends" className="hover:text-white">Friends</Link>
            <Link to="/user/profile" className="hover:text-white">Profile</Link>
            <Link to="/user/logout" className="hover:text-white">Log out</Link>
        </div>
    </>
    );
}

export default Userbar;