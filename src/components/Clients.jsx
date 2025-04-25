import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import '../assets/scss/components/clients.scss';


const Clients = () => {
    const [responseData, setResponseData] = useState([]);
    /*
    useEffect(() => {
        const api_path = `${process.env.REACT_APP_SERVER_URL}/wp-json/my/v1/clientsData`;
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

    }, []);
    */
    useEffect(() => {
        const apiPath = `${process.env.REACT_APP_SERVER_URL}/wp-json/my/v1/clientsData`;
    
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

    var clientsSettings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 1,
        nextArrow: <ClientsNextArrow />,
        prevArrow: <ClientsPrevArrow />,
        responsive: [
            {
                breakpoint: 1199,
                settings: {
                    slidesToShow: 4
                },
            },
            {
                breakpoint: 991,
                settings: {
                    slidesToShow: 3
                },
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2
                },
            },
            {
                breakpoint: 576,
                settings: {
                    slidesToShow: 1
                },
            },
        ],
    };

    return (
        <section className="client-section">
            <div className="container">
                <div className="row">
                    <div className="col-sm-12">
                        <div className="clients_slide_wrapper">
                            <h4>CLIENTS</h4>

                            <div className="clients_slider">
                                <Slider {...clientsSettings}>
                                    {
                                        responseData.map((data, index) => {
                                            const { img } = data;
                                            return (
                                                <div className="clients_slide" key={index}>
                                                    <img src={img} alt="" loading="lazy" />
                                                </div>
                                            )
                                        })
                                    }
                                </Slider>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Clients;