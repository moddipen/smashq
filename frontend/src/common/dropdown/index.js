import React from 'react'
import PropTypes from 'prop-types'
import SelectSearch from 'react-select-search'
import './style.css'

class DropdownRow extends React.Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    options: PropTypes.array.isRequired,
    label: PropTypes.string.isRequired,
  }

  static defaultProps = {
    value: '1',
  }

  constructor (props) {
    super(props)
  }

  render () {
    return (
      <SelectSearch onChange={this.props.onChange} options={this.props.options} name={this.props.name}
                    value={this.props.value} placeholder="Choose an option.."/>
    )
  }
}

export default DropdownRow