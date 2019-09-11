import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { AlertList } from "react-bs-notifier";
import { addAlert, removeAlert } from "../../modules/web/store/actions";
import { getAlerts } from "../../selectors/index";

class Alert extends React.Component {
  static propTypes = {
    alerts: PropTypes.array,
    removeAlert: PropTypes.func.isRequired,
    addAlert: PropTypes.func.isRequired,
    timeout: PropTypes.number
  };

  static defaultProps = {
    alerts: [],
    timeout: 1000
  };

  constructor(props) {
    super(props);

    this.onDismiss = this.onDismiss.bind(this);
  }

  componentDidMount() {}

  onDismiss(item) {
    this.props.removeAlert(item);
  }

  render() {
    return (
      <AlertList
        alerts={this.props.alerts}
        timeout={this.props.timeout}
        onDismiss={this.onDismiss}
      />
    );
  }
}

const mapStateToProps = state => {
  return {
    alerts: getAlerts(state)
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addAlert: alert => dispatch(addAlert(alert)),
    removeAlert: alert => dispatch(removeAlert(alert))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Alert);
