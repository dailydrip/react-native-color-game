import Reactotron from 'reactotron-react-native'
import { reactotronRedux } from 'reactotron-redux'


Reactotron
  .configure({
      name: 'Color Game App'
    })
  .use(reactotronRedux())
  .connect()