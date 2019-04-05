import axios from 'axios'
import { takeLatest, call, put } from 'redux-saga/effects'
import { createAction } from 'redux-actions'
import api from '../../../constants'

// Saga action strings
export const FETCH_CLIENT_ACCESS_TOKEN = 'saga/Basic/FETCH_CLIENT_ACCESS_TOKEN'
export const FETCH_CLIENT_ACCESS_TOKEN_SUCCESS = 'saga/Basic/FETCH_CLIENT_ACCESS_TOKEN_SUCCESS'
export const FETCH_CLIENT_ACCESS_TOKEN_FAILURE = 'saga/Basic/FETCH_CLIENT_ACCESS_TOKEN_FAILURE'
export const FETCH_USER_AUTHENTICATION = 'saga/Basic/FETCH_USER_AUTHENTICATION'
export const FETCH_USER_AUTHENTICATION_SUCCESS = 'saga/Basic/FETCH_USER_AUTHENTICATION_SUCCESS'
export const FETCH_USER_AUTHENTICATION_FAILURE = 'saga/Basic/FETCH_USER_AUTHENTICATION_FAILURE'
export const FETCH_BUSINESS_UNITS = 'saga/Basic/FETCH_BUSINESS_UNITS'
export const FETCH_BUSINESS_UNITS_SUCCESS = 'saga/Basic/FETCH_BUSINESS_UNITS_SUCCESS'
export const FETCH_BUSINESS_UNITS_FAILURE = 'saga/Basic/FETCH_BUSINESS_UNITS_FAILURE'
export const UPDATE_NOTIFICATION_VIEW_STATUS = 'saga/Basic/UPDATE_NOTIFICATION_VIEW_STATUS'
export const UPDATE_NOTIFICATION_VIEW_STATUS_SUCCESS = 'saga/Basic/UPDATE_NOTIFICATION_VIEW_STATUS_SUCCESS'
export const UPDATE_NOTIFICATION_VIEW_STATUS_FAILURE = 'saga/Basic/UPDATE_NOTIFICATION_VIEW_STATUS_FAILURE'
export const FETCH_PACKAGE = 'saga/Basic/FETCH_PACKAGE'
export const FETCH_PACKAGE_SUCCESS = 'saga/Basic/FETCH_PACKAGE_SUCCESS'
export const FETCH_PACKAGE_FAILURE = 'saga/Basic/FETCH_PACKAGE_FAILURE'
export const SEARCH_ALL = 'saga/Basic/SEARCH_ALL'
export const SEARCH_ALL_SUCCESS = 'saga/Basic/SEARCH_ALL_SUCCESS'
export const SEARCH_ALL_FAILURE = 'saga/Basic/SEARCH_ALL_FAILURE'
export const FETCH_DROPDOWN_DATA = 'saga/Basic/FETCH_DROPDOWN_DATA'
export const FETCH_DROPDOWN_DATA_SUCCESS = 'saga/Basic/FETCH_DROPDOWN_DATA_SUCCESS'
export const FETCH_DROPDOWN_DATA_FAILURE = 'saga/Basic/FETCH_DROPDOWN_DATA_FAILURE'

export const actionCreators = {
  fetchClientAccessToken: createAction(FETCH_CLIENT_ACCESS_TOKEN),
  fetchClientAccessTokenSuccess: createAction(FETCH_CLIENT_ACCESS_TOKEN_SUCCESS),
  fetchClientAccessTokenFailure: createAction(FETCH_CLIENT_ACCESS_TOKEN_FAILURE),
  fetchUserAuthentication: createAction(FETCH_USER_AUTHENTICATION),
  fetchUserAuthenticationSuccess: createAction(FETCH_USER_AUTHENTICATION_SUCCESS),
  fetchUserAuthenticationFailure: createAction(FETCH_USER_AUTHENTICATION_FAILURE),
  fetchBusinessUnits: createAction(FETCH_BUSINESS_UNITS),
  fetchBusinessUnitsSuccess: createAction(FETCH_BUSINESS_UNITS_SUCCESS),
  fetchBusinessUnitsFailure: createAction(FETCH_BUSINESS_UNITS_FAILURE),
  updateNotificationViewStatus: createAction(UPDATE_NOTIFICATION_VIEW_STATUS),
  updateNotificationViewStatusSuccess: createAction(UPDATE_NOTIFICATION_VIEW_STATUS_SUCCESS),
  updateNotificationViewStatusFailure: createAction(UPDATE_NOTIFICATION_VIEW_STATUS_FAILURE),
  fetchPackage: createAction(FETCH_PACKAGE),
  fetchPackageSuccess: createAction(FETCH_PACKAGE_SUCCESS),
  fetchPackageFailure: createAction(FETCH_PACKAGE_FAILURE),
  searchAll: createAction(SEARCH_ALL),
  searchAllSuccess: createAction(SEARCH_ALL_SUCCESS),
  searchAllFailure: createAction(SEARCH_ALL_FAILURE),
  fetchDropdownData: createAction(FETCH_DROPDOWN_DATA),
  fetchDropdownDataSuccess: createAction(FETCH_DROPDOWN_DATA_SUCCESS),
  fetchDropdownDataFailure: createAction(FETCH_DROPDOWN_DATA_FAILURE)
}

export default function * watchBasic () {
  yield [
    takeLatest(FETCH_CLIENT_ACCESS_TOKEN, getClientAccessToken),
    takeLatest(FETCH_USER_AUTHENTICATION, getUserAuthentication),
    takeLatest(FETCH_BUSINESS_UNITS, getBusinessUnits),
    takeLatest(UPDATE_NOTIFICATION_VIEW_STATUS, updateNotificationViewStatus),
    takeLatest(FETCH_PACKAGE, getPackage),
    takeLatest(SEARCH_ALL, getAllSearch),
    takeLatest(FETCH_DROPDOWN_DATA, getDropdownData)
  ]
}

export function * getDropdownData (action) {
  try {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('userAccessToken')
    const dropdownData = yield call(
      axios.get,
      api.getComponentTypeComponents(action.payload)
    )
    yield put(actionCreators.fetchDropdownDataSuccess(dropdownData.data))
  } catch (error) {
    yield put(actionCreators.fetchDropdownDataFailure(error))
  }
}

export function * getAllSearch (action) {
  try {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + (localStorage.getItem('userAccessToken') ? localStorage.getItem('userAccessToken') : '')
    const allSearchData = yield call(
      axios.get,
      api.searchAll,
      {params: action.payload}
    )
    yield put(actionCreators.searchAllSuccess(allSearchData.data))
  } catch (error) {
    yield put(actionCreators.searchAllFailure(error))
  }
}

export function * getClientAccessToken (action) {
  try {
    const clientAccessToken = yield call(
      axios.post,
      api.clientAccessToken,
      action.payload
    )
    yield put(actionCreators.fetchClientAccessTokenSuccess(clientAccessToken.data))
  } catch (error) {
    yield put(actionCreators.fetchClientAccessTokenFailure(error))
  }
}

export function * getUserAuthentication (action) {
  try {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + (localStorage.getItem('userAccessToken') ? localStorage.getItem('userAccessToken') : '')
    const userAuthentication = yield call(
      axios.get,
      api.authenticateUser
    )
    yield put(actionCreators.fetchUserAuthenticationSuccess(userAuthentication.data))
  } catch (error) {
    yield put(actionCreators.fetchUserAuthenticationFailure(error))
  }
}

export function * getBusinessUnits (action) {
  try {
    // axios.defaults.headers.common['Authorization'] = 'Bearer ' + (localStorage.getItem('userAccessToken') ? localStorage.getItem('userAccessToken') : '')
    const businessUnits = yield call(
      axios.get,
      api.getBusinessUnits
    )
    yield put(actionCreators.fetchBusinessUnitsSuccess(businessUnits.data))
  } catch (error) {
    yield put(actionCreators.fetchBusinessUnitsFailure(error))
  }
}

export function * updateNotificationViewStatus (action) {
  try {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + (localStorage.getItem('userAccessToken') ? localStorage.getItem('userAccessToken') : '')
    const updateNotificationViewStatus = yield call(
      axios.patch,
      api.updateNotificationViewStatus
    )
    yield put(actionCreators.updateNotificationViewStatusSuccess(updateNotificationViewStatus.data))
  } catch (error) {
    yield put(actionCreators.updateNotificationViewStatusFailure(error))
  }
}

export function * getPackage (action) {
  try {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + (localStorage.getItem('userAccessToken') ? localStorage.getItem('userAccessToken') : '')
    const packages = yield call(
      axios.get,
      api.getPackage
    )
    yield put(actionCreators.fetchPackageSuccess(packages.data))
  } catch (error) {
    yield put(actionCreators.fetchPackageFailure(error))
  }
}
