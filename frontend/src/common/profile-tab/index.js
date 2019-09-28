import React from "react"
import { connect } from "react-redux"
import { NavLink } from "redux-first-router-link"
import { getPage } from "../../selectors"

class ProfileTabComponent extends React.PureComponent {
  static propTypes = {}

  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className="col-lg-3 col-md-4 col-12 pr-0">
        <div className="edit-option-list">
          <div className="mob-menu-list">
            <a href="#" className="btn-custom">
              Settings <i className="fas fa-arrow-down"></i>
            </a>
          </div>
          <ul>
            <li
              className={this.props.page.name == "EDIT_PROFILE" ? "active" : ""}
            >
              <NavLink to={`/edit-profile`}>Edit profile</NavLink>
            </li>
            <li
              className={this.props.page.name == "SOCIAL_MEDIA" ? "active" : ""}
            >
              <NavLink to={`/social-media`}>Social Media</NavLink>
            </li>
            <li
              className={
                this.props.page.name == "CHANGE_PASSWORD" ? "active" : ""
              }
            >
              <NavLink to={`/change-password`}>Change Password</NavLink>
            </li>
            <li className={this.props.page.name == "EMAIL_SMS" ? "active" : ""}>
              <NavLink to={`/email-sms`}>Email and SMS</NavLink>
            </li>
            <li>
              <a href="#">Privacy and Security</a>
            </li>

            <li className={this.props.page.name == "SETTINGS" ? "active" : ""}>
              <NavLink to={`/settings`}>Settings</NavLink>
            </li>
          </ul>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    page: getPage(state)
  }
}
export default connect(mapStateToProps)(ProfileTabComponent)
