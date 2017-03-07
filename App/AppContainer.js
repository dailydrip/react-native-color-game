import React, { Component } from 'react'
import { Provider } from 'react-redux'
import createStore from './Redux/CreateStore'
import MainScreen from './MainScreen'

const store = createStore()

class App extends Component {
  render () {
    return (
      <Provider store={store}>
        <MainScreen />
      </Provider>
    )
  }
}

export default App
