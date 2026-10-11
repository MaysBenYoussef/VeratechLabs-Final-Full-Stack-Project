import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Logout() {
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setTimeout(() => {
      navigate("/");
    }, 2500);
  }, [navigate]);

  return (
    <div
      style={{
        height: "80vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <h1>👋 See you soon!</h1>

      <p>
        You have been successfully
        logged out.
      </p>
    </div>
  );
}

export default Logout;