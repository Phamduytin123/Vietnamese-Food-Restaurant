import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes, Route} from "react-router-dom";
import PublicRoute from "./public-route";
import React, { useEffect } from 'react';
import WebFont from 'webfontloader';
import HomePage from '../pages/homepage';

const AllRoutes = () => {
    useEffect(() => {
        WebFont.load({
            google: {
                families: ['Nunito Sans', 'Public Sans'], // Danh sách font bạn muốn sử dụng
            },
        });
    }, []);
    return (
        <Routes>
            {/* <Route path="/" element={<Navigate to={"/introduce"} />} /> */}

            {/* // public route  */}
            <Route element={<PublicRoute />}>
                <Route
                    path="/"
                    element={
                        <HomePage />
                    }
                />
            </Route>
        </Routes>
    );
}

export default AllRoutes;