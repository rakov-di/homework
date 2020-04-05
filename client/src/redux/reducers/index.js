import { combineReducers } from 'redux'
import app from './app'
import inputs from './inputs'
import buildHistory from './buildHistory'
import curBuild from './curBuild'

export default combineReducers({
  app,
  inputs,
  buildHistory,
  curBuild
})
