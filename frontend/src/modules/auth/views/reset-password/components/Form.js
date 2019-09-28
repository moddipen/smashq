import React from "react"
import PropTypes from "prop-types"

const displayName = "ResetPasswordForm"
const propTypes = {
  password: PropTypes.string.isRequired,
  password_confirmation: PropTypes.string.isRequired,
  errors: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  confirm_error: PropTypes.string.isRequired
}

const Form = ({
  password,
  password_confirmation,
  errors,
  handleChange,
  handleSubmit,
  confirm_error
}) => (
  <section className="pad-40 confirm-number-section">
    <div className="container container500">
      <div className="bgwhite bordergray">
        <div className="commonsmall-box text-center ">
          <div className="top-box mb-30">
            <div className="border-box-icon">
              <i className="fa fa-key"></i>
            </div>
            <h4>Reset Password</h4>
          </div>
          <div className="form-box">
            <form
              className="form-horizontal"
              onSubmit={handleSubmit}
              noValidate
            >
              <div className="form-group">
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
              <div className="form-group">
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
                    The confirm password field is required.
                  </div>
                )}
                {confirm_error != "" ? (
                  <div
                    className="invalid-feedback"
                    style={{ display: "block" }}
                  >
                    {confirm_error}
                  </div>
                ) : null}
              </div>
              <div className="form-group resetpassform">
                <button className="btn-custom" type="submit">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </section>
)

Form.displayName = displayName
Form.propTypes = propTypes

export default Form
