// import libs
import React from "react";
import PropTypes from "prop-types";
import { Validator } from "ree-validate";
// import components
import Form from "./components/Form";

// initialize component
class Page extends React.Component {
  // set name of the component
  static displayName = "YourCoinPage";
  static propTypes = {};

  constructor(props) {
    super(props);
    this.validator = new Validator({
      coins: "required|numeric"
    });
    // set the state of the app
    this.state = {
      credentials: {
        coins: ""
      },
      errors: this.validator.errors
    };

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
    this.props.profile(credentials);
    let obj = {
      coins: ""
    };
    this.setState({ credentials: obj });
  }

  // render component
  render() {
    // console.log("auth user render", this.props.authUser);
    // check if user is authenticated then redirect him to home page
    const props = {
      coins: this.props.coins,
      errors: this.state.errors,
      handleChange: this.handleChange,
      handleSubmit: this.handleSubmit,
      profile: this.state.credentials
    };

    return <Form {...props} />;
  }
}

export default Page;
