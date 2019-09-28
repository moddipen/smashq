// import libs
import React from "react"
import PropTypes from "prop-types"
import { Validator } from "ree-validate"
// import components
import Form from "./components/Form"
import { buildFailureTestResult } from "@jest/test-result"

// initialize component
class Page extends React.Component {
  // set name of the component
  static displayName = "SocialMediaPage"

  // validate props
  static propTypes = {}

  constructor(props) {
    super(props)
    this.validator = new Validator({
      facebook: "url",
      instagram: "url",
      snapchat: "url",
      twitter: "url",
      youtube: "url",
      amazon: "url"
    })
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
      errors: this.validator.errors,
      facebook_error: "",
      instagram_error: "",
      snapchat_error: "",
      twitter_error: "",
      youtube_error: "",
      amazon_error: ""
    }

    this.avoidSpace = this.avoidSpace.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
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

    if (name === "facebook") {
      this.setState({ facebook_error: "" })
    }
    if (name === "instagram") {
      this.setState({ instagram_error: "" })
    }
    if (name === "snapchat") {
      this.setState({ snapchat_error: "" })
    }
    if (name === "twitter") {
      this.setState({ twitter_error: "" })
    }
    if (name === "youtube") {
      this.setState({ youtube_error: "" })
    }
    if (name === "amazon") {
      this.setState({ amazon_error: "" })
    }
    this.validator.validate(name, value).then(() => {
      this.setState({ errors })
    })
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
    if (this.state.credentials.facebook) {
      var userInput = this.state.credentials.facebook
      var res = userInput.match(
        "^http(s?)://[0-9a-zA-Z]([-.w]*[0-9a-zA-Z])*(:(0-9)*)*(/?)([a-zA-Z0-9-.?,'/\\+&amp;%$#_]*)?$"
      )
      if (res === null) {
        this.setState({
          facebook_error: "The facebook field contains http or https."
        })
        return false
      }
    }

    if (this.state.credentials.instagram) {
      var userInput = this.state.credentials.instagram
      var res = userInput.match(
        "^http(s?)://[0-9a-zA-Z]([-.w]*[0-9a-zA-Z])*(:(0-9)*)*(/?)([a-zA-Z0-9-.?,'/\\+&amp;%$#_]*)?$"
      )
      if (res === null) {
        this.setState({
          instagram_error: "The instagram field contains http or https."
        })
        return false
      }
    }

    if (this.state.credentials.snapchat) {
      var userInput = this.state.credentials.snapchat
      var res = userInput.match(
        "^http(s?)://[0-9a-zA-Z]([-.w]*[0-9a-zA-Z])*(:(0-9)*)*(/?)([a-zA-Z0-9-.?,'/\\+&amp;%$#_]*)?$"
      )
      if (res === null) {
        this.setState({
          snapchat_error: "The snapchat field contains http or https."
        })
        return false
      }
    }

    if (this.state.credentials.twitter) {
      var userInput = this.state.credentials.twitter
      var res = userInput.match(
        "^http(s?)://[0-9a-zA-Z]([-.w]*[0-9a-zA-Z])*(:(0-9)*)*(/?)([a-zA-Z0-9-.?,'/\\+&amp;%$#_]*)?$"
      )
      if (res === null) {
        this.setState({
          twitter_error: "The twitter field contains http or https."
        })
        return false
      }
    }

    if (this.state.credentials.youtube) {
      var userInput = this.state.credentials.youtube
      var res = userInput.match(
        "^http(s?)://[0-9a-zA-Z]([-.w]*[0-9a-zA-Z])*(:(0-9)*)*(/?)([a-zA-Z0-9-.?,'/\\+&amp;%$#_]*)?$"
      )
      if (res === null) {
        this.setState({
          youtube_error: "The youtube field contains http or https."
        })
        return false
      }
    }

    if (this.state.credentials.amazon) {
      var userInput = this.state.credentials.amazon
      var res = userInput.match(
        "^http(s?)://[0-9a-zA-Z]([-.w]*[0-9a-zA-Z])*(:(0-9)*)*(/?)([a-zA-Z0-9-.?,'/\\+&amp;%$#_]*)?$"
      )
      if (res === null) {
        this.setState({
          amazon_error: "The amazon field contains http or https."
        })
        return false
      }
    }
    this.props.profile(credentials)
  }

  // render component
  render() {
    // check if user is authenticated then redirect him to home page
    const props = {
      profile: this.state.credentials,
      authUser: this.state.authUser,
      errors: this.state.errors,
      handleChange: this.handleChange,
      handleSubmit: this.handleSubmit,
      avoidSpace: this.avoidSpace,
      initialLoad: this.props.initialLoad,
      facebook_error: this.state.facebook_error,
      instagram_error: this.state.instagram_error,
      snapchat_error: this.state.snapchat_error,
      twitter_error: this.state.twitter_error,
      youtube_error: this.state.youtube_error,
      amazon_error: this.state.amazon_error
    }

    return <Form {...props} />
  }
}

export default Page
