import { useEffect, useState } from "react";

function DocumentManagement() {
  const [file, setFile] = useState(null);
  const [documents, setDocuments] = useState([]);
  const [message, setMessage] = useState("");

  const token = localStorage.getItem("token");

  const loadDocuments = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/documents",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();
      setDocuments(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadDocuments();
  }, []);

  const uploadDocument = async () => {
    if (!file) {
      setMessage("Please select a file.");
      return;
    }

    const formData = new FormData();
    formData.append("document", file);

    try {
      const response = await fetch(
        "http://localhost:5000/api/documents/upload",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Upload failed"
        );
      }

      setMessage(
        "✅ Document uploaded successfully."
      );

      setFile(null);

      loadDocuments();
    } catch (error) {
      setMessage(error.message);
    }
  };

  const deleteDocument = async (id) => {
    try {
      await fetch(
        `http://localhost:5000/api/documents/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMessage(
        "✅ Document deleted successfully."
      );

      loadDocuments();
    } catch (error) {
      console.error(error);
    }
  };

  const totalSize = (
    documents.reduce(
      (sum, doc) => sum + doc.fileSize,
      0
    ) / 1024
  ).toFixed(2);

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
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >
        <h1
          style={{
            color: "#132242",
            marginBottom: "10px",
          }}
        >
          📁 Document Center
        </h1>

        <p
          style={{
            color: "#64748b",
            marginBottom: "30px",
          }}
        >
          Upload, store and manage your
          documents securely.
        </p>

        {/* Stats */}

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit,minmax(250px,1fr))",
            gap: "20px",
            marginBottom: "30px",
          }}
        >
          <div
            style={{
              background: "#2563eb",
              color: "white",
              borderRadius: "15px",
              padding: "25px",
            }}
          >
            <h2>{documents.length}</h2>
            <p>Total Documents</p>
          </div>

          <div
            style={{
              background: "#16a34a",
              color: "white",
              borderRadius: "15px",
              padding: "25px",
            }}
          >
            <h2>{totalSize}</h2>
            <p>Total Storage (KB)</p>
          </div>
        </div>

        {/* Upload Zone */}

        <div
          style={{
            background: "white",
            padding: "25px",
            borderRadius: "15px",
            marginBottom: "30px",
            boxShadow:
              "0 5px 15px rgba(0,0,0,0.08)",
          }}
        >
          <h2>Upload Document</h2>

          <div
            style={{
              display: "flex",
              gap: "15px",
              flexWrap: "wrap",
              alignItems: "center",
              marginTop: "20px",
            }}
          >
            <label
              style={{
                background: "#2563eb",
                color: "white",
                padding: "12px 20px",
                borderRadius: "10px",
                cursor: "pointer",
                fontWeight: "600",
              }}
            >
              📁 Select Document

              <input
                type="file"
                hidden
                onChange={(e) =>
                  setFile(
                    e.target.files[0]
                  )
                }
              />
            </label>

            {file && (
              <div
                style={{
                  background:
                    "#dcfce7",
                  color:
                    "#166534",
                  padding:
                    "10px 15px",
                  borderRadius:
                    "8px",
                }}
              >
                ✅ {file.name}
              </div>
            )}

            <button
              onClick={uploadDocument}
              style={{
                background: "#2563eb",
                color: "white",
                border: "none",
                padding:
                  "12px 24px",
                borderRadius: "10px",
                cursor: "pointer",
              }}
            >
              Upload File
            </button>
          </div>

          {message && (
            <div
              style={{
                marginTop: "20px",
                padding: "15px",
                background:
                  "#dcfce7",
                color:
                  "#166534",
                borderRadius:
                  "10px",
              }}
            >
              {message}
            </div>
          )}
        </div>

        {/* Documents */}

        <h2
          style={{
            marginBottom: "20px",
          }}
        >
          My Documents
        </h2>

        {documents.length === 0 ? (
          <div
            style={{
              background: "white",
              padding: "25px",
              borderRadius: "15px",
            }}
          >
            No uploaded documents found.
          </div>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit,minmax(280px,1fr))",
              gap: "20px",
            }}
          >
            {documents.map((doc) => (
              <div
                key={doc._id}
                style={{
                  background:
                    "white",
                  borderRadius:
                    "15px",
                  padding: "20px",
                  boxShadow:
                    "0 5px 15px rgba(0,0,0,0.08)",
                }}
              >
                <div
                  style={{
                    fontSize:
                      "50px",
                    marginBottom:
                      "10px",
                  }}
                >
                  📄
                </div>

                <h3>{doc.originalName}</h3>

                <p>
                  <strong>
                    Type:
                  </strong>{" "}
                  {doc.fileType}
                </p>

                <p>
                  <strong>
                    Size:
                  </strong>{" "}
                  {(
                    doc.fileSize /
                    1024
                  ).toFixed(2)}{" "}
                  KB
                </p>

                <button
                  onClick={() =>
                    deleteDocument(
                      doc._id
                    )
                  }
                  style={{
                    background:
                      "#dc2626",
                    color:
                      "white",
                    border:
                      "none",
                    padding:
                      "10px 15px",
                    borderRadius:
                      "8px",
                    cursor:
                      "pointer",
                    marginTop:
                      "15px",
                  }}
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default DocumentManagement;