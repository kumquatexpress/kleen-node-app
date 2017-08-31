import React from 'react'
import RaisedButton from 'material-ui/RaisedButton'
import axios from 'axios'
import { Redirect } from 'react-router'

class LoginForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: '',
      title: undefined,
    }
    this.handleEmailChange = this.handleEmailChange.bind(this)
    this.handlePasswordChange = this.handlePasswordChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.loginFacebook = this.loginFacebook.bind(this)
    this.setTitle = this.setTitle.bind(this)
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
    }).then(this.setTitle)
  }

  setTitle(resp) {
    const {
      data: user
    } = resp

    this.setState({
      title: `Hello ${user.first_name}!`
    })
  }

  loginFacebook(event) {
    return FB.login(resp => {
      const {
        authResponse: {
          accessToken,
          userId
        }
      } = resp
      return axios({
        url: API_URL+'api/auth/facebook',
        method: 'post',
        withCredentials: true,
        data: {
          access_token: accessToken
        },
      }).then(this.setTitle)
    })
  }

  render() {
    let greeting = null;
    if(this.state.title){
      greeting = <div>{this.state.title}</div>
    }

    return (
      <div>
        {greeting}
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
