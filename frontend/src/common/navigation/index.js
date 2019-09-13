// import libs
import React from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import classNames from "classnames";
// import components
import pages from "../../routes/pages";
import { getIsAuthenticated } from "../../selectors/index";
import { NavLink } from "redux-first-router-link";
import { getMenu } from "../../selectors/index";
import Modules from "./components/Modules";

class Navigation extends React.Component {
  static propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    selectedMenu: PropTypes.object.isRequired
  };
  menuRef = React.createRef();
  popoverRef = React.createRef();

  constructor(props) {
    super(props);

    this.state = {
      showMenu: false
    };
  }

  componentDidMount() {
    document.addEventListener("click", this.checkToggle);
  }

  componentWillUnmount() {
    document.removeEventListener("click", this.checkToggle);
  }

  getSelectedMenuIcon(selectedMenu) {
    let icon = "icons-dashboard";
    if (selectedMenu) {
      pages.map(page => {
        if (page.id === selectedMenu.name) {
          icon = page.icon;
        }
      });
    }
    return icon;
  }

  checkToggle = e => {
    if (
      this.state.showMenu &&
      !this.popoverRef.current.contains(e.target) &&
      !this.menuRef.current.contains(e.target)
    ) {
      this.setState({
        showMenu: false
      });
    }
  };

  toggleMenu = e => {
    this.setState({
      showMenu: !this.state.showMenu
    });
    if (e) {
      e.stopPropagation();
    }
  };

  getPopover = () => {
    const classes = classNames("menu-popover");
    const output = (
      <div className={classes} ref={this.popoverRef}>
        <ul className="menu">
          {pages.map(page => (
            <li>
              <NavLink exact to={page.path} onClick={this.toggleMenu}>
                <i className={page.icon} />
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    );
    return ReactDOM.createPortal(output, document.body);
  };

  render() {
    if (!this.props.isAuthenticated) {
      return null;
    }

    const classes = classNames("content-menu");
    return (
      <div className={classes}>
        <ul className="menu">
          <li ref={this.menuRef}>
            <a href="#" onClick={this.toggleMenu}>
              <i
                className={this.getSelectedMenuIcon(this.props.selectedMenu)}
              />
            </a>
            {this.state.showMenu && this.getPopover()}
          </li>
        </ul>
        <Modules selectedMenu={this.props.selectedMenu} />
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    isAuthenticated: getIsAuthenticated(state),
    selectedMenu: getMenu(state)
  };
};

export default connect(mapStateToProps)(Navigation);
