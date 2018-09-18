import {createAction, handleActions} from 'redux-actions'
import {FETCH_SOFTWARES_SUCCESS, FETCH_SOFTWARES_SUMMARY_SUCCESS} from '../../sagas/software/softwareSaga'
// Name Spaced Action Types
// const INCREMENT = 'BasicReducer/INCREMENT'
const SET_CURRENT_PAGE = 'softwaresReducer/SET_CURRENT_PAGE'
export const actions = {
FETCH_SOFTWARES_SUCCESS,
FETCH_SOFTWARES_SUMMARY_SUCCESS,
SET_CURRENT_PAGE
}

export const actionCreators = {
  setCurrentPage: createAction(SET_CURRENT_PAGE)
}

export const initialState = {
  software: '',
  softwareSummary: '',
  currentPage: 1

}

export default handleActions(
  {
    [FETCH_SOFTWARES_SUCCESS]: (state, action) => ({
      ...state,
      software: action.payload
    }),
    [FETCH_SOFTWARES_SUMMARY_SUCCESS]: (state, action) => ({
      ...state,
      softwareSummary: action.payload
    }),
    [SET_CURRENT_PAGE]: (state, action) => ({
      ...state,
      currentPage: action.payload
    })
  },
  initialState
)
