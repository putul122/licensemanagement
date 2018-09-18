import { handleActions } from 'redux-actions'
import {FETCH_APPLICATIONS_SUMMARY_SUCCESS, FETCH_APPLICATIONS_SUCCESS, FETCH_APPLICATION_BY_ID_SUCCESS} from '../../sagas/application/applicationSaga'
// Name Spaced Action Types
// const INCREMENT = 'BasicReducer/INCREMENT'
// const DECREMENT = 'BasicReducer/DECREMENT'
export const actions = {
  FETCH_APPLICATIONS_SUMMARY_SUCCESS,
  FETCH_APPLICATIONS_SUCCESS,
  FETCH_APPLICATION_BY_ID_SUCCESS
}

export const actionCreators = {
//   increment: createAction(INCREMENT),
//   decrement: createAction(DECREMENT)
}

export const initialState = {
  application: '',
  applicationSummary: '',
  applicationbyId: ''
 }

export default handleActions(
  {
    [FETCH_APPLICATIONS_SUMMARY_SUCCESS]: (state, action) => ({
      ...state,
      applicationSummary: action.payload
    }),
    [FETCH_APPLICATIONS_SUCCESS]: (state, action) => ({
      ...state,
      application: action.payload
    }),
    [FETCH_APPLICATION_BY_ID_SUCCESS]: (state, action) => ({
      ...state,
      applicationbyId: action.payload
    })
  },
  initialState
)
