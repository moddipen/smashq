// import libs
import { connect } from "react-redux";
// import components
import Page from "./Page";
import { getAuthUserDetails, getSearchUsers } from "../../../../selectors";
import { followStatus } from "../../store/actions";
const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.isAuthenticated,
    authUser: getAuthUserDetails(state),
    users: getSearchUsers(state)
  };
};

const mapDispatchToProps = dispatch => {
  return { followStatus: credentials => dispatch(followStatus(credentials)) };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Page);
