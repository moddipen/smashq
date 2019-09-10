import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { connect } from "react-redux";
import { authLogout } from "../../modules/auth/store/actions";
import { getChatSettingByName } from "../../selectors";
import { updateSelectedModal } from "../../modules/web/store/actions";
import { NavLink } from "redux-first-router-link";

class Header extends React.PureComponent {
  static propTypes = {
    // text: PropTypes.string.isRequired,
    // icon: PropTypes.element,
    // styles: PropTypes.object,
    // isAuthenticated: PropTypes.bool.isRequired,
    // SubHeaderComponent: PropTypes.element,
    // logout: PropTypes.func.isRequired
  };

  static defaultProps = {
    SubHeaderComponent: null
  };

  constructor(props) {
    super(props);

    this.state = {
      dropdownOpen: false
    };

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

  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }

  render() {
    const hasSubHeaderComponent = this.props.SubHeaderComponent !== null;
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
                <div className="head-search-box">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search"
                  />
                </div>
              </div>
              <div className="head-profile">
                <div className="head-profile-box">
                  <a href="#">
                    <i className="fa fa-user"></i>
                  </a>
                  <div className="head-profile-box-dropdown">
                    <ul>
                      <li>
                        <a href="edit-profile.php">Edit Profile</a>
                      </li>
                      <li>
                        <a href="your-coins.php">
                          Q <span>400</span>
                        </a>
                      </li>
                      <li>
                        <a href="#">Logout</a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
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
    logout: () => dispatch(authLogout()),
    updateSelectedModal: params => dispatch(updateSelectedModal(params))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header);
