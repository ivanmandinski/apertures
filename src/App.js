import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PreloadHeroImage from './components/PreloadContent';
import Header from './components/Header';
//import Footer from './components/Footer';
import './assets/bootstrap5.css';
import './assets/scss/main.scss';
import ScrollToTop from './components/ScrollToTop';
import { Helmet, HelmetProvider } from 'react-helmet-async';
//import './assets/css/js_composer.min.css';
//import './assets/js/dist/js_composer_front.min';

//import "@wordpress/block-library/build-style/common.css";
//import "@wordpress/block-library/build-style/style.css";
//import "@wordpress/block-library/build-style/theme.css";

/*
import Home from './pages/Home';
import Photography from './pages/Photography';
import PhotographyCategory from './pages/PhotographyCategory';
import Contact from './pages/Contact';
import Portfolio from './pages/Portfolio';
import Content from './pages/Content';
import Error from './pages/Error';
import PortfolioDetail from './pages/PortfolioDetail';
*/
const Home = lazy(() => import('./pages/Home'));
const Photography = lazy(() => import('./pages/Photography'));
const PhotographyCategory = lazy(() => import('./pages/PhotographyCategory'));
const Contact = lazy(() => import('./pages/Contact'));
const BrandingCases = lazy(() => import('./pages/BrandingCases'));
const Content = lazy(() => import('./pages/Content'));
const MotionApertures = lazy(() => import('./pages/MotionApertures'));

const About = lazy(() => import('./pages/About'));
const Error = lazy(() => import('./pages/Error'));
const BrandingCasesDetail = lazy(() => import('./pages/BrandingCasesDetail'));
const Footer = lazy(() => import('./components/Footer'));

function App() {
	/*console.log(process.env.REACT_APP_admin_username);
	console.log(process.env.REACT_APP_admin_password);
	console.log(process.env.REACT_APP_SERVER_URL);
	console.log(process.env.REACT_APP_URL);*/

	/* to update the base url of css varible */
	/*useEffect(() => {
		const baseUrl = process.env.REACT_APP_SERVER_URL;

		console.log(baseUrl);
		document.documentElement.style.setProperty('--worpdress-base-url', baseUrl);
	}, []);
	*/

	return (
		<>
			<HelmetProvider>
				<PreloadHeroImage />
				<Helmet>
					<title>Apertures</title>
					<meta name="description" content="" />
					{/* <meta name="keywords" content="photography, Apertures, portfolio, services, moments" /> */}
				</Helmet>
				<Router>
					<ScrollToTop />
					<Header />
					<Suspense fallback={<div>Loading...</div>}>
						<Routes>
							<Route exact path="/" element={<Home />}></Route>
							<Route exact path="/photography" element={<Photography />}></Route>
							<Route exact path="/photography/:category" element={<PhotographyCategory />}></Route>
							<Route exact path="/branding-cases" element={<BrandingCases />}></Route>
							<Route exact path="/branding-cases/:brandingslug" element={<BrandingCasesDetail />} />
							<Route exact path="/lets-connect" element={<Contact />}></Route>
							<Route exact path="/about-apertures" element={<About />}></Route>
							<Route exact path="/motion-moves-audiences" element={<MotionApertures />}></Route>
							<Route path="*" element={<Error />}></Route>
							<Route exact path="/:pageslug" element={<Content />}></Route>
						</Routes>
					</Suspense>
					{/* <Routes>
					<Route exact path="/" element={<Home />}></Route>
					<Route exact path="/photography" element={<Photography />}></Route>
					<Route exact path="/photography/:category" element={<PhotographyCategory />}></Route>
					<Route exact path="/client-success" element={<Portfolio />}></Route>
					<Route exact path="/client-success/:portfolioslug" element={<PortfolioDetail />} />
					<Route exact path="/lets-connect" element={<Contact />}></Route>
					<Route path="*" element={<Error />}></Route>
					<Route exact path="/:pageslug" element={<Content />}></Route>
				</Routes> */}
					<Suspense fallback={<div>Loading footer...</div>}>
						<Footer />
					</Suspense>
				</Router>
			</HelmetProvider>
		</>
	);
}

export default App;

