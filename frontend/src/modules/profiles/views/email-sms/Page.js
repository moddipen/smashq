// import libs
import React from "react";
import PropTypes from "prop-types";
import { Validator } from "ree-validate";
// import components
import Form from "./components/Form";

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
    const props = {};

    return <Form {...props} />;
  }
}

export default Page;
