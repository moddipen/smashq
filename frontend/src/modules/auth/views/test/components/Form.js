import React from "react";
import PropTypes from "prop-types";
import { NavLink } from "redux-first-router-link";

const displayName = "LoginForm";
const propTypes = {
  login: PropTypes.object.isRequired,
  register: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  registerErrors: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleRegisterSubmit: PropTypes.func.isRequired,
  handleRegisterChange: PropTypes.func.isRequired
};

const Form = ({
  login,
  register,
  errors,
  registerErrors,
  handleChange,
  handleSubmit,
  handleRegisterChange,
  handleRegisterSubmit,
  cars
}) => (
  <div>
    <h1>Hello Teknomines</h1>
    {cars.map(car => (
      <li key={car.model}>{car.model}</li>
    ))}
  </div>
);

Form.displayName = displayName;
Form.propTypes = propTypes;

export default Form;
