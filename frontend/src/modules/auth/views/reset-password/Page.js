// import libs
import React from "react";
import PropTypes from "prop-types";
import { Validator } from "ree-validate";
// import components
import Form from "./components/Form";
import "../../../../assets/css/login.css";

// initialize component
class Page extends React.Component {
  // set name of the component
  static displayName = "ResetPasswordPage";

  // validate props
  static propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    resetPassword: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);

    this.validator = new Validator({
      password: "required|min:6",
      password_confirmation: "required"
    });

    // set the state of the app
    this.state = {
      credentials: {
        token: props.params.token,
        password: "",
        password_confirmation: ""
      },
      errors: this.validator.errors
    };

    // bind component with event handlers
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  // event to handle login input change
  handleChange(name, value) {
    const { errors } = this.validator;

    this.setState({
      credentials: { ...this.state.credentials, [name]: value }
    });

    errors.remove(name);

    this.validator.validate(name, value).then(() => {
      this.setState({ errors });
    });
  }

  // event to handle login form submit
  handleSubmit(e) {
    e.preventDefault();
    const { credentials } = this.state;
    const { errors } = this.validator;

    this.validator.validateAll(credentials).then(success => {
      if (success) {
        this.submit(credentials);
      } else {
        this.setState({ errors });
      }
    });
  }

  submit(credentials) {
    this.props.resetPassword(credentials);
  }

  // render component
  render() {
    // check if user is authenticated then redirect him to home page
    const props = {
      password: this.state.credentials.password,
      password_confirmation: this.state.credentials.password_confirmation,
      errors: this.state.errors,
      handleChange: this.handleChange,
      handleSubmit: this.handleSubmit
    };

    return <Form {...props} />;
  }
}

export default Page;
