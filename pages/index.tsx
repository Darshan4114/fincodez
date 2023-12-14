import LightLogo from "@/components/LightLogo";
import Logo from "@/components/Logo";
import Head from "next/head";
import Link from "next/link";

export default function Home() {
    return (
        <>
            <Head>
                <meta charSet="utf-8" />
                <meta httpEquiv="x-ua-compatible" content="ie=edge" />
                <meta name="description" content="" />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1, shrink-to-fit=no"
                />
                <title>Start | Landing Page for Startup and SaaS Business</title>
                <link rel="shortcut icon" href="/images/favicon.png" type="image/png" />
                <link rel="stylesheet" href="/css/bootstrap.min.css" />
                <link rel="stylesheet" href="/css/LineIcons.css" />
                <link rel="stylesheet" href="/css/magnific-popup.css" />
                <link rel="stylesheet" href="/css/default.css" />
                <link rel="stylesheet" href="/css/style.css" />
            </Head>
            <header className="header-area">
                <div className="navgition navgition-transparent">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12">
                                <nav className="navbar navbar-expand-lg">
                                    <a className="navbar-brand" href="#">
                                        <LightLogo />
                                    </a>
                                    <button
                                        className="navbar-toggler"
                                        type="button"
                                        data-toggle="collapse"
                                        data-target="#navbarOne"
                                        aria-controls="navbarOne"
                                        aria-expanded="false"
                                        aria-label="Toggle navigation"
                                    >
                                        <span className="toggler-icon" />
                                        <span className="toggler-icon" />
                                        <span className="toggler-icon" />
                                    </button>
                                    <div
                                        className="collapse navbar-collapse sub-menu-bar"
                                        id="navbarOne"
                                    >
                                        <ul className="navbar-nav m-auto">
                                            <li className="nav-item active">
                                                <a className="page-scroll" href="#home">
                                                    HOME
                                                </a>
                                            </li>
                                            <li className="nav-item">
                                                <a className="page-scroll" href="#service">
                                                    SERVICES
                                                </a>
                                            </li>
                                            <li className="nav-item">
                                                <a className="page-scroll" href="#pricing">
                                                    PRICING
                                                </a>
                                            </li>
                                            <li className="nav-item">
                                                <a className="page-scroll" href="#contact">
                                                    CONTACT
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="navbar-social d-none d-sm-flex align-items-center">
                                        <div className="flex gap-4 mx-8">
                                            <Link href='/register'>REGISTER</Link>
                                            <Link href='/login'>LOGIN</Link>
                                        </div>
                                        <ul>
                                            <li>
                                                <a href="#">
                                                    <i className="lni-facebook-filled" />
                                                </a>
                                            </li>
                                            <li>
                                                <a href="#">
                                                    <i className="lni-twitter-original" />
                                                </a>
                                            </li>
                                            <li>
                                                <a href="#">
                                                    <i className="lni-instagram-original" />
                                                </a>
                                            </li>
                                            <li>
                                                <a href="#">
                                                    <i className="lni-linkedin-original" />
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>
                <div
                    id="home"
                    className="header-hero bg_cover"
                    style={{ backgroundImage: "url(/images/header-bg.jpg)" }}
                >
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-xl-8 col-lg-10">
                                {/* <Image src='' width='' /> */}
                                <div className="header-content text-center">
                                    <h3 className="header-title">
                                    &quot;Empowering Your Financial Future: Navigate, Innovate, Prosper with FinCodez&quot;</h3>
                                    <p className="text">
                                        Please, purchase the premium version just for $9 - if you would
                                        like to remove footer credits and get all features,
                                        documentation and support
                                    </p>
                                    <ul className="header-btn">
                                        <li>
                                            <a
                                                className="main-btn btn-one"
                                                rel="nofollow"
                                                href="https://rebrand.ly/start-ud"
                                            >
                                                PURCHASE NOW
                                            </a>
                                        </li>
                                        <li>
                                            <a
                                                className="main-btn btn-two video-popup"
                                                href="https://www.youtube.com/watch?v=r44RKWyfcFw"
                                            >
                                                WATCH THE VIDEO <i className="lni-play" />
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="header-shape blur-sm">
                        <img src="images/header-shape.svg" alt="shape" />
                    </div>
                </div>
            </header>
            <section id="service" className="services-area">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6">
                            <div className="section-title pb-10">
                                <h4 className="title">Crafted For</h4>
                                <p className="text">
                                    Stop wasting time and money designing and managing a website that
                                    doesn’t get results. Happiness guaranteed!
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-8">
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="services-content mt-40 d-sm-flex">
                                        <div className="services-icon">
                                            <i className="lni-bolt" />
                                        </div>
                                        <div className="services-content media-body">
                                            <h4 className="services-title">Startup</h4>
                                            <p className="text">
                                                Short description for the ones
                                                <br /> who look for something new.
                                            </p>
                                        </div>
                                    </div>{" "}
                                    {/* services content */}
                                </div>
                                <div className="col-md-6">
                                    <div className="services-content mt-40 d-sm-flex">
                                        <div className="services-icon">
                                            <i className="lni-bar-chart" />
                                        </div>
                                        <div className="services-content media-body">
                                            <h4 className="services-title">SaaS Business</h4>
                                            <p className="text">
                                                Short description for the ones
                                                <br /> who look for something new.
                                            </p>
                                        </div>
                                    </div>{" "}
                                    {/* services content */}
                                </div>
                                <div className="col-md-6">
                                    <div className="services-content mt-40 d-sm-flex">
                                        <div className="services-icon">
                                            <i className="lni-brush" />
                                        </div>
                                        <div className="services-content media-body">
                                            <h4 className="services-title">Agency</h4>
                                            <p className="text">
                                                Short description for the ones
                                                <br /> who look for something new.
                                            </p>
                                        </div>
                                    </div>{" "}
                                    {/* services content */}
                                </div>
                                <div className="col-md-6">
                                    <div className="services-content mt-40 d-sm-flex">
                                        <div className="services-icon">
                                            <i className="lni-bulb" />
                                        </div>
                                        <div className="services-content media-body">
                                            <h4 className="services-title">App Landing</h4>
                                            <p className="text">
                                                Short description for the ones
                                                <br /> who look for something new.
                                            </p>
                                        </div>
                                    </div>{" "}
                                    {/* services content */}
                                </div>
                            </div>{" "}
                            {/* row */}
                        </div>{" "}
                        {/* row */}
                    </div>{" "}
                    {/* row */}
                </div>{" "}
                {/* conteiner */}
                <div className="services-image d-lg-flex align-items-center">
                    <div className="image">
                        <img src="/images/services.png" alt="Services" />
                    </div>
                </div>{" "}
                {/* services image */}
            </section>
            {/*====== SERVICES PART ENDS ======*/}
            {/*====== PRICING PART START ======*/}
            <section id="pricing" className="pricing-area">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-6">
                            <div className="section-title text-center pb-10">
                                <h4 className="title">Our Pricing</h4>
                                <p className="text">
                                    Stop wasting time and money designing and managing a website that
                                    doesn’t get results. Happiness guaranteed!
                                </p>
                            </div>{" "}
                            {/* section title */}
                        </div>
                    </div>{" "}
                    {/* row */}
                    <div className="row justify-content-center">
                        <div className="col-lg-4 col-md-7 col-sm-9">
                            <div className="single-pricing mt-40">
                                <div className="pricing-header text-center">
                                    <h5 className="sub-title">Basic</h5>
                                    <span className="price">$ 199</span>
                                    <p className="year">per year</p>
                                </div>
                                <div className="pricing-list">
                                    <ul>
                                        <li>
                                            <i className="lni-check-mark-circle" /> Carefully crafted
                                            components
                                        </li>
                                        <li>
                                            <i className="lni-check-mark-circle" /> Amazing page examples
                                        </li>
                                        <li>
                                            <i className="lni-check-mark-circle" /> Super friendly support
                                            team
                                        </li>
                                        <li>
                                            <i className="lni-check-mark-circle" /> Awesome Support
                                        </li>
                                    </ul>
                                </div>
                                <div className="pricing-btn text-center">
                                    <a className="main-btn" href="#">
                                        GET STARTED
                                    </a>
                                </div>
                                <div className="buttom-shape">
                                    <svg
                                        id="Layer_1"
                                        data-name="Layer 1"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 350 112.35"
                                    >
                                        <defs>
                                            <style
                                                dangerouslySetInnerHTML={{
                                                    __html:
                                                        ".color-1{fill:#2bdbdc;isolation:isolate;}.cls-1{opacity:0.1;}.cls-2{opacity:0.2;}.cls-3{opacity:0.4;}.cls-4{opacity:0.6;}"
                                                }}
                                            />
                                        </defs>
                                        <title>bottom-part1</title>
                                        <g id="bottom-part">
                                            <g id="Group_747" data-name="Group 747">
                                                <path
                                                    id="Path_294"
                                                    data-name="Path 294"
                                                    className="cls-1 color-1"
                                                    d="M0,24.21c120-55.74,214.32,2.57,267,0S349.18,7.4,349.18,7.4V82.35H0Z"
                                                    transform="translate(0 0)"
                                                />
                                                <path
                                                    id="Path_297"
                                                    data-name="Path 297"
                                                    className="cls-2 color-1"
                                                    d="M350,34.21c-120-55.74-214.32,2.57-267,0S.82,17.4.82,17.4V92.35H350Z"
                                                    transform="translate(0 0)"
                                                />
                                                <path
                                                    id="Path_296"
                                                    data-name="Path 296"
                                                    className="cls-3 color-1"
                                                    d="M0,44.21c120-55.74,214.32,2.57,267,0S349.18,27.4,349.18,27.4v74.95H0Z"
                                                    transform="translate(0 0)"
                                                />
                                                <path
                                                    id="Path_295"
                                                    data-name="Path 295"
                                                    className="cls-4 color-1"
                                                    d="M349.17,54.21c-120-55.74-214.32,2.57-267,0S0,37.4,0,37.4v74.95H349.17Z"
                                                    transform="translate(0 0)"
                                                />
                                            </g>
                                        </g>
                                    </svg>
                                </div>
                            </div>{" "}
                            {/* single pricing */}
                        </div>
                        <div className="col-lg-4 col-md-7 col-sm-9">
                            <div className="single-pricing pro mt-40">
                                <div className="pricing-baloon">
                                    <img src="/images/baloon.svg" alt="baloon" />
                                </div>
                                <div className="pricing-header">
                                    <h5 className="sub-title">Pro</h5>
                                    <span className="price">$ 399</span>
                                    <p className="year">per year</p>
                                </div>
                                <div className="pricing-list">
                                    <ul>
                                        <li>
                                            <i className="lni-check-mark-circle" /> Carefully crafted
                                            components
                                        </li>
                                        <li>
                                            <i className="lni-check-mark-circle" /> Amazing page examples
                                        </li>
                                        <li>
                                            <i className="lni-check-mark-circle" /> Super friendly support
                                            team
                                        </li>
                                        <li>
                                            <i className="lni-check-mark-circle" /> Awesome Support
                                        </li>
                                    </ul>
                                </div>
                                <div className="pricing-btn text-center">
                                    <a className="main-btn" href="#">
                                        GET STARTED
                                    </a>
                                </div>
                                <div className="buttom-shape">
                                    <svg
                                        id="Layer_1"
                                        data-name="Layer 1"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 350 112.35"
                                    >
                                        <defs>
                                            <style
                                                dangerouslySetInnerHTML={{
                                                    __html:
                                                        ".color-2{fill:#0067f4;isolation:isolate;}.cls-1{opacity:0.1;}.cls-2{opacity:0.2;}.cls-3{opacity:0.4;}.cls-4{opacity:0.6;}"
                                                }}
                                            />
                                        </defs>
                                        <title>bottom-part1</title>
                                        <g id="bottom-part">
                                            <g id="Group_747" data-name="Group 747">
                                                <path
                                                    id="Path_294"
                                                    data-name="Path 294"
                                                    className="cls-1 color-2"
                                                    d="M0,24.21c120-55.74,214.32,2.57,267,0S349.18,7.4,349.18,7.4V82.35H0Z"
                                                    transform="translate(0 0)"
                                                />
                                                <path
                                                    id="Path_297"
                                                    data-name="Path 297"
                                                    className="cls-2 color-2"
                                                    d="M350,34.21c-120-55.74-214.32,2.57-267,0S.82,17.4.82,17.4V92.35H350Z"
                                                    transform="translate(0 0)"
                                                />
                                                <path
                                                    id="Path_296"
                                                    data-name="Path 296"
                                                    className="cls-3 color-2"
                                                    d="M0,44.21c120-55.74,214.32,2.57,267,0S349.18,27.4,349.18,27.4v74.95H0Z"
                                                    transform="translate(0 0)"
                                                />
                                                <path
                                                    id="Path_295"
                                                    data-name="Path 295"
                                                    className="cls-4 color-2"
                                                    d="M349.17,54.21c-120-55.74-214.32,2.57-267,0S0,37.4,0,37.4v74.95H349.17Z"
                                                    transform="translate(0 0)"
                                                />
                                            </g>
                                        </g>
                                    </svg>
                                </div>
                            </div>{" "}
                            {/* single pricing */}
                        </div>
                        <div className="col-lg-4 col-md-7 col-sm-9">
                            <div className="single-pricing enterprise mt-40">
                                <div className="pricing-flower">
                                    <img src="/images/flower.svg" alt="flower" />
                                </div>
                                <div className="pricing-header text-right">
                                    <h5 className="sub-title">Enterprise</h5>
                                    <span className="price">$ 799</span>
                                    <p className="year">per year</p>
                                </div>
                                <div className="pricing-list">
                                    <ul>
                                        <li>
                                            <i className="lni-check-mark-circle" /> Carefully crafted
                                            components
                                        </li>
                                        <li>
                                            <i className="lni-check-mark-circle" /> Amazing page examples
                                        </li>
                                        <li>
                                            <i className="lni-check-mark-circle" /> Super friendly support
                                            team
                                        </li>
                                        <li>
                                            <i className="lni-check-mark-circle" /> Awesome Support
                                        </li>
                                    </ul>
                                </div>
                                <div className="pricing-btn text-center">
                                    <a className="main-btn" href="#">
                                        GET STARTED
                                    </a>
                                </div>
                                <div className="buttom-shape">
                                    <svg
                                        id="Layer_1"
                                        data-name="Layer 1"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 350 112.35"
                                    >
                                        <defs>
                                            <style
                                                dangerouslySetInnerHTML={{
                                                    __html:
                                                        ".color-3{fill:#4da422;isolation:isolate;}.cls-1{opacity:0.1;}.cls-2{opacity:0.2;}.cls-3{opacity:0.4;}.cls-4{opacity:0.6;}"
                                                }}
                                            />
                                        </defs>
                                        <title>bottom-part1</title>
                                        <g id="bottom-part">
                                            <g id="Group_747" data-name="Group 747">
                                                <path
                                                    id="Path_294"
                                                    data-name="Path 294"
                                                    className="cls-1 color-3"
                                                    d="M0,24.21c120-55.74,214.32,2.57,267,0S349.18,7.4,349.18,7.4V82.35H0Z"
                                                    transform="translate(0 0)"
                                                />
                                                <path
                                                    id="Path_297"
                                                    data-name="Path 297"
                                                    className="cls-2 color-3"
                                                    d="M350,34.21c-120-55.74-214.32,2.57-267,0S.82,17.4.82,17.4V92.35H350Z"
                                                    transform="translate(0 0)"
                                                />
                                                <path
                                                    id="Path_296"
                                                    data-name="Path 296"
                                                    className="cls-3 color-3"
                                                    d="M0,44.21c120-55.74,214.32,2.57,267,0S349.18,27.4,349.18,27.4v74.95H0Z"
                                                    transform="translate(0 0)"
                                                />
                                                <path
                                                    id="Path_295"
                                                    data-name="Path 295"
                                                    className="cls-4 color-3"
                                                    d="M349.17,54.21c-120-55.74-214.32,2.57-267,0S0,37.4,0,37.4v74.95H349.17Z"
                                                    transform="translate(0 0)"
                                                />
                                            </g>
                                        </g>
                                    </svg>
                                </div>
                            </div>{" "}
                            {/* single pricing */}
                        </div>
                    </div>{" "}
                    {/* row */}
                </div>{" "}
                {/* conteiner */}
            </section>
            {/*====== PRICING PART ENDS ======*/}
            {/*====== CALL TO ACTION PART START ======*/}
            <section id="call-to-action" className="call-to-action">
                <div className="call-action-image">
                    <img src="/images/call-to-action.png" alt="call-to-action" />
                </div>
                <div className="container-fluid">
                    <div className="row justify-content-end">
                        <div className="col-lg-6">
                            <div className="call-action-content text-center">
                                <h2 className="call-title">Curious to Learn More? Stay Tuned</h2>
                                <p className="text">
                                    You let us know whenever you want us to update anything or think
                                    something can be optimised.
                                </p>
                                <div className="call-newsletter">
                                    <i className="lni-envelope" />
                                    <input type="text" placeholder="john@email.com" />
                                    <button type="submit">SUBSCRIBE</button>
                                </div>
                            </div>{" "}
                            {/* slider-content */}
                        </div>
                    </div>{" "}
                    {/* row */}
                </div>{" "}
                {/* container */}
            </section>
            {/*====== CALL TO ACTION PART ENDS ======*/}
            {/*====== CONTACT PART START ======*/}
            <section id="contact" className="contact-area">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-6">
                            <div className="section-title text-center pb-10">
                                <h4 className="title">Get In touch</h4>
                                <p className="text">
                                    Stop wasting time and money designing and managing a website that
                                    doesn’t get results. Happiness guaranteed!
                                </p>
                            </div>{" "}
                            {/* section title */}
                        </div>
                    </div>{" "}
                    {/* row */}
                    <div className="row justify-content-center">
                        <div className="col-lg-8">
                            <div className="contact-form">
                                <form
                                    id="contact-form"
                                    action="/contact.php"
                                    method="post"
                                    data-toggle="validator"
                                >
                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="single-form form-group">
                                                <input
                                                    type="text"
                                                    name="name"
                                                    placeholder="Your Name"
                                                    data-error="Name is required."
                                                    required
                                                />
                                                <div className="help-block with-errors" />
                                            </div>{" "}
                                            {/* single form */}
                                        </div>
                                        <div className="col-md-6">
                                            <div className="single-form form-group">
                                                <input
                                                    type="email"
                                                    name="email"
                                                    placeholder="Your Email"
                                                    data-error="Valid email is required."
                                                    required
                                                />
                                                <div className="help-block with-errors" />
                                            </div>{" "}
                                            {/* single form */}
                                        </div>
                                        <div className="col-md-6">
                                            <div className="single-form form-group">
                                                <input
                                                    type="text"
                                                    name="subject"
                                                    placeholder="Subject"
                                                    data-error="Subject is required."
                                                    required
                                                />
                                                <div className="help-block with-errors" />
                                            </div>{" "}
                                            {/* single form */}
                                        </div>
                                        <div className="col-md-6">
                                            <div className="single-form form-group">
                                                <input
                                                    type="text"
                                                    name="phone"
                                                    placeholder="Phone"
                                                    data-error="Phone is required."
                                                    required
                                                />
                                                <div className="help-block with-errors" />
                                            </div>{" "}
                                            {/* single form */}
                                        </div>
                                        <div className="col-md-12">
                                            <div className="single-form form-group">
                                                <textarea
                                                    placeholder="Your Mesaage"
                                                    name="message"
                                                    data-error="Please, leave us a message."
                                                    required
                                                    defaultValue={""}
                                                />
                                                <div className="help-block with-errors" />
                                            </div>{" "}
                                            {/* single form */}
                                        </div>
                                        <p className="form-message" />
                                        <div className="col-md-12">
                                            <div className="single-form form-group text-center">
                                                <button type="submit" className="main-btn">
                                                    send message
                                                </button>
                                            </div>{" "}
                                            {/* single form */}
                                        </div>
                                    </div>{" "}
                                    {/* row */}
                                </form>
                            </div>{" "}
                            {/* row */}
                        </div>
                    </div>{" "}
                    {/* row */}
                </div>{" "}
                {/* conteiner */}
            </section>
            {/*====== CONTACT PART ENDS ======*/}
            {/*====== FOOTER PART START ======*/}
            <footer id="footer" className="footer-area">
                <div className="footer-widget">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="footer-logo-support d-md-flex align-items-end justify-content-between">
                                    <div className="footer-logo d-flex align-items-end">
                                        <a className="mt-30" href="index.html">
                                            <img src="/images/logo.svg" alt="Logo" />
                                        </a>
                                        <ul className="social mt-30">
                                            <li>
                                                <a href="#">
                                                    <i className="lni-facebook-filled" />
                                                </a>
                                            </li>
                                            <li>
                                                <a href="#">
                                                    <i className="lni-twitter-original" />
                                                </a>
                                            </li>
                                            <li>
                                                <a href="#">
                                                    <i className="lni-instagram-original" />
                                                </a>
                                            </li>
                                            <li>
                                                <a href="#">
                                                    <i className="lni-linkedin-original" />
                                                </a>
                                            </li>
                                        </ul>
                                    </div>{" "}
                                    {/* footer logo */}
                                </div>{" "}
                                {/* footer logo support */}
                            </div>
                        </div>{" "}
                        {/* row */}
                        <div className="row">
                            <div className="col-lg-2 col-md-4 col-sm-6">
                                <div className="footer-link">
                                    <h6 className="footer-title">Company</h6>
                                    <ul>
                                        <li>
                                            <a href="#">About</a>
                                        </li>
                                        <li>
                                            <a href="#">Contact</a>
                                        </li>
                                        <li>
                                            <a href="#">Career</a>
                                        </li>
                                    </ul>
                                </div>{" "}
                                {/* footer link */}
                            </div>
                            <div className="col-lg-3 col-md-4 col-sm-6">
                                <div className="footer-link">
                                    <h6 className="footer-title">Product &amp; Services</h6>
                                    <ul>
                                        <li>
                                            <a href="#">Products</a>
                                        </li>
                                        <li>
                                            <a href="#">Business</a>
                                        </li>
                                        <li>
                                            <a href="#">Developer</a>
                                        </li>
                                    </ul>
                                </div>{" "}
                                {/* footer link */}
                            </div>
                            <div className="col-lg-3 col-md-4 col-sm-5">
                                <div className="footer-link">
                                    <h6 className="footer-title">Help &amp; Suuport</h6>
                                    <ul>
                                        <li>
                                            <a href="#">Support Center</a>
                                        </li>
                                        <li>
                                            <a href="#">FAQ</a>
                                        </li>
                                        <li>
                                            <a href="#">Terms &amp; Conditions</a>
                                        </li>
                                    </ul>
                                </div>{" "}
                                {/* footer link */}
                            </div>
                            <div className="col-lg-4 col-md-6 col-sm-7">
                                <div className="footer-newsletter">
                                    <h6 className="footer-title">Subscribe Newsletter</h6>
                                    <div className="newsletter">
                                        <form action="#">
                                            <input type="text" placeholder="Your Email" />
                                            <button type="submit">
                                                <i className="lni-angle-double-right" />
                                            </button>
                                        </form>
                                    </div>
                                    <p className="text">
                                        Subscribe weekly newsletter to stay upto date. We don’t send
                                        spam.
                                    </p>
                                </div>{" "}
                                {/* footer newsletter */}
                            </div>
                        </div>{" "}
                        {/* row */}
                    </div>{" "}
                    {/* container */}
                </div>{" "}
                {/* footer widget */}
                <div className="footer-copyright">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="copyright text-center">
                                    <p className="text">
                                        Template Crafted by{" "}
                                        <a href="https://uncodez.io">
                                            Uncodez
                                        </a>{" "}
                                        - UI Powered by{" "}
                                        Uncodez
                                    </p>
                                </div>
                            </div>
                        </div>{" "}
                        {/* row */}
                    </div>{" "}
                    {/* container */}
                </div>{" "}
                {/* footer copyright */}
            </footer>

            <a className="back-to-top" href="#">
                <i className="lni-chevron-up" />
            </a>
        </>
    )
}