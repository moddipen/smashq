// import libs
import { connect } from "react-redux"
// import components
import Page from "./Page"
import { authresendLink } from "../../store/actions"

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.isAuthenticated
  }
}

const mapDispatchToProps = dispatch => {
  return {
    resendLink: credentials => dispatch(authresendLink(credentials))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Page)
