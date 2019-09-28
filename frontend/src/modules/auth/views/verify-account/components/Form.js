import React from "react"
import PropTypes from "prop-types"
import { NavLink } from "redux-first-router-link"
const displayName = "VerifyAccountForm"
const propTypes = {
  resendLink: PropTypes.func.isRequired
}

const Form = ({ resendLink }) => (
  <section className="pad-40 confirm-number-section">
    <div className="container container500">
      <div className="bgwhite bordergray">
        <div className="commonsmall-box text-center">
          <div className="top-box mb-30">
            <div className="border-box-icon">
              <i className="fa fa-envelope-o"></i>
            </div>
          </div>
          <div className="form-box">
            <p>Your account is not verified yet.</p>

            <NavLink to="#" onClick={resendLink} className="btn-custom">
              Resend Verification Link
            </NavLink>
            <p className="m-t-10">
              <NavLink to="/login">
                <i className="fa fa-arrow-left"></i> Back to Login Page
              </NavLink>
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
)

Form.displayName = displayName
Form.propTypes = propTypes

export default Form
