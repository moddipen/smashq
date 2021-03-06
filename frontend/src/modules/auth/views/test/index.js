// import libs
import { connect } from "react-redux";
// import components
import Page from "./Page";
import { authLogin, authRegister, getCar } from "../../store/actions";

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.isAuthenticated
  };
};

const mapDispatchToProps = dispatch => {
  return {
    login: credentials => dispatch(authLogin(credentials)),
    register: credentials => dispatch(authRegister(credentials))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Page);
