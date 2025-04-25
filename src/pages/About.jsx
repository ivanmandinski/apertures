import React, { useState, useEffect } from "react";
import { Helmet } from 'react-helmet-async';
//import axios from "axios";
//import styled from "styled-components";
import Hero from "../components/Hero";
import Testimonials from "../components/Testimonials";
import EnquiryForm from "../components/EnquiryForm";


const About = () => {
    const [pageData, setPageData] = useState([]);
    /*
    useEffect(() => {
         let myarray = [];
         const api_path = `${process.env.REACT_APP_SERVER_URL}/wp-json/wp/v2/pages/76`;
         axios.get(api_path)
             .then(function (response) {
                 // handle success
                 //console.log(response);
                 //console.log(response.data);
                 myarray.push(response.data);
                 //console.log(myarray);
                 setPageData(myarray);
             })
             .catch(function (error) {
                 // handle error
                 console.log(error);
             })
             .finally(function () {
                 // always executed
             });
     }, []);*/


    useEffect(() => {
        let myarray = [];
        const apiPath = `${process.env.REACT_APP_SERVER_URL}/wp-json/wp/v2/pages/76`;

        fetch(apiPath)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json(); // Parse the response body as JSON
            })
            .then(data => {
                // Handle success
                myarray.push(data);
                setPageData(myarray);


            })
            .catch(error => {
                // Handle error
                console.log(error);
            });
        // No finally needed unless you have specific cleanup actions
    }, []);


    console.log(pageData);

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

            <section className="m-b-40">
                {
                    pageData.map((data, index) => {
                        //const { content, id, title } = data;
                        const { content } = data;
                        return (
                            <div className="" key={index}>
                                <div className="container">
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
            </section>

            <Testimonials />

            <EnquiryForm heading="Let's <span>dream</span> together" subhead="Your creative partner shouldn't be keeping you up at night." btnText="Let's Dream" />
        </>
    );
};

export default About;