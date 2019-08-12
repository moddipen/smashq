import React from 'react'
import PropTypes from 'prop-types'

const displayName = 'LoginForm'
const propTypes = {
  email: PropTypes.string,
  password: PropTypes.string,
  remember: PropTypes.bool,
  errors: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
}

const Form = ({email, password, remember, errors, handleChange, handleSubmit}) => (
  <form className="form" role="form" onSubmit={handleSubmit} noValidate>
    <div className="content">
      <h3 className="title">Sign in</h3>
      <div className="row social-row">
        <div className="col-md-6 left">
          <a className="social-button facebook" href="/social/login/facebook"><i
            className="icons-facebook"/><span>Login with Facebook</span></a>
          <a className="social-button google" href="/social/login/google"><i
            className="icons-google-plus"/><span>Login with Google+</span></a>
        </div>
        <div className="social-separator">
          <div className="bar"/>
          <span>OR</span></div>
        <div className="col-md-6 right">
          <div className="form-group">
            <div className="col-sm-12">
              <div className="input-group">
                <div className="input-group-prepend">
                  <span className="input-group-text"><i className="icons-user"/></span>
                </div>
                <input type="text" className={`form-control ${errors.has('email') && 'is-invalid'}`}
                       name="email" value={email || ''} placeholder="Email"
                       onChange={e => handleChange(e.target.name, e.target.value)}/>
                {errors.has('email') &&
                <div className="invalid-feedback">{errors.first('email')}</div>}
              </div>
            </div>
          </div>
          <div className="form-group">
            <div className="col-sm-12">
              <div className="input-group">
                <div className="input-group-prepend">
                  <span className="input-group-text"><i className="icons-lock"/></span>
                </div>
                <input type="password"
                       className={`form-control ${errors.has('password') && 'is-invalid'}`}
                       name="password" placeholder="Password" value={password || ''}
                       onChange={e => handleChange(e.target.name, e.target.value)}/>
                {errors.has('password') &&
                <div className="invalid-feedback">{errors.first('password')}</div>}
              </div>
            </div>
          </div>
          <div className="form-group">
            <div className="row">
              <div className="col-sm-6">
                <a href="/password/reset">Forgot password?</a>
              </div>
              <div className="col-sm-6">
                <div className="checkbox pull-right">
                  <label>
                    <input type="checkbox" name="remember"
                           onChange={e => handleChange(e.target.name, !remember)}/> Remember Me
                  </label>
                </div>
              </div>
            </div>
          </div>
          <div className="text-right">
            <a href="/register" className="btn btn-default">Register</a>
            <button className="btn btn-primary" type="submit" disabled={errors.any()}>Log me in</button>
          </div>
        </div>
      </div>
    </div>
  </form>
)

Form.displayName = displayName
Form.propTypes = propTypes

export default Form