import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

function SignIn({onLoginSuccess}) {
  const [res, setRes] = useState(null);

  const handleForm = (event) => {
    event.preventDefault();
    let form = event.target;
    let formData = new FormData(form);
    let formObjectData = Object.fromEntries(formData.entries());

    fetch("https://revenue-two.vercel.app/api/register/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formObjectData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            "Network response was not ok: " + response.statusText
          );
        }

        return response.json();
      })
      .then((data) => {
        setRes(data.message)
    
      onLoginSuccess()
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
      });
      event.target.reset()
  };

  return (
    <>
      <form
        className="d-flex flex-column align-items-center"
        onSubmit={handleForm}
      >
        <div className="mb-3 w-25" style={{ marginTop: "100px" }}>
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            aria-describedby="emailHelp"
            autoFocus
            name="user"
          />
          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div className="mb-3 w-25">
          <label htmlFor="pwd" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="pwd"
          />
          <div id="passHelp" className="form-text">
            Please Remember your Password.
          </div>
        </div>
        <button type="submit" className="btn btn-primary">
          Sign In
        </button>
        
      </form>
      {res && <h4 style={{color: 'navy', textAlign: 'center'}}>{res}</h4>}

      {/* need to set time out */}
    </>
  );
}

export default SignIn ;
