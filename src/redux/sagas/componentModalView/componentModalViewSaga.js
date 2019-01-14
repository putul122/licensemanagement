import axios from 'axios'
import { takeLatest, call, put } from 'redux-saga/effects'
import { createAction } from 'redux-actions'
import api from '../../../constants'

// Saga action strings
export const FETCH_COMPONENT_TYPE_COMPONENT = 'saga/componentModalView/FETCH_COMPONENT_TYPE_COMPONENT'
export const FETCH_COMPONENT_TYPE_COMPONENT_SUCCESS = 'saga/componentModalView/FETCH_COMPONENT_TYPE_COMPONENT_SUCCESS'
export const FETCH_COMPONENT_TYPE_COMPONENT_FAILURE = 'saga/componentModalView/FETCH_COMPONENT_TYPE_COMPONENT_FAILURE'
export const FETCH_COMPONENT_TYPE_COMPONENT_PROPERTIES = 'saga/componentModalView/FETCH_COMPONENT_TYPE_COMPONENT_PROPERTIES'
export const FETCH_COMPONENT_TYPE_COMPONENT_PROPERTIES_SUCCESS = 'saga/componentModalView/FETCH_COMPONENT_TYPE_COMPONENT_PROPERTIES_SUCCESS'
export const FETCH_COMPONENT_TYPE_COMPONENT_PROPERTIES_FAILURE = 'saga/componentModalView/FETCH_COMPONENT_TYPE_COMPONENT_PROPERTIES_FAILURE'
export const FETCH_COMPONENT_TYPE_COMPONENT_RELATIONSHIPS = 'saga/componentModalView/FETCH_COMPONENT_TYPE_COMPONENT_RELATIONSHIPS'
export const FETCH_COMPONENT_TYPE_COMPONENT_RELATIONSHIPS_SUCCESS = 'saga/componentModalView/FETCH_COMPONENT_TYPE_COMPONENT_RELATIONSHIPS_SUCCESS'
export const FETCH_COMPONENT_TYPE_COMPONENT_RELATIONSHIPS_FAILURE = 'saga/componentModalView/FETCH_COMPONENT_TYPE_COMPONENT_RELATIONSHIPS_FAILURE'

export const actionCreators = {
  fetchComponentTypeComponent: createAction(FETCH_COMPONENT_TYPE_COMPONENT),
  fetchComponentTypeComponentSuccess: createAction(FETCH_COMPONENT_TYPE_COMPONENT_SUCCESS),
  fetchComponentTypeComponentFailure: createAction(FETCH_COMPONENT_TYPE_COMPONENT_FAILURE),
  fetchcomponentTypeComponentProperties: createAction(FETCH_COMPONENT_TYPE_COMPONENT_PROPERTIES),
  fetchcomponentTypeComponentPropertiesSuccess: createAction(FETCH_COMPONENT_TYPE_COMPONENT_PROPERTIES_SUCCESS),
  fetchcomponentTypeComponentPropertiesFailure: createAction(FETCH_COMPONENT_TYPE_COMPONENT_PROPERTIES_FAILURE),
  fetchcomponentTypeComponentRelationships: createAction(FETCH_COMPONENT_TYPE_COMPONENT_RELATIONSHIPS),
  fetchcomponentTypeComponentRelationshipsSuccess: createAction(FETCH_COMPONENT_TYPE_COMPONENT_RELATIONSHIPS_SUCCESS),
  fetchcomponentTypeComponentRelationshipsFailure: createAction(FETCH_COMPONENT_TYPE_COMPONENT_RELATIONSHIPS_FAILURE)
}

export default function * watchComponentModalView () {
  yield [
    takeLatest(FETCH_COMPONENT_TYPE_COMPONENT, getComponentTypeComponent),
    takeLatest(FETCH_COMPONENT_TYPE_COMPONENT_PROPERTIES, getComponentTypeComponentProperties),
    takeLatest(FETCH_COMPONENT_TYPE_COMPONENT_RELATIONSHIPS, getComponentTypeComponentRelationships)
  ]
}

export function * getComponentTypeComponent (action) {
  try {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('userAccessToken')
    const componentTypes = yield call(
      axios.get,
      api.getComponent(action.payload)
    )
    yield put(actionCreators.fetchComponentTypeComponentSuccess(componentTypes.data))
  } catch (error) {
    yield put(actionCreators.fetchComponentTypeComponentFailure(error))
  }
}

export function * getComponentTypeComponentProperties (action) {
  try {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('userAccessToken')
    const componentTypes = yield call(
      axios.get,
      api.getComponentProperty(action.payload)
    )
    yield put(actionCreators.fetchcomponentTypeComponentPropertiesSuccess(componentTypes.data))
  } catch (error) {
    yield put(actionCreators.fetchcomponentTypeComponentPropertiesFailure(error))
  }
}

export function * getComponentTypeComponentRelationships (action) {
  try {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('userAccessToken')
    const componentTypes = yield call(
      axios.get,
      api.getComponentRelationships(action.payload)
    )
    yield put(actionCreators.fetchcomponentTypeComponentRelationshipsSuccess(componentTypes.data))
  } catch (error) {
    yield put(actionCreators.fetchcomponentTypeComponentRelationshipsFailure(error))
  }
}
