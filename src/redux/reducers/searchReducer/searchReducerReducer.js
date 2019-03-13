import { createAction, handleActions } from 'redux-actions'
import { SEARCH_ALL_SUCCESS } from '../../sagas/basic/basicSaga'
// Name Spaced Action Types
const SET_SEARCH_TEXT = 'searchReducer/SET_SEARCH_TEXT'
const SET_CURRENT_PAGE = 'searchReducer/SET_CURRENT_PAGE'
const SET_PER_PAGE = 'searchReducer/SET_PER_PAGE'
const RESET_RESPONSE = 'searchReducer/RESET_RESPONSE'
const SET_SEARCH_DATA = 'searchReducer/SET_SEARCH_DATA'

export const actions = {
  SET_SEARCH_TEXT,
  SEARCH_ALL_SUCCESS,
  SET_CURRENT_PAGE,
  SET_PER_PAGE,
  RESET_RESPONSE,
  SET_SEARCH_DATA
}

export const actionCreators = {
  setSearchText: createAction(SET_SEARCH_TEXT),
  setCurrentPage: createAction(SET_CURRENT_PAGE),
  setPerPage: createAction(SET_PER_PAGE),
  resetResponse: createAction(RESET_RESPONSE),
  setSearchData: createAction(SET_SEARCH_DATA)
}

export const initialState = {
  searchAllResponse: '',
  searchData: [],
  searchText: '',
  currentPage: 1,
  perPage: 5
}

export default handleActions(
  {
    [SEARCH_ALL_SUCCESS]: (state, action) => ({
      ...state,
      searchAllResponse: action.payload
    }),
    [SET_SEARCH_TEXT]: (state, action) => ({
      ...state,
      searchText: action.payload
    }),
    [SET_CURRENT_PAGE]: (state, action) => ({
      ...state,
      currentPage: action.payload
    }),
    [SET_PER_PAGE]: (state, action) => ({
      ...state,
      perPage: action.payload
    }),
    [RESET_RESPONSE]: (state, action) => ({
      ...state,
      searchAllResponse: ''
    }),
    [SET_SEARCH_DATA]: (state, action) => ({
      ...state,
      searchData: action.payload
    })
  },
  initialState
)
