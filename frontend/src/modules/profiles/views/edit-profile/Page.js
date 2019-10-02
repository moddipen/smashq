// import libs
import React from "react"
import PropTypes from "prop-types"
import { Validator } from "ree-validate"
// import components
import Form from "./components/Form"
import { API_URL } from "../../../../contants/config"

// initialize component
class Page extends React.Component {
  // set name of the component
  static displayName = "EditProfilePage"

  // validate props
  static propTypes = {}

  constructor(props) {
    super(props)
    const src = "/img/e1.png"
    this.validator = new Validator({
      name: "required",
      username: "required|min:6|max:15",
      email: "required|email",
      website: "url",
      description: "",
      motto: "",
      phone: "required|numeric|min:8|max:15",
      gender: "",
      sas: ""
    })
    // set the state of the app

    this.state = {
      credentials: {},
      preview: null,
      filePreview:
        this.props.authUser.photo != ""
          ? API_URL + "/" + this.props.authUser.photo
          : "/img/noimg.png",
      src: "",
      modal: false,
      errors: this.validator.errors,
      website_error: ""
    }

    this.previewShow = this.previewShow.bind(this)
    this.onCrop = this.onCrop.bind(this)
    this.onClose = this.onClose.bind(this)
    this.toggle = this.toggle.bind(this)
    this.avoidSpace = this.avoidSpace.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount() {
    if (Object.keys(this.props.authUser).length !== 0) {
      let credentials = {
        name: this.props.authUser.name,
        username: this.props.authUser.username,
        email: this.props.authUser.email,
        website: this.props.authUser.website,
        description: this.props.authUser.description,
        motto: this.props.authUser.motto,
        phone: this.props.authUser.phone,
        gender: this.props.authUser.gender || "male",
        sas: this.props.authUser.sas,
        photo: this.props.authUser.photo
      }
      this.setState({ credentials: credentials })
    }
  }

  //Avoid space in username field
  avoidSpace(name, value, event) {
    if (event.key === " ") {
      event.preventDefault()
      return false
    }
  }

  // event to handle login input change
  handleChange(name, value) {
    const { errors } = this.validator
    this.setState({
      credentials: { ...this.state.credentials, [name]: value }
    })
    errors.remove(name)
    if (name === "website") {
      this.setState({ website_error: "" })
    }

    this.validator.validate(name, value).then(() => {
      this.setState({ errors })
    })
  }

  //modal toggle
  toggle() {
    this.setState(prevState => ({
      modal: !prevState.modal
    }))
  }

  previewShow() {
    let preview
    if (this.state.preview === null) {
      preview =
        this.props.authUser.photo != ""
          ? API_URL + "/" + this.props.authUser.photo
          : "/img/noimg.png"
    } else {
      preview = this.state.preview
    }
    this.setState({
      modal: false,
      filePreview: preview
    })
    this.setState({
      credentials: { ...this.state.credentials, photo: this.state.preview }
    })
  }

  onClose() {
    this.setState({ preview: null })
  }

  onCrop(preview) {
    this.setState({ preview })
  }

  // event to handle profile form submit
  handleSubmit(e) {
    e.preventDefault()
    const { credentials } = this.state
    const { errors } = this.validator

    this.validator.validateAll(credentials).then(success => {
      if (success) {
        this.submit(credentials)
      } else {
        this.setState({ errors })
      }
    })
  }

  submit(credentials) {
    //url regex check
    if (this.state.credentials.website) {
      var userInput = this.state.credentials.website
      var res = userInput.match(
        "^http(s?)://[0-9a-zA-Z]([-.w]*[0-9a-zA-Z])*(:(0-9)*)*(/?)([a-zA-Z0-9-.?,'/\\+&amp;%$#_]*)?$"
      )
      if (res === null) {
        this.setState({
          website_error: "The website field contains http or https."
        })
      } else {
        var res1 = userInput.match(
          /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/
        )

        if (res1 === null) {
          this.setState({
            website_error: "he website field is not a valid URL."
          })
        } else {
          console.log(credentials)
          this.props.profile(credentials)
        }
      }
    } else {
      console.log(credentials)
      this.props.profile(credentials)
    }
  }

  // render component
  render() {
    // check if user is authenticated then redirect him to home page
    let profiledata = {}
    if (Object.keys(this.state.credentials).length !== 0) {
      profiledata = this.state.credentials
    } else {
      profiledata = {}
    }

    const props = {
      profile: profiledata,
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
      previewShow: this.previewShow,
      initialLoad: this.props.initialLoad,
      website_error: this.state.website_error
    }

    return <Form {...props} />
  }
}

export default Page
