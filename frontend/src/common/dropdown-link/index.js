import React from 'react'
import PropTypes from 'prop-types'
import Link from 'redux-first-router-link'

class DropdownLink extends React.PureComponent {
  static propTypes = {
    to: PropTypes.string,
    target: PropTypes.string,
    onClick: PropTypes.func
  }
  static defaultProps = {
    to: '#',
    target: null
  }

  constructor (props) {
    super(props)
  }

  render () {
    return (
      <Link to={this.props.to} className='dropdown-item' target={this.props.target}
            onClick={this.props.onClick}>{this.props.children}</Link>
    )
  }
}

export default DropdownLink