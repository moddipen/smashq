// import libs
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
// import components
import { getQuickBar } from '../../selectors/index'
import { Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from 'reactstrap'
import DropdownLink from '../dropdown-link/index'
import { authLogout } from '../../modules/auth/store/actions'

class QuickBar extends Component {
  static propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    quickBar: PropTypes.object,
    logout: PropTypes.func.isRequired
  }

  constructor (props) {
    super(props)

    this.state = {
      expanded: false,
      dropDownOpen: false
    }
  }

  toggle = () => {
    this.setState({
      dropDownOpen: !this.state.dropDownOpen
    })
  }

  render () {
    if (!this.props.isAuthenticated) {
      return null
    }
    return (
      <div className="content-quick">
        <ul>
          <li className="profile">
            <Dropdown className="dropdown profile-dropdown" isOpen={this.state.dropDownOpen} toggle={this.toggle}>
              <DropdownToggle>
                <div className="user-avatar"><span>TU</span></div>
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownLink to={'/my-account'}>My Account</DropdownLink>
                <DropdownItem>+Connect a Profile</DropdownItem>
                <DropdownItem>+Invite Users</DropdownItem>
                <DropdownItem divider/>
                <DropdownItem>Report An Issue</DropdownItem>
                <DropdownItem>Support</DropdownItem>
                <DropdownItem divider/>
                <DropdownItem onClick={this.props.logout}>Sign Out</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </li>
          <li title="Chat"><a><i className="icons-chat"/></a></li>
          <li title="To Do"><a><i className="icons-progress"/></a></li>
          <li title="Inbox"><a><i className="icons-inbox"/></a></li>
          <li title="Attachments"><a><i className="icons-paperclip"/></a></li>
          <li title="Notifications"><a><i className="icons-bell"/></a></li>
          <li title="Calendar"><a><i className="icons-calendar"/></a></li>
        </ul>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.isAuthenticated,
    quickBar: getQuickBar(state)
  }
}

const mapDispatchToProps = dispatch => {
  return {
    logout: () => dispatch(authLogout())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(QuickBar)
