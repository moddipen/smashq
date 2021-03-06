import React from "react"
import PropTypes from "prop-types"
import PaymentFormComponent from "../../paymentForm/index"
import { NavLink } from "redux-first-router-link"
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Nav
} from "reactstrap"

const displayName = "YourCoinForm"
const propTypes = {
  errors: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  authUser: PropTypes.object.isRequired,
  toggle: PropTypes.func.isRequired,
  modal: PropTypes.bool.isRequired,
  coins: PropTypes.string.isRequired
}

const Form = ({
  errors,
  authUser,
  handleChange,
  handleSubmit,
  profile,
  modal,
  toggle,
  coins
}) => (
  <section className="pad-40 confirm-number-section">
    <div className="container container500">
      <div className="bgwhite bordergray">
        <div className="commonsmall-box text-center">
          <div className="top-box mb-20">
            <div className="border-box-icon">Q</div>
          </div>
          <h3 className="mb-20">
            Your total coin is Q <span>{authUser.coins}</span>
          </h3>
          <div className="form-box">
            <p>
              Lorem Ipsum is simply dummy text of industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled{" "}
            </p>
            <form
              className="form-horizontal"
              onSubmit={handleSubmit}
              noValidate
            >
              <div className="form-group">
                <input
                  value={profile.coins || ""}
                  type="text"
                  name="coins"
                  className={`form-control ${errors.has("coins") &&
                    "is-invalid"}`}
                  placeholder=""
                  onChange={e => handleChange(e.target.name, e.target.value)}
                />
                {errors.has("coins") && (
                  <div className="invalid-feedback">
                    {errors.first("coins")}
                  </div>
                )}
              </div>
              <div className="form-group">
                <button type="submit" className="btn-custom">
                  Add Coins
                </button>
              </div>
            </form>
            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been
            </p>
          </div>
          <NavLink to={`/transactions`} className="trans-log">
            <i className="fa fa-history"></i> Transaction Logs
          </NavLink>
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
        <PaymentFormComponent coins={coins} />
      </ModalBody>
    </Modal>
  </section>
)

Form.displayName = displayName
Form.propTypes = propTypes

export default Form
