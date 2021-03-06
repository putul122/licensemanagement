import {combineReducers} from 'redux'
import basicReducer from './basicReducer/basicReducerReducer'
import dashboardReducer from './dashboardReducer/dashboardReducerReducer'
import suppliersReducer from './suppliersReducer/suppliersReducerReducer'
import supplierDetailReducer from './supplierDetailReducer/supplierDetailReducerReducer'
import applicationDetailReducer from './applicationDetailReducer/applicationDetailReducerReducer'
import softwareDetailReducer from './softwareDetailReducer/softwareDetailReducerReducer'
import agreementsReducer from './agreementsReducer/agreementsReducerReducer'
import agreementDetailReducer from './agreementDetailReducer/agreementDetailReducerReducer'
import applicationsReducer from './applicationsReducer/applicationsReducerReducer'
import softwaresReducer from './softwaresReducer/softwaresReducerReducer'
import loginReducer from './loginReducer/loginReducerReducer'
import entitlementsReducer from './entitlementsReducer/entitlementsReducerReducer'
import entitlementDetailReducer from './entitlementDetailReducer/entitlementDetailReducerReducer'
import discussionReducer from './discussionReducer/discussionReducerReducer'
import applicationActivityReducer from './applicationActivityReducer/applicationActivityReducerReducer'
import newDiscussionReducer from './newDiscussionReducer/newDiscussionReducerReducer'
import sheetsReducer from './sheetsReducer/sheetsReducerReducer'
import signUpReducer from './signUpReducer/signUpReducerReducer'
import projectsReducer from './projectsReducer/projectsReducerReducer'
import projectDetailReducer from './projectDetailReducer/projectDetailReducerReducer'
import componentModalViewReducer from './componentModalViewReducer/componentModalViewReducerReducer'
import dataModelReducer from './dataModelReducer/dataModelReducerReducer'
import businessUnitsReducer from './businessUnitsReducer/businessUnitsReducerReducer'
import viewBusinessUnitsReducer from './viewBusinessUnitsReducer/viewBusinessUnitsReducerReducer'
import searchReducer from './searchReducer/searchReducerReducer'
import tasksReducer from './tasksReducer/tasksReducerReducer'

export default combineReducers({
    basicReducer,
    dashboardReducer,
    suppliersReducer,
    supplierDetailReducer,
    applicationDetailReducer,
    agreementsReducer,
    agreementDetailReducer,
    applicationsReducer,
    softwaresReducer,
    softwareDetailReducer,
    loginReducer,
    entitlementsReducer,
    entitlementDetailReducer,
    discussionReducer,
    applicationActivityReducer,
    newDiscussionReducer,
    signUpReducer,
    sheetsReducer,
    projectsReducer,
    projectDetailReducer,
    componentModalViewReducer,
    dataModelReducer,
    businessUnitsReducer,
    viewBusinessUnitsReducer,
    searchReducer,
    tasksReducer
})
