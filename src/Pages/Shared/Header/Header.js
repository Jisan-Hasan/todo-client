import { Button, Navbar } from "flowbite-react";
import { useContext } from "react";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthProvider";

const Header = () => {
    const { user, logout } = useContext(AuthContext);

    const handleLogout = () => {
        logout()
            .then(() => {})
            .catch((err) => {
                toast.error(`err.message`);
            });
    };
    return (
        <>
            <Navbar
                className="mb-4 shadow-sm sticky top-0 z-50"
                fluid={true}
                rounded={true}
            >
                <Link to="/">
                    <span className="self-center text-emerald-600 whitespace-nowrap text-4xl font-bold dark:text-white">
                        TODO
                    </span>
                </Link>
                <div className="flex gap-2 md:order-2">
                    {!user ? (
                        <Link to="/login">
                            <Button color="success" pill={true}>
                                Login
                            </Button>
                        </Link>
                    ) : (
                        <Button
                            onClick={handleLogout}
                            color="failure"
                            pill={true}
                        >
                            Sign Out
                        </Button>
                    )}
                    <Navbar.Toggle />
                </div>
                <Navbar.Collapse>
                    <Link to="/" className="hover:text-blue-600">
                        Add Task
                    </Link>
                    <Link className="hover:text-blue-600" to="/jobs">
                        My Task
                    </Link>
                    <Link to="/blogs" className="hover:text-blue-600">
                        Completed Tasks
                    </Link>
                </Navbar.Collapse>
            </Navbar>
        </>
    );
};

export default Header;
