import { useState } from "react";
import { FaEnvelope, FaPhoneAlt, FaMapMarkerAlt } from "react-icons/fa";
import { motion } from "framer-motion";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [feedback, setFeedback] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
  "http://localhost:5000/api/contact",
  {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  }
);


      const result = await response.json();

      if (response.ok) {
        setIsSuccess(true);
        setFeedback(result.message);

        setFormData({
          name: "",
          email: "",
          subject: "",
          message: "",
        });
      } else {
        setIsSuccess(false);
        setFeedback(result.message);
      }
    } catch (error) {
      setIsSuccess(false);
      setFeedback("Something went wrong.");
    }
  };

  return (
    <section id="contact" className="contact-section">
      <motion.div
        className="contact-container"
        initial={{ opacity: 0, y: 80 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="contact-left">
          <span className="contact-badge">
            Let's Connect
          </span>

          <h2>
            Ready To Build
            <br />
            Something Amazing?
          </h2>

          <p>
            Whether you're launching a startup,
            scaling a business, or exploring new
            opportunities, we're here to help.
          </p>

          <div className="contact-info">
            <div className="info-card">
              <FaEnvelope />
              <span>
                hello@VeratechLabs.com
              </span>
            </div>

            <div className="info-card">
              <FaPhoneAlt />
              <span>+216 12 345 678</span>
            </div>

            <div className="info-card">
              <FaMapMarkerAlt />
              <span>Tunis, Tunisia</span>
            </div>
          </div>
        </div>

        <div className="contact-right">
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              required
            />

            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              required
            />

            <input
              type="text"
              name="subject"
              placeholder="Subject"
              value={formData.subject}
              onChange={handleChange}
              required
            />

            <textarea
              name="message"
              placeholder="Your Message"
              rows="6"
              value={formData.message}
              onChange={handleChange}
              required
            />

            <button
              type="submit"
              className="primary-btn"
            >
              Let's Talk →
            </button>

            {feedback && (
              <p
                style={{
                  marginTop: "15px",
                  color: isSuccess
                    ? "#22c55e"
                    : "#ef4444",
                }}
              >
                {feedback}
              </p>
            )}
          </form>
        </div>
      </motion.div>
    </section>
  );
}

export default Contact;