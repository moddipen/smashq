import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { connect } from "react-redux";
import { NavLink } from "redux-first-router-link";
import { authLogout } from "../../modules/auth/store/actions";
import { getChatSettingByName } from "../../selectors";
import { updateSelectedModal } from "../../modules/web/store/actions";
import SearchComponent from "../../modules/users/views/search/index";

import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle
} from "reactstrap";

import DropdownLink from "../dropdown-link/index";
import { initialSearch, searchUser } from "../../modules/users/store/actions";

class Header extends React.PureComponent {
  static propTypes = {};

  static defaultProps = {
    SubHeaderComponent: null
  };

  constructor(props) {
    super(props);
    this.timeout = null;
    this.state = {
      search: "",
      expanded: false,
      dropDownOpen: false,
      showSearch: false
    };

    this.hideSearchEvent = this.hideSearchEvent.bind(this);
    this.showSearchEvent = this.showSearchEvent.bind(this);
    this.toggle = this.toggle.bind(this);
    this.signOut = this.signOut.bind(this);
  }

  componentDidMount() {
    document.addEventListener("keydown", this.keypressFunction, false);
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.keypressFunction, false);
  }

  keypressFunction = event => {
    if (window.navigator.userAgent.indexOf("Mac") != -1) {
      if (event.metaKey && event.keyCode === 70) {
        if (this.props.fKeySearch == "TRUE") {
          this.props.updateSelectedModal("CHAT_SEARCH");
          event.preventDefault();
        }
      }
    } else {
      if (event.ctrlKey && event.keyCode === 70) {
        if (this.props.fKeySearch == "TRUE") {
          this.props.updateSelectedModal("CHAT_SEARCH");
          event.preventDefault();
        }
      }
    }
  };

  signOut() {
    this.props.logout();
  }

  hideSearchEvent() {
    this.setState({ showSearch: false });
  }

  handleChange = e => {
    this.setState({
      search: e.target.value
    });
    if (this.props.isAuthenticated) {
      if (this.timeout) {
        clearTimeout(this.timeout);
      }
      this.timeout = setTimeout(() => {
        this.timeout = null;
        if (this.state.search != "") {
          this.props.searchUser({
            search: this.state.search
          });
          this.props.searchUser({ search: this.state.search });
        } else {
          this.props.initialSearch();
        }
      }, 1000);
    }
  };

  showSearchEvent() {
    if (this.props.isAuthenticated) {
      this.setState({ showSearch: true });
      if (this.state.search == "") {
        this.props.initialSearch();
      }
    }
  }

  toggle = () => {
    this.setState({
      dropDownOpen: !this.state.dropDownOpen
    });
  };

  render() {
    const hasSubHeaderComponent = this.props.SubHeaderComponent !== null;
    const access_token = localStorage.getItem("access_token");
    const headerClasses = classNames("header", {
      "has-sub-header": hasSubHeaderComponent
    });
    return (
      <header>
        <div className="header-inner">
          <div className="container d-flex align-items-center">
            <div className="logo">
              <NavLink to={`/`}>
                <img src="/img/logo.png" alt="" />
              </NavLink>
            </div>

            <div className="head-right d-flex align-items-center">
              <div className="head-search-section">
                <div
                  className={
                    "head-search-box " +
                    (this.state.showSearch ? "focusactive" : "")
                  }
                >
                  <input
                    type="text"
                    value={this.state.search}
                    onChange={this.handleChange}
                    className="form-control"
                    placeholder="Search"
                    onClick={this.showSearchEvent}
                    onBlur={this.hideSearchEvent}
                  />
                  <SearchComponent />
                </div>
              </div>

              {access_token !== null ? (
                <Dropdown
                  className="dropdown profile-dropdown"
                  isOpen={this.state.dropDownOpen}
                  toggle={this.toggle}
                >
                  {" "}
                  <DropdownToggle>
                    <i className="fa fa-user"></i>{" "}
                  </DropdownToggle>
                  <DropdownMenu right>
                    <DropdownLink to={"/edit-profile"}>
                      Edit Profile
                    </DropdownLink>
                    <DropdownItem divider />{" "}
                    <DropdownItem>
                      {" "}
                      Q <span>400</span>{" "}
                    </DropdownItem>
                    <DropdownItem divider />
                    <DropdownItem onClick={this.props.logout}>
                      Logout{" "}
                    </DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              ) : null}
            </div>
          </div>
        </div>
      </header>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.isAuthenticated,
    fKeySearch: getChatSettingByName(state, "f_key_search") || "FALSE"
  };
};

const mapDispatchToProps = dispatch => {
  return {
    initialSearch: () => dispatch(initialSearch()),
    searchUser: data => dispatch(searchUser(data)),
    logout: () => dispatch(authLogout()),
    updateSelectedModal: params => dispatch(updateSelectedModal(params))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header);
