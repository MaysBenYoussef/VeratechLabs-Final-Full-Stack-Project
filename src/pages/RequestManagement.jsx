import { useEffect, useState } from "react";
import "./RequestManagement.css";

function RequestManagement() {
  const [requests, setRequests] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] =
    useState("All");

  const token = localStorage.getItem("token");

  const loadRequests = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/requests?search=${search}&status=${statusFilter}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      setRequests(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadRequests();
  }, [search, statusFilter]);

  const updateStatus = async (
    requestId,
    status
  ) => {
    try {
      await fetch(
        `http://localhost:5000/api/requests/${requestId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type":
              "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            status,
          }),
        }
      );

      loadRequests();
    } catch (error) {
      console.error(error);
    }
  };

  const getStatusClass = (status) => {
    switch (status) {
      case "Pending":
        return "status pending";

      case "In Progress":
        return "status progress";

      case "Completed":
        return "status completed";

      default:
        return "status";
    }
  };

  return (
    <div className="request-page">
      <h1>📋 Customer Request Management</h1>

      <p>
        Search, filter and manage customer
        requests.
      </p>

      <div className="search-filter">
        <input
          type="text"
          placeholder="🔍 Search customer, email or service..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
        />

        <select
          value={statusFilter}
          onChange={(e) =>
            setStatusFilter(
              e.target.value
            )
          }
        >
          <option value="All">
            All Statuses
          </option>

          <option value="Pending">
            Pending
          </option>

          <option value="In Progress">
            In Progress
          </option>

          <option value="Completed">
            Completed
          </option>
        </select>
      </div>

      <div className="stats-grid">
        <div className="stat-card total">
          <h2>{requests.length}</h2>
          <p>Total Requests</p>
        </div>

        <div className="stat-card pending-card">
          <h2>
            {
              requests.filter(
                (r) =>
                  r.status ===
                  "Pending"
              ).length
            }
          </h2>
          <p>Pending</p>
        </div>

        <div className="stat-card progress-card">
          <h2>
            {
              requests.filter(
                (r) =>
                  r.status ===
                  "In Progress"
              ).length
            }
          </h2>
          <p>In Progress</p>
        </div>

        <div className="stat-card completed-card">
          <h2>
            {
              requests.filter(
                (r) =>
                  r.status ===
                  "Completed"
              ).length
            }
          </h2>
          <p>Completed</p>
        </div>
      </div>

      {requests.map((request) => (
        <div
          key={request._id}
          className="request-card"
        >
          <div className="request-header">
            <h2>
              {request.customerName}
            </h2>

            <span
              className={getStatusClass(
                request.status
              )}
            >
              {request.status}
            </span>
          </div>

          <p>
            <strong>Email:</strong>{" "}
            {request.email}
          </p>

          <p>
            <strong>Service:</strong>{" "}
            {request.service}
          </p>

          <p>
            <strong>Message:</strong>
          </p>

          <div className="message-box">
            {request.message}
          </div>

          <select
            value={request.status}
            onChange={(e) =>
              updateStatus(
                request._id,
                e.target.value
              )
            }
          >
            <option value="Pending">
              Pending
            </option>

            <option value="In Progress">
              In Progress
            </option>

            <option value="Completed">
              Completed
            </option>
          </select>
        </div>
      ))}
    </div>
  );
}

export default RequestManagement;