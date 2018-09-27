import axios from 'axios'
import { takeLatest, call, put } from 'redux-saga/effects'
import { createAction } from 'redux-actions'
import api from '../../../constants'

// Saga action strings
export const FETCH_ENTITLEMENTS = 'saga/entitlement/FETCH_ENTITLEMENTS'
export const FETCH_ENTITLEMENTS_SUCCESS = 'saga/entitlement/FETCH_ENTITLEMENTS_SUCCESS'
export const FETCH_ENTITLEMENTS_FAILURE = 'saga/entitlement/FETCH_ENTITLEMENTS_FAILURE'
export const FETCH_ENTITLEMENTS_SUMMARY = 'saga/entitlement/FETCH_ENTITLEMENTS_SUMMARY'
export const FETCH_ENTITLEMENTS_SUMMARY_SUCCESS = 'saga/entitlement/FETCH_ENTITLEMENTS_SUMMARY_SUCCESS'
export const FETCH_ENTITLEMENTS_SUMMARY_FAILURE = 'saga/entitlement/FETCH_ENTITLEMENTS_SUMMARY_FAILURE'
export const FETCH_ENTITLEMENT_BY_ID = 'saga/entitlement/FETCH_ENTITLEMENT_BY_ID'
export const FETCH_ENTITLEMENT_BY_ID_SUCCESS = 'saga/entitlement/FETCH_ENTITLEMENT_BY_ID_SUCCESS'
export const FETCH_ENTITLEMENT_BY_ID_FAILURE = 'saga/entitlement/FETCH_ENTITLEMENT_BY_ID_FAILURE'
export const FETCH_ENTITLEMENT_PROPERTIES = 'saga/entitlement/FETCH_ENTITLEMENT_PROPERTIES'
export const FETCH_ENTITLEMENT_PROPERTIES_SUCCESS = 'saga/entitlement/FETCH_ENTITLEMENT_PROPERTIES_SUCCESS'
export const FETCH_ENTITLEMENT_PROPERTIES_FAILURE = 'saga/entitlement/FETCH_ENTITLEMENT_PROPERTIES_FAILURE'
export const FETCH_ENTITLEMENT_RELATIONSHIPS = 'saga/entitlement/FETCH_ENTITLEMENT_RELATIONSHIPS'
export const FETCH_ENTITLEMENT_RELATIONSHIPS_SUCCESS = 'saga/entitlement/FETCH_ENTITLEMENT_RELATIONSHIPS_SUCCESS'
export const FETCH_ENTITLEMENT_RELATIONSHIPS_FAILURE = 'saga/entitlement/FETCH_ENTITLEMENT_RELATIONSHIPS_FAILURE'
export const DELETE_ENTITLEMENT = 'saga/entitlement/DELETE_ENTITLEMENT'
export const DELETE_ENTITLEMENT_SUCCESS = 'saga/entitlement/DELETE_ENTITLEMENT_SUCCESS'
export const DELETE_ENTITLEMENT_FAILURE = 'saga/entitlement/DELETE_ENTITLEMENT_FAILURE'
export const UPDATE_ENTITLEMENT = 'saga/entitlement/UPDATE_ENTITLEMENT'
export const UPDATE_ENTITLEMENT_SUCCESS = 'saga/entitlement/UPDATE_ENTITLEMENT_SUCCESS'
export const UPDATE_ENTITLEMENT_FAILURE = 'saga/entitlement/UPDATE_ENTITLEMENT_FAILURE'
export const UPDATE_ENTITLEMENT_PROPERTIES = 'saga/entitlement/UPDATE_ENTITLEMENT_PROPERTIES'
export const UPDATE_ENTITLEMENT_PROPERTIES_SUCCESS = 'saga/entitlement/UPDATE_AGREEMENT_PROPERTIES_SUCCESS'
export const UPDATE_ENTITLEMENT_PROPERTIES_FAILURE = 'saga/entitlement/UPDATE_AGREEMENT_PROPERTIES_FAILURE'
export const ADD_ENTITLEMENT = 'saga/entitlement/ADD_ENTITLEMENT'
export const ADD_ENTITLEMENT_SUCCESS = 'saga/entitlement/ADD_ENTITLEMENT_SUCCESS'
export const ADD_ENTITLEMENT_FAILURE = 'saga/entitlement/ADD_ENTITLEMENT_FAILURE'

export const actionCreators = {
  fetchEntitlements: createAction(FETCH_ENTITLEMENTS),
  fetchEntitlementsSuccess: createAction(FETCH_ENTITLEMENTS_SUCCESS),
  fetchEntitlementsFailure: createAction(FETCH_ENTITLEMENTS_FAILURE),
  fetchEntitlementsSummary: createAction(FETCH_ENTITLEMENTS_SUMMARY),
  fetchEntitlementsSummarySuccess: createAction(FETCH_ENTITLEMENTS_SUMMARY_SUCCESS),
  fetchEntitlementsSummaryFailure: createAction(FETCH_ENTITLEMENTS_SUMMARY_FAILURE),
  fetchEntitlementById: createAction(FETCH_ENTITLEMENT_BY_ID),
  fetchEntitlementByIdSuccess: createAction(FETCH_ENTITLEMENT_BY_ID_SUCCESS),
  fetchEntitlementByIdFailure: createAction(FETCH_ENTITLEMENT_BY_ID_FAILURE),
  fetchEntitlementProperties: createAction(FETCH_ENTITLEMENT_PROPERTIES),
  fetchEntitlementPropertiesSuccess: createAction(FETCH_ENTITLEMENT_PROPERTIES_SUCCESS),
  fetchEntitlementPropertiesFailure: createAction(FETCH_ENTITLEMENT_PROPERTIES_FAILURE),
  fetchEntitlementRelationships: createAction(FETCH_ENTITLEMENT_RELATIONSHIPS),
  fetchEntitlementRelationshipsSuccess: createAction(FETCH_ENTITLEMENT_RELATIONSHIPS_SUCCESS),
  fetchEntitlementRelationshipsFailure: createAction(FETCH_ENTITLEMENT_RELATIONSHIPS_FAILURE),
  deleteEntitlement: createAction(DELETE_ENTITLEMENT),
  deleteEntitlementSuccess: createAction(DELETE_ENTITLEMENT_SUCCESS),
  deleteEntitlementFailure: createAction(DELETE_ENTITLEMENT_FAILURE),
  updateEntitlement: createAction(UPDATE_ENTITLEMENT),
  updateEntitlementSuccess: createAction(UPDATE_ENTITLEMENT_SUCCESS),
  updateEntitlementFailure: createAction(UPDATE_ENTITLEMENT_FAILURE),
  updateEntitlementProperties: createAction(UPDATE_ENTITLEMENT_PROPERTIES),
  updateEntitlementPropertiesSuccess: createAction(UPDATE_ENTITLEMENT_PROPERTIES_SUCCESS),
  updateEntitlementPropertiesFailure: createAction(UPDATE_ENTITLEMENT_PROPERTIES_FAILURE),
  addEntitlement: createAction(ADD_ENTITLEMENT),
  addEntitlementSuccess: createAction(ADD_ENTITLEMENT_SUCCESS),
  addEntitlementFailure: createAction(ADD_ENTITLEMENT_FAILURE)
}

export default function * watchEntitlements () {
  yield [
    takeLatest(FETCH_ENTITLEMENTS, getEntitlements),
    takeLatest(FETCH_ENTITLEMENTS_SUMMARY, getEntitlementsSummary),
    takeLatest(FETCH_ENTITLEMENT_BY_ID, getEntitlementById),
    takeLatest(FETCH_ENTITLEMENT_PROPERTIES, getEntitlementProperties),
    takeLatest(FETCH_ENTITLEMENT_RELATIONSHIPS, getEntitlementRelationships),
    takeLatest(DELETE_ENTITLEMENT, deleteEntitlement),
    takeLatest(UPDATE_ENTITLEMENT, updateEntitlementData),
    takeLatest(UPDATE_ENTITLEMENT_PROPERTIES, updateEntitlementProperties),
    takeLatest(ADD_ENTITLEMENT, addEntitlement)
  ]
}

export function * getEntitlements (action) {
  try {
    // axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('clientAccessToken')
    const entitlements = yield call(
      axios.get,
      api.getEntitlements,
      {params: action.payload}
    )
    yield put(actionCreators.fetchEntitlementsSuccess(entitlements.data))
  } catch (error) {
    yield put(actionCreators.fetchEntitlementsFailure(error))
  }
}

export function * getEntitlementsSummary (action) {
  try {
    // axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('clientAccessToken')
    const entitlementsSummary = yield call(
      axios.get,
      api.getEntitlementsSummary,
      {params: action.payload}
    )
    yield put(actionCreators.fetchEntitlementsSummarySuccess(entitlementsSummary.data))
  } catch (error) {
    yield put(actionCreators.fetchEntitlementsSummaryFailure(error))
  }
}

export function * getEntitlementById (action) {
  try {
    // axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('clientAccessToken')
    const entitlement = yield call(
      axios.get,
      api.getEntitlement,
      {params: action.payload}
    )
    yield put(actionCreators.fetchEntitlementByIdSuccess(entitlement.data))
  } catch (error) {
    yield put(actionCreators.fetchEntitlementByIdFailure(error))
  }
}

export function * getEntitlementProperties (action) {
  try {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('userAccessToken')
    const entitlementProperties = yield call(
      axios.get,
      api.getAgreementProperties(action.payload.entitlement_id)
    )
    yield put(actionCreators.fetchEntitlementPropertiesSuccess(entitlementProperties.data))
  } catch (error) {
    yield put(actionCreators.fetchEntitlementPropertiesFailure(error))
  }
}

export function * getEntitlementRelationships (action) {
  try {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('userAccessToken')
    const entitlementRelationships = yield call(
      axios.get,
      api.getAgreementRelationships(action.payload.entitlement_id)
    )
    yield put(actionCreators.fetchEntitlementRelationshipsSuccess(entitlementRelationships.data))
  } catch (error) {
    yield put(actionCreators.fetchEntitlementRelationshipsFailure(error))
  }
}

export function * deleteEntitlement (action) {
  try {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('userAccessToken')
    const deleteEntitlement = yield call(
      axios.delete,
      api.deleteAgreement(action.payload.id)
     )
    yield put(actionCreators.deleteEntitlementSuccess(deleteEntitlement.data))
  } catch (error) {
    yield put(actionCreators.deleteEntitlementFailure(error))
  }
}

export function * updateEntitlementData (action) {
  try {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('userAccessToken')
    const entitlement = yield call(
      axios.patch,
      api.updateComponent(action.payload),
      action.payload.entitlement
    )
    yield put(actionCreators.updateEntitlementSuccess(entitlement.data))
  } catch (error) {
    yield put(actionCreators.updateEntitlementFailure(error))
  }
}

export function * updateEntitlementProperties (action) {
  try {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('userAccessToken')
    const entitlementProperty = yield call(
      axios.patch,
      api.updateAgreementProperties(action.payload),
      action.payload.property
    )
    yield put(actionCreators.updateEntitlementPropertiesSuccess(entitlementProperty.data))
  } catch (error) {
    yield put(actionCreators.updateEntitlementPropertiesFailure(error))
  }
}

export function * addEntitlement (action) {
  try {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('userAccessToken')
    const entitlement = yield call(
      axios.post,
      api.addEntitlement,
      action.payload
    )
    yield put(actionCreators.addEntitlementSuccess(entitlement.data))
  } catch (error) {
    yield put(actionCreators.addEntitlementFailure(error))
  }
}
