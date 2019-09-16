import React from "react";
import PropTypes from "prop-types";
import { NavLink } from "redux-first-router-link";
import ProfileTabComponent from "../../../../../common/profile-tab/index";

const displayName = "SocialMediaForm";
const propTypes = {
  errors: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  avoidSpace: PropTypes.func.isRequired
};

const Form = ({ errors, handleChange, handleSubmit, profile, avoidSpace }) => (
  <section className="pad-40 user-profile-edit-section">
    <div className="container container1030">
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
);

Form.displayName = displayName;
Form.propTypes = propTypes;

export default Form;
