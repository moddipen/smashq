// import libs
import React from "react";
// import components
import Form from "./components/Form";

// initialize component
class Page extends React.Component {
  // set name of the component
  static displayName = "UserListsForm";

  constructor(props) {
    super(props);
    // set the state of the app
    this.state = {};
  }

  //follow
  followStatus = id => {
    let status = {
      user_id: id
    };
    this.props.followStatus(status);
  };

  // render component
  render() {
    console.log("users", this.props.users);
    // check if user is authenticated then redirect him to home page
    const props = {
      users: this.props.users,
      followStatus: this.followStatus
    };
    return <Form {...props} />;
  }
}

export default Page;
