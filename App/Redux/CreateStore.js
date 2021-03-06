import { createStore,
  applyMiddleware,
  compose,
  combineReducers } from 'redux'
import RemoteReduxDevTools from 'remote-redux-devtools'
import Immutable from 'immutable'
import reducers from './reducers'
import thunk from 'redux-thunk'
import Reactotron from 'reactotron-react-native'

let devTools

if (global.reduxNativeDevTools) {
  devTools = global.reduxNativeDevTools
} else {
  devTools = RemoteReduxDevTools
}


const enhancer = compose(
  applyMiddleware(thunk),
  devTools()
)

export default () => {
  let dev = __DEV__

  let store = createStore(
      reducers,
      undefined,
      enhancer
    )

  if (dev) {
    store = Reactotron.createStore(
      reducers,
      undefined,
      enhancer
    )
  }

  devTools.updateStore(store)
  console.log('creating store', store)
  return store
}
