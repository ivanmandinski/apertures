import React, { useEffect, useState } from "react";
import '../assets/scss/pages/home.scss';
import BlurbBox from "../components/Blurb";
import Testimonials from "../components/Testimonials";
import Clients from "../components/Clients";
import EnquiryForm from "../components/EnquiryForm";
//import { AnimationOnScroll } from 'react-animation-on-scroll';
import { NavLink } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

const Home = () => {
    const [heroBgImage, setHeroBgImage] = useState("");
    // const [heroBgImageMobile, setHeroBgImageMobile] = useState("");
    const [heroTitle, setHeroTitle] = useState("");
    const [heroTextData, setHeroTextData] = useState([]);
    const [animate, setAnimate] = useState(false);
    const [blurbData, setBlurbData] = useState([]);

    const [serviceHeading, setserviceHeading] = useState("");
    const [serviceSubheading, setserviceSubheading] = useState("");
    const [serviceItem, setserviceItem] = useState([]);
    const [serviceList, setserviceList] = useState([]);

    const [seoTitle, setSeoTitle] = useState("");
    const [seoDesc, setSeoDesc] = useState("");

    const [isLoading, setIsLoading] = useState(true);

    const ServiceItemPlaceholder = () => (
        <div className="col-sm-6 col-md-4 col-lg-4 col-xl-3">
            <p className="services_item_placeholder services_item">Loading</p>
        </div>
    );

    const [isHovering, setIsHovering] = useState(false);

    const handleMouseEnter = () => {
        setIsHovering(true);
    };

    const handleMouseLeave = () => {
        setIsHovering(false);
    };

    useEffect(() => {
        const apiPath = `${process.env.REACT_APP_SERVER_URL}/wp-json/my/v1/homedata`;
        fetch(apiPath)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json(); // Convert the response body to JSON
            })
            .then(data => {
                setHeroBgImage(data.hero_background_image);
                // setHeroBgImageMobile(data.hero_background_image_mobile);
                setHeroTitle(data.hero_title);
                setHeroTextData(data.hero_text);
                setBlurbData(data.blurbs);
                setserviceHeading(data.service_heading);
                setserviceSubheading(data.service_subheading);
                setserviceItem(data.service_item);
                setserviceList(data.service_list);

                setSeoTitle(data.seo_title);
                setSeoDesc(data.seo_desc);

                setIsLoading(false);
                setAnimate(true);
            })
            .catch(error => {
                console.log(error);
                setIsLoading(false);
            });
    }, []);


    useEffect(() => {
        const heroLabels = document.querySelectorAll('.hero-label');

        heroLabels.forEach((label, index) => {
            setTimeout(() => {
                label.classList.add('animate__fadeInUp');
            }, index * 1000);
        });
    }, []);

    return (
        <>
            <Helmet>
                <title>{seoTitle}</title>
                <meta name="description" content={seoDesc} />
                {/* <meta name="keywords" content="photography, Apertures, portfolio, services, moments" /> */}
            </Helmet>

            {/*
            https://aperturesdata.wpengine.com/wp-content/uploads/2024/02/Home-Banner.webp

            https://aperturesdata.wpengine.com/wp-content/uploads/2024/02/hero_banner_mobile.webp
            */}
            {/* <section className="home-section" style={{ backgroundImage: `url(https://aperturesdata.wpengine.com/wp-content/uploads/2024/02/Home-Banner.webp)` }}> */}

            <section className="home-section" style={{ backgroundImage: `url(${heroBgImage})` }}>
                <div className="home-section__caption">
                    <div className="container">
                        <div className="row">
                            <div className="col-sm-12">
                                <div className="home-section__caption-head">{heroTitle}</div>
                                <div className="row">
                                    <div className="col-11 offset-1 col-sm-11 offset-sm-1 col-md-10 offset-md-2">
                                        <ul className="home-section__caption-subhead">
                                            {
                                                heroTextData.map((data, index) => {
                                                    const { hero_label } = data;
                                                    return (
                                                        // <li key={index}>
                                                        //     <AnimationOnScroll offset="1" animateOnce={true} animateIn="animate__fadeInUp" delay={index * 1000}>
                                                        //         <span>{hero_label}</span>
                                                        //     </AnimationOnScroll>
                                                        // </li>
                                                        <li key={index}>
                                                            <div className={`hero-label ${animate ? 'animate__fadeInUp' : ''}`} style={{ animationDelay: `${index * 1}s` }}>
                                                                <span>{hero_label}</span>
                                                            </div>
                                                        </li>
                                                    )
                                                })
                                            }
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* <div className="home-section__poster">
                    <img src={heroBgImage} alt="" loading="lazy" />

                    <picture>
                        <source media="(min-width: 1280px)" srcSet={heroBgImage} />
                        <source media="(min-width: 768px)" srcSet={heroBgImage} />
                        <source media="(min-width: 480px)" srcSet={heroBgImageMobile} />
                        <img src={heroBgImageMobile} alt="" />
                    </picture>
                </div> */}
            </section>

            <section className="services">
                <div className="services-section">
                    <div className="container">
                        <div className="row">
                            <div className="col-sm-12">
                                <h2 dangerouslySetInnerHTML={{ __html: serviceHeading }}></h2>
                                <p dangerouslySetInnerHTML={{ __html: serviceSubheading }} className="mb-5"></p>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-sm-12">
                                <div className="service_wrapper">
                                    <div className="row">
                                        {
                                            serviceItem.map((data, index) => {
                                                const { srevice_item_image, srevice_item_heading, srevice_item_subheading, service_item_hover_heading, service_item_hover_link, service_item_hover_color } = data;
                                                return (
                                                    <div className="col-sm-6 col-md-6 col-lg-3" key={index}>
                                                        <section className="serviceCard">
                                                            <div className="service-card__img">
                                                                <img src={srevice_item_image} alt="" loading="lazy" width="306" height="227" className="img-fluid" />
                                                                <NavLink to={service_item_hover_link}>
                                                                    <div className="service-card__hover" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} style={{ backgroundColor: isHovering ? `${service_item_hover_color}80` : '', }}>
                                                                        <div className="service-card__hover-content">
                                                                            <p>{service_item_hover_heading}</p>
                                                                            {/* <img src="./assets/arrow.svg" alt="" width={53} /> */}
                                                                            <img src={`${process.env.PUBLIC_URL}/assets/arrow.svg`} alt="" width={53} height={24} loading="lazy" />
                                                                        </div>
                                                                    </div>
                                                                </NavLink>
                                                            </div>
                                                            <div className="service-card__text">
                                                                <h6>{srevice_item_heading}</h6>
                                                                <p>{srevice_item_subheading}</p>
                                                            </div>
                                                        </section>
                                                    </div>
                                                );
                                            })
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section>
                <div className="services-list">
                    <div className="container">
                        <div className="row">
                            <div className="col-sm-12">
                                <h3>Services</h3>
                                <div className="row">
                                    {
                                        isLoading ? (
                                            Array.from({ length: 20 }).map((_, index) => <ServiceItemPlaceholder key={index} />)
                                        ) : (
                                            serviceList.map((post, index) => {
                                                const { service_list_items } = post;
                                                return (
                                                    <div className="col-sm-6 col-md-4 col-lg-4 col-xl-3" key={index}>
                                                        <p className="services_item">{service_list_items}</p>
                                                    </div>
                                                );
                                            })
                                        )
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {
                blurbData.map((data, index) => {
                    const { blurb_heading, blurb_text, blurb_link_url, blurb_background_image, blurb_section_color } = data;

                    let sectionPosition = "";
                    (index % 2 === 0) ? sectionPosition = "even" : sectionPosition = "odd";

                    return (
                        <BlurbBox key={index} heading={blurb_heading} subtext={blurb_text} imgsrc={blurb_background_image} linkurl={blurb_link_url} bgcolor={blurb_section_color} sectioncount={`${sectionPosition}`} />
                    );
                })
            }

            <Testimonials />
            <Clients />
            <EnquiryForm heading="What are <span>you</span> after?" subhead="Let's get there, together." btnText="Let's Create!" />
        </>
    );
};

export default Home;