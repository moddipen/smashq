// import libs
import { connect } from "react-redux";
// import components
import Page from "./Page";
import { authResetPassword } from "../../store/actions";

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.isAuthenticated
  };
};

const mapDispatchToProps = dispatch => {
  return {
    resetPassword: credentials => dispatch(authResetPassword(credentials))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Page);
