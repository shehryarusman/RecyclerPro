import React, { useEffect } from "react";
import "../Home.css";

function Home() {
  const index = 0;
  useEffect(() => {
    window.addEventListener("scroll", revealFeatures);

    function revealFeatures() {
      const features = document.querySelectorAll(
        ".features-group-left, .features-group-right"
      );
      features.forEach((feature, index) => {
        const featureTop = feature.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        if (featureTop < windowHeight * 0.75) {
          feature.classList.add("visible");
          feature.classList.add(index % 2 === 0 ? "even" : "odd");
        } else {
          feature.classList.remove("visible");
          feature.classList.remove(index % 2 === 0 ? "even" : "odd");
        }
      });
    }
  }, []);
  return (
    <div className="Home">
      <div className="Background">
        <h1 className="title">
          Help Us Make a Positive Impact
          <br />
          Donate Today
        </h1>
      </div>
      <section id="features">
        <div className="features-inner">
          <div className="features-group-left">
            <div className="features-image">
              <img src="https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80" />
            </div>
            <div className="features-text">
              <h1>Our Mission: Making a Difference in Our Community</h1>
              <p>
                Our mission at DonationHub is rooted in empathy and a deep
                desire to alleviate the suffering caused by lack of food and
                clothing. We believe that by leveraging the power of AI, we can
                make a meaningful impact in the lives of those who are most
                vulnerable.
              </p>
            </div>
          </div>
          <div className="features-group-right">
            <div className="features-image inverted">
              <img src="https://images.unsplash.com/photo-1599059813005-11265ba4b4ce?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80" />
            </div>
            <div className="features-text inverted">
              <h1>Our Impact</h1>
              <p>
                We're proud of the impact that we've made in our community over
                time. Through our work, we've been able to provide support to
                countless individuals and families who are struggling to get by,
                whether it's through providing access to food, clothing, or
                other basic necessities.
              </p>
            </div>
          </div>
          <div className="features-group-left">
            <div className="features-image">
              <img src="https://cdn.hourdetroit.com/wp-content/uploads/sites/20/2021/11/clothing-donations-696x465.jpg" />
            </div>
            <div className="features-text">
              <h1>Get Involved: Join Our Community of Supporters</h1>
              <p>
                We believe that everyone has the power to make a difference, no
                matter how big or small. That's why we're always looking for new
                supporters to join our community and help us make a positive
                impact. Whether you want to volunteer your time, donate to our
                cause, or simply help spread the word about the important work
                we're doing, we welcome you to get involved. Together, we can
                create positive change in our community and make a real
                difference in the lives of those who need it most.
              </p>
            </div>
          </div>
          <div className="features-group-right">
            <div className="features-image inverted">
              <img src="https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80" />
            </div>
            <div className="features-text inverted">
              <h1>Why We Do it?</h1>
              <p>
                Donating food and clothes is more than just a simple act of
                kindness. For those who are struggling to make ends meet, it can
                provide a sense of hope and dignity in the face of adversity. By
                donating food and clothes, we can help to ease the burden of
                poverty and support individuals and families as they work
                towards a better future.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
