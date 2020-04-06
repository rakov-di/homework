import { combineReducers } from 'redux'
import app from './app'
import inputs from './inputs'
import modal from './modal'
import curBuild from './curBuild'

export default combineReducers({
  app,
  inputs,
  modal,
  curBuild
})
