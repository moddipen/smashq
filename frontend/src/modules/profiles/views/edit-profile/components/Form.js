import React from "react";
import PropTypes from "prop-types";
import ProfileTabComponent from "../../../../../common/profile-tab/index";
import LoadingOverlay from "react-loading-overlay";
import BounceLoader from "react-spinners/BounceLoader";

import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Row,
  Col
} from "reactstrap";
import Avatar from "react-avatar-edit";
import { statement } from "@babel/template";

const displayName = "EditProfilePage";
const propTypes = {
  errors: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  src: PropTypes.string.isRequired,
  avoidSpace: PropTypes.func.isRequired,
  toggle: PropTypes.func.isRequired,
  previewShow: PropTypes.func.isRequired,
  onCrop: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  initialLoad: PropTypes.bool.isRequired
};

const Form = ({
  errors,
  handleChange,
  handleSubmit,
  profile,
  src,
  preview,
  avoidSpace,
  handleClose,
  toggle,
  modal,
  previewShow,
  onCrop,
  onClose,
  filePreview,
  initialLoad
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
                <div className="top-bar d-flex align-items-center mb-20">
                  <div className="edit-profile-avtar-box w-180 px-4">
                    <div className="edit-profile-avtar">
                      <a href="#">
                        <img src={filePreview} alt="" />
                      </a>
                    </div>
                  </div>
                  <div className="edit-profile-avtar-text">
                    <div className="name">{profile.name || ""}</div>
                    <div className="change">
                      <a href="#" onClick={toggle} className="inline-popup">
                        Change Profile Photo
                      </a>
                    </div>
                  </div>
                </div>
                <div className="form-section">
                  <form
                    className="form-horizontal"
                    onSubmit={handleSubmit}
                    noValidate
                  >
                    <div className="form-group">
                      <label htmlFor="name">
                        Name <span className="classerr">*</span>
                      </label>
                      <div className="form-input">
                        <input
                          value={profile.name || ""}
                          type="text"
                          name="name"
                          className={`form-control ${errors.has("name") &&
                            "is-invalid"}`}
                          placeholder=""
                          onChange={e =>
                            handleChange(e.target.name, e.target.value)
                          }
                        />

                        <input
                          type="hidden"
                          value={filePreview || ""}
                          name="image"
                        />

                        {errors.has("name") && (
                          <div className="invalid-feedback">
                            {errors.first("name")}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="form-group">
                      <label htmlFor="username">
                        Username <span className="classerr">*</span>
                      </label>
                      <div className="form-input">
                        <input
                          value={profile.username || ""}
                          type="text"
                          name="username"
                          className={`form-control ${errors.has("username") &&
                            "is-invalid"}`}
                          placeholder=""
                          onKeyPress={e =>
                            avoidSpace(e.target.name, e.target.value, e)
                          }
                          onChange={e =>
                            handleChange(e.target.name, e.target.value)
                          }
                        />
                        {errors.has("username") && (
                          <div className="invalid-feedback">
                            {errors.first("username")}
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="form-group">
                      <label htmlFor="website">Website</label>
                      <div className="form-input">
                        <input
                          value={profile.website || ""}
                          type="url"
                          name="website"
                          className={`form-control ${errors.has("website") &&
                            "is-invalid"}`}
                          placeholder=""
                          onChange={e =>
                            handleChange(e.target.name, e.target.value)
                          }
                        />
                        {errors.has("website") && (
                          <div className="invalid-feedback">
                            {errors.first("website")}
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="form-group">
                      <label htmlFor="motto">Motto</label>
                      <div className="form-input">
                        <textarea
                          name="motto"
                          cols="30"
                          rows="3"
                          className={`form-control ${errors.has("motto") &&
                            "is-invalid"}`}
                          onChange={e =>
                            handleChange(e.target.name, e.target.value)
                          }
                          value={profile.motto || ""}
                        />
                        {errors.has("motto") && (
                          <div className="invalid-feedback">
                            {errors.first("motto")}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="form-group">
                      <label htmlFor="description">Bio</label>
                      <div className="form-input">
                        <textarea
                          name="description"
                          cols="30"
                          rows="5"
                          className={`form-control ${errors.has(
                            "description"
                          ) && "is-invalid"}`}
                          onChange={e =>
                            handleChange(e.target.name, e.target.value)
                          }
                          value={profile.description || ""}
                        />
                        {errors.has("description") && (
                          <div className="invalid-feedback">
                            {errors.first("description")}
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="form-group">
                      <label htmlFor="email">
                        Email <span className="classerr">*</span>
                      </label>
                      <div className="form-input">
                        <input
                          value={profile.email || ""}
                          type="email"
                          name="email"
                          className={`form-control ${errors.has("email") &&
                            "is-invalid"}`}
                          placeholder=""
                          onChange={e =>
                            handleChange(e.target.name, e.target.value)
                          }
                        />
                        {errors.has("email") && (
                          <div className="invalid-feedback">
                            {errors.first("email")}
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="form-group">
                      <label htmlFor="phone">
                        Phone Number <span className="classerr">*</span>
                      </label>
                      <div className="form-input">
                        <input
                          value={profile.phone || ""}
                          type="text"
                          name="phone"
                          className={`form-control ${errors.has("phone") &&
                            "is-invalid"}`}
                          placeholder=""
                          onChange={e =>
                            handleChange(e.target.name, e.target.value)
                          }
                        />
                        {errors.has("phone") && (
                          <div className="invalid-feedback">
                            {errors.first("phone")}
                          </div>
                        )}
                        {/* <div className="confirm-num mt-10">
                          <a href="confirm-phone.php" className="btn-custom">
                            Confirm Phone Number
                          </a>
                        </div> */}
                      </div>
                    </div>
                    <div className="form-group">
                      <label htmlFor="gender">Gender</label>
                      <div className="form-input">
                        <div className="radio-item-group">
                          <div className="radio-item">
                            <input
                              type="radio"
                              name="gender"
                              value="male"
                              onChange={e =>
                                handleChange(e.target.name, e.target.value)
                              }
                              checked={profile.gender == "male"}
                              className={`form-control ${errors.has("gender") &&
                                "is-invalid"}`}
                            />{" "}
                            <span>Male</span>
                          </div>
                          <div className="radio-item">
                            <input
                              type="radio"
                              name="gender"
                              value="female"
                              onChange={e =>
                                handleChange(e.target.name, e.target.value)
                              }
                              checked={profile.gender == "female"}
                              className={`form-control ${errors.has("gender") &&
                                "is-invalid"}`}
                            />{" "}
                            <span>Female</span>
                          </div>
                          <div className="radio-item">
                            <input
                              type="radio"
                              name="gender"
                              value="other"
                              onChange={e =>
                                handleChange(e.target.name, e.target.value)
                              }
                              checked={profile.gender == "other"}
                              className={`form-control ${errors.has("gender") &&
                                "is-invalid"}`}
                            />{" "}
                            <span>Prefer Not To Say</span>
                          </div>
                          {errors.has("gender") && (
                            <div className="invalid-feedback">
                              {errors.first("gender")}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="form-group">
                      <label htmlFor="sas">Similar Account Suggestions</label>
                      <div className="form-input">
                        <div className="checkbox-item">
                          <input
                            type="checkbox"
                            name="sas"
                            value="1"
                            checked={profile.sas == "1"}
                            onChange={e =>
                              handleChange(e.target.name, e.target.value)
                            }
                            className={`form-control ${errors.has("sas") &&
                              "is-invalid"}`}
                          />{" "}
                          {errors.has("sas") && (
                            <div className="invalid-feedback">
                              {errors.first("sas")}
                            </div>
                          )}
                          <span>
                            Include your account when recommending similar
                            accounts people might want to <a href="#">[?]</a>
                          </span>
                        </div>
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

    <Modal isOpen={modal} toggle={toggle}>
      <ModalHeader toggle={toggle}>Change Profile Photo</ModalHeader>
      <ModalBody>
        <div className="button-group">
          <Row>
            <Col sm="2"></Col>
            <Col sm="8">
              <Avatar
                width={290}
                height={145}
                onCrop={onCrop}
                onClose={onClose}
                src={src}
              />
            </Col>
            {/* <Col sm="4">
              <img src={preview} alt="Preview" />
            </Col> */}
            <Col sm="2"></Col>
          </Row>
          <button
            type="button"
            onClick={previewShow}
            className="btn-custom m-2"
          >
            Upload Photo
          </button>
          {/* <br />
          <button className="btn-custom m-2">Remove Current Photo</button> */}
        </div>
      </ModalBody>
    </Modal>
  </section>
);

Form.displayName = displayName;
Form.propTypes = propTypes;

export default Form;
