import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import Hero from "../components/Hero";
import Testimonials from "../components/Testimonials";
import '../assets/scss/pages/photography.scss';
import { Helmet } from 'react-helmet-async';


const Photography = () => {
    const [pageData, setPageData] = useState([]);
    useEffect(() => {
        let myarray = [];
        const apiPath = `${process.env.REACT_APP_SERVER_URL}/wp-json/wp/v2/pages/297`;

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


    const [photographyCategoryData, setPhotographyCategoryData] = useState([]);

    useEffect(() => {
        const apiPath = `${process.env.REACT_APP_SERVER_URL}/wp-json/my/v1/PhotographyCategoryData`;

        fetch(apiPath)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                setPhotographyCategoryData(data);
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
                            {/* <meta name="keywords" content="about us, mission, values, team, Apertures" /> */}
                        </Helmet>
                    )
                })
            }

            {
                pageData.map((data, index) => {
                    const { acf } = data;
                    return (
                        <Hero key={index} hero_title={acf.hero_title} hero_subtitle={acf.hero_subtitle} hero_img={acf.hero_background_image} />
                    )
                })
            }

            <section className="m-b-b40">
                {
                    pageData.map((data, index) => {
                        //const { content, id, title } = data;
                        const { content } = data;
                        return (
                            <div className="" key={index}>
                                <div className="container mb-4">
                                    <div className="row">
                                        <div className="col-sm-12">
                                            {/* <div> {id} {title.rendered} </div> */}
                                            <div>
                                                <div dangerouslySetInnerHTML={{ __html: content.rendered }}></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }

                <div className="container">
                    <div className="row">
                        {
                            photographyCategoryData.map((data, index) => {
                                //const { id, name, slug, count, featured_image } = data;
                                const { name, slug, featured_image } = data;

                                return (
                                    <div className="col-sm-6 col-md-6 col-lg-4 mb-4" key={index}>
                                        <NavLink to={`/photography/${slug}`}>
                                            <div className="cat_box">
                                                <img src={featured_image} alt="" className="w-100" loading="lazy" />
                                                <p>{name}</p>
                                            </div>
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

export default Photography;