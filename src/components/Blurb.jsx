import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import '../assets/scss/components/blurb.scss';

const Blurb = (props) => {
    const [isHovering, setIsHovering] = useState(false);

    const handleMouseEnter = () => {
        setIsHovering(true);
    };

    const handleMouseLeave = () => {
        setIsHovering(false);
    };

    const section_position = props.sectioncount;
    if (section_position === "even") {
        return (
            <>
                <section sectionbgcolor={props.bgcolor} style={{ backgroundColor: props.bgcolor }}>
                    <div className="blurb-section blurb-section-even">
                        <div className="container">
                            <div className="row">
                                <div className="col-12 col-md-5 order-2 order-sm-2 order-md-1">
                                    <div className="blurb-section__text-wrapper">
                                        <div className="blurb-section__text">
                                            <p>{props.subtext}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-12 col-md-7 order-1 order-sm-1 order-md-2">
                                    <div className="blurb-section__img-wrapper">
                                        <div className="blurb-section__img" style={{ backgroundImage: `url(${props.imgsrc})` }}></div>
                                        <div className="blurb-section__img-hover">
                                            <NavLink to={props.linkurl} className="blurb-section__img-hover-box" onMouseEnter={handleMouseEnter}
                                                onMouseLeave={handleMouseLeave} style={{
                                                    backgroundColor: isHovering ? `${props.bgcolor}BF` : '',
                                                }}>
                                                <p>{props.heading}</p>
                                                {/* <img src="./assets/arrow.svg" alt="" width={53} /> */}
                                                <img src={`${process.env.PUBLIC_URL}/assets/arrow.svg`} alt="" width={53} height={23} loading="lazy" />
                                            </NavLink>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </>
        );
    } else {
        return (
            <>
                <section sectionbgcolor={props.bgcolor} style={{ backgroundColor: props.bgcolor }}>
                    <div className="blurb-section blurb-section-odd">
                        <div className="container">
                            <div className="row">
                                <div className="col-md-7">
                                    <div className="blurb-section__img-wrapper">
                                        <div className="blurb-section__img" style={{ backgroundImage: `url(${props.imgsrc})` }}></div>
                                        <div className="blurb-section__img-hover">
                                            <NavLink to={props.linkurl} className="blurb-section__img-hover-box" onMouseEnter={handleMouseEnter}
                                                onMouseLeave={handleMouseLeave} style={{
                                                    backgroundColor: isHovering ? `${props.bgcolor}BF` : '',
                                                }}>
                                                <p>{props.heading}</p>
                                                {/* <img src="./assets/arrow.svg" alt="" width={53} /> */}
                                                <img src={`${process.env.PUBLIC_URL}/assets/arrow.svg`} alt="" width={53} height={23} loading="lazy" />
                                            </NavLink>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-5">
                                    <div className="blurb-section__text-wrapper">
                                        <div className="blurb-section__text">
                                            <p>{props.subtext}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </>
        );
    }
}

export default Blurb;


