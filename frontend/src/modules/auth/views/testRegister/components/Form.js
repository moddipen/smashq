import React from "react";
import PropTypes from "prop-types";
import { NavLink } from "redux-first-router-link";

const displayName = "Form";
const propTypes = {
  handleFormSubmit: PropTypes.func.isRequired,
  form: PropTypes.object.isRequired,
  formErrors: PropTypes.object.isRequired,
  handleFormChange: PropTypes.func.isRequired
};

const Form = ({ handleFormSubmit, form, formErrors, handleFormChange }) => (
  <div>
    <h1>Form</h1>
    <form className="form-horizontal" onSubmit={handleFormSubmit} noValidate>
      <div className="form-group ">
        <div className="input-all">
          <input
            type="text"
            className={`form-control ${formErrors.has("firstName") &&
              "is-invalid"}`}
            name="firstName"
            value={form.firstName || ""}
            placeholder="firstName"
            onChange={e => handleFormChange(e.target.name, e.target.value)}
          />
          {formErrors.has("firstName") && (
            <div className="invalid-feedback">
              {formErrors.first("firstName")}
            </div>
          )}
        </div>
      </div>

      <div className="form-group ">
        <div className="input-all">
          <input
            type="text"
            className={`form-control ${formErrors.has("lastName") &&
              "is-invalid"}`}
            name="lastName"
            value={form.lastName || ""}
            placeholder="lastName"
            onChange={e => handleFormChange(e.target.name, e.target.value)}
          />
          {formErrors.has("lastName") && (
            <div className="invalid-feedback">
              {formErrors.first("lastName")}
            </div>
          )}
        </div>
      </div>

      <input
        type="submit"
        value="Save"
        className="btn btn-success btn-custom"
      />
    </form>
  </div>
);

Form.displayName = displayName;
Form.propTypes = propTypes;

export default Form;
