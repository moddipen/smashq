// import libs
import { connect } from "react-redux";
// import components
import Page from "./Page";
import { authVerifyCode, authResendEmail } from "../../store/actions";

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.isAuthenticated
  };
};

const mapDispatchToProps = dispatch => {
  return {
    verifyCode: credentials => dispatch(authVerifyCode(credentials)),
    resendEmailSuccess: data => dispatch(authResendEmail(data))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Page);
