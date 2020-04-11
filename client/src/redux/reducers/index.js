import { combineReducers } from 'redux'
import main from './main'
import inputs from './inputs'
import modal from './modal'
import curBuild from './curBuild'

export default combineReducers({
  main,
  inputs,
  modal,
  curBuild
})
