import React from "react";
import PropTypes from "prop-types";
import { NavLink } from "redux-first-router-link";

const displayName = "ForgotPasswordForm";
const propTypes = {
  email: PropTypes.string.isRequired,
  errors: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired
};

const Form = ({ email, errors, handleChange, handleSubmit }) => (
  <div className="login-register-form-section">
    <ul className="nav nav-tabs" role="tablist">
      <li className="active">
        <a href="#forgot" data-toggle="tab">
          Forgot Password
        </a>
      </li>
    </ul>
    <div className="tab-content">
      <div role="tabpanel" className="tab-pane fade in active" id="forgot">
        <form className="form-horizontal" onSubmit={handleSubmit} noValidate>
          <div className="form-group">
            <div className="input-all">
              <input
                type="text"
                className={`form-control ${errors.has("email") &&
                  "is-invalid"}`}
                name="email"
                value={email || ""}
                placeholder="Email"
                onChange={e => handleChange(e.target.name, e.target.value)}
              />
              {errors.has("email") && (
                <div className="invalid-feedback">{errors.first("email")}</div>
              )}
            </div>
          </div>
          <input
            type="submit"
            value="Reset password"
            className="btn btn-success btn-custom"
          />
          <div className="col-sm-6">
            <NavLink to={`/login`}>Back to login?</NavLink>
          </div>
        </form>
      </div>
    </div>
  </div>
);

Form.displayName = displayName;
Form.propTypes = propTypes;

export default Form;
