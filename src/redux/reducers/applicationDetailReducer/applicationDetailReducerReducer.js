import { createAction, handleActions } from 'redux-actions'
import {FETCH_APPLICATIONS_SUMMARY_SUCCESS,
   FETCH_APPLICATIONS_SUCCESS,
   FETCH_APPLICATION_BY_ID_SUCCESS,
   // FETCH_APPLICATION_PROPERTIES_SUCCESS,
   FETCH_APPLICATION_RELATIONSHIPS_SUCCESS}
   from '../../sagas/application/applicationSaga'
import {
  FETCH_META_MODEL_PRESPECTIVE_SUCCESS,
  FETCH_COMPONENT_MODEL_PRESPECTIVES_SUCCESS
} from '../../sagas/model/modelSaga'
// Name Spaced Action Types
const SET_APPLICATION_PROPERTY = 'applicationDetailReducer/SET_APPLICATION_PROPERTY'
const SET_APPLICATION_RELATIONSHIP = 'applicationDetailReducer/SET_APPLICATION_RELATIONSHIP'
const SET_CURRENT_TAB = 'applicationDetailReducer/SET_CURRENT_TAB'
const RESET_RESPONSE = 'applicationDetailReducer/RESET_RESPONSE'
const SET_RESPONSE_PROCESSED = 'applicationDetailReducer/SET_RESPONSE_PROCESSED'
export const actions = {
  FETCH_APPLICATIONS_SUMMARY_SUCCESS,
  FETCH_APPLICATIONS_SUCCESS,
  FETCH_APPLICATION_BY_ID_SUCCESS,
  // FETCH_APPLICATION_PROPERTIES_SUCCESS,
  FETCH_APPLICATION_RELATIONSHIPS_SUCCESS,
  FETCH_META_MODEL_PRESPECTIVE_SUCCESS,
  FETCH_COMPONENT_MODEL_PRESPECTIVES_SUCCESS,
  SET_CURRENT_TAB,
  RESET_RESPONSE,
  SET_APPLICATION_PROPERTY,
  SET_APPLICATION_RELATIONSHIP,
  SET_RESPONSE_PROCESSED
}

export const actionCreators = {
  setCurrentTab: createAction(SET_CURRENT_TAB),
  resetResponse: createAction(RESET_RESPONSE),
  setApplicationProperty: createAction(SET_APPLICATION_PROPERTY),
  setApplicationRelationship: createAction(SET_APPLICATION_RELATIONSHIP),
  setResponseProcessed: createAction(SET_RESPONSE_PROCESSED)
}

export const initialState = {
  application: '',
  applicationSummary: '',
  applicationbyId: '',
  applicationProperties: [],
  metaModelPrespective: '',
  modelPrespective: '',
  // applicationProperties: '',
  responseProcessed: {
    metaModelPrespective: false,
    modelPrespective: false,
    applicationRelationships: false
  },
  applicationRelationships: '',
  applicationRelationshipData: '',
  showTabs: {
    'parentTab': 'Application',
    'showProperty': ' active show',
    'showRelationship': ''
  }
 }

export default handleActions(
  {
    [FETCH_APPLICATIONS_SUMMARY_SUCCESS]: (state, action) => ({
      ...state,
      applicationSummary: action.payload
    }),
    [FETCH_APPLICATIONS_SUCCESS]: (state, action) => ({
      ...state,
      application: action.payload
    }),
    [FETCH_APPLICATION_BY_ID_SUCCESS]: (state, action) => ({
      ...state,
      applicationbyId: action.payload
    }),
    // [FETCH_APPLICATION_PROPERTIES_SUCCESS]: (state, action) => ({
    //   ...state,
    //   applicationProperties: action.payload
    // }),
    [SET_CURRENT_TAB]: (state, action) => ({
      ...state,
      showTabs: action.payload
    }),
    [FETCH_APPLICATION_RELATIONSHIPS_SUCCESS]: (state, action) => ({
      ...state,
      applicationRelationships: action.payload
    }),
    [FETCH_META_MODEL_PRESPECTIVE_SUCCESS]: (state, action) => ({
      ...state,
      metaModelPrespective: action.payload
    }),
    [FETCH_COMPONENT_MODEL_PRESPECTIVES_SUCCESS]: (state, action) => ({
      ...state,
      modelPrespective: action.payload
    }),
    [RESET_RESPONSE]: (state, action) => ({
      ...state,
      modelPrespective: '',
      metaModelPrespective: ''
    }),
    [SET_APPLICATION_PROPERTY]: (state, action) => ({
      ...state,
      applicationProperties: action.payload
    }),
    [SET_APPLICATION_RELATIONSHIP]: (state, action) => ({
      ...state,
      applicationRelationshipData: action.payload
    }),
    [SET_RESPONSE_PROCESSED]: (state, action) => ({
      ...state,
      responseProcessed: action.payload
    })
  },
  initialState
)
