import React from "react";
import ProfileTabComponent from "../../../../../common/profile-tab/index";

const displayName = "EmailSmsForm";
const propTypes = {};

const Form = ({}) => (
  <section className="pad-40 user-profile-edit-section">
    <div className="container container1030">
      <div className="user-profile-edit-box bordergray bgwhite">
        <div className="row">
          <ProfileTabComponent />
          <div className="col-lg-9 col-md-8 col-12 pl-0">
            <div className="edit-content-box-wrap">
              <div className="edit-content-box subscribeto-form">
                <div className="top-bar d-flex align-items-center mb-20">
                  <div className="top-bar-inner-title">
                    <h3>Subscribe to:</h3>
                  </div>
                </div>
                <div className="form-section">
                  <form>
                    <div className="form-group">
                      <div className="checkbox-item w-100 pb-1">
                        <input type="checkbox" name="" value="" />{" "}
                        <span>
                          <strong>News emails</strong>
                        </span>
                      </div>
                      <div className="light-text">
                        Find out first about new products.
                      </div>
                    </div>
                    <div className="form-group">
                      <div className="checkbox-item w-100 pb-1">
                        <input type="checkbox" name="" value="" />{" "}
                        <span>
                          <strong>Reminder emails</strong>
                        </span>
                      </div>
                      <div className="light-text">
                        Stay up to date with things you may have missed.
                      </div>
                    </div>
                    <div className="form-group">
                      <div className="checkbox-item w-100 pb-1">
                        <input type="checkbox" name="" value="" />{" "}
                        <span>
                          <strong>Product emails</strong>
                        </span>
                      </div>
                      <div className="light-text">
                        Get tips on using Instagram's tools.
                      </div>
                    </div>
                    <div className="form-group">
                      <div className="checkbox-item w-100 pb-1">
                        <input type="checkbox" name="" value="" />{" "}
                        <span>
                          <strong>Research emails</strong>
                        </span>
                      </div>
                      <div className="light-text">
                        Provide feedback and participate in research studies.
                      </div>
                    </div>
                    <div className="form-group">
                      <div className="checkbox-item w-100 pb-1">
                        <input type="checkbox" name="" value="" />{" "}
                        <span>
                          <strong>Text (SMS) Messages</strong>
                        </span>
                      </div>
                      <div className="light-text">
                        Get reminder notifications delivered by text message.
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
);

Form.displayName = displayName;
Form.propTypes = propTypes;

export default Form;
