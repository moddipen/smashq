import React from "react";
import PropTypes from "prop-types";
import { NavLink } from "redux-first-router-link";

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
  <section className="pad-40 login-section">
    <div className="container">
      <div className="row">
        <div className="col-md-6 col-12 d-md-block d-none">
          <div className="single-img text-center">
            <img src="img/mobile-design-view.png" alt="" />
          </div>
        </div>
        <div className="col-md-6 col-12">
          <div className="content-block">
            <div className="login-logo d-md-block d-none">
              <img src="img/logo-icon.png" alt="" />
            </div>
            <div className="loginsignup-form">
              <ul className="login-tabs-nav nav nav-tabs" role="tablist">
                <li className="active">
                  <a href="#tab-1" data-toggle="tab">
                    Login
                  </a>
                </li>
                <li>
                  <a href="#tab-2" data-toggle="tab">
                    Register
                  </a>
                </li>
              </ul>
              <div className="login-tabs-content-wrap tab-content login-tabs-content">
                <div
                  role="tabpanel"
                  className="login-tab-box tab-pane fade active in show"
                  id="tab-1"
                >
                  <h3>Please login!</h3>
                  <form
                    className="form-horizontal"
                    onSubmit={handleSubmit}
                    noValidate
                  >
                    <div className="form-group">
                      <input
                        type="text"
                        className={`form-control ${errors.has("username") &&
                          "is-invalid"}`}
                        name="username"
                        value={login.username || ""}
                        placeholder="Username"
                        onChange={e =>
                          handleChange(e.target.name, e.target.value)
                        }
                      />
                      {errors.has("username") && (
                        <div className="invalid-feedback">
                          {errors.first("username")}
                        </div>
                      )}
                    </div>
                    <div className="form-group">
                      <input
                        type="password"
                        className={`form-control ${errors.has("password") &&
                          "is-invalid"}`}
                        name="password"
                        placeholder="Password"
                        value={login.password || ""}
                        onChange={e =>
                          handleChange(e.target.name, e.target.value)
                        }
                      />
                      {errors.has("password") && (
                        <div className="invalid-feedback">
                          {errors.first("password")}
                        </div>
                      )}
                    </div>
                    <div className="form-group">
                      <button className="btn-custom" type="submit">
                        Login
                      </button>
                    </div>
                  </form>
                  <div className="extra-line">
                    <p>
                      Forgot your{" "}
                      <NavLink to={`/forgot-password`}>
                        password?
                      </NavLink>
                    </p>
                  </div>
                </div>
                <div
                  role="tabpanel"
                  className="login-tab-box tab-pane fade"
                  id="tab-2"
                >
                  <h3>Register, it's free!</h3>
                  <form
                    className="form-horizontal"
                    onSubmit={handleRegisterSubmit}
                    noValidate
                  >
                    <div className="form-group">
                      <input
                        type="text"
                        className={`form-control ${registerErrors.has(
                          "username"
                        ) && "is-invalid"}`}
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
                    <div className="form-group">
                      <input
                        type="text"
                        className={`form-control ${registerErrors.has(
                          "email"
                        ) && "is-invalid"}`}
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
                    <div className="form-group">
                      <input
                        type="password"
                        className={`form-control ${registerErrors.has(
                          "password"
                        ) && "is-invalid"}`}
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
                    <div className="form-group">
                      <input
                        type="checkbox"
                        name="terms"
                        value="terms"
                        onChange={e =>
                          handleRegisterChange(e.target.name, e.target.value)
                        }
                        className={`terms form-control ${registerErrors.has(
                          "terms"
                        ) && "is-invalid"}`}
                      />
                      Terms & Conditions
                      {registerErrors.has("terms") && (
                        <div className="invalid-feedback">
                          {registerErrors.first("terms")}
                        </div>
                      )}
                    </div>
                    <div className="form-group">
                      <input
                        type="checkbox"
                        name="age"
                        value="age"
                        onChange={e =>
                          handleRegisterChange(e.target.name, e.target.value)
                        }
                        className={`terms form-control ${registerErrors.has(
                          "terms"
                        ) && "is-invalid"}`}
                      />{" "}
                      Age 18 +
                      {registerErrors.has("age") && (
                        <div className="invalid-feedback">
                          {registerErrors.first("age")}
                        </div>
                      )}
                    </div>
                    <div className="form-group">
                      <button className="btn-custom" type="submit">
                        Register
                      </button>
                    </div>
                  </form>
                  <div className="extra-line">
                    <p>
                      By signing up you agree to our{" "}
                      <a href="#">Terms & Conditions</a> and{" "}
                      <a href="#">Privacy Policies</a>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

Form.displayName = displayName;
Form.propTypes = propTypes;

export default Form;
