// import libs
import { connect } from "react-redux"
// import components
import Page from "./Page"
import { followStatus } from "../../store/actions"
import { getAuthUserDetails } from "../../../../selectors"

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.isAuthenticated,
    authUser: getAuthUserDetails(state)
  }
}

const mapDispatchToProps = dispatch => {
  return { followStatus: credentials => dispatch(followStatus(credentials)) }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Page)
