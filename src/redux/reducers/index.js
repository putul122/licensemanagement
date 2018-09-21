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
    entitlementDetailReducer
})
