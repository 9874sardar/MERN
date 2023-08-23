import React, { useState } from "react";
import Base from "../core/Base";
import { Redirect } from "react-router-dom";

import { signin, authenticate, isAutheticated } from "../auth/helper";

const Signin = () => {
  const [values, setValues] = useState({
    email: "gautam@gmil.com",
    password: "12345",
    error: "",
    loading: false,
    // success: false,
    didRedirect: false,
  });

  const { email, password, error, loading, didRedirect } = values;
  const { user } = isAutheticated();

  console.log(user);

  const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setValues({ ...values, error: false, loading: true });
    signin({ email, password })
      .then((data) => {
        if (data.error) {
          setValues({ ...values, error: data.error, loading: false });
        } else {
          authenticate(data, () => {
            setValues({
              ...values,
            //   success: true,
              didRedirect: true,
            });
          });
        }
      })
      .catch(console.log("Sign in failed"));
  };

  const performRedirect = () => {
    if (didRedirect) {
      if (user && user.role === 1) {
        // role == 1 means admin or not
        return <Redirect to="/admin/dashboard" />;
      } else {
        console.log(user);
        return <Redirect to="/user/dashboard" />;
      }
    }
    if(isAutheticated()){
        return <Redirect to={{
          pathname: "/"
        }} />
    }
  };

  const loadingMessage = () => {
    return (
      loading && (<div className="alert alert-info">
       <h2>Loading . . .</h2>
      </div>)
    );
  };

  const errorMessage = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <div
            className="alert alert-danger"
            style={{ display: error ? "" : "none" }}
          >
            {error}
          </div>
        </div>
      </div>
    );
  };

  const signInForm = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <form>
            <div className="form-group">
              <label className="text-light">Email</label>
              <input
                value={email}
                onChange={handleChange("email")}
                className="form-control"
                type="email"
              />
            </div>
            <div className="form-group">
              <label className="text-light">Password</label>
              <input
                value={password}
                onChange={handleChange("password")}
                className="form-control"
                type="password"
              />
            </div>
            <br />
            <button onClick={onSubmit} className="btn btn-success btn-block">
              Submit
            </button>
          </form>
        </div>
      </div>
    );
  };

  return (
    <Base title="sign In page" description="a for a user to sign in">
      {loadingMessage()}
      {errorMessage()}
      {signInForm()}
      {performRedirect()}
      <p className="text-white text-center">{JSON.stringify(values)}</p>
    </Base>
  );
};

export default Signin;
