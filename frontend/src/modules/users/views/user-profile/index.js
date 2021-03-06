// import libs
import { connect } from "react-redux"
// import components
import Page from "./Page"
import { getAuthUserDetails, getSearchUsers } from "../../../../selectors"
import { followStatus, uploadPosts } from "../../store/actions"

const mapStateToProps = state => {
  let id = state.location.payload.id

  return {
    isAuthenticated: state.auth.isAuthenticated,
    authUser: getAuthUserDetails(state),
    user: getSearchUsers(state, id)
  }
}

const mapDispatchToProps = dispatch => {
  return {
    followStatus: credentials => dispatch(followStatus(credentials)),
    uploadPosts: posts => dispatch(uploadPosts(posts))
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Page)
