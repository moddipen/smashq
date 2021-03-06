// import libs
import { connect } from "react-redux"
// import components
import Page from "./Page"
import { getAuthUserDetails, getUserPosts } from "../../../../selectors"
import { likePost, likeUsers } from "../../store/actions"

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.isAuthenticated,
    initialLoad: state.auth.initialLoad,
    authUser: getAuthUserDetails(state),
    posts: getUserPosts(state)
  }
}

const mapDispatchToProps = dispatch => {
  return {
    likePost: credentials => dispatch(likePost(credentials)),
    likeUsers: credentials => dispatch(likeUsers(credentials))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Page)
