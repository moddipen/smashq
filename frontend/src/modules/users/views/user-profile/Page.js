// import libs
import React from "react";
// import components
import Form from "./components/Form";
import "../../../../assets/css/profileModal.css";
import { back } from "redux-first-router";
// initialize component
class Page extends React.Component {
  // set name of the component
  static displayName = "UserProfileForm";
  constructor(props) {
    super(props);

    //    console.log("stet users", this.props.user);

    // set the state of the app
    this.state = {
      tabs: {
        tab1: true,
        tab2: false
      },
      modal: false,
      modal1: false
      // profileUser: this.props.user,
      // metatitle: this.getmetatitle(this.props.user),
      // metadesc: this.getmetadesc(this.props.user)
    };

    this.handleBack = this.handleBack.bind(this);
    this.toggle1 = this.toggle1.bind(this);
    this.toggle = this.toggle.bind(this);
  }

  //get meta title
  getmetatitle(users) {
    let metatitle = "";
    if (users.motto) {
      metatitle = users.username + " | " + users.motto;
    } else {
      metatitle = users.username;
    }
    return metatitle;
  }

  //get meta desc
  getmetadesc(users) {
    let metadesc = "";
    if (users.description) {
      metadesc = users.username + " on SmashQ | " + users.description;
    } else {
      metadesc = users.username + " on SmashQ";
    }
    return metadesc;
  }

  //redirect back
  handleBack = () => {
    back();
  };

  //modal toggle
  toggle() {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  }

  //profil modal toggle
  toggle1() {
    this.setState(prevState => ({
      modal1: !prevState.modal1
    }));
  }

  //show tab
  tabShow = id => {
    let tab = {};
    if (id == 1) {
      tab = {
        tab1: true,
        tab2: false
      };
    } else {
      tab = {
        tab1: false,
        tab2: true
      };
    }
    this.setState({ tabs: tab });
  };

  //follow
  followStatus = id => {
    let status = {
      user_id: id
    };
    this.props.followStatus(status);
  };

  // render component
  render() {
    let profileUser = this.props.user.filter(
      word => word.id === this.props.params.id
    );

    const props = {
      users: profileUser[0],
      tabs: this.state.tabs,
      tabShow: this.tabShow,
      toggle: this.toggle,
      toggle1: this.toggle1,
      modal: this.state.modal,
      modal1: this.state.modal1,
      handleBack: this.handleBack,
      followStatus: this.followStatus,
      metatitle: this.getmetatitle(profileUser[0]),
      metadesc: this.getmetadesc(profileUser[0])
    };
    return <Form {...props} />;
  }
}

export default Page;
