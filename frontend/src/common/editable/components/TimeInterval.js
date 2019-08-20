import React from "react";
import PropTypes from "prop-types";
import { FormFeedback, FormGroup, Input, Label } from "reactstrap";

export default class TimeInterval extends React.PureComponent {
  static propTypes = {
    setValueToAnchor: PropTypes.func.isRequired
  };

  static defaultProps = {
    placeholder: "Enter text"
  };

  constructor(props) {
    super(props);
    let value = props.value;
    if (value instanceof Object) {
      if (!value.type) {
        value.type = "hours";
      }
    }
    this.state = {
      value: value || {}
    };
  }

  componentDidMount() {
    if (this.ref) {
      this.ref.value = "";
      this.ref.value = this.state.value;
    }
  }

  getValue = () => {
    return this.state.value;
  };

  getDurationValue = () => {
    if (this.state.value instanceof Object) {
      return this.state.value.amount;
    }
    return "";
  };

  getIntervalValue = () => {
    if (this.state.value instanceof Object) {
      return this.state.value.type;
    }
    return "";
  };

  setValue = e => {
    const value = { ...this.state.value, [e.target.name]: e.target.value };
    this.setState({ value: value });
    if (e.target.value === "") {
      this.props.setValueToAnchor(undefined, e);
      return;
    }
    this.props.setValueToAnchor(value, e);
  };

  onBlur(e) {
    if (!this.props.showButtons) {
      this.setValue(e);
      this.props.onSubmit();
    }
  }

  handleKeyDown(target) {
    if (target.keyCode === 13) {
      this.setValue(target);
      this.props.onSubmit();
    } else if (target.keyCode === 27) {
      this.props.setEditable(false);
    }
  }

  render() {
    const isInvalid = this.props.validation.msg ? "is-invalid" : "";
    return (
      <FormGroup>
        <Label>Duration</Label>
        <Input
          placeholder={this.props.placeholder}
          value={this.getDurationValue()}
          onChange={this.setValue.bind(this)}
          onBlur={this.onBlur.bind(this)}
          onKeyDown={this.handleKeyDown.bind(this)}
          autoFocus={true}
          className={isInvalid}
          bsSize={this.props.bsInputSize}
          name="amount"
        />
        <Label>Interval</Label>
        <Input
          placeholder={this.props.placeholder}
          value={this.getIntervalValue()}
          onChange={this.setValue.bind(this)}
          onBlur={this.onBlur.bind(this)}
          onKeyDown={this.handleKeyDown.bind(this)}
          autoFocus={true}
          className={isInvalid}
          bsSize={this.props.bsInputSize}
          type="select"
          name="type"
        >
          <option value="hours">Hours</option>
          <option value="days">Days</option>
          <option value="weeks">Weeks</option>
          <option value="months">Months</option>
        </Input>
        {this.props.validation.msg && (
          <FormFeedback>{this.props.validation.msg}</FormFeedback>
        )}
      </FormGroup>
    );
  }
}
