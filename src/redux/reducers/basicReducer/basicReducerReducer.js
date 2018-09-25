import { createAction, handleActions } from 'redux-actions'
import { FETCH_CLIENT_ACCESS_TOKEN_SUCCESS, FETCH_USER_AUTHENTICATION_SUCCESS } from '../../sagas/basic/basicSaga'
// Name Spaced Action Types
const INCREMENT = 'BasicReducer/INCREMENT'
const DECREMENT = 'BasicReducer/DECREMENT'
const SET_TABLE_OPEN_STATUS = 'BasicReducer/SET_TABLE_OPEN_STATUS'
const SET_MODAL_OPEN_STATUS = 'BasicReducer/SET_MODAL_OPEN_STATUS'
export const actions = {
  INCREMENT,
  DECREMENT,
  FETCH_CLIENT_ACCESS_TOKEN_SUCCESS,
  FETCH_USER_AUTHENTICATION_SUCCESS,
  SET_TABLE_OPEN_STATUS,
  SET_MODAL_OPEN_STATUS
}

export const actionCreators = {
  increment: createAction(INCREMENT),
  decrement: createAction(DECREMENT),
  setTableOpenStatus: createAction(SET_TABLE_OPEN_STATUS),
  setModalOpenStatus: createAction(SET_MODAL_OPEN_STATUS)
}

export const initialState = {
  tableIsOpen: false,
  modalIsOpen: false,
  count: 0,
  string: 'string',
  clientAccessToken: '',
  // client_id: 'eco_conductor_web_ui',
  client_id: 'telkom_eco_web_ui',
  // client_secret: 'Pm41WXE9WU4nVCVdTDlVdUh5PE4iS1dbO1VFNi1ZTnGMzX0pBVDdSciszMkhfI3M4SEVbLQ',
  client_secret: 'SysHZjmhytHtZwQA4DRctXKU4TTvQajTu2zVANUU9PKmAUnC2gnMUfRxNpbXHJdu',
  authenticateUser: ''
}

export default handleActions(
  {
    [INCREMENT]: (state, action) => ({
      ...state,
      count: state.count + action.payload
    }),
    [DECREMENT]: (state, action) => ({
      ...state,
      count: state.count - action.payload
    }),
    [FETCH_CLIENT_ACCESS_TOKEN_SUCCESS]: (state, action) => ({
      ...state,
      clientAccessToken: action.payload
    }),
    [FETCH_USER_AUTHENTICATION_SUCCESS]: (state, action) => ({
      ...state,
      authenticateUser: action.payload
    }),
    [SET_TABLE_OPEN_STATUS]: (state, action) => ({
      ...state,
      tableIsOpen: action.payload
    }),
    [SET_MODAL_OPEN_STATUS]: (state, action) => ({
      ...state,
      modalIsOpen: action.payload
    })
  },
  initialState
)
