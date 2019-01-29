import { connect } from 'react-redux'
import { compose, lifecycle } from 'recompose'
import EntitlementDetail from '../../components/entitlementDetail/entitlementDetailComponent.js'
import { actions as sagaActions } from '../../redux/sagas/'
import { actionCreators } from '../../redux/reducers/entitlementDetailReducer/entitlementDetailReducerReducer'
import { actionCreators as newDiscussionActionCreators } from '../../redux/reducers/newDiscussionReducer/newDiscussionReducerReducer'
// Global State
export function mapStateToProps (state, props) {
  return {
    authenticateUser: state.basicReducer.authenticateUser,
    entitlement: state.entitlementDetailReducer.entitlement,
    entitlementSummary: state.entitlementDetailReducer.entitlementSummary,
    entitlementProperties: state.entitlementDetailReducer.entitlementProperties,
    entitlementRelationships: state.entitlementDetailReducer.entitlementRelationships,
    deleteEntitlementResponse: state.entitlementDetailReducer.deleteEntitlementResponse,
    updateEntitlementResponse: state.entitlementDetailReducer.updateEntitlementResponse,
    copiedEntitlementProperties: state.entitlementDetailReducer.copiedEntitlementProperties,
    copiedEntitlementData: state.entitlementDetailReducer.copiedEntitlementData,
    isEditComponent: state.entitlementDetailReducer.isEditComponent,
    entitlementPropertiesPayload: state.entitlementDetailReducer.entitlementPropertiesPayload,
    updateEntitlementSettings: state.entitlementDetailReducer.updateEntitlementSettings,
    updateEntitlementPropertyResponse: state.entitlementDetailReducer.updateEntitlementPropertyResponse,
    relationshipProperty: state.entitlementDetailReducer.relationshipProperty,
    relationshipPropertyPayload: state.entitlementDetailReducer.relationshipPropertyPayload,
    addNewConnectionSettings: state.entitlementDetailReducer.addNewConnectionSettings,
    componentTypeComponentConstraints: state.entitlementDetailReducer.componentTypeComponentConstraints,
    componentTypeComponents: state.entitlementDetailReducer.componentTypeComponents,
    updateRelationshipResponse: state.entitlementDetailReducer.updateRelationshipResponse,
    updateRelationshipPropertyResponse: state.entitlementDetailReducer.updateRelationshipPropertyResponse,
    deleteRelationshipResponse: state.entitlementDetailReducer.deleteRelationshipResponse,
    relationshipActionSettings: state.entitlementDetailReducer.relationshipActionSettings,
    showTabs: state.entitlementDetailReducer.showTabs
   }
}
// In Object form, each funciton is automatically wrapped in a dispatch
export const propsMapping: Callbacks = {
  fetchUserAuthentication: sagaActions.basicActions.fetchUserAuthentication,
  fetchEntitlementById: sagaActions.entitlementActions.fetchEntitlementById,
  fetchEntitlementProperties: sagaActions.entitlementActions.fetchEntitlementProperties,
  fetchEntitlementRelationships: sagaActions.entitlementActions.fetchEntitlementRelationships,
  deleteEntitlement: sagaActions.entitlementActions.deleteEntitlement,
  updateEntitlement: sagaActions.entitlementActions.updateEntitlement,
  updateEntitlementProperties: sagaActions.entitlementActions.updateEntitlementProperties,
  resetResponse: actionCreators.resetResponse,
  setUpdateEntitlementSettings: actionCreators.setUpdateEntitlementSettings,
  setEditComponentFlag: actionCreators.setEditComponentFlag,
  pushEntitlementPropertyPayload: actionCreators.pushEntitlementPropertyPayload,
  editEntitlementProperties: actionCreators.editEntitlementProperties,
  copyEntitlementProperties: actionCreators.copyEntitlementProperties,
  copyEntitlementData: actionCreators.copyEntitlementData,
  restoreEntitlementProperties: actionCreators.restoreEntitlementProperties,
  fetchRelationshipProperty: sagaActions.agreementActions.fetchRelationshipProperty,
  updateRelationshipProperty: sagaActions.agreementActions.updateRelationshipProperty,
  deleteComponentRelationship: sagaActions.agreementActions.deleteComponentRelationship,
  fetchComponentConstraints: sagaActions.agreementActions.fetchComponentConstraints,
  fetchComponentTypeComponents: sagaActions.agreementActions.fetchComponentTypeComponents,
  updateComponentTypeComponentRelationships: sagaActions.agreementActions.updateComponentTypeComponentRelationships,
  setRelationshipActionSettings: actionCreators.setRelationshipActionSettings,
  editComponentRelationshipProperties: actionCreators.editComponentRelationshipProperties,
  resetComponentRelationshipProperties: actionCreators.resetComponentRelationshipProperties,
  editComponentRelationshipPropertyPayload: actionCreators.editComponentRelationshipPropertyPayload,
  setAddConnectionSettings: actionCreators.setAddConnectionSettings,
  resetUpdateRelationshipResponse: actionCreators.resetUpdateRelationshipResponse,
  setDiscussionModalOpenStatus: newDiscussionActionCreators.setDiscussionModalOpenStatus,
  setCurrentTab: actionCreators.setCurrentTab
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
      // eslint-disable-next-line
      mApp.blockPage({overlayColor:'#000000',type:'loader',state:'success',message:'Processing...'})
      let payload = {
        'entitlement_id': this.props.match.params.id,
        'id': this.props.match.params.id
      }
      this.props.fetchEntitlementById && this.props.fetchEntitlementById(payload)
      this.props.fetchEntitlementProperties && this.props.fetchEntitlementProperties(payload)
      this.props.fetchEntitlementRelationships && this.props.fetchEntitlementRelationships(payload)
      this.props.fetchComponentConstraints && this.props.fetchComponentConstraints(payload)
    },
    componentDidMount: function () {
      // eslint-disable-next-line
      $('[data-toggle="m-tooltip"]').tooltip()
    },
    componentDidUpdate: function () {
      // eslint-disable-next-line
      var tooltips = $('.tooltip').not('.in')
      if (tooltips) {
        tooltips.remove()
      }
      // eslint-disable-next-line
      $('[data-toggle="m-tooltip"]').tooltip()
    },
    componentWillReceiveProps: function (nextProps) {
      if (nextProps.authenticateUser && nextProps.authenticateUser.resources) {
        if (!nextProps.authenticateUser.resources[0].result) {
          this.props.history.push('/')
        }
      }
      if (nextProps.entitlement && nextProps.entitlement !== this.props.entitlement) {
        // eslint-disable-next-line
        // mApp && mApp.unblockPage()
        if (nextProps.entitlement.error_code) {
          // eslint-disable-next-line
          toastr.error(nextProps.entitlement.error_message, nextProps.entitlement.error_code)
          this.props.history.push('/entitlements')
        }
      }
      if (nextProps.deleteEntitlementResponse && nextProps.deleteEntitlementResponse !== '') {
        if (nextProps.deleteEntitlementResponse.error_code === null) {
          // eslint-disable-next-line
          toastr.success('The Entitlement ' +  nextProps.deleteEntitlementResponse.resources[0].name  +  ' was successfully deleted', 'Zapped!')
          this.props.history.push('/entitlements')
        } else {
          // eslint-disable-next-line
          toastr.error(nextProps.deleteEntitlementResponse.error_message, nextProps.deleteEntitlementResponse.error_code)
        }
        this.props.resetResponse()
      }
      if (nextProps.updateEntitlementPropertyResponse && nextProps.updateEntitlementPropertyResponse !== '') {
        if (nextProps.updateEntitlementPropertyResponse.error_code === null) {
          let payload = {
            'entitlement_id': this.props.match.params.id
          }
          this.props.fetchEntitlementById && this.props.fetchEntitlementById(payload)
          // eslint-disable-next-line
          toastr.success('The ' + this.props.entitlement.resources[0].name + ' was successfully updated', 'Good Stuff!')
        } else {
          // eslint-disable-next-line
          toastr.error(nextProps.updateEntitlementPropertyResponse.error_message, nextProps.updateEntitlementPropertyResponse.error_code)
        }
        this.props.resetResponse()
      }
      if (nextProps.componentTypeComponents && nextProps.componentTypeComponents !== this.props.componentTypeComponents) {
        let settingPayload = {...this.props.addNewConnectionSettings, 'isWaitingForApiResponse': false}
        this.props.setAddConnectionSettings(settingPayload)
      }
      if (nextProps.updateRelationshipResponse !== '') {
        if (nextProps.updateRelationshipResponse.result_code !== 1) {
          let payload = {
            'entitlement_id': this.props.match.params.id
          }
          this.props.fetchEntitlementRelationships && this.props.fetchEntitlementRelationships(payload)
          // eslint-disable-next-line
          toastr.success('We\'ve added the new relationships to the ' + this.props.entitlement.resources[0].name + '', 'Connecting the dots!')
        } else {
          // eslint-disable-next-line
          toastr.error(nextProps.updateRelationshipResponse.error_message, nextProps.updateRelationshipResponse.error_code)
        }
        this.props.resetUpdateRelationshipResponse()
      }
      if (nextProps.entitlementRelationships && nextProps.entitlementRelationships !== this.props.entitlementRelationships) {
        // eslint-disable-next-line
        mApp && mApp.unblockPage()
        if (nextProps.entitlementRelationships.error_code) {
          // eslint-disable-next-line
          toastr.error(nextProps.entitlementRelationships.error_message, nextProps.entitlementRelationships.error_code)
          this.props.history.push('/entitlements')
        }
      }
      if (nextProps.relationshipActionSettings && nextProps.relationshipActionSettings !== this.props.relationshipActionSettings) {
        if (nextProps.relationshipActionSettings.isModalOpen) {
          if (nextProps.relationshipActionSettings.actionType === 'edit') {
            // eslint-disable-next-line
            mApp && mApp.block('#relationshipPropertyContent .modal-content', {overlayColor:'#000000',type:'loader',state:'success',message:'Processing...'})
            let payload = {}
            payload.componentId = this.props.match.params.id
            payload.relationshipType = nextProps.relationshipActionSettings.selectedObject.relationship_type
            payload.relationshipId = nextProps.relationshipActionSettings.relationshipId
            this.props.fetchRelationshipProperty(payload)
          }
        }
      }
      if (nextProps.deleteRelationshipResponse !== '') {
        // eslint-disable-next-line
        mApp && mApp.unblockPage()
        if (nextProps.deleteRelationshipResponse.result_code !== 1) {
          let payload = {
            'entitlement_id': this.props.match.params.id
          }
          this.props.fetchEntitlementRelationships && this.props.fetchEntitlementRelationships(payload)
          // eslint-disable-next-line
          toastr.success('Successfully deleted relationship ' + this.props.relationshipActionSettings.relationshipText + ': ' + this.props.relationshipActionSettings.componentName + '', 'Disconnected')
        } else {
          // eslint-disable-next-line
          toastr.error(nextProps.deleteRelationshipResponse.error_message, nextProps.deleteRelationshipResponse.error_code)
        }
        this.props.resetUpdateRelationshipResponse()
        let settingPayload = {...this.props.relationshipActionSettings, 'isModalOpen': false}
        this.props.setRelationshipActionSettings(settingPayload)
      }
      if (nextProps.updateRelationshipPropertyResponse !== '') {
        // eslint-disable-next-line
        mApp && mApp.unblockPage()
        if (nextProps.updateRelationshipPropertyResponse.result_code !== 1) {
          // eslint-disable-next-line
          toastr.success('Successfully updated relationship ' + this.props.relationshipActionSettings.relationshipText + ': ' + this.props.relationshipActionSettings.componentName, 'Updated!')
        } else {
          // eslint-disable-next-line
          toastr.error(nextProps.updateRelationshipResponse.error_message, nextProps.updateRelationshipResponse.error_code)
        }
        this.props.resetUpdateRelationshipResponse()
        let settingPayload = {...this.props.relationshipActionSettings, 'isModalOpen': false}
        this.props.setRelationshipActionSettings(settingPayload)
      }
    }
  })
)(EntitlementDetail)
