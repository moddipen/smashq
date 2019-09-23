import React from "react";
import PropTypes from "prop-types";
import "../../../../../assets/css/paymentFormModal.css";
import { Row, Col } from "reactstrap";

const displayName = "PaymentForm";
const propTypes = {
  errors: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  authUser: PropTypes.object.isRequired,
  months: PropTypes.array.isRequired,
  years: PropTypes.array.isRequired
};

const Form = ({
  errors,
  authUser,
  handleChange,
  handleSubmit,
  profile,
  months,
  years
}) => (
  <div className="commonsmall-box box1">
    <h3 className="mb-20">PAYMENT</h3>
    <div className="form-box form-boxq">
      <form className="form-horizontal" onSubmit={handleSubmit} noValidate>
        <div className="form-group Row">
          <Col sm="3">
            <label htmlFor="cardnumber">Card No</label>
          </Col>
          <Col sm="9">
            <div className="form-input">
              <input
                value={profile.cardnumber || ""}
                type="tel"
                pattern="[\d| ]{16,22}"
                name="cardnumber"
                className={`form-control ${errors.has("cardnumber") &&
                  "is-invalid"}`}
                placeholder=""
                onChange={e => handleChange(e.target.name, e.target.value)}
              />
              {errors.has("cardnumber") && (
                <div className="invalid-feedback">
                  {errors.first("cardnumber")}
                </div>
              )}
            </div>
          </Col>
        </div>

        <div className="form-group Row">
          <Col sm="3">
            <label htmlFor="cvv">CVV</label>
          </Col>
          <Col sm="9">
            <div className="form-input">
              <input
                value={profile.cvv || ""}
                type="tel"
                name="cvv"
                pattern="\d{3,4}"
                className={`form-control ${errors.has("cvv") && "is-invalid"}`}
                placeholder=""
                onChange={e => handleChange(e.target.name, e.target.value)}
              />
              {errors.has("cvv") && (
                <div className="invalid-feedback">{errors.first("cvv")}</div>
              )}
            </div>
          </Col>
          {/* <Col sm="5">
            <input
              type="checkbox"
              name="remember"
              value="remember"
              checked={profile.remember !== ""}
              onChange={e => handleChange(e.target.name, e.target.value)}
              className={`terms form-control ${errors.has("remember") &&
                "is-invalid"}`}
            />
            <span>Remember Me</span>
            {errors.has("remember") && (
              <div className="invalid-feedback">{errors.first("remember")}</div>
            )}
          </Col> */}
        </div>

        <div className="form-group Row">
          <Col sm="3">
            <label htmlFor="expirydate">Expiry Date</label>
          </Col>
          <Col sm="4">
            <div className="form-input">
              <select
                name="expiremonth"
                onChange={e => handleChange(e.target.name, e.target.value)}
                className="form-control"
              >
                {months.map(month => {
                  return (
                    <option key={month.id} value={month.id}>
                      {month.name}
                    </option>
                  );
                })}
              </select>
            </div>
          </Col>
          <Col sm="5">
            <div className="form-input">
              <select
                name="expireyear"
                onChange={e => handleChange(e.target.name, e.target.value)}
                className="form-control"
              >
                {years.map(year => {
                  return <option key={year}>{year}</option>;
                })}
              </select>
            </div>
          </Col>
        </div>

        <div className="pad-30">
          <button type="submit" className="btn-custom">
            SUBMIT
          </button>
        </div>
      </form>
    </div>
  </div>
);

Form.displayName = displayName;
Form.propTypes = propTypes;

export default Form;
