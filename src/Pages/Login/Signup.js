import { Button, Label, TextInput } from "flowbite-react";
import React, { useContext } from "react";
import { toast } from "react-hot-toast";
import { FaFacebook, FaGithub, FaGoogle } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthProvider";

const Signup = () => {
    const { createUser, signInWithGoogle, updateUserProfile } =
        useContext(AuthContext);

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const email = form.email.value;
        const password = form.password.value;

        // console.log(name, email, password);
        createUser(email, password).then(result => {
            // const user = result.user;
            updateUserProfile(name).then(() => {
                toast.success("Register Successfully!");
                navigate('/');
            })
        }).catch((err) => {
            toast.error(`${err.message}`);
        });
    };

    const handleGoogleSignIn = () => {
        signInWithGoogle().then(result => {
            // const user = result.user;
             // show success
             toast.success("Signin Successfully.");
             navigate("/");
        }).catch((err) => {
            toast.error(`${err.message}`);
        });
    }
    return (
        <div className="max-w-lg mx-auto mt-10  md:mt-14 lg:mt-20 bg-gray-100 px-12 py-14 rounded-xl divide-y-2">
            <h3 className="text-3xl font-bold mb-5 text-center">Sign Up</h3>
            <form onSubmit={handleSubmit} className="flex flex-col">
                {/* name */}
                <div className="mt-3">
                    <div className="mb-2 block">
                        <Label htmlFor="name" value="Your Name" />
                    </div>
                    <TextInput
                        id="name"
                        type="name"
                        name="name"
                        placeholder="Jisan Hasan"
                        required={true}
                    />
                </div>

                {/* email */}
                <div className="mt-3">
                    <div className="mb-2 block">
                        <Label htmlFor="email" value="Your email" />
                    </div>
                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        placeholder="jisan@gmail.com"
                        required={true}
                    />
                </div>

                {/* password */}
                <div className="mt-3">
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
                </div>

                {/* Signup button */}
                <Button className="mt-4" type="submit">
                    Sign Up
                </Button>

                <div className="mt-2 mb-3">
                    <div className="mb-2 text-sm block">
                        Already have any account?{" "}
                        <Link to="/login" className="text-sm text-blue-500">
                            Sign In
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

export default Signup;
