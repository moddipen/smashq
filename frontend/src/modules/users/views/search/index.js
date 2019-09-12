// import libs
import { connect } from "react-redux";
// import components
import Page from "./Page";
import { updateProfile } from "../../store/actions";
import { getAuthUserDetails, getSearchUsers } from "../../../../selectors";

const mapStateToProps = state => {
  //console.log(getSearchUsers(state), "fsffdsfff");
  return {
    isAuthenticated: state.auth.isAuthenticated,
    authUser: getAuthUserDetails(state),
    users: getSearchUsers(state)
  };
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Page);
