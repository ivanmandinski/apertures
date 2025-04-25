import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Helmet } from 'react-helmet-async';
import Hero from "../components/Hero";
import Testimonials from "../components/Testimonials";
import EnquiryForm from "../components/EnquiryForm";
import NotFoundPage from "../components/NotFoundPage";

const Content = () => {
    const { pageslug } = useParams();

    const [pageData, setPageData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);


    useEffect(() => {
        const apiPath = `${process.env.REACT_APP_SERVER_URL}/wp-json/wp/v2/pages?slug=${pageslug}`;

        fetch(apiPath)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                if (data.length === 0) {
                    setError(true);
                    setLoading(false);
                    return;
                }
                setPageData([data[0]]);
            })
            .catch(error => {
                console.log(error);
                setError(true);
            })
            .finally(() => setLoading(false));
    }, [pageslug]);

    if (loading) return <div>Loading...</div>;
    if (error) return <NotFoundPage />;

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
                    );
                })
            }

            <section className="m-b-40">
                <div className="container">
                    <div className="row">
                        <div className="col-sm-12">
                            {
                                pageData.map((data, index) => {
                                    const { content } = data;
                                    return (
                                        <div className="" key={index}>
                                            <div className="container">
                                                <div className="row">
                                                    <div className="col-sm-12">
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
                        </div>
                    </div>
                </div>
            </section>

            <Testimonials />

            <EnquiryForm heading="What are <span>you</span> after?" subhead="Let's get there, together." btnText="Let's Create!" />
        </>
    );
};

export default Content;