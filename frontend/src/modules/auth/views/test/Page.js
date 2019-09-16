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

    this.validator = new Validator({
      username: "required",
      password: "required|min:6"
    });

    this.registerValidator = new Validator({
      username: "required",
      email: "required|email",
      password: "required|min:6"
    });

    // set the state of the app
    this.state = {
      cars: [
        {
          model: "F-150"
        },
        {
          model: "Mustang"
        },
        {
          model: "Renault"
        }
      ],
      credentials: {
        username: "",
        password: ""
      },
      registerDetails: {
        username: "",
        email: "",
        password: ""
      },
      errors: this.validator.errors,
      registerErrors: this.registerValidator.errors
    };

    // bind component with event handlers
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleRegisterChange = this.handleRegisterChange.bind(this);
    this.handleRegisterSubmit = this.handleRegisterSubmit.bind(this);
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
        this.submitRegister(registerDetails);
      } else {
        this.setState({ registerErrors: errors });
      }
    });
  }

  submit(credentials) {
    this.props.login(credentials);
    // .catch(({error, statusCode}) => {
    //     const {errors} = this.validator
    //
    //     if (statusCode === 422) {
    //         _.forOwn(error, (message, field) => {
    //             errors.add(field, message);
    //         });
    //     } else if (statusCode === 401) {
    //         errors.add('password', error);
    //     }
    //
    //     this.setState({errors})
    // })
  }

  submitRegister(registerDetails) {
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
      handleSubmit: this.handleSubmit,
      handleRegisterChange: this.handleRegisterChange,
      handleRegisterSubmit: this.handleRegisterSubmit,
      cars: this.state.cars
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
