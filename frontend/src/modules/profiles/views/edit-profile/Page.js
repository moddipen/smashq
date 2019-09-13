// import libs
import React from "react";
import PropTypes from "prop-types";
import { Validator } from "ree-validate";
// import components
import Form from "./components/Form";
import "../../../../assets/css/login.css";
import { API_URL } from "../../../../contants/config";

// initialize component
class Page extends React.Component {
  // set name of the component
  static displayName = "EditProfilePage";

  // validate props
  static propTypes = {};

  constructor(props) {
    super(props);
    const src = "/img/e1.png";
    this.validator = new Validator({
      name: "required",
      username: "required|min:6|max:15",
      email: "required|email",
      website: "",
      description: "",
      phone: "required",
      gender: "",
      sas: ""
    });
    // set the state of the app

    this.state = {
      credentials: {
        name: this.props.authUser.name,
        username: this.props.authUser.username,
        email: this.props.authUser.email,
        website: this.props.authUser.website,
        description: this.props.authUser.description,
        phone: this.props.authUser.phone,
        gender: this.props.authUser.gender || "male",
        sas: this.props.authUser.sas,
        photo: this.props.authUser.photo
      },
      preview: null,
      filePreview:
        this.props.authUser.photo != ""
          ? API_URL + "/" + this.props.authUser.photo
          : null,
      src:
        this.props.authUser.photo != ""
          ? API_URL + "/" + this.props.authUser.photo
          : null,
      modal: false,
      errors: this.validator.errors
    };

    this.previewShow = this.previewShow.bind(this);
    this.onCrop = this.onCrop.bind(this);
    this.onClose = this.onClose.bind(this);
    this.toggle = this.toggle.bind(this);
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

  //modal toggle
  toggle() {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  }

  previewShow() {
    this.setState({
      modal: false,
      filePreview: this.state.preview
    });
    this.setState({
      credentials: { ...this.state.credentials, photo: this.state.preview }
    });
  }

  onClose() {
    this.setState({ preview: null });
  }

  onCrop(preview) {
    this.setState({ preview });
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
    console.log(credentials);
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
      avoidSpace: this.avoidSpace,
      modal: this.state.modal,
      toggle: this.toggle,
      onClose: this.onClose,
      onCrop: this.onCrop,
      src: this.state.src,
      preview: this.state.preview,
      filePreview: this.state.filePreview,
      previewShow: this.previewShow
    };

    return <Form {...props} />;
  }
}

export default Page;
