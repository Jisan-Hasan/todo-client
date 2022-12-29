import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../Pages/Shared/Header/Header";

const Main = () => {
    return (
            <div className={`mx-auto dark:bg-gray-900 lg:px-24 xl:px-40 h-screen`}>
                <Header />
                <Outlet />
            </div>
    );
};

export default Main;
