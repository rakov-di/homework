import { combineReducers } from 'redux'
import app from './app'
import settings from './settings'
import startScreen from './startScreen'

export default combineReducers({
  app,
  settings,
  startScreen,
})
