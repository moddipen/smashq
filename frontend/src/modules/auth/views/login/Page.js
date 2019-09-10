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
  static displayName = "LoginPage";

  // validate props
  static propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    login: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);

    this.validator = new Validator({
      username: "required|min:6|max:15",
      password: "required|min:6"
    });

    this.registerValidator = new Validator({
      username: "required|min:6|max:15",
      email: "required|email",
      password: "required|min:6",
      terms: "required",
      age: "required"
    });

    // set the state of the app
    this.state = {
      credentials: {
        username: "",
        password: ""
      },
      registerDetails: {
        username: "",
        email: "",
        password: "",
        terms: "",
        age: ""
      },
      errors: this.validator.errors,
      registerErrors: this.registerValidator.errors
    };

    // bind component with event handlers
    this.avoidSpace = this.avoidSpace.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleRegisterChange = this.handleRegisterChange.bind(this);
    this.handleRegisterSubmit = this.handleRegisterSubmit.bind(this);
  }

  //Avoid space in username field
  avoidSpace(name, value, event) {
    if (event.key === " ") {
      event.preventDefault();
      return false;
    }
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

  // event to handle register input change
  handleRegisterChange(name, value) {
    const { errors } = this.registerValidator;

    this.setState({
      registerDetails: { ...this.state.registerDetails, [name]: value }
    });

    errors.remove(name);

    this.registerValidator.validate(name, value).then(() => {
      this.setState({ registerErrors: errors });
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

  // event to handle login form submit
  handleRegisterSubmit(e) {
    e.preventDefault();
    const { registerDetails } = this.state;
    const { errors } = this.registerValidator;

    this.registerValidator.validateAll(registerDetails).then(success => {
      if (success) {
        let data = {
          username: registerDetails.username,
          email: registerDetails.email,
          password: registerDetails.password
        };
        this.submitRegister(data);
      } else {
        this.setState({ registerErrors: errors });
      }
    });
  }

  submit(credentials) {
    this.props.login(credentials);
  }

  submitRegister(registerDetails) {
    console.log(registerDetails);
    this.props.register(registerDetails);
  }

  // render component
  render() {
    // check if user is authenticated then redirect him to home page
    const props = {
      login: this.state.credentials,
      register: this.state.registerDetails,
      errors: this.state.errors,
      registerErrors: this.state.registerErrors,
      handleChange: this.handleChange,
      avoidSpace: this.avoidSpace,
      handleSubmit: this.handleSubmit,
      handleRegisterChange: this.handleRegisterChange,
      handleRegisterSubmit: this.handleRegisterSubmit
    };

    return <Form {...props} />;
  }
}

export default Page;
