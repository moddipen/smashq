import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { connect } from "react-redux";
import { authLogout } from "../../modules/auth/store/actions";
import { getChatSettingByName } from "../../selectors";
import { updateSelectedModal } from "../../modules/web/store/actions";

class Footer extends React.PureComponent {
  render() {
    return (
      <footer>
        <div className="footer-inner">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-md-4 col-12 text-center text-md-left order-md-1 order-2">
                <div className="fcopy">© 2019 SmashQ</div>
              </div>
              <div className="col-md-8 col-12 text-center text-md-right order-md-2 order-1">
                <ul className="f-nav-link">
                  <li>
                    <a href="#">Terms & Conditions</a>
                  </li>
                  <li>
                    <a href="#">Privacy Polices</a>
                  </li>
                  <li>
                    <a href="#">Support</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </footer>
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
)(Footer);
