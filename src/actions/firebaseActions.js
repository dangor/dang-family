import {UPDATE_FIREBASE_STATE} from '../constants/reduxTypes'

export function updateFirebaseState (update) {
  return {
    type: UPDATE_FIREBASE_STATE,
    payload: update
  }
}
