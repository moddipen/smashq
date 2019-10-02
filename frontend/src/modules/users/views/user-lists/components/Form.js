import React from "react"
import PropTypes from "prop-types"
import { API_URL } from "../../../../../contants/config"
import { NavLink } from "redux-first-router-link"
import "../../../../../assets/css/paymentFormModal.css"
import PaymentFormComponent from "../../paymentForm/index"
import { Modal, ModalBody } from "reactstrap"

const displayName = "UserListsForm"
const propTypes = {
  followStatus: PropTypes.func.isRequired,
  toggle: PropTypes.func.isRequired,
  modal: PropTypes.bool.isRequired,
  profile: PropTypes.object.isRequired,
  followId: PropTypes.number.isRequired
}

const Form = ({ users, followStatus, toggle, modal, followId }) => (
  <section className="pad-40">
    <div className="container container500">
      <div className="bgwhite">
        <div className="search-result-box">
          {users.map(user => {
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
                  <NavLink to={`/user-profile/` + user.id}>
                    {user.username}
                  </NavLink>
                </div>
                <div className="user-home-suggestion-btn">
                  {user.followUserId !== null ? (
                    <a
                      href="#"
                      className="btn-custom followed"
                      onClick={() => followStatus(user.id, "unfollow", "")}
                    >
                      Unfollow
                    </a>
                  ) : (
                    <a
                      href="#"
                      className="btn-custom"
                      onClick={() =>
                        followStatus(user.id, "follow", user.subOnFollow)
                      }
                    >
                      Follow
                    </a>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>

    <Modal
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      isOpen={modal}
      toggle={toggle}
      className="modal-profile"
    >
      <ModalBody className="profilem">
        <button
          type="button"
          className="close"
          onClick={toggle}
          aria-label="Close"
        >
          <span aria-hidden="true">×</span>
        </button>
        <PaymentFormComponent followId={followId} searchtoggle={toggle} />
      </ModalBody>
    </Modal>
  </section>
)

Form.displayName = displayName
Form.propTypes = propTypes

export default Form
