import { createAction, handleActions } from 'redux-actions'
import {
    CREATE_DISCUSSION_SUCCESS,
    FETCH_ACCOUNT_ARTEFACTS_SUCCESS,
    FETCH_MODEL_ARTEFACTS_SUCCESS
} from '../../sagas/discussion/discussionSaga'

// Name Spaced Action Types
const SET_DISCUSSION_MODAL_OPEN_STATUS = 'NewDiscussionReducer/SET_DISCUSSION_MODAL_OPEN_STATUS'
const SET_FORMATTED_ACCOUNT_DATA = 'NewDiscussionReducer/SET_FORMATTED_ACCOUNT_DATA'
const SET_FORMATTED_MODEL_DATA = 'NewDiscussionReducer/SET_FORMATTED_MODEL_DATA'
const SET_MESSAGE_DATA = 'NewDiscussionReducer/SET_MESSAGE_DATA'
const RESET_CREATE_DISCUSSION_RESPONSE = 'NewDiscussionReducer/RESET_CREATE_DISCUSSION_RESPONSE'

export const actions = {
    SET_DISCUSSION_MODAL_OPEN_STATUS,
    FETCH_ACCOUNT_ARTEFACTS_SUCCESS,
    FETCH_MODEL_ARTEFACTS_SUCCESS,
    SET_FORMATTED_ACCOUNT_DATA,
    SET_FORMATTED_MODEL_DATA,
    SET_MESSAGE_DATA,
    CREATE_DISCUSSION_SUCCESS
}

export const actionCreators = {
    setDiscussionModalOpenStatus: createAction(SET_DISCUSSION_MODAL_OPEN_STATUS),
    setFormattedAccountData: createAction(SET_FORMATTED_ACCOUNT_DATA),
    setFormattedModelData: createAction(SET_FORMATTED_MODEL_DATA),
    setMessageData: createAction(SET_MESSAGE_DATA),
    resetCreateDiscussionResponse: createAction(RESET_CREATE_DISCUSSION_RESPONSE)
}

export const initialState = {
    isDiscussionModalOpen: false,
    accountArtefactsData: '',
    modelArtefactsData: '',
    formattedAccounts: '',
    formattedModels: '',
    formattedTags: [{id: 1, display: '...'}],
    newMessage: '',
    createDiscussionResponse: ''
}

export default handleActions(
  {
    [SET_DISCUSSION_MODAL_OPEN_STATUS]: (state, action) => ({
        ...state,
        isDiscussionModalOpen: action.payload
    }),
    [CREATE_DISCUSSION_SUCCESS]: (state, action) => ({
        ...state,
        createDiscussionResponse: action.payload
    }),
    [RESET_CREATE_DISCUSSION_RESPONSE]: (state, action) => ({
        ...state,
        createDiscussionResponse: ''
    }),
    [FETCH_ACCOUNT_ARTEFACTS_SUCCESS]: (state, action) => ({
        ...state,
        accountArtefactsData: action.payload
    }),
    [FETCH_MODEL_ARTEFACTS_SUCCESS]: (state, action) => ({
        ...state,
        modelArtefactsData: action.payload
    }),
    [SET_FORMATTED_ACCOUNT_DATA]: (state, action) => ({
        ...state,
        formattedAccounts: action.payload
    }),
    [SET_FORMATTED_MODEL_DATA]: (state, action) => ({
        ...state,
        formattedModels: action.payload
    }),
    [SET_MESSAGE_DATA]: (state, action) => ({
        ...state,
        newMessage: action.payload.message,
        formattedTags: action.payload.tags
    })
  },
  initialState
)
