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
    agreementPurchaseOrderSettings: state.agreementDetailReducer.agreementPurchaseOrderSettings,
    addSettings: state.agreementDetailReducer.addSettings,
    metaModelPerspective: state.agreementDetailReducer.metaModelPerspective,
    availableAction: state.agreementDetailReducer.availableAction,
    connectionData: state.agreementDetailReducer.connectionData,
    dropdownData: state.agreementDetailReducer.dropdownData,
    modelPerspective: state.agreementDetailReducer.modelPerspective,
    updateModelPerspectiveResponse: state.agreementDetailReducer.updateModelPerspectiveResponse
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
  setPurchaseOrderSettings: actionCreators.setPurchaseOrderSettings,
  setConnectionData: actionCreators.setConnectionData,
  setAvailableAction: actionCreators.setAvailableAction,
  updateModelPrespectives: sagaActions.modelActions.updateModelPrespectives,
  setAddSettings: actionCreators.setAddSettings,
  fetchMetaModelPrespective: sagaActions.modelActions.fetchMetaModelPrespective,
  fetchModelPerspective: sagaActions.modelActions.fetchModelPerspective,
  fetchDropdownData: sagaActions.basicActions.fetchDropdownData
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
      }
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
      this.props.fetchAgreementConditionNotificationPeriod && this.props.fetchAgreementConditionNotificationPeriod(notificationPeriodProperty)
      let perspectives = appPackage.resources[0].perspectives
      let perspectiveObj = _.find(perspectives, function (obj) {
        return (obj.key === 'Agreement_Update' && obj.role_key === 'Update')
      })
      let perspectiveId = perspectiveObj.perspective
      let metaPayload = {}
      metaPayload.id = perspectiveId
      metaPayload.data = {'view_key': perspectiveObj.view_key}
      this.props.fetchMetaModelPrespective && this.props.fetchMetaModelPrespective(metaPayload)
      let paydata = {}
      paydata['meta_model_perspective_id'] = perspectiveId
      paydata['view_key'] = perspectiveObj.view_key
      let modelPerspectivePayload = {}
      modelPerspectivePayload.id = this.props.match.params.id
      modelPerspectivePayload.data = paydata
      this.props.fetchModelPerspective(modelPerspectivePayload)
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
      if (nextProps.modelPerspective && nextProps.modelPerspective !== '' && !nextProps.availableAction.toProcessMetaModel && nextProps.connectionData !== '' && nextProps.availableAction.toProcessModelPerspectives) {
        if (nextProps.modelPerspective.error_code === null) {
          console.log('crudModelPerspectives', nextProps.modelPerspective)
          let addSettings = JSON.parse(JSON.stringify(nextProps.addSettings))
          let labelParts = nextProps.metaModelPerspective.resources[0].parts
          let data = nextProps.modelPerspective.resources[0]
          let selectedValues = []
          let setCustomerProperty = []
          if (data.parts) {
            labelParts.forEach(function (partData, ix) {
              console.log(partData, data.parts[ix])
              if (partData.standard_property !== null && partData.type_property === null) { // Standard Property
                if (partData.standard_property === 'name') {
                  addSettings.name = data.parts[ix].value
                }
                if (partData.standard_property === 'description') {
                  addSettings.description = data.parts[ix].value
                }
              } else if (partData.standard_property === null && partData.type_property === null) { // Connection Property
                if (data.parts[ix].value.length > 0) {
                  // todo write code for multiple component
                  let eachSelectedValues = []
                  data.parts[ix].value.forEach(function (value, ix) {
                    let targetComponent = value.target_component
                    targetComponent.label = targetComponent.name
                    targetComponent.value = targetComponent.id
                    eachSelectedValues.push(targetComponent)
                  })
                  selectedValues.push(eachSelectedValues)
                } else {
                  selectedValues.push(null)
                }
              } else if (partData.standard_property === null && partData.type_property !== null) { // Customer Property
                let value = null
                if (labelParts[ix].type_property.property_type.key === 'Integer') { // below are Customer Property
                  value = data.parts[ix].value !== null ? data.parts[ix].value.int_value : ''
                } else if (labelParts[ix].type_property.property_type.key === 'Decimal') {
                  value = data.parts[ix].value !== null ? data.parts[ix].value.float_value : ''
                } else if (labelParts[ix].type_property.property_type.key === 'Text') {
                  value = data.parts[ix].value !== null ? data.parts[ix].value.text_value : ''
                } else if (labelParts[ix].type_property.property_type.key === 'DateTime') {
                  value = data.parts[ix].value !== null ? data.parts[ix].value.date_time_value : ''
                } else if (labelParts[ix].type_property.property_type.key === 'Boolean') {
                  value = data.parts[ix].value !== null ? data.parts[ix].value.boolean_value : ''
                } else if (labelParts[ix].type_property.property_type.key === 'List') {
                  value = data.parts[ix].value !== null ? data.parts[ix].value.value_set_value : ''
                } else {
                  value = data.parts[ix].value !== null ? data.parts[ix].value.other_value : ''
                }
                setCustomerProperty.push(value)
              }
            })
          }
          addSettings.updateObject = data
          nextProps.setAddSettings(addSettings)
          let connectionData = {...nextProps.connectionData}
          let existingCustomerProperty = connectionData.customerProperty.map(function (data, index) {
            if (data.type_property.property_type.key === 'Boolean') {
              data.type_property.boolean_value = setCustomerProperty[index]
            } else if (data.type_property.property_type.key === 'Integer') {
              data.type_property.int_value = setCustomerProperty[index]
            } else if (data.type_property.property_type.key === 'Decimal') {
              data.type_property.float_value = setCustomerProperty[index]
            } else if (data.type_property.property_type.key === 'DateTime') {
              data.type_property.date_time_value = setCustomerProperty[index]
            } else if (data.type_property.property_type.key === 'Text') {
              data.type_property.text_value = setCustomerProperty[index]
            } else {
              data.type_property.other_value = setCustomerProperty[index]
            }
            return data
          })
          connectionData.customerProperty = existingCustomerProperty
          connectionData.selectedValues = selectedValues
          connectionData.initialSelectedValues = JSON.parse(JSON.stringify(selectedValues))
          nextProps.setConnectionData(connectionData)
          let availableAction = nextProps.availableAction
          availableAction['toProcessModelPerspectives'] = false
          nextProps.setAvailableAction(availableAction)
        } else {
          // eslint-disable-next-line
          toastr.error(nextProps.modelPerspective.error_message, nextProps.modelPerspective.error_code)
        }
      }
      if (nextProps.metaModelPerspective && nextProps.metaModelPerspective !== '' && nextProps.availableAction.toProcessMetaModel) {
        if (nextProps.metaModelPerspective.resources[0].crude) {
          let availableAction = {...nextProps.availableAction}
          let crude = nextProps.crude
          let mask = nextProps.metaModelPerspective.resources[0].crude
          let labelParts = nextProps.metaModelPerspective.resources[0].parts
          let connectionData = {}
          connectionData.operation = {
            toCallApi: true,
            isComplete: false,
            processIndex: 0
          }
          connectionData.selectedValues = []
          let cData = []
          let customerProperty = []
          for (let option in crude) {
            if (crude.hasOwnProperty(option)) {
              if (mask & crude[option]) {
                availableAction[option] = true
              }
            }
          }
          labelParts.forEach(function (data, index) {
            if (data.standard_property === null && data.type_property === null) {
              let obj = {}
              obj.name = data.name
              if (data.constraint_inverted) {
                obj.componentId = data.constraint.component_type.id
              } else {
                obj.componentId = data.constraint.target_component_type.id
              }
              obj.data = null
              obj.processed = false
              obj.partIndex = index
              obj.max = data.constraint.max
              obj.min = data.constraint.min
              cData.push(obj)
              connectionData.selectedValues.push(null)
            }
            if (data.standard_property === null && data.type_property !== null) {
              data.partIndex = index
              customerProperty.push(data)
            }
          })
          connectionData.data = cData
          connectionData.customerProperty = customerProperty
          connectionData.selectOption = []
          nextProps.setConnectionData(connectionData)
          availableAction['toProcessMetaModel'] = false
          nextProps.setAvailableAction(availableAction)
        }
      }
      if (nextProps.connectionData !== '' && nextProps.connectionData.operation.toCallApi && !nextProps.connectionData.operation.isComplete) {
        console.log('nextProps.connectionData', nextProps.connectionData)
        let connectionData = {...nextProps.connectionData}
        let processIndex = nextProps.connectionData.operation.processIndex
        let totalLength = nextProps.connectionData.data.length
        if (processIndex < totalLength) {
          let processData = nextProps.connectionData.data[processIndex]
          nextProps.fetchDropdownData && nextProps.fetchDropdownData(processData.componentId)
          connectionData.operation.processIndex = processIndex + 1
          connectionData.operation.toCallApi = false
        }
        if (processIndex === totalLength) {
          connectionData.operation.isComplete = true
        }
        nextProps.setConnectionData(connectionData)
      }
      if (nextProps.dropdownData !== '') {
        console.log('nextProps.dropdownData', nextProps.dropdownData)
        if (nextProps.dropdownData.error_code === null) {
          let connectionData = {...nextProps.connectionData}
          connectionData.selectOption.push(nextProps.dropdownData.resources)
          connectionData.operation.toCallApi = true
          nextProps.setConnectionData(connectionData)
        } else {
          // eslint-disable-next-line
          toastr.error(nextProps.dropdownData.error_message, nextProps.dropdownData.error_code)
        }
        this.props.resetResponse()
      }
      if (nextProps.updateModelPerspectiveResponse && nextProps.updateModelPerspectiveResponse !== '') {
        let addSettings = {...nextProps.addSettings}
        addSettings.name = ''
        addSettings.description = ''
        addSettings.updateResponse = nextProps.updateModelPerspectiveResponse
        nextProps.setAddSettings(addSettings)
        let payload = {
          'agreement_id': this.props.match.params.id
        }
        this.props.fetchAgreementById && this.props.fetchAgreementById(payload)
        this.props.fetchAgreementProperties && this.props.fetchAgreementProperties(payload)
        this.props.fetchAgreementRelationships && this.props.fetchAgreementRelationships(payload)
        let appPackage = JSON.parse(localStorage.getItem('packages'))
        let perspectives = appPackage.resources[0].perspectives
        let perspectiveObj = _.find(perspectives, function (obj) {
          return (obj.key === 'Agreement_Update' && obj.role_key === 'Update')
        })
        let paydata = {}
        paydata['meta_model_perspective_id'] = perspectiveObj.perspective
        paydata['view_key'] = perspectiveObj.view_key
        let modelPerspectivePayload = {}
        modelPerspectivePayload.id = this.props.match.params.id
        modelPerspectivePayload.data = paydata
        this.props.fetchModelPerspective(modelPerspectivePayload)
        nextProps.resetResponse()
      }
    }
  })
)(AgreementDetail)
