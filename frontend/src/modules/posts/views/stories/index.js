// import libs
import { connect } from "react-redux"
// import components
import Page from "./Page"
import { getAuthUserDetails, getAuthUserPosts } from "../../../../selectors"

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.isAuthenticated,
    initialLoad: state.auth.initialLoad,
    authUser: getAuthUserDetails(state),
    posts: getAuthUserPosts(state)
  }
}

const mapDispatchToProps = dispatch => {
  return {}
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Page)
