import React from 'react'
import { FormFeedback, FormGroup, Input, } from 'reactstrap'

export default class Select extends React.PureComponent {
  static defaultProps = {
    placeholder: 'Enter text'
  }

  constructor (props) {
    super(props)
    this.state = {
      value: props.value,
      options: props.options
    }
  }

  getValue = () => {
    const option = _.find(this.state.options, option => {
      return option.value == this.state.value
    })
    if (option) return option['value']
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

  getOptions () {
    if (this.props.options === null) {
      throw('Please specify options for select element')
    }
    const options = this.props.options.map(option =>
      (<option value={option.value} key={'option-' + option.value}>{option.text}</option>)
    )
    if (this.props.optionsEmpty !== false) {
      options.splice(0, 0, (<option value="" key={'option-blank'}>{this.props.optionsEmpty}</option>))
    }
    return options
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
    return (
      <FormGroup>
        <Input type="select" placeholder={this.props.placeholder} value={this.getValue()}
               onChange={this.setValue.bind(this)} onBlur={this.onBlur.bind(this)}
               onKeyDown={this.handleKeyDown.bind(this)} bsSize={this.props.bsInputSize}>
          {this.getOptions()}
        </Input>
        {this.props.validation.msg &&
        <FormFeedback>{this.props.validation.msg}</FormFeedback>
        }
      </FormGroup>
    )
  }
}