import React from 'react'
import ReactDOM from 'react-dom'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import MainApp from './components/MainApp'
import LoginForm from './components/LoginForm'
import injectTapEventPlugin from 'react-tap-event-plugin'
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'

const App = () => (
  <MuiThemeProvider>
    <MainApp count={10} />
  </MuiThemeProvider>
)

const Login = () => (
  <MuiThemeProvider>
    <LoginForm />
  </MuiThemeProvider>
)

const BasicExample = () => (
  <Router>
    <div>
      <ul>
        <li><Link to="/login">Login</Link></li>
      </ul>

      <hr/>
      <Route exact path="/" component={App}/>
      <Route exact path="/login" component={Login}/>
    </div>
  </Router>
)

injectTapEventPlugin()
ReactDOM.render(
  <BasicExample />,
  document.getElementById('app')
)