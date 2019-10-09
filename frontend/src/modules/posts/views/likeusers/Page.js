// import libs
import React from "react"
// import components
import Form from "./components/Form"
// initialize component
class Page extends React.Component {
  // set name of the component
  static displayName = "SearchForm"
  constructor(props) {
    super(props)
    this.state = {
      searchmodal: false,
      credentials: {},
      followId: 0
    }
    this.searchtoggle = this.searchtoggle.bind(this)
  }

  componentWillUnmount() {
    this.searchtoggle()
  }

  //follow
  followStatus = (id, status, subOnFollow) => {
    this.setState({ followId: id })
    if (status === "follow") {
      if (subOnFollow === "1" || subOnFollow === 1) {
        this.searchtoggle()
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
  searchtoggle() {
    this.setState(prevState => ({
      searchmodal: !prevState.searchmodal
    }))
  }

  // render component
  render() {
    console.log("users", this.props.users)
    // check if user is authenticated then redirect him to home page
    const props = {
      users: this.props.users,
      followStatus: this.followStatus,
      searchmodal: this.state.searchmodal,
      searchtoggle: this.searchtoggle,
      followId: this.state.followId
    }
    return <Form {...props} />
  }
}
export default Page
