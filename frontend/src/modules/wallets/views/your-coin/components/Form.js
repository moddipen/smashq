import React from "react";
import PropTypes from "prop-types";

const displayName = "YourCoinForm";
const propTypes = {
  errors: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  coins: PropTypes.number.isRequired
};

const Form = ({ errors, coins, handleChange, handleSubmit, profile }) => (
  <section className="pad-40 confirm-number-section">
    <div className="container container500">
      <div className="bgwhite bordergray">
        <div className="commonsmall-box text-center">
          <div className="top-box mb-20">
            <div className="border-box-icon">Q</div>
          </div>
          <h3 className="mb-20">
            Your total coin is Q <span>{coins}</span>
          </h3>
          <div className="form-box">
            <p>
              Lorem Ipsum is simply dummy text of industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled{" "}
            </p>
            <form
              className="form-horizontal"
              onSubmit={handleSubmit}
              noValidate
            >
              <div className="form-group">
                <input
                  value={profile.coins || ""}
                  type="text"
                  name="coins"
                  className={`form-control ${errors.has("coins") &&
                    "is-invalid"}`}
                  placeholder=""
                  onChange={e => handleChange(e.target.name, e.target.value)}
                />
                {errors.has("coins") && (
                  <div className="invalid-feedback">
                    {errors.first("coins")}
                  </div>
                )}
              </div>
              <div className="form-group">
                <button type="submit" className="btn-custom">
                  Add Coins
                </button>
              </div>
            </form>
            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
);

Form.displayName = displayName;
Form.propTypes = propTypes;

export default Form;
