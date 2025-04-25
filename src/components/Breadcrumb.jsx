import React from "react";
import { Link } from 'react-router-dom';
import useBreadcrumbs from 'use-react-router-breadcrumbs'
import '../assets/scss/components/breadcrumb.scss';

const Breadcrumb = () => {
    const breadcrumbs = useBreadcrumbs();
    //console.log(breadcrumbs);

    return (
        <section className="m-b-40">
            <div className="container">
                <div className="row">
                    <nav className="breadcrumb_wrapper">
                        {breadcrumbs.map(({ match, breadcrumb }) => (
                            <Link key={match.pathname} to={match.pathname}>
                                {breadcrumb}
                            </Link>
                        ))}
                    </nav>
                </div>
            </div>
        </section>
    );
}

export default Breadcrumb;