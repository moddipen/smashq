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
  static displayName = "SocialMediaPage";

  // validate props
  static propTypes = {};

  constructor(props) {
    super(props);
    this.validator = new Validator({
      facebook: "url",
      instagram: "url",
      snapchat: "url",
      twitter: "url",
      youtube: "url",
      amazon: "url"
    });
    // set the state of the app
    this.state = {
      credentials: {
        facebook: this.props.authUser.facebook,
        instagram: this.props.authUser.instagram,
        snapchat: this.props.authUser.snapchat,
        twitter: this.props.authUser.twitter,
        youtube: this.props.authUser.youtube,
        amazon: this.props.authUser.amazon
      },
      errors: this.validator.errors
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
    this.props.profile(credentials);
  }

  // render component
  render() {
    //console.log("auth user", this.props.authUser);
    // check if user is authenticated then redirect him to home page

    const props = {
      profile: this.state.credentials,
      authUser: this.state.authUser,
      errors: this.state.errors,
      handleChange: this.handleChange,
      handleSubmit: this.handleSubmit,
      avoidSpace: this.avoidSpace
    };

    return <Form {...props} />;
  }
}

export default Page;
