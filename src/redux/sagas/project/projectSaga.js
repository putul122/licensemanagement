import axios from 'axios'
import { takeLatest, call, put } from 'redux-saga/effects'
import { createAction } from 'redux-actions'
import api from '../../../constants'

// // Saga action strings
export const FETCH_PROJECTS = 'saga/project/FETCH_PROJECTS'
export const FETCH_PROJECTS_SUCCESS = 'saga/project/FETCH_PROJECTS_SUCCESS'
export const FETCH_PROJECTS_FAILURE = 'saga/project/FETCH_PROJECTS_FAILURE'
export const FETCH_PROJECTS_SUMMARY = 'saga/project/FETCH_PROJECTS_SUMMARY'
export const FETCH_PROJECTS_SUMMARY_SUCCESS = 'saga/project/FETCH_PROJECTS_SUMMARY_SUCCESS'
export const FETCH_PROJECTS_SUMMARY_FAILURE = 'saga/project/FETCH_PROJECTS_SUMMARY_FAILURE'
export const FETCH_PROJECT_BY_ID = 'saga/project/FETCH_PROJECT_BY_ID'
export const FETCH_PROJECT_BY_ID_SUCCESS = 'saga/project/FETCH_PROJECT_BY_ID_SUCCESS'
export const FETCH_PROJECT_BY_ID_FAILURE = 'saga/project/FETCH_PROJECT_BY_ID_FAILURE'
export const FETCH_PROJECT_ENTITLEMENTS = 'saga/project/FETCH_PROJECT_ENTITLEMENTS'
export const FETCH_PROJECT_ENTITLEMENTS_SUCCESS = 'saga/project/FETCH_PROJECT_ENTITLEMENTS_SUCCESS'
export const FETCH_PROJECT_ENTITLEMENTS_FAILURE = 'saga/project/FETCH_PROJECT_ENTITLEMENTS_FAILURE'
export const FETCH_PROJECT_PROPERTIES = 'saga/project/FETCH_PROJECT_PROPERTIES'
export const FETCH_PROJECT_PROPERTIES_SUCCESS = 'saga/project/FETCH_PROJECT_PROPERTIES_SUCCESS'
export const FETCH_PROJECT_PROPERTIES_FAILURE = 'saga/project/FETCH_PROJECT_PROPERTIES_FAILURE'
export const UPDATE_PROJECT = 'saga/project/UPDATE_PROJECT'
export const UPDATE_PROJECT_SUCCESS = 'saga/project/UPDATE_PROJECT_SUCCESS'
export const UPDATE_PROJECT_FAILURE = 'saga/project/UPDATE_PROJECT_FAILURE'
export const UPDATE_PROJECT_PROPERTIES = 'saga/project/UPDATE_PROJECT_PROPERTIES'
export const UPDATE_PROJECT_PROPERTIES_SUCCESS = 'saga/project/UPDATE_PROJECT_PROPERTIES_SUCCESS'
export const UPDATE_PROJECT_PROPERTIES_FAILURE = 'saga/project/UPDATE_PROJECT_PROPERTIES_FAILURE'
export const FETCH_COMPONENT_TYPE_COMPONENTS = 'saga/project/FETCH_COMPONENT_TYPE_COMPONENTS'
export const FETCH_COMPONENT_TYPE_COMPONENTS_SUCCESS = 'saga/project/FETCH_COMPONENT_TYPE_COMPONENTS_SUCCESS'
export const FETCH_COMPONENT_TYPE_COMPONENTS_FAILURE = 'saga/project/FETCH_COMPONENT_TYPE_COMPONENTS_FAILURE'
export const ADD_PROJECT_ENTITLEMENTS = 'saga/project/ADD_PROJECT_ENTITLEMENTS'
export const ADD_PROJECT_ENTITLEMENTS_SUCCESS = 'saga/project/ADD_PROJECT_ENTITLEMENTS_SUCCESS'
export const ADD_PROJECT_ENTITLEMENTS_FAILURE = 'saga/project/ADD_PROJECT_ENTITLEMENTS_FAILURE'
export const UPDATE_PROJECT_ENTITLEMENTS = 'saga/project/UPDATE_PROJECT_ENTITLEMENTS'
export const UPDATE_PROJECT_ENTITLEMENTS_SUCCESS = 'saga/project/UPDATE_PROJECT_ENTITLEMENTS_SUCCESS'
export const UPDATE_PROJECT_ENTITLEMENTS_FAILURE = 'saga/project/UPDATE_PROJECT_ENTITLEMENTS_FAILURE'
export const DELETE_PROJECT_ENTITLEMENTS = 'saga/project/DELETE_PROJECT_ENTITLEMENTS'
export const DELETE_PROJECT_ENTITLEMENTS_SUCCESS = 'saga/project/DELETE_PROJECT_ENTITLEMENTS_SUCCESS'
export const DELETE_PROJECT_ENTITLEMENTS_FAILURE = 'saga/project/DELETE_PROJECT_ENTITLEMENTS_FAILURE'
export const DELETE_PROJECT = 'saga/project/DELETE_PROJECT'
export const DELETE_PROJECT_SUCCESS = 'saga/project/DELETE_PROJECT_SUCCESS'
export const DELETE_PROJECT_FAILURE = 'saga/project/DELETE_PROJECT_FAILURE'
export const CREATE_PROJECT = 'saga/project/CREATE_PROJECT'
export const CREATE_PROJECT_SUCCESS = 'saga/project/CREATE_PROJECT_SUCCESS'
export const CREATE_PROJECT_FAILURE = 'saga/project/CREATE_PROJECT_FAILURE'

export const actionCreators = {
  fetchProjects: createAction(FETCH_PROJECTS),
  fetchProjectsSuccess: createAction(FETCH_PROJECTS_SUCCESS),
  fetchProjectsFailure: createAction(FETCH_PROJECTS_FAILURE),
  fetchProjectsSummary: createAction(FETCH_PROJECTS_SUMMARY),
  fetchProjectsSummarySuccess: createAction(FETCH_PROJECTS_SUMMARY_SUCCESS),
  fetchProjectsSummaryFailure: createAction(FETCH_PROJECTS_SUMMARY_FAILURE),
  fetchProjectById: createAction(FETCH_PROJECT_BY_ID),
  fetchProjectByIdSuccess: createAction(FETCH_PROJECT_BY_ID_SUCCESS),
  fetchProjectByIdFailure: createAction(FETCH_PROJECT_BY_ID_FAILURE),
  fetchProjectEntitlements: createAction(FETCH_PROJECT_ENTITLEMENTS),
  fetchProjectEntitlementsSuccess: createAction(FETCH_PROJECT_ENTITLEMENTS_SUCCESS),
  fetchProjectEntitlementsFailure: createAction(FETCH_PROJECT_ENTITLEMENTS_FAILURE),
  fetchProjectProperties: createAction(FETCH_PROJECT_PROPERTIES),
  fetchProjectPropertiesSuccess: createAction(FETCH_PROJECT_PROPERTIES_SUCCESS),
  fetchProjectPropertiesFailure: createAction(FETCH_PROJECT_PROPERTIES_FAILURE),
  updateProject: createAction(UPDATE_PROJECT),
  updateProjectSuccess: createAction(UPDATE_PROJECT_SUCCESS),
  updateProjectFailure: createAction(UPDATE_PROJECT_FAILURE),
  updateProjectProperties: createAction(UPDATE_PROJECT_PROPERTIES),
  updateProjectPropertiesSuccess: createAction(UPDATE_PROJECT_PROPERTIES_SUCCESS),
  updateProjectPropertiesFailure: createAction(UPDATE_PROJECT_PROPERTIES_FAILURE),
  fetchComponentTypeComponents: createAction(FETCH_COMPONENT_TYPE_COMPONENTS),
  fetchComponentTypeComponentsSuccess: createAction(FETCH_COMPONENT_TYPE_COMPONENTS_SUCCESS),
  fetchComponentTypeComponentsFailure: createAction(FETCH_COMPONENT_TYPE_COMPONENTS_FAILURE),
  addProjectEntitlements: createAction(ADD_PROJECT_ENTITLEMENTS),
  addProjectEntitlementsSuccess: createAction(ADD_PROJECT_ENTITLEMENTS_SUCCESS),
  addProjectEntitlementsFailure: createAction(ADD_PROJECT_ENTITLEMENTS_FAILURE),
  updateProjectEntitlements: createAction(UPDATE_PROJECT_ENTITLEMENTS),
  updateProjectEntitlementsSuccess: createAction(UPDATE_PROJECT_ENTITLEMENTS_SUCCESS),
  updateProjectEntitlementsFailure: createAction(UPDATE_PROJECT_ENTITLEMENTS_FAILURE),
  deleteProjectEntitlements: createAction(DELETE_PROJECT_ENTITLEMENTS),
  deleteProjectEntitlementsSuccess: createAction(DELETE_PROJECT_ENTITLEMENTS_SUCCESS),
  deleteProjectEntitlementsFailure: createAction(DELETE_PROJECT_ENTITLEMENTS_FAILURE),
  deleteProject: createAction(DELETE_PROJECT),
  deleteProjectSuccess: createAction(DELETE_PROJECT_SUCCESS),
  deleteProjectFailure: createAction(DELETE_PROJECT_FAILURE),
  createProject: createAction(CREATE_PROJECT),
  createProjectSuccess: createAction(CREATE_PROJECT_SUCCESS),
  createProjectFailure: createAction(CREATE_PROJECT_FAILURE)
}

export default function * watchProjects () {
  yield [
      takeLatest(FETCH_PROJECTS, getProjects),
      takeLatest(FETCH_PROJECTS_SUMMARY, getProjectsSummary),
      takeLatest(FETCH_PROJECT_BY_ID, getProjectById),
      takeLatest(FETCH_PROJECT_ENTITLEMENTS, getProjectEntitlements),
      takeLatest(FETCH_PROJECT_PROPERTIES, getProjectProperties),
      takeLatest(UPDATE_PROJECT_PROPERTIES, updateProjectProperties),
      takeLatest(UPDATE_PROJECT, updateProjectData),
      takeLatest(FETCH_COMPONENT_TYPE_COMPONENTS, getComponentTypeComponents),
      takeLatest(ADD_PROJECT_ENTITLEMENTS, addProjectEntitlements),
      takeLatest(UPDATE_PROJECT_ENTITLEMENTS, updateProjectEntitlements),
      takeLatest(DELETE_PROJECT_ENTITLEMENTS, deleteProjectEntitlements),
      takeLatest(DELETE_PROJECT, deleteProject),
      takeLatest(CREATE_PROJECT, createProject)
  ]
}

export function * getProjects (action) {
  try {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('userAccessToken')
    const projects = yield call(
      axios.get,
      api.getProjects,
      {params: action.payload}
    )
    yield put(actionCreators.fetchProjectsSuccess(projects.data))
  } catch (error) {
    yield put(actionCreators.fetchProjectsFailure(error))
  }
}

export function * getProjectsSummary (action) {
  try {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('userAccessToken')
    const projectsSummary = yield call(
      axios.get,
      api.getProjectsSummary,
      {params: action.payload}
    )
    yield put(actionCreators.fetchProjectsSummarySuccess(projectsSummary.data))
  } catch (error) {
    yield put(actionCreators.fetchProjectsSummaryFailure(error))
  }
}

export function * createProject (action) {
  try {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('userAccessToken')
    const project = yield call(
      axios.post,
      api.createProject,
      action.payload
    )
    yield put(actionCreators.createProjectSuccess(project.data))
  } catch (error) {
    yield put(actionCreators.createProjectFailure(error))
  }
}

export function * getProjectById (action) {
  try {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('userAccessToken')
    const project = yield call(
      axios.get,
      api.getProject,
      {params: action.payload}
    )
    yield put(actionCreators.fetchProjectByIdSuccess(project.data))
  } catch (error) {
    yield put(actionCreators.fetchProjectByIdFailure(error))
  }
}

export function * getProjectEntitlements (action) {
  try {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('userAccessToken')
    const projectEntitlements = yield call(
      axios.get,
      api.getProjectEntitlements,
      {params: action.payload}
    )
    yield put(actionCreators.fetchProjectEntitlementsSuccess(projectEntitlements.data))
  } catch (error) {
    yield put(actionCreators.fetchProjectEntitlementsFailure(error))
  }
}

export function * getProjectProperties (action) {
  try {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('userAccessToken')
    const projectProperties = yield call(
      axios.get,
      api.getProjectProperty(action.payload)
    )
    yield put(actionCreators.fetchProjectPropertiesSuccess(projectProperties.data))
  } catch (error) {
    yield put(actionCreators.fetchProjectPropertiesFailure(error))
  }
}

export function * updateProjectData (action) {
  try {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('userAccessToken')
    const project = yield call(
      axios.patch,
      api.updateComponent(action.payload),
      action.payload.project
    )
    yield put(actionCreators.updateProjectSuccess(project.data))
  } catch (error) {
    yield put(actionCreators.updateProjectFailure(error))
  }
}

export function * updateProjectProperties (action) {
  try {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('userAccessToken')
    const projectProperty = yield call(
      axios.patch,
      api.updateProjectProperties(action.payload),
      action.payload.property
    )
    yield put(actionCreators.updateProjectPropertiesSuccess(projectProperty.data))
  } catch (error) {
    yield put(actionCreators.updateProjectPropertiesFailure(error))
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

export function * addProjectEntitlements (action) {
  try {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('userAccessToken')
    const addProjectEntitlements = yield call(
      axios.patch,
      api.updateProjectEntitlements(action.payload.projectId),
      action.payload.data
    )
    yield put(actionCreators.addProjectEntitlementsSuccess(addProjectEntitlements.data))
  } catch (error) {
    yield put(actionCreators.addProjectEntitlementsFailure(error))
  }
}

export function * updateProjectEntitlements (action) {
  try {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('userAccessToken')
    const updateProjectEntitlements = yield call(
      axios.patch,
      api.updateProjectEntitlements(action.payload.projectId),
      action.payload.data
    )
    yield put(actionCreators.updateProjectEntitlementsSuccess(updateProjectEntitlements.data))
  } catch (error) {
    yield put(actionCreators.updateProjectEntitlementsFailure(error))
  }
}

export function * deleteProjectEntitlements (action) {
  try {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('userAccessToken')
    const deleteProjectEntitlements = yield call(
      axios.patch,
      api.updateProjectEntitlements(action.payload.projectId),
      action.payload.data
    )
    yield put(actionCreators.deleteProjectEntitlementsSuccess(deleteProjectEntitlements.data))
  } catch (error) {
    yield put(actionCreators.deleteProjectEntitlementsFailure(error))
  }
}

export function * deleteProject (action) {
  try {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('userAccessToken')
    const deleteProject = yield call(
      axios.delete,
      api.deleteProject(action.payload.id)
     )
    yield put(actionCreators.deleteProjectSuccess(deleteProject.data))
  } catch (error) {
    yield put(actionCreators.deleteProjectFailure(error))
  }
}
