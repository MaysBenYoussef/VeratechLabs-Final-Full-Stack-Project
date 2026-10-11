function About() {
  return (
    <section id="about" className="about-section">

      <div className="about-header">
        <h2 className="section-title">
        About VeraTechLabs
      </h2>

        <p>
          VeraTechLabs empowers organizations through secure cloud
          solutions, advanced cybersecurity and innovative software
          development services designed for the modern digital era.
        </p>
      </div>

      <div className="features-grid">

        <div className="feature-card">
          <div className="icon">🔒</div>
          <h3>Security</h3>
          <p>Enterprise-level protection for all workflows.</p>
        </div>

        <div className="feature-card">
          <div className="icon">☁️</div>
          <h3>Cloud Sync</h3>
          <p>Connect and access data everywhere.</p>
        </div>

        <div className="feature-card">
          <div className="icon">📊</div>
          <h3>Analytics</h3>
          <p>Insights that help businesses grow.</p>
        </div>

        <div className="feature-card">
          <div className="icon">🤝</div>
          <h3>Collaboration</h3>
          <p>Empower teams with smart collaboration.</p>
        </div>

      </div>

    </section>
  );
}

export default About;