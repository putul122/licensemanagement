import { createAction, handleActions } from 'redux-actions'
import {
  FETCH_DISCUSSIONS_SUCCESS,
  FETCH_DISCUSSION_MESSAGES_SUCCESS,
  FETCH_ACCOUNT_ARTEFACTS_SUCCESS,
  FETCH_MODEL_ARTEFACTS_SUCCESS,
  REPLY_DISCUSSION_MESSAGES_SUCCESS
} from '../../sagas/discussion/discussionSaga'

// Name Spaced Action Types
const SET_QUICKSLIDE_DISCUSSION = 'DiscussionReducer/SET_QUICKSLIDE_DISCUSSION'
const SET_DISCUSSION_ID = 'DiscussionReducer/SET_DISCUSSION_ID'
const SET_FORMATTED_ACCOUNT_DATA = 'DiscussionReducer/SET_FORMATTED_ACCOUNT_DATA'
const SET_FORMATTED_MODEL_DATA = 'DiscussionReducer/SET_FORMATTED_MODEL_DATA'
const SET_MESSAGE_DATA = 'DiscussionReducer/SET_MESSAGE_DATA'
const SET_REPLY_SETTINGS = 'DiscussionReducer/SET_REPLY_SETTINGS'
const SET_ACCORDIAN_OPEN_FLAG = 'DiscussionReducer/SET_ACCORDIAN_OPEN_FLAG'

export const actions = {
  SET_QUICKSLIDE_DISCUSSION,
  FETCH_DISCUSSIONS_SUCCESS,
  FETCH_DISCUSSION_MESSAGES_SUCCESS,
  SET_DISCUSSION_ID,
  SET_FORMATTED_ACCOUNT_DATA,
  SET_FORMATTED_MODEL_DATA,
  SET_MESSAGE_DATA,
  SET_REPLY_SETTINGS,
  REPLY_DISCUSSION_MESSAGES_SUCCESS,
  SET_ACCORDIAN_OPEN_FLAG
}

export const actionCreators = {
  setQuickslideDiscussion: createAction(SET_QUICKSLIDE_DISCUSSION),
  setDiscussionId: createAction(SET_DISCUSSION_ID),
  setFormattedAccountData: createAction(SET_FORMATTED_ACCOUNT_DATA),
  setFormattedModelData: createAction(SET_FORMATTED_MODEL_DATA),
  setMessageData: createAction(SET_MESSAGE_DATA),
  setReplySettings: createAction(SET_REPLY_SETTINGS),
  setAccordianOpenFlag: createAction(SET_ACCORDIAN_OPEN_FLAG)
}

export const initialState = {
  discussionSlide: 'm-quick-sidebar--off',
  hideSlideAction: false,
  discussions: '',
  discussionMessages: '',
  discussionId: '',
  isAccordianOpen: false,
  artefactAccounts: '',
  artefactModels: '',
  formattedAccounts: '',
  formattedModels: '',
  formattedTags: [{id: 1, display: '...'}],
  newMessage: '',
  replySettings: {
    isModalOpen: false,
    selectedMessage: '',
    messageReply: '',
    tags: [{id: 1, display: '...'}]
  },
  createMessageResponse: ''
}

export default handleActions(
  {
    [SET_QUICKSLIDE_DISCUSSION]: (state, action) => ({
      ...state,
      discussionSlide: action.payload
    }),
    [FETCH_DISCUSSIONS_SUCCESS]: (state, action) => ({
      ...state,
      discussions: action.payload
    }),
    [FETCH_DISCUSSION_MESSAGES_SUCCESS]: (state, action) => ({
      ...state,
      discussionMessages: action.payload
    }),
    [SET_DISCUSSION_ID]: (state, action) => ({
      ...state,
      discussionId: action.payload
    }),
    [FETCH_ACCOUNT_ARTEFACTS_SUCCESS]: (state, action) => ({
      ...state,
      artefactAccounts: action.payload
    }),
    [FETCH_MODEL_ARTEFACTS_SUCCESS]: (state, action) => ({
      ...state,
      artefactModels: action.payload
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
    }),
    [SET_REPLY_SETTINGS]: (state, action) => ({
      ...state,
      replySettings: action.payload
    }),
    [REPLY_DISCUSSION_MESSAGES_SUCCESS]: (state, action) => ({
      ...state,
      createMessageResponse: action.payload
    }),
    [SET_ACCORDIAN_OPEN_FLAG]: (state, action) => ({
      ...state,
      isAccordianOpen: action.payload
    })
  },
  initialState
)
