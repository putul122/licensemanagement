import {createAction, handleActions} from 'redux-actions'
import {
  FETCH_TASKS_SUCCESS
} from '../../sagas/task/taskSaga'
// Name Spaced Action Types
const SET_CURRENT_PAGE = 'templatesReducer/SET_CURRENT_PAGE'
const SET_ADD_TEMPLATE_SETTINGS = 'templatesReducer/SET_ADD_TEMPLATE_SETTINGS'
const RESET_RESPONSE = 'templatesReducer/RESET_RESPONSE'
const SET_PER_PAGE = 'templatesReducer/SET_PER_PAGE'

export const actions = {
  FETCH_TASKS_SUCCESS,
  SET_CURRENT_PAGE,
  SET_ADD_TEMPLATE_SETTINGS,
  RESET_RESPONSE,
  SET_PER_PAGE
}

export const actionCreators = {
  setCurrentPage: createAction(SET_CURRENT_PAGE),
  setAddTemplateSettings: createAction(SET_ADD_TEMPLATE_SETTINGS),
  resetResponse: createAction(RESET_RESPONSE),
  setPerPage: createAction(SET_PER_PAGE)
}

export const initialState = {
  tasks: '',
  currentPage: 1,
  perPage: 10
  // createTemplateResponse: ''
}

export default handleActions(
  {
    [SET_CURRENT_PAGE]: (state, action) => ({
      ...state,
      currentPage: action.payload
    }),
    [SET_PER_PAGE]: (state, action) => ({
      ...state,
      perPage: action.payload
    }),
    [FETCH_TASKS_SUCCESS]: (state, action) => ({
      ...state,
      tasks: action.payload
    }),
    [RESET_RESPONSE]: (state, action) => ({
      ...state,
      createTemplateResponse: ''
    })
  },
  initialState
)
