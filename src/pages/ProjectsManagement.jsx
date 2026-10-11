import { useEffect, useState } from "react";
import "./ProjectsManagement.css";

function ProjectsManagement() {
  const [projects, setProjects] = useState([]);
  const [clients, setClients] = useState([]);
  const [users, setUsers] = useState([]);

  const [projectName, setProjectName] =
    useState("");

  const [description, setDescription] =
    useState("");

  const [status, setStatus] =
    useState("Not Started");

  const [client, setClient] =
    useState("");

  

  const [
    assignedMembers,
    setAssignedMembers,
  ] = useState([]);

  const token =
    localStorage.getItem("token");

  const loadProjects = async () => {
    const response = await fetch(
      "http://localhost:5000/api/projects",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await response.json();
    setProjects(data);
  };

  const loadClients = async () => {
    const response = await fetch(
      "http://localhost:5000/api/clients",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await response.json();
    setClients(data);
  };

  const loadUsers = async () => {
    const response = await fetch(
      "http://localhost:5000/api/user",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await response.json();
    setUsers(data);
  };

  useEffect(() => {
    loadProjects();
    loadClients();
    loadUsers();
  }, []);

  const createProject = async () => {
    try {
      await fetch(
        "http://localhost:5000/api/projects",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
            Authorization:
              `Bearer ${token}`,
          },
          body: JSON.stringify({
            projectName,
            description,
            status,
            client,
            assignedMembers,
          }),
        }
      );

      setProjectName("");
      setDescription("");
      setStatus("Not Started");
      setClient("");
      setAssignedMembers([]);

      loadProjects();
    } catch (error) {
      console.error(error);
    }
  };

  const deleteProject = async (id) => {
    try {
      await fetch(
        `http://localhost:5000/api/projects/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );

      loadProjects();
    } catch (error) {
      console.error(error);
    }
  };

  const updateStatus = async (
    id,
    newStatus
  ) => {
    try {
      await fetch(
        `http://localhost:5000/api/projects/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type":
              "application/json",
            Authorization:
              `Bearer ${token}`,
          },
          body: JSON.stringify({
            status: newStatus,
          }),
        }
      );

      loadProjects();
    } catch (error) {
      console.error(error);
    }
  };

  const totalProjects =
    projects.length;

  const activeProjects =
    projects.filter(
      (p) =>
        p.status === "In Progress"
    ).length;

  const completedProjects =
    projects.filter(
      (p) =>
        p.status === "Completed"
    ).length;

  return (
    <div className="project-page">
      <div className="page-header">
        <h1>
          📁 Project Management
        </h1>

        <p>
          Create, assign and track
          projects.
        </p>
      </div>

      <div className="stats-grid">
        <div className="stat-card total">
          <h2>{totalProjects}</h2>
          <p>Total Projects</p>
        </div>

        <div className="stat-card active">
          <h2>{activeProjects}</h2>
          <p>Active Projects</p>
        </div>

        <div className="stat-card completed">
          <h2>{completedProjects}</h2>
          <p>Completed Projects</p>
        </div>
      </div>

      <div className="project-form">
        <h2>Create Project</h2>

        <input
          type="text"
          placeholder="Project Name"
          value={projectName}
          onChange={(e) =>
            setProjectName(
              e.target.value
            )
          }
        />

        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) =>
            setDescription(
              e.target.value
            )
          }
        />

        <select
          value={status}
          onChange={(e) =>
            setStatus(
              e.target.value
            )
          }
        >
          <option>
            Not Started
          </option>

          <option>
            In Progress
          </option>

          <option>
            Completed
          </option>

          <option>
            On Hold
          </option>
        </select>

        <select
          value={client}
          onChange={(e) =>
            setClient(
              e.target.value
            )
          }
        >
          <option value="">
            Select Client
          </option>

          {clients.map(
            (client) => (
              <option
                key={client._id}
                value={
                  client._id
                }
              >
                {
                  client.companyName
                }
              </option>
            )
          )}
        </select>

        <div className="members-container">

  <label>
    Team Members
  </label>

  <select
    className="members-select"
    multiple
    value={assignedMembers}
    onChange={(e) =>
      setAssignedMembers(
        Array.from(
          e.target.selectedOptions,
          (option) => option.value
        )
      )
    }
  >
    {users.map((user) => (
      <option
        key={user._id}
        value={user._id}
      >
        {user.name}
      </option>
    ))}
  </select>

  <small>
    Hold CTRL to select multiple team members
  </small>

</div>
        <button
          onClick={createProject}
        >
          Create Project
        </button>
      </div>

      <h2>
        Projects Directory
      </h2>

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

              <div className="client-badge">
  🏢 {project.client?.companyName}
</div>

              <p>
                <strong>
                  Team:
                </strong>
              </p>

              <div className="members-list">
  {project.assignedMembers?.map(
    (member) => (
      <span
        key={member._id}
        className="member-badge"
      >
        👤 {member.name}
      </span>
    )
  )}
</div>

              <div
                className={`status ${project.status
                  .toLowerCase()
                  .replaceAll(
                    " ",
                    "-"
                  )}`}
              >
                {project.status}
              </div>

              <select
                value={
                  project.status
                }
                onChange={(
                  e
                ) =>
                  updateStatus(
                    project._id,
                    e.target
                      .value
                  )
                }
              >
                <option>
                  Not Started
                </option>

                <option>
                  In Progress
                </option>

                <option>
                  Completed
                </option>

                <option>
                  On Hold
                </option>
              </select>

              <div className="project-actions">
                <button
                  className="delete-btn"
                  onClick={() =>
                    deleteProject(
                      project._id
                    )
                  }
                >
                  Delete
                </button>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
}

export default ProjectsManagement;