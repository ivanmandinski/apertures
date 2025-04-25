import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import '../assets/scss/components/testimonials.scss';


const Testimonials = () => {
    const [responseData, setResponseData] = useState([]);
    /*useEffect(() => {
        const api_path = `${process.env.REACT_APP_SERVER_URL}/wp-json/my/v1/testimonialsData`;
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
        const apiPath = `${process.env.REACT_APP_SERVER_URL}/wp-json/my/v1/testimonialsData`;

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


    function TestimonialNextArrow(props) {
        const { className, style, onClick } = props;
        return (
            <div
                className={className}
                style={{ ...style, display: "block" }}
                onClick={onClick}
            />
        );
    }

    function TestimonialPrevArrow(props) {
        const { className, style, onClick } = props;
        return (
            <div
                className={className}
                style={{ ...style, display: "block" }}
                onClick={onClick}
            />
        );
    }

    var testimonialSettings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        adaptiveHeight: true,
        nextArrow: <TestimonialNextArrow />,
        prevArrow: <TestimonialPrevArrow />
    };

    return (
        <section className="testimonial-slider">
            <div className="container">
                <div className="row">
                    <div className="col-sm-12">
                        <div className="testimonial_slide_wrapper">
                            <Slider {...testimonialSettings}>
                                {
                                    responseData.map((data, index) => {
                                        const { title, content, author, img } = data;
                                        return (
                                            <div className="testimonial-slide" key={index}>
                                                <div className="row align-items-center">
                                                    <div className="col-lg-6">
                                                        <div className="testimonial-text">
                                                            <h4>{title}</h4>
                                                            <div dangerouslySetInnerHTML={{ __html: content }}></div>
                                                            <p className="author_name"><i>{author}</i></p>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-6">
                                                        {/* <img src={img} alt="" className="testimonial_img" loading="lazy" width="556" height="472" /> */}
                                                        <img src={img} alt="" className="testimonial_img img-fluid"
                                                            loading={index === 0 ? undefined : "lazy"}
                                                            width="556" height="472" />
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </Slider>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Testimonials;