import LightLogo from "@/components/LightLogo";
import Logo from "@/components/Logo";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function MainPage() {
  const router = useRouter();


  return (
    <div className="bg-neutral-900 text-white">
      <header className="header-container">
        <div className="logo">
          <LightLogo />
        </div>
        <nav className="sticky top-40">
          <ul>
            {/* <li><a href="#">Home</a></li>
              <li><a href="#">Dashboard</a></li>
              <li><a href="#">About Us</a></li> */}
          </ul>
        </nav>
        <div className="buttons-container flex gap-4">
          <Link href='/login' className="button text-primary">Log In</Link>
          <Link href='/register' className="button bg-primary">Register</Link>
        </div>
      </header>
      <main className="main-container">
        <section className="hero-section">
          <div className="desc">

            <h1 className="hero-title text-white">Track Your Expenses Easily</h1>
            <h1 className="hero-title text-white">With</h1>
            <h1 className="hero-title text-white">FinCodez</h1>
            <p className="hero-description text-white">A simple and intuitive app to help you manage your finances.</p>
          </div>
          <div className="hero-image-container">
            <img src="img/image1.png" alt="Hero image" className="hero-image" />
            <img src="img/image2.png" alt="Hero image" className="hero-image" />

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
            <p className="testimonial-text">&quot;FinCodez has helped me save so much money! I love the analytics feature.&quot;</p>
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
          &copy; 2023 FinCodez
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