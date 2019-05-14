import { connect } from 'react-redux'
import { compose, lifecycle } from 'recompose'
import EntitlementDetail from '../../components/entitlementDetail/entitlementDetailComponent.js'
import { actions as sagaActions } from '../../redux/sagas/'
import _ from 'lodash'
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
    showTabs: state.entitlementDetailReducer.showTabs,
    validationProperty: state.entitlementDetailReducer.validationProperty,
    addSettings: state.entitlementDetailReducer.addSettings,
    metaModelPerspective: state.entitlementDetailReducer.metaModelPerspective,
    availableAction: state.entitlementDetailReducer.availableAction,
    connectionData: state.entitlementDetailReducer.connectionData,
    dropdownData: state.entitlementDetailReducer.dropdownData,
    modelPerspective: state.entitlementDetailReducer.modelPerspective,
    updateModelPerspectiveResponse: state.entitlementDetailReducer.updateModelPerspectiveResponse
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
  setCurrentTab: actionCreators.setCurrentTab,
  setValidationProperty: actionCreators.setValidationProperty,
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
      let appPackage = JSON.parse(localStorage.getItem('packages'))
      let perspectives = appPackage.resources[0].perspectives
      let perspectiveObj = _.find(perspectives, function (obj) {
        return (obj.key === 'Entitlement_Update' && obj.role_key === 'Update')
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
      if (nextProps.modelPerspective && nextProps.modelPerspective !== '' && !nextProps.availableAction.toProcessMetaModel && nextProps.connectionData !== '' && nextProps.availableAction.toProcessModelPerspectives) {
        if (nextProps.modelPerspective.error_code === null) {
          console.log('crudModelPerspectives', nextProps.modelPerspective)
          let addSettings = JSON.parse(JSON.stringify(nextProps.addSettings))
          let labelParts = nextProps.metaModelPerspective.resources[0].parts
          let data = nextProps.modelPerspective.resources[0]
          let selectedValues = []
          let setCustomerProperty = []
          let entitlementProperties = []
          // let entitlementRelationships = []
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
                let obj = {}
                obj.name = labelParts[ix].name
                obj.value = data.parts[ix].value
                entitlementProperties.push(obj)
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
                let obj = {}
                obj.name = labelParts[ix].name
                if (labelParts[ix].type_property.property_type.key === 'Integer') { // below are Customer Property
                  value = data.parts[ix].value !== null ? data.parts[ix].value.int_value : ''
                  obj.value = value
                } else if (labelParts[ix].type_property.property_type.key === 'Decimal') {
                  value = data.parts[ix].value !== null ? data.parts[ix].value.float_value : ''
                  obj.value = value
                } else if (labelParts[ix].type_property.property_type.key === 'Text') {
                  value = data.parts[ix].value !== null ? data.parts[ix].value.text_value : ''
                  obj.value = value
                } else if (labelParts[ix].type_property.property_type.key === 'DateTime') {
                  value = data.parts[ix].value !== null ? data.parts[ix].value.date_time_value : ''
                  obj.value = value
                } else if (labelParts[ix].type_property.property_type.key === 'Boolean') {
                  value = data.parts[ix].value !== null ? data.parts[ix].value.boolean_value : ''
                  obj.value = value
                } else if (labelParts[ix].type_property.property_type.key === 'List') {
                  if (data.parts[ix].value !== null) {
                    value = {}
                    value.valueSetValue = data.parts[ix].value.value_set_value
                    value.valueSetValueId = data.parts[ix].value.value_set_value_id
                    obj.value = data.parts[ix].value.value_set_value.name
                  } else {
                    obj.value = null
                  }
                  // value = data.parts[ix].value !== null ? data.parts[ix].value.value_set_value : ''
                } else {
                  value = data.parts[ix].value !== null ? data.parts[ix].value.other_value : ''
                  obj.value = value
                }
                setCustomerProperty.push(value)
                entitlementProperties.push(obj)
              }
            })
          }
          addSettings.updateObject = data
          nextProps.setAddSettings(addSettings)
          nextProps.setEntitlementProperty(entitlementProperties)
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
            } else if (data.type_property.property_type.key === 'List') {
              data.type_property.value_set_value = setCustomerProperty[index] ? setCustomerProperty[index].valueSetValue : null
              data.type_property.value_set_value_id = setCustomerProperty[index] ? setCustomerProperty[index].valueSetValueId : null
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
          'entitlement_id': this.props.match.params.id,
          'id': this.props.match.params.id
        }
        this.props.fetchEntitlementById && this.props.fetchEntitlementById(payload)
        this.props.fetchEntitlementProperties && this.props.fetchEntitlementProperties(payload)
        this.props.fetchEntitlementRelationships && this.props.fetchEntitlementRelationships(payload)
        let appPackage = JSON.parse(localStorage.getItem('packages'))
        let perspectives = appPackage.resources[0].perspectives
        let perspectiveObj = _.find(perspectives, function (obj) {
          return (obj.key === 'Entitlement_Update' && obj.role_key === 'Update')
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
)(EntitlementDetail)
