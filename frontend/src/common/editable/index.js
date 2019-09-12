// import libs
import React from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import { Button, Input, Popover } from "reactstrap";
import Select from "./components/Select";
import Text from "./components/Text";
import TextArea from "./components/TextArea";
import Datetime from "./components/Datetime";
import TimeInterval from "./components/TimeInterval";

class Editable extends React.PureComponent {
  static propTypes = {
    dataType: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    mode: PropTypes.string,
    showButtons: PropTypes.bool,
    disabled: PropTypes.bool,
    validate: PropTypes.func,
    display: PropTypes.func,
    onInputChange: PropTypes.func,
    value: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
      PropTypes.object
    ]),

    //handle callback if provided
    handleSubmit: PropTypes.func,

    // only used when mode is popup
    title: PropTypes.string,
    placement: PropTypes.string,
    // for input type text
    bsInputClass: PropTypes.string,
    bsInputSize: PropTypes.string
  };

  static defaultProps = {
    showButtons: true,
    dataType: "text",
    mode: "inline",
    disabled: false,
    emptyValueText: "-",
    //depend on mode
    placement: "top"
  };

  constructor(props) {
    super(props);
    this.getValue = this.getValue.bind(this);
    this.state = {
      dataType: props.dataType ? props.dataType : "text",
      name: props.name,
      mode: props.mode ? props.mode : "inline",
      disabled: props.disabled ? props.disabled : false,
      showButtons: props.showButtons != undefined ? props.showButtons : true,
      validate: props.validate ? props.validate : undefined,
      display: props.display ? props.display : undefined,
      defaultValue: props.defaultValue ? props.defaultValue : "",

      // only used when mode is popup
      title: props.title ? props.title : null,
      placement: props.placement ? props.placement : "right",
      //Input
      bsInputClass: props.bsInputClass ? props.bsInputClass : "",
      bsInputSize: props.bsInputSize ? props.bsInputSize : "sm",
      //Select & checklist
      options: props.options ? props.options : null,
      //checklist
      optionsInline: props.inline ? props.inline : false,

      optionsEmpty:
        typeof props.optionsEmpty !== "undefined" ? props.optionsEmpty : "",
      //Required for customize input
      customComponent: props.customComponent ? props.customComponent : null,
      onInputChange: props.onInputChange ? props.onInputChange : null,
      //handle callback if provided
      handleSubmit: props.handleSubmit ? props.handleSubmit : null,
      //for internal use
      editable: false,
      valueUpdated: false,
      value: this.getValue(props.value),
      newValue: this.getValue(props.value)
    };
    this.validation = {};
    this.clear = this.clear.bind(this);

    // this.updateValue = this.updateValue.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.value != this.state.value) {
      this.setValue(nextProps.value);
      this.setState({
        value: nextProps.value
      });
    }
    if (nextProps.options !== this.state.options) {
      this.setState({
        options: nextProps.options
      });
    }
  }

  clear() {
    this.setState({
      value: "",
      newValue: ""
    });
  }

  getValue = (newValue = null) => {
    const { dataType, options } = this.props;
    let value = this.props.value;
    if (newValue !== null) {
      value = newValue;
    }
    if (dataType === "select" || dataType === "checklist") {
      if (options === null) {
        throw "Please specify options for " + dataType + " data type";
      }
      if (value && _.isEmpty(value)) {
        const option = _.find(options, { value: value });
        if (option && option.text) {
          return option.text;
        } else {
          throw "No option found for specified value:" + value;
        }
      } else {
        return value;
      }
    } else {
      return value;
    }
  };

  setValue = (newValue = null) => {
    const value = this.getValue(newValue);
    this.setState({
      value: value,
      newValue: value
    });
  };
  setEditable = editable => {
    if (!this.state.disabled) this.setState({ editable });
  };

  onSubmit = () => {
    const validation = this.getValidationState();
    this.validation = validation;
    if (this.validation.type === "error") {
      this.setState({ validation });
    } else {
      // this.value = this.newValue;
      this.setEditable(false);
      this.setState(
        {
          validation,
          value: this.state.newValue
        },
        this.state.handleSubmit
          ? () =>
              this.state.handleSubmit({
                props: { name: this.props.name },
                value: this.state.value
              })
          : null
      );
    }
  };
  onCancel = () => {
    this.setEditable(false);
    //reset validation
    this.validation = {};
  };

  setValueToAnchor(value, event) {
    // this.newValue = value;
    this.setState({
      newValue: value
    });
    //To trigger onInputChange event:user defined
    if (this.props.onInputChange) {
      this.props.onInputChange(event);
    }
  }

  getValueForAnchor() {
    if (this.state.value || this.state.value === 0 || this.state.value === "") {
      if (this.props.display) {
        return this.props.display(this.state.value);
      } else if (this.props.seperator && _.isArray(this.state.value)) {
        return _.join(this.state.value, this.props.seperator);
      } else if (this.props.options) {
        const option = _.find(this.props.options, option => {
          return option.value == this.state.value;
        });
        if (option) {
          return option.text;
        }
      } else if (_.isArray(this.state.value)) {
        return _.join(this.state.value, ",");
      } else if (_.isObject(this.state.value)) {
        let tmp = "";
        _.forOwn(this.state.value, function(value, key) {
          tmp += key + ":" + value + " ";
        });
        return tmp;
      }
    }
    return this.state.value;
  }

  getValidationState() {
    if (this.props.validate) {
      const validate = this.props.validate(this.state.newValue);
      if (validate) {
        return { type: "error", msg: validate };
      }
    }
    return { type: undefined, msg: undefined };
  }

  getButtons() {
    if (this.state.showButtons) {
      let button = "";
      // if (this.props.dataType === 'datetime' && this.props.inline) {
      //     button = <Button color="link" size="sm" onClick={this.clear} key={"btn-link" + this.props.name}>
      //         Clear</Button>
      // }
      return (
        <div className="editable-btn" key={this.props.name + "editable-btn"}>
          {/*{button}*/}
          <Button
            color="success"
            size="sm"
            onClick={this.onSubmit.bind(this)}
            key={"btn-success" + this.props.name}
          >
            <i className="icons-check" key={"icons-check" + this.props.name} />
          </Button>
          <Button
            color="danger"
            size="sm"
            onClick={this.onCancel.bind(this)}
            key={"btn-danger" + this.props.name}
          >
            <i className="icons-close" key={"icons-close" + this.props.name} />
          </Button>
        </div>
      );
    }
    return null;
  }

  getContent() {
    const {
      editable,
      title,
      validate,
      showButtons,
      defaultValue,
      dataType,
      placement,
      mode,
      name,
      options
    } = this.state;

    const componentProps = {
      key: "editable-name-" + this.state.name,
      setValueToAnchor: this.setValueToAnchor.bind(this),
      value: this.state.value || defaultValue,
      onSubmit: this.onSubmit.bind(this),
      setEditable: this.setEditable.bind(this),
      validation: this.validation,
      bsInputSize: this.state.bsInputSize
    };
    const content = [];
    if (editable) {
      switch (dataType) {
        case "text":
          content.push(<Text {...componentProps} {...this.state} />);
          break;
        case "datetime":
          content.push(<Datetime {...componentProps} {...this.state} />);
          break;
        case "textarea":
          content.push(<TextArea {...componentProps} {...this.state} />);
          break;
        case "select":
          content.push(<Select {...componentProps} {...this.state} />);
          break;
        // case 'checklist':
        //     content.push(<Checklist {...componentProps} {...this.state} />);
        //     break;
        case "date":
          content.push(
            <Input type="date" {...componentProps} {...this.state} />
          );
          break;
        // case 'radio':
        //   content.push(<Radio {...componentProps} {...this.state} />);
        //   break;
        case "timeInterval":
          content.push(<TimeInterval {...componentProps} {...this.state} />);
          break;
        case "custom":
          const customComponentContent = this.state.customComponent(
            componentProps,
            this.state
          );
          content.push(customComponentContent);
          break;
        default:
          throw "Please set valid dataType:" + dataType;
      }

      content.push(this.getButtons());
      if (mode == "popup") {
        return (
          <Popover
            className="inline-edit"
            isOpen={editable}
            target={() => ReactDOM.findDOMNode(this.editableAnchor)}
            toggle={() => {
              this.setEditable(false);
            }}
            placement={placement}
          >
            {content}
          </Popover>
        );
      }
      return content;
    }
  }

  render() {
    const {
      editable,
      title,
      validate,
      showButtons,
      defaultValue,
      dataType,
      mode,
      disabled
    } = this.state;
    const editableContainerClass = disabled
      ? "editable-disabled"
      : "editable-container";
    return (
      <div className={editableContainerClass} key={this.props.name}>
        {!(mode == "inline" && editable) ? (
          <a
            ref={ref => (this.editableAnchor = ref)}
            onClick={this.setEditable.bind(this, true)}
            href="#"
            className={this.props.className}
          >
            {this.getValueForAnchor() || this.props.emptyValueText}
          </a>
        ) : null}
        {this.getContent()}
      </div>
    );
  }
}

export default Editable;
