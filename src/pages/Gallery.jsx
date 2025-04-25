/**
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * Not is use
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * */
import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import Hero from "../components/Hero";
import '../assets/scss/pages/gallery.scss';
import { Helmet } from 'react-helmet-async';
const Gallery = () => {
    const [pageData, setPageData] = useState([]);
    /*useEffect(() => {
        let dataArray = [];
        const api_path = `${process.env.REACT_APP_SERVER_URL}/wp-json/wp/v2/pages/158`;
        axios.get(api_path)
            .then(function (response) {
                //console.log(response);
                //console.log(response.data);
                dataArray.push(response.data);
                setPageData(dataArray);
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
        let dataArray = [];
        const apiPath = `${process.env.REACT_APP_SERVER_URL}/wp-json/wp/v2/pages/158`;

        fetch(apiPath)
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




    const [gallerypageData, setGallerypageData] = useState([]);
    /*useEffect(() => {
        const api_path = `${process.env.REACT_APP_SERVER_URL}/wp-json/my/v1/photographyData`;
        axios.get(api_path)
            .then(function (response) {
                // handle success
                //console.log(response);
                //console.log(response.data);
                setGallerypageData(response.data);
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
        const apiPath = `${process.env.REACT_APP_SERVER_URL}/wp-json/my/v1/photographyData`;

        fetch(apiPath)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                setGallerypageData(data);
            })
            .catch(error => {
                console.log(error);
            });
    }, []);


    var catTempArry = [];
    var uniqueTags = [];
    const [uniqueCatroyData, setUniqueCatroyData] = useState([]);
    const catfunction = () => {
        gallerypageData.map((data, index) => {
            const { category } = data;
            return (
                category.map((catdata, i) => {
                    const { term_id, name, slug } = catdata;
                    var myobj = {
                        'term_id': term_id,
                        'name': name,
                        'slug': slug
                    }
                    catTempArry = [...catTempArry, myobj];
                    //return null;
                })
            )
        })

        /* unique values of a specific key in an array of objects?
        https://codeburst.io/javascript-array-distinct-5edc93501dc4
        */

        /*
        const unique = (value, index, self) => {
            return self.indexOf(value) === index
        }
        const uniqueCategories = catTempArry.filter(unique);
        finalCatArr = uniqueCategories;
        */

        /*
        let uniqueTags = [];
        catTempArry.map(data => {
            if (uniqueTags.indexOf(data.term_id) === -1) {
                uniqueTags = [...uniqueTags, data.term_id];
            }
        });
        */
        const map = new Map();
        for (const item of catTempArry) {
            if (!map.has(item.term_id)) {
                map.set(item.term_id, true);
                uniqueTags.push({
                    term_id: item.term_id,
                    name: item.name,
                    slug: item.slug
                });
            }
        }
        return null;
    }

    useEffect(() => {
        catfunction();
        setUniqueCatroyData(uniqueTags);
    }, [gallerypageData]);


    return (
        <>

            {
                pageData.map((data, index) => {
                    const { acf } = data;
                    return (
                        <Helmet>
                            <title>{acf.seo_title}</title>
                            <meta name="description" content={acf.seo_description} />
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

            <section class="gallerySection">
                <div className="container">
                    <div className="row">
                        <div className="col-sm-12">
                            <ul className="filter_list">
                                <li><strong>FILTER+</strong></li>
                                {
                                    uniqueCatroyData.map((catdata, i) => {
                                        const { term_id, name, slug } = catdata;
                                        return (
                                            <>
                                                {/* <NavLink to={`/gallery`}>
                                                    <li key={i}>{name}</li>
                                                </NavLink> */}
                                                <NavLink to={`/gallery/${slug}`}>
                                                    <li key={i}>{name}</li>
                                                </NavLink>
                                            </>
                                        )
                                    })
                                }
                            </ul>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-sm-12">
                            <div className="gallery_container">
                                {
                                    gallerypageData.map((data, index) => {
                                        const { featimg } = data;
                                        return (
                                            <img key={index} src={featimg} alt="" loading="lazy" />
                                        )
                                    })
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </>
    );
};


export default Gallery;