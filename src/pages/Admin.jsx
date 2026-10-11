import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

function Admin() {
  const [contents, setContents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    section: "",
    title: "",
    description: ""
  });

  const [editingId, setEditingId] = useState(null);

  const API = "http://localhost:5000/api/content";

  const fetchContents = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await fetch(API);

      if (!response.ok) {
        throw new Error("Failed to fetch content");
      }

      const data = await response.json();
      setContents(data);
    } catch (err) {
      setError("Unable to load content. Is the backend running?");
    } finally {
      setLoading(false);
    }
  };


  const resetForm = () => {
    setForm({
      section: "",
      title: "",
      description: ""
    });

    setEditingId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!form.section || !form.title || !form.description) {
      setError("All fields are required");
      return;
    }

    try {
      const url = editingId ? `${API}/${editingId}` : API;
      const method = editingId ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(form)
      });

      if (!response.ok) {
        throw new Error("Request failed");
      }

      resetForm();
      fetchContents();

    } catch (error) {
      setError(
        editingId
          ? "Unable to update content."
          : "Unable to add content."
      );
    }
  };

  const handleEdit = (item) => {
    setEditingId(item._id);
    setError("");

    setForm({
      section: item.section,
      title: item.title,
      description: item.description
    });

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this content item?")) return;

    setError("");

    try {
      const response = await fetch(`${API}/${id}`, {
        method: "DELETE"
      });

      if (!response.ok) {
        throw new Error("Delete failed");
      }

      fetchContents();
    } catch (error) {
      setError("Unable to delete content.");
    }
  };

  return (
    <div className="admin-page">

      <h1>Content Management Dashboard</h1>

      <form
        className="admin-form"
        onSubmit={handleSubmit}
      >

        <select
          value={form.section}
          onChange={(e) =>
            setForm({
              ...form,
              section: e.target.value
            })
          }
          required
        >
          <option value="">
            Select Section
          </option>

          <option value="hero">
            Hero
          </option>

          <option value="about">
            About
          </option>

          <option value="services">
            Services
          </option>

          <option value="why">
            Why Choose Us
          </option>

          <option value="contact">
            Contact
          </option>

          <option value="footer">
            Footer
          </option>

        </select>

        <input
          type="text"
          placeholder="Title"
          value={form.title}
          onChange={(e) =>
            setForm({
              ...form,
              title: e.target.value
            })
          }
          required
        />

        <textarea
          rows="5"
          placeholder="Description"
          value={form.description}
          onChange={(e) =>
            setForm({
              ...form,
              description: e.target.value
            })
          }
          required
        />

        <button type="submit">
          {editingId
            ? "Update Content"
            : "Add Content"}
        </button>

        {editingId && (
          <button
            type="button"
            onClick={resetForm}
            style={{ background: "#64748b" }}
          >
            Cancel Edit
          </button>
        )}

        {error && (
          <p style={{ color: "#dc2626", margin: 0 }}>
            {error}
          </p>
        )}

      </form>

      <div className="admin-items">

        {loading && <p>Loading content...</p>}

        {!loading && contents.length === 0 && (
          <p>No content items yet. Add one above.</p>
        )}

        {!loading && contents.map((item) => (
          <div
            key={item._id}
            className="admin-card"
          >
            <h3>{item.title}</h3>

            <p>
              <strong>
                {item.section}
              </strong>
            </p>

            <p>
              {item.description}
            </p>

            <div className="admin-actions">

              <button
                className="edit-btn"
                onClick={() =>
                  handleEdit(item)
                }
              >
                Edit
              </button>

              <button
                className="delete-btn"
                onClick={() =>
                  handleDelete(item._id)
                }
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

export default Admin;