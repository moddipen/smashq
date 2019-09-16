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
  static displayName = "ChangePasswordForm";

  // validate props
  static propTypes = {};

  constructor(props) {
    super(props);
    this.validator = new Validator({
      old_password: "required",
      password: "required|min:6",
      confirm_password: "required|min:6"
    });
    // set the state of the app
    this.state = {
      credentials: {
        photo: this.props.authUser.photo,
        name: this.props.authUser.name,
        old_password: "",
        password: "",
        confirm_password: ""
      },
      errors: this.validator.errors,
      confirm_error: ""
    };

    this.avoidSpace = this.avoidSpace.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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

  // event to handle profile form submit
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
    if (
      this.state.credentials.password !==
      this.state.credentials.confirm_password
    ) {
      this.setState({
        confirm_error: "Confirmation password does not match with new password."
      });
    } else {
      this.setState({
        confirm_error: ""
      });
      const credentialsC = {
        old_password: this.state.credentials.old_password,
        password: this.state.credentials.password,
        confirm_password: this.state.credentials.confirm_password
      };
      this.props.profile(credentialsC);
    }
  }

  // render component
  render() {
    //console.log("auth user", this.props.authUser);
    // check if user is authenticated then redirect him to home page

    const props = {
      confirm_error: this.state.confirm_error,
      profile: this.state.credentials,
      authUser: this.state.authUser,
      errors: this.state.errors,
      handleChange: this.handleChange,
      handleSubmit: this.handleSubmit
    };

    return <Form {...props} />;
  }
}

export default Page;
