import React from "react";
import PropTypes from "prop-types";
import { NavLink } from "redux-first-router-link";

const displayName = "VerifyCodeForm";
const propTypes = {
  code: PropTypes.string.isRequired,
  errors: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  resendEmail: PropTypes.func.isRequired
};

const Form = ({ code, errors, handleChange, handleSubmit, resendEmail }) => (
  <section className="pad-40 confirm-number-section">
    <div className="container container500">
      <div className="bgwhite bordergray">
        <div className="confirm-number-box text-center">
          <div className="top-box mb-20">
            <div className="top-icon">#</div>
            <h4>Enter confirmation code</h4>
          </div>
          <div className="form-box">
            <p>
              Enter the confirmation code we sent to your email. If you didn't
              get it, we can{" "}
              <a href="#" onClick={resendEmail}>
                Resend Email
              </a>
              .
            </p>
            <form
              className="form-horizontal"
              onSubmit={handleSubmit}
              noValidate
            >
              <div className="form-group">
                <input
                  type="text"
                  className={`form-control ${errors.has("code") &&
                    "is-invalid"}`}
                  name="code"
                  value={code || ""}
                  placeholder="Confirmation Code"
                  onChange={e => handleChange(e.target.name, e.target.value)}
                />
                {errors.has("code") && (
                  <div className="invalid-feedback">{errors.first("code")}</div>
                )}
              </div>
              <p>
                Didn't enter the right Email?
                <br />
                <NavLink to={`/forgot-password`}>Change It</NavLink>
              </p>
              <div className="form-group">
                <button className="btn-custom" type="submit">
                  Done
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </section>
);

Form.displayName = displayName;
Form.propTypes = propTypes;

export default Form;
