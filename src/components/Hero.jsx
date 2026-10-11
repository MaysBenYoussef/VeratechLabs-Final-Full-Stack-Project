import heroImage from "../assets/hero.svg";
import { useState, useEffect } from "react";

function Hero() {
  const [showModal, setShowModal] = useState(false);
  const [hero, setHero] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5000/api/content")
      .then((res) => res.json())
      .then((data) => {
        const heroContent = data.find(
          (item) => item.section === "hero"
        );

        setHero(heroContent);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <section className="hero">
        <div className="hero-left">
          <div className="hero-badge">
            🚀 Innovative Software Solutions
          </div>

          <h1>
            {hero?.title || "Build Better Digital Products"}
          </h1>

          <p>
            {hero?.description || "We empower businesses with scalable software, cloud solutions and digital transformation services."}
          </p>

          <div className="hero-buttons">
            <button
              className="primary-btn"
              onClick={() => setShowModal(true)}
            >
              Get Started
            </button>
          </div>
        </div>

        <div className="hero-right">
  <a href={heroImage} target="_blank" rel="noopener noreferrer">
    <img src={heroImage} alt="Hero" onError={() => console.log("IMAGE ERROR")} onLoad={() => console.log("IMAGE LOADED")} />
  </a>
</div>
      </section>

      {showModal && (
        <div
          className="modal-overlay"
          onClick={() => setShowModal(false)}
        >
          <div
            className="modal"
            onClick={(e) => e.stopPropagation()}
          >
            <h2>Welcome to VeraTechLabs 🚀</h2>

            <p>
              Thank you for your interest.
            </p>

            <button
              className="primary-btn"
              onClick={() => setShowModal(false)}
            >
              Got It
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default Hero;