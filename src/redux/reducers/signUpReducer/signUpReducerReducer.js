import { createAction, handleActions } from 'redux-actions'
import { CREATE_USER_SUCCESS } from '../../sagas/signUp/signUpSaga'
// Name Spaced Action Types
const SET_CREATE_USER_PROCESS_STATUS = 'BasicReducer/SET_CREATE_USER_PROCESS_STATUS'

export const actions = {
  CREATE_USER_SUCCESS,
  SET_CREATE_USER_PROCESS_STATUS
}

export const actionCreators = {
  setCreateUserProcessStatus: createAction(SET_CREATE_USER_PROCESS_STATUS)
}

export const initialState = {
  token: '',
  isLoggedin: localStorage.getItem('isLoggedin') ? localStorage.getItem('isLoggedin') : false,
  createUserResponse: '',
  createUserProcess: false
}

export default handleActions(
  {
    [CREATE_USER_SUCCESS]: (state, action) => ({
        ...state,
        createUserResponse: action.payload,
        isLoggedin: action.payload.error_code === null || false
    }),
    [SET_CREATE_USER_PROCESS_STATUS]: (state, action) => ({
      ...state,
      createUserProcess: action.payload
    })
  },
  initialState
)
