import {SET_AUTH} from '../constants/reduxTypes'

export function storeAuth (result) {
  return (dispatch, getState) => {
    dispatch({
      type: SET_AUTH,
      payload: result
    })
  }
}
