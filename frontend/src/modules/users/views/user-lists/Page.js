// import libs
import React from "react"
import { Validator } from "ree-validate"
import Form from "./components/Form"

// initialize component
class Page extends React.Component {
  // set name of the component
  static displayName = "UserListsForm"

  constructor(props) {
    super(props)
    this.validator = new Validator({})
    // set the state of the app
    this.state = {
      modal: false,
      credentials: {},
      followId: 0
    }
    this.toggle = this.toggle.bind(this)
  }

  //follow
  followStatus = (id, status, subOnFollow) => {
    this.setState({ followId: id })
    if (status === "follow") {
      if (subOnFollow === "1" || subOnFollow === 1) {
        this.toggle()
      } else {
        let obj = {
          user_id: id
        }
        this.props.followStatus(obj)
      }
    } else {
      let obj = {
        user_id: id
      }
      this.props.followStatus(obj)
    }
  }

  //modal toggle
  toggle() {
    this.setState(prevState => ({
      modal: !prevState.modal
    }))
  }

  componentWillUnmount() {
    this.setState(prevState => ({
      modal: !prevState.modal
    }))
  }

  // render component
  render() {
    const props = {
      users: this.props.users,
      followStatus: this.followStatus,
      modal: this.state.modal,
      toggle: this.toggle,
      profile: this.state.credentials,

      handleChange: this.handleChange,
      handleSubmit: this.handleSubmit,
      followId: this.state.followId
    }
    return <Form {...props} />
  }
}

export default Page
