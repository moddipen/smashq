import React from "react";
import PropTypes from "prop-types";
import { NavLink } from "redux-first-router-link";
import ProfileTabComponent from "../../../../../common/profile-tab/index";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Row,
  Col
} from "reactstrap";
import Avatar from "react-avatar-edit";

const displayName = "VerifyCodeForm";
const propTypes = {
  // errors: PropTypes.object.isRequired,
  // handleSubmit: PropTypes.func.isRequired,
  // handleChange: PropTypes.func.isRequired,
  // profile: PropTypes.object.isRequired,
  // src: PropTypes.string.isRequired,
  // avoidSpace: PropTypes.func.isRequired,
  // toggle: PropTypes.func.isRequired,
  // previewShow: PropTypes.func.isRequired,
  // onCrop: PropTypes.func.isRequired,
  // onClose: PropTypes.func.isRequired
};

const Form = ({
  users
  // errors,
  // handleChange,
  // handleSubmit,
  // profile,
  // src,
  // preview,
  // avoidSpace,
  // handleClose,
  // toggle,
  // modal,
  // previewShow,
  // onCrop,
  // onClose,
  // filePreview
}) => (
  <div className="head-search-result-box box-shadow">
    {users.map(user => {
      return (
        <div className="user-home-suggestion-box">
          <div className="user-home-suggestion-img">
            <a href="user-profile.php">
              <img src="/img/noimg.png" alt="" />
            </a>
          </div>
          <div className="user-home-suggestion-name">
            <a href="user-profile.php">{user.username}</a>
          </div>
          <div className="user-home-suggestion-btn">
            <a href="#" className="btn-custom">
              Follow
            </a>
          </div>
        </div>
      );
    })}
  </div>
);

Form.displayName = displayName;
Form.propTypes = propTypes;

export default Form;
