import React from 'react'
import PropTypes from 'prop-types'
import ConfirmPopover from '../confirm-popover'

class Confirm extends React.PureComponent {
  static propTypes = {
    title: PropTypes.string.isRequired,
    message: PropTypes.string,
    cancelText: PropTypes.string,
    confirmText: PropTypes.string,
    placement: PropTypes.string,
    options: PropTypes.array,
    onSuccess: PropTypes.func,
    isOpen: PropTypes.bool,
    params: PropTypes.oneOfType([PropTypes.object, PropTypes.string, PropTypes.number]),
    FooterButtons: PropTypes.node,
    onOpen: PropTypes.func,
    onClose: PropTypes.func
  }

  static defaultProps = {
    placement: 'top',
    options: [],
    cancelText: 'Cancel',
    confirmText: 'Confirm',
    isOpen: false,
    FooterButtons: null
  }
  element = React.createRef()

  constructor (props) {
    super(props)

    this.state = {
      isOpen: props.isOpen
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
    const isOpen = !this.state.isOpen
    this.setState({
      isOpen: isOpen
    })
    if (isOpen) {
      if (this.props.onOpen) {
        this.props.onOpen()
      }
    } else {
      if (this.props.onClose) {
        this.props.onClose()
      }
    }
  }

  render () {
    return (
      <React.Fragment>
        <div onClick={this.toggle} ref={this.element} className="d-inline-block">
          {this.props.children}
        </div>
        {!!this.state.isOpen &&
        <ConfirmPopover {...this.props} {...this.state} target={this.element.current} toggle={this.toggle}/>
        }
      </React.Fragment>
    )
  }
}

export default Confirm