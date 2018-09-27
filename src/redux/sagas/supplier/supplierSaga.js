import axios from 'axios'
import { takeLatest, call, put } from 'redux-saga/effects'
import { createAction } from 'redux-actions'
import api from '../../../constants'

// Saga action strings
export const FETCH_SUPPLIERS = 'saga/supplier/FETCH_SUPPLIERS'
export const FETCH_SUPPLIERS_SUCCESS = 'saga/supplier/FETCH_SUPPLIERS_SUCCESS'
export const FETCH_SUPPLIERS_FAILURE = 'saga/supplier/FETCH_SUPPLIERS_FAILURE'
export const FETCH_SUPPLIERS_SUMMARY = 'saga/supplier/FETCH_SUPPLIERS_SUMMARY'
export const FETCH_SUPPLIERS_SUMMARY_SUCCESS = 'saga/supplier/FETCH_SUPPLIERS_SUMMARY_SUCCESS'
export const FETCH_SUPPLIERS_SUMMARY_FAILURE = 'saga/supplier/FETCH_SUPPLIERS_SUMMARY_FAILURE'
export const FETCH_SUPPLIER_BY_ID = 'saga/supplier/FETCH_SUPPLIER_BY_ID'
export const FETCH_SUPPLIER_BY_ID_SUCCESS = 'saga/supplier/FETCH_SUPPLIER_BY_ID_SUCCESS'
export const FETCH_SUPPLIER_BY_ID_FAILURE = 'saga/supplier/FETCH_SUPPLIER_BY_ID_FAILURE'
export const FETCH_SUPPLIER_APPLICATIONS = 'saga/supplier/FETCH_SUPPLIER_APPLICATIONS'
export const FETCH_SUPPLIER_APPLICATIONS_SUCCESS = 'saga/supplier/FETCH_SUPPLIER_APPLICATIONS_SUCCESS'
export const FETCH_SUPPLIER_APPLICATIONS_FAILURE = 'saga/supplier/FETCH_SUPPLIER_APPLICATIONS_FAILURE'
export const FETCH_SUPPLIER_AGREEMENTS = 'saga/supplier/FETCH_SUPPLIER_AGREEMENTS'
export const FETCH_SUPPLIER_AGREEMENTS_SUCCESS = 'saga/supplier/FETCH_SUPPLIER_AGREEMENTS_SUCCESS'
export const FETCH_SUPPLIER_AGREEMENTS_FAILURE = 'saga/supplier/FETCH_SUPPLIER_AGREEMENTS_FAILURE'
export const FETCH_SUPPLIER_SOFTWARES = 'saga/supplier/FETCH_SUPPLIER_SOFTWARES'
export const FETCH_SUPPLIER_SOFTWARES_SUCCESS = 'saga/supplier/FETCH_SUPPLIER_SOFTWARES_SUCCESS'
export const FETCH_SUPPLIER_SOFTWARES_FAILURE = 'saga/supplier/FETCH_SUPPLIER_SOFTWARES_FAILURE'

export const actionCreators = {
  fetchSuppliers: createAction(FETCH_SUPPLIERS),
  fetchSuppliersSuccess: createAction(FETCH_SUPPLIERS_SUCCESS),
  fetchSuppliersFailure: createAction(FETCH_SUPPLIERS_FAILURE),
  fetchSuppliersSummary: createAction(FETCH_SUPPLIERS_SUMMARY),
  fetchSuppliersSummarySuccess: createAction(FETCH_SUPPLIERS_SUMMARY_SUCCESS),
  fetchSuppliersSummaryFailure: createAction(FETCH_SUPPLIERS_SUMMARY_FAILURE),
  fetchSupplierById: createAction(FETCH_SUPPLIER_BY_ID),
  fetchSupplierByIdSuccess: createAction(FETCH_SUPPLIER_BY_ID_SUCCESS),
  fetchSupplierByIdFailure: createAction(FETCH_SUPPLIER_BY_ID_FAILURE),
  fetchSupplierApplications: createAction(FETCH_SUPPLIER_APPLICATIONS),
  fetchSupplierApplicationsSuccess: createAction(FETCH_SUPPLIER_APPLICATIONS_SUCCESS),
  fetchSupplierApplicationsFailure: createAction(FETCH_SUPPLIER_APPLICATIONS_FAILURE),
  fetchSupplierAgreements: createAction(FETCH_SUPPLIER_AGREEMENTS),
  fetchSupplierAgreementsSuccess: createAction(FETCH_SUPPLIER_AGREEMENTS_SUCCESS),
  fetchSupplierAgreementsFailure: createAction(FETCH_SUPPLIER_AGREEMENTS_FAILURE),
  fetchSupplierSoftwares: createAction(FETCH_SUPPLIER_SOFTWARES),
  fetchSupplierSoftwaresSuccess: createAction(FETCH_SUPPLIER_SOFTWARES_SUCCESS),
  fetchSupplierSoftwaresFailure: createAction(FETCH_SUPPLIER_SOFTWARES_FAILURE)
}

export default function * watchSuppliers () {
  yield [
      takeLatest(FETCH_SUPPLIERS, getSuppliers),
      takeLatest(FETCH_SUPPLIERS_SUMMARY, getSuppliersSummary),
      takeLatest(FETCH_SUPPLIER_BY_ID, getSupplierById),
      takeLatest(FETCH_SUPPLIER_APPLICATIONS, getSupplierApplications),
      takeLatest(FETCH_SUPPLIER_AGREEMENTS, getSupplierAgreements),
      takeLatest(FETCH_SUPPLIER_SOFTWARES, getSupplierSoftwares)
  ]
}

export function * getSuppliers (action) {
  try {
    // axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('clientAccessToken')
    const suppliers = yield call(
      axios.get,
      api.getSuppliers,
      {params: action.payload}
    )
    yield put(actionCreators.fetchSuppliersSuccess(suppliers.data))
  } catch (error) {
    yield put(actionCreators.fetchSuppliersFailure(error))
  }
}

export function * getSuppliersSummary (action) {
  try {
    // axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('clientAccessToken')
    const suppliersSummary = yield call(
      axios.get,
      api.getSuppliersSummary,
      {params: action.payload}
    )
    yield put(actionCreators.fetchSuppliersSummarySuccess(suppliersSummary.data))
  } catch (error) {
    yield put(actionCreators.fetchSuppliersSummaryFailure(error))
  }
}

export function * getSupplierById (action) {
  try {
    // axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('clientAccessToken')
    const supplier = yield call(
      axios.get,
      api.getSupplier,
      {params: action.payload}
    )
    yield put(actionCreators.fetchSupplierByIdSuccess(supplier.data))
  } catch (error) {
    yield put(actionCreators.fetchSupplierByIdFailure(error))
  }
}

export function * getSupplierApplications (action) {
  try {
    // axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('clientAccessToken')
    const suppliersApplications = yield call(
      axios.get,
      api.getSupplierApplications,
      {params: action.payload}
    )
    yield put(actionCreators.fetchSupplierApplicationsSuccess(suppliersApplications.data))
  } catch (error) {
    yield put(actionCreators.fetchSupplierApplicationsFailure(error))
  }
}

export function * getSupplierAgreements (action) {
  try {
    // axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('clientAccessToken')
    const suppliersAgreements = yield call(
      axios.get,
      api.getSupplierAgreements,
      {params: action.payload}
    )
    yield put(actionCreators.fetchSupplierAgreementsSuccess(suppliersAgreements.data))
  } catch (error) {
    yield put(actionCreators.fetchSupplierAgreementsFailure(error))
  }
}

export function * getSupplierSoftwares (action) {
  try {
    // axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('clientAccessToken')
    const suppliersSoftwares = yield call(
      axios.get,
      api.getSupplierSoftwares,
      {params: action.payload}
    )
    yield put(actionCreators.fetchSupplierSoftwaresSuccess(suppliersSoftwares.data))
  } catch (error) {
    yield put(actionCreators.fetchSupplierSoftwaresFailure(error))
  }
}
