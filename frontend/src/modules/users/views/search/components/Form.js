import React from "react"
import PropTypes from "prop-types"
import { NavLink } from "redux-first-router-link"
import { API_URL } from "../../../../../contants/config"
import "../../../../../assets/css/paymentFormModal.css"
import PaymentFormComponent from "../../paymentForm/index"
import { Modal, ModalBody } from "reactstrap"

const displayName = "SearchForm"
const propTypes = {
  followStatus: PropTypes.func.isRequired,
  users: PropTypes.array.isRequired,
  searchtoggle: PropTypes.func.isRequired,
  searchmodal: PropTypes.bool.isRequired,
  followId: PropTypes.number.isRequired
}

const Form = ({ users, followStatus, searchtoggle, searchmodal, followId }) => (
  <div className="head-search-result-box box-shadow">
    {users.length ? (
      users.map(user => {
        return (
          <div key={user.id} className="user-home-suggestion-box">
            <div className="user-home-suggestion-img">
              <NavLink to={`/user-profile/` + user.id}>
                <img
                  src={
                    user.photo != ""
                      ? API_URL + "/" + user.photo
                      : "/img/noimg.png"
                  }
                  alt="User Image"
                />
              </NavLink>
            </div>
            <div className="user-home-suggestion-name">
              <NavLink to={`/user-profile/` + user.id}>{user.username}</NavLink>
            </div>
            <div className="user-home-suggestion-btn">
              {user.followUserId !== null ? (
                <NavLink
                  to="#"
                  className="btn-custom followed"
                  onClick={() => followStatus(user.id, "unfollow", "")}
                >
                  Unfollow
                </NavLink>
              ) : (
                <NavLink
                  to="#"
                  className="btn-custom"
                  onClick={() =>
                    followStatus(user.id, "follow", user.subOnFollow)
                  }
                >
                  Follow
                </NavLink>
              )}
            </div>
          </div>
        )
      })
    ) : (
      <div className="no-record">
        <h3>No Record Found.</h3>
      </div>
    )}

    <span>
      <NavLink to={`/user-lists`} className="seeAll">
        See all
      </NavLink>
    </span>

    <Modal
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      isOpen={searchmodal}
      toggle={searchtoggle}
      className="modal-profile"
    >
      <ModalBody className="profilem">
        <button
          type="button"
          className="close"
          onClick={searchtoggle}
          aria-label="Close"
        >
          <span aria-hidden="true">×</span>
        </button>
        <PaymentFormComponent followId={followId} searchtoggle={searchtoggle} />
      </ModalBody>
    </Modal>
  </div>
)

Form.displayName = displayName
Form.propTypes = propTypes

export default Form
