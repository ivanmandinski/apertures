import React, { useState, useEffect } from "react";
import { NavLink, Link } from 'react-router-dom';
import '../assets/scss/layouts/header.scss';

const Header = () => {
    const [isActive, setActive] = useState(false);
    const menuToggle = () => {
        setActive(!isActive);
    }
    const [responseData, setResponseData] = useState({});
    const [mainNavData, setMainNavData] = useState([]);
    /*useEffect(() => {
        const api_path = `${process.env.REACT_APP_SERVER_URL}/wp-json/my/v1/mainMenu`;
        axios.get(api_path)
            .then(function (response) {
                // handle success
                //console.log(response.data);
                setResponseData(response.data);
                setMainNavData(response.data.main_nav);
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
        const apiPath = `${process.env.REACT_APP_SERVER_URL}/wp-json/my/v1/mainMenu`;

        fetch(apiPath)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                setResponseData(data);
                setMainNavData(data.main_nav);
            })
            .catch(error => {
                console.log(error);
            });
    }, []);

    return (
        <>
            <nav className={isActive ? 'show' : null}>
                <div className={`nav-wrapper ${isActive ? 'show' : null}`} >
                    <div className="nav-wrapper__nav-close">
                        <img src={`${process.env.REACT_APP_SERVER_URL}/wp-content/uploads/2022/12/close.svg`} alt="" onClick={menuToggle} loading="lazy" height={30} width={30} />
                    </div>
                    <div className="nav-wrapper__nav-content">
                        <ul>
                            {
                                mainNavData.map((data, index) => {
                                    const { ID, url, title, menu_item_parent, object, target } = data;
                                    let newurl;
                                    if (object === 'custom') {
                                        newurl = url;
                                    } else {
                                        newurl = url.replace(process.env.REACT_APP_SERVER_URL, "");
                                    }

                                    let linkitem;
                                    if (target === '_blank') {
                                        linkitem = <a href={newurl} target={target} onClick={menuToggle}>{title}</a>
                                    } else {
                                        linkitem = <Link to={newurl} target={target} onClick={menuToggle} >{title}</Link>
                                    }

                                    if (menu_item_parent === '0') {
                                        return (
                                            <li key={index}>
                                                {linkitem}

                                                <ul className="submenu">
                                                    {
                                                        mainNavData.map((data, index) => {
                                                            const { url, title, menu_item_parent, object, target } = data;

                                                            let newurl;
                                                            if (object === 'custom') {
                                                                newurl = url;
                                                            } else {
                                                                newurl = url.replace(process.env.REACT_APP_SERVER_URL, "");
                                                            }

                                                            let linkitem;
                                                            if (target === '_blank') {
                                                                linkitem = <a href={newurl} target={target} onClick={menuToggle}>{title}</a>
                                                            } else {
                                                                linkitem = <Link to={newurl} target={target} onClick={menuToggle} >{title}</Link>
                                                            }

                                                            if (ID === Number(menu_item_parent)) {
                                                                return (
                                                                    <li key={index}>
                                                                        {linkitem}
                                                                    </li>
                                                                )
                                                            }

                                                            return null;
                                                        })
                                                    }
                                                </ul>
                                            </li>
                                        )
                                    }

                                    return null;

                                })
                            }
                        </ul>
                    </div>
                </div>
            </nav>

            <section className="headerSection">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-9 col-sm-8">
                            {
                                <NavLink to="/">
                                    <img src={responseData.site_logo} alt={responseData.site_name} className="logo" loading="lazy" width="414" height="78" />
                                </NavLink>
                            }
                        </div>
                        <div className="col-3 col-sm-4 menu_icon_wrapper">
                            <img src={`${process.env.REACT_APP_SERVER_URL}/wp-content/uploads/2024/04/NAV-HMBRG-MENU.svg`} alt="" className="menu_icon" onClick={menuToggle} loading="lazy" width="108" height="52" />
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Header;