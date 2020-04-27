import { combineReducers } from 'redux'
import main from './main.ts'
import inputs from './inputs.ts'
import modal from './modal.ts'
import curBuild from './curBuild.ts'

export default combineReducers({
  main,
  inputs,
  modal,
  curBuild
})
