import React from "react"
import PropTypes from "prop-types"
import { NavLink } from "redux-first-router-link"
import { API_URL } from "../../../../../contants/config"

const displayName = "SearchForm"
const propTypes = {
  followStatus: PropTypes.func.isRequired,
  users: PropTypes.array.isRequired
}

const Form = ({ users, followStatus }) => (
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
                  onClick={() => followStatus(user.id)}
                >
                  Unfollow
                </NavLink>
              ) : (
                <NavLink
                  to="#"
                  className="btn-custom"
                  onClick={() => followStatus(user.id)}
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
  </div>
)

Form.displayName = displayName
Form.propTypes = propTypes

export default Form
