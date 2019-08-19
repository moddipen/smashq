import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { connect } from 'react-redux'
import { authLogout } from '../../modules/auth/store/actions'
import { getChatSettingByName } from '../../selectors';
import { updateSelectedModal } from '../../modules/web/store/actions';

class Header extends React.PureComponent {
  static propTypes = {
    text: PropTypes.string.isRequired,
    icon: PropTypes.element,
    styles: PropTypes.object,
    isAuthenticated: PropTypes.bool.isRequired,
    SubHeaderComponent: PropTypes.element,
    logout: PropTypes.func.isRequired
  }

  static defaultProps = {
    SubHeaderComponent: null
  }

  constructor (props) {
    super(props)

    this.state = {
      dropdownOpen: false
    }

    this.toggle = this.toggle.bind(this)
    this.signOut = this.signOut.bind(this)
  }

  componentDidMount() {
    document.addEventListener("keydown", this.keypressFunction, false)
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.keypressFunction, false)
  }

  keypressFunction = (event) => {
    if ((window.navigator.userAgent.indexOf("Mac") != -1)) {
      if(event.metaKey && event.keyCode === 70) {
        if (this.props.fKeySearch == 'TRUE') {
          this.props.updateSelectedModal('CHAT_SEARCH')
          event.preventDefault()
        }
      }
    } else {
      if(event.ctrlKey && event.keyCode === 70) {
        if (this.props.fKeySearch == 'TRUE') {
          this.props.updateSelectedModal('CHAT_SEARCH')
          event.preventDefault()
        }
      }
    }
  }

  signOut () {
    this.props.logout()
  }

  toggle () {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    })
  }

  render () {
    const hasSubHeaderComponent = this.props.SubHeaderComponent !== null
    const headerClasses = classNames(
      'header',
      {
        'has-sub-header': hasSubHeaderComponent
      }
    )
    return (
      <div className={headerClasses}>
        <div className="d-inline-block">
          <h1 style={this.props.styles}>{this.props.icon}{this.props.text}</h1>
          {hasSubHeaderComponent && this.props.SubHeaderComponent}
        </div>
        {this.props.children}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.isAuthenticated,
    fKeySearch: getChatSettingByName(state, 'f_key_search') || 'FALSE'
  }
}

const mapDispatchToProps = dispatch => {
  return {
    logout: () => dispatch(authLogout()),
    updateSelectedModal: (params) => dispatch(updateSelectedModal(params))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)