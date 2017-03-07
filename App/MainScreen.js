import React from 'react';
import GameScreen from './GameScreen'
import { DrawerNavigator } from 'react-navigation'

const AppWithNavigator = DrawerNavigator({
  Game: { screen: GameScreen }
})

export default AppWithNavigator

