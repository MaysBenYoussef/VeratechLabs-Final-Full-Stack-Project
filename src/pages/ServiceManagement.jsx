import { useEffect, useState } from "react";

function ServiceManagement() {
  const [services, setServices] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [editingId, setEditingId] = useState(null);

  const token = localStorage.getItem("token");

  const loadServices = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/services"
      );

      const data = await response.json();

      setServices(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadServices();
  }, []);

  const addService = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/services",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            title,
            description,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to add service");
      }

      setTitle("");
      setDescription("");

      loadServices();

      alert("Service added successfully!");
    } catch (error) {
      console.error(error);
    }
  };

  const updateService = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/services/${editingId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            title,
            description,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update service");
      }

      setEditingId(null);
      setTitle("");
      setDescription("");

      loadServices();

      alert("Service updated successfully!");
    } catch (error) {
      console.error(error);
    }
  };

  const deleteService = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this service?"
    );

    if (!confirmDelete) return;

    try {
      const response = await fetch(
        `http://localhost:5000/api/services/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete service");
      }

      loadServices();

      alert("Service deleted successfully!");
    } catch (error) {
      console.error(error);
    }
  };

  const editService = (service) => {
    setEditingId(service._id);
    setTitle(service.title);
    setDescription(service.description);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setTitle("");
    setDescription("");
  };

  return (
    <div
      style={{
        padding: "40px",
        minHeight: "100vh",
        background: "#f4f7fc",
      }}
    >
      <h1
        style={{
          color: "#132242",
          marginBottom: "30px",
        }}
      >
        Service Management
      </h1>

      <div
        style={{
          background: "white",
          padding: "25px",
          borderRadius: "15px",
          boxShadow:
            "0 5px 15px rgba(0,0,0,0.08)",
          marginBottom: "30px",
        }}
      >
        <h2>
          {editingId
            ? "Edit Service"
            : "Add New Service"}
        </h2>

        <input
          type="text"
          placeholder="Service Title"
          value={title}
          onChange={(e) =>
            setTitle(e.target.value)
          }
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

        <textarea
          placeholder="Service Description"
          value={description}
          onChange={(e) =>
            setDescription(e.target.value)
          }
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

        {editingId ? (
          <>
            <button
              onClick={updateService}
              style={{
                background: "#2563eb",
                color: "white",
                border: "none",
                padding: "12px 20px",
                borderRadius: "8px",
                marginRight: "10px",
                cursor: "pointer",
              }}
            >
              Update Service
            </button>

            <button
              onClick={cancelEdit}
              style={{
                background: "#6b7280",
                color: "white",
                border: "none",
                padding: "12px 20px",
                borderRadius: "8px",
                cursor: "pointer",
              }}
            >
              Cancel
            </button>
          </>
        ) : (
          <button
            onClick={addService}
            style={{
              background: "#16a34a",
              color: "white",
              border: "none",
              padding: "12px 20px",
              borderRadius: "8px",
              cursor: "pointer",
            }}
          >
            Add Service
          </button>
        )}
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "20px",
        }}
      >
        {services.map((service) => (
          <div
            key={service._id}
            style={{
              background: "white",
              padding: "20px",
              borderRadius: "15px",
              boxShadow:
                "0 5px 15px rgba(0,0,0,0.08)",
            }}
          >
            <h3>{service.title}</h3>

            <p>{service.description}</p>

            <div
              style={{
                display: "flex",
                gap: "10px",
              }}
            >
              <button
                onClick={() =>
                  editService(service)
                }
                style={{
                  background: "#2563eb",
                  color: "white",
                  border: "none",
                  padding: "10px 15px",
                  borderRadius: "8px",
                  cursor: "pointer",
                }}
              >
                Edit
              </button>

              <button
                onClick={() =>
                  deleteService(service._id)
                }
                style={{
                  background: "#dc2626",
                  color: "white",
                  border: "none",
                  padding: "10px 15px",
                  borderRadius: "8px",
                  cursor: "pointer",
                }}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ServiceManagement;
