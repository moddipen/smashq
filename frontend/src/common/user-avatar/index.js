// import libs
import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { getUserById } from '../../selectors'
import { connect } from 'react-redux'

class UserAvatar extends React.PureComponent {
  static propTypes = {
    userId: PropTypes.number.isRequired,
    user: PropTypes.object,
    profile: PropTypes.object,
    size: PropTypes.string,
    plus: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
  }

  constructor (props) {
    super(props)
  }

  render () {
    if (!this.props.user || !this.props.user.profile) {
      return <div className={classNames(
        'user-avatar',
        this.props.size
      )}><i className="icons-user"/></div>
    }
    const profile = this.props.user.profile
    const classes = classNames(
      'user-avatar',
      {
        'has-image': profile.attachmentId
      },
      this.props.size
    )
    const styles = profile.attachmentId ? {
      backgroundImage: `url(/attachments/file/${profile.attachmentId})`
    } : {}
    const avatar = (
      <div title={this.props.user.name} className={classes} style={styles}>
        <span>{profile.initials}</span>
      </div>
    )
    if (this.props.plus && this.props.plus > 0) {
      const plusClasses = classNames(
        'avatar-plus',
        this.props.size
      )
      return (
        <React.Fragment>
          {avatar}{' '}
          <div className={plusClasses}>+{this.props.plus}</div>
        </React.Fragment>
      )
    }
    return avatar
  }
}

const mapStateToProps = (state, props) => {
  return {
    user: getUserById(state, props.userId)
  }
}

export default connect(mapStateToProps, null)(UserAvatar)
