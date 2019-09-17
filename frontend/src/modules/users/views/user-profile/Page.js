// import libs
import React from "react";
// import components
import Form from "./components/Form";
import "../../../../assets/css/profileModal.css";
import { withRouter } from "react-router-dom";

// initialize component
class Page extends React.Component {
  // set name of the component
  static displayName = "UserProfileForm";

  // validate props

  constructor(props) {
    super(props);
    // set the state of the app
    this.state = {
      tabs: {
        tab1: true,
        tab2: false
      },
      modal: false,
      modal1: false
    };

    this.handleBack = this.handleBack.bind(this);
    this.toggle1 = this.toggle1.bind(this);
    this.toggle = this.toggle.bind(this);
  }

  // componentDidMount() {
  //   console.log("id", this.props.params.id);
  // }

  handleBack = () => {
    this.props.history.goBack();
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

  // render component
  render() {
    let profileUser = this.props.users.filter(
      word => word.id === this.props.params.id
    );
    console.log("profile", profileUser[0]);
    const props = {
      users: profileUser[0],
      tabs: this.state.tabs,
      tabShow: this.tabShow,
      toggle: this.toggle,
      toggle1: this.toggle1,
      modal: this.state.modal,
      modal1: this.state.modal1,
      handleBack: this.handleBack
    };
    return <Form {...props} />;
  }
}

export default Page;
