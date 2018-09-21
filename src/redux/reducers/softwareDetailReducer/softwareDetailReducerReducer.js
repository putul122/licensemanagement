import { handleActions } from 'redux-actions'
import {FETCH_SOFTWARE_BY_ID_SUCCESS, FETCH_SOFTWARE_PROPERTIES_SUCCESS,
  FETCH_SOFTWARE_RELATIONSHIPS_SUCCESS} from '../../sagas/software/softwareSaga'
// Name Spaced Action Types
// const INCREMENT = 'BasicReducer/INCREMENT'
// const DECREMENT = 'BasicReducer/DECREMENT'
export const actions = {
//   FETCH_APPLICATIONS_SUMMARY_SUCCESS,
//   FETCH_APPLICATIONS_SUCCESS,
  FETCH_SOFTWARE_BY_ID_SUCCESS,
  FETCH_SOFTWARE_PROPERTIES_SUCCESS,
  FETCH_SOFTWARE_RELATIONSHIPS_SUCCESS
}

export const actionCreators = {
//   increment: createAction(INCREMENT),
//   decrement: createAction(DECREMENT)
}

export const initialState = {
      softwarebyId: '',
      softwareProperties: '',
      softwareRelationships: ''
 }

export default handleActions(
  {
    [FETCH_SOFTWARE_BY_ID_SUCCESS]: (state, action) => ({
      ...state,
      softwarebyId: action.payload
    }),
    [FETCH_SOFTWARE_PROPERTIES_SUCCESS]: (state, action) => ({
      ...state,
      softwareProperties: action.payload
    }),
    [FETCH_SOFTWARE_RELATIONSHIPS_SUCCESS]: (state, action) => ({
      ...state,
      softwareRelationships: action.payload
    })
  },
  initialState
)
