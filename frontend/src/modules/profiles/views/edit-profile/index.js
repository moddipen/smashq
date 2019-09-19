// import libs
import { connect } from "react-redux";
// import components
import Page from "./Page";
import { updateProfile } from "../../store/actions";
import { getAuthUserDetails } from "../../../../selectors";

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.isAuthenticated,
    initialLoad: state.auth.initialLoad,
    authUser: getAuthUserDetails(state)
  };
};

const mapDispatchToProps = dispatch => {
  return {
    profile: credentials => dispatch(updateProfile(credentials))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Page);
