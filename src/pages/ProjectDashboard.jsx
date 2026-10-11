import { useEffect, useState } from "react";
import "./ProjectDashboard.css";

function ProjectDashboard() {
  const [projects, setProjects] = useState([]);

  const token =
    localStorage.getItem("token");

  useEffect(() => {
    fetch(
      "http://localhost:5000/api/projects",
      {
        headers: {
          Authorization:
            `Bearer ${token}`,
        },
      }
    )
      .then((res) => res.json())
      .then((data) => setProjects(data))
      .catch((err) =>
        console.error(err)
      );
  }, []);

  const totalProjects =
    projects.length;

  const activeProjects =
    projects.filter(
      (p) =>
        p.status ===
        "In Progress"
    ).length;

  const completedProjects =
    projects.filter(
      (p) =>
        p.status ===
        "Completed"
    ).length;

  const onHoldProjects =
    projects.filter(
      (p) =>
        p.status ===
        "On Hold"
    ).length;

  const getStatusClass = (
    status
  ) => {
    switch (status) {
      case "Not Started":
        return "status not-started";

      case "In Progress":
        return "status in-progress";

      case "Completed":
        return "status completed";

      case "On Hold":
        return "status on-hold";

      default:
        return "status";
    }
  };

  return (
    <div className="dashboard-page">

      <div className="dashboard-header">
        <h1>
          🚀 Project Dashboard
        </h1>

        <p>
          Monitor projects,
          progress, and team
          assignments.
        </p>
      </div>

      {/* KPI */}

      <div className="stats-grid">

        <div className="stat-card total">
          <h2>
            {totalProjects}
          </h2>

          <p>
            Total Projects
          </p>
        </div>

        <div className="stat-card active">
          <h2>
            {activeProjects}
          </h2>

          <p>
            Active Projects
          </p>
        </div>

        <div className="stat-card completed-card">
          <h2>
            {completedProjects}
          </h2>

          <p>
            Completed
          </p>
        </div>

        <div className="stat-card hold">
          <h2>
            {onHoldProjects}
          </h2>

          <p>
            On Hold
          </p>
        </div>

      </div>

      {/* Projects */}

      <h2 className="section-title">
        Project Portfolio
      </h2>

      {projects.length === 0 ? (
        <div className="empty-state">
          No projects found.
        </div>
      ) : (
        <div className="projects-grid">

          {projects.map(
            (project) => (

              <div
                key={project._id}
                className="project-card"
              >

                <h3>
                  {
                    project.projectName
                  }
                </h3>

                <p>
                  {
                    project.description
                  }
                </p>

                <div
                  className={getStatusClass(
                    project.status
                  )}
                >
                  {
                    project.status
                  }
                </div>

                <div className="project-info">

                  <p>
                    <strong>
                      Client:
                    </strong>{" "}
                    {project
                      .client
                      ?.companyName ||
                      "N/A"}
                  </p>

                  <p>
                    <strong>
                      Team Members:
                    </strong>{" "}
                    {project
                      .assignedMembers
                      ?.length ||
                      0}
                  </p>

                </div>

              </div>
            )
          )}

        </div>
      )}
    </div>
  );
}

export default ProjectDashboard;