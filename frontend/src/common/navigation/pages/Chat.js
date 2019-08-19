import React from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'redux-first-router-link'
import { Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from 'reactstrap'
import { updateSelectedModal } from '../../../modules/web/store/actions'

class Chat extends React.PureComponent {
  constructor (props) {
    super(props)
    this.state = {
      dropDownOpen: false
    }
  }

  toggle = () => {
    this.setState({
      dropDownOpen: !this.state.dropDownOpen
    })
  }

  render () {
    return (
      <React.Fragment>
        <li><NavLink to={'/chat'} activeClassName="selected" exact={false}><i className={'icons-chat'}/></NavLink>
        </li>
        <li><NavLink to={'/calls'} activeClassName="selected" exact={false}><i className={'icons-phone'}/></NavLink>
        </li>
        <li>
          <Dropdown className="" isOpen={this.state.dropDownOpen} toggle={this.toggle}>
            <DropdownToggle tag={'a'}>
              <i className={'icons-progress preference-button'}/>
            </DropdownToggle>
            <DropdownMenu left>
              <DropdownItem onClick={() => this.props.openPreferences('CHAT_SETTINGS_MODAL')}>Communication preferences</DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </li>
      </React.Fragment>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    openPreferences: params => dispatch(updateSelectedModal(params))
  }
}

export default connect(null, mapDispatchToProps)(Chat)