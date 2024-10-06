import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes, Route} from "react-router-dom";
import PublicRoute from "./public-route";
import React, { useEffect } from 'react';
import WebFont from 'webfontloader';
import Header from "../../components/headers";
import Footer from "../../components/footers";
import MainLayout from '../../components/layouts/MainLayout';

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
                        <MainLayout />
                    }
                />
            </Route>
        </Routes>
    );
}

export default AllRoutes;