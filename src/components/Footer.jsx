import React, { useState, useEffect } from "react";
import '../assets/scss/layouts/footer.scss';

const Footer = () => {
    const [responseData, setResponseData] = useState([]);
    /*
    useEffect(() => {
        const api_path = `${process.env.REACT_APP_SERVER_URL}/wp-json/wp/v2/widgets`;
        axios.get(api_path)
            .then(function (response) {
                // handle success
                //console.log(response.data);
                setResponseData(response.data);
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
        const apiPath = `${process.env.REACT_APP_SERVER_URL}/wp-json/wp/v2/widgets`;
    
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
    

    return (
        <>
            <section className="footer">
                <div className="container">
                    <div className="row">
                        {
                            responseData.map((data, index) => {
                                const { sidebar, rendered } = data;

                                if (sidebar === "footer_top") {
                                    return (
                                        <div className="col-sm-12" key={index}>
                                            <div dangerouslySetInnerHTML={{ __html: rendered }}></div>
                                        </div>
                                    )
                                } else {
                                    return null;
                                }
                            })
                        }
                    </div>
                    <div className="row">
                        <div className="col-sm-12">
                            <div className="footer_wrapper">
                                <div className="row">
                                    {
                                        responseData.map((data, index) => {
                                            const { sidebar, rendered } = data;

                                            if (sidebar === "footer_column_1") {
                                                return (
                                                    <div className="col-sm-6 col-md-6 col-lg-3 footer_col" key={index}>
                                                        <div dangerouslySetInnerHTML={{ __html: rendered }}></div>
                                                    </div>
                                                )
                                            }

                                            if (sidebar === "footer_column_2") {
                                                return (
                                                    <div className="col-sm-6 col-md-6 col-lg-3 footer_col" key={index}>
                                                        <div dangerouslySetInnerHTML={{ __html: rendered }}></div>
                                                    </div>
                                                )
                                            }

                                            if (sidebar === "footer_column_3") {
                                                return (
                                                    <div className="col-sm-6 col-md-6 col-lg-3 footer_col" key={index}>
                                                        <div dangerouslySetInnerHTML={{ __html: rendered }}></div>
                                                    </div>
                                                )
                                            }

                                            if (sidebar === "footer_column_4") {
                                                return (
                                                    <div className="col-sm-6 col-md-6 col-lg-3 footer_col" key={index}>
                                                        <div dangerouslySetInnerHTML={{ __html: rendered }}></div>
                                                    </div>
                                                )
                                            }


                                            return null;
                                        })
                                    }

                                    {/*<div className="col-sm-3">
                                        <h4>STUDIO</h4>
                                        <p>Apertures Inc<br />
                                            22135 Davis Drive #113<br />
                                            Sterling, VA 20164<br />
                                            (703) 860-3686
                                        </p>
                                    </div>
                                    <div className="col-sm-3">
                                        <h4>CONTACT</h4>
                                        <p><a href="mailto:info@apertures.com">info@apertures.com</a></p>
                                    </div>
                                    <div className="col-sm-3">
                                        <h4>HOME</h4>
                                        <p>About Apertures<br />
                                            Success Portfolio<br />
                                            Let's Connect<br />
                                        </p>
                                    </div>
                                    <div className="col-sm-3">
                                        <ul className="social_list">
                                            <li>
                                                <a href="google.com" target="_blank">
                                                    <img src="./assets/mail.svg" alt="" />
                                                </a>
                                            </li>
                                            <li>
                                                <a href="google.com" target="_blank">
                                                    <img src="./assets/facebook.svg" alt="" />
                                                </a>
                                            </li>
                                            <li>
                                                <a href="google.com" target="_blank">
                                                    <img src="./assets/twitter.svg" alt="" />
                                                </a>
                                            </li>
                                            <li>
                                                <a href="google.com" target="_blank">
                                                    <img src="./assets/linkedin.svg" alt="" />
                                                </a>
                                            </li>
                                        </ul>
                                        <p>© Copyright 2022, Apertures Inc. All rights reserved.</p>
                                    </div> */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Footer;