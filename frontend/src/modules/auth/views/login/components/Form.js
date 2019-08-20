import React from "react";
import PropTypes from "prop-types";

const displayName = "LoginForm";
const propTypes = {
  login: PropTypes.object.isRequired,
  register: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  registerErrors: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleRegisterSubmit: PropTypes.func.isRequired,
  handleRegisterChange: PropTypes.func.isRequired
};

const Form = ({
  login,
  register,
  errors,
  registerErrors,
  handleChange,
  handleSubmit,
  handleRegisterChange,
  handleRegisterSubmit
}) => (
  <div className="login-register-form-section">
    <ul className="nav nav-tabs" role="tablist">
      <li className="active">
        <a href="#login" data-toggle="tab">
          Login
        </a>
      </li>
      <li>
        <a href="#register" data-toggle="tab">
          Register
        </a>
      </li>
    </ul>
    <div className="tab-content">
      <div role="tabpanel" className="tab-pane fade in active" id="login">
        <form className="form-horizontal" onSubmit={handleSubmit} noValidate>
          <div className="form-group">
            <div className="input-all">
              <input
                type="text"
                className={`form-control ${errors.has("username") &&
                  "is-invalid"}`}
                name="username"
                value={login.username || ""}
                placeholder="Username"
                onChange={e => handleChange(e.target.name, e.target.value)}
              />
              {errors.has("username") && (
                <div className="invalid-feedback">
                  {errors.first("username")}
                </div>
              )}
            </div>
          </div>
          <div className="form-group">
            <div className="input-all">
              <input
                type="password"
                className={`form-control ${errors.has("password") &&
                  "is-invalid"}`}
                name="password"
                placeholder="Password"
                value={login.password || ""}
                onChange={e => handleChange(e.target.name, e.target.value)}
              />
              {errors.has("password") && (
                <div className="invalid-feedback">
                  {errors.first("password")}
                </div>
              )}
            </div>
          </div>
          <input
            type="submit"
            value="Login"
            className="btn btn-success btn-custom"
          />
          <div className="form-group form-group-custom">
            By login in you agree to our
            <a href="#">Terms & condition</a> and
            <a href="#">privacy policies</a>
          </div>
        </form>
      </div>
      <div role="tabpanel" className="tab-pane fade" id="register">
        <form
          className="form-horizontal"
          onSubmit={handleRegisterSubmit}
          noValidate
        >
          <div className="form-group ">
            <div className="input-all">
              <input
                type="text"
                className={`form-control ${registerErrors.has("username") &&
                  "is-invalid"}`}
                name="username"
                value={register.username || ""}
                placeholder="Username"
                onChange={e =>
                  handleRegisterChange(e.target.name, e.target.value)
                }
              />
              {registerErrors.has("username") && (
                <div className="invalid-feedback">
                  {registerErrors.first("username")}
                </div>
              )}
            </div>
          </div>

          <div className="form-group ">
            <div className="input-all">
              <input
                type="text"
                className={`form-control ${registerErrors.has("email") &&
                  "is-invalid"}`}
                name="email"
                value={register.email || ""}
                placeholder="Email"
                onChange={e =>
                  handleRegisterChange(e.target.name, e.target.value)
                }
              />
              {registerErrors.has("email") && (
                <div className="invalid-feedback">
                  {registerErrors.first("email")}
                </div>
              )}
            </div>
          </div>
          <div className="form-group ">
            <div className="input-all">
              <input
                type="password"
                className={`form-control ${registerErrors.has("password") &&
                  "is-invalid"}`}
                name="password"
                placeholder="Password"
                value={register.password || ""}
                onChange={e =>
                  handleRegisterChange(e.target.name, e.target.value)
                }
              />
              {registerErrors.has("password") && (
                <div className="invalid-feedback">
                  {registerErrors.first("password")}
                </div>
              )}
            </div>
          </div>

          <input
            type="submit"
            value="Register"
            className="btn btn-success btn-custom"
          />
          <div className="form-group form-group-custom">
            By registering you agree to our
            <a href="#">Terms & condition</a> and
            <a href="#">privacy policies</a>
          </div>
        </form>
      </div>
    </div>
  </div>
);

Form.displayName = displayName;
Form.propTypes = propTypes;

export default Form;
