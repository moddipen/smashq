import React from 'react'
import PropTypes from 'prop-types'
import { FormGroup, Label } from 'reactstrap'
import Select from 'react-select'
import classNames from 'classnames'

class SelectRow extends React.Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    items: PropTypes.array.isRequired,
    label: PropTypes.string.isRequired,
    valueField: PropTypes.string,
    nameField: PropTypes.string,
    onChange: PropTypes.func,
    onBlur: PropTypes.func,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    error: PropTypes.string,
    touched: PropTypes.bool,
    multi: PropTypes.bool
  }

  static defaultProps = {
    nameField: 'name',
    valueField: 'id',
    touched: false,
    multi: false
  }

  constructor (props) {
    super(props)
  }

  handleChange = value => {
    if (this.props.onChange) {
      this.props.onChange(this.props.name, value)
    }
  }

  handleBlur = () => {
    if (this.props.onBlur) {
      this.props.onBlur(this.props.name, true)
    }
  }

  render () {
    const errorClasses = classNames(
      'form-control',
      {
        'is-invalid': !!this.props.error
      })
    return (
      <FormGroup>
        <Label for={this.props.id}>{this.props.label}</Label>
        <Select id={this.props.id} onBlurResetsInput={true} onSelectResetsInput={true} closeOnSelect={true}
                options={this.props.items} value={this.props.value} onChange={this.handleChange}
                onBlur={this.handleBlur} valueKey={this.props.valueField} labelKey={this.props.nameField}
                className={errorClasses} clearable={false} simpleValue={true} multi={this.props.multi}/>
        {!!this.props.error && this.props.touched && <div className="invalid-feedback">{this.props.error}</div>}
      </FormGroup>
    )
  }
}

export default SelectRow