import {createAction, handleActions} from 'redux-actions'
import {
  FETCH_TASKS_SUCCESS,
  // UPDATE_TASK_SUCCESS,
  FETCH_TASK_PROPERTIES_SUCCESS
} from '../../sagas/task/taskSaga'
// Name Spaced Action Types
const SET_CURRENT_PAGE = 'tasksReducer/SET_CURRENT_PAGE'
const SET_ACTION_SETTINGS = 'tasksReducer/SET_ACTION_SETTINGS'
const RESET_RESPONSE = 'tasksReducer/RESET_RESPONSE'
const SET_PER_PAGE = 'tasksReducer/SET_PER_PAGE'

export const actions = {
  FETCH_TASKS_SUCCESS,
  SET_CURRENT_PAGE,
  SET_ACTION_SETTINGS,
  RESET_RESPONSE,
  SET_PER_PAGE
}

export const actionCreators = {
  setCurrentPage: createAction(SET_CURRENT_PAGE),
  setActionSettings: createAction(SET_ACTION_SETTINGS),
  resetResponse: createAction(RESET_RESPONSE),
  setPerPage: createAction(SET_PER_PAGE)
}

export const initialState = {
  tasks: '',
  currentPage: 1,
  perPage: 10,
  actionSettings: {
    isNotificationModalOpen: false,
    selectedTask: null,
    taskProperties: null
  },
  taskProperties: ''
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
      taskProperties: ''
    }),
    [FETCH_TASK_PROPERTIES_SUCCESS]: (state, action) => ({
      ...state,
      taskProperties: action.payload
    }),
    [SET_ACTION_SETTINGS]: (state, action) => ({
      ...state,
      actionSettings: action.payload
    })
  },
  initialState
)
