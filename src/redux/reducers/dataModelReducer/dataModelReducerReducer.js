import { createAction, handleActions } from 'redux-actions'
// Name Spaced Action Types
const SET_ZOOM_STATUS = 'DataModelReducer/SET_ZOOM_STATUS'

export const actions = {
  SET_ZOOM_STATUS
}

export const actionCreators = {
  setZoomStatus: createAction(SET_ZOOM_STATUS)
}

export const initialState = {
//   startNode: '',
//   relationships: '',
  zoomStatus: null
}

export default handleActions(
  {
    [SET_ZOOM_STATUS]: (state, action) => ({
        ...state,
        zoomStatus: action.payload
    })
  },
  initialState
)
