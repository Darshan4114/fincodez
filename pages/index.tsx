import LightLogo from "@/components/LightLogo";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function MainPage() {
  const router = useRouter();


  return (
    <div className="landing-page">
      <header className="header-container">
        <div className="logo">
          <LightLogo />
        </div>
        <nav className="nav-container">
          <ul>
            <li><a href="#">Home</a></li>
            <li><a href="#">Dashboard</a></li>
            <li><a href="#">About Us</a></li>
          </ul>
        </nav>
        <div className="buttons-container">
          <button className="button login-button">Log In</button>
          <button className="button register-button">Register</button>
        </div>
      </header>
      <main className="main-container">
        <section className="hero-section">
          <div className="desc flex gap-8">
            <div className="">
              <h1 className="hero-title">India&apos;s number 1 finance tracker application.</h1>
              <p className="hero-description mb-16">A simple and intuitive app to help you manage your finances.</p>
              <Link href='https://youtu.be/BQQEkx7zuE8' target='_blank' className='bg-primary text-white text-3xl font-bold mb-16 rounded-lg p-3 mt-3 w-96'>
                Watch Video
              </Link>
            </div>
            <div className="hero-image-container">
              <img src="img/fincodez.png" alt="Hero image" className="hero-image" />
            </div>
          </div>
        </section>
        <section className="features-section">
          <h2 className="features-title">Features</h2>
          <div className="features-card-container">
            <div className="card-Container">

              <div className="card">
                <img src="img/box.png" className="card-image" />
                <div className="card-content">
                  <div className="card-title">Main Title</div>
                  <div className="card-description">Description goes here. It can be a brief overview of the content.</div>
                </div>
              </div>
              <div className="card">
                <img src="img/image3.png" className="card-image" />
                <div className="card-content">
                  <div className="card-title">Main Title</div>
                  <div className="card-description">Description goes here. It can be a brief overview of the content.</div>
                </div>
              </div>
              <div className="card">
                <img src="img/clock.png" className="card-image" />
                <div className="card-content">
                  <div className="card-title">Main Title</div>
                  <div className="card-description">Description goes here. It can be a brief overview of the content.</div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="testimonials-section">
          <h2 className="testimonials-title">What people are saying</h2>
          <div className="testimonial-card">
            <p className="testimonial-text">&quot;Fincodez has helped me save so much money! I love the analytics feature.&quot;</p>
            <span className="testimonial-author">- Jane Doe</span>
          </div>
          <div className="testimonial-card">
            <p className="testimonial-text">&quot;This app is so easy to use! I highly recommend it to anyone who wants to get a handle on their finances.&quot;</p>
            <span className="testimonial-author">- John Smith</span>
          </div>
        </section>
      </main>
      <footer className="footer-container">
        <div className="copyright">
          &copy; 2023 Fincodez
        </div>
        <div className="social-media">
          <a href="#" className="social-media-icon"><i className="fa fa-facebook"></i></a>
          <a href="#" className="social-media-icon"><i className="fa fa-twitter"></i></a>
          <a href="#" className="social-media-icon"><i className="fa fa-instagram"></i></a>
        </div>
      </footer>
    </div>

  )
}