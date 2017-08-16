import React from 'react'
import ReactDOM from 'react-dom'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import MainApp from './components/MainApp'

const App = () => (
  <MuiThemeProvider>
    <MainApp count={10} />
  </MuiThemeProvider>
)

ReactDOM.render(
  <App />,
  document.getElementById('app')
)