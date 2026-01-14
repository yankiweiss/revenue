import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";

function Table() {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const searchData = data.filter((row) =>
    row.client?.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    fetch("https://revenue-two.vercel.app/api/patients")
      .then((res) => res.json())
      .then((data) => setData(data.data));
  }, []);

  const addItem = (id, field, newValue) => {
    fetch("https://revenue-two.vercel.app/api/patients/updateField", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, field, newValue }),
    });
  };

  return (
    <div className="container-fluid mt-5">
      {/* ================= Search ================= */}
      <div className="row mb-3">
        <div className="col-md-4 mx-auto">
          <input
            className="form-control shadow-sm"
            placeholder="🔍 Search client..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* ================= Table Card ================= */}
      <div className="card shadow-sm mx-auto" style={{ width: "90%" }}>
        <div className="card-header bg-light fw-bold">
          Patient Revenue Table
        </div>

        <div className="table-responsive">
          <table className="table table-hover align-middle mb-0">
            <thead className="table-light sticky-top">
              <tr>
                <th>Client</th>
                <th>Status</th>
                <th>Company</th>
                <th style={{ whiteSpace: "nowrap" }}>DOB</th>
                <th style={{ width: "30%" }}>Notes</th>
                <th></th>
              </tr>
            </thead>

            <tbody>
              {[...searchData]
                .sort((a, b) =>
                  a.client.localeCompare(b.client, undefined, {
                    sensitivity: "base",
                  })
                )
                .map((row) => (
                  <tr key={row.id}>
                    {/* Client */}
                    <td>
                      <input
                        className="form-control form-control-sm border-0 bg-transparent fw-semibold"
                        value={row.client}
                        onChange={(e) =>
                          setData((prev) =>
                            prev.map((r) =>
                              r.id === row.id
                                ? { ...r, client: e.target.value }
                                : r
                            )
                          )
                        }
                        onBlur={(e) =>
                          addItem(row.id, "client", e.target.value)
                        }
                      />
                    </td>

                    {/* Status */}
                    <td>
                      <input
                        className="form-control form-control-sm text-center border rounded-pill"
                        style={{ maxWidth: "110px" }}
                        value={row.status}
                        onChange={(e) =>
                          setData((prev) =>
                            prev.map((r) =>
                              r.id === row.id
                                ? { ...r, status: e.target.value }
                                : r
                            )
                          )
                        }
                        onBlur={(e) =>
                          addItem(row.id, "status", e.target.value)
                        }
                      />
                    </td>

                    {/* Company */}
                    <td>
                      <input
                        className="form-control form-control-sm border-0 bg-transparent"
                        value={row.company_name}
                        onChange={(e) =>
                          setData((prev) =>
                            prev.map((r) =>
                              r.id === row.id
                                ? { ...r, company_name: e.target.value }
                                : r
                            )
                          )
                        }
                        onBlur={(e) =>
                          addItem(row.id, "company_name", e.target.value)
                        }
                      />
                    </td>

                    {/* DOB */}
                    <td>
                      <input
                        className="form-control form-control-sm border-0 bg-transparent"
                        value={row.dob}
                        onChange={(e) =>
                          setData((prev) =>
                            prev.map((r) =>
                              r.id === row.id
                                ? { ...r, dob: e.target.value }
                                : r
                            )
                          )
                        }
                        onBlur={(e) =>
                          addItem(row.id, "dob", e.target.value)
                        }
                      />
                    </td>

                    {/* Notes */}
                    <td>
                      <textarea
                        rows="1"
                        className="form-control form-control-sm border-0 bg-transparent"
                        value={row.notes ?? ""}
                        onChange={(e) =>
                          setData((prev) =>
                            prev.map((r) =>
                              r.id === row.id
                                ? { ...r, notes: e.target.value }
                                : r
                            )
                          )
                        }
                        onBlur={(e) =>
                          addItem(
                            row.id,
                            "notes",
                            e.target.value.trim() || null
                          )
                        }
                      />
                    </td>

                    {/* Details */}
                    <td className="text-end">
                      <button
                        className="btn btn-outline-secondary btn-sm"
                        onClick={() =>
                          navigate(`/profile/${row.id}`, {
                            state: { patient: row },
                          })
                        }
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Table;
