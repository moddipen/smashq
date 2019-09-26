import React from "react"
import PropTypes from "prop-types"
import { API_URL } from "../../../../../contants/config"
import { NavLink } from "redux-first-router-link"
import "../../../../../assets/css/paymentFormModal.css"
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Nav,
  Row,
  Col
} from "reactstrap"

const displayName = "UserListsForm"
const propTypes = {
  followStatus: PropTypes.func.isRequired,
  toggle: PropTypes.func.isRequired,
  modal: PropTypes.bool.isRequired,
  errors: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  authUser: PropTypes.object.isRequired,
  months: PropTypes.array.isRequired,
  years: PropTypes.array.isRequired,
  profile: PropTypes.object.isRequired
}

const Form = ({
  users,
  followStatus,
  toggle,
  modal,
  errors,
  handleChange,
  handleSubmit,
  profile,
  months,
  years
}) => (
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
                      onClick={() => followStatus(user.id, "unfollow")}
                    >
                      Unfollow
                    </a>
                  ) : (
                    <a
                      href="#"
                      className="btn-custom"
                      onClick={() => followStatus(user.id, "follow")}
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
        <div className="commonsmall-box box1">
          <h3 className="mb-20">PAYMENT</h3>
          <div className="form-box form-boxq">
            <form
              className="form-horizontal"
              onSubmit={handleSubmit}
              noValidate
            >
              <div className="form-group Row">
                <Col sm="3">
                  <label htmlFor="cardnumber">Card No</label>
                </Col>
                <Col sm="9">
                  <div className="form-input">
                    <input
                      value={profile.cardnumber || ""}
                      type="tel"
                      pattern="[\d| ]{16,22}"
                      name="cardnumber"
                      className={`form-control ${errors.has("cardnumber") &&
                        "is-invalid"}`}
                      placeholder=""
                      onChange={e =>
                        handleChange(e.target.name, e.target.value)
                      }
                    />
                    {errors.has("cardnumber") && (
                      <div className="invalid-feedback">
                        {errors.first("cardnumber")}
                      </div>
                    )}
                  </div>
                </Col>
              </div>

              <div className="form-group Row">
                <Col sm="3">
                  <label htmlFor="cvv">CVV</label>
                </Col>
                <Col sm="9">
                  <div className="form-input">
                    <input
                      value={profile.cvv || ""}
                      type="tel"
                      name="cvv"
                      pattern="\d{3,4}"
                      className={`form-control ${errors.has("cvv") &&
                        "is-invalid"}`}
                      placeholder=""
                      onChange={e =>
                        handleChange(e.target.name, e.target.value)
                      }
                    />
                    {errors.has("cvv") && (
                      <div className="invalid-feedback">
                        {errors.first("cvv")}
                      </div>
                    )}
                  </div>
                </Col>
              </div>

              <div className="form-group Row">
                <Col sm="3">
                  <label htmlFor="expirydate">Expiry Date</label>
                </Col>
                <Col sm="4">
                  <div className="form-input">
                    <select
                      name="expiremonth"
                      onChange={e =>
                        handleChange(e.target.name, e.target.value)
                      }
                      className="form-control"
                    >
                      {months.map(month => {
                        return (
                          <option key={month.id} value={month.id}>
                            {month.name}
                          </option>
                        )
                      })}
                    </select>
                  </div>
                </Col>
                <Col sm="5">
                  <div className="form-input">
                    <select
                      name="expireyear"
                      onChange={e =>
                        handleChange(e.target.name, e.target.value)
                      }
                      className="form-control"
                    >
                      {years.map(year => {
                        return <option key={year}>{year}</option>
                      })}
                    </select>
                  </div>
                </Col>
              </div>

              <div className="pad-30">
                <button type="submit" className="btn-custom">
                  SUBMIT
                </button>
              </div>
            </form>
          </div>
        </div>
      </ModalBody>
    </Modal>
  </section>
)

Form.displayName = displayName
Form.propTypes = propTypes

export default Form
