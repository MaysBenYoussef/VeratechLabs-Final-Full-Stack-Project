import { useEffect, useState } from "react";

function Services() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/services"
        );

        const data = await response.json();

        setServices(data);
      } catch (error) {
        console.error(
          "Error loading services:",
          error
        );
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  return (
    <section
      id="services"
      style={{
        padding: "80px 40px",
        background: "#f8fafc",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          textAlign: "center",
        }}
      >
        <h2
          style={{
            fontSize: "2.5rem",
            color: "#132242",
            marginBottom: "15px",
          }}
        >
          Our Services
        </h2>

        <p
          style={{
            color: "#64748b",
            marginBottom: "50px",
          }}
        >
          Discover the solutions we provide to help
          businesses grow and succeed.
        </p>

        {loading ? (
          <h3>Loading services...</h3>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit, minmax(300px, 1fr))",
              gap: "25px",
            }}
          >
            {services.map((service) => (
              <div
                key={service._id}
                style={{
                  background: "white",
                  padding: "30px",
                  borderRadius: "16px",
                  boxShadow:
                    "0 5px 20px rgba(0,0,0,0.08)",
                  transition: "0.3s",
                }}
              >
                <h3
                  style={{
                    color: "#132242",
                    marginBottom: "15px",
                  }}
                >
                  {service.title}
                </h3>

                <p
                  style={{
                    color: "#64748b",
                    lineHeight: "1.6",
                  }}
                >
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default Services;