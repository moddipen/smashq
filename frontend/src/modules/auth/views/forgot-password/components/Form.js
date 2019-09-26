import React from "react"
import PropTypes from "prop-types"
import { NavLink } from "redux-first-router-link"
const displayName = "ForgotPasswordForm"
const propTypes = {
  email: PropTypes.string.isRequired,
  errors: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired
}

const Form = ({ email, errors, handleChange, handleSubmit }) => (
  <section className="pad-40 confirm-number-section">
    <div className="container container500">
      <div className="bgwhite bordergray">
        <div className="commonsmall-box text-center">
          <div className="top-box mb-30">
            <div className="border-box-icon">
              <i className="fa fa-envelope-o"></i>
            </div>
            <h4>Enter Your Email</h4>
          </div>
          <div className="form-box">
            <form
              className="form-horizontal"
              onSubmit={handleSubmit}
              noValidate
            >
              <div className="form-group">
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
                  <div className="invalid-feedback">
                    {errors.first("email")}
                  </div>
                )}
              </div>
              <div className="form-group">
                <button className="btn-custom" type="submit">
                  Submit
                </button>
              </div>
              <p className="m-t-10">
                <NavLink to="/">
                  <i className="fa fa-arrow-left"></i> Back to Login Page
                </NavLink>
              </p>
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
