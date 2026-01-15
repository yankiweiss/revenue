import { useParams } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";

function ProfileDetail() {
  const [addInsuranceBtn, setAddInsuranceBtn] = useState(false);
  const [profileData, setProfileData] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const { id } = useParams();
  const numericId = Number(id);

  useEffect(() => {
    fetch(`https://revenue-two.vercel.app/api/patients/${numericId}`)
      .then((res) => res.json())
      .then((patient) => setProfileData(patient));
  }, [numericId]);

  useEffect(() => {
    if (profileData.client) {
      const clientNameSplit = profileData.client.split(" ");
      setFirstName(clientNameSplit[0]);
      setLastName(clientNameSplit[1]);
    }
  }, [profileData]);

  const handleUpdateField = (id ,field , newValue)  => {
    fetch("https://revenue-two.vercel.app/api/patients/updateField", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({id, field, newValue }),
    });

  }

  return (
    <div className="container my-5">
      {/* ================= Patient Info ================= */}
      <div className="card shadow-sm mb-4">
        <div className="card-header bg-light fw-bold">Patient Information</div>

        <div className="card-body">
          <div className="row g-3">
            <div className="col-md-3">
              <label className="form-label">First Name</label>
              <input
                className="form-control"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                onBlur={(e) => handleUpdateField("firstName", e.target.value)}
              />
            </div>

            <div className="col-md-3">
              <label className="form-label">Last Name</label>
              <input
                className="form-control"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>

            <div className="col-md-2 ">
              <label className="form-label">Date of Birth</label>
              <input
                className="form-control"
                value={profileData.dob}
                onChange={(e) => {
                  setProfileData((prev) => ({
                    ...prev,
                    dob: e.target.value,
                  }));
                }}
                onBlur={(e) =>
                  handleUpdateField(profileData.id, "dob", e.target.value)
                }
              />
            </div>
            <div className="col-md-2">
              <label className="form-label">Gender</label>
              <select class="form-select" aria-label="Default select example">
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>
          </div>

          <hr />

          <div className="row g-3">
            <div className="col-md-4">
              <label className="form-label">Address</label>
              <input
                className="form-control"
                value={profileData.address}
                onChange={(e) =>
                  setProfileData((prev) => ({
                    ...prev,
                    address: e.target.value,
                  }))
                }
                onBlur={(e) => handleUpdateField(profileData.id, 'address', e.target.value)}
              />
            </div>

            <div className="col-md-3">
              <label className="form-label">City</label>
              <input
                className="form-control"
                value={profileData.city}
                onChange={(e) =>
                  setProfileData((prev) => ({
                    ...prev,
                    city: e.target.value,
                  }))
                }
              />
            </div>

            <div className="col-md-3">
              <label className="form-label">Zip</label>
              <input
                className="form-control"
                value={profileData.zip}
                onChange={(e) =>
                  setProfileData((prev) => ({
                    ...prev,
                    zip: e.target.value,
                  }))
                }
              />
            </div>
          </div>

          <hr />

          <div className="row g-3">
            <div className="col-md-2">
              <label className="form-label">Worked Date</label>
              <input
                className="form-control"
                value={profileData.worked_date}
                onChange={(e) =>
                  setProfileData((prev) => ({
                    ...prev,
                    worked_date: e.target.value,
                  }))
                }
              />
            </div>
          </div>
        </div>
      </div>

      <div className="card shadow-sm mb-4">
        <div className="card-header bg-light fw-bold">Referring Provider</div>
        

        <div className="card-body">
          <div className="row g-3">
            <div className="col-md-2">
              <label className="form-label">First Name</label>
              <input
                className="form-control"
                value={profileData.providerFirstName}
                onChange={(e) =>
                  setProfileData((prev) => ({
                    ...prev,
                    providerFirstName : e.target.value,
                  }))
                }
              />
            </div>
            <div className="col-md-2">
              <label className="form-label">Last Name</label>
              <input
                className="form-control"
                value={profileData.providerLastName}
                onChange={(e) =>
                  setProfileData((prev) => ({
                    ...prev,
                    providerLastName : e.target.value,
                  }))
                }
              />
            </div>
             <div className="col-md-2">
              <label className="form-label">NPI #</label>
              <input
                className="form-control"
                value={profileData.npi}
                onChange={(e) =>
                  setProfileData((prev) => ({
                    ...prev,
                    npi : e.target.value,
                  }))
                }
              />
            </div>
          </div>
        </div>
      </div>
      

      {/* ================= Insurance Info ================= */}
      <div className="card shadow-sm mb-4">
        <div className="card-header bg-light fw-bold">
          Insurance Information
        </div>

        <div className="card-body">
          <div className="row g-3">
            <div className="col-md-2">
              <label className="form-label">Insurance</label>
              <input
                className="form-control"
                value={profileData.insurance}
                onChange={(e) =>
                  setProfileData((prev) => ({
                    ...prev,
                    insurance: e.target.value,
                  }))
                }
              />
            </div>

            <div className="col-md-2">
              <label className="form-label">Member ID</label>
              <input
                className="form-control"
                value={profileData.member_id}
                onChange={(e) =>
                  setProfileData((prev) => ({
                    ...prev,
                    member_id: e.target.value,
                  }))
                }
              />
            </div>

            <div className="col-md-1">
              <label className="form-label">Status</label>
              <input
                className="form-control"
                value={profileData.status}
                onChange={(e) =>
                  setProfileData((prev) => ({
                    ...prev,
                    status: e.target.value,
                  }))
                }
              />
            </div>
            <div className="col-md-2">
              {/* Empty label to align with other inputs */}
              <label className="form-label">&nbsp;</label>

              <div className="form-check d-flex align-items-center mt-1">
                <input
                  className="form-check-input me-2"
                  type="radio"
                  name="radioDefault"
                  id="radioDefault1"
                />
                <label className="form-check-label" htmlFor="radioDefault1">
                  Primary Insurance
                </label>
              </div>
            </div>
          </div>

          {addInsuranceBtn === true && (
            <>
              <hr />
              <div className="row g-3">
                <div className="col-md-2">
                  <label className="form-label">Insurance</label>
                  <input
                    className="form-control"
                    value={profileData.second_insurance}
                    readOnly
                  />
                </div>

                <div className="col-md-2">
                  <label className="form-label">Member ID</label>
                  <input
                    className="form-control"
                    value={profileData.second_member_id}
                    readOnly
                  />
                </div>

                <div className="col-md-1">
                  <label className="form-label">Status</label>
                  <input
                    className="form-control"
                    value={profileData.second_status}
                    readOnly
                  />
                </div>
                <div className="col-md-2">
                  {/* Empty label to align with other inputs */}
                  <label className="form-label">&nbsp;</label>

                  <div className="form-check d-flex align-items-center mt-1">
                    <input
                      className="form-check-input me-2"
                      type="radio"
                      name="radioDefault"
                      id="radioDefault1"
                    />
                    <label className="form-check-label" htmlFor="radioDefault1">
                      Primary Insurance
                    </label>
                  </div>
                </div>
              </div>
            </>
          )}

          <hr />
          <div className="row">
            <div className="col-md-2">
              <button
                type="button"
                className="btn btn-outline-primary"
                onClick={() => setAddInsuranceBtn(true)}
              >
                Add Insurance
              </button>
            </div>
          </div>

          <hr />
          <div className="row g-3">
            <div className="col-md-2">
              <label className="form-label">Authorization Number</label>
              <input className="form-control" readOnly />
            </div>
          </div>
        </div>
      </div>

      {/* ================= Notes ================= */}
      <div className="card shadow-sm">
        <div className="card-header bg-light fw-bold">Notes</div>

        <div className="card-body">
          <textarea
            className="form-control"
            rows="4"
            value={profileData.notes}
            onChange={(e) =>
              setProfileData((prev) => ({
                ...prev,
                notes: e.target.value,
              }))
            }
            onBlur={(e) =>
              handleUpdateField(profileData.id, "notes", e.target.value)
            }
          />
        </div>
      </div>
    </div>
  );
}

export default ProfileDetail;
