import {SET_AUTH} from '../constants/reduxTypes'

export function storeAuth (result) {
  return {
    type: SET_AUTH,
    payload: result
  }
}
