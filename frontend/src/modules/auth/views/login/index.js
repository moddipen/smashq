// import libs
import { connect } from 'react-redux'
// import components
import Page from './Page'
import { authLogin } from '../../store/actions'

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.isAuthenticated,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    login: credentials => dispatch(authLogin(credentials))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Page)