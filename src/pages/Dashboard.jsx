import { useEffect, useState } from "react";

function Dashboard() {
  const [user, setUser] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token =
          localStorage.getItem("token");

        const response = await fetch(
          "http://localhost:5000/api/user/profile",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();

        setUser(data);
        setName(data.name);
        setEmail(data.email);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProfile();
  }, []);

  const updateProfile = async () => {
    try {
      const token =
        localStorage.getItem("token");

      const response = await fetch(
        "http://localhost:5000/api/user/profile",
        {
          method: "PUT",
          headers: {
            "Content-Type":
              "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            name,
            email,
          }),
        }
      );

      const data = await response.json();

      setUser(data);

      alert(
        "Profile updated successfully"
      );
    } catch (error) {
      console.error(error);

      alert("Update failed");
    }
  };

  if (!user) {
    return <h2>Loading...</h2>;
  }

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
          maxWidth: "1100px",
          margin: "0 auto",
        }}
      >
        <h1
          style={{
            color: "#132242",
          }}
        >
          Customer Dashboard
        </h1>

        <p
          style={{
            color: "#64748b",
            marginBottom: "30px",
          }}
        >
          Welcome back, {user.name}
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit,minmax(320px,1fr))",
            gap: "25px",
          }}
        >
          {/* Profile */}
          <div
            style={{
              background: "white",
              padding: "25px",
              borderRadius: "15px",
              boxShadow:
                "0 5px 15px rgba(0,0,0,0.08)",
            }}
          >
            <h3>👤 Profile</h3>

            <p>
              <strong>Name:</strong>{" "}
              {user.name}
            </p>

            <p>
              <strong>Email:</strong>{" "}
              {user.email}
            </p>
            <p>
  <strong>Role:</strong>{" "}
  {user.role}
</p>
          </div>

          {/* Authentication */}
          <div
            style={{
              background: "white",
              padding: "25px",
              borderRadius: "15px",
              boxShadow:
                "0 5px 15px rgba(0,0,0,0.08)",
            }}
          >
            <h3>🔐 Account Status</h3>

            <p>
              JWT Authentication Enabled
            </p>

            <p
              style={{
                color: "green",
                fontWeight: "600",
              }}
            >
              ✅ Authorized User
            </p>
          </div>

          {/* User Information */}
          <div
            style={{
              background: "white",
              padding: "25px",
              borderRadius: "15px",
              boxShadow:
                "0 5px 15px rgba(0,0,0,0.08)",
            }}
          >
            <h3>🆔 User Information</h3>

            <p>
              <strong>ID:</strong>
            </p>

            <p>{user._id}</p>
          </div>
        </div>

        {/* Update Profile */}
        <div
          style={{
            marginTop: "40px",
            background: "white",
            padding: "25px",
            borderRadius: "15px",
            boxShadow:
              "0 5px 15px rgba(0,0,0,0.08)",
          }}
        >
          <h2>Update Profile</h2>

          <input
            type="text"
            value={name}
            onChange={(e) =>
              setName(e.target.value)
            }
            placeholder="Name"
            style={{
              width: "100%",
              padding: "12px",
              marginBottom: "15px",
            }}
          />

          <input
            type="email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            placeholder="Email"
            style={{
              width: "100%",
              padding: "12px",
              marginBottom: "15px",
            }}
          />

          <button
            onClick={updateProfile}
            style={{
              background: "#2563eb",
              color: "white",
              border: "none",
              padding: "12px 20px",
              borderRadius: "8px",
              cursor: "pointer",
            }}
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;