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

export const actionCreators = {
  fetchEntitlements: createAction(FETCH_ENTITLEMENTS),
  fetchEntitlementsSuccess: createAction(FETCH_ENTITLEMENTS_SUCCESS),
  fetchEntitlementsFailure: createAction(FETCH_ENTITLEMENTS_FAILURE),
  fetchEntitlementsSummary: createAction(FETCH_ENTITLEMENTS_SUMMARY),
  fetchEntitlementsSummarySuccess: createAction(FETCH_ENTITLEMENTS_SUMMARY_SUCCESS),
  fetchEntitlementsSummaryFailure: createAction(FETCH_ENTITLEMENTS_SUMMARY_FAILURE)
}

export default function * watchEntitlements () {
  yield [
      takeLatest(FETCH_ENTITLEMENTS, getEntitlements),
      takeLatest(FETCH_ENTITLEMENTS_SUMMARY, getEntitlementsSummary)
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
        api.getEntitlementsSummary
        // action.payload
      )
      yield put(actionCreators.fetchEntitlementsSummarySuccess(entitlementsSummary.data))
    } catch (error) {
      yield put(actionCreators.fetchEntitlementsSummaryFailure(error))
    }
  }
