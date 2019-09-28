// import libs
import React from "react"
import PropTypes from "prop-types"
import { Validator } from "ree-validate"
// import components
import Form from "./components/Form"
import { is } from "redux-saga/utils"

// initialize component
class Page extends React.Component {
  // set name of the component
  static displayName = "SettingsPage"

  // validate props
  static propTypes = {}

  constructor(props) {
    super(props)
    this.validator = new Validator({
      sub_on_follow: "",
      amount: ""
    })

    // set the state of the app
    let isChecked = false
    let showInput = false
    if (this.props.authUser.subOnFollow) {
      if (
        this.props.authUser.subOnFollow === "1" ||
        this.props.authUser.subOnFollow === 1
      ) {
        isChecked = true
        showInput = true
      }
    }

    this.state = {
      credentials: {
        sub_on_follow: this.props.authUser.subOnFollow,
        amount: this.props.authUser.subamount
      },
      showInput: showInput,
      errors: this.validator.errors,
      amount_error: "",
      isChecked: isChecked
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  // event to handle login input change
  handleChange(name, value) {
    if (name === "sub_on_follow") {
      this.setState({
        showInput: !this.state.showInput
      })

      this.setState({ isChecked: !this.state.isChecked })
    }
    this.setState({
      credentials: { ...this.state.credentials, [name]: value }
    })

    if (!this.state.showInput) {
      this.setState({
        credentials: {
          ...this.state.credentials,
          ["amount"]: ""
        }
      })
    }
    this.setState({ amount_error: "" })
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
    if (this.state.showInput) {
      if (
        this.state.credentials.amount === "" ||
        this.state.credentials.amount === undefined
      ) {
        this.setState({
          amount_error: "The amount field is required."
        })
      } else if (
        this.state.credentials.amount === "0" ||
        this.state.credentials.amount === 0
      ) {
        this.setState({
          amount_error: "The amount should be greater than zero."
        })
      } else {
        let amount = 0
        let sub_on_follow = 0
        if (this.state.isChecked) {
          amount = this.state.credentials.amount
          sub_on_follow = 1
        }
        let obj = {
          sub_on_follow: sub_on_follow,
          amount: amount
        }
        this.props.setting(obj)
      }
    } else {
      let amount = 0
      let sub_on_follow = 0
      if (this.state.isChecked) {
        amount = this.state.credentials.amount
        sub_on_follow = 1
      }
      let obj = {
        sub_on_follow: sub_on_follow,
        amount: amount
      }
      this.props.setting(obj)
    }
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
      initialLoad: this.props.initialLoad,
      showInput: this.state.showInput,
      amount_error: this.state.amount_error,
      isChecked: this.state.isChecked
    }

    return <Form {...props} />
  }
}

export default Page
