import React from "react";
import Hero from "../components/Hero";
import { Helmet } from 'react-helmet-async';
import NotFoundPage from "../components/NotFoundPage";

const Error = () => {
    return (
        <>
            <Helmet>
                <title>Page not found - Apertures</title>
                <meta name="description" content="" />
                {/* <meta name="keywords" content="" /> */}
            </Helmet>

            <Hero />

            <NotFoundPage />
            
        </>
    )
}

export default Error;