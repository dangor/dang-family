import createReducer from './util/createReducer'
import {SET_AUTH} from '../constants/reduxTypes'

const authReducer = createReducer({}, {
  [SET_AUTH]: (state, payload) => state
})

export default authReducer
