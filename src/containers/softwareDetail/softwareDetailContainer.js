import { connect } from 'react-redux'
import { compose, lifecycle } from 'recompose'
import SoftwareView from '../../components/softwareDetail/softwareDetailComponent'
import { actions as sagaActions } from '../../redux/sagas/'
import { actionCreators as newDiscussionActionCreators } from '../../redux/reducers/newDiscussionReducer/newDiscussionReducerReducer'
import { actionCreators } from '../../redux/reducers/softwareDetailReducer/softwareDetailReducerReducer'
import _ from 'lodash'
// Global State
export function mapStateToProps (state, props) {
  return {
    authenticateUser: state.basicReducer.authenticateUser,
    softwarebyId: state.softwareDetailReducer.softwarebyId,
    softwareProperties: state.softwareDetailReducer.softwareProperties,
    softwareRelationships: state.softwareDetailReducer.softwareRelationships,
    updateSoftwareResponse: state.softwareDetailReducer.updateSoftwareResponse,
    deleteSoftwareResponse: state.softwareDetailReducer.deleteSoftwareResponse,
    addSettings: state.softwareDetailReducer.addSettings,
    metaModelPerspective: state.softwareDetailReducer.metaModelPerspective,
    availableAction: state.softwareDetailReducer.availableAction,
    connectionData: state.softwareDetailReducer.connectionData,
    dropdownData: state.softwareDetailReducer.dropdownData,
    showTabs: state.softwareDetailReducer.showTabs,
    modelPerspective: state.softwareDetailReducer.modelPerspective
   }
}
// In Object form, each funciton is automatically wrapped in a dispatch
export const propsMapping: Callbacks = {
  fetchUserAuthentication: sagaActions.basicActions.fetchUserAuthentication,
  fetchSoftwareById: sagaActions.softwareActions.fetchSoftwareById,
  fetchSoftwareProperties: sagaActions.softwareActions.fetchSoftwareProperties,
  fetchSoftwareRelationships: sagaActions.softwareActions.fetchSoftwareRelationships,
  setDiscussionModalOpenStatus: newDiscussionActionCreators.setDiscussionModalOpenStatus,
  setCurrentTab: actionCreators.setCurrentTab,
  setConnectionData: actionCreators.setConnectionData,
  setAvailableAction: actionCreators.setAvailableAction,
  updateModelPrespectives: sagaActions.modelActions.updateModelPrespectives,
  setAddSettings: actionCreators.setAddSettings,
  fetchMetaModelPrespective: sagaActions.modelActions.fetchMetaModelPrespective,
  fetchModelPerspective: sagaActions.modelActions.fetchModelPerspective,
  fetchDropdownData: sagaActions.basicActions.fetchDropdownData,
  deleteSoftware: sagaActions.softwareActions.deleteSoftware,
  resetResponse: actionCreators.resetResponse
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
      console.log('component will mount', this.props)
      // eslint-disable-next-line
      mApp.blockPage({overlayColor:'#000000',type:'loader',state:'success',message:'Processing...'})
      this.props.fetchUserAuthentication && this.props.fetchUserAuthentication()
      let payload = {
        'software_id': this.props.match.params.id
      }
      this.props.fetchSoftwareById && this.props.fetchSoftwareById(payload)
      this.props.fetchSoftwareProperties && this.props.fetchSoftwareProperties(payload)
      this.props.fetchSoftwareRelationships && this.props.fetchSoftwareRelationships(payload)
      let appPackage = JSON.parse(localStorage.getItem('packages'))
      let perspectives = appPackage.resources[0].perspectives
      let perspectiveId = _.result(_.find(perspectives, function (obj) {
        return obj.key === 'Software'
      }), 'perspective')
      this.props.fetchMetaModelPrespective && this.props.fetchMetaModelPrespective(perspectiveId)
      let paydata = {}
      paydata['meta_model_perspective_id'] = perspectiveId
      let modelPerspectivePayload = {}
      modelPerspectivePayload.id = this.props.match.params.id
      modelPerspectivePayload.data = paydata
      this.props.fetchModelPerspective(modelPerspectivePayload)
    },
    componentDidMount: function () {
      // eslint-disable-next-line
      $('[data-toggle="m-tooltip"]').tooltip()
    },
    componentWillReceiveProps: function (nextProps) {
      console.log('next', nextProps)
      if (nextProps.authenticateUser && nextProps.authenticateUser.resources) {
        if (!nextProps.authenticateUser.resources[0].result) {
          this.props.history.push('/')
        }
      }
      if (nextProps.softwarebyId && nextProps.softwarebyId !== this.props.softwarebyId) {
        // eslint-disable-next-line
        // mApp && mApp.unblockPage()
        if (nextProps.softwarebyId.error_code) {
          // eslint-disable-next-line
          toastr.error(nextProps.softwarebyId.error_message, nextProps.softwarebyId.error_code)
          this.props.history.push('/softwares')
        }
      }
      if (nextProps.softwareRelationships && nextProps.softwareRelationships !== this.props.softwareRelationships) {
        // eslint-disable-next-line
        mApp && mApp.unblockPage()
        if (nextProps.softwareRelationships.error_code) {
          // eslint-disable-next-line
          toastr.error(nextProps.softwareRelationships.error_message, nextProps.softwareRelationships.error_code)
          this.props.history.push('/softwares')
        }
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
      if (nextProps.deleteSoftwareResponse && nextProps.deleteSoftwareResponse !== '') {
        // eslint-disable-next-line
        mApp && mApp.unblockPage()
        if (nextProps.deleteSoftwareResponse.error_code === null) {
          // eslint-disable-next-line
          toastr.success('The Software ' +  nextProps.deleteSoftwareResponse.resources[0].name  +  ' was successfully deleted', 'Zapped!')
          this.props.history.push('/softwares')
        } else {
          // eslint-disable-next-line
          toastr.error(nextProps.deleteSoftwareResponse.error_message, nextProps.deleteSoftwareResponse.error_code)
        }
        this.props.resetResponse()
      }
      if (nextProps.updateSoftwareResponse && nextProps.updateSoftwareResponse !== '') {
        let addSettings = {...nextProps.addSettings}
        addSettings.name = ''
        addSettings.description = ''
        addSettings.updateResponse = nextProps.updateSoftwareResponse
        nextProps.setAddSettings(addSettings)
        let payload = {
          'software_id': this.props.match.params.id
        }
        this.props.fetchSoftwareById && this.props.fetchSoftwareById(payload)
        this.props.fetchSoftwareProperties && this.props.fetchSoftwareProperties(payload)
        this.props.fetchSoftwareRelationships && this.props.fetchSoftwareRelationships(payload)
        let appPackage = JSON.parse(localStorage.getItem('packages'))
        let perspectives = appPackage.resources[0].perspectives
        let perspectiveId = _.result(_.find(perspectives, function (obj) {
          return obj.key === 'Software'
        }), 'perspective')
        let paydata = {}
        paydata['meta_model_perspective_id'] = perspectiveId
        let modelPerspectivePayload = {}
        modelPerspectivePayload.id = this.props.match.params.id
        modelPerspectivePayload.data = paydata
        this.props.fetchModelPerspective(modelPerspectivePayload)
        nextProps.resetResponse()
      }
    }
  })
)(SoftwareView)
