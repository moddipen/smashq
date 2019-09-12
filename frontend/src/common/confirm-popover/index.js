import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { Button, Popover, PopoverBody } from 'reactstrap'

class ConfirmPopover extends React.PureComponent {
  static propTypes = {
    title: PropTypes.string.isRequired,
    message: PropTypes.string,
    cancelText: PropTypes.string,
    confirmText: PropTypes.string,
    placement: PropTypes.string,
    options: PropTypes.array,
    onSuccess: PropTypes.func,
    isOpen: PropTypes.bool,
    target: PropTypes.any.isRequired,
    params: PropTypes.oneOfType([PropTypes.object, PropTypes.string, PropTypes.number]),
    toggle: PropTypes.func,
    FooterButtons: PropTypes.node,
    className: PropTypes.string,
    onOpen: PropTypes.func,
    onClose: PropTypes.func
  }

  static defaultProps = {
    placement: 'top',
    options: [],
    cancelText: 'Cancel',
    confirmText: 'Confirm',
    isOpen: false,
    FooterButtons: null,
    className: ''
  }

  constructor (props) {
    super(props)

    this.state = {
      isOpen: props.isOpen,
      target: null
    }

    this.toggle = this.toggle.bind(this)
    this.confirm = this.confirm.bind(this)
  }

  componentDidUpdate (prevProps) {
    if (prevProps.isOpen !== this.props.isOpen && this.props.isOpen !== this.state.isOpen) {
      const isOpen = this.props.isOpen
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
  }

  toggle (e) {
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
    if (this.props.toggle) {
      this.props.toggle(e)
    }
  }

  confirm (e) {
    if (this.props.onSuccess) {
      this.props.onSuccess(this.props.params)
    }
    this.toggle()
  }

  render () {
    return (
      <React.Fragment>
        {this.state.isOpen && this.props.target &&
        <Popover target={() => this.props.target} isOpen={this.state.isOpen} placement={this.props.placement}
                 toggle={this.toggle} className={classNames('confirm-popover', this.props.className)}>
          <PopoverBody>
            <h5>{this.props.title}</h5>
            {this.props.message !== '' &&
            <div>{this.props.message}</div>
            }
          </PopoverBody>
          <div className="popover-footer">
            {!!this.props.FooterButtons ? <this.props.FooterButtons toggle={this.toggle} confirm={this.confirm}/> :
              <React.Fragment>
                <Button color="default" onClick={this.toggle}>{this.props.cancelText}</Button>{' '}
                <Button color="primary" onClick={this.confirm}>{this.props.confirmText}</Button>
              </React.Fragment>
            }
          </div>
        </Popover>
        }
      </React.Fragment>
    )
  }
}

export default ConfirmPopover