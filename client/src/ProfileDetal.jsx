import { useLocation } from "react-router-dom";

function ProfileDetail() {
  const location = useLocation();
  const { patient } = location.state || {};

  const fullName = patient.client.split(" ");
  return (
    <>
      
        <div class="row d-flex justify-content-center mt-5">
          <div class="col-md-2">
            <label className="form-label"> First Name: </label>
            <input className="form-control" value={fullName[0]}></input>
          </div>
          <div class="col-md-2">
            <label className="form-label">Last Name: </label>
            <input className="form-control" value={fullName[1]}></input>
          </div>

          <div className="row d-flex justify-content-center mt-5">

          <div class="col-md-2">
            <label className="form-label">Address: </label>
            <input className="form-control" value={'need to configure'}></input>
          </div>
          <div class="col-md-2">
            <label className="form-label">City: </label>
            <input className="form-control" value={'city'}></input>
          </div>
          <div class="col-md-2">
            <label className="form-label">Zip: </label>
            <input className="form-control" value={'Zip'}></input>
          </div>

          </div>
          <div className="row d-flex justify-content-center mt-5">
          <div class="col-md-2">
            <label className="form-label">Date of birth:</label>
            <input className="form-control" value={patient.dob}></input>
          </div>
           <div class="col-md-2">
            <label className="form-label">Worked Date:</label>
            <input className="form-control" value={patient.worked_date}></input>
          </div>
          </div>
          
        </div>
      

      <div className="d-flex justify-content-center fw-bolder fs-3">
        <h1 className="mt-5 badge text-bg-secondary ">Insurance Info:</h1>
      </div>

      <div class="d-flex justify-content-center mt-5 gap-4">
        <div class="row">
          <div class="col-md-6">
            <label className="form-label"> Insurance: </label>
            <input className="form-control" value={patient.insurance}></input>
          </div>
          <div class="col-md-6">
            <label className="form-label">Member ID </label>
            <input className="form-control" value={patient.member_id}></input>
          </div>
        </div>
        <div class="col-md-1">
          <label className="form-label">Status </label>
          <input className="form-control" value={patient.status}></input>
        </div>
      </div>

      <div className="d-flex justify-content-center fw-bolder fs-3">
        <h1 className="mt-5 badge text-bg-secondary ">Notes:</h1>
      </div>

      <div class="d-flex justify-content-center mt-2">
        <div class="row">
          
            <label className="form-label"> Notes </label>
            <textarea className="form-control" value={patient.notes}/>
          
          </div>
          </div>
      
    </>
  );
}

export default ProfileDetail;
