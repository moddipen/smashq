// import libs
import { connect } from "react-redux";
// import components
import Page from "./Page";
import { authForgotPassword } from "../../store/actions";

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.isAuthenticated
  };
};

const mapDispatchToProps = dispatch => {
  return {
    forgotPassword: credentials => dispatch(authForgotPassword(credentials))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Page);
