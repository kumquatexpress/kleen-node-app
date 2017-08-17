import React from 'react'
import RaisedButton from 'material-ui/RaisedButton'
import axios from 'axios'

class MainApp extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      spots: [1,2,3]
    }
  }

  componentDidMount() {
    return axios.get(API_URL+'api/spots')
      .then(body => {
        return this.setState({
          spots: body.data.spots
        })
      })
  }

  componentWillUnmount() {

  }

  render() {
    return <RaisedButton label={this.state.spots.length} />
  }
}

export default MainApp
