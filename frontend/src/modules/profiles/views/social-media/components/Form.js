import React from "react"
import PropTypes from "prop-types"
import ProfileTabComponent from "../../../../../common/profile-tab/index"
import LoadingOverlay from "react-loading-overlay"
import BounceLoader from "react-spinners/BounceLoader"
const displayName = "SocialMediaForm"
const propTypes = {
  errors: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  avoidSpace: PropTypes.func.isRequired,
  initialLoad: PropTypes.bool.isRequired,
  facebook_error: PropTypes.string.isRequired,
  instagram_error: PropTypes.string.isRequired,
  snapchat_error: PropTypes.string.isRequired,
  twitter_error: PropTypes.string.isRequired,
  youtube_error: PropTypes.string.isRequired,
  amazon_error: PropTypes.string.isRequired
}

const Form = ({
  errors,
  handleChange,
  handleSubmit,
  profile,
  avoidSpace,
  initialLoad,
  facebook_error,
  instagram_error,
  snapchat_error,
  twitter_error,
  youtube_error,
  amazon_error
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
                      <label htmlFor="name">Facebook</label>
                      <div className="form-input">
                        <input
                          value={profile.facebook || ""}
                          type="text"
                          name="facebook"
                          className={`form-control ${errors.has("facebook") &&
                            "is-invalid"}`}
                          placeholder=""
                          onChange={e =>
                            handleChange(e.target.name, e.target.value)
                          }
                        />
                        {errors.has("facebook") && (
                          <div className="invalid-feedback">
                            {errors.first("facebook")}
                          </div>
                        )}
                        {facebook_error != "" ? (
                          <div
                            className="invalid-feedback"
                            style={{ display: "block" }}
                          >
                            {facebook_error}
                          </div>
                        ) : null}
                      </div>
                    </div>

                    <div className="form-group">
                      <label htmlFor="name">Instagram</label>
                      <div className="form-input">
                        <input
                          value={profile.instagram || ""}
                          type="text"
                          name="instagram"
                          className={`form-control ${errors.has("instagram") &&
                            "is-invalid"}`}
                          placeholder=""
                          onChange={e =>
                            handleChange(e.target.name, e.target.value)
                          }
                        />
                        {errors.has("instagram") && (
                          <div className="invalid-feedback">
                            {errors.first("instagram")}
                          </div>
                        )}
                        {instagram_error != "" ? (
                          <div
                            className="invalid-feedback"
                            style={{ display: "block" }}
                          >
                            {instagram_error}
                          </div>
                        ) : null}
                      </div>
                    </div>

                    <div className="form-group">
                      <label htmlFor="name">Snapchat</label>
                      <div className="form-input">
                        <input
                          value={profile.snapchat || ""}
                          type="text"
                          name="snapchat"
                          className={`form-control ${errors.has("snapchat") &&
                            "is-invalid"}`}
                          placeholder=""
                          onChange={e =>
                            handleChange(e.target.name, e.target.value)
                          }
                        />
                        {errors.has("snapchat") && (
                          <div className="invalid-feedback">
                            {errors.first("snapchat")}
                          </div>
                        )}
                        {snapchat_error != "" ? (
                          <div
                            className="invalid-feedback"
                            style={{ display: "block" }}
                          >
                            {snapchat_error}
                          </div>
                        ) : null}
                      </div>
                    </div>

                    <div className="form-group">
                      <label htmlFor="name">Twitter</label>
                      <div className="form-input">
                        <input
                          value={profile.twitter || ""}
                          type="text"
                          name="twitter"
                          className={`form-control ${errors.has("twitter") &&
                            "is-invalid"}`}
                          placeholder=""
                          onChange={e =>
                            handleChange(e.target.name, e.target.value)
                          }
                        />
                        {errors.has("twitter") && (
                          <div className="invalid-feedback">
                            {errors.first("twitter")}
                          </div>
                        )}
                        {twitter_error != "" ? (
                          <div
                            className="invalid-feedback"
                            style={{ display: "block" }}
                          >
                            {twitter_error}
                          </div>
                        ) : null}
                      </div>
                    </div>

                    <div className="form-group">
                      <label htmlFor="name">Youtube</label>
                      <div className="form-input">
                        <input
                          value={profile.youtube || ""}
                          type="text"
                          name="youtube"
                          className={`form-control ${errors.has("youtube") &&
                            "is-invalid"}`}
                          placeholder=""
                          onChange={e =>
                            handleChange(e.target.name, e.target.value)
                          }
                        />
                        {errors.has("youtube") && (
                          <div className="invalid-feedback">
                            {errors.first("youtube")}
                          </div>
                        )}
                        {youtube_error != "" ? (
                          <div
                            className="invalid-feedback"
                            style={{ display: "block" }}
                          >
                            {youtube_error}
                          </div>
                        ) : null}
                      </div>
                    </div>

                    <div className="form-group">
                      <label htmlFor="name">Amazon</label>
                      <div className="form-input">
                        <input
                          value={profile.amazon || ""}
                          type="text"
                          name="amazon"
                          className={`form-control ${errors.has("amazon") &&
                            "is-invalid"}`}
                          placeholder=""
                          onChange={e =>
                            handleChange(e.target.name, e.target.value)
                          }
                        />
                        {errors.has("amazon") && (
                          <div className="invalid-feedback">
                            {errors.first("amazon")}
                          </div>
                        )}
                        {amazon_error != "" ? (
                          <div
                            className="invalid-feedback"
                            style={{ display: "block" }}
                          >
                            {amazon_error}
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
