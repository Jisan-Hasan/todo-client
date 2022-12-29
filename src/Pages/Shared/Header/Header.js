import { Button, Navbar } from "flowbite-react";
import { useContext, useState } from "react";
import { toast } from "react-hot-toast";
import { MdDarkMode, MdOutlineLightMode } from 'react-icons/md';
import { Link } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthProvider";

const Header = () => {
    const { user, logout } = useContext(AuthContext);
    const [dark, setDark] = useState(false);

    const handleLogout = () => {
        logout()
            .then(() => {})
            .catch((err) => {
                toast.error(`err.message`);
            });
    };
    const handleTheme = theme => {
        setDark(!dark);
        if(theme){
            document.getElementById("document-body").classList.add("dark")
        } else{
            document.getElementById("document-body").classList.remove("dark");
        }
    }
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
                <div className="flex items-center gap-2 md:order-2">
                    <div onClick={() => handleTheme(!dark)} className="cursor-pointer">
                        {
                            dark ? <MdOutlineLightMode className="dark:text-white" size={25}/> : <MdDarkMode  size={25}/>
                        }
                    </div>
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
                <Navbar.Collapse className="dark:text-white hover:text-blue-600">
                    <Link to="/addTask" className="hover:text-blue-600">
                        Add Task
                    </Link>
                    <Link to='/myTask' className="hover:text-blue-600">
                        My Task
                    </Link>
                    <Link to="/completedTask" className="hover:text-blue-600">
                        Completed Tasks
                    </Link>
                </Navbar.Collapse>
            </Navbar>
        </>
    );
};

export default Header;
