import { useState } from "react";

function RequestService() {
  const [formData, setFormData] = useState({
    customerName: "",
    email: "",
    service: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const response = await fetch(
        "http://localhost:5000/api/requests",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        throw new Error(
          "Failed to submit request"
        );
      }

      alert(
        "Request submitted successfully!"
      );

      setFormData({
        customerName: "",
        email: "",
        service: "",
        message: "",
      });
    } catch (error) {
      console.error(error);

      alert(
        "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f4f7fc",
        padding: "40px",
      }}
    >
      <div
        style={{
          maxWidth: "700px",
          margin: "0 auto",
          background: "#fff",
          padding: "35px",
          borderRadius: "16px",
          boxShadow:
            "0 5px 20px rgba(0,0,0,0.08)",
        }}
      >
        <h1
          style={{
            color: "#132242",
            marginBottom: "10px",
          }}
        >
          Service Request
        </h1>

        <p
          style={{
            color: "#64748b",
            marginBottom: "30px",
          }}
        >
          Submit your request and our team
          will contact you as soon as
          possible.
        </p>

        <form onSubmit={handleSubmit}>
          <div
            style={{
              marginBottom: "15px",
            }}
          >
            <label>
              Full Name
            </label>

            <input
              type="text"
              name="customerName"
              value={
                formData.customerName
              }
              onChange={handleChange}
              required
              style={{
  width: "100%",
  padding: "12px",
  marginTop: "8px",
  border: "1px solid #cbd5e1",
  borderRadius: "8px",
  backgroundColor: "#ffffff",
  fontSize: "16px",
  boxSizing: "border-box",
}}
            />
          </div>

          <div
            style={{
              marginBottom: "15px",
            }}
          >
            <label>
              Email Address
            </label>

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              style={{
  width: "100%",
  padding: "12px",
  marginTop: "8px",
  border: "1px solid #cbd5e1",
  borderRadius: "8px",
  backgroundColor: "#ffffff",
  fontSize: "16px",
  boxSizing: "border-box",
}}
            />
          </div>

          <div
            style={{
              marginBottom: "15px",
            }}
          >
            <label>
              Requested Service
            </label>

            <input
              type="text"
              name="service"
              value={formData.service}
              onChange={handleChange}
              required
              style={{
  width: "100%",
  padding: "12px",
  marginTop: "8px",
  border: "1px solid #cbd5e1",
  borderRadius: "8px",
  backgroundColor: "#ffffff",
  fontSize: "16px",
  boxSizing: "border-box",
}}
            />
          </div>

          <div
            style={{
              marginBottom: "20px",
            }}
          >
            <label>
              Request Details
            </label>

            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows="5"
              style={{
  width: "100%",
  padding: "12px",
  marginTop: "8px",
  border: "1px solid #cbd5e1",
  borderRadius: "8px",
  backgroundColor: "#ffffff",
  fontSize: "16px",
  boxSizing: "border-box",
}}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              background: "#2563eb",
              color: "#fff",
              border: "none",
              padding: "14px 24px",
              borderRadius: "10px",
              cursor: "pointer",
              fontWeight: "600",
            }}
          >
            {loading
              ? "Submitting..."
              : "Submit Request"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default RequestService;