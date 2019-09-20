// import libs
import React from "react";
// import components
import Form from "./components/Form";

// initialize component
class Page extends React.Component {
  // set name of the component
  static displayName = "SearchForm";

  constructor(props) {
    super(props);
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
    const items = this.props.users.slice(0, 7).map(i => {
      return i;
    });

    console.log("items", items);
    // check if user is authenticated then redirect him to home page
    const props = {
      users: items,
      followStatus: this.followStatus
    };
    return <Form {...props} />;
  }
}

export default Page;
