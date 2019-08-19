import React from 'react'
import PropTypes from 'prop-types'
import ConfirmPopover from '../confirm-popover'

class ConfirmDropdownItem extends React.PureComponent {
  static propTypes = {
    title: PropTypes.string.isRequired,
    message: PropTypes.string,
    cancelText: PropTypes.string,
    confirmText: PropTypes.string,
    placement: PropTypes.string,
    options: PropTypes.array,
    onSuccess: PropTypes.func,
    params: PropTypes.oneOfType([PropTypes.object, PropTypes.string, PropTypes.number])
  }

  static defaultProps = {
    placement: 'top',
    options: [],
    cancelText: 'Cancel',
    confirmText: 'Confirm'
  }
  element = React.createRef()

  constructor (props) {
    super(props)

    this.state = {
      isOpen: false
    }
  }

  componentDidUpdate (prevProps) {
    if (prevProps.isOpen !== this.props.isOpen && this.props.isOpen !== this.state.isOpen) {
      this.setState({
        isOpen: this.props.isOpen
      })
    }
  }

  toggle = e => {
    if (e) {
      e.preventDefault()
      e.stopPropagation()
    }
    this.setState({
      isOpen: !this.state.isOpen
    })
  }

  render () {
    return (
      <React.Fragment>
        <button type="button" className="dropdown-item" ref={this.element}
                onClick={this.toggle}>{this.props.children && this.props.children}
        </button>
        {!!this.state.isOpen &&
        <ConfirmPopover {...this.props} {...this.state} target={this.element.current} toggle={this.toggle}/>
        }
      </React.Fragment>
    )
  }
}

export default ConfirmDropdownItem