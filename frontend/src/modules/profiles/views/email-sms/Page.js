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
  static displayName = "EmailSmsForm";

  // validate props
  static propTypes = {};

  constructor(props) {
    super(props);
  }

  // render component
  render() {
    //console.log("auth user", this.props.authUser);
    // check if user is authenticated then redirect him to home page

    const props = {
      // confirm_error: this.state.confirm_error,
      // profile: this.state.credentials,
      // authUser: this.state.authUser,
      // errors: this.state.errors,
      // handleChange: this.handleChange,
      // handleSubmit: this.handleSubmit
    };

    return <Form {...props} />;
  }
}

export default Page;
