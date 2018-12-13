import axios from 'axios'
import { takeLatest, call, put } from 'redux-saga/effects'
import { createAction } from 'redux-actions'
import api from '../../../constants'

// Saga action strings
export const FETCH_AGREEMENTS = 'saga/agreement/FETCH_AGREEMENTS'
export const FETCH_AGREEMENTS_SUCCESS = 'saga/agreement/FETCH_AGREEMENTS_SUCCESS'
export const FETCH_AGREEMENTS_FAILURE = 'saga/agreement/FETCH_AGREEMENTS_FAILURE'
export const FETCH_AGREEMENTS_SUMMARY = 'saga/agreement/FETCH_AGREEMENTS_SUMMARY'
export const FETCH_AGREEMENTS_SUMMARY_SUCCESS = 'saga/agreement/FETCH_AGREEMENTS_SUMMARY_SUCCESS'
export const FETCH_AGREEMENTS_SUMMARY_FAILURE = 'saga/agreement/FETCH_AGREEMENTS_SUMMARY_FAILURE'
export const FETCH_AGREEMENT_BY_ID = 'saga/agreement/FETCH_AGREEMENT_BY_ID'
export const FETCH_AGREEMENT_BY_ID_SUCCESS = 'saga/agreement/FETCH_AGREEMENT_BY_ID_SUCCESS'
export const FETCH_AGREEMENT_BY_ID_FAILURE = 'saga/agreement/FETCH_AGREEMENT_BY_ID_FAILURE'
export const FETCH_AGREEMENT_ENTITLEMENTS = 'saga/agreement/FETCH_AGREEMENT_ENTITLEMENTS'
export const FETCH_AGREEMENT_ENTITLEMENTS_SUCCESS = 'saga/agreement/FETCH_AGREEMENT_ENTITLEMENTS_SUCCESS'
export const FETCH_AGREEMENT_ENTITLEMENTS_FAILURE = 'saga/agreement/FETCH_AGREEMENT_ENTITLEMENTS_FAILURE'
export const FETCH_AGREEMENT_PROPERTIES = 'saga/agreement/FETCH_AGREEMENT_PROPERTIES'
export const FETCH_AGREEMENT_PROPERTIES_SUCCESS = 'saga/agreement/FETCH_AGREEMENT_PROPERTIES_SUCCESS'
export const FETCH_AGREEMENT_PROPERTIES_FAILURE = 'saga/agreement/FETCH_AGREEMENT_PROPERTIES_FAILURE'
export const FETCH_AGREEMENT_RELATIONSHIPS = 'saga/agreement/FETCH_AGREEMENT_RELATIONSHIPS'
export const FETCH_AGREEMENT_RELATIONSHIPS_SUCCESS = 'saga/agreement/FETCH_AGREEMENT_RELATIONSHIPS_SUCCESS'
export const FETCH_AGREEMENT_RELATIONSHIPS_FAILURE = 'saga/agreement/FETCH_AGREEMENT_RELATIONSHIPS_FAILURE'
export const ADD_AGREEMENT = 'saga/agreement/ADD_AGREEMENT'
export const ADD_AGREEMENT_SUCCESS = 'saga/agreement/ADD_AGREEMENT_SUCCESS'
export const ADD_AGREEMENT_FAILURE = 'saga/agreement/ADD_AGREEMENT_FAILURE'
export const DELETE_AGREEMENT = 'saga/agreement/DELETE_AGREEMENT'
export const DELETE_AGREEMENT_SUCCESS = 'saga/agreement/DELETE_AGREEMENT_SUCCESS'
export const DELETE_AGREEMENT_FAILURE = 'saga/agreement/DELETE_AGREEMENT_FAILURE'
export const UPDATE_AGREEMENT = 'saga/agreement/UPDATE_AGREEMENT'
export const UPDATE_AGREEMENT_SUCCESS = 'saga/agreement/UPDATE_AGREEMENT_SUCCESS'
export const UPDATE_AGREEMENT_FAILURE = 'saga/agreement/UPDATE_AGREEMENT_FAILURE'
export const UPDATE_AGREEMENT_PROPERTIES = 'saga/agreement/UPDATE_AGREEMENT'
export const UPDATE_AGREEMENT_PROPERTIES_SUCCESS = 'saga/agreement/UPDATE_AGREEMENT_PROPERTIES_SUCCESS'
export const UPDATE_AGREEMENT_PROPERTIES_FAILURE = 'saga/agreement/UPDATE_AGREEMENT_PROPERTIES_FAILURE'
export const FETCH_RELATIONSHIP_PROPERTY = 'saga/agreement/FETCH_RELATIONSHIP_PROPERTY'
export const FETCH_RELATIONSHIP_PROPERTY_SUCCESS = 'saga/agreement/FETCH_RELATIONSHIP_PROPERTY_SUCCESS'
export const FETCH_RELATIONSHIP_PROPERTY_FAILURE = 'saga/agreement/FETCH_RELATIONSHIP_PROPERTY_FAILURE'
export const UPDATE_RELATIONSHIP_PROPERTY = 'saga/agreement/UPDATE_RELATIONSHIP_PROPERTY'
export const UPDATE_RELATIONSHIP_PROPERTY_SUCCESS = 'saga/agreement/UPDATE_RELATIONSHIP_PROPERTY_SUCCESS'
export const UPDATE_RELATIONSHIP_PROPERTY_FAILURE = 'saga/agreement/UPDATE_RELATIONSHIP_PROPERTY_FAILURE'
export const DELETE_COMPONENT_RELATIONSHIP = 'saga/agreement/DELETE_COMPONENT_RELATIONSHIP'
export const DELETE_COMPONENT_RELATIONSHIP_SUCCESS = 'saga/agreement/DELETE_COMPONENT_RELATIONSHIP_SUCCESS'
export const DELETE_COMPONENT_RELATIONSHIP_FAILURE = 'saga/agreement/DELETE_COMPONENT_RELATIONSHIP_FAILURE'
export const FETCH_COMPONENT_CONSTRAINTS = 'saga/agreement/FETCH_COMPONENT_CONSTRAINTS'
export const FETCH_COMPONENT_CONSTRAINTS_SUCCESS = 'saga/agreement/FETCH_COMPONENT_CONSTRAINTS_SUCCESS'
export const FETCH_COMPONENT_CONSTRAINTS_FAILURE = 'saga/agreement/FETCH_COMPONENT_CONSTRAINTS_FAILURE'
export const FETCH_COMPONENT_TYPE_COMPONENTS = 'saga/agreement/FETCH_COMPONENT_TYPE_COMPONENTS'
export const FETCH_COMPONENT_TYPE_COMPONENTS_SUCCESS = 'saga/agreement/FETCH_COMPONENT_TYPE_COMPONENTS_SUCCESS'
export const FETCH_COMPONENT_TYPE_COMPONENTS_FAILURE = 'saga/agreement/FETCH_COMPONENT_TYPE_COMPONENTS_FAILURE'
export const UPDATE_COMPONENT_TYPE_COMPONENT_RELATIONSHIPS = 'saga/agreement/UPDATE_COMPONENT_TYPE_COMPONENT_RELATIONSHIPS'
export const UPDATE_COMPONENT_TYPE_COMPONENT_RELATIONSHIPS_SUCCESS = 'saga/agreement/UPDATE_COMPONENT_TYPE_COMPONENT_RELATIONSHIPS_SUCCESS'
export const UPDATE_COMPONENT_TYPE_COMPONENT_RELATIONSHIPS_FAILURE = 'saga/agreement/UPDATE_COMPONENT_TYPE_COMPONENT_RELATIONSHIPS_FAILURE'

export const actionCreators = {
  fetchAgreements: createAction(FETCH_AGREEMENTS),
  fetchAgreementsSuccess: createAction(FETCH_AGREEMENTS_SUCCESS),
  fetchAgreementsFailure: createAction(FETCH_AGREEMENTS_FAILURE),
  fetchAgreementsSummary: createAction(FETCH_AGREEMENTS_SUMMARY),
  fetchAgreementsSummarySuccess: createAction(FETCH_AGREEMENTS_SUMMARY_SUCCESS),
  fetchAgreementsSummaryFailure: createAction(FETCH_AGREEMENTS_SUMMARY_FAILURE),
  fetchAgreementById: createAction(FETCH_AGREEMENT_BY_ID),
  fetchAgreementByIdSuccess: createAction(FETCH_AGREEMENT_BY_ID_SUCCESS),
  fetchAgreementByIdFailure: createAction(FETCH_AGREEMENT_BY_ID_FAILURE),
  fetchAgreementEntitlements: createAction(FETCH_AGREEMENT_ENTITLEMENTS),
  fetchAgreementEntitlementsSuccess: createAction(FETCH_AGREEMENT_ENTITLEMENTS_SUCCESS),
  fetchAgreementEntitlementsFailure: createAction(FETCH_AGREEMENT_ENTITLEMENTS_FAILURE),
  fetchAgreementProperties: createAction(FETCH_AGREEMENT_PROPERTIES),
  fetchAgreementPropertiesSuccess: createAction(FETCH_AGREEMENT_PROPERTIES_SUCCESS),
  fetchAgreementPropertiesFailure: createAction(FETCH_AGREEMENT_PROPERTIES_FAILURE),
  fetchAgreementRelationships: createAction(FETCH_AGREEMENT_RELATIONSHIPS),
  fetchAgreementRelationshipsSuccess: createAction(FETCH_AGREEMENT_RELATIONSHIPS_SUCCESS),
  fetchAgreementRelationshipsFailure: createAction(FETCH_AGREEMENT_RELATIONSHIPS_FAILURE),
  addAgreement: createAction(ADD_AGREEMENT),
  addAgreementSuccess: createAction(ADD_AGREEMENT_SUCCESS),
  addAgreementFailure: createAction(ADD_AGREEMENT_FAILURE),
  deleteAgreement: createAction(DELETE_AGREEMENT),
  deleteAgreementSuccess: createAction(DELETE_AGREEMENT_SUCCESS),
  deleteAgreementFailure: createAction(DELETE_AGREEMENT_FAILURE),
  updateAgreement: createAction(UPDATE_AGREEMENT),
  updateAgreementSuccess: createAction(UPDATE_AGREEMENT_SUCCESS),
  updateAgreementFailure: createAction(UPDATE_AGREEMENT_FAILURE),
  updateAgreementProperties: createAction(UPDATE_AGREEMENT_PROPERTIES),
  updateAgreementPropertiesSuccess: createAction(UPDATE_AGREEMENT_PROPERTIES_SUCCESS),
  updateAgreementPropertiesFailure: createAction(UPDATE_AGREEMENT_PROPERTIES_FAILURE),
  fetchRelationshipProperty: createAction(FETCH_RELATIONSHIP_PROPERTY),
  fetchRelationshipPropertySuccess: createAction(FETCH_RELATIONSHIP_PROPERTY_SUCCESS),
  fetchRelationshipPropertyFailure: createAction(FETCH_RELATIONSHIP_PROPERTY_FAILURE),
  updateRelationshipProperty: createAction(UPDATE_RELATIONSHIP_PROPERTY),
  updateRelationshipPropertySuccess: createAction(UPDATE_RELATIONSHIP_PROPERTY_SUCCESS),
  updateRelationshipPropertyFailure: createAction(UPDATE_RELATIONSHIP_PROPERTY_FAILURE),
  deleteComponentRelationship: createAction(DELETE_COMPONENT_RELATIONSHIP),
  deleteComponentRelationshipSuccess: createAction(DELETE_COMPONENT_RELATIONSHIP_SUCCESS),
  deleteComponentRelationshipFailure: createAction(DELETE_COMPONENT_RELATIONSHIP_FAILURE),
  fetchComponentConstraints: createAction(FETCH_COMPONENT_CONSTRAINTS),
  fetchComponentConstraintsSuccess: createAction(FETCH_COMPONENT_CONSTRAINTS_SUCCESS),
  fetchComponentConstraintsFailure: createAction(FETCH_COMPONENT_CONSTRAINTS_FAILURE),
  fetchComponentTypeComponents: createAction(FETCH_COMPONENT_TYPE_COMPONENTS),
  fetchComponentTypeComponentsSuccess: createAction(FETCH_COMPONENT_TYPE_COMPONENTS_SUCCESS),
  fetchComponentTypeComponentsFailure: createAction(FETCH_COMPONENT_TYPE_COMPONENTS_FAILURE),
  updateComponentTypeComponentRelationships: createAction(UPDATE_COMPONENT_TYPE_COMPONENT_RELATIONSHIPS),
  updateComponentTypeComponentRelationshipsSuccess: createAction(UPDATE_COMPONENT_TYPE_COMPONENT_RELATIONSHIPS_SUCCESS),
  updateComponentTypeComponentRelationshipsFailure: createAction(UPDATE_COMPONENT_TYPE_COMPONENT_RELATIONSHIPS_FAILURE)
}

export default function * watchAgreements () {
  yield [
    takeLatest(FETCH_AGREEMENTS, getAgreements),
    takeLatest(FETCH_AGREEMENTS_SUMMARY, getAgreementsSummary),
    takeLatest(FETCH_AGREEMENT_BY_ID, getAgreementById),
    takeLatest(FETCH_AGREEMENT_ENTITLEMENTS, getAgreementEntitlements),
    takeLatest(FETCH_AGREEMENT_PROPERTIES, getAgreementProperties),
    takeLatest(FETCH_AGREEMENT_RELATIONSHIPS, getAgreementRelationships),
    takeLatest(ADD_AGREEMENT, addAgreement),
    takeLatest(UPDATE_AGREEMENT, updateAgreementData),
    takeLatest(DELETE_AGREEMENT, deleteAgreement),
    takeLatest(UPDATE_AGREEMENT_PROPERTIES, updateAgreementProperties),
    takeLatest(FETCH_RELATIONSHIP_PROPERTY, getRelationshipProperty),
    takeLatest(UPDATE_RELATIONSHIP_PROPERTY, updateRelationshipProperty),
    takeLatest(DELETE_COMPONENT_RELATIONSHIP, deleteComponentRelationship),
    takeLatest(FETCH_COMPONENT_CONSTRAINTS, getComponentConstraints),
    takeLatest(FETCH_COMPONENT_TYPE_COMPONENTS, getComponentTypeComponents),
    takeLatest(UPDATE_COMPONENT_TYPE_COMPONENT_RELATIONSHIPS, updateComponentTypeComponentRelationships)
  ]
}

export function * getAgreements (action) {
  try {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('userAccessToken')
    const agreements = yield call(
      axios.get,
      api.getAgreements,
      {params: action.payload}
    )
    yield put(actionCreators.fetchAgreementsSuccess(agreements.data))
  } catch (error) {
    yield put(actionCreators.fetchAgreementsFailure(error))
  }
}

export function * getAgreementsSummary (action) {
  try {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('userAccessToken')
    const agreementsSummary = yield call(
      axios.get,
      api.getAgreementsSummary,
      {params: action.payload}
    )
    yield put(actionCreators.fetchAgreementsSummarySuccess(agreementsSummary.data))
  } catch (error) {
    yield put(actionCreators.fetchAgreementsSummaryFailure(error))
  }
}

export function * getAgreementById (action) {
  try {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('userAccessToken')
    const agreement = yield call(
      axios.get,
      api.getAgreement,
      {params: action.payload}
    )
    yield put(actionCreators.fetchAgreementByIdSuccess(agreement.data))
  } catch (error) {
    yield put(actionCreators.fetchAgreementByIdFailure(error))
  }
}

export function * getAgreementEntitlements (action) {
  try {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('userAccessToken')
    const agreementEntitlements = yield call(
      axios.get,
      api.getAgreementEntitlements,
      {params: action.payload}
    )
    yield put(actionCreators.fetchAgreementEntitlementsSuccess(agreementEntitlements.data))
  } catch (error) {
    yield put(actionCreators.fetchAgreementEntitlementsFailure(error))
  }
}

export function * getAgreementProperties (action) {
  try {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('userAccessToken')
    const agreementProperties = yield call(
      axios.get,
      api.getAgreementProperties(action.payload.agreement_id)
    )
    yield put(actionCreators.fetchAgreementPropertiesSuccess(agreementProperties.data))
  } catch (error) {
    yield put(actionCreators.fetchAgreementPropertiesFailure(error))
  }
}

export function * getAgreementRelationships (action) {
  try {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('userAccessToken')
    const agreementRelationships = yield call(
      axios.get,
      api.getAgreementRelationships(action.payload.agreement_id)
    )
    yield put(actionCreators.fetchAgreementRelationshipsSuccess(agreementRelationships.data))
  } catch (error) {
    yield put(actionCreators.fetchAgreementRelationshipsFailure(error))
  }
}

export function * addAgreement (action) {
  try {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('userAccessToken')
    const agreement = yield call(
      axios.post,
      api.addAgreement,
      action.payload
    )
    yield put(actionCreators.addAgreementSuccess(agreement.data))
  } catch (error) {
    yield put(actionCreators.addAgreementFailure(error))
  }
}

export function * updateAgreementData (action) {
  try {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('userAccessToken')
    const agreement = yield call(
      axios.patch,
      api.updateComponent(action.payload),
      action.payload.agreement
    )
    yield put(actionCreators.updateAgreementSuccess(agreement.data))
  } catch (error) {
    yield put(actionCreators.updateAgreementFailure(error))
  }
}

export function * deleteAgreement (action) {
  try {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('userAccessToken')
    const deleteAgreement = yield call(
      axios.delete,
      api.deleteAgreement(action.payload.id)
     )
    yield put(actionCreators.deleteAgreementSuccess(deleteAgreement.data))
  } catch (error) {
    yield put(actionCreators.deleteAgreementFailure(error))
  }
}

export function * updateAgreementProperties (action) {
  try {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('userAccessToken')
    const agreementProperty = yield call(
      axios.patch,
      api.updateAgreementProperties(action.payload),
      action.payload.property
    )
    yield put(actionCreators.updateAgreementPropertiesSuccess(agreementProperty.data))
  } catch (error) {
    yield put(actionCreators.updateAgreementPropertiesFailure(error))
  }
}

export function * getRelationshipProperty (action) {
  try {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('userAccessToken')
    const viewRelationship = yield call(
      axios.get,
      api.viewComponentRelationship(action.payload)
      // action.payload
     )
    yield put(actionCreators.fetchRelationshipPropertySuccess(viewRelationship.data))
  } catch (error) {
    yield put(actionCreators.fetchRelationshipPropertyFailure(error))
  }
}

export function * updateRelationshipProperty (action) {
  try {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('userAccessToken')
    const updateRelationship = yield call(
      axios.patch,
      api.viewComponentRelationship(action.payload),
      action.payload.payloadData
     )
    yield put(actionCreators.updateRelationshipPropertySuccess(updateRelationship.data))
  } catch (error) {
    yield put(actionCreators.updateRelationshipPropertyFailure(error))
  }
}

export function * deleteComponentRelationship (action) {
  try {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('userAccessToken')
    const deleteRelationship = yield call(
      axios.delete,
      api.deleteRelationship(action.payload),
      {params: action.payload.deletePayload}
      )
    yield put(actionCreators.deleteComponentRelationshipSuccess(deleteRelationship.data))
  } catch (error) {
    yield put(actionCreators.deleteComponentRelationshipFailure(error))
  }
}

export function * getComponentConstraints (action) {
  try {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('userAccessToken')
    const componentTypes = yield call(
      axios.get,
      api.getComponentConstraints(action.payload.id)
    )
    yield put(actionCreators.fetchComponentConstraintsSuccess(componentTypes.data))
  } catch (error) {
    yield put(actionCreators.fetchComponentConstraintsFailure(error))
  }
}

export function * getComponentTypeComponents (action) {
  try {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('userAccessToken')
    const componentTypes = yield call(
      axios.get,
      api.getComponentTypeComponents(action.payload.componentTypeId)
      // {params: action.payload}
    )
    yield put(actionCreators.fetchComponentTypeComponentsSuccess(componentTypes.data))
  } catch (error) {
    yield put(actionCreators.fetchComponentTypeComponentsFailure(error))
  }
}

export function * updateComponentTypeComponentRelationships (action) {
  try {
    console.log('relation saga action', action)
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('userAccessToken')
    const componentTypes = yield call(
      axios.patch,
      api.updateComponentRelationships(action.payload),
      action.payload.relationship
      // {params: action.payload}
    )
    yield put(actionCreators.updateComponentTypeComponentRelationshipsSuccess(componentTypes.data))
  } catch (error) {
    yield put(actionCreators.updateComponentTypeComponentRelationshipsFailure(error))
  }
}
