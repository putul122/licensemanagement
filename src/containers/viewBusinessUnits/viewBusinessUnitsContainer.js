import { connect } from 'react-redux'
import _ from 'lodash'
import { compose, lifecycle } from 'recompose'
import ViewBusinessUnits from '../../components/viewBusinessUnits/viewBusinessUnitsComponent'
import { actions as sagaActions } from '../../redux/sagas/'
import { actionCreators } from '../../redux/reducers/viewBusinessUnitsReducer/viewBusinessUnitsReducerReducer'
// import { actionCreators as basicActionCreators } from '../../redux/reducers/basicReducer/basicReducerReducer'
// import { actionCreators as newDiscussionActionCreators } from '../../redux/reducers/newDiscussionReducer/newDiscussionReducerReducer'
// Global State
export function mapStateToProps (state, props) {
  return {
    authenticateUser: state.basicReducer.authenticateUser,
    businessUnit: state.viewBusinessUnitsReducer.businessUnit,
    businessUnitAgreements: state.viewBusinessUnitsReducer.businessUnitAgreements,
    businessUnitEntitlements: state.viewBusinessUnitsReducer.businessUnitEntitlements,
    businessOwnsApplications: state.viewBusinessUnitsReducer.businessOwnsApplications,
    businessUsesApplications: state.viewBusinessUnitsReducer.businessUsesApplications,
    currentPage: state.viewBusinessUnitsReducer.currentPage,
    entitlementActionSettings: state.viewBusinessUnitsReducer.entitlementActionSettings,
    addBusinessUnitEntitlementResponse: state.viewBusinessUnitsReducer.addBusinessUnitEntitlementResponse,
    updateBusinessUnitEntitlementResponse: state.viewBusinessUnitsReducer.updateBusinessUnitEntitlementResponse,
    deleteBusinessUnitEntitlementResponse: state.viewBusinessUnitsReducer.deleteBusinessUnitEntitlementResponse,
    activeTab: state.viewBusinessUnitsReducer.activeTab,
    allEntitlements: state.viewBusinessUnitsReducer.allEntitlements,
    suppliers: state.viewBusinessUnitsReducer.suppliers,
    agreements: state.viewBusinessUnitsReducer.agreements,
    entitlements: state.viewBusinessUnitsReducer.entitlements
   }
}
// In Object form, each funciton is automatically wrapped in a dispatch
export const propsMapping: Callbacks = {
  fetchUserAuthentication: sagaActions.basicActions.fetchUserAuthentication,
  fetchBusinessUnitById: sagaActions.businessUnitsActions.fetchBusinessUnitById,
  fetchBusinessUnitAgreements: sagaActions.businessUnitsActions.fetchBusinessUnitAgreements,
  fetchBusinessUnitEntitlements: sagaActions.businessUnitsActions.fetchBusinessUnitEntitlements,
  fetchBusinessOwnsApplications: sagaActions.businessUnitsActions.fetchBusinessOwnsApplications,
  fetchBusinessUsesApplications: sagaActions.businessUnitsActions.fetchBusinessUsesApplications,
  addBusinessUnitEntitlements: sagaActions.businessUnitsActions.addBusinessUnitEntitlements,
  updateBusinessUnitEntitlements: sagaActions.businessUnitsActions.updateBusinessUnitEntitlements,
  deleteBusinessUnitEntitlements: sagaActions.businessUnitsActions.deleteBusinessUnitEntitlements,
  setCurrentPage: actionCreators.setCurrentPage,
  setEntitlementActionSettings: actionCreators.setEntitlementActionSettings,
  setActiveTab: actionCreators.setActiveTab,
  resetResponse: actionCreators.resetResponse,
  fetchComponentTypeComponents: sagaActions.businessUnitsActions.fetchComponentTypeComponents,
  fetchEntitlementsBySupplierAgreement: sagaActions.entitlementActions.fetchEntitlementsBySupplierAgreement,
  fetchAgreements: sagaActions.agreementActions.fetchAgreements,
  fetchSuppliers: sagaActions.supplierActions.fetchSuppliers
}

// If you want to use the function mapping
// export const propsMapping = (dispatch, ownProps) => {
//   return {
//     onClick: () => dispatch(actions.starsActions.FETCH_STARS)
//   }
// }
// eslint-disable-next-line
toastr.options = {
  'closeButton': false,
  'debug': false,
  'newestOnTop': false,
  'progressBar': false,
  'positionClass': 'toast-bottom-full-width',
  'preventDuplicates': false,
  'onclick': null,
  'showDuration': '300',
  'hideDuration': '1000',
  'timeOut': '4000',
  'extendedTimeOut': '1000',
  'showEasing': 'swing',
  'hideEasing': 'linear',
  'showMethod': 'fadeIn',
  'hideMethod': 'fadeOut'
}

export default compose(
  connect(mapStateToProps, propsMapping),
  lifecycle({
    componentWillMount: function () {
    this.props.fetchUserAuthentication && this.props.fetchUserAuthentication()
    let payload = {
      'business_unit_id': this.props.match.params.id,
      'search': '',
      'page_size': 10,
      'page': ''
    }
    let appPackage = JSON.parse(localStorage.getItem('packages'))
    let componentTypes = appPackage.resources[0].component_types
    let componentTypeId = _.result(_.find(componentTypes, function (obj) {
      return obj.key === 'Entitlement'
    }), 'component_type')
    this.props.fetchEntitlementsBySupplierAgreement && this.props.fetchEntitlementsBySupplierAgreement({})
    this.props.fetchAgreements && this.props.fetchAgreements({})
    this.props.fetchSuppliers && this.props.fetchSuppliers({})
    this.props.fetchBusinessUnitById && this.props.fetchBusinessUnitById(payload)
    this.props.fetchBusinessUnitAgreements && this.props.fetchBusinessUnitAgreements(payload)
    this.props.fetchBusinessUnitEntitlements && this.props.fetchBusinessUnitEntitlements(payload)
    this.props.fetchBusinessOwnsApplications && this.props.fetchBusinessOwnsApplications(payload)
    this.props.fetchBusinessUsesApplications && this.props.fetchBusinessUsesApplications(payload)
    this.props.fetchComponentTypeComponents && this.props.fetchComponentTypeComponents(componentTypeId)
    // // eslint-disable-next-line
    // mApp && mApp.block('#bussinessUnitsAllList', {overlayColor:'#000000',type:'loader',state:'success',message:'Processing...'})
    },
    componentDidMount: function () {
      // eslint-disable-next-line
      $('[data-toggle="m-tooltip"]').tooltip()
       // eslint-disable-next-line
      mApp && mApp.block('#entitlementSummary', {textAlign: 'center',overlayColor:'#000000',type:'loader',state:'success',message:'Processing...'})
      // eslint-disable-next-line
      mApp && mApp.block('#bussinessUnitsAllList', {overlayColor:'#000000',type:'loader',state:'success',message:'Processing...'})
    },
    componentWillReceiveProps: function (nextProps) {
      let payload = {
        'business_unit_id': this.props.match.params.id
      }
      if (nextProps.authenticateUser && nextProps.authenticateUser.resources) {
        if (!nextProps.authenticateUser.resources[0].result) {
          this.props.history.push('/')
        }
      }
     if (nextProps.businessUnit && nextProps.businessUnit !== this.props.businessUnit) {
      // eslint-disable-next-line
      mApp && mApp.unblock('#entitlementSummary')
      }
      if (nextProps.businessOwnsApplications && nextProps.businessOwnsApplications !== this.props.businessOwnsApplications) {
        // eslint-disable-next-line
        mApp && mApp.unblock('#bussinessUnitsAllList')
      }
      if (nextProps.businessUnitAgreements && nextProps.businessUnitAgreements !== this.props.businessUnitAgreements) {
        // eslint-disable-next-line
        mApp && mApp.unblock('#bussinessUnitsAllList')
      }
      if (nextProps.businessUnitEntitlements && nextProps.businessUnitEntitlements !== this.props.businessUnitEntitlements) {
        // eslint-disable-next-line
        mApp && mApp.unblock('#bussinessUnitsAllList')
      }
      if (nextProps.businessUsesApplications && nextProps.businessUsesApplications !== this.props.businessUsesApplications) {
        // eslint-disable-next-line
        mApp && mApp.unblock('#bussinessUnitsAllList')
      }
      if (nextProps.addBusinessUnitEntitlementResponse && nextProps.addBusinessUnitEntitlementResponse !== '') {
        // eslint-disable-next-line
        mApp && mApp.unblockPage()
        if (nextProps.addBusinessUnitEntitlementResponse.error_code === null) {
          this.props.fetchBusinessUnitById && this.props.fetchBusinessUnitById(payload)
          this.props.fetchBusinessUnitEntitlements && this.props.fetchBusinessUnitEntitlements(payload)
          // eslint-disable-next-line
          toastr.success('The busines unit entitlement was successfully added', 'Connecting the dots!')
        } else {
          // eslint-disable-next-line
          toastr.error(nextProps.addBusinessUnitEntitlementResponse.error_message, nextProps.addBusinessUnitEntitlementResponse.error_code)
        }
        let entitlementActionSettings = {...this.props.entitlementActionSettings, 'isLinkModalOpen': false}
        this.props.setEntitlementActionSettings(entitlementActionSettings)
        this.props.resetResponse()
      }
      if (nextProps.updateBusinessUnitEntitlementResponse && nextProps.updateBusinessUnitEntitlementResponse !== '') {
        // eslint-disable-next-line
        mApp && mApp.unblockPage()
        if (nextProps.updateBusinessUnitEntitlementResponse.error_code === null) {
          this.props.fetchBusinessUnitById && this.props.fetchBusinessUnitById(payload)
          this.props.fetchBusinessUnitEntitlements && this.props.fetchBusinessUnitEntitlements(payload)
          // eslint-disable-next-line
          toastr.success('The business unit entitlement was successfully updated', 'Good Stuff!')
        } else {
          // eslint-disable-next-line
          toastr.error(nextProps.updateBusinessUnitEntitlementResponse.error_message, nextProps.updateBusinessUnitEntitlementResponse.error_code)
        }
        this.props.resetResponse()
      }
      if (nextProps.deleteBusinessUnitEntitlementResponse && nextProps.deleteBusinessUnitEntitlementResponse !== '') {
        // eslint-disable-next-line
        mApp && mApp.unblockPage()
        if (nextProps.deleteBusinessUnitEntitlementResponse.error_code === null) {
          this.props.fetchBusinessUnitById && this.props.fetchBusinessUnitById(payload)
          this.props.fetchBusinessUnitEntitlements && this.props.fetchBusinessUnitEntitlements(payload)
          // eslint-disable-next-line
          toastr.success('The business unit entitlement was successfully deleted', 'Disconnected')
        } else {
          // eslint-disable-next-line
          toastr.error(nextProps.deleteBusinessUnitEntitlementResponse.error_message, nextProps.deleteBusinessUnitEntitlementResponse.error_code)
        }
        this.props.resetResponse()
      }
      if (nextProps.entitlements && nextProps.entitlements !== '') {
        // eslint-disable-next-line
        // mApp && mApp.unblockPage()
        if (nextProps.entitlements.error_code) {
          // eslint-disable-next-line
          toastr.error(nextProps.entitlements.error_message, nextProps.entitlements.error_code)
        }
      }
      if (nextProps.suppliers && nextProps.suppliers !== '') {
        // eslint-disable-next-line
        // mApp && mApp.unblockPage()
        if (nextProps.suppliers.error_code) {
          // eslint-disable-next-line
          toastr.error(nextProps.suppliers.error_message, nextProps.suppliers.error_code)
        }
      }
      if (nextProps.agreements && nextProps.agreements !== '') {
        // eslint-disable-next-line
        // mApp && mApp.unblockPage()
        if (nextProps.agreements.error_code) {
          // eslint-disable-next-line
          toastr.error(nextProps.agreements.error_message, nextProps.agreements.error_code)
        }
      }
    }
  })
)(ViewBusinessUnits)
