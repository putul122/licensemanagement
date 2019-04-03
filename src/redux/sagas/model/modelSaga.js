import axios from 'axios'
// import httpAdapter from 'axios/lib/adapters/http'
// import fs from 'fs'
import { takeLatest, call, put } from 'redux-saga/effects'
import { createAction } from 'redux-actions'
import api from '../../../constants'
// const OUTPUT = 'output.json'
// const output = fs.createWriteStream(OUTPUT)
// Saga action strings
export const FETCH_META_MODEL_PRESPECTIVE = 'saga/Model/FETCH_META_MODEL_PRESPECTIVE'
export const FETCH_META_MODEL_PRESPECTIVE_SUCCESS = 'saga/Model/FETCH_META_MODEL_PRESPECTIVE_SUCCESS'
export const FETCH_META_MODEL_PRESPECTIVE_FAILURE = 'saga/Model/FETCH_META_MODEL_PRESPECTIVE_FAILURE'
export const FETCH_MODEL_PRESPECTIVES = 'saga/Model/FETCH_MODEL_PRESPECTIVES'
export const FETCH_MODEL_PRESPECTIVES_SUCCESS = 'saga/Model/FETCH_MODEL_PRESPECTIVES_SUCCESS'
export const FETCH_MODEL_PRESPECTIVES_FAILURE = 'saga/Model/FETCH_MODEL_PRESPECTIVES_FAILURE'
export const UPDATE_MODEL_PRESPECTIVES = 'saga/Model/UPDATE_MODEL_PRESPECTIVES'
export const UPDATE_MODEL_PRESPECTIVES_SUCCESS = 'saga/Model/UPDATE_MODEL_PRESPECTIVES_SUCCESS'
export const UPDATE_MODEL_PRESPECTIVES_FAILURE = 'saga/Model/UPDATE_MODEL_PRESPECTIVES_FAILURE'
export const FETCH_ALL_MODEL_PRESPECTIVES = 'saga/Model/FETCH_ALL_MODEL_PRESPECTIVES'
export const FETCH_ALL_MODEL_PRESPECTIVES_SUCCESS = 'saga/Model/FETCH_ALL_MODEL_PRESPECTIVES_SUCCESS'
export const FETCH_ALL_MODEL_PRESPECTIVES_FAILURE = 'saga/Model/FETCH_ALL_MODEL_PRESPECTIVES_FAILURE'
export const UPDATE_ALL_MODEL_PRESPECTIVES = 'saga/Model/UPDATE_ALL_MODEL_PRESPECTIVES'
export const UPDATE_ALL_MODEL_PRESPECTIVES_SUCCESS = 'saga/Model/UPDATE_ALL_MODEL_PRESPECTIVES_SUCCESS'
export const UPDATE_ALL_MODEL_PRESPECTIVES_FAILURE = 'saga/Model/UPDATE_ALL_MODEL_PRESPECTIVES_FAILURE'
export const FETCH_COMPONENT_MODEL_PRESPECTIVES = 'saga/Model/FETCH_COMPONENT_MODEL_PRESPECTIVES'
export const FETCH_COMPONENT_MODEL_PRESPECTIVES_SUCCESS = 'saga/Model/FETCH_COMPONENT_MODEL_PRESPECTIVES_SUCCESS'
export const FETCH_COMPONENT_MODEL_PRESPECTIVES_FAILURE = 'saga/Model/FETCH_COMPONENT_MODEL_PRESPECTIVES_FAILURE'
export const FETCH_MODEL_PERSPECTIVE = 'saga/Model/FETCH_MODEL_PERSPECTIVE'
export const FETCH_MODEL_PERSPECTIVE_SUCCESS = 'saga/Model/FETCH_MODEL_PERSPECTIVE_SUCCESS'
export const FETCH_MODEL_PERSPECTIVE_FAILURE = 'saga/Model/FETCH_MODEL_PERSPECTIVE_FAILURE'

export const actionCreators = {
  fetchMetaModelPrespective: createAction(FETCH_META_MODEL_PRESPECTIVE),
  fetchMetaModelPrespectiveSuccess: createAction(FETCH_META_MODEL_PRESPECTIVE_SUCCESS),
  fetchMetaModelPrespectiveFailure: createAction(FETCH_META_MODEL_PRESPECTIVE_FAILURE),
  fetchModelPrespectives: createAction(FETCH_MODEL_PRESPECTIVES),
  fetchModelPrespectivesSuccess: createAction(FETCH_MODEL_PRESPECTIVES_SUCCESS),
  fetchModelPrespectivesFailure: createAction(FETCH_MODEL_PRESPECTIVES_FAILURE),
  updateModelPrespectives: createAction(UPDATE_MODEL_PRESPECTIVES),
  updateModelPrespectivesSuccess: createAction(UPDATE_MODEL_PRESPECTIVES_SUCCESS),
  updateModelPrespectivesFailure: createAction(UPDATE_MODEL_PRESPECTIVES_FAILURE),
  fetchAllModelPrespectives: createAction(FETCH_ALL_MODEL_PRESPECTIVES),
  fetchAllModelPrespectivesSuccess: createAction(FETCH_ALL_MODEL_PRESPECTIVES_SUCCESS),
  fetchAllModelPrespectivesFailure: createAction(FETCH_ALL_MODEL_PRESPECTIVES_FAILURE),
  updateAllModelPrespectives: createAction(UPDATE_ALL_MODEL_PRESPECTIVES),
  updateAllModelPrespectivesSuccess: createAction(UPDATE_ALL_MODEL_PRESPECTIVES_SUCCESS),
  updateAllModelPrespectivesFailure: createAction(UPDATE_ALL_MODEL_PRESPECTIVES_FAILURE),
  fetchComponentModelPrespectives: createAction(FETCH_COMPONENT_MODEL_PRESPECTIVES),
  fetchComponentModelPrespectivesSuccess: createAction(FETCH_COMPONENT_MODEL_PRESPECTIVES_SUCCESS),
  fetchComponentModelPrespectivesFailure: createAction(FETCH_COMPONENT_MODEL_PRESPECTIVES_FAILURE),
  fetchModelPerspective: createAction(FETCH_MODEL_PERSPECTIVE),
  fetchModelPerspectiveSuccess: createAction(FETCH_MODEL_PERSPECTIVE_SUCCESS),
  fetchModelPerspectiveFailure: createAction(FETCH_MODEL_PERSPECTIVE_FAILURE)
}

export default function * watchModel () {
  yield [
    takeLatest(FETCH_META_MODEL_PRESPECTIVE, getMetaModelPrespective),
    takeLatest(FETCH_MODEL_PRESPECTIVES, getModelPerspectives),
    takeLatest(UPDATE_MODEL_PRESPECTIVES, updateModelPrespectives),
    takeLatest(FETCH_ALL_MODEL_PRESPECTIVES, getAllModelPerspectives),
    takeLatest(UPDATE_ALL_MODEL_PRESPECTIVES, updateAllModelPerspectives),
    takeLatest(FETCH_COMPONENT_MODEL_PRESPECTIVES, getComponentModelPerspectives),
    takeLatest(FETCH_MODEL_PERSPECTIVE, getModelPerspective)
  ]
}

export function * getMetaModelPrespective (action) {
  try {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + (localStorage.getItem('userAccessToken') ? localStorage.getItem('userAccessToken') : '')
    const metaModelPrespective = yield call(
      axios.get,
      api.getMetaModelPerspective(action.payload.id),
      {params: action.payload.data}
    )
    yield put(actionCreators.fetchMetaModelPrespectiveSuccess(metaModelPrespective.data))
  } catch (error) {
    yield put(actionCreators.fetchMetaModelPrespectiveFailure(error))
  }
}

export function * getModelPerspectives (action) {
  try {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + (localStorage.getItem('userAccessToken') ? localStorage.getItem('userAccessToken') : '')
    axios.defaults.headers.common['responseType'] = 'stream'
    const modelPrespectives = yield call(
      axios.get,
      api.getModelPerspectives,
      {params: action.payload}
    )
    yield put(actionCreators.fetchModelPrespectivesSuccess(modelPrespectives.data))
  } catch (error) {
    yield put(actionCreators.fetchModelPrespectivesFailure(error))
  }
}

export function * getComponentModelPerspectives (action) {
  console.log('action', action)
  try {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + (localStorage.getItem('userAccessToken') ? localStorage.getItem('userAccessToken') : '')
    const componentModelPrespectives = yield call(
      axios.get,
      api.getComponentModelPerspectives(action.payload)
    )
    console.log('componentModelPrespectives', componentModelPrespectives)
    yield put(actionCreators.fetchComponentModelPrespectivesSuccess(componentModelPrespectives.data))
  } catch (error) {
    yield put(actionCreators.fetchComponentModelPrespectivesFailure(error))
  }
}

export function * updateModelPrespectives (action) {
  try {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + (localStorage.getItem('userAccessToken') ? localStorage.getItem('userAccessToken') : '')
    const modelPrespectives = yield call(
      axios.patch,
      api.getModelPerspectives,
      // api.updateModelPerspectives(action.payload.metaModelPerspectiveId),
      action.payload.data,
      {params: action.payload.queryString}
    )
    yield put(actionCreators.updateModelPrespectivesSuccess(modelPrespectives.data))
  } catch (error) {
    yield put(actionCreators.updateModelPrespectivesFailure(error))
  }
}

export function * getAllModelPerspectives (action) {
  try {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + (localStorage.getItem('userAccessToken') ? localStorage.getItem('userAccessToken') : '')
    axios.defaults.headers.common['Accept'] = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    const modelPrespectives = yield call(
      axios.get,
      api.getAllModelPerspectives(action.payload),
      // {params: action.payload},
      {'responseType': 'blob'}
    )
    yield put(actionCreators.fetchAllModelPrespectivesSuccess(modelPrespectives.data))
  } catch (error) {
    yield put(actionCreators.fetchAllModelPrespectivesFailure(error))
  }
}

export function * updateAllModelPerspectives (action) {
  try {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + (localStorage.getItem('userAccessToken') ? localStorage.getItem('userAccessToken') : '')
    axios.defaults.headers.common['Accept'] = 'application/json'
    axios.defaults.headers.common['Content-Type'] = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    const modelPrespectives = yield call(
      axios.post,
      api.getAllModelPerspectives(action.payload.queryPart),
      action.payload.formData,
      {'headers': {
        'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
      }}
    )
    console.log('modelPrespectives', modelPrespectives)
    yield put(actionCreators.updateAllModelPrespectivesSuccess(modelPrespectives.data))
  } catch (error) {
    yield put(actionCreators.updateAllModelPrespectivesFailure(error))
  }
}

export function * getModelPerspective (action) {
  try {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + (localStorage.getItem('userAccessToken') ? localStorage.getItem('userAccessToken') : '')
    axios.defaults.headers.common['responseType'] = 'stream'
    const modelPrespective = yield call(
      axios.get,
      api.getModelPerspective(action.payload.id),
      {params: action.payload.data}
    )
    yield put(actionCreators.fetchModelPerspectiveSuccess(modelPrespective.data))
  } catch (error) {
    yield put(actionCreators.fetchModelPerspectiveFailure(error))
  }
}
