import {get} from 'lodash'

export default function createReducer (initialState, actionMap) {
  return (state = initialState, action) => {
    const f = actionMap[get(action, 'type')] || (() => state)
    return f(state, get(action, 'payload'))
  }
}
