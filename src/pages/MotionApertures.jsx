import React, { useState, useEffect } from "react";
import Hero from "../components/Hero";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import '../assets/scss/pages/portfolio.scss';
import { Helmet } from 'react-helmet-async';
import Testimonials from "../components/Testimonials";
import EnquiryForm from "../components/EnquiryForm";

const MotionApertures = () => {

    const [nav1, setNav1] = useState();
    const [nav2, setNav2] = useState();

    const [showLightbox, setShowLightbox] = useState(false);
    const [responseData, setResponseData] = useState([]);

    useEffect(() => {
        const apiPath = `${process.env.REACT_APP_SERVER_URL}/wp-json/my/v1/motionApertures`;

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


    //const sliderRef = useRef();
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

    /*
    const sayHello = () => {
        alert("Hello!");
    };
    */

    const [showVideoLightbox, setShowVideoLightbox] = useState(false);
    //const videoClickRef = useRef(null);
    const handleClick = event => {
        setShowVideoLightbox(true);
        /*console.log(videoClickRef.current.dataset);
        console.log(videoClickRef.current.getAttribute('data-embed-code'));
        document.getElementById("add_to_me").innerHTML += videoClickRef.current.getAttribute('data-embed-code');
        */
        // 👇️ set attribute
        // ref.current.setAttribute('data-foo', 'bar');
        // console.log(ref.current.getAttribute('data-foo')); // 👉️ bar

        // ref.current.setAttribute('data-foo', 'baz');
        // console.log(ref.current.getAttribute('data-foo')); // 👉️ baz
        // console.log(event.currentTarget.dataset);
        // console.log(event.currentTarget.getAttribute('data-embed-code'));
        document.getElementById("add_to_me").innerHTML += event.currentTarget.getAttribute('data-embed-code');
    };

    const closevideo = () => {
        setShowVideoLightbox(false);
        document.getElementById("add_to_me").innerHTML = "";
    }


    return (
        <>
            {
                responseData.map((data, index) => {
                    const { seotitle, seodescription, title } = data;

                        const pageTitle = seotitle ? seotitle : `${title} - Apertures`;
                        return (
                            <Helmet key={index}>
                                <title>{pageTitle}</title>
                                <meta name="description" content={seodescription ? seodescription : ''} />
                            </Helmet>
                        )
                })
            }
            <Hero />


            <section className="m-b-40">
                <div className="container">
                    <div className="row">
                        <div className="col-sm-12">
                            {
                                responseData.map((data, index) => {
                                    const { content } = data;
                                    return (
                                        <div className="" key={index}>
                                            <div className="container">
                                                <div className="row">
                                                    <div className="col-sm-12">
                                                        <div>
                                                            <div dangerouslySetInnerHTML={{ __html: content }}></div>
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

            <section className="lightBox">
                {
                    <div className={`mylightbox ${showLightbox ? "showLightbox" : ""}`}>
                        <section className="lightboxWrapper">
                            <div className="lightbox_wrapper">
                                <img className="lightbox_close mb-3" alt="" loading="lazy" src={`${process.env.REACT_APP_SERVER_URL}/wp-content/uploads/2022/12/close.svg`} width={25} onClick={() => { setShowLightbox(false) }} />
                                {
                                    responseData.map((data, index) => {
                                        const { gallery } = data;
                                            return (
                                                <div className="photo_slider" key={`photo-slider-${index}`}>
                                                    <Slider {...imgSliderSetting} key={index} asNavFor={nav2} ref={(slider1) => setNav1(slider1)}>
                                                        {
                                                            (gallery !== false) ? (
                                                                gallery.map(function (item, i) {
                                                                    const { gallery_images_title, gallery_images, video_url } = item;
                                                                    /*
                                                                    return (
                                                                        <div key={i}>
                                                                            <img src={gallery_images} alt="" className="img-fluid photo_slider_images" />
                                                                            <p className="photo_slider_title">{gallery_images_title}</p>
                                                                        </div>
                                                                        )
                                                                        */

                                                                    if (video_url) {
                                                                        return (
                                                                            <div key={i} onClick={handleClick} data-embed-code={video_url}>
                                                                                <div className="videobox">

                                                                                    <img src={gallery_images} alt="" loading="lazy" className="img-fluid photo_slider_images cursor-pointer" />

                                                                                    <p className="photo_slider_title">{gallery_images_title}</p>
                                                                                </div>
                                                                            </div>
                                                                        )
                                                                    } else {
                                                                        return (
                                                                            <div key={i}>
                                                                                <img src={gallery_images} alt="" loading="lazy" className="img-fluid photo_slider_images" />
                                                                                <p className="photo_slider_title">{gallery_images_title}</p>
                                                                            </div>
                                                                        )
                                                                    }

                                                                })
                                                            ) : null
                                                        }
                                                    </Slider>
                                                </div>
                                            )
                                    })
                                }


                                {
                                    responseData.map((data, index) => {
                                        const { slug, gallery } = data;
                                            return (
                                                <div className="nav_slider" key={`nav-slider-${index}`}>
                                                    <Slider {...navSliderSetting} asNavFor={nav1} ref={(slider2) => setNav2(slider2)}>
                                                        {
                                                            (gallery !== false) ? (
                                                                gallery.map(function (item, ind) {
                                                                    const { gallery_images } = item;
                                                                    return (
                                                                        <div key={ind}>
                                                                            <img src={gallery_images} alt="" loading="lazy" className="img-fluid nav_slider_images" />
                                                                        </div>
                                                                    )
                                                                })
                                                            ) : null
                                                        }
                                                    </Slider>
                                                </div>
                                            )

                                    })
                                }

                            </div>
                        </section>
                    </div>
                }
            </section>


            <section className="videoLightBox">
                {
                    <div className={`myVideoLightBox ${showVideoLightbox ? "showVideoLightbox" : ""}`}>
                        <img className="lightbox_close mb-3" alt="" loading="lazy" src={`${process.env.REACT_APP_SERVER_URL}/wp-content/uploads/2022/12/close.svg`} width={25} onClick={closevideo} />

                        <div className="embed_code" id="add_to_me"></div>
                    </div>
                }
            </section>

            <Testimonials />

            <EnquiryForm heading="What are <span>you</span> after?" subhead="Let's get there, together." btnText="Let's Create!" />
        </>
    );
}

export default MotionApertures;