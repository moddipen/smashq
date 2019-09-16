// import libs
import React from "react";
import PropTypes from "prop-types";
// import components
import Form from "./components/Form";

// initialize component
class Page extends React.Component {
  // set name of the component
  static displayName = "EditProfilePage";
  // validate props
  static propTypes = {};
  constructor(props) {
    super(props);
    // set the state of the app
    this.state = {};
  }

  // render component
  render() {
    const items = this.props.users.slice(0, 7).map(i => {
      return i;
    });
    // check if user is authenticated then redirect him to home page
    const props = {
      users: items
    };
    return <Form {...props} />;
  }
}

export default Page;
