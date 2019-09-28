import React from "react"
import PropTypes from "prop-types"
import ProfileTabComponent from "../../../../../common/profile-tab/index"
import LoadingOverlay from "react-loading-overlay"
import BounceLoader from "react-spinners/BounceLoader"
import { dispatch } from "rxjs/internal/observable/pairs"
const displayName = "SettingsForm"
const propTypes = {
  errors: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  initialLoad: PropTypes.bool.isRequired,
  showInput: PropTypes.bool.isRequired,
  amount_error: PropTypes.string.isRequired,
  isChecked: PropTypes.bool.isRequired
}

const Form = ({
  errors,
  handleChange,
  handleSubmit,
  profile,
  initialLoad,
  showInput,
  amount_error,
  isChecked
}) => (
  <section className="pad-40 user-profile-edit-section">
    <LoadingOverlay
      active={!initialLoad}
      spinner={<BounceLoader />}
    ></LoadingOverlay>

    <div
      className="container container1030"
      style={{ display: initialLoad ? "block" : "none" }}
    >
      <div className="user-profile-edit-box bordergray bgwhite">
        <div className="row">
          <ProfileTabComponent />
          <div className="col-lg-9 col-md-8 col-12 pl-0">
            <div className="edit-content-box-wrap">
              <div className="edit-content-box edit-profile-box">
                <div className="form-section">
                  <form
                    className="form-horizontal"
                    onSubmit={handleSubmit}
                    noValidate
                  >
                    <div className="form-group">
                      <label htmlFor="sub_on_follow"></label>
                      <div className="form-input">
                        <input
                          type="checkbox"
                          name="sub_on_follow"
                          checked={isChecked}
                          onChange={e =>
                            handleChange(e.target.name, e.target.value)
                          }
                          className={`terms sub_follow form-control ${errors.has(
                            "sub_on_follow"
                          ) && "is-invalid"}`}
                        />
                        Subscription on follow
                        {errors.has("sub_on_follow") && (
                          <div className="invalid-feedback">
                            {errors.first("sub_on_follow")}
                          </div>
                        )}
                      </div>
                    </div>

                    <div
                      className="form-group"
                      style={{ display: showInput ? "flex" : "none" }}
                    >
                      <label htmlFor="amount">Amount</label>
                      <div className="form-input">
                        <input
                          value={profile.amount || ""}
                          type="text"
                          name="amount"
                          className={`form-control ${errors.has("amount") &&
                            "is-invalid"}`}
                          placeholder=""
                          onChange={e =>
                            handleChange(e.target.name, e.target.value)
                          }
                        />
                        {errors.has("amount") && (
                          <div className="invalid-feedback">
                            {errors.first("amount")}
                          </div>
                        )}
                        {amount_error != "" ? (
                          <div
                            className="invalid-feedback"
                            style={{ display: "block" }}
                          >
                            {amount_error}
                          </div>
                        ) : null}
                      </div>
                    </div>

                    <div className="form-group">
                      <label></label>
                      <div className="form-input">
                        <button type="submit" className="btn-custom">
                          Submit
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
    <div
      id="change-avtar"
      className="mfp-hide white-popup-block white-popup-450"
    >
      <div className="popup-content text-center">
        <div className="mb-20">
          <h3 className="font-weight-normal">Change Profile Photo</h3>
        </div>
        <div className="button-group">
          <button className="btn-custom m-2">Upload Photo</button>
          <button className="btn-custom m-2">Remove Current Photo</button>
        </div>
      </div>
    </div>
  </section>
)

Form.displayName = displayName
Form.propTypes = propTypes

export default Form
