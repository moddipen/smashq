import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getIsAuthenticated, getMenu } from '../../selectors/index'
import Chat from './components/Chat'

class ChatNavigation extends React.Component {
  static propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    selectedMenu: PropTypes.object.isRequired
  }

  constructor (props) {
    super(props)
  }

  render () {
    if (!this.props.isAuthenticated) {
      return null
    }
    if (this.props.selectedMenu.name !== 'chat') {
      return null
    }
    let element = null
    if (this.props.selectedMenu.params && this.props.selectedMenu.params.selected && this.props.selectedMenu.params.selected === 'calls') {

    } else {
      element = <Chat/>
    }
    return (
      <div className={'content-chat-menu'}>
        {element}
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    isAuthenticated: getIsAuthenticated(state),
    selectedMenu: getMenu(state)
  }
}

export default connect(mapStateToProps)(ChatNavigation)