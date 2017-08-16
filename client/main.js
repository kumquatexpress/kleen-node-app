import React from 'react'
import ReactDOM from 'react-dom'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import MainApp from './components/MainApp'
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

const BasicExample = () => (
  <Router>
    <div>
      <ul>
        <li><Link to="/home">Home</Link></li>
      </ul>

      <hr/>
      <Route exact path="/home" component={App}/>
    </div>
  </Router>
)

ReactDOM.render(
  <BasicExample />,
  document.getElementById('app')
)