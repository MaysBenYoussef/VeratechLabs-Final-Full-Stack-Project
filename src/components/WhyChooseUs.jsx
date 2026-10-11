import { FaRocket, FaShieldAlt, FaLightbulb, FaHeadset } from "react-icons/fa";

function WhyChooseUs() {
  return (
    <section id="WhyChooseUs" className="why-section">

      <h2 className="section-title">
        Why Choose VeraTechLabs?
      </h2>

      <p className="section-subtitle">
        We deliver innovative technology solutions that help businesses
        scale faster, stay secure and achieve long-term success.
      </p>

      <div className="why-grid">

        <div className="why-card" style={{ animationDelay: "0.2s" }}>
          <FaRocket className="why-icon" />
          <h3>Fast Delivery</h3>
          <p>
            Rapid deployment of solutions tailored to your business needs.
          </p>
        </div>

        <div className="why-card" style={{ animationDelay: "0.4s" }}>
          <FaShieldAlt className="why-icon" />
          <h3>Secure Solutions</h3>
          <p>
            Enterprise-level protection and security best practices.
          </p>
        </div>

        <div className="why-card" style={{ animationDelay: "0.6s" }}>
          <FaLightbulb className="why-icon" />
          <h3>Innovation First</h3>
          <p>
            Leveraging AI and emerging technologies to drive growth.
          </p>
        </div>

        <div className="why-card" style={{ animationDelay: "0.8s" }}>
          <FaHeadset className="why-icon" />
          <h3>24/7 Support</h3>
          <p>
            Dedicated assistance whenever your business needs help.
          </p>
        </div>

      </div>

    </section>
  );
}
export default WhyChooseUs;