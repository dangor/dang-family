import u from 'updeep'
import createReducer from './util/createReducer'
import {UPDATE_FIREBASE_STATE} from '../constants/reduxTypes'

const firebaseReducer = createReducer({}, {
  [UPDATE_FIREBASE_STATE]: (state, update) => u(update, state)
})

export default firebaseReducer
