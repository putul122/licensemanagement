import { connect } from 'react-redux'
import { compose, lifecycle } from 'recompose'
import AgreementDetail from '../../components/agreementDetail/agreementDetailComponent'
import { actions as sagaActions } from '../../redux/sagas/'
import _ from 'lodash'
import { actionCreators } from '../../redux/reducers/agreementDetailReducer/agreementDetailReducerReducer'
import { actionCreators as newDiscussionActionCreators } from '../../redux/reducers/newDiscussionReducer/newDiscussionReducerReducer'
// Global State
export function mapStateToProps (state, props) {
  return {
    authenticateUser: state.basicReducer.authenticateUser,
    agreement: state.agreementDetailReducer.agreement,
    agreementProperties: state.agreementDetailReducer.agreementProperties,
    agreementRelationships: state.agreementDetailReducer.agreementRelationships,
    agreementEntitlements: state.agreementDetailReducer.agreementEntitlements,
    addAgreementSettings: state.agreementDetailReducer.addAgreementSettings,
    relationshipActionSettings: state.agreementDetailReducer.relationshipActionSettings,
    deleteAgreementResponse: state.agreementDetailReducer.deleteAgreementResponse,
    updateAgreementResponse: state.agreementDetailReducer.updateAgreementResponse,
    isEditComponent: state.agreementDetailReducer.isEditComponent,
    agreementPropertiesPayload: state.agreementDetailReducer.agreementPropertiesPayload,
    copiedAgreementProperties: state.agreementDetailReducer.copiedAgreementProperties,
    copiedAgreementData: state.agreementDetailReducer.copiedAgreementData,
    relationshipProperty: state.agreementDetailReducer.relationshipProperty,
    relationshipPropertyPayload: state.agreementDetailReducer.relationshipPropertyPayload,
    addNewConnectionSettings: state.agreementDetailReducer.addNewConnectionSettings,
    componentTypeComponentConstraints: state.agreementDetailReducer.componentTypeComponentConstraints,
    componentTypeComponents: state.agreementDetailReducer.componentTypeComponents,
    updateRelationshipResponse: state.agreementDetailReducer.updateRelationshipResponse,
    updateRelationshipPropertyResponse: state.agreementDetailReducer.updateRelationshipPropertyResponse,
    deleteRelationshipResponse: state.agreementDetailReducer.deleteRelationshipResponse,
    currentPage: state.agreementDetailReducer.currentPage,
    validationProperty: state.agreementDetailReducer.validationProperty,
    addConditionActionSettings: state.agreementDetailReducer.addConditionActionSettings,
    agreementConditions: state.agreementDetailReducer.agreementConditions,
    agreementCondition: state.agreementDetailReducer.agreementCondition,
    addAgreementConditionResponse: state.agreementDetailReducer.addAgreementConditionResponse,
    deleteAgreementConditionResponse: state.agreementDetailReducer.deleteAgreementConditionResponse,
    updateAgreementConditionResponse: state.agreementDetailReducer.updateAgreementConditionResponse,
    notificationPeriodData: state.agreementDetailReducer.notificationPeriodData,
    agreementConditionNotificationPeriod: state.agreementDetailReducer.agreementConditionNotificationPeriod,
    selectedDate: state.agreementDetailReducer.selectedDate,
    selectedNotificationPeriod: state.agreementDetailReducer.selectedNotificationPeriod,
    updateAgreementConditionSettings: state.agreementDetailReducer.updateAgreementConditionSettings,
    agreementPurchaseOrders: state.agreementDetailReducer.agreementPurchaseOrders,
    agreementPurchaseOrderById: state.agreementDetailReducer.agreementPurchaseOrderById,
    agreementPurchaseOrderSettings: state.agreementDetailReducer.agreementPurchaseOrderSettings
  }
}
// In Object form, each funciton is automatically wrapped in a dispatch
export const propsMapping: Callbacks = {
  fetchUserAuthentication: sagaActions.basicActions.fetchUserAuthentication,
  fetchAgreementById: sagaActions.agreementActions.fetchAgreementById,
  fetchAgreementEntitlements: sagaActions.agreementActions.fetchAgreementEntitlements,
  fetchAgreementProperties: sagaActions.agreementActions.fetchAgreementProperties,
  fetchAgreementRelationships: sagaActions.agreementActions.fetchAgreementRelationships,
  deleteAgreement: sagaActions.agreementActions.deleteAgreement,
  updateAgreement: sagaActions.agreementActions.updateAgreement,
  updateAgreementProperties: sagaActions.agreementActions.updateAgreementProperties,
  fetchRelationshipProperty: sagaActions.agreementActions.fetchRelationshipProperty,
  updateRelationshipProperty: sagaActions.agreementActions.updateRelationshipProperty,
  deleteComponentRelationship: sagaActions.agreementActions.deleteComponentRelationship,
  fetchComponentConstraints: sagaActions.agreementActions.fetchComponentConstraints,
  fetchComponentTypeComponents: sagaActions.agreementActions.fetchComponentTypeComponents,
  updateComponentTypeComponentRelationships: sagaActions.agreementActions.updateComponentTypeComponentRelationships,
  setAddAgreementSettings: actionCreators.setAddAgreementSettings,
  setRelationshipActionSettings: actionCreators.setRelationshipActionSettings,
  resetResponse: actionCreators.resetResponse,
  setEditComponentFlag: actionCreators.setEditComponentFlag,
  pushComponentPropertyPayload: actionCreators.pushComponentPropertyPayload,
  editComponentProperties: actionCreators.editComponentProperties,
  copyAgreementProperties: actionCreators.copyAgreementProperties,
  copyAgreementData: actionCreators.copyAgreementData,
  restoreAgreementProperties: actionCreators.restoreAgreementProperties,
  editComponentRelationshipProperties: actionCreators.editComponentRelationshipProperties,
  resetComponentRelationshipProperties: actionCreators.resetComponentRelationshipProperties,
  editComponentRelationshipPropertyPayload: actionCreators.editComponentRelationshipPropertyPayload,
  setAddConnectionSettings: actionCreators.setAddConnectionSettings,
  resetUpdateRelationshipResponse: actionCreators.resetUpdateRelationshipResponse,
  setCurrentPage: actionCreators.setCurrentPage,
  setValidationProperty: actionCreators.setValidationProperty,
  setDiscussionModalOpenStatus: newDiscussionActionCreators.setDiscussionModalOpenStatus,
  setAddConditionSettings: actionCreators.setAddConditionSettings,
  setNotificationPeriodData: actionCreators.setNotificationPeriodData,
  fetchAgreementConditions: sagaActions.agreementActions.fetchAgreementConditions,
  fetchAgreementConditionById: sagaActions.agreementActions.fetchAgreementConditionById,
  addAgreementCondition: sagaActions.agreementActions.addAgreementCondition,
  deleteAgreementCondition: sagaActions.agreementActions.deleteAgreementCondition,
  updateAgreementCondition: sagaActions.agreementActions.updateAgreementCondition,
  fetchAgreementConditionNotificationPeriod: sagaActions.agreementActions.fetchAgreementConditionNotificationPeriod,
  setSelectedDate: actionCreators.setSelectedDate,
  setSelectedNotificationPeriod: actionCreators.setSelectedNotificationPeriod,
  setUpdateAgreementConditionSettings: actionCreators.setUpdateAgreementConditionSettings,
  fetchAgreementPurchaseOrder: sagaActions.agreementActions.fetchAgreementPurchaseOrder,
  fetchAgreementPurchaseOrderById: sagaActions.agreementActions.fetchAgreementPurchaseOrderById,
  setPurchaseOrderSettings: actionCreators.setPurchaseOrderSettings
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
      // eslint-disable-next-line
      mApp.blockPage({overlayColor:'#000000',type:'loader',state:'success',message:'Processing...'})
      this.props.fetchUserAuthentication && this.props.fetchUserAuthentication()
      let payload = {
        'agreement_id': this.props.match.params.id
        // 'id': this.props.match.params.id
      }
      // let payload = {
      //   'agreement_id': props.match.params.id,
      //   'condition_id': data.id
      // }
      // props.fetchAgreementConditionById(payload)
      this.props.fetchAgreementById && this.props.fetchAgreementById(payload)
      this.props.fetchAgreementEntitlements && this.props.fetchAgreementEntitlements(payload)
      this.props.fetchAgreementProperties && this.props.fetchAgreementProperties(payload)
      this.props.fetchAgreementRelationships && this.props.fetchAgreementRelationships(payload)
      this.props.fetchComponentConstraints && this.props.fetchComponentConstraints(payload)
      this.props.fetchAgreementConditions && this.props.fetchAgreementConditions(payload)
      this.props.fetchAgreementPurchaseOrder && this.props.fetchAgreementPurchaseOrder(payload)
      let appPackage = JSON.parse(localStorage.getItem('packages'))
      let componentTypeId = appPackage.resources[0].component_types
      let notificationPeriodProperty = _.result(_.find(componentTypeId, function (obj) {
        return obj.key === 'Agreement Condition'
      }), 'component_type')
      console.log('data for notification', notificationPeriodProperty)
      this.props.fetchAgreementConditionNotificationPeriod && this.props.fetchAgreementConditionNotificationPeriod(notificationPeriodProperty)
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
      let payload = {
        'agreement_id': this.props.match.params.id
      }
      if (nextProps.authenticateUser && nextProps.authenticateUser.resources) {
        if (!nextProps.authenticateUser.resources[0].result) {
          this.props.history.push('/')
        }
      }
      if (nextProps.agreement && nextProps.agreement !== this.props.agreement) {
        // eslint-disable-next-line
        mApp && mApp.unblockPage()
        if (nextProps.agreement.error_code) {
          // eslint-disable-next-line
          toastr.error(nextProps.agreement.error_message, nextProps.agreement.error_code)
          this.props.history.push('/agreements')
        }
      }
      if (nextProps.agreementRelationships && nextProps.agreementRelationships !== this.props.agreementRelationships) {
        // eslint-disable-next-line
        mApp && mApp.unblockPage()
      }
      if (nextProps.deleteAgreementResponse && nextProps.deleteAgreementResponse !== '') {
        // eslint-disable-next-line
        mApp && mApp.unblockPage()
        if (nextProps.deleteAgreementResponse.error_code === null) {
          // eslint-disable-next-line
          toastr.success('The Agreement ' +  nextProps.deleteAgreementResponse.resources[0].name  +  ' was successfully deleted', 'Zapped!')
          this.props.history.push('/agreements')
        } else {
          // eslint-disable-next-line
          toastr.error(nextProps.deleteAgreementResponse.error_message, nextProps.deleteAgreementResponse.error_code)
        }
        this.props.resetResponse()
      }
      if (nextProps.updateAgreementResponse && nextProps.updateAgreementResponse !== '') {
        // eslint-disable-next-line
        mApp && mApp.unblockPage()
        if (nextProps.updateAgreementResponse.error_code === null) {
          this.props.fetchAgreementById && this.props.fetchAgreementById(payload)
          // eslint-disable-next-line
          toastr.success('The ' + this.props.agreement.resources[0].name + ' was successfully updated', 'Good Stuff!')
        } else {
          let payload = {}
          payload.property = JSON.parse(JSON.stringify(this.props.copiedAgreementProperties))
          payload.agreement = JSON.parse(JSON.stringify(this.props.copiedAgreementData))
          this.props.restoreAgreementProperties(payload)
          // eslint-disable-next-line
          toastr.error(nextProps.updateAgreementResponse.error_message, nextProps.updateAgreementResponse.error_code)
        }
        this.props.resetResponse()
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
      if (nextProps.componentTypeComponents && nextProps.componentTypeComponents !== this.props.componentTypeComponents) {
        let settingPayload = {...this.props.addNewConnectionSettings, 'isWaitingForApiResponse': false}
        this.props.setAddConnectionSettings(settingPayload)
      }
      if (nextProps.updateRelationshipResponse !== '') {
        if (nextProps.updateRelationshipResponse.result_code !== 1) {
          let payload = {
            'agreement_id': this.props.match.params.id
          }
          this.props.fetchAgreementRelationships && this.props.fetchAgreementRelationships(payload)
          // eslint-disable-next-line
          toastr.success('We\'ve added the new relationships to the ' + this.props.agreement.resources[0].name + '', 'Connecting the dots!')
        } else {
          // eslint-disable-next-line
          toastr.error(nextProps.updateRelationshipResponse.error_message, nextProps.updateRelationshipResponse.error_code)
        }
        this.props.resetUpdateRelationshipResponse()
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
      if (nextProps.deleteRelationshipResponse !== '') {
        // eslint-disable-next-line
        mApp && mApp.unblockPage()
        if (nextProps.deleteRelationshipResponse.result_code !== 1) {
          let payload = {
            'agreement_id': this.props.match.params.id
          }
          this.props.fetchAgreementRelationships && this.props.fetchAgreementRelationships(payload)
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
      if (nextProps.agreementConditionNotificationPeriod && nextProps.agreementConditionNotificationPeriod !== '') {
        if (nextProps.agreementConditionNotificationPeriod.error_code === null) {
          let appPackage = JSON.parse(localStorage.getItem('packages'))
          let notificationProperty = appPackage.resources[0].component_type_properties
          let propertyId = _.result(_.find(notificationProperty, function (obj) {
            return obj.key === 'Agreement Condition~Notification Period'
          }), 'component_type_property')
          console.log('****', propertyId)
          if (nextProps.agreementConditionNotificationPeriod.resources.length > 0) {
            nextProps.agreementConditionNotificationPeriod.resources.forEach(function (data, index) {
              console.log(data)
              let valueSet = _.result(_.find(data.properties, function (obj) {
                return obj.id === propertyId
              }), 'value_set')
              console.log('value set', valueSet)
              if (valueSet) {
                console.log(valueSet.values, 'inside if')
                nextProps.setNotificationPeriodData(valueSet.values)
              }
            })
          }
        } else {
          // eslint-disable-next-line
          toastr.error(nextProps.agreementProperties.error_message, nextProps.agreementProperties.error_code)
        }
      }
      if (nextProps.addAgreementConditionResponse && nextProps.addAgreementConditionResponse !== '') {
        // eslint-disable-next-line
        mApp && mApp.unblockPage()
        if (nextProps.addAgreementConditionResponse.error_code === null) {
          this.props.fetchAgreementConditions && this.props.fetchAgreementConditions(payload)
          // eslint-disable-next-line
          toastr.success('The agreement condition was successfully added', 'Connecting the dots!')
        } else {
          // eslint-disable-next-line
          toastr.error(nextProps.addAgreementConditionResponse.error_message, nextProps.addAgreementConditionResponse.error_code)
        }
        this.props.resetResponse()
      }
      if (nextProps.deleteAgreementConditionResponse && nextProps.deleteAgreementConditionResponse !== '') {
        // eslint-disable-next-line
        mApp && mApp.unblockPage()
        if (nextProps.deleteAgreementConditionResponse.error_code === null) {
          this.props.fetchAgreementConditions && this.props.fetchAgreementConditions(payload)
          // eslint-disable-next-line
          toastr.success('The agreement ' + this.props.agreementCondition.resources[0].name + ' condition was successfully deleted', 'Disconnected')
        } else {
          // eslint-disable-next-line
          toastr.error(nextProps.deleteAgreementConditionResponse.error_message, nextProps.deleteAgreementConditionResponse.error_code)
        }
        this.props.resetResponse()
      }
      if (nextProps.updateAgreementConditionResponse && nextProps.updateAgreementConditionResponse !== '') {
        // eslint-disable-next-line
        mApp && mApp.unblockPage()
        if (nextProps.updateAgreementConditionResponse.error_code === null) {
          this.props.fetchAgreementConditions && this.props.fetchAgreementConditions(payload)
          // eslint-disable-next-line
          toastr.success('The agreement ' + this.props.agreementCondition.resources[0].name + ' was successfully updated', 'Good Stuff!')
        } else {
          // eslint-disable-next-line
          toastr.error(nextProps.updateAgreementConditionResponse.error_message, nextProps.updateAgreementConditionResponse.error_code)
        }
        this.props.resetResponse()
      }
    }
  })
)(AgreementDetail)
