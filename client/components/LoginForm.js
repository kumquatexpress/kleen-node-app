import React from 'react'
import RaisedButton from 'material-ui/RaisedButton'
import axios from 'axios'
import { Redirect } from 'react-router'

class LoginForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {email: '', password: '', redirectFacebook: false}

    this.handleEmailChange = this.handleEmailChange.bind(this)
    this.handlePasswordChange = this.handlePasswordChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.loginFacebook = this.loginFacebook.bind(this)
  }

  handleEmailChange(event) {
    this.setState({email: event.target.value})
  }

  handlePasswordChange(event) {
    this.setState({password: event.target.value})
  }

  handleSubmit(event) {
    event.preventDefault()
    return axios.post(API_URL+'api/login', {
      email: this.state.email,
      password: this.state.password,
    }).then(body => {
      console.log("body", body)
    }).catch(err => {
      console.log("status", err.response.status)
    })
  }

  loginFacebook(event) {
    window.location = API_URL+'api/auth/facebook'
  }

  render() {
    return (
      <div>
        <label>
          Email
          <input type="text" value={this.state.email} onChange={this.handleEmailChange} />
        </label>
        <label>
          Password
          <input type="text" value={this.state.password} onChange={this.handlePasswordChange} />
        </label>
        <RaisedButton label="submit" onClick={this.handleSubmit} />
        <RaisedButton label="facebook" onClick={this.loginFacebook} />
      </div>
    );
  }
}

export default LoginForm
