import React from 'react'
import RaisedButton from 'material-ui/RaisedButton'
import injectTapEventPlugin from 'react-tap-event-plugin'

injectTapEventPlugin()

const MainApp = () => (
  <RaisedButton label="Default" />
)

export default MainApp
