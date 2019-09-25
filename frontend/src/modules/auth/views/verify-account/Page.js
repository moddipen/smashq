// import libs
import React from "react"
import PropTypes from "prop-types"
import { Validator } from "ree-validate"
// import components
import Form from "./components/Form"

// initialize component
class Page extends React.Component {
  // set name of the component
  static displayName = "VerifyAccountPage"

  // validate props
  static propTypes = {
    isAuthenticated: PropTypes.bool.isRequired
  }

  constructor(props) {
    super(props)
    // set the state of the app
    this.state = {
      credentials: {
        username: localStorage.getItem("username")
      }
    }
    // bind component with event handlers
    this.resendLink = this.resendLink.bind(this)
  }

  resendLink() {
    let obj = {
      username: this.state.credentials.username
    }
    this.props.resendLink(obj)
  }
  // render component
  render() {
    // check if user is authenticated then redirect him to home page
    const props = {
      resendLink: this.resendLink
    }
    return <Form {...props} />
  }
}

export default Page
