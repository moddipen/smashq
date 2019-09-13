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
  static displayName = "EditProfilePage";

  // validate props
  static propTypes = {};

  constructor(props) {
    super(props);
    const src = "/img/e1.png";
    // set the state of the app
    this.state = {};

    // this.previewShow = this.previewShow.bind(this);
  }

  // render component
  render() {
    //console.log("auth user", this.props.authUser);
    // check if user is authenticated then redirect him to home page
    const props = {
      users: this.props.users
    };

    return <Form {...props} />;
  }
}

export default Page;
