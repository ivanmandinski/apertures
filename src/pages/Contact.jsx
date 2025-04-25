import React, { useEffect, useState } from "react";
import Hero from "../components/Hero";
import EnquiryForm from "../components/EnquiryForm";
import { Helmet } from 'react-helmet-async';

const Contact = () => {
    /*const [tokenData, setTokenData] = useState(null);
    useEffect(() => {
        axios.post('http://localhost/apertures/server/wp-json/jwt-auth/v1/token', {
            username: 'admin',
            password: 'admin123'
        })
            .then(function (response) {
                console.log(response.data.token);
                setTokenData(response.data.token);
            })
            .catch(function (error) {
                console.log(error);
            });
    }, []);
    */

    /*
    useEffect(() => {
        if(tokenData){
            const config = {
                headers: { Authorization: `Bearer ${tokenData}` }
            };
            axios.post('http://localhost/apertures/server/wp-json/wp/v2/posts', {
                title: 'This is my final test',
                content: 'lorem ipsum is dummy post',
                status: 'publish'
            },
                config
            )
                .then(function (response) {
                    console.log(response);
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
    }, []);
    */
    /*
        const myEle = useRef();
        useEffect(() => {
            const el = myEle.current;
    
            gsap.to(el, { // selector text, Array, or object
                x: 300, // any properties (not limited to CSS)
                duration: 3, // seconds
                delay: 0,
                ease: "power4.inOut",
                opacity: 1,
    
                scrollTrigger: {
                    trigger: el, // selector or element
                    start: "top 80%",  // [trigger] [scroller] positions
                    scrub: true,
                    //markers: true // only during development!
                }
            });
        }, []);
    */

    const [pageData, setPageData] = useState([]);
    /*
        useEffect(() => {
            let myarray = [];
            const api_path = `${process.env.REACT_APP_SERVER_URL}/wp-json/wp/v2/pages/83`;
            axios.get(api_path)
                .then(function (response) {
                    // handle success
                    //console.log(response);
                    //console.log(response.data);
                    myarray.push(response.data);
                    setPageData(myarray);
                })
                .catch(function (error) {
                    // handle error
                    console.log(error);
                })
                .finally(function () {
                    // always executed
                });
        }, []);
    
        */

    useEffect(() => {
        let myarray = [];
        const apiPath = `${process.env.REACT_APP_SERVER_URL}/wp-json/wp/v2/pages/83`;


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
            {/* <Helmet>
                <title>Contact Us - Apertures</title>
                <meta name="description" content="Get in touch with us for any queries, support, or feedback. We're here to help you with your needs." />
                <meta name="keywords" content="contact, support, queries, feedback, company name" />
            </Helmet> */}

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
                            {/* <div ref={myEle} className="myele">A</div> */}
                        </div>
                    </div>
                </div>
            </section>

            <EnquiryForm heading="Let's <span>build</span> together." subhead="We love shaping ideas into results." btnText="Let's Chat" />
        </>
    );
};

export default Contact;