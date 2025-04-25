import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import Hero from "../components/Hero";
import Testimonials from "../components/Testimonials";
import '../assets/scss/pages/portfolio.scss';
import { Helmet } from 'react-helmet-async';

const BrandingCases = () => {
    const [responseData, setResponseData] = useState([]);
    useEffect(() => {
        const apiPath = `${process.env.REACT_APP_SERVER_URL}/wp-json/my/v1/brandingCasesData`;

        fetch(apiPath)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                setResponseData(data);
            })
            .catch(error => {
                console.log(error);
            });
    }, []);

    const [pageData, setPageData] = useState([]);
    useEffect(() => {
        let myarray = [];
        const apiPath = `${process.env.REACT_APP_SERVER_URL}/wp-json/wp/v2/pages/81`;

        fetch(apiPath)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                myarray.push(data);
                setPageData(myarray);
            })
            .catch(error => {
                console.log(error);
            });
    }, []);


    return (
        <>
            {
                pageData.map((data, index) => {
                    const { acf, title } = data;
                    const pageTitle = acf && acf.seo_title ? acf.seo_title : `${title.rendered} - Apertures`;

                    return (
                        <Helmet key={index}>
                            <title>{pageTitle}</title>
                            <meta name="description" content={acf.seo_description ? acf.seo_description : ''} />
                        </Helmet>
                    )
                })
            }

            <Hero />

            <section className="m-b-40">
                <div className="container">
                    {
                        pageData.map((data, index) => {
                            //const { content, id, title } = data;
                            const { content } = data;
                            return (
                                <div className="mb-4" key={index}>
                                    <div className="row">
                                        <div className="col-sm-12">
                                            {/* <div> {id} {title.rendered} </div> */}

                                            {/* { title.rendered } */}
                                            <div>
                                                <div dangerouslySetInnerHTML={{ __html: content.rendered }}></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }

                    <div className="row">
                        {
                            responseData.map((data, index) => {
                                const { slug, featimg } = data;
                                return (
                                    <div className="col-sm-6 col-md-6 col-lg-4 mb-4" id={`portfolioItem-${index}`} key={index}>
                                        <NavLink to={`/branding-cases/${slug}`}>
                                            <img src={featimg} alt="" loading="lazy" className="img-fluid" />
                                        </NavLink>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </section>

            <Testimonials />
        </>
    );
};

export default BrandingCases;