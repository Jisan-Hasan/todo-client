import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
    return (
        <div className="flex flex-col h-[80vh] justify-center items-center ">
            <h2 className="text-3xl md:text-4xl font-bold text-green-500">Want To Schedule Your Day</h2>
            <p className="mt-5 text-2xl font-semibold dark:text-white">List Your Next Day Activity</p>
            <Link class="mt-5 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded dark:bg-white" to='/addTask'>Add Task</Link>
        </div>
    );
};

export default Home;
