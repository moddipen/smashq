import React from 'react'
import PropTypes from 'prop-types'
import { FormFeedback, FormGroup, } from 'reactstrap'
import Datetime from 'react-datetime'

export default class DatetimeEditable extends React.PureComponent {
  static propTypes = {
    setValueToAnchor: PropTypes.func.isRequired
  }

  static defaultProps = {
    placeholder: 'Enter text'
  }

  constructor (props) {
    super(props)
    this.state = {
      value: props.value
    }
  }

  componentDidMount () {
    if (this.ref) {
      this.ref.value = ''
      this.ref.value = this.state.value
    }
  }

  componentWillReceiveProps (nextProps) {
    // if (this.state.value != nextProps.value) {
    //     this.setState({
    //         value: nextProps.value
    //     });
    // }
  }

  getValue = () => {
    return this.state.value
  }

  setValue = (value, e) => {
    // const option = _.find(this.state.options, (option) => {
    //     return option.value == e.target.value;
    // });
    this.setState({value: value})
    if (value === '') {
      this.props.setValueToAnchor(undefined, e)
      return
    }
    this.props.setValueToAnchor(value, e)
  }

  onBlur (e) {
    if (!this.props.showButtons) {
      this.setValue(e)
      this.props.onSubmit()
    }
  }

  handleKeyDown (target) {
    if (target.keyCode === 13) {
      this.setValue(target)
      this.props.onSubmit()
    } else if (target.keyCode === 27) {
      this.props.setEditable(false)
    }
  }

  render () {
    const isInvalid = this.props.validation.msg ? 'is-invalid' : ''
    return (
      <FormGroup>
        <Datetime className={this.props.inline ? 'inline' : ''} value={this.getValue()}
                  onChange={this.setValue.bind(this)} onBlur={this.onBlur.bind(this)} inputProps={{
          placeholder: this.props.placeholder,
          className: isInvalid,
          onKeyDown: this.handleKeyDown.bind(this)
        }}/>
        {this.props.validation.msg &&
        <FormFeedback>{this.props.validation.msg}</FormFeedback>
        }
      </FormGroup>
    )
  }
}