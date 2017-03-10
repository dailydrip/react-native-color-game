import React, { Component } from 'react'
import { Provider } from 'react-redux'
import createStore from './Redux/CreateStore'
import MainScreen from './MainScreen'
import './Config/ReactotronConfig'
import Reactotron from 'reactotron-react-native'

const store = createStore()

class App extends Component {
  render () {
	Reactotron.log('hello from AppContainer')
    return (
      <Provider store={store}>
        <MainScreen />
      </Provider>
    )
  }
}

export default App
