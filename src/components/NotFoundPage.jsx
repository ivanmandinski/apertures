import React from 'react';
import { NavLink } from "react-router-dom";
import '../assets/scss/pages/page_not_found.scss';

const NotFoundPage = () => {
    return (
        <section className="page_not_found">
            <div className="container">
                <div className="row">
                    <div className="col-sm-12">
                        <h3><span>404</span></h3>
                        <h4><strong>Oops!! The page you are looking for doesn not exist.</strong></h4>
                        <NavLink to="/" className="primary_btn">Back to Home</NavLink>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default NotFoundPage;
