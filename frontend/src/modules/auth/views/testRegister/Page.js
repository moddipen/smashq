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
  static displayName = "LoginPage";

  // validate props
  static propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    login: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);

    this.formValidator = new Validator({
      firstName: "required|min:4",
      lastName: "required|min:4"
    });

    // set the state of the app
    this.state = {
      formDetails: {
        firstName: "",
        lastName: ""
      },
      formErrors: this.formValidator.errors
    };

    // bind component with event handlers
    this.handleFormChange = this.handleFormChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  // event to handle register input change
  handleFormChange(name, value) {
    const { errors } = this.formValidator;

    this.setState({
      formDetails: { ...this.state.formDetails, [name]: value }
    });

    errors.remove(name);

    this.formValidator.validate(name, value).then(() => {
      this.setState({ formErrors: errors });
    });
  }

  // event to handle login form submit
  handleFormSubmit(e) {
    e.preventDefault();
    const { formDetails } = this.state;
    const { errors } = this.formValidator;

    this.formValidator.validateAll(formDetails).then(success => {
      if (success) {
        this.submitForm(formDetails);
      } else {
        this.setState({ formErrors: errors });
      }
    });
  }

  submitForm(formDetails) {
    console.log("submitForm", formDetails);
    this.props.form(formDetails);
  }

  // render component
  render() {
    // check if user is authenticated then redirect him to home page
    const props = {
      form: this.state.formDetails,
      formErrors: this.state.formErrors,
      handleChange: this.handleChange,
      handleSubmit: this.handleSubmit,
      handleFormChange: this.handleFormChange,
      handleFormSubmit: this.handleFormSubmit
    };

    return (
      <div className="row">
        <div className="container custom-container">
          <Form {...props} />
        </div>
      </div>
    );
  }
}

export default Page;
