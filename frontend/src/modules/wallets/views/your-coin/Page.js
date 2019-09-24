// import libs
import React from "react"
import { Validator } from "ree-validate"
// import components
import Form from "./components/Form"

// initialize component
class Page extends React.PureComponent {
  // set name of the component
  static displayName = "YourCoinPage"

  constructor(props) {
    super(props)
    this.validator = new Validator({
      coins: "required|numeric"
    })
    // set the state of the app
    this.state = {
      credentials: {
        coins: ""
      },
      modal: false,
      errors: this.validator.errors
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.toggle = this.toggle.bind(this)
  }

  // event to handle login input change
  handleChange(name, value) {
    const { errors } = this.validator
    this.setState({
      credentials: { ...this.state.credentials, [name]: value }
    })
    errors.remove(name)
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

  // event to handle profile form submit
  handleSubmit(e) {
    e.preventDefault()
    const { credentials } = this.state
    const { errors } = this.validator

    this.validator.validateAll(credentials).then(success => {
      if (success) {
        this.submit(credentials)
      } else {
        console.log(errors)
        this.setState({ errors })
      }
    })
  }

  submit(credentials) {
    this.toggle()
  }

  // render component
  render() {
    // check if user is authenticated then redirect him to home page
    const props = {
      authUser: this.props.authUser,
      errors: this.state.errors,
      handleChange: this.handleChange,
      handleSubmit: this.handleSubmit,
      profile: this.state.credentials,
      modal: this.state.modal,
      toggle: this.toggle,
      coins: this.state.credentials.coins
    }

    return <Form {...props} />
  }
}

export default Page
