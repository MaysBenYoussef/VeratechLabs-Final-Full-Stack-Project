import { useEffect, useState } from "react";
import "./ClientsManagement.css";

function ClientsManagement() {
  
  const [clients, setClients] = useState([]);

  const [companyName, setCompanyName] =
    useState("");

  const [contactPerson, setContactPerson] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [phone, setPhone] =
    useState("");

  const token =
    localStorage.getItem("token");

  const loadClients = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/clients",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data =
        await response.json();

      setClients(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadClients();
  }, []);

  const [loading, setLoading] = useState(false);

const addClient = async () => {
  try {
    setLoading(true);

    const response = await fetch(
      "http://localhost:5000/api/clients",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          companyName,
          contactPerson,
          email,
          phone,
        }),
      }
    );

    if (!response.ok) {
      throw new Error(
        "Failed to add client"
      );
    }

    setCompanyName("");
    setContactPerson("");
    setEmail("");
    setPhone("");

    await loadClients();
  } catch (error) {
    console.error(error);
  } finally {
    setLoading(false);
  }
};


  const deleteClient = async (id) => {
    try {
      await fetch(
        `http://localhost:5000/api/clients/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      loadClients();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="client-page">
      <div className="page-header">
        <h1>🏢 Clients Management</h1>

        <p>
          Manage client companies and
          project stakeholders.
        </p>
      </div>

      <div className="stats-card">
        <h2>{clients.length}</h2>

        <span>
          Total Clients
        </span>
      </div>

      <div className="form-card">
        <h2>Add New Client</h2>

        <input
          type="text"
          placeholder="Company Name"
          value={companyName}
          onChange={(e) =>
            setCompanyName(
              e.target.value
            )
          }
        />

        <input
          type="text"
          placeholder="Contact Person"
          value={contactPerson}
          onChange={(e) =>
            setContactPerson(
              e.target.value
            )
          }
        />

        <input
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) =>
            setEmail(
              e.target.value
            )
          }
        />

        <input
          type="text"
          placeholder="Phone Number"
          value={phone}
          onChange={(e) =>
            setPhone(
              e.target.value
            )
          }
        />

        <button
  onClick={addClient}
  disabled={loading}
>
  {loading
    ? "Adding..."
    : "Add Client"}
</button>
      </div>

      <div className="clients-section">
        <h2>Clients Directory</h2>

        {clients.length === 0 ? (
          <div className="client-card">
            No clients available.
          </div>
        ) : (
          clients.map((client) => (
            <div
              key={client._id}
              className="client-card"
            >
              <h3>
                {client.companyName}
              </h3>

              <p>
                <strong>
                  Contact:
                </strong>{" "}
                {
                  client.contactPerson
                }
              </p>

              <p>
                <strong>
                  Email:
                </strong>{" "}
                {client.email}
              </p>

              <p>
                <strong>
                  Phone:
                </strong>{" "}
                {client.phone}
              </p>

              <div className="actions">
                <button
                  className="delete-btn"
                  onClick={() =>
                    deleteClient(
                      client._id
                    )
                  }
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default ClientsManagement;