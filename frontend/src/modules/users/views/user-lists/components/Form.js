import React from "react";
import PropTypes from "prop-types";
import { NavLink } from "redux-first-router-link";
import ProfileTabComponent from "../../../../../common/profile-tab/index";
import { API_URL } from "../../../../../contants/config";
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

const displayName = "UserListsForm";
const propTypes = {
  followStatus: PropTypes.func.isRequired
};

const Form = ({ users, followStatus }) => (
  <section className="pad-40">
    <div className="container container500">
      <div className="bgwhite">
        <div className="search-result-box">
          {users.map(user => {
            return (
              <div key={user.id} className="user-home-suggestion-box">
                <div className="user-home-suggestion-img">
                  <a href="#">
                    <img
                      src={
                        user.photo != ""
                          ? API_URL + "/" + user.photo
                          : "/img/noimg.png"
                      }
                      alt=""
                    />
                  </a>
                </div>
                <div className="user-home-suggestion-name">
                  <a href="#">{user.username}</a>
                </div>
                <div className="user-home-suggestion-btn">
                  {user.followUserId !== null ? (
                    <a
                      href="#"
                      className="btn-custom followed"
                      onClick={() => followStatus(user.id)}
                    >
                      Unfollow
                    </a>
                  ) : (
                    <a
                      href="#"
                      className="btn-custom"
                      onClick={() => followStatus(user.id)}
                    >
                      Follow
                    </a>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  </section>
);

Form.displayName = displayName;
Form.propTypes = propTypes;

export default Form;
