import React from "react";
import PropTypes from "prop-types";

const displayName = "ResetPasswordForm";
const propTypes = {
  password: PropTypes.string.isRequired,
  password_confirmation: PropTypes.string.isRequired,
  errors: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired
};

const Form = ({
  password,
  password_confirmation,
  errors,
  handleChange,
  handleSubmit
}) => (
  <div className="login-register-form-section">
    <ul className="nav nav-tabs" role="tablist">
      <li className="active">
        <a href="#forgot" data-toggle="tab">
          Reset Password
        </a>
      </li>
    </ul>
    <div className="tab-content">
      <div role="tabpanel" className="tab-pane fade in active" id="forgot">
        <form className="form-horizontal" onSubmit={handleSubmit} noValidate>
          <div className="form-group">
            <div className="input-all">
              <input
                type="password"
                className={`form-control ${errors.has("password") &&
                  "is-invalid"}`}
                name="password"
                value={password || ""}
                placeholder="Password"
                onChange={e => handleChange(e.target.name, e.target.value)}
              />
              {errors.has("password") && (
                <div className="invalid-feedback">
                  {errors.first("password")}
                </div>
              )}
            </div>
          </div>
          <div className="form-group">
            <div className="input-all">
              <input
                type="password"
                className={`form-control ${errors.has(
                  "password_confirmation"
                ) && "is-invalid"}`}
                name="password_confirmation"
                value={password_confirmation || ""}
                placeholder="Confirm Password"
                onChange={e => handleChange(e.target.name, e.target.value)}
              />
              {errors.has("password_confirmation") && (
                <div className="invalid-feedback">
                  {errors.first("password_confirmation")}
                </div>
              )}
            </div>
          </div>
          <input
            type="submit"
            value="Reset password"
            className="btn btn-success btn-custom"
          />
        </form>
      </div>
    </div>
  </div>
);

Form.displayName = displayName;
Form.propTypes = propTypes;

export default Form;
