// import libs
import { connect } from "react-redux";
// import components
import Page from "./Page";
import { updateCoins } from "../../store/actions";
import { getAuthUserCoins } from "../../../../selectors";

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.isAuthenticated,
    coins: getAuthUserCoins(state)
  };
};

const mapDispatchToProps = dispatch => {
  return {
    profile: credentials => dispatch(updateCoins(credentials))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Page);
