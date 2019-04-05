import axios from 'axios'
import { takeLatest, call, put } from 'redux-saga/effects'
import { createAction } from 'redux-actions'
import api from '../../../constants'

// // Saga action strings
export const FETCH_BUSINESSUNITS = 'saga/businessunits/FETCH_BUSINESSUNITS'
export const FETCH_BUSINESSUNITS_SUCCESS = 'saga/businessunits/FETCH_BUSINESSUNITS_SUCCESS'
export const FETCH_BUSINESSUNITS_FAILURE = 'saga/businessunits/FETCH_BUSINESSUNITS_FAILURE'
export const FETCH_BUSINESSUNITS_SUMMARY = 'saga/businessunits/FETCH_BUSINESSUNITS_SUMMARY'
export const FETCH_BUSINESSUNITS_SUMMARY_SUCCESS = 'saga/businesunits/FETCH_BUSINESSUNITS_SUMMARY_SUCCESS'
export const FETCH_BUSINESSUNITS_SUMMARY_FAILURE = 'saga/businessunits/FETCH_BUSINESSUNITS_SUMMARY_FAILURE'
export const FETCH_BUSINESSUNIT_BY_ID = 'saga/businessunits/FETCH_BUSINESSUNIT_BY_ID'
export const FETCH_BUSINESSUNIT_BY_ID_SUCCESS = 'saga/businessunits/FETCH_BUSINESSUNIT_BY_ID_SUCCESS'
export const FETCH_BUSINESSUNIT_BY_ID_FAILURE = 'saga/businessunits/FETCH_BUSINESSUNIT_BY_ID_FAILURE'
export const FETCH_BUSINESSUNIT_AGREEMENTS = 'saga/businessunits/FETCH_BUSINESSUNIT_AGREEMENTS'
export const FETCH_BUSINESSUNIT_AGREEMENTS_SUCCESS = 'saga/businessunits/FETCH_BUSINESSUNIT_AGREEMENTS_SUCCESS'
export const FETCH_BUSINESSUNIT_AGREEMENTS_FAILURE = 'saga/businessunits/FETCH_BUSINESSUNIT_AGREEMENTS_FAILURE'
export const FETCH_BUSINESSUNIT_ENTITLEMENTS = 'saga/businessunits/FETCH_BUSINESSUNIT_ENTITLEMENTS'
export const FETCH_BUSINESSUNIT_ENTITLEMENTS_SUCCESS = 'saga/businessunits/FETCH_BUSINESSUNIT_ENTITLEMENTS_SUCCESS'
export const FETCH_BUSINESSUNIT_ENTITLEMENTS_FAILURE = 'saga/businessunits/FETCH_BUSINESSUNIT_ENTITLEMENTS_FAILURE'
export const FETCH_BUSINESSOWNS_APPLICATIONS = 'saga/businessunits/FETCH_BUSINESSOWNS_APPLICATIONS'
export const FETCH_BUSINESSOWNS_APPLICATIONS_SUCCESS = 'saga/businessunits/FETCH_BUSINESSOWNS_APPLICATIONS_SUCCESS'
export const FETCH_BUSINESSOWNS_APPLICATIONS_FAILURE = 'saga/businessunits/FETCH_BUSINESSOWNS_APPLICATIONS_FAILURE'
export const FETCH_BUSINESSUSES_APPLICATIONS = 'saga/businessunits/FETCH_BUSINESSUSES_APPLICATIONS'
export const FETCH_BUSINESSUSES_APPLICATIONS_SUCCESS = 'saga/businessunits/FETCH_BUSINESSUSES_APPLICATIONS_SUCCESS'
export const FETCH_BUSINESSUSES_APPLICATIONS_FAILURE = 'saga/businessunits/FETCH_BUSINESSUSES_APPLICATIONS_FAILURE'
export const FETCH_COMPONENT_TYPE_COMPONENTS = 'saga/businessunits/FETCH_COMPONENT_TYPE_COMPONENTS'
export const FETCH_COMPONENT_TYPE_COMPONENTS_SUCCESS = 'saga/businessunits/FETCH_COMPONENT_TYPE_COMPONENTS_SUCCESS'
export const FETCH_COMPONENT_TYPE_COMPONENTS_FAILURE = 'saga/project/FETCH_COMPONENT_TYPE_COMPONENTS_FAILURE'
export const ADD_BUSINESSUNIT_ENTITLEMENTS = 'saga/businessunits/ADD_BUSINESSUNIT_ENTITLEMENTS'
export const ADD_BUSINESSUNIT_ENTITLEMENTS_SUCCESS = 'saga/businessunits/ADD_BUSINESSUNIT_ENTITLEMENTS_SUCCESS'
export const ADD_BUSINESSUNIT_ENTITLEMENTS_FAILURE = 'saga/businessunits/ADD_BUSINESSUNIT_ENTITLEMENTS_FAILURE'
export const UPDATE_BUSINESSUNIT_ENTITLEMENTS = 'saga/businessunits/UPDATE_BUSINESSUNIT_ENTITLEMENTS'
export const UPDATE_BUSINESSUNIT_ENTITLEMENTS_SUCCESS = 'saga/businessunits/UPDATE_BUSINESSUNIT_ENTITLEMENTS_SUCCESS'
export const UPDATE_BUSINESSUNIT_ENTITLEMENTS_FAILURE = 'saga/businessunits/UPDATE_BUSINESSUNIT_ENTITLEMENTS_FAILURE'
export const DELETE_BUSINESSUNIT_ENTITLEMENTS = 'saga/businessunits/DELETE_BUSINESSUNIT_ENTITLEMENTS'
export const DELETE_BUSINESSUNIT_ENTITLEMENTS_SUCCESS = 'saga/businessunits/DELETE_BUSINESSUNIT_ENTITLEMENTS_SUCCESS'
export const DELETE_BUSINESSUNIT_ENTITLEMENTS_FAILURE = 'saga/businessunits/DELETE_BUSINESSUNIT_ENTITLEMENTS_FAILURE'

export const actionCreators = {
  fetchBusinessUnits: createAction(FETCH_BUSINESSUNITS),
  fetchBusinessUnitsSuccess: createAction(FETCH_BUSINESSUNITS_SUCCESS),
  fetchBusinessUnitsFailure: createAction(FETCH_BUSINESSUNITS_FAILURE),
  fetchBusinessUnitsSummary: createAction(FETCH_BUSINESSUNITS_SUMMARY),
  fetchBusinessUnitsSummarySuccess: createAction(FETCH_BUSINESSUNITS_SUMMARY_SUCCESS),
  fetchBusinessUnitsSummaryFailure: createAction(FETCH_BUSINESSUNITS_SUMMARY_FAILURE),
  fetchBusinessUnitById: createAction(FETCH_BUSINESSUNIT_BY_ID),
  fetchBusinessUnitByIdSuccess: createAction(FETCH_BUSINESSUNIT_BY_ID_SUCCESS),
  fetchBusinessUnitByIdFailure: createAction(FETCH_BUSINESSUNIT_BY_ID_FAILURE),
  fetchBusinessUnitAgreements: createAction(FETCH_BUSINESSUNIT_AGREEMENTS),
  fetchBusinessUnitAgreementsSuccess: createAction(FETCH_BUSINESSUNIT_AGREEMENTS_SUCCESS),
  fetchBusinessUnitAgreementsFailure: createAction(FETCH_BUSINESSUNIT_AGREEMENTS_FAILURE),
  fetchBusinessUnitEntitlements: createAction(FETCH_BUSINESSUNIT_ENTITLEMENTS),
  fetchBusinessUnitEntitlementsSuccess: createAction(FETCH_BUSINESSUNIT_ENTITLEMENTS_SUCCESS),
  fetchBusinessUnitEntitlementsFailure: createAction(FETCH_BUSINESSUNIT_ENTITLEMENTS_FAILURE),
  fetchBusinessOwnsApplications: createAction(FETCH_BUSINESSOWNS_APPLICATIONS),
  fetchBusinessOwnsApplicationsSuccess: createAction(FETCH_BUSINESSOWNS_APPLICATIONS_SUCCESS),
  fetchBusinessOwnsApplicationsFailure: createAction(FETCH_BUSINESSOWNS_APPLICATIONS_FAILURE),
  fetchBusinessUsesApplications: createAction(FETCH_BUSINESSUSES_APPLICATIONS),
  fetchBusinessUsesApplicationsSuccess: createAction(FETCH_BUSINESSUSES_APPLICATIONS_SUCCESS),
  fetchBusinessUsesApplicationsFailure: createAction(FETCH_BUSINESSUSES_APPLICATIONS_FAILURE),
  fetchComponentTypeComponents: createAction(FETCH_COMPONENT_TYPE_COMPONENTS),
  fetchComponentTypeComponentsSuccess: createAction(FETCH_COMPONENT_TYPE_COMPONENTS_SUCCESS),
  fetchComponentTypeComponentsFailure: createAction(FETCH_COMPONENT_TYPE_COMPONENTS_FAILURE),
  addBusinessUnitEntitlements: createAction(ADD_BUSINESSUNIT_ENTITLEMENTS),
  addBusinessUnitEntitlementsSuccess: createAction(ADD_BUSINESSUNIT_ENTITLEMENTS_SUCCESS),
  addBusinessUnitEntitlementsFailure: createAction(ADD_BUSINESSUNIT_ENTITLEMENTS_FAILURE),
  updateBusinessUnitEntitlements: createAction(UPDATE_BUSINESSUNIT_ENTITLEMENTS),
  updateBusinessUnitEntitlementsSuccess: createAction(UPDATE_BUSINESSUNIT_ENTITLEMENTS_SUCCESS),
  updateBusinessUnitEntitlementsFailure: createAction(UPDATE_BUSINESSUNIT_ENTITLEMENTS_FAILURE),
  deleteBusinessUnitEntitlements: createAction(DELETE_BUSINESSUNIT_ENTITLEMENTS),
  deleteBusinessUnitEntitlementsSuccess: createAction(DELETE_BUSINESSUNIT_ENTITLEMENTS_SUCCESS),
  deleteBusinessUnitEntitlementsFailure: createAction(DELETE_BUSINESSUNIT_ENTITLEMENTS_FAILURE)
}

export default function * watchBusinessUnits () {
  yield [
      takeLatest(FETCH_BUSINESSUNITS, getBusinessUnits),
      takeLatest(FETCH_BUSINESSUNITS_SUMMARY, getBusinessUnitsSummary),
      takeLatest(FETCH_BUSINESSUNIT_BY_ID, getBusinessUnitById),
      takeLatest(FETCH_BUSINESSUNIT_AGREEMENTS, getBusinessUnitsAgreements),
      takeLatest(FETCH_BUSINESSUNIT_ENTITLEMENTS, getBusinessUnitsEntitlements),
      takeLatest(FETCH_BUSINESSOWNS_APPLICATIONS, getBusinessOwnsApplications),
      takeLatest(FETCH_BUSINESSUSES_APPLICATIONS, getBusinessUsesApplications),
      takeLatest(FETCH_COMPONENT_TYPE_COMPONENTS, getComponentTypeComponents),
      takeLatest(ADD_BUSINESSUNIT_ENTITLEMENTS, addBusinessUnitEntitlements),
      takeLatest(UPDATE_BUSINESSUNIT_ENTITLEMENTS, updateBusinessUnitEntitlements),
      takeLatest(DELETE_BUSINESSUNIT_ENTITLEMENTS, deleteBusinessUnitEntitlements)
  ]
}

export function * getBusinessUnits (action) {
  try {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('userAccessToken')
    const businessunits = yield call(
      axios.get,
      api.getBusinessUnits,
      {params: action.payload}
    )
    yield put(actionCreators.fetchBusinessUnitsSuccess(businessunits.data))
  } catch (error) {
    yield put(actionCreators.fetchBusinessUnitsFailure(error))
  }
}

export function * getBusinessUnitsSummary (action) {
  try {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('userAccessToken')
    const businessUnitsSummary = yield call(
      axios.get,
      api.getBusinessUnitsSummary,
      {params: action.payload}
    )
    yield put(actionCreators.fetchBusinessUnitsSummarySuccess(businessUnitsSummary.data))
  } catch (error) {
    yield put(actionCreators.fetchBusinessUnitsSummaryFailure(error))
  }
}

export function * getBusinessUnitsAgreements (action) {
  try {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('userAccessToken')
    const businessUnitAgreements = yield call(
      axios.get,
      api.getBusinessUnitAgreements,
      {params: action.payload}
    )
    yield put(actionCreators.fetchBusinessUnitAgreementsSuccess(businessUnitAgreements.data))
  } catch (error) {
    yield put(actionCreators.fetchBusinessUnitAgreementsFailure(error))
  }
}

export function * getBusinessUnitsEntitlements (action) {
  try {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('userAccessToken')
    const businessUnitEntitlements = yield call(
      axios.get,
      api.getBusinessUnitEntitlements,
      {params: action.payload}
    )
    yield put(actionCreators.fetchBusinessUnitEntitlementsSuccess(businessUnitEntitlements.data))
  } catch (error) {
    yield put(actionCreators.fetchBusinessUnitEntitlementsFailure(error))
  }
}

export function * getBusinessOwnsApplications (action) {
  try {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('userAccessToken')
    const businessOwnsApplications = yield call(
      axios.get,
      api.getBusinessUnitOwnsApplications,
      {params: action.payload}
    )
    yield put(actionCreators.fetchBusinessOwnsApplicationsSuccess(businessOwnsApplications.data))
  } catch (error) {
    yield put(actionCreators.fetchBusinessOwnsApplicationsFailure(error))
  }
}

export function * getBusinessUsesApplications (action) {
  try {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('userAccessToken')
    const businessUsesApplications = yield call(
      axios.get,
      api.getBusinessUnitUsesApplications,
      {params: action.payload}
    )
    yield put(actionCreators.fetchBusinessUsesApplicationsSuccess(businessUsesApplications.data))
  } catch (error) {
    yield put(actionCreators.fetchBusinessUsesApplicationsFailure(error))
  }
}

export function * getBusinessUnitById (action) {
  try {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('userAccessToken')
    const project = yield call(
      axios.get,
      api.getBusinessUnit,
      {params: action.payload}
    )
    yield put(actionCreators.fetchBusinessUnitByIdSuccess(project.data))
  } catch (error) {
    yield put(actionCreators.fetchBusinessUnitByIdFailure(error))
  }
}

export function * getComponentTypeComponents (action) {
  try {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('userAccessToken')
    const componentTypes = yield call(
      axios.get,
      api.getComponentTypeComponents(action.payload)
      // {params: action.payload}
    )
    yield put(actionCreators.fetchComponentTypeComponentsSuccess(componentTypes.data))
  } catch (error) {
    yield put(actionCreators.fetchComponentTypeComponentsFailure(error))
  }
}

export function * addBusinessUnitEntitlements (action) {
  try {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('userAccessToken')
    const addBusinessUnitEntitlements = yield call(
      axios.patch,
      api.updateBusinessUnitEntitlements(action.payload.businessUnitId),
      action.payload.data
    )
    yield put(actionCreators.addBusinessUnitEntitlementsSuccess(addBusinessUnitEntitlements.data))
  } catch (error) {
    yield put(actionCreators.addBusinessUnitEntitlementsFailure(error))
  }
}

export function * updateBusinessUnitEntitlements (action) {
  try {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('userAccessToken')
    const updateBusinessUnitEntitlements = yield call(
      axios.patch,
      api.updateBusinessUnitEntitlements(action.payload.businessUnitId),
      action.payload.data
    )
    yield put(actionCreators.updateBusinessUnitEntitlementsSuccess(updateBusinessUnitEntitlements.data))
  } catch (error) {
    yield put(actionCreators.updateBusinessUnitEntitlementsFailure(error))
  }
}

export function * deleteBusinessUnitEntitlements (action) {
  try {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('userAccessToken')
    const deleteBusinessUnitEntitlements = yield call(
      axios.patch,
      api.updateBusinessUnitEntitlements(action.payload.businessUnitId),
      action.payload.data
    )
    yield put(actionCreators.deleteBusinessUnitEntitlementsSuccess(deleteBusinessUnitEntitlements.data))
  } catch (error) {
    yield put(actionCreators.deleteBusinessUnitEntitlementsFailure(error))
  }
}
