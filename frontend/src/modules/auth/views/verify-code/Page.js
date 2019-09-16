// import libs
import React from "react";
import PropTypes from "prop-types";
import { Validator } from "ree-validate";
// import components
import Form from "./components/Form";
//import "../../../../assets/css/login.css";

// initialize component
class Page extends React.Component {
  // set name of the component
  static displayName = "VerifyEmailPage";

  // validate props
  static propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    verifyCode: PropTypes.func.isRequired,
    resendEmailSuccess: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);

    this.validator = new Validator({
      code: "required|numeric|min:6|max:6"
    });

    // set the state of the app
    this.state = {
      credentials: {
        code: ""
      },
      errors: this.validator.errors
    };

    // bind component with event handlers
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.resendEmail = this.resendEmail.bind(this);
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

  //resendEmail
  resendEmail() {
    let data = {
      email: localStorage.getItem("email")
    };
    this.props.resendEmailSuccess(data);
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
    this.props.verifyCode(credentials);
  }

  // render component
  render() {
    // check if user is authenticated then redirect him to home page
    const props = {
      code: this.state.credentials.code,
      errors: this.state.errors,
      handleChange: this.handleChange,
      handleSubmit: this.handleSubmit,
      resendEmail: this.resendEmail
    };

    return <Form {...props} />;
  }
}

export default Page;
