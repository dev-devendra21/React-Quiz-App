import {useState} from 'react'
import {Redirect} from 'react-router-dom'

import Cookies from 'js-cookie'

import './index.css'

const LoginForm = props => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')

  const onSuccessFullLogin = () => {
    const {history} = props
    history.replace('/')
  }

  const sendUserDetails = async () => {
    const url = 'https://apis.ccbp.in/login'
    const userDetails = {username, password}

    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    setUsername('')
    setPassword('')
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok) {
      const jwtToken = data.jwt_token
      Cookies.set('jwt_token', jwtToken, {expires: 30})
      setErrorMsg('')
      onSuccessFullLogin()
    } else {
      setErrorMsg(data.error_msg)
    }
  }

  const handleFormSubmit = event => {
    event.preventDefault()
    sendUserDetails()
  }

  const handleUsername = event => {
    setUsername(event.target.value)
  }

  const handlePassword = event => {
    setPassword(event.target.value)
  }

  const handleShowPassword = () => {
    setShowPassword(!showPassword)
  }

  const isPassword = showPassword ? 'text' : 'password'

  const jwtToken = Cookies.get('jwt_token')
  if (jwtToken !== undefined) return <Redirect to="/" />
  return (
    <>
      <div className="Login-container">
        <section className="card-container">
          <div className="login-logo-container">
            <img
              src="https://res.cloudinary.com/ddox0bhgm/image/upload/v1707467846/NxtAssess/Nxt_Assess_website_logo_vynb46.jpg"
              className="login-website-logo"
              alt="login website logo"
            />
          </div>
          <form className="form-container" onSubmit={handleFormSubmit}>
            <label htmlFor="username" className="label-text">
              username
            </label>
            <input
              id="username"
              className="input-element"
              type="text"
              value={username}
              onChange={handleUsername}
            />
            <label htmlFor="password" className="label-text">
              password
            </label>
            <input
              id="password"
              className="input-element password-element"
              type={isPassword}
              value={password}
              onChange={handlePassword}
            />
            <input
              onClick={handleShowPassword}
              type="checkbox"
              className="check-password"
              id="checkbox"
            />
            <label htmlFor="checkbox">Show Password</label>
            <button type="submit" className="login-button">
              Login
            </button>
            {errorMsg === '' ? '' : <p className="error">{errorMsg}</p>}
          </form>
        </section>
      </div>
    </>
  )
}

export default LoginForm
