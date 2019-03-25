import axios from 'axios'
import { takeLatest, call, put } from 'redux-saga/effects'
import { createAction } from 'redux-actions'
import api from '../../../constants'

// Saga action strings
export const FETCH_APPLICATIONS = 'saga/application/FETCH_APPLICATIONS'
export const FETCH_APPLICATIONS_SUCCESS = 'saga/application/FETCH_APPLICATIONS_SUCCESS'
export const FETCH_APPLICATIONS_FAILURE = 'saga/application/FETCH_APPLICATIONS_FAILURE'
export const FETCH_APPLICATIONS_SUMMARY = 'saga/application/FETCH_APPLICATIONS_SUMMARY'
export const FETCH_APPLICATIONS_SUMMARY_SUCCESS = 'saga/application/FETCH_APPLICATIONS_SUMMARY_SUCCESS'
export const FETCH_APPLICATIONS_SUMMARY_FAILURE = 'saga/application/FETCH_APPLICATIONS_SUMMARY_FAILURE'
export const FETCH_APPLICATION_BY_ID = 'saga/application/FETCH_APPLICATION_BY_ID'
export const FETCH_APPLICATION_BY_ID_SUCCESS = 'saga/application/FETCH_APPLICATION_BY_ID_SUCCESS'
export const FETCH_APPLICATION_BY_ID_FAILURE = 'saga/application/FETCH_APPLICATION_BY_ID_FAILURE'
export const FETCH_APPLICATION_PROPERTIES = 'saga/application/FETCH_APPLICATION_PROPERTIES'
export const FETCH_APPLICATION_PROPERTIES_SUCCESS = 'saga/application/FETCH_APPLICATION_PROPERTIES_SUCCESS'
export const FETCH_APPLICATION_PROPERTIES_FAILURE = 'saga/application/FETCH_APPLICATION_PROPERTIES_FAILURE'
export const FETCH_APPLICATION_RELATIONSHIPS = 'saga/application/FETCH_APPLICATION_RELATIONSHIPS'
export const FETCH_APPLICATION_RELATIONSHIPS_SUCCESS = 'saga/application/FETCH_APPLICATION_RELATIONSHIPS_SUCCESS'
export const FETCH_APPLICATION_RELATIONSHIPS_FAILURE = 'saga/application/FETCH_APPLICATION_RELATIONSHIPS_FAILURE'
export const FETCH_APPLICATION_SOFTWARES = 'saga/application/FETCH_APPLICATION_SOFTWARES'
export const FETCH_APPLICATION_SOFTWARES_SUCCESS = 'saga/application/FETCH_APPLICATION_SOFTWARES_SUCCESS'
export const FETCH_APPLICATION_SOFTWARES_FAILURE = 'saga/application/FETCH_APPLICATION_SOFTWARES_FAILURE'
export const FETCH_APPLICATION_ENTITLEMENTS = 'saga/application/FETCH_APPLICATION_ENTITLEMENTS'
export const FETCH_APPLICATION_ENTITLEMENTS_SUCCESS = 'saga/application/FETCH_APPLICATION_ENTITLEMENTS_SUCCESS'
export const FETCH_APPLICATION_ENTITLEMENTS_FAILURE = 'saga/application/FETCH_APPLICATION_ENTITLEMENTS_FAILURE'
export const ADD_LINK = 'saga/application/ADD_LINK'
export const ADD_LINK_SUCCESS = 'saga/application/ADD_LINK_SUCCESS'
export const ADD_LINK_FAILURE = 'saga/application/ADD_LINK_FAILURE'
export const UPDATE_LINK = 'saga/application/UPDATE_LINK'
export const UPDATE_LINK_SUCCESS = 'saga/application/UPDATE_LINK_SUCCESS'
export const UPDATE_LINK_FAILURE = 'saga/application/UPDATE_LINK_FAILURE'
export const DELETE_LINK = 'saga/application/DELETE_LINK'
export const DELETE_LINK_SUCCESS = 'saga/application/DELETE_LINK_SUCCESS'
export const DELETE_LINK_FAILURE = 'saga/application/DELETE_LINK_FAILURE'

export const actionCreators = {
  fetchApplications: createAction(FETCH_APPLICATIONS),
  fetchApplicationsSuccess: createAction(FETCH_APPLICATIONS_SUCCESS),
  fetchApplicationsFailure: createAction(FETCH_APPLICATIONS_FAILURE),
  fetchApplicationsSummary: createAction(FETCH_APPLICATIONS_SUMMARY),
  fetchApplicationsSummarySuccess: createAction(FETCH_APPLICATIONS_SUMMARY_SUCCESS),
  fetchApplicationsSummaryFailure: createAction(FETCH_APPLICATIONS_SUMMARY_FAILURE),
  fetchApplicationById: createAction(FETCH_APPLICATION_BY_ID),
  fetchApplicationByIdSuccess: createAction(FETCH_APPLICATION_BY_ID_SUCCESS),
  fetchApplicationByIdFailure: createAction(FETCH_APPLICATION_BY_ID_FAILURE),
  fetchApplicationProperties: createAction(FETCH_APPLICATION_PROPERTIES),
  fetchApplicationPropertiesSuccess: createAction(FETCH_APPLICATION_PROPERTIES_SUCCESS),
  fetchApplicationPropertiesFailure: createAction(FETCH_APPLICATION_PROPERTIES_FAILURE),
  fetchApplicationRelationships: createAction(FETCH_APPLICATION_RELATIONSHIPS),
  fetchApplicationRelationshipsSuccess: createAction(FETCH_APPLICATION_RELATIONSHIPS_SUCCESS),
  fetchApplicationRelationshipsFailure: createAction(FETCH_APPLICATION_RELATIONSHIPS_FAILURE),
  fetchApplicationSoftwares: createAction(FETCH_APPLICATION_SOFTWARES),
  fetchApplicationSoftwaresSuccess: createAction(FETCH_APPLICATION_SOFTWARES_SUCCESS),
  fetchApplicationSoftwaresFailure: createAction(FETCH_APPLICATION_SOFTWARES_FAILURE),
  fetchApplicationEntitlements: createAction(FETCH_APPLICATION_ENTITLEMENTS),
  fetchApplicationEntitlementsSuccess: createAction(FETCH_APPLICATION_ENTITLEMENTS_SUCCESS),
  fetchApplicationEntitlementsFailure: createAction(FETCH_APPLICATION_ENTITLEMENTS_FAILURE),
  addLink: createAction(ADD_LINK),
  addLinkSuccess: createAction(ADD_LINK_SUCCESS),
  addLinkFailure: createAction(ADD_LINK_FAILURE),
  updateLink: createAction(UPDATE_LINK),
  updateLinkSuccess: createAction(UPDATE_LINK_SUCCESS),
  updateLinkFailure: createAction(UPDATE_LINK_FAILURE),
  deleteLink: createAction(DELETE_LINK),
  deleteLinkSuccess: createAction(DELETE_LINK_SUCCESS),
  deleteLinkFailure: createAction(DELETE_LINK_FAILURE)
}

export default function * watchApplications () {
  yield [
    takeLatest(FETCH_APPLICATIONS, getApplications),
    takeLatest(FETCH_APPLICATIONS_SUMMARY, getApplicationsSummary),
    takeLatest(FETCH_APPLICATION_BY_ID, getApplicationById),
    takeLatest(FETCH_APPLICATION_PROPERTIES, getApplicationProperties),
    takeLatest(FETCH_APPLICATION_RELATIONSHIPS, getApplicationRelationships),
    takeLatest(FETCH_APPLICATION_SOFTWARES, getApplicationSoftwares),
    takeLatest(FETCH_APPLICATION_ENTITLEMENTS, getApplicationEntitlements),
    takeLatest(ADD_LINK, addLink),
    takeLatest(UPDATE_LINK, updateLink),
    takeLatest(DELETE_LINK, deleteLink)
  ]
}

export function * getApplicationProperties (action) {
  try {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('userAccessToken')
    const applicationProperties = yield call(
      axios.get,
      api.getApplicationProperties(action.payload.application_id)
    )
    yield put(actionCreators.fetchApplicationPropertiesSuccess(applicationProperties.data))
  } catch (error) {
    yield put(actionCreators.fetchApplicationPropertiesFailure(error))
  }
}

export function * getApplicationRelationships (action) {
  try {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('userAccessToken')
    const applicationRelationships = yield call(
      axios.get,
      api.getApplicationRelationships(action.payload.application_id)
    )
    yield put(actionCreators.fetchApplicationRelationshipsSuccess(applicationRelationships.data))
  } catch (error) {
    yield put(actionCreators.fetchApplicationRelationshipsFailure(error))
  }
}

export function * getApplications (action) {
  try {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('userAccessToken')
    const applications = yield call(
      axios.get,
      api.getApplications,
      {params: action.payload}
    )
    yield put(actionCreators.fetchApplicationsSuccess(applications.data))
  } catch (error) {
    yield put(actionCreators.fetchApplicationsFailure(error))
  }
}

export function * getApplicationsSummary (action) {
    try {
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('userAccessToken')
      const applicationsSummary = yield call(
        axios.get,
        api.getApplicationsSummary,
        {params: action.payload}
      )
      yield put(actionCreators.fetchApplicationsSummarySuccess(applicationsSummary.data))
    } catch (error) {
      yield put(actionCreators.fetchApplicationsSummaryFailure(error))
    }
  }

export function * getApplicationById (action) {
    try {
      const application = yield call(
        axios.get,
        api.getApplication,
        {params: action.payload}
      )
      yield put(actionCreators.fetchApplicationByIdSuccess(application.data))
    } catch (error) {
      yield put(actionCreators.fetchApplicationByIdFailure(error))
    }
  }

  export function * getApplicationSoftwares (action) {
    try {
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('userAccessToken')
      const applicationSoftwares = yield call(
        axios.get,
        api.getApplicationSoftwares,
        {params: action.payload}
      )
      yield put(actionCreators.fetchApplicationSoftwaresSuccess(applicationSoftwares.data))
    } catch (error) {
      yield put(actionCreators.fetchApplicationSoftwaresFailure(error))
    }
  }

  export function * getApplicationEntitlements (action) {
    try {
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('userAccessToken')
      const applicationEntitlements = yield call(
        axios.get,
        api.getApplicationEntitlements,
        {params: action.payload}
      )
      yield put(actionCreators.fetchApplicationEntitlementsSuccess(applicationEntitlements.data))
    } catch (error) {
      yield put(actionCreators.fetchApplicationEntitlementsFailure(error))
    }
  }

  export function * addLink (action) {
    try {
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('userAccessToken')
      let url = api.updateApplicationEntitlements
      if (action.payload.tab === 'Software') {
        url = api.updateApplicationSoftwares
      }
      const addLink = yield call(
        axios.patch,
        url(action.payload.applicationId),
        action.payload.data
      )
      yield put(actionCreators.addLinkSuccess(addLink.data))
    } catch (error) {
      yield put(actionCreators.addLinkFailure(error))
    }
  }

  export function * updateLink (action) {
    try {
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('userAccessToken')
      let url = api.updateApplicationEntitlements
      if (action.payload.tab === 'Software') {
        url = api.updateApplicationSoftwares
      }
      const updateLink = yield call(
        axios.patch,
        url(action.payload.applicationId),
        action.payload.data
      )
      yield put(actionCreators.updateLinkSuccess(updateLink.data))
    } catch (error) {
      yield put(actionCreators.updateLinkFailure(error))
    }
  }

  export function * deleteLink (action) {
    try {
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('userAccessToken')
      let url = api.updateApplicationEntitlements
      if (action.payload.tab === 'Software') {
        url = api.updateApplicationSoftwares
      }
      const deleteLink = yield call(
        axios.patch,
        url(action.payload.applicationId),
        action.payload.data
      )
      yield put(actionCreators.deleteLinkSuccess(deleteLink.data))
    } catch (error) {
      yield put(actionCreators.deleteLinkFailure(error))
    }
  }
