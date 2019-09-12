import React from 'react'
import PropTypes from 'prop-types'
import { FormGroup, Input, Label } from 'reactstrap'

class InputRow extends React.Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    type: PropTypes.string,
    onChange: PropTypes.func,
    onBlur: PropTypes.func,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.bool]),
    touched: PropTypes.bool,
    error: PropTypes.string,
    focus: PropTypes.bool,
    disabled: PropTypes.bool,
    className: PropTypes.string,
    message: PropTypes.string,
    showError: PropTypes.bool,
    placeholder: PropTypes.string
  }

  static defaultProps = {
    focus: false,
    disabled: false,
    className: '',
    touched: false,
    message: '',
    showError: true
  }
  input = React.createRef()

  constructor (props) {
    super(props)
  }

  componentDidMount () {
    if (this.props.focus && this.input) {
      this.input.current.focus()
    }
  }

  render () {
    const isCheckbox = this.props.type === 'checkbox'
    const input = <Input invalid={!!this.props.error} type={this.props.type} name={this.props.name} id={this.props.id}
                         value={isCheckbox ? '1' : this.props.value} onChange={this.props.onChange}
                         onBlur={this.props.onBlur} autoComplete="off"
                         innerRef={this.input} disabled={this.props.disabled}
                         checked={isCheckbox && this.props.value} placeholder={this.props.placeholder}>{this.props.children}</Input>
    return (
      <FormGroup check={isCheckbox} disabled={this.props.disabled} className={this.props.className}>
        {isCheckbox &&
        input
        }
        <Label check={isCheckbox} for={this.props.id}>{this.props.label}</Label>
        {!isCheckbox &&
        input
        }
        {!!this.props.message && this.props.message}
        {!!this.props.error && this.props.showError && this.props.touched &&
        <div className="invalid-feedback">{this.props.error}</div>}
      </FormGroup>
    )
  }
}

export default InputRow