import React, { useState, useEffect } from "react";
import Breadcrumb from "./Breadcrumb";
import '../assets/scss/components/hero.scss';

const Hero = (props) => {
    const propsTitle = props.hero_title;
    const propsSubTitle = props.hero_subtitle
    const media_id = props.hero_img;
    const [responseData, setResponseData] = useState({});

    /*useEffect(() => {
        if (media_id !== undefined) {
            const api_path = `${process.env.REACT_APP_SERVER_URL}/wp-json/wp/v2/media/` + media_id;
            axios.get(api_path)
                .then(function (response) {
                    // handle success
                    //console.log(response.data.source_url);
                    setResponseData(response.data.source_url);
                })
                .catch(function (error) {
                    // handle error
                    console.log(error);
                })
                .finally(function () {
                    // always executed
                });
        }
         // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    */
    useEffect(() => {
        if (media_id !== undefined) {
            const apiPath = `${process.env.REACT_APP_SERVER_URL}/wp-json/wp/v2/media/` + media_id;
    
            fetch(apiPath)
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`HTTP error! status: ${response.status}`);
                    }
                    return response.json();
                })
                .then(data => {
                    setResponseData(data.source_url);
                })
                .catch(error => {
                    console.log(error);
                });
        }
    }, [media_id]); // Consider adding media_id to dependency array if it's expected to change
    

    const [headerCondition, setHeaderCondition] = useState(false);
    useEffect(() => {
        if (propsTitle && propsSubTitle && media_id) {
            setHeaderCondition(true);
        }
         // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [responseData]);

    if (headerCondition) {
        return (
            <>
                <section>
                    <div className="hero-section">
                        <div className="hero-section__caption">
                            <div className="container">
                                <div className="row">
                                    <div className="col-xl-6">
                                        <h2>{propsTitle}</h2>
                                    </div>
                                    <div className="col-xl-6">
                                        <p>{propsSubTitle}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="hero-section__poster">
                            <img src={responseData} alt="" loading="lazy" />
                        </div>
                    </div>
                </section>

                <Breadcrumb />
            </>
        );
    } else {
        return (
            <>
                <section>
                    <div className="hero-section hero-section2">

                    </div>
                </section>

                <Breadcrumb />
            </>
        );
    }
}

export default Hero;