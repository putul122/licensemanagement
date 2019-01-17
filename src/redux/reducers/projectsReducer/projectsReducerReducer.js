import { createAction, handleActions } from 'redux-actions'
import { FETCH_PROJECTS_SUMMARY_SUCCESS } from '../../sagas/project/projectSaga'
// import { CREATE_USER_SUCCESS } from '../../sagas/signUp/signUpSaga'
// Name Spaced Action Types
const SET_DELETE_PROJECT_MODAL_OPEN_STATUS = 'ProjectsReducer/SET_DELETE_PROJECT_MODAL_OPEN_STATUS'
// const SET_CREATE_USER_PROCESS_STATUS = 'BasicReducer/SET_CREATE_USER_PROCESS_STATUS'

export const actions = {
//   CREATE_USER_SUCCESS,
  FETCH_PROJECTS_SUMMARY_SUCCESS,
  SET_DELETE_PROJECT_MODAL_OPEN_STATUS
}

export const actionCreators = {
  setDeleteProjectModalStatus: createAction(SET_DELETE_PROJECT_MODAL_OPEN_STATUS)
}

export const initialState = {
  modalDeleteProjectIsOpen: false,
  projectsSummary: ''
}

export default handleActions(
  {
    [SET_DELETE_PROJECT_MODAL_OPEN_STATUS]: (state, action) => ({
      ...state,
      modalDeleteProjectIsOpen: action.payload
    }),
    [FETCH_PROJECTS_SUMMARY_SUCCESS]: (state, action) => ({
      ...state,
      projectsSummary: action.payload
    })
  },
  initialState
)
