import React, { useState, useEffect } from "react";
import { NavLink, useParams } from "react-router-dom";
import Hero from "../components/Hero";
import Slider from "react-slick";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
import '../assets/scss/pages/photography.scss';
import { Helmet } from 'react-helmet-async';

const PhotographyCategory = () => {
    let { category } = useParams();

    const [pageData, setPageData] = useState([]);
    /*useEffect(() => {
        let dataArray = [];
        axios.get(`${process.env.REACT_APP_SERVER_URL}/wp-json/wp/v2/pages/158`)
            .then(function (response) {
                //console.log(response);
                //console.log(response.data);
                dataArray.push(response.data);
                //console.log(dataArray);
                setPageData(dataArray);
                //console.log('1st');
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
            .finally(function () {
                // always executed
            });
        // eslint-disable-next-line react-hooks/exhaustive-deps            
    }, []);
    */
    useEffect(() => {
        let dataArray = [];
        fetch(`${process.env.REACT_APP_SERVER_URL}/wp-json/wp/v2/pages/158`)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                dataArray.push(data);
                setPageData(dataArray);
            })
            .catch(error => {
                console.log(error);
            });
    }, []);


    const [photographyCategoryData, setPhotographyCategoryData] = useState([]);
    /*useEffect(() => {
        axios.get(`${process.env.REACT_APP_SERVER_URL}/wp-json/my/v1/PhotographyCategoryData`)
            .then(function (response) {
                // handle success
                //console.log(response);
                //console.log(response.data);
                setPhotographyCategoryData(response.data);
                //console.log('2nd');
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
        fetch(`${process.env.REACT_APP_SERVER_URL}/wp-json/my/v1/PhotographyCategoryData`)
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


    /*
    const [tokenError, setTokenError] = useState(false);
    const [photographyData, setPhotographyData] = useState([]);

    const [tokenData, setTokenData] = useState(null);
    const token_fun = () => {
        if (tokenData || tokenError) return; // Avoid refetching if we already have a token or encountered an error
    
        const api_path = `${process.env.REACT_APP_SERVER_URL}/wp-json/jwt-auth/v1/token`;
        axios.post(api_path, {
            username: process.env.REACT_APP_admin_username,
            password: process.env.REACT_APP_admin_password
        })
        .then(response => {
            setTokenData(response.data.token);
            setTokenError(false); // Reset error state on successful fetch
        })
        .catch(error => {
            console.error("Token fetch error:", error);
            setTokenError(true);
        });
    };*/


    const [tokenError, setTokenError] = useState(false);
    const [photographyData, setPhotographyData] = useState([]);

    const [tokenData, setTokenData] = useState(null);
    const token_fun = () => {
        if (tokenData || tokenError) return; // Avoid refetching if we already have a token or encountered an error

        const apiPath = `${process.env.REACT_APP_SERVER_URL}/wp-json/jwt-auth/v1/token`;

        fetch(apiPath, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: process.env.REACT_APP_admin_username,
                password: process.env.REACT_APP_admin_password
            })
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                setTokenData(data.token);
                setTokenError(false); // Reset error state on successful fetch
            })
            .catch(error => {
                console.error("Token fetch error:", error);
                setTokenError(true);
            });
    };

    /*
    useEffect(() => {
        if (!tokenData || tokenError) {
            //console.log("No token available or there was an error fetching the token.");
            return; // Exit this useEffect if no token or if there's an error
        }
    
        const config = {
            headers: { Authorization: `Bearer ${tokenData}` }
        };
    
        const api_path = `${process.env.REACT_APP_SERVER_URL}/wp-json/my/v1/photography_slug`;
        axios.post(api_path, { 'slug': category }, config)
            .then(response => {
                setPhotographyData(response.data);
            })
            .catch(error => {
                console.error("Authenticated request error:", error);
            });
        // Include category in the dependency array if it's a state or prop to re-fetch when it changes
    }, [tokenData, tokenError, category]); 
    
    useEffect(() => {
        //setTokenError(false); // Reset error state to allow retrying token fetch
        token_fun();
        // eslint-disable-next-line react-hooks/exhaustive-deps   
    }, []);
    */
    useEffect(() => {
        if (!tokenData || tokenError) {
            return; // Exit this useEffect if no token or if there's an error
        }

        const config = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${tokenData}`
            },
            body: JSON.stringify({ 'slug': category })
        };

        const apiPath = `${process.env.REACT_APP_SERVER_URL}/wp-json/my/v1/photography_slug`;
        fetch(apiPath, config)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                setPhotographyData(data);
            })
            .catch(error => {
                console.error("Authenticated request error:", error);
            });
    }, [tokenData, tokenError, category]);

    useEffect(() => {
        //setTokenError(false); // Reset error state to allow retrying token fetch
        token_fun();
        // eslint-disable-next-line react-hooks/exhaustive-deps   
    }, []);



    const [nav1, setNav1] = useState();
    const [nav2, setNav2] = useState();
    const [showLightbox, setShowLightbox] = useState(false);

    function ClientsNextArrow(props) {
        const { className, style, onClick } = props;
        return (
            <div
                className={className}
                style={{ ...style, display: "block" }}
                onClick={onClick}
            />
        );
    }

    function ClientsPrevArrow(props) {
        const { className, style, onClick } = props;
        return (
            <div
                className={className}
                style={{ ...style, display: "block" }}
                onClick={onClick}
            />
        );
    }

    var imgSliderSetting = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        prevArrow: false,
        nextArrow: false
    };

    var navSliderSetting = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        prevArrow: <ClientsPrevArrow />,
        nextArrow: <ClientsNextArrow />,
        centerMode: true,
        focusOnSelect: true,
        variableWidth: true
    };

    const lightbox = (imgcount) => {
        setShowLightbox(true);
        //console.log(sliderRef);
        //sliderRef.current.slickGoTo(imgcount);
        nav1.slickGoTo(imgcount);
        /*console.log(nav1);
        console.log(nav2);*/
    }
    return (
        <>

            {
                photographyCategoryData.map((data, index) => {
                    const { slug, name, seotitle, seodescription } = data;
                    if (slug === category) {

                        const pageTitle = seotitle ? seotitle : `${name} - Apertures`;
                        return (
                            <Helmet key={index}>
                                <title>{pageTitle}</title>
                                <meta name="description" content={seodescription ? seodescription : ''} />
                            </Helmet>
                        )
                    }
                    return null;
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

            <section>
                {
                    pageData.map((data, index) => {
                        const { content } = data;
                        return (
                            <div className="" key={index}>
                                <div className="container">
                                    <div className="row">
                                        <div className="col-sm-12">
                                            <div dangerouslySetInnerHTML={{ __html: content.rendered }}></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </section>

            <section className="photographySection m-b-40">
                <div className="container">
                    <div className="row">
                        <div className="col-sm-12">
                            <ul className="filter_list">
                                <li><strong>FILTER+</strong></li>
                                {
                                    photographyCategoryData.map((data, index) => {
                                        //const { id, name, slug, count, featured_image } = data;
                                        const { name, slug, count } = data;
                                        if (count !== 0) {
                                            return (
                                                <li key={index}>
                                                    <NavLink to={`/photography/${slug}`}>
                                                        {name}
                                                    </NavLink>
                                                </li>
                                            )
                                        }
                                        return null;
                                    })
                                }
                            </ul>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-sm-12">
                            <div className="gallery_container">
                                {
                                    (photographyData.length !== 0) ? (
                                        photographyData.map((data, index) => {
                                            //const { id, slug, title, featimg } = data;
                                            const { featimg } = data;
                                            return (
                                                <img key={index} src={featimg} onClick={() => lightbox(index)} alt="" loading="lazy" />
                                            )
                                        })
                                    ) : (
                                        <h4>No data found</h4>
                                    )
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="lightBox">
                {
                    <div className={`mylightbox ${showLightbox ? "showLightbox" : ""}`}>
                        <section className="lightboxWrapper">
                            <div className="lightbox_wrapper">
                                <img className="lightbox_close mb-3" alt="" loading="lazy" src={`${process.env.REACT_APP_SERVER_URL}/wp-content/uploads/2022/12/close.svg`} width={25} onClick={() => { setShowLightbox(false) }} />
                                <div className="photo_slider">
                                    <Slider {...imgSliderSetting} asNavFor={nav2} ref={(slider1) => setNav1(slider1)}>
                                        {
                                            photographyData.map(function (item, i) {
                                                const { title, featimg } = item;
                                                return (
                                                    <div key={i}>
                                                        <img src={featimg} alt="" loading="lazy" className="img-fluid photo_slider_images" />
                                                        <p className="photo_slider_title">{title}</p>
                                                    </div>
                                                )
                                            })

                                        }
                                    </Slider>
                                </div>

                                <div className="nav_slider">
                                    <Slider {...navSliderSetting} asNavFor={nav1} ref={(slider2) => setNav2(slider2)}>
                                        {
                                            photographyData.map(function (item, index) {
                                                const { featimg } = item;
                                                return (
                                                    <div key={index}>
                                                        <img src={featimg} alt="" loading="lazy" className="img-fluid nav_slider_images" />
                                                    </div>
                                                )
                                            })
                                        }
                                    </Slider>
                                </div>
                            </div>
                        </section>
                    </div>
                }
            </section>
        </>
    );
};

export default PhotographyCategory;