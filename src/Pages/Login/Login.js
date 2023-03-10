import { Button, Label, TextInput } from "flowbite-react";
import React, { useContext, useState } from "react";
import { FaFacebook, FaGithub, FaGoogle } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthProvider";
import { toast } from "react-hot-toast";

const Login = () => {
    const [email, setEmail] = useState("");
    const { signInWithGoogle, signIn } = useContext(AuthContext);

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    // implement email password signin
    const handleSubmit = (e) => {
        e.preventDefault();
        const form = e.target;
        const password = form.password.value;

        signIn(email, password)
            .then((result) => {
                toast.success("Signin Successfully.");
                navigate(from);
            })
            .catch((err) => {
                toast.error(`${err.message}`);
            });
    };

    const handleGoogleSignIn = () => {
        signInWithGoogle()
            .then((result) => {
                // show success
                toast.success("Signin Successfully.");
                navigate(from);
            })
            .catch((err) => {
                toast.error(`${err.message}`);
            });
    };
    return (
        <div className="max-w-lg mx-auto mt-10  md:mt-14 lg:mt-20 bg-gray-100 px-12 py-14 rounded-xl divide-y-2 dark:bg-gray-500 dark:text-slate-50">
            <h3 className="text-3xl font-bold mb-5 text-center">Login</h3>
            <form onSubmit={handleSubmit} className="flex flex-col">
                <div className="mt-4">
                    <div className="mb-2 block">
                        <Label htmlFor="email" value="Your email" />
                    </div>
                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        placeholder="jisan@gmail.com"
                        onBlur={(e) => setEmail(e.target.value)}
                        required={true}
                    />
                </div>
                <div className="mt-4">
                    <div className="mb-2 block">
                        <Label htmlFor="password" value="Your password" />
                    </div>
                    <TextInput
                        id="password"
                        type="password"
                        name="password"
                        placeholder="******"
                        required={true}
                    />
                    <div className="mb-2 block">
                        <button className="text-sm mt-2 hover:text-blue-400">
                            Forget Password?
                        </button>
                    </div>
                </div>

                <Button className="mt-3" type="submit">
                    Login
                </Button>

                <div className="mt-2 mb-3">
                    <div className="mb-2 text-sm block">
                        Don't have any account?{" "}
                        <Link to="/signup" className="text-sm text-blue-500">
                            Sign Up
                        </Link>
                    </div>
                </div>
            </form>
            <div>
                <h4 className="mt-3 text-center text-green-400">
                    Sign In With Social Account
                </h4>
                <div className="flex justify-center gap-12 mt-4">
                    <FaGoogle onClick={handleGoogleSignIn} size={25} />
                    <FaFacebook size={25} />
                    <FaGithub size={25} />
                </div>
            </div>
        </div>
    );
};

export default Login;
