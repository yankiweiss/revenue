import { useLocation } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

function ProfileDetail() {
  const location = useLocation();
  const { patient } = location.state || {};

  if (!patient) return null;

  const [firstName, lastName] = patient.client.split(" ");

  return (
    <div className="container my-5">
      {/* ================= Patient Info ================= */}
      <div className="card shadow-sm mb-4">
        <div className="card-header bg-light fw-bold">
          Patient Information
        </div>

        <div className="card-body">
          <div className="row g-3">
            <div className="col-md-4">
              <label className="form-label">First Name</label>
              <input className="form-control" value={firstName} readOnly />
            </div>

            <div className="col-md-4">
              <label className="form-label">Last Name</label>
              <input className="form-control" value={lastName} readOnly />
            </div>

            <div className="col-md-4">
              <label className="form-label">Date of Birth</label>
              <input className="form-control" value={patient.dob} readOnly />
            </div>
          </div>

          <hr />

          <div className="row g-3">
            <div className="col-md-6">
              <label className="form-label">Address</label>
              <input
                className="form-control"
                value="Need to configure"
                readOnly
              />
            </div>

            <div className="col-md-3">
              <label className="form-label">City</label>
              <input className="form-control" value="City" readOnly />
            </div>

            <div className="col-md-3">
              <label className="form-label">Zip</label>
              <input className="form-control" value="Zip" readOnly />
            </div>
          </div>

          <hr />

          <div className="row g-3">
            <div className="col-md-4">
              <label className="form-label">Worked Date</label>
              <input
                className="form-control"
                value={patient.worked_date}
                readOnly
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
            <div className="col-md-5">
              <label className="form-label">Insurance</label>
              <input
                className="form-control"
                value={patient.insurance}
                readOnly
              />
            </div>

            <div className="col-md-4">
              <label className="form-label">Member ID</label>
              <input
                className="form-control"
                value={patient.member_id}
                readOnly
              />
            </div>

            <div className="col-md-3">
              <label className="form-label">Status</label>
              <input
                className="form-control"
                value={patient.status}
                readOnly
              />
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
            value={patient.notes}
            readOnly
          />
        </div>
      </div>
    </div>
  );
}

export default ProfileDetail;
