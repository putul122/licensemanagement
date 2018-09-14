import { createAction, handleActions } from 'redux-actions'
import {FETCH_SUPPLIERS_SUCCESS, FETCH_SUPPLIERS_SUMMARY_SUCCESS} from '../../sagas/supplier/supplierSaga'
// Name Spaced Action Types
// const SOME_ACTION = 'DashboardReducer/SOME_ACTION'
const SET_CURRENT_PAGE = 'SuppliersReducer/SET_CURRENT_PAGE'

export const actions = {
    FETCH_SUPPLIERS_SUCCESS,
    FETCH_SUPPLIERS_SUMMARY_SUCCESS,
    SET_CURRENT_PAGE
}

export const actionCreators = {
    setCurrentPage: createAction(SET_CURRENT_PAGE)
}

export const initialState = {
  suppliers: '',
  suppliersSummary: '',
  currentPage: 1
}

export default handleActions(
  {
    [FETCH_SUPPLIERS_SUCCESS]: (state, action) => ({
        ...state,
        suppliers: action.payload
    }),
    [FETCH_SUPPLIERS_SUMMARY_SUCCESS]: (state, action) => ({
      ...state,
      suppliersSummary: action.payload
    }),
    [SET_CURRENT_PAGE]: (state, action) => ({
    ...state,
    currentPage: action.payload
    })
  },
  initialState
)
