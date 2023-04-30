import React, { useEffect } from "react";

import "../Home.css";
import playVideo from "../globe-video.mp4";
import greenlandscape from "../green-landscape.jpeg";
import Image4 from "../recycle-important.jpeg";

function Home() {
  useEffect(() => {
    function handleScroll() {
      const elements = document.querySelectorAll('.animate-on-scroll');
      elements.forEach((element) => {
        const elementTop = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        if (elementTop < windowHeight * 0.75) {
          element.classList.add('animate');
        } else {
          element.classList.remove('animate');
        }
      });
    }

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="home">
      <section className="hero">
        <video muted autoPlay loop playsInline className="hero-video">
          <source src={playVideo} type="video/mp4" />
        </video>
        <div className="hero-overlay"></div>
        <div className="hero-content">
</div>

    </section>

      <section className="process animate-on-scroll">
        <div className="process-inner">
          <div className="process-text">
            <h1> The Urgency of Proper Waste Management</h1>
            <p>
            Waste management and recycling have become increasingly important in recent years 
            due to a growing waste crisis. According to the World Bank, global waste generation 
            is expected to reach 3.4 billion tonnes by 2050, up from 2.01 billion tonnes in 2016. 
            In the US, the Environmental Protection Agency estimates that Americans generated 292.4
            million tons of municipal solid waste (MSW) in 2018, with only about 32% recycled or 
            composted, and the rest sent to landfills or incinerated. Proper waste management can help 
            reduce greenhouse gas emissions, conserve natural resources, and protect human health 
            and the environment.
            </p>
          </div>
          <div className="process-image">
            <img src={Image4} alt="Recycled cans" />
          </div>
        </div>
      </section>

      <section className="about animate-on-scroll">
        <div className="about-inner">
          <div className="about-image">
            <img src={greenlandscape} alt="A person holding a recycling bin" />
          </div>
          <div className="about-text">
            <h1>Our Mission: A Cleaner, Greener Future</h1>
            <p>
              At our waste management project, we believe in protecting our
              environment for future generations. That's why we're dedicated to
              finding sustainable solutions for managing waste, reducing our
              carbon footprint, and creating a cleaner, greener future.
            </p>
          </div>
        </div>
      </section>

      <section className="features animate-on-scroll">
        <h1 className="feature-title">Our Process:</h1>
        <div className="features-inner">
          <div className="feature-card">
            <i className="fas fa-recycle"></i>
            <h2>Reduce</h2>
            <p>
              We work with local businesses and communities to reduce waste at
              the source by encouraging the use of reusable products and
              sustainable practices.
            </p>
          </div>
          <div className="feature-card">
            <i className="fas fa-handshake"></i>
            <h2>Reuse</h2>
            <p>
              We promote the reuse of items whenever possible, such as through
              donation and upcycling initiatives.
            </p>
          </div>
          <div className="feature-card">
            <i className="fas fa-recycle"></i>
            <h2>Recycle</h2>
            <p>
              We work with local recycling facilities to ensure that materials
              are properly recycled and diverted from landfills.
            </p>
          </div>
        </div>
      </section>

    <section className="contact animate-on-scroll">
      <div className="grid-container">
        <div className="contact-heading">
          <h1>Contact Us</h1>
        </div>
        <div className="contact-inner">
          <form className="contact-form">
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input type="text" id="name" name="name" required />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input type="email" id="email" name="email" required />
            </div>
            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea id="message" name="message" required></textarea>
            </div>
            <div className="form-group">
              <button type="submit" className="btn-submit">Send Message</button>
            </div>
          </form>
        </div>
      </div>
    </section>
  </div>
);
}

export default Home;
