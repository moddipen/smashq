// import libs
import React from "react";
import PropTypes from "prop-types";
import { Validator } from "ree-validate";
// import components
import Form from "./components/Form";
import moment from "moment";

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

    // set the state of the app
    this.state = {
      credentials: {
        username: "",
        password: ""
      },
      errors: this.validator.errors
    };

    // bind component with event handlers
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  // event to handle input change
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

  // event to handle form submit
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

  // render component
  render() {
    // check if user is authenticated then redirect him to home page
    const props = {
      username: this.state.credentials.username,
      password: this.state.credentials.password,
      errors: this.state.errors,
      handleChange: this.handleChange,
      handleSubmit: this.handleSubmit
    };

    return (
      <div className="login-container">
        <div className="middle-login">
          <div className="block-flat">
            <div className="header" />
            <div>
              <Form {...props} />
            </div>
          </div>
          <div className="text-center out-links">
            &copy; {moment().format("Y")}
          </div>
        </div>
      </div>
    );
  }
}

export default Page;
