// import libs
import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Modal as BootstrapModal } from "reactstrap";
import { updateSelectedModal } from "../../modules/web/store/actions";
// import components
import modals from "../../routes/modals";

class Modal extends React.Component {
  static propTypes = {
    modal: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);

    this.close = this.close.bind(this);
  }

  close() {
    this.props.dispatch(updateSelectedModal({}));
  }

  render() {
    const Page = modals[this.props.modal.name];
    if (!Page) {
      return null;
    }
    if (Page && Page.thunk) {
      Page.thunk(this.props.dispatch, this.props.modal);
    }
    const pageOutput =
      Page && Page.component ? (
        <Page.component
          {...this.props}
          close={this.close}
          params={this.props.modal.params}
        />
      ) : null;
    return (
      <BootstrapModal
        isOpen={this.props.modal.name !== undefined}
        toggle={this.close}
        size={(Page && Page.size) || "full"}
        id={this.props.modal.name + "Modal"}
      >
        {pageOutput}
      </BootstrapModal>
    );
  }
}

const mapStateToProps = state => {
  return {
    modal: state.ui.modal
  };
};

export default connect(mapStateToProps)(Modal);
