import React from "react"
import PropTypes from "prop-types"
import ProfileTabComponent from "../../../../../common/profile-tab/index"
import { API_URL } from "../../../../../contants/config"

const displayName = "ChangePasswordForm"
const propTypes = {
  errors: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  confirm_error: PropTypes.string.isRequired
}

const Form = ({
  errors,
  handleChange,
  handleSubmit,
  profile,
  confirm_error
}) => (
  <section className="pad-40 user-profile-edit-section">
    <div className="container container1030">
      <div className="user-profile-edit-box bordergray bgwhite">
        <div className="row">
          <ProfileTabComponent />
          <div className="col-lg-9 col-md-8 col-12 pl-0">
            <div className="edit-content-box-wrap">
              <div className="edit-content-box change-pwd-box">
                <div className="top-bar d-flex align-items-center mb-20">
                  <div className="edit-profile-avtar-box w-180 px-4">
                    <div className="edit-profile-avtar">
                      <img
                        src={
                          profile.photo != ""
                            ? API_URL + "/" + profile.photo
                            : "/img/noimg.png"
                        }
                        alt=""
                      />
                    </div>
                  </div>
                  <div className="edit-profile-avtar-text">
                    <div className="name">{profile.name || ""}</div>
                  </div>
                </div>
                <div className="form-section">
                  <form
                    className="form-horizontal"
                    onSubmit={handleSubmit}
                    noValidate
                  >
                    <div className="form-group">
                      <label htmlFor="oldpwd">Old Password</label>
                      <div className="form-input">
                        <input
                          type="password"
                          name="old_password"
                          className={`form-control ${errors.has(
                            "old_password"
                          ) && "is-invalid"}`}
                          placeholder=""
                          onChange={e =>
                            handleChange(e.target.name, e.target.value)
                          }
                        />
                        {errors.has("old_password") && (
                          <div className="invalid-feedback">
                            The old password field is required.
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="form-group">
                      <label htmlFor="password">New Password</label>
                      <div className="form-input">
                        <input
                          type="password"
                          name="password"
                          className={`form-control ${errors.has("password") &&
                            "is-invalid"}`}
                          placeholder=""
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
                    </div>
                    <div className="form-group">
                      <label htmlFor="confirm_password">
                        Confirm New Password
                      </label>
                      <div className="form-input">
                        <input
                          type="password"
                          name="confirm_password"
                          className={`form-control ${errors.has(
                            "confirm_password"
                          ) && "is-invalid"}`}
                          placeholder=""
                          onChange={e =>
                            handleChange(e.target.name, e.target.value)
                          }
                        />
                        {errors.has("confirm_password") && (
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
                    </div>
                    <div className="form-group">
                      <label></label>
                      <div className="form-input">
                        <button type="submit" className="btn-custom">
                          Change Password
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
)

Form.displayName = displayName
Form.propTypes = propTypes

export default Form
