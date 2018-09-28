import { createAction, handleActions } from 'redux-actions'
import { LOGIN_USER_SUCCESS, AUTO_LOGIN_USER_SUCCESS } from '../../sagas/login/loginSaga'
// Name Spaced Action Types
const SET_LOGIN_PROCESS_STATUS = 'BasicReducer/SET_LOGIN_PROCESS_STATUS'

export const actions = {
    LOGIN_USER_SUCCESS,
    SET_LOGIN_PROCESS_STATUS,
    AUTO_LOGIN_USER_SUCCESS
}

export const actionCreators = {
  setLoginProcessStatus: createAction(SET_LOGIN_PROCESS_STATUS)
}

export const initialState = {
  token: '',
  isLoggedin: localStorage.getItem('isLoggedin') ? localStorage.getItem('isLoggedin') : false,
  loggedInresponse: '',
  loginProcess: false
}

export default handleActions(
  {
    [LOGIN_USER_SUCCESS]: (state, action) => ({
        ...state,
        loggedInresponse: action.payload,
        isLoggedin: action.payload.error_code === null || false
    }),
    [AUTO_LOGIN_USER_SUCCESS]: (state, action) => ({
      ...state,
      loggedInresponse: action.payload
    }),
    [SET_LOGIN_PROCESS_STATUS]: (state, action) => ({
      ...state,
      loginProcess: action.payload
    })
  },
  initialState
)
