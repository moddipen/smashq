import React from 'react'
import PropTypes from 'prop-types'
import { FormFeedback, FormGroup, Input, } from 'reactstrap'

export default class TextArea extends React.PureComponent {
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

  getValue = () => {
    return this.state.value
  }

  setValue = (e) => {
    // const option = _.find(this.state.options, (option) => {
    //     return option.value == e.target.value;
    // });
    this.setState({value: e.target.value})
    if (e.target.value === '') {
      this.props.setValueToAnchor(undefined, e)
      return
    }
    this.props.setValueToAnchor(e.target.value, e)
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
        <Input type="textarea" innerRef={e => this.ref = e} placeholder={this.props.placeholder} value={this.getValue()}
               onChange={this.setValue.bind(this)} onBlur={this.onBlur.bind(this)}
               onKeyDown={this.handleKeyDown.bind(this)} autoFocus={true} className={isInvalid}
               bsSize={this.props.bsInputSize}/>
        {this.props.validation.msg &&
        <FormFeedback>{this.props.validation.msg}</FormFeedback>
        }
      </FormGroup>
    )
  }
}