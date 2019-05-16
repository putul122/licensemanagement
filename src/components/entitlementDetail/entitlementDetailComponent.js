import React from 'react'
import moment from 'moment'
import PropTypes from 'prop-types'
import styles from './entitlementDetailComponent.scss'
import DataModelComponent from '../../containers/dataModel/dataModelContainer'
import _ from 'lodash'
import ReactModal from 'react-modal'
import Select from 'react-select'
import CreatableSelect from 'react-select/lib/Creatable'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import Discussion from '../../containers/discussion/discussionContainer'
import NewDiscussion from '../../containers/newDiscussion/newDiscussionContainer'
ReactModal.setAppElement('#root')
const NEWCOMPONENT = '99999'
var divStyle = {
  // width: '900px',
  // height: '600px',
  'overflowY': 'scroll',
  'overflowX': 'scroll',
  'border': '1px solid #000000',
  'background-color': '#FFFFFF'
}
const formatAmount = (x) => {
  let parts = x.toString().split('.')
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
  if (typeof parts[1] !== 'undefined') {
    parts[1] = parts[1].substring(0, 2)
  }
  return parts.join('.')
}
let comparer = function (otherArray) {
  return function (current) {
    return otherArray.filter(function (other) {
      return other.value === current.value && other.display === current.display
    }).length === 0
  }
}
const customStylescrud = {
  content: {
    top: '10%',
    left: '8%',
    background: 'none',
    border: '0px',
    overflow: 'none',
    margin: 'auto'
  },
  overlay: {
    zIndex: 1000
  }
}
const customStyles = {
  overlay: {zIndex: '1000'},
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    border: 'none',
    background: 'none',
    transform: 'translate(-50%, -50%)'
  }
}

export default function EntitlementDetail (props) {
  console.log('ED C', props)
  let entitlementName = ''
  let entitlementDescription = ''
  let entitlementPurchased = ''
  let entitlementConsumed = ''
  let entitlementCost = ''
  let entitlementPropertiesList = ''
  let startNode = {}
  let parentApplicationRelationshipList = ''
  let outgoingApplicationRelationshipList = ''
  let incomingApplicationRelationshipList = ''
  let childApplicationRelationshipList = ''
  let modelRelationshipData = ''
  let contextId = props.match.params.id
  let showProperties = props.showTabs.showProperty
  let showRelationships = props.showTabs.showRelationship
  let validationPropertyList = ''
  let openDiscussionModal = function (event) {
    event.preventDefault()
    props.setDiscussionModalOpenStatus(true)
  }
  // let toggleExpandIcon = function (index) {
  //   // eslint-disable-next-line
  //   let iconClass = $('#expandIcon' + index).attr('class')
  //   if (iconClass === 'fa fa-plus') {
  //     // eslint-disable-next-line
  //     $('#expandIcon' + index).removeClass('fa-plus').addClass('fa-minus')
  //   } else {
  //     // eslint-disable-next-line
  //     $('#expandIcon' + index).removeClass('fa-minus').addClass('fa-plus')
  //   }
  // }
  let handleCheckbox = function (value, data) {
    let displayIndex = data.displayIndex
    let entitlementRelationships = JSON.parse(JSON.stringify(props.entitlementRelationships))
    let index = _.findIndex(entitlementRelationships, {displayIndex: displayIndex})
    let checkedObject = entitlementRelationships[index]
    checkedObject.isDisplay = value
    entitlementRelationships[index] = checkedObject
    props.setEntitlementRelationship(entitlementRelationships)
  }
  let handleGroupCheckbox = function (value, checkData) {
    console.log('handle group checkbox', value, checkData)
    let entitlementRelationships = JSON.parse(JSON.stringify(props.entitlementRelationships))
    if (checkData.relationshipType === 'Parent') {
      let parent = _.filter(props.entitlementRelationships, {'relationship_type': 'Parent'})
      if (parent.length > 0) {
        parent.forEach(function (data, id) {
          let index = _.findIndex(entitlementRelationships, {displayIndex: data.displayIndex})
          let checkedObject = entitlementRelationships[index]
          checkedObject.isDisplay = value
          entitlementRelationships[index] = checkedObject
        })
      }
    } else if (checkData.relationshipType === 'Child') {
      let child = _.filter(props.entitlementRelationships, {'relationship_type': 'Child'})
      if (child.length > 0) {
        child.forEach(function (data, isCheckboxChecked) {
          let index = _.findIndex(entitlementRelationships, {displayIndex: data.displayIndex})
          let checkedObject = entitlementRelationships[index]
          checkedObject.isDisplay = value
          entitlementRelationships[index] = checkedObject
        })
      }
    } else if (checkData.relationshipType === 'ConnectFrom') {
      let outgoing = _.filter(props.entitlementRelationships, {'relationship_type': 'ConnectFrom'})
      outgoing = _.filter(outgoing, function (data) {
        return data.connection.name === checkData.connectionName
      })
      outgoing = _.filter(outgoing, function (data) {
        return data.target_component.component_type.name === checkData.targetComponentTypeName
      })
      if (outgoing.length > 0) {
        outgoing.forEach(function (data, id) {
          let index = _.findIndex(entitlementRelationships, {displayIndex: data.displayIndex})
          let checkedObject = entitlementRelationships[index]
          checkedObject.isDisplay = value
          entitlementRelationships[index] = checkedObject
        })
      }
    } else if (checkData.relationshipType === 'ConnectTo') {
      let incoming = _.filter(props.entitlementRelationships, {'relationship_type': 'ConnectTo'})
      incoming = _.filter(incoming, function (data) {
        return data.connection.name === checkData.connectionName
      })
      incoming = _.filter(incoming, function (data) {
        return data.target_component.component_type.name === checkData.targetComponentTypeName
      })
      if (incoming.length > 0) {
        incoming.forEach(function (data, id) {
          let index = _.findIndex(entitlementRelationships, {displayIndex: data.displayIndex})
          let checkedObject = entitlementRelationships[index]
          checkedObject.isDisplay = value
          entitlementRelationships[index] = checkedObject
        })
      }
    }
    console.log('setEntitlementRelationship', entitlementRelationships)
    props.setEntitlementRelationship(entitlementRelationships)
  }
  let showProperty = function (event) {
    let payload = {'showProperty': ' active show', 'showRelationship': ''}
    props.setCurrentTab(payload)
  }
  let showRelationship = function (event) {
    let payload = {'showProperty': '', 'showRelationship': ' active show'}
    props.setCurrentTab(payload)
  }
  // Start Code for Delete Entitlement
  let deleteEntitlement = function () {
    let updateEntitlementSettings = {...props.updateEntitlementSettings, isDeleteModalOpen: true}
    props.setUpdateEntitlementSettings(updateEntitlementSettings)
  }
  let removeEntitlement = function () {
    let payload = {
      'id': props.entitlement.resources[0].id
    }
    props.deleteEntitlement(payload)
    closeDeleteModal()
  }
  let closeDeleteModal = function () {
    let updateEntitlementSettings = {...props.updateEntitlementSettings, isDeleteModalOpen: false}
    props.setUpdateEntitlementSettings(updateEntitlementSettings)
  }
  // End Code for Delete component
  // Start Code for Edit entitlement using perspectives
  let connectionSelectBoxList = ''
  let businessPropertyList = ''
  let messageList = ''
  let editName = function (event) {
    let addSettings = JSON.parse(JSON.stringify(props.addSettings))
    addSettings.name = event.target.value
    props.setAddSettings(addSettings)
  }
  let editDescription = function (event) {
    let addSettings = JSON.parse(JSON.stringify(props.addSettings))
    addSettings.description = event.target.value
    props.setAddSettings(addSettings)
  }
  let editProperty = function (index, value) {
    let connectionData = {...props.connectionData}
    let customerProperty = connectionData.customerProperty
    let propertyType = customerProperty[index].type_property.property_type
    if (propertyType.key === 'Boolean') {
      customerProperty[index].type_property.boolean_value = value
    } else if (propertyType.key === 'Integer') {
      customerProperty[index].type_property.int_value = value
    } else if (propertyType.key === 'Decimal') {
      customerProperty[index].type_property.float_value = value
    } else if (propertyType.key === 'DateTime') {
      customerProperty[index].type_property.date_time_value = value.format('DD MMM YYYY')
    } else if (propertyType.key === 'Text') {
      customerProperty[index].type_property.text_value = value
    } else {
      customerProperty[index].type_property.other_value = value
    }
    connectionData.customerProperty = customerProperty
    props.setConnectionData(connectionData)
  }
  let handleEditPropertySelect = function (index) {
    return function (newValue: any, actionMeta: any) {
      console.log('newValue', newValue)
      console.log('actionMeta', actionMeta)
      let connectionData = JSON.parse(JSON.stringify(props.connectionData))
      let customerProperty = connectionData.customerProperty
      if (actionMeta.action === 'select-option') {
        customerProperty[index].type_property.value_set_value = newValue
      }
      if (actionMeta.action === 'clear') {
        customerProperty[index].type_property.value_set_value = newValue
      }
      connectionData.customerProperty = customerProperty
      props.setConnectionData(connectionData)
    }
  }
  let handleSelectChange = function (index) {
    return function (newValue: any, actionMeta: any) {
      console.log('newValue', newValue)
      console.log('actionMeta', actionMeta)
      console.log('index', index)
      let connectionData = {...props.connectionData}
      let selectedValues = connectionData.selectedValues
      if (actionMeta.action === 'select-option' || actionMeta.action === 'remove-value') {
        selectedValues[index] = newValue
        connectionData.selectedValues = selectedValues
        props.setConnectionData(connectionData)
      }
      if (actionMeta.action === 'clear') {
        selectedValues[index] = null
        connectionData.selectedValues = selectedValues
        props.setConnectionData(connectionData)
      }
    }
  }
  let openEditModal = function () {
    let addSettings = JSON.parse(JSON.stringify(props.addSettings))
    let labelParts = props.metaModelPerspective.resources[0].parts
    let data = props.modelPerspective.resources[0]
    let selectedValues = []
    let setCustomerProperty = []
    if (data.parts) {
      labelParts.forEach(function (partData, ix) {
        if (partData.standard_property !== null && partData.type_property === null) { // Standard Property
          if (partData.name === 'Name') {
            addSettings.name = data.parts[ix].value
          }
          if (partData.name === 'Description') {
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
    addSettings.isEditModalOpen = true
    addSettings.updateObject = data
    addSettings.updateResponse = null
    props.setAddSettings(addSettings)
    let connectionData = {...props.connectionData}
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
    props.setConnectionData(connectionData)
  }
  let closeEditModal = function () {
    let addSettings = {...props.addSettings, isEditModalOpen: false, updateResponse: null}
    props.setAddSettings(addSettings)
  }
  // update function to process update
  let updateSoftware = function (event) {
    event.preventDefault()
    // eslint-disable-next-line
    mApp && mApp.blockPage({overlayColor:'#000000',type:'loader',state:'success',message:'Processing...'})
    let addSettings = JSON.parse(JSON.stringify(props.addSettings))
    let connectionData = JSON.parse(JSON.stringify(props.connectionData))
    let labelParts = props.metaModelPerspective.resources[0].parts
    let data = addSettings.updateObject
    let patchPayload = []
    if (data.parts) {
      labelParts.forEach(function (partData, index) {
        let valueType = ''
        let obj = {}
        if (partData.standard_property !== null && partData.type_property === null) { // Standard Property
          obj.op = 'replace'
          valueType = partData.standard_property
          obj.path = '/' + data.subject_id + '/parts/' + index + '/' + valueType
          if (partData.standard_property === 'name') {
            obj.value = props.addSettings.name
          }
          if (partData.standard_property === 'description') {
            obj.value = props.addSettings.description
          }
          patchPayload.push(obj)
        } else if (partData.standard_property === null && partData.type_property === null) { // Connection Property
          let dataIndex = connectionData.data.findIndex(p => p.name === partData.name)
          console.log('dataIndex', dataIndex)
          if (dataIndex !== -1) {
            // found index
            let max = connectionData.data[dataIndex].max
            let initialSelectedValue = connectionData.initialSelectedValues[dataIndex] || []
            let selectedValue = connectionData.selectedValues[dataIndex]
            console.log('initialSelectedValue', initialSelectedValue)
            console.log('selectedValue', selectedValue)
            let onlyInInitial = []
            if (initialSelectedValue) {
              if (max === 1) {
                let temp = []
                temp.push(initialSelectedValue)
                initialSelectedValue = temp
              }
            }
            if (selectedValue) {
              if (max === 1) {
                let temp = []
                temp.push(selectedValue)
                selectedValue = temp
              }
            }
            if (initialSelectedValue) {
              if (selectedValue) {
                onlyInInitial = initialSelectedValue.filter(comparer(selectedValue))
              } else {
                onlyInInitial = initialSelectedValue
              }
            }
            let onlyInFinal = []
            if (selectedValue) {
              if (initialSelectedValue) {
                onlyInFinal = selectedValue.filter(comparer(initialSelectedValue))
              } else {
                onlyInFinal = selectedValue
              }
            }
            // remove operation payload
            if (onlyInInitial.length > 0) {
              let connectionIdArray = data.parts[index].value
              let value = []
              onlyInInitial.forEach(function (removeData, rid) {
                let found = _.find(connectionIdArray, function (obj) { return (obj.target_component.id === removeData.id) })
                console.log('found ----', found)
                if (found) {
                  // set connection id
                  value.push(found.connection.id)
                }
              })
              let obj = {}
              obj.op = 'remove'
              obj.value = value
              valueType = 'value/-'
              obj.path = '/' + data.subject_id + '/parts/' + index + '/' + valueType
              patchPayload.push(obj)
              console.log('connectionId obj', connectionIdArray, obj)
            }
            console.log('index', dataIndex)
            console.log('onlyInInitial', onlyInInitial)
            console.log('onlyInFinal', onlyInFinal)
            let existingTargetComponent = connectionData.selectedValues[dataIndex]
            console.log('existingTargetComponent', existingTargetComponent)
            if (onlyInFinal.length > 0) {
              let connections = []
              onlyInFinal.forEach(function (targetComponent, rid) {
                let obj = {}
                obj.target_id = targetComponent.id
                connections.push(obj)
              })
              let obj = {}
              obj.op = 'add'
              obj.value = connections
              valueType = 'value/-'
              obj.path = '/' + data.subject_id + '/parts/' + index + '/' + valueType
              patchPayload.push(obj)
              console.log('add obj', obj)
            }
          } else {
            console.log('index', dataIndex)
          }
        } if (partData.standard_property === null && partData.type_property !== null) {
          let obj = {}
          obj.op = 'replace'
          let customerProperty = _.find(connectionData.customerProperty, function (obj) {
            return obj.name === partData.name
          })
          console.log('customerProperty', customerProperty)
          if (customerProperty) {
            if (customerProperty.type_property.property_type.key === 'Boolean') {
              valueType = `boolean_value`
              obj.value = customerProperty.type_property.boolean_value
            } else if (customerProperty.type_property.property_type.key === 'Integer') {
              valueType = `int_value`
              obj.value = customerProperty.type_property.int_value
            } else if (customerProperty.type_property.property_type.key === 'Decimal') {
              valueType = `float_value`
              obj.value = customerProperty.type_property.float_value
            } else if (customerProperty.type_property.property_type.key === 'DateTime') {
              valueType = `date_time_value`
              obj.value = customerProperty.type_property.date_time_value
            } else if (customerProperty.type_property.property_type.key === 'Text') {
              valueType = `text_value`
              obj.value = customerProperty.type_property.text_value
            } else if (customerProperty.type_property.property_type.key === 'List') {
              valueType = `value_set_value_id`
              obj.value = customerProperty.type_property.value_set_value ? customerProperty.type_property.value_set_value.id : null
            } else {
              valueType = `other_value`
              obj.value = customerProperty.type_property.other_value
            }
            obj.path = '/' + data.subject_id + '/parts/' + index + '/' + valueType
            patchPayload.push(obj)
          }
        }
      })
    }
    let appPackage = JSON.parse(localStorage.getItem('packages'))
    let perspectives = appPackage.resources[0].perspectives
    let perspectiveObj = _.find(perspectives, function (obj) {
      return (obj.key === 'Entitlement_Update' && obj.role_key === 'Update')
    })
    let payload = {}
    payload.queryString = {}
    payload.queryString.meta_model_perspective_id = props.metaModelPerspective.resources[0].id
    payload.queryString.apply_changes = true
    payload.queryString.view_key = perspectiveObj.view_key
    payload.data = {}
    payload.data[props.metaModelPerspective.resources[0].id] = patchPayload
    console.log('payload', payload)
    props.updateModelPrespectives(payload)
  }
  // building form data to be set in edit form modal.
  if (props.connectionData !== '' && props.connectionData.operation.isComplete) {
    // eslint-disable-next-line
    mApp && mApp.unblockPage()
    let connectionData = {...props.connectionData}
    connectionSelectBoxList = connectionData.data.map(function (data, index) {
      let selectOptions = connectionData.selectOption[index].map(function (component, id) {
        component.value = component.id
        component.label = component.name
        return component
      })
      return (<div key={'connection' + index} className='form-group row'>
        <div className='col-2'><label htmlFor='Category' className='col-form-label'>{data.name}</label></div>
        <div className='col-8'>
          <Select
            className='input-sm m-input'
            placeholder={'Select ' + data.name}
            isMulti={data.max !== 1}
            isClearable
            value={connectionData.selectedValues[index]}
            onChange={handleSelectChange(index)}
            options={selectOptions}
            />
        </div>
      </div>)
    })
    businessPropertyList = connectionData.customerProperty.map(function (data, index) {
      let value = null
      if (data.type_property.property_type.key === 'Integer') {
        value = data.type_property.int_value
        return (<div key={'business' + index} className='form-group row'>
          <div className='col-2'><label htmlFor='Category' className='col-form-label'>{data.name}</label></div>
          <div className='col-8 form-group m-form__group has-info'>
            <input type='number' className='input-sm form-control m-input' value={value} onChange={(event) => { editProperty(index, event.target.value) }} placeholder='Enter Here' />
            {false && (<div className='form-control-feedback'>should be Number</div>)}
          </div>
        </div>)
      } else if (data.type_property.property_type.key === 'Decimal') {
        value = data.type_property.float_value
        return (<div key={'business' + index} className='form-group row'>
          <div className='col-2'><label htmlFor='Category' className='col-form-label'>{data.name}</label></div>
          <div className='col-8 form-group m-form__group has-info'>
            <input type='number' className='input-sm form-control m-input' value={value} onChange={(event) => { editProperty(index, event.target.value) }} placeholder='Enter Here' />
            {false && (<div className='form-control-feedback'>should be Number</div>)}
          </div>
        </div>)
      } else if (data.type_property.property_type.key === 'DateTime') {
        value = data.type_property.date_time_value ? moment(data.type_property.date_time_value).format('DD MMM YYYY') : ''
        return (<div key={'business' + index} className='form-group row'>
          <div className='col-2'><label htmlFor='Category' className='col-form-label'>{data.name}</label></div>
          <div className='col-8 form-group m-form__group has-info'>
            <DatePicker
              className='input-sm form-control m-input'
              selected={data.type_property.date_time_value ? moment(data.type_property.date_time_value) : ''}
              dateFormat='DD MMM YYYY'
              onSelect={(date) => { editProperty(index, date) }}
              />
            {/* <input type='text' className='input-sm form-control m-input' value={value} onChange={(event) => { editTextProperty(index, childIndex, event.target.value) }} placeholder='Enter Here' /> */}
            {false && (<div className='form-control-feedback'>should be Date</div>)}
          </div>
        </div>)
      } else if (data.type_property.property_type.key === 'Text') {
        value = data.type_property.text_value
        return (<div key={'business' + index} className='form-group row'>
          <div className='col-2'><label htmlFor='Category' className='col-form-label'>{data.name}</label></div>
          <div className='col-8 form-group m-form__group has-info'>
            <input type='text' className='input-sm form-control m-input' value={value} onChange={(event) => { editProperty(index, event.target.value) }} placeholder='Enter Here' />
            {false && (<div className='form-control-feedback'>should be Text</div>)}
          </div>
        </div>)
      } else if (data.type_property.property_type.key === 'List') {
        let propertyOption = data.type_property.value_set.values.map((option, opIndex) => {
          option.label = option.name
          option.value = option.id
          return option
        })
        let dvalue = data.type_property.value_set_value
        if (data.type_property.value_set_value !== null) {
          dvalue.label = data.type_property.value_set_value.name
          dvalue.value = data.type_property.value_set_value.id
        }
        value = data.type_property.value_set_value ? data.type_property.value_set_value.name : null
        return (<div key={'business' + index} className='form-group row'>
          <div className='col-2'><label htmlFor='Category' className='col-form-label'>{data.name}</label></div>
          <Select
            className='col-8 input-sm m-input'
            placeholder='Select Options'
            isClearable
            defaultValue={dvalue}
            onChange={handleEditPropertySelect(index)}
            isSearchable={false}
            name={'selectProperty'}
            options={propertyOption}
          />
        </div>)
      } else {
        value = data.type_property.other_value
        return (<div key={'business' + index} className='form-group row'>
          <div className='col-2'><label htmlFor='Category' className='col-form-label'>{data.name}</label></div>
          <div className='col-8 form-group m-form__group has-info'>
            <input type='text' className='input-sm form-control m-input' value={value} onChange={(event) => { editProperty(index, event.target.value) }} placeholder='Enter Here' />
            {true && (<div className='form-control-feedback'>should be Text</div>)}
          </div>
        </div>)
      }
    })
  }
  // parsing data for response message listing after update
  if (props.addSettings.updateResponse !== null) {
    if (props.addSettings.updateResponse.length > 0) {
      messageList = props.addSettings.updateResponse.map(function (data, index) {
        if (data.error_code === null) {
          if (data.message != null) {
            return (<li className='m-list-search__result-item' key={index}>{data.message}</li>)
          } else {
            if (props.addSettings.updateResponse.length === 1) {
              return (<li className='m-list-search__result-item' key={99}>{'No data has been added.'}</li>)
            }
          }
        } else {
          return (<li className='m-list-search__result-item' key={index}>{'Error Code: ' + data.error_code + 'Message: ' + data.error_message}</li>)
        }
      })
    } else {
      messageList = []
      messageList.push((
        <li key={0}>{'No data has been added.'}</li>
      ))
    }
  }
  // End Code for Edit entitlement using perspectives
  // Start Code for Update Entitlement
  let entitlementProperties = props.entitlementProperties.resources ? [...props.entitlementProperties.resources] : ''
  let entitlementPropertiesPayload = {...props.entitlementPropertiesPayload}
  let copiedEntitlementProperties = {...props.copiedEntitlementProperties}
  let copiedEntitlementData = {...props.copiedEntitlementData}
  let entitlementData = props.entitlement
  let editEntitlementName = function (event) {
    console.log('entitlementPropertiesPayload', entitlementPropertiesPayload)
    let value = event.target.value
    let payload = { 'op': 'replace', 'path': '/name', 'value': value }
    let entitlementPayload
    if (value === '') {
      entitlementData.resources[0].nameMessage = true
    } else {
      entitlementData.resources[0].nameMessage = false
      if (entitlementPropertiesPayload.entitlement.length === 0) {
        entitlementPropertiesPayload.entitlement.push(payload)
      } else if (entitlementPropertiesPayload.entitlement.length === 1) {
        if (entitlementPropertiesPayload.entitlement[0].path === '/name') {
          entitlementPropertiesPayload.entitlement[0].value = value
        } else {
          entitlementPropertiesPayload.entitlement.push(payload)
        }
      } else {
        entitlementPayload = entitlementPropertiesPayload.entitlement.map((payload, index) => {
          if (payload.path === '/name') {
            payload.value = value
            return payload
          } else {
            return payload
          }
        })
        entitlementPropertiesPayload.entitlement = entitlementPayload
      }
    }
    entitlementData.resources[0].name = value
    let editPayload = {}
    editPayload.entitlement = entitlementData
    editPayload.property = {resources: entitlementProperties}
    props.editEntitlementProperties(editPayload)
  }
  let editEntitlementDescription = function (event) {
    let value = event.target.value
    let payload = { 'op': 'replace', 'path': '/description', 'value': value }
    let entitlementPayload
    if (entitlementPropertiesPayload.entitlement.length === 0) {
      entitlementPropertiesPayload.entitlement.push(payload)
    } else if (entitlementPropertiesPayload.entitlement.length === 1) {
      if (entitlementPropertiesPayload.entitlement[0].path === '/description') {
        entitlementPropertiesPayload.entitlement[0].value = value
      } else {
        entitlementPropertiesPayload.entitlement.push(payload)
      }
    } else {
      entitlementPayload = entitlementPropertiesPayload.entitlement.map((payload, index) => {
        if (payload.path === '/description') {
          payload.value = value
          return payload
        } else {
          return payload
        }
      })
      entitlementPropertiesPayload.entitlement = entitlementPayload
    }
    entitlementData.resources[0].description = value
    let editPayload = {}
    editPayload.entitlement = entitlementData
    editPayload.property = {resources: entitlementProperties}
    props.editEntitlementProperties(editPayload)
  }
  let updateEntitlement = function () {
    props.copyEntitlementProperties(JSON.parse(JSON.stringify(props.entitlementProperties)))
    props.copyEntitlementData(JSON.parse(JSON.stringify(props.entitlement)))
    props.setEditComponentFlag(true)
  }
  let cancelEditEntitlement = function () {
    let payload = {}
    payload.property = JSON.parse(JSON.stringify(copiedEntitlementProperties))
    payload.entitlement = JSON.parse(JSON.stringify(copiedEntitlementData))
    props.restoreEntitlementProperties(payload)
    props.setEditComponentFlag(false)
    props.resetResponse()
  }
  let saveEntitlementProperty = function (event) {
    if (props.entitlementProperties && props.entitlementProperties !== '') {
      let validationProperty = []
      props.entitlementProperties.resources.forEach(function (property, index) {
        let propertyProperties = property.properties
        propertyProperties.forEach(function (childProperty, childIndex) {
          let value
          if (childProperty.property_type.key === 'Integer') {
            value = childProperty.int_value || ''
          } else if (childProperty.property_type.key === 'Decimal') {
            value = childProperty.float_value || ''
          } else if (childProperty.property_type.key === 'DateTime') {
            value = childProperty.date_time_value ? moment(childProperty.date_time_value).format('DD MMM YYYY') : ''
          } else if (childProperty.property_type.key === 'Text') {
            value = childProperty.text_value || ''
          } else if (childProperty.property_type.key === 'List') {
            value = childProperty.value_set_value ? childProperty.value_set_value.name : null
          } else {
            value = childProperty.other_value || ''
          }
          if (childProperty.optionality.key === 'Required') {
            if (value === null || value === '') {
              validationProperty.push(childProperty.name)
            }
          }
        })
      })
      console.log('validationProperty', validationProperty)
      props.setValidationProperty(validationProperty)
    }
    event.preventDefault()
    let updateEntitlementSettings = {...props.updateEntitlementSettings, isConfirmationModalOpen: true}
    props.setUpdateEntitlementSettings(updateEntitlementSettings)
  }
  let closeConfirmationModal = function (event) {
    event.preventDefault()
    let updateEntitlementSettings = {...props.updateEntitlementSettings, isConfirmationModalOpen: false}
    props.setUpdateEntitlementSettings(updateEntitlementSettings)
    // cancelEditEntitlement()
  }
  let submitUpdates = function (event) {
    event.preventDefault()
    props.setEditComponentFlag(false)
    let payload = {}
    payload.componentId = props.entitlement.resources[0].id
    payload.property = entitlementPropertiesPayload.property
    payload.entitlement = entitlementPropertiesPayload.entitlement
    props.updateEntitlementProperties(payload)
    props.updateEntitlement(payload)
    let updateEntitlementSettings = {...props.updateEntitlementSettings, isConfirmationModalOpen: false}
    props.setUpdateEntitlementSettings(updateEntitlementSettings)
  }
  // let handlePropertySelect = function (index, childIndex) {
  //   return function (newValue: any, actionMeta: any) {
  //     if (actionMeta.action === 'select-option') {
  //       if (newValue !== null) {
  //         let payload
  //         let typeProperty = entitlementProperties[index].properties[childIndex].type_property
  //         entitlementProperties[index].properties[childIndex].value_set_value = newValue
  //         payload = { 'op': 'replace', 'path': `/${typeProperty}/value_set_value`, 'value': {id: newValue.value} }

  //         if (entitlementPropertiesPayload.property.length === 0) {
  //           entitlementPropertiesPayload.property.push(payload)
  //         } else {
  //           if (payload.path === entitlementPropertiesPayload.property[entitlementPropertiesPayload.property.length - 1].path) {
  //             entitlementPropertiesPayload.property[entitlementPropertiesPayload.property.length - 1] = payload
  //           } else {
  //             entitlementPropertiesPayload.property.push(payload)
  //           }
  //         }
  //         let editPayload = {}
  //         editPayload.entitlement = entitlementData
  //         editPayload.property = {resources: entitlementProperties}
  //         props.editEntitlementProperties(editPayload)
  //         props.pushEntitlementPropertyPayload(entitlementPropertiesPayload)
  //       }
  //     }
  //     if (actionMeta.action === 'clear') {
  //       let payload
  //       let typeProperty = entitlementProperties[index].properties[childIndex].type_property
  //       entitlementProperties[index].properties[childIndex].value_set_value = newValue
  //       payload = { 'op': 'replace', 'path': `/${typeProperty}/value_set_value`, 'value': newValue }

  //       if (entitlementPropertiesPayload.property.length === 0) {
  //         entitlementPropertiesPayload.property.push(payload)
  //       } else {
  //         if (payload.path === entitlementPropertiesPayload.property[entitlementPropertiesPayload.property.length - 1].path) {
  //           entitlementPropertiesPayload.property[entitlementPropertiesPayload.property.length - 1] = payload
  //         } else {
  //           entitlementPropertiesPayload.property.push(payload)
  //         }
  //       }
  //       let editPayload = {}
  //       editPayload.entitlement = entitlementData
  //       editPayload.property = {resources: entitlementProperties}
  //       props.editEntitlementProperties(editPayload)
  //       props.pushEntitlementPropertyPayload(entitlementPropertiesPayload)
  //     }
  //   }
  // }
  // let editDateProperty = function (index, childIndex, value) {
  //   let payload
  //   let typeProperty = entitlementProperties[index].properties[childIndex].type_property
  //   let selectedDate = value.format('DD MMM YYYY')
  //   entitlementProperties[index].properties[childIndex].date_time_value = value.format('DD MMM YYYY')
  //   payload = { 'op': 'replace', 'path': `/${typeProperty}/date_time_value`, 'value': selectedDate }
  //   if (entitlementPropertiesPayload.property.length === 0) {
  //     entitlementPropertiesPayload.property.push(payload)
  //   } else {
  //     if (payload.path === entitlementPropertiesPayload.property[entitlementPropertiesPayload.property.length - 1].path) {
  //       entitlementPropertiesPayload.property[entitlementPropertiesPayload.property.length - 1] = payload
  //     } else {
  //       entitlementPropertiesPayload.property.push(payload)
  //     }
  //   }
  //   let editPayload = {}
  //   editPayload.entitlement = entitlementData
  //   editPayload.property = {resources: entitlementProperties}
  //   props.editEntitlementProperties(editPayload)
  //   props.pushEntitlementPropertyPayload(entitlementPropertiesPayload)
  // }
  // let editTextProperty = function (index, childIndex, value) {
  //   let payload
  //   let typeProperty = entitlementProperties[index].properties[childIndex].type_property
  //   if (entitlementProperties[index].properties[childIndex].property_type.key === 'Boolean') {
  //     entitlementProperties[index].properties[childIndex].boolean_value = value
  //     payload = { 'op': 'replace', 'path': `/${typeProperty}/boolean_value`, 'value': value }
  //   } else if (entitlementProperties[index].properties[childIndex].property_type.key === 'Integer') {
  //     entitlementProperties[index].properties[childIndex].int_value = value
  //     payload = { 'op': 'replace', 'path': `/${typeProperty}/int_value`, 'value': value }
  //   } else if (entitlementProperties[index].properties[childIndex].property_type.key === 'Decimal') {
  //     entitlementProperties[index].properties[childIndex].float_value = value
  //     payload = { 'op': 'replace', 'path': `/${typeProperty}/float_value`, 'value': value }
  //   } else if (entitlementProperties[index].properties[childIndex].property_type.key === 'DateTime') {
  //     entitlementProperties[index].properties[childIndex].date_time_value = value
  //     payload = { 'op': 'replace', 'path': `/${typeProperty}/date_time_value`, 'value': value }
  //   } else if (entitlementProperties[index].properties[childIndex].property_type.key === 'Text') {
  //     entitlementProperties[index].properties[childIndex].text_value = value
  //     payload = { 'op': 'replace', 'path': `/${typeProperty}/text_value`, 'value': value }
  //   } else {
  //     entitlementProperties[index].properties[childIndex].other_value = value
  //     payload = { 'op': 'replace', 'path': `/${typeProperty}/other_value`, 'value': value }
  //     entitlementProperties[index].properties[childIndex].showMessage = false
  //   }
  //   if (entitlementPropertiesPayload.property.length === 0) {
  //     entitlementPropertiesPayload.property.push(payload)
  //   } else {
  //     if (payload.path === entitlementPropertiesPayload.property[entitlementPropertiesPayload.property.length - 1].path) {
  //       entitlementPropertiesPayload.property[entitlementPropertiesPayload.property.length - 1] = payload
  //     } else {
  //       entitlementPropertiesPayload.property.push(payload)
  //     }
  //   }
  //   let editPayload = {}
  //   editPayload.entitlement = entitlementData
  //   editPayload.property = {resources: entitlementProperties}
  //   props.editEntitlementProperties(editPayload)
  //   props.pushEntitlementPropertyPayload(entitlementPropertiesPayload)
  // }
  // End Code for Update Entitlement

  if (props.entitlement && props.entitlement !== '') {
    entitlementName = props.entitlement.resources[0].name
    entitlementDescription = props.entitlement.resources[0].description
    entitlementPurchased = props.entitlement.resources[0].purchased
    entitlementConsumed = props.entitlement.resources[0].consumption_ratio_percent || ''
    entitlementCost = props.entitlement.resources[0].cost
    let appPackage = JSON.parse(localStorage.getItem('packages'))
    let componentTypes = appPackage.resources[0].component_types
    let componentTypeIcon = _.result(_.find(componentTypes, function (obj) {
        return obj.key === 'Entitlement'
    }), 'icon')
    startNode.name = props.entitlement.resources[0].name
    startNode.title = props.entitlement.resources[0].name
    startNode.icon = componentTypeIcon
  }
  if (props.entitlementProperties.length > 0) {
    entitlementPropertiesList = props.entitlementProperties.map(function (data, index) {
      return (
        <tr key={'property' + index} id={'property' + index}>
          <td><span className={styles.labelbold}>{data.name}</span></td>
          <td><span className={''}>{data.value}</span></td>
        </tr>
      )
    })
  }
  // if (props.entitlementProperties && props.entitlementProperties.length > 0) {
  //   console.log('test', props)
  //   entitlementPropertiesList = props.entitlementProperties.resources.map(function (property, index) {
  //     let propertyProperties = property.properties
  //     let childProperties = propertyProperties.map(function (childProperty, childIndex) {
  //       let value
  //       let htmlElement
  //       let requiredProperty = false
  //       if (childProperty.optionality.key === 'Required') {
  //         requiredProperty = true
  //       }
  //       if (childProperty.property_type.key === 'Integer') {
  //         value = childProperty.int_value
  //         htmlElement = function () {
  //           return (<div className='form-group m-form__group has-info'>
  //             <input type='number' className='input-sm form-control m-input' value={value} onChange={(event) => { editTextProperty(index, childIndex, event.target.value) }} placeholder='Enter Here' />
  //             {false && (<div className='form-control-feedback'>should be Number</div>)}
  //           </div>)
  //         }
  //       } else if (childProperty.property_type.key === 'Decimal') {
  //         value = childProperty.float_value
  //         htmlElement = function () {
  //           return (<div className='form-group m-form__group has-info'>
  //             <input type='number' className='input-sm form-control m-input' value={value} onChange={(event) => { editTextProperty(index, childIndex, event.target.value) }} placeholder='Enter Here' />
  //             {false && (<div className='form-control-feedback'>should be Number</div>)}
  //           </div>)
  //         }
  //       } else if (childProperty.property_type.key === 'DateTime') {
  //         value = childProperty.date_time_value ? moment(childProperty.date_time_value).format('DD MMM YYYY') : ''
  //         htmlElement = function () {
  //           return (<div className='form-group m-form__group has-info'>
  //             <DatePicker
  //               className='input-sm form-control m-input'
  //               selected={childProperty.date_time_value ? moment(childProperty.date_time_value) : ''}
  //               dateFormat='DD MMM YYYY'
  //               onSelect={(date) => { editDateProperty(index, childIndex, date) }}
  //               />
  //             {/* <input type='text' className='input-sm form-control m-input' value={value} onChange={(event) => { editTextProperty(index, childIndex, event.target.value) }} placeholder='Enter Here' /> */}
  //             {false && (<div className='form-control-feedback'>should be Date</div>)}
  //           </div>)
  //         }
  //       } else if (childProperty.property_type.key === 'Text') {
  //         value = childProperty.text_value
  //         htmlElement = function () {
  //           return (<div className='form-group m-form__group has-info'>
  //             <input type='text' className='input-sm form-control m-input' value={value} onChange={(event) => { editTextProperty(index, childIndex, event.target.value) }} placeholder='Enter Here' />
  //             {false && (<div className='form-control-feedback'>should be Text</div>)}
  //           </div>)
  //         }
  //       } else if (childProperty.property_type.key === 'List') {
  //         let childPropertyOption = childProperty.value_set.values.map((option, opIndex) => {
  //           option.label = option.name
  //           option.value = option.id
  //           return option
  //         })
  //         let dvalue = childProperty.value_set_value
  //         if (childProperty.value_set_value !== null) {
  //           dvalue.label = childProperty.value_set_value.name
  //           dvalue.value = childProperty.value_set_value.id
  //         }
  //         value = childProperty.value_set_value ? childProperty.value_set_value.name : null
  //         htmlElement = function () {
  //           return (<div className='form-group has-info'><Select
  //             className='input-sm m-input'
  //             placeholder='Select Options'
  //             isClearable
  //             defaultValue={dvalue}
  //             onChange={handlePropertySelect(index, childIndex)}
  //             isSearchable={false}
  //             name={'selectProperty'}
  //             options={childPropertyOption}
  //           /></div>)
  //         }
  //       } else {
  //         value = childProperty.other_value
  //         htmlElement = function () {
  //           return (<div className='form-group m-form__group has-info'>
  //             <input type='text' className='input-sm form-control m-input' value={value} onChange={(event) => { editTextProperty(index, childIndex, event.target.value) }} placeholder='Enter Here' />
  //             {false && (<div className='form-control-feedback'>should be Text</div>)}
  //           </div>)
  //         }
  //       }
  //       return (
  //         <tr key={'child' + childIndex}>
  //           <td><span className={styles.labelbold}>{childProperty.name}</span>{requiredProperty && props.isEditComponent && (<span style={{'fontSize': '20px'}} className='text-danger' >*</span>)}</td>
  //           <td>
  //             {!props.isEditComponent && (<span>{value}</span>)}
  //             {props.isEditComponent && htmlElement()}
  //           </td>
  //         </tr>
  //       )
  //     })
  //     return (
  //       <tbody key={index} className={''}>
  //         <tr id={'property' + index} onClick={(event) => { event.preventDefault(); toggleExpandIcon(index) }} data-toggle='collapse' data-target={'#expand' + index} style={{cursor: 'pointer'}}>
  //           <td><icon id={'expandIcon' + index} className={'fa fa-plus'} aria-hidden='true' />&nbsp;</td>
  //           <td><span className={styles.labelbold}>{property.name}</span></td>
  //         </tr>
  //         <tr className='collapse' id={'expand' + index}>
  //           <td colSpan='2'>
  //             <table style={{width: '100%'}}>
  //               {childProperties}
  //             </table>
  //           </td>
  //         </tr>
  //       </tbody>
  //     )
  //   })
  // }
  if (props.entitlementRelationships && props.entitlementRelationships.length > 0) {
    modelRelationshipData = _.filter(props.entitlementRelationships, {'isDisplay': true})
    let parent = _.filter(props.entitlementRelationships, {'relationship_type': 'Parent'})
    let outgoing = _.filter(props.entitlementRelationships, {'relationship_type': 'ConnectFrom'})
    outgoing = _.orderBy(outgoing, ['connection.name', 'target_component.name'], ['asc', 'asc'])
    let incoming = _.filter(props.entitlementRelationships, {'relationship_type': 'ConnectTo'})
    incoming = _.orderBy(incoming, ['connection.name', 'target_component.name'], ['asc', 'asc'])
    let child = _.filter(props.entitlementRelationships, {'relationship_type': 'Child'})
    let parentApplicationRelationshipListFn = function () {
      if (parent.length > 0) {
        let isCheckboxChecked = false
        let checkData = {}
        checkData.relationshipType = parent[0].relationship_type
        checkData.connectionName = null
        checkData.targetComponentTypeName = parent[0].target_component.component_type.name
        let childElementList = parent.map(function (element, i) {
        // let relationshipActionSettings = {...props.relationshipActionSettings}
        // relationshipActionSettings.relationshipText = parent[0].component.name + ' ' + parent[0].relationship_type + ' Components'
        // relationshipActionSettings.relationshipId = element.target_component.id
        // return (<span className='row' key={'parent' + i} style={{'padding': '5px'}}>
        //   <div className='col-md-10'><a href='javascript:void(0);'>{element.target_component.name}</a></div>
        //   <div className='dropdown pull-right col-md-2'>
        //     <button className='m-portlet__nav-link m-dropdown__toggle btn btn-secondary m-btn m-btn--icon m-btn--pill' data-toggle='dropdown' data-hover='dropdown' aria-haspopup='true' aria-expanded='false'><i className='la la-ellipsis-h' /></button>
        //     <div className={styles.dropmenu}>
        //       <ul className='dropdown-menu'>
        //         <li><a href='javascript:void(0);'><h6>Relationships Action</h6></a></li>
        //         <li><a href='javascript:void(0);' onClick={(event) => { relationshipActionSettings.isModalOpen = true; relationshipActionSettings.actionType = 'edit'; relationshipActionSettings.componentName = element.target_component.name; relationshipActionSettings.selectedObject = element; props.setRelationshipActionSettings(relationshipActionSettings) }} >Edit</a></li>
        //         <li><a href='javascript:void(0);' onClick={(event) => { relationshipActionSettings.isModalOpen = true; relationshipActionSettings.actionType = 'delete'; relationshipActionSettings.componentName = element.target_component.name; relationshipActionSettings.selectedObject = element; props.setRelationshipActionSettings(relationshipActionSettings) }} >Delete</a></li>
        //       </ul>
        //     </div>
        //   </div>
        //   <br />
        // </span>)
        if (element.isDisplay) {
          isCheckboxChecked = true
        }
        return (<span className='row' style={{'padding': '5px'}}>
          <div className='col-md-10'>
            <span className='pull-left'>{element.target_component.name}</span>
            <span className='float-right'>
              <span className='pull-right'>
                <input style={{cursor: 'pointer'}} type='checkbox' onChange={(event) => { handleCheckbox(event.target.checked, element) }} checked={element.isDisplay} />{' display'}
              </span>
            </span>
          </div>
        </span>)
      })
      return (
        <div className='m-accordion__item' key={'parent_accord'} style={{'overflow': 'visible'}}>
          <div className='m-accordion__item-head collapsed' role='tab' id='m_accordion_2_item_1_head' data-toggle='collapse' href={'#m_accordion_2_item_1_body' + parent[0].relationship_type} aria-expanded='true'>
            <input style={{cursor: 'pointer'}} onChange={(event) => { handleGroupCheckbox(event.target.checked, checkData) }} checked={isCheckboxChecked} className='pull-left' type='checkbox' />
            <span className='m-accordion__item-title'>{parent[0].component.name} {parent[0].relationship_type} {'Components'}</span>
            <span className='m-accordion__item-mode' />
          </div>
          <div className='m-accordion__item-body collapse' id={'m_accordion_2_item_1_body' + parent[0].relationship_type} role='tabpanel' aria-labelledby='m_accordion_2_item_1_head' data-parent='#m_accordion_2'>
            <div className='m-accordion__item-content'>
              {childElementList}
            </div>
          </div>
        </div>
        )
      } else {
        console.log('parent else')
        return false
      }
    }
    let childApplicationRelationshipListFn = function () {
      if (child.length > 0) {
        let isCheckboxChecked = false
        let checkData = {}
        checkData.relationshipType = child[0].relationship_type
        checkData.connectionName = null
        checkData.targetComponentTypeName = child[0].target_component.component_type.name
        let childElementList = child.map(function (element, i) {
          if (element.isDisplay) {
            isCheckboxChecked = true
          }
        // let relationshipActionSettings = {...props.relationshipActionSettings}
        // relationshipActionSettings.relationshipText = child[0].component.name + ' ' + child[0].relationship_type + ' Components'
        // relationshipActionSettings.relationshipId = element.target_component.id
        // return (<span className='row' key={'child' + i} style={{'padding': '5px'}}>
        //   <div className='col-md-10'><a href='javascript:void(0);'>{element.target_component.name}</a></div>
        //   <div className='dropdown pull-right col-md-2'>
        //     <button className='m-portlet__nav-link m-dropdown__toggle btn btn-secondary m-btn m-btn--icon m-btn--pill' data-toggle='dropdown' data-hover='dropdown' aria-haspopup='true' aria-expanded='false'><i className='la la-ellipsis-h' /></button>
        //     <div className={styles.dropmenu}>
        //       <ul className='dropdown-menu'>
        //         <li><a href='javascript:void(0);'><h6>Relationships Action</h6></a></li>
        //         <li><a href='javascript:void(0);' onClick={(event) => { relationshipActionSettings.isModalOpen = true; relationshipActionSettings.actionType = 'edit'; relationshipActionSettings.componentName = element.target_component.name; relationshipActionSettings.selectedObject = element; props.setRelationshipActionSettings(relationshipActionSettings) }} >Edit</a></li>
        //         <li><a href='javascript:void(0);' onClick={(event) => { relationshipActionSettings.isModalOpen = true; relationshipActionSettings.actionType = 'delete'; relationshipActionSettings.componentName = element.target_component.name; relationshipActionSettings.selectedObject = element; props.setRelationshipActionSettings(relationshipActionSettings) }} >Delete</a></li>
        //       </ul>
        //     </div>
        //   </div>
        //   <br />
        // </span>)
        return (<span className='row' style={{'padding': '5px'}}>
          <div className='col-md-10'>
            <span className='pull-left'>{element.target_component.name}</span>
            <span className='float-right'>
              <span className='pull-right'>
                <input style={{cursor: 'pointer'}} type='checkbox' onChange={(event) => { handleCheckbox(event.target.checked, element) }} checked={element.isDisplay} />{' display'}
              </span>
            </span>
          </div>
        </span>)
      })
      return (
        <div className='m-accordion__item' key={'child_accord'} style={{'overflow': 'visible'}}>
          <div className='m-accordion__item-head collapsed' role='tab' id='m_accordion_2_item_1_head' data-toggle='collapse' href={'#m_accordion_2_item_1_body' + child[0].relationship_type} aria-expanded='true'>
            <input className='pull-left' style={{cursor: 'pointer'}} onChange={(event) => { event.stopPropagation(); handleGroupCheckbox(event.target.checked, checkData) }} checked={isCheckboxChecked} type='checkbox' />
            <span className='m-accordion__item-title'>{child[0].component.name} {child[0].relationship_type} {'Components'}</span>
            <span className='m-accordion__item-mode' />
          </div>
          <div className='m-accordion__item-body collapse' id={'m_accordion_2_item_1_body' + child[0].relationship_type} role='tabpanel' aria-labelledby='m_accordion_2_item_1_head' data-parent='#m_accordion_2'>
            <div className='m-accordion__item-content'>
              {childElementList}
            </div>
          </div>
        </div>
        )
      } else {
        console.log('child else')
        return false
      }
    }
    let outgoingApplicationRelationshipListFn = function () {
      if (outgoing.length > 0) {
        let outgoingElements = []
        var outgoingGroup = _.chain(outgoing)
        .groupBy('connection.name')
        .mapValues(connectionTypeGroup => _.groupBy(connectionTypeGroup, targetComponentTypeGroup => targetComponentTypeGroup.target_component.component_type.name))
        .value()
        let outerKey = 0
        for (let connectionKey in outgoingGroup) {
          if (outgoingGroup.hasOwnProperty(connectionKey)) {
            outerKey++
            let innerKey = 0
            for (let targetComponentTypeKey in outgoingGroup[connectionKey]) {
              if (outgoingGroup[connectionKey].hasOwnProperty(targetComponentTypeKey)) {
                innerKey++
                let isCheckboxChecked = false
                let checkData = {}
                checkData.relationshipType = 'ConnectFrom'
                checkData.connectionName = connectionKey
                checkData.targetComponentTypeName = targetComponentTypeKey
                // let relationshipActionSettings = {...props.relationshipActionSettings}
                // relationshipActionSettings.relationshipText = outgoingGroup[connectionKey][targetComponentTypeKey][0].component.name + ' ' + connectionKey + ' ' + targetComponentTypeKey
                // relationshipActionSettings.relationshipId = outgoingGroup[connectionKey][targetComponentTypeKey][0].connection.id
                let childElementList = outgoingGroup[connectionKey][targetComponentTypeKey].map(function (element, i) {
                  if (element.isDisplay) {
                    isCheckboxChecked = true
                  }
                  // return (<span className='row' key={'outgoing' + i} style={{'padding': '5px'}}>
                  //   <div className='col-md-10'><a href='javascript:void(0);'>{element.target_component.name}</a></div>
                  //   <div className='dropdown pull-right col-md-2'>
                  //     <button className='m-portlet__nav-link m-dropdown__toggle btn btn-secondary m-btn m-btn--icon m-btn--pill' data-toggle='dropdown' data-hover='dropdown' aria-haspopup='true' aria-expanded='false'><i className='la la-ellipsis-h' /></button>
                  //     <div className={styles.dropmenu}>
                  //       <ul className='dropdown-menu'>
                  //         <li><a href='javascript:void(0);'><h6>Relationships Action</h6></a></li>
                  //         <li><a href='javascript:void(0);' onClick={(event) => { relationshipActionSettings.isModalOpen = true; relationshipActionSettings.actionType = 'edit'; relationshipActionSettings.componentName = element.target_component.name; relationshipActionSettings.selectedObject = element; props.setRelationshipActionSettings(relationshipActionSettings) }}>Edit</a></li>
                  //         <li><a href='javascript:void(0);' onClick={(event) => { relationshipActionSettings.isModalOpen = true; relationshipActionSettings.actionType = 'delete'; relationshipActionSettings.componentName = element.target_component.name; relationshipActionSettings.selectedObject = element; props.setRelationshipActionSettings(relationshipActionSettings) }}>Delete</a></li>
                  //       </ul>
                  //     </div>
                  //   </div>
                  //   <br />
                  // </span>)
                  return (<span className='row' style={{'padding': '5px'}}>
                    <div className='col-md-10'>
                      <span className='pull-left'>{element.target_component.name}</span>
                      <span className='float-right'>
                        <span className='pull-right'>
                          <input style={{cursor: 'pointer'}} type='checkbox' onChange={(event) => { handleCheckbox(event.target.checked, element) }} checked={element.isDisplay} />{' display'}
                        </span>
                      </span>
                    </div>
                  </span>)
                })
                // let cleanKey = targetComponentTypeKey.replace(/ /g, '')
                outgoingElements.push(
                  <div className='m-accordion__item' key={'outgoing_accord'} style={{'overflow': 'visible'}}>
                    <div className='m-accordion__item-head collapsed' role='tab' id='m_accordion_2_item_1_head' data-toggle='collapse' href={'#outgoing_accordion_body' + outerKey + '-' + innerKey} aria-expanded='false'>
                      <input style={{cursor: 'pointer'}} checked={isCheckboxChecked} onChange={(event) => { event.stopPropagation(); handleGroupCheckbox(event.target.checked, checkData) }} className='pull-left' type='checkbox' />
                      <span className='m-accordion__item-title'>{outgoingGroup[connectionKey][targetComponentTypeKey][0].component.name} {connectionKey} {targetComponentTypeKey}</span>
                      <span className='m-accordion__item-mode' />
                    </div>
                    <div className='m-accordion__item-body collapse' id={'outgoing_accordion_body' + outerKey + '-' + innerKey} role='tabpanel' aria-labelledby='m_accordion_2_item_1_head' data-parent='#m_accordion_2'>
                      <div className='m-accordion__item-content'>
                        {childElementList}
                      </div>
                    </div>
                  </div>
                )
              }
            }
          }
        }
        return outgoingElements
      } else {
        console.log('outgoing else')
        return false
      }
    }
    let incomingApplicationRelationshipListFn = function () {
      if (incoming.length > 0) {
        var incomingGroup = _.chain(incoming)
        .groupBy('connection.name')
        .mapValues(connectionTypeGroup => _.groupBy(connectionTypeGroup, targetComponentTypeGroup => targetComponentTypeGroup.target_component.component_type.name))
        .value()
        let incomingElements = []
        let outerKey = 0
        for (let connectionKey in incomingGroup) {
          if (incomingGroup.hasOwnProperty(connectionKey)) {
            outerKey++
            let innerKey = 0
            for (let targetComponentTypeKey in incomingGroup[connectionKey]) {
              if (incomingGroup[connectionKey].hasOwnProperty(targetComponentTypeKey)) {
                innerKey++
                let isCheckboxChecked = false
                let checkData = {}
                checkData.relationshipType = 'ConnectTo'
                checkData.connectionName = connectionKey
                checkData.targetComponentTypeName = targetComponentTypeKey
                // let relationshipActionSettings = {...props.relationshipActionSettings}
                // relationshipActionSettings.relationshipText = targetComponentTypeKey + ' ' + connectionKey + ' ' + incomingGroup[connectionKey][targetComponentTypeKey][0].component.name
                // relationshipActionSettings.relationshipId = incomingGroup[connectionKey][targetComponentTypeKey][0].connection.id
                let childElementList = incomingGroup[connectionKey][targetComponentTypeKey].map(function (element, i) {
                  if (element.isDisplay) {
                    isCheckboxChecked = true
                  }
                  // return (<span className='row' key={'incoming' + i} style={{'padding': '5px'}}>
                  //   <div className='col-md-10'><a href='javascript:void(0);'>{element.target_component.name}</a></div>
                  //   <div className='dropdown pull-right col-md-2'>
                  //     <button className='m-portlet__nav-link m-dropdown__toggle btn btn-secondary m-btn m-btn--icon m-btn--pill' data-toggle='dropdown' data-hover='dropdown' aria-haspopup='true' aria-expanded='false'><i className='la la-ellipsis-h' /></button>
                  //     <div className={styles.dropmenu}>
                  //       <ul className='dropdown-menu'>
                  //         <li><a href='javascript:void(0);'><h6>Relationships Action</h6></a></li>
                  //         <li><a href='javascript:void(0);' onClick={(event) => { relationshipActionSettings.isModalOpen = true; relationshipActionSettings.actionType = 'edit'; relationshipActionSettings.componentName = element.target_component.name; relationshipActionSettings.selectedObject = element; props.setRelationshipActionSettings(relationshipActionSettings) }}>Edit</a></li>
                  //         <li><a href='javascript:void(0);' onClick={(event) => { relationshipActionSettings.isModalOpen = true; relationshipActionSettings.actionType = 'delete'; relationshipActionSettings.componentName = element.target_component.name; relationshipActionSettings.selectedObject = element; props.setRelationshipActionSettings(relationshipActionSettings) }}>Delete</a></li>
                  //       </ul>
                  //     </div>
                  //   </div>
                  //   <br />
                  // </span>)
                  return (<span className='row' style={{'padding': '5px'}}>
                    <div className='col-md-10'>
                      <span className='pull-left'>{element.target_component.name}</span>
                      <span className='float-right'>
                        <span className='pull-right'>
                          <input style={{cursor: 'pointer'}} type='checkbox' onChange={(event) => { handleCheckbox(event.target.checked, element) }} checked={element.isDisplay} />{' display'}
                        </span>
                      </span>
                    </div>
                  </span>)
                })
                // let cleanKey = targetComponentTypeKey.replace(/ /g, '')
                incomingElements.push(
                  <div className='m-accordion__item' key={'incoming_accord'} style={{'overflow': 'visible'}}>
                    <div className='m-accordion__item-head collapsed' role='tab' id='m_accordion_2_item_1_head' data-toggle='collapse' href={'#incoming_accordion_body' + outerKey + '-' + innerKey} aria-expanded='true'>
                      <input className='pull-left' style={{cursor: 'pointer'}} onChange={(event) => { event.stopPropagation(); handleGroupCheckbox(event.target.checked, checkData) }} checked={isCheckboxChecked} type='checkbox' />
                      <span className='m-accordion__item-title'>{targetComponentTypeKey} {connectionKey} {incomingGroup[connectionKey][targetComponentTypeKey][0].component.name}</span>
                      <span className='m-accordion__item-mode' />
                    </div>
                    <div className='m-accordion__item-body collapse' id={'incoming_accordion_body' + outerKey + '-' + innerKey} role='tabpanel' aria-labelledby='m_accordion_2_item_1_head' data-parent='#m_accordion_2'>
                      <div className='m-accordion__item-content'>
                        {childElementList}
                      </div>
                    </div>
                  </div>
                )
              }
            }
          }
        }
        return incomingElements
      } else {
        console.log('incoming else')
        return false
      }
    }

    parentApplicationRelationshipList = parentApplicationRelationshipListFn()
    outgoingApplicationRelationshipList = outgoingApplicationRelationshipListFn()
    incomingApplicationRelationshipList = incomingApplicationRelationshipListFn()
    childApplicationRelationshipList = childApplicationRelationshipListFn()
  }
  // Start Code for ADD new Connections
  let isParentSelected = props.addNewConnectionSettings.isParentSelected
  let newRelationshipArray = [...props.addNewConnectionSettings.newConnectionArray]
  let SelectedData
  let selectComponentOptions1 = ''
  let addConnectionClass = props.addNewConnectionSettings.showCreateConnectionButton ? '' : 'disabled ' + styles.pointerDisabled
  let addRelationshipClass = props.addNewConnectionSettings.showAddRelationshipButton ? '' : 'disabled ' + styles.pointerDisabled
  if (props.componentTypeComponentConstraints !== '') {
    SelectedData = props.componentTypeComponentConstraints.resources.filter(function (constraint) {
        if (constraint.target_component_type !== null) {
        return constraint
        }
      }).map(function (constraint, index) {
      if (constraint.target_component_type !== null) {
        let data = {}
        if (constraint.constraint_type === 'Parent') {
          // data.display_name = props.componentTypeComponentData.resources[0].name + ' ' + constraint.constraint_type + ' Components'
          data.display_name = entitlementName + ' is Child of ' + constraint.target_component_type.name
          data.isParent = true
        } else if (constraint.constraint_type === 'Child') {
          // data.display_name = props.componentTypeComponentData.resources[0].name + ' ' + constraint.constraint_type + ' Components'
          data.display_name = entitlementName + ' is Parent of ' + constraint.target_component_type.name
          data.isParent = false
        } else if (constraint.constraint_type === 'ConnectFrom') {
          data.display_name = entitlementName + ' ' + constraint.connection_type.name + ' ' + constraint.target_component_type.name
          data.isParent = false
        } else if (constraint.constraint_type === 'ConnectTo') {
          data.display_name = constraint.target_component_type.name + ' ' + constraint.connection_type.name + ' ' + entitlementName
          data.isParent = false
        }
        data.disabled = true
        data.id = constraint.id
        data.constraint_type = constraint.constraint_type
        data.target_component_type = constraint.target_component_type
        data.name = constraint.name
        data.is_disabled = true
        data.value = constraint.id
        data.label = data.display_name
        return data
      } else {
        return false
      }
    })
  }
  if (props.componentTypeComponents !== '') {
    selectComponentOptions1 = props.componentTypeComponents.resources.map((component, index) => {
      let option = {...component}
      option.value = component.name
      option.label = component.name
      return option
    })
    if (props.addNewConnectionSettings.firstSelectboxIndex !== null) {
      let newOption = {}
      newOption.value = NEWCOMPONENT
      newOption.label = 'New ' + props.addNewConnectionSettings.firstSelectboxIndex.target_component_type.name
      selectComponentOptions1.push(newOption)
    }
  }
  // let openModal = function (event) {
  //   // event.preventDefault()
  //   let parent = _.filter(props.entitlementRelationships.resources, {'relationship_type': 'Parent'})
  //   let isParentSelected = parent.length > 0
  //   let payload = {...props.addNewConnectionSettings, 'isModalOpen': true, 'firstSelectboxSelected': false, 'firstSelectboxIndex': null, 'isParentSelected': isParentSelected, 'secondSelectboxSelected': false, 'showCreateConnectionButton': false, 'slectedConstraintObject': {}, 'relationshipText': '', 'newConnectionArray': []}
  //   props.setAddConnectionSettings(payload)
  //   entitlementPropertiesPayload.relationship = []
  //   props.pushEntitlementPropertyPayload(entitlementPropertiesPayload)
  // }
  let closeModal = function () {
    let payload = {...props.addNewConnectionSettings, 'isModalOpen': false, 'firstSelectboxSelected': false, 'secondSelectboxSelected': false, 'slectedConstraintObject': {}, 'relationshipText': '', 'newConnectionArray': []}
    props.setAddConnectionSettings(payload)
  }
  let handleFirstSelect = function (newValue: any, actionMeta: any) {
    console.group('Value Changed first select')
    console.log(newValue)
    console.log(`action: ${actionMeta.action}`)
    console.groupEnd()
    if (actionMeta.action === 'select-option') {
      if (newValue !== null) {
        let index = newValue.id
      // let constraintObject = props.componentTypeComponentConstraints.resources[index]
        let constraintObject = _.find(props.componentTypeComponentConstraints.resources, function (obj) {
                                    return (parseInt(obj.id) === parseInt(index) && obj.constraint_type === newValue.constraint_type)
                                })
        let targetComponentTypeId = parseInt(constraintObject.target_component_type.id)
        let isWaitingForApiResponse = props.addNewConnectionSettings.isWaitingForApiResponse
        if (props.addNewConnectionSettings.targetComponentTypeId !== targetComponentTypeId) {
          // call api
          let apiPayload = {
            'componentTypeId': targetComponentTypeId
          }
          props.fetchComponentTypeComponents && props.fetchComponentTypeComponents(apiPayload)
          isWaitingForApiResponse = true
        }
        let displayText = newValue.display_name
        let payload = {...props.addNewConnectionSettings, 'firstSelectboxSelected': true, 'firstSelectboxIndex': newValue, 'targetComponentTypeId': targetComponentTypeId, 'isWaitingForApiResponse': isWaitingForApiResponse, 'secondSelectboxSelected': false, 'slectedConstraintObject': constraintObject, 'relationshipText': displayText, 'selectedComponentObject': {}}
        props.setAddConnectionSettings(payload)
      } else {
        let payload = {...props.addNewConnectionSettings, 'firstSelectboxSelected': false, 'firstSelectboxIndex': newValue, 'secondSelectboxSelected': false, 'slectedConstraintObject': {}, 'relationshipText': '', 'selectedComponentObject': {}}
        props.setAddConnectionSettings(payload)
      }
    }
    if (actionMeta.action === 'clear') {
      let payload = {...props.addNewConnectionSettings, 'firstSelectboxSelected': false, 'firstSelectboxIndex': null, 'secondSelectboxSelected': false, 'slectedConstraintObject': {}, 'relationshipText': '', 'selectedComponentObject': {}}
      props.setAddConnectionSettings(payload)
    }
  }
  let addRelationShip = function () {
    let displayName = props.addNewConnectionSettings.relationshipText + ' ' + props.addNewConnectionSettings.componentText
    let targetComponent = {}
    let payload = {}
    payload.op = 'add'
    payload.value = {}
    payload.value.relationship_type = props.addNewConnectionSettings.slectedConstraintObject.constraint_type
    payload.value.target_component = {}
    if (typeof props.addNewConnectionSettings.selectedComponentObject.id !== 'undefined') {
      payload.value.target_component.id = props.addNewConnectionSettings.selectedComponentObject.id
    } else {
      payload.value.target_component.name = props.addNewConnectionSettings.selectedComponentObject.name
      payload.value.target_component.component_type = {}
      payload.value.target_component.component_type.id = props.addNewConnectionSettings.slectedConstraintObject.target_component_type.id
    }
    payload.value.relationship_type = props.addNewConnectionSettings.slectedConstraintObject.constraint_type
    if (props.addNewConnectionSettings.slectedConstraintObject.constraint_type !== 'Parent' && props.addNewConnectionSettings.slectedConstraintObject.constraint_type !== 'Child') {
      payload.value.connection = {}
      payload.value.connection.connection_type = props.addNewConnectionSettings.slectedConstraintObject.connection_type.id
    }
    if (props.addNewConnectionSettings.slectedConstraintObject.constraint_type === 'Parent') {
      payload.path = '/-' // '/parent'
    } else if (props.addNewConnectionSettings.slectedConstraintObject.constraint_type === 'Child') {
      payload.path = '/-' // '/children'
    } else if (props.addNewConnectionSettings.slectedConstraintObject.constraint_type === 'ConnectTo') {
      payload.path = '/-' // '/'
      payload.value.connection = {}
      payload.value.connection.connection_type = {}
      payload.value.connection.connection_type.id = props.addNewConnectionSettings.slectedConstraintObject.connection_type.id
    } else if (props.addNewConnectionSettings.slectedConstraintObject.constraint_type === 'ConnectFrom') {
      payload.path = '/-' // '/'
      payload.value.connection = {}
      payload.value.connection.connection_type = {}
      payload.value.connection.connection_type.id = props.addNewConnectionSettings.slectedConstraintObject.connection_type.id
    }
    targetComponent.name = props.addNewConnectionSettings.selectedComponentObject.name
    targetComponent.id = props.addNewConnectionSettings.selectedComponentObject.id
    targetComponent.component_type = props.addNewConnectionSettings.slectedConstraintObject.target_component_type
    let component = {}
    component.name = props.entitlement.resources[0].name
    component.id = props.entitlement.resources[0].id
    let newConnection = {}
    newConnection.display_name = displayName
    newConnection.relationship_type = props.addNewConnectionSettings.slectedConstraintObject.constraint_type
    newConnection.component = component
    newConnection.payload = payload
    // eslint-disable-next-line
    newConnection.target_component = targetComponent
    newConnection.connection = props.addNewConnectionSettings.slectedConstraintObject.connection_type
    newRelationshipArray.push(newConnection)
    let isParentSelected = newConnection.relationship_type === 'Parent'
    let settingPayload = {...props.addNewConnectionSettings, 'firstSelectboxSelected': false, 'firstSelectboxIndex': null, 'secondSelectboxSelected': false, 'isParentSelected': isParentSelected, 'newConnectionArray': newRelationshipArray, 'showCreateConnectionButton': true, 'slectedConstraintObject': {}, 'selectedComponentObject': {}}
    props.setAddConnectionSettings(settingPayload)
    entitlementPropertiesPayload.relationship.push(payload)
    props.pushEntitlementPropertyPayload(entitlementPropertiesPayload)
  }
  let addConnections = function () {
    // comment this below line when actual api work in correct response
    // props.setRelationshipsValue({'resources': newRelationshipArray})
    // eslint-disable-next-line
    mApp.blockPage({overlayColor:'#000000',type:'loader',state:'success',message:'Processing...'})
    let payload = {}
    payload.componentId = props.entitlement.resources[0].id
    payload.relationship = entitlementPropertiesPayload.relationship
    props.updateComponentTypeComponentRelationships(payload)
    // showToaster()
    closeModal()
  }
  let handleSecondSelect = function (newValue: any, actionMeta: any) {
    if (actionMeta.action === 'select-option') {
      if (newValue !== null) {
        // let index = newValue.value
        if (newValue.value === NEWCOMPONENT) {
          let componentObject = {}
          componentObject.name = ''
          let showAddRelationshipButton = false
          let payload = {...props.addNewConnectionSettings, 'secondSelectboxSelected': true, 'isNewComponent': true, 'selectedComponentObject': componentObject, 'componentText': componentObject.name, 'newComponentName': componentObject.name, 'showAddRelationshipButton': showAddRelationshipButton}
          props.setAddConnectionSettings(payload)
        } else {
          let componentObject = newValue // props.componentTypeComponents.resources[index]
          let payload = {...props.addNewConnectionSettings, 'secondSelectboxSelected': true, 'isNewComponent': false, 'selectedComponentObject': componentObject, 'componentText': componentObject.name}
          props.setAddConnectionSettings(payload)
        }
      } else {
        let payload = {...props.addNewConnectionSettings, 'secondSelectboxSelected': false, 'isNewComponent': false, 'selectedComponentObject': {}, 'componentText': ''}
        props.setAddConnectionSettings(payload)
      }
    }
    if (actionMeta.action === 'clear') {
      let payload = {...props.addNewConnectionSettings, 'secondSelectboxSelected': false, 'isNewComponent': false, 'selectedComponentObject': {}, 'componentText': ''}
      props.setAddConnectionSettings(payload)
    }
    if (actionMeta.action === 'create-option') {
      if (newValue !== null) {
        let componentObject = {}
        componentObject.name = newValue.value // props.componentTypeComponents.resources[index]
        let showAddRelationshipButton = newValue.value.length >= 1
        let payload = {...props.addNewConnectionSettings, 'secondSelectboxSelected': true, 'isNewComponent': true, 'selectedComponentObject': componentObject, 'componentText': componentObject.name, 'newComponentName': componentObject.name, 'showAddRelationshipButton': showAddRelationshipButton}
        props.setAddConnectionSettings(payload)
      } else {
        let payload = {...props.addNewConnectionSettings, 'secondSelectboxSelected': false, 'selectedComponentObject': {}, 'componentText': ''}
        props.setAddConnectionSettings(payload)
      }
    }
  }
  let handleInputChange = function (inputValue: any, actionMeta: any) {
    console.group('Input Changed')
    console.log(inputValue)
    console.log(`action: ${actionMeta.action}`)
    console.groupEnd()
  }
  let removeRelationship = function (index) {
    let newConnection = [...props.addNewConnectionSettings.newConnectionArray]
    newConnection.splice(index, 1)
    let showCreateConnectionButton = newConnection.length > 0 || false
    let payload = {...props.addNewConnectionSettings, 'newConnectionArray': newConnection, 'showCreateConnectionButton': showCreateConnectionButton}
    props.setAddConnectionSettings(payload)
    // props.setRelationshipsValue({'resources': newConnection})
    // modelRelationshipData = newConnection
    if (newConnection.length > 0) {
      let payload = []
      newConnection.forEach(function (data, index) {
        payload.push(data.payload)
      })
      entitlementPropertiesPayload.relationship = payload
      props.pushEntitlementPropertyPayload(entitlementPropertiesPayload)
    } else {
      entitlementPropertiesPayload.relationship = []
      props.pushEntitlementPropertyPayload(entitlementPropertiesPayload)
    }
  }
  let handleNewComponent = function (event) {
    let newComponent = event.target.value
    let componentObject = {}
    componentObject.name = newComponent
    let showAddRelationshipButton = newComponent.length >= 1
    let payload = {...props.addNewConnectionSettings, 'secondSelectboxSelected': true, 'isNewComponent': true, 'selectedComponentObject': componentObject, 'componentText': newComponent, 'newComponentName': newComponent, 'showAddRelationshipButton': showAddRelationshipButton}
    props.setAddConnectionSettings(payload)
  }
  // End code for ADD new Connections
   // --------------------------------------
  // Code For Update Connection
  let componentRelationshipPropertiesList = ''
  let relationshipPropertyPayload = props.relationshipPropertyPayload
  let componentRelationshipProperties = props.relationshipProperty.resources ? [...props.relationshipProperty.resources[0].properties] : ''
  let closeRelationshipActionModal = function (event) {
    let settingPayload = {...props.relationshipActionSettings, 'isModalOpen': false}
    props.setRelationshipActionSettings(settingPayload)
    props.resetComponentRelationshipProperties()
  }
  let updateRelationshipProperty = function (event) {
    event.preventDefault()
    // eslint-disable-next-line
    mApp.blockPage({overlayColor:'#000000',type:'loader',state:'success',message:'Processing...'})
    let payload = {}
    payload.componentId = props.entitlement.resources[0].id
    payload.relationshipId = props.relationshipActionSettings.relationshipId
    payload.payloadData = relationshipPropertyPayload
    props.updateRelationshipProperty(payload)
  }
  if (props.relationshipProperty !== '') {
    componentRelationshipPropertiesList = componentRelationshipProperties.map(function (property, index) {
      console.log('property', property)
      let propertyProperties = property.properties
      let childProperties = propertyProperties.map(function (childProperty, childIndex) {
        console.log('childProperty', childProperty)
        let value
        let htmlElement
        let requiredProperty = false
        if (childProperty.optionality.key === 'Required') {
          requiredProperty = true
        }
        if (childProperty.property_type.key === 'Integer') {
          value = childProperty.int_value
          htmlElement = function () {
            return (<div className='form-group m-form__group has-info'>
              <input type='number' className='input-sm form-control m-input' value={value} onChange={(event) => { editTextRelationshipProperty(index, childIndex, event.target.value) }} placeholder='Enter Here' />
              {false && (<div className='form-control-feedback'>should be Number</div>)}
            </div>)
          }
        } else if (childProperty.property_type.key === 'Decimal') {
          value = childProperty.float_value
          htmlElement = function () {
            return (<div className='form-group m-form__group has-info'>
              <input type='number' className='input-sm form-control m-input' value={value} onChange={(event) => { editTextRelationshipProperty(index, childIndex, event.target.value) }} placeholder='Enter Here' />
              {false && (<div className='form-control-feedback'>should be Number</div>)}
            </div>)
          }
        } else if (childProperty.property_type.key === 'DateTime') {
          // value = childProperty.date_time_value
          value = childProperty.date_time_value ? moment(childProperty.date_time_value).format('DD MMM YYYY') : ''
          htmlElement = function () {
            return (<div className='form-group m-form__group has-info'>
              <DatePicker
                className='input-sm form-control m-input'
                selected={childProperty.date_time_value ? moment(childProperty.date_time_value) : ''}
                dateFormat='DD MMM YYYY'
                onSelect={(date) => { editDateRelationshipProperty(index, childIndex, date) }}
                />
              {/* <input type='text' className='input-sm form-control m-input' value={value} onChange={(event) => { editTextRelationshipProperty(index, childIndex, event.target.value) }} placeholder='Enter Here' /> */}
              {false && (<div className='form-control-feedback'>should be Date</div>)}
            </div>)
          }
        } else if (childProperty.property_type.key === 'Text') {
          value = childProperty.text_value
          htmlElement = function () {
            return (<div className='form-group m-form__group has-info'>
              <input type='text' className='input-sm form-control m-input' value={value} onChange={(event) => { editTextRelationshipProperty(index, childIndex, event.target.value) }} placeholder='Enter Here' />
              {false && (<div className='form-control-feedback'>should be Text</div>)}
            </div>)
          }
        } else if (childProperty.property_type.key === 'List') {
          let childPropertyOption = childProperty.value_set.values.map((option, opIndex) => {
            option.label = option.name
            option.value = option.id
            return option
          })
          let dvalue = childProperty.value_set_value
          if (childProperty.value_set_value !== null) {
            dvalue.label = childProperty.value_set_value.name
            dvalue.value = childProperty.value_set_value.id
          }
          value = childProperty.value_set_value ? childProperty.value_set_value.name : null
          htmlElement = function () {
            return (<Select
              className='input-sm m-input'
              placeholder='Select Options'
              isClearable
              defaultValue={dvalue}
              onChange={handleRelationshipPropertySelect(index, childIndex)}
              isSearchable={false}
              name={'selectProperty'}
              options={childPropertyOption}
            />)
          }
        } else {
          value = childProperty.other_value
          htmlElement = function () {
            return (<div className='form-group m-form__group has-info'>
              <input type='text' className='input-sm form-control m-input' value={value} onChange={(event) => { editTextRelationshipProperty(index, childIndex, event.target.value) }} placeholder='Enter Here' />
              {false && (<div className='form-control-feedback'>should be Text</div>)}
            </div>)
          }
        }
        return (
          <tr key={'child' + childIndex}>
            <td><p className={styles.labelbold}>{childProperty.name}</p>{requiredProperty && props.relationshipActionSettings.actionType === 'edit' && (<span className='text-danger' >*</span>)}</td>
            <td>
              {props.relationshipActionSettings.actionType === 'view' && (<p>{value}</p>)}
              {props.relationshipActionSettings.actionType === 'edit' && htmlElement()}
            </td>
          </tr>
        )
      })
      console.log('childProperties', childProperties)
      return (
        <tbody key={index} className={''}>
          <tr>
            <td><span className={styles.labelbold}>Type</span></td>
            <td><span>{property.name}</span></td>
          </tr>
          {childProperties}
        </tbody>
      )
    })
  } else {
    console.log('check relationship properties else', props)
  }
  let handleRelationshipPropertySelect = function (index, childIndex) {
    return function (newValue: any, actionMeta: any) {
      if (actionMeta.action === 'select-option') {
        if (newValue !== null) {
          let payload
          let typeProperty = componentRelationshipProperties[index].properties[childIndex].type_property
          componentRelationshipProperties[index].properties[childIndex].value_set_value = newValue
          payload = { 'op': 'replace', 'path': `/${typeProperty}/value_set_value`, 'value': {id: newValue.value} }

          if (relationshipPropertyPayload.length === 0) {
            relationshipPropertyPayload.push(payload)
          } else {
            if (payload.path === relationshipPropertyPayload[relationshipPropertyPayload.length - 1].path) {
              relationshipPropertyPayload[relationshipPropertyPayload.length - 1] = payload
            } else {
              relationshipPropertyPayload.push(payload)
            }
          }
          let editPayload = {}
          editPayload.resources = []
          let propObject = {}
          propObject.properties = componentRelationshipProperties
          editPayload.resources.push(propObject)
          props.editComponentRelationshipProperties(editPayload)
          props.editComponentRelationshipPropertyPayload(relationshipPropertyPayload)
        }
      }
      if (actionMeta.action === 'clear') {
        let payload
        let typeProperty = componentRelationshipProperties[index].properties[childIndex].type_property
        componentRelationshipProperties[index].properties[childIndex].value_set_value = newValue
        payload = { 'op': 'replace', 'path': `/${typeProperty}/value_set_value`, 'value': newValue }

        if (relationshipPropertyPayload.length === 0) {
          relationshipPropertyPayload.push(payload)
        } else {
          if (payload.path === relationshipPropertyPayload[relationshipPropertyPayload.length - 1].path) {
            relationshipPropertyPayload[relationshipPropertyPayload.length - 1] = payload
          } else {
            relationshipPropertyPayload.push(payload)
          }
        }
        let editPayload = {}
        editPayload.resources = []
        let propObject = {}
        propObject.properties = componentRelationshipProperties
        editPayload.resources.push(propObject)
        props.editComponentRelationshipProperties(editPayload)
        props.editComponentRelationshipPropertyPayload(relationshipPropertyPayload)
      }
    }
  }
  let editDateRelationshipProperty = function (index, childIndex, value) {
    let payload
    let typeProperty = componentRelationshipProperties[index].properties[childIndex].type_property
    let selectedDate = value.format('DD MMM YYYY')
    componentRelationshipProperties[index].properties[childIndex].date_time_value = value.format('DD MMM YYYY')
    payload = { 'op': 'replace', 'path': `/${typeProperty}/date_time_value`, 'value': selectedDate }
    if (relationshipPropertyPayload.length === 0) {
      relationshipPropertyPayload.push(payload)
    } else {
      if (payload.path === relationshipPropertyPayload[relationshipPropertyPayload.length - 1].path) {
        relationshipPropertyPayload[relationshipPropertyPayload.length - 1] = payload
      } else {
        relationshipPropertyPayload.push(payload)
      }
    }
    let editPayload = {}
    editPayload.resources = []
    let propObject = {}
    propObject.properties = componentRelationshipProperties
    editPayload.resources.push(propObject)
    props.editComponentRelationshipProperties(editPayload)
    props.editComponentRelationshipPropertyPayload(relationshipPropertyPayload)
  }
  let editTextRelationshipProperty = function (index, childIndex, value) {
    let payload
    let typeProperty = componentRelationshipProperties[index].properties[childIndex].type_property
    if (componentRelationshipProperties[index].properties[childIndex].property_type.key === 'Boolean') {
      componentRelationshipProperties[index].properties[childIndex].boolean_value = value
      payload = { 'op': 'replace', 'path': `/${typeProperty}/boolean_value`, 'value': value }
    } else if (componentRelationshipProperties[index].properties[childIndex].property_type.key === 'Integer') {
      componentRelationshipProperties[index].properties[childIndex].int_value = value
      payload = { 'op': 'replace', 'path': `/${typeProperty}/int_value`, 'value': value }
    } else if (componentRelationshipProperties[index].properties[childIndex].property_type.key === 'Decimal') {
      componentRelationshipProperties[index].properties[childIndex].float_value = value
      payload = { 'op': 'replace', 'path': `/${typeProperty}/float_value`, 'value': value }
    } else if (componentRelationshipProperties[index].properties[childIndex].property_type.key === 'DateTime') {
      componentRelationshipProperties[index].properties[childIndex].date_time_value = value
      payload = { 'op': 'replace', 'path': `/${typeProperty}/date_time_value`, 'value': value }
    } else if (componentRelationshipProperties[index].properties[childIndex].property_type.key === 'Text') {
      componentRelationshipProperties[index].properties[childIndex].text_value = value
      payload = { 'op': 'replace', 'path': `/${typeProperty}/text_value`, 'value': value }
    } else {
      componentRelationshipProperties[index].properties[childIndex].other_value = value
      payload = { 'op': 'replace', 'path': `/${typeProperty}/other_value`, 'value': value }
      componentRelationshipProperties[index].properties[childIndex].showMessage = false
    }
    if (relationshipPropertyPayload.length === 0) {
      relationshipPropertyPayload.push(payload)
    } else {
      if (payload.path === relationshipPropertyPayload[relationshipPropertyPayload.length - 1].path) {
        relationshipPropertyPayload[relationshipPropertyPayload.length - 1] = payload
      } else {
        relationshipPropertyPayload.push(payload)
      }
    }
    let editPayload = {}
    editPayload.resources = []
    let propObject = {}
    propObject.properties = componentRelationshipProperties
    editPayload.resources.push(propObject)
    props.editComponentRelationshipProperties(editPayload)
    props.editComponentRelationshipPropertyPayload(relationshipPropertyPayload)
  }
  // End for Update Connection
  // Code for Delete Relationship begins here
  let removeComponentRelationship = function (event) {
    event.preventDefault()
    let payload = {}
    payload.componentId = props.entitlement.resources[0].id
    let relationshipType = props.relationshipActionSettings.selectedObject.relationship_type
    if (relationshipType === 'Parent') {
      payload.deletePayload = { 'parent': true }
      payload.relationshipId = props.relationshipActionSettings.relationshipId
      payload.relationshipType = 'parent'
    } else if (relationshipType === 'Child') {
      payload.deletePayload = { 'child': true }
      payload.relationshipId = props.relationshipActionSettings.relationshipId
      payload.relationshipType = 'child'
    } else if (relationshipType === 'ConnectFrom' || relationshipType === 'ConnectTo') {
      payload.deletePayload = {}
      payload.relationshipId = props.relationshipActionSettings.relationshipId
      payload.relationshipType = 'others'
    }
    props.deleteComponentRelationship(payload)
  }
  // End code for delete relationships
  if (props.validationProperty.length > 0) {
    validationPropertyList = props.validationProperty.map(function (data, index) {
      return (<li>{data}</li>)
    })
  }
  console.log(updateEntitlement)
    return (
      <div>
        <div className='row'>
          <div className='col-md-8'>
            {!props.isEditComponent && (<h2>Entitlement: {entitlementName}</h2>)}
            {props.isEditComponent && (<div className='col-6 form-group m-form__group has-danger'>
              <input type='text' className='form-control m-input' onChange={editEntitlementName} value={entitlementName} placeholder='Entitlement Name' aria-describedby='basic-addon2' />
              </div>)}
            <br />
            {props.isEditComponent && (<div className='col-6 form-group m-form__group has-danger'>
              <input type='text' className='form-control m-input' onChange={editEntitlementDescription} value={entitlementDescription} placeholder='Entitlement Description' aria-describedby='basic-addon2' />
            </div>)}
          </div>
          {!props.isEditComponent && (
          <div className='col-md-4 float-right' >
            <span className='pull-right'>
              <a href='/entitlements' data-skin='light' data-toggle='m-tooltip' data-placement='top' data-original-title='back' className='btn btn-info m-btn m-btn--icon btn-sm m-btn--icon-only  m-btn--pill m-btn--air'>
                <i className='fa flaticon-list-1 fa-2x' />
              </a>&nbsp;&nbsp;
              <a href='javascript:void(0);' data-skin='light' data-toggle='m-tooltip' data-placement='top' data-original-title='Edit Entitlement' onClick={openEditModal} className='btn btn-info m-btn m-btn--icon btn-sm m-btn--icon-only  m-btn--pill m-btn--air'>
                <i className='fa flaticon-edit-1 fa-2x' />
              </a>&nbsp;&nbsp;
              <a href='javascript:void(0);' data-skin='light' data-toggle='m-tooltip' data-placement='top' data-original-title='Delete Entitlement' onClick={deleteEntitlement} className='btn btn-info m-btn m-btn--icon btn-sm m-btn--icon-only  m-btn--pill m-btn--air'>
                <i className='fa flaticon-delete-1 fa-2x' />
              </a>&nbsp;&nbsp;
              <a href='javascript:void(0);' data-skin='light' data-toggle='m-tooltip' data-placement='top' data-original-title='Initiate Discussion' onClick={openDiscussionModal} className='btn btn-info m-btn m-btn--icon btn-sm m-btn--icon-only  m-btn--pill m-btn--air'>
                <i className='fa flaticon-multimedia-3 fa-2x' />
              </a>
            </span>
            {/* <button onClick={updateEntitlement} className='btn btn-outline-info btn-sm'>Edit Entitlement</button>&nbsp;
            <button onClick={deleteEntitlement} className='btn btn-outline-info btn-sm'>Delete Entitlement</button>&nbsp;
            <button onClick={openDiscussionModal} className='btn btn-outline-info btn-sm'>Create Discussion</button> */}
          </div>
          )}
          {props.isEditComponent && (<div className='col-md-4 float-right' >
            <div className='row pull-right'>
              <div className='col-md-6'>
                <div className='btn-group m-btn-group m-btn-group--pill' role='group' aria-label='...'>
                  <button type='button' onClick={cancelEditEntitlement} className='m-btn btn btn-secondary'>Cancel</button>
                  <button type='button' onClick={saveEntitlementProperty} className='m-btn btn btn-secondary'>Save</button>
                </div>
              </div>
            </div></div>)}
          {/* {props.isEditComponent && (
          <div className='col-md-4' >
            <button onClick={cancelEditEntitlement} className='btn btn-outline-info btn-sm'>Cancel</button>&nbsp;
            <button onClick={saveEntitlementProperty} className='btn btn-outline-info btn-sm'>Save</button>&nbsp;
          </div>
          )} */}
        </div>
        <div className='row'>
          <div className='col-md-4'>
            <div className='m-portlet m-portlet--bordered-semi m-portlet--skin-light  m-portlet--rounded-force'>
              <div className='m-portlet__head'>
                <div className='m-portlet__head-caption'>
                  <div className='m-portlet__head-title'>
                    {/* <h3 className='m-portlet__head-text m--font-light'>
                    Activity
                    </h3> */}
                  </div>
                </div>
              </div>
              <div className='m-portlet__body' style={{'height': '150px'}} >
                <div className='m-widget17'>
                  <div className='m-widget17__visual m-widget17__visual--chart m-portlet-fit--top m-portlet-fit--sides ' style={{'backgroundColor': '#0083C2'}}>
                    <div className='m-widget17__chart'>
                      <div className='chartjs-size-monitor' style={{position: 'absolute', left: 0, top: 0, right: 0, bottom: 0, overflow: 'hidden', visibility: 'hidden', zIndex: -1}}><div className='chartjs-size-monitor-expand' style={{position: 'absolute', left: 0, top: 0, right: 0, bottom: 0, overflow: 'hidden', visibility: 'hidden', zIndex: -1}}>
                        <div style={{position: 'absolute', width: 1000000, height: 1000000, left: 0, top: 0}} /></div>
                        <div className='chartjs-size-monitor-shrink' style={{position: 'absolute', left: 0, top: 0, right: 0, bottom: 0, overflow: 'hidden', visibility: 'hidden', zIndex: -1}}>
                          <div style={{position: 'absolute', width: '200%', height: '200%', left: 0, top: 0}} /></div></div>
                      <canvas id='m_chart_activities' width={509} height={16} className='chartjs-render-monitor' style={{display: 'block', width: 509, height: 50}} />
                    </div>
                  </div>
                  <div className='m-widget17__stats'>
                    <div className='m-widget17__items m-widget17__items-col2'>
                      <div className='m-widget17__item' style={{'marginTop': '-8.87rem'}}>
                        <span className='m-widget17__icon'>
                          <i className='flaticon-file m--font-brand' />
                        </span>
                        <span className='m-widget17__subtitle'>
                          <h3>Purchased&nbsp;&nbsp;</h3>
                          <h5 style={{'float': 'right', 'paddingRight': '25px', 'marginTop': '-35px'}}>{entitlementPurchased}</h5>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='col-md-4'>
            <div className='m-portlet m-portlet--bordered-semi  m-portlet--skin-light  m-portlet--rounded-force'>
              <div className='m-portlet__head'>
                <div className='m-portlet__head-caption'>
                  <div className='m-portlet__head-title'>
                    {/* <h3 className='m-portlet__head-text m--font-light'>
                    Activity
                    </h3> */}
                  </div>
                </div>
              </div>
              <div className='m-portlet__body' style={{'height': '150px'}} >
                <div className='m-widget17'>
                  <div className='m-widget17__visual m-widget17__visual--chart m-portlet-fit--top m-portlet-fit--sides ' style={{'backgroundColor': '#0083C2'}}>
                    <div className='m-widget17__chart'>
                      <div className='chartjs-size-monitor' style={{position: 'absolute', left: 0, top: 0, right: 0, bottom: 0, overflow: 'hidden', visibility: 'hidden', zIndex: -1}}><div className='chartjs-size-monitor-expand' style={{position: 'absolute', left: 0, top: 0, right: 0, bottom: 0, overflow: 'hidden', visibility: 'hidden', zIndex: -1}}>
                        <div style={{position: 'absolute', width: 1000000, height: 1000000, left: 0, top: 0}} /></div>
                        <div className='chartjs-size-monitor-shrink' style={{position: 'absolute', left: 0, top: 0, right: 0, bottom: 0, overflow: 'hidden', visibility: 'hidden', zIndex: -1}}>
                          <div style={{position: 'absolute', width: '200%', height: '200%', left: 0, top: 0}} /></div></div>
                      <canvas id='m_chart_activities' width={509} height={16} className='chartjs-render-monitor' style={{display: 'block', width: 509, height: 50}} />
                    </div>
                  </div>
                  <div className='m-widget17__stats'>
                    <div className='m-widget17__items m-widget17__items-col2'>
                      <div className='m-widget17__item' style={{'marginTop': '-8.87rem'}}>
                        <span className='m-widget17__icon'>
                          <i className='flaticon-file m--font-brand' />
                        </span>
                        <span className='m-widget17__subtitle'>
                          <h3>Consumed&nbsp;&nbsp;</h3>
                          <h5 style={{'float': 'right', 'paddingRight': '25px', 'marginTop': '-35px'}}>{Number(entitlementConsumed).toFixed(2) + '%'}</h5>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='col-md-4'>
            <div className='m-portlet m-portlet--bordered-semi m-portlet--skin-light  m-portlet--rounded-force'>
              <div className='m-portlet__head'>
                <div className='m-portlet__head-caption'>
                  <div className='m-portlet__head-title'>
                    {/* <h3 className='m-portlet__head-text m--font-light'>
                    Activity
                    </h3> */}
                  </div>
                </div>
              </div>
              <div className='m-portlet__body' style={{'height': '150px'}} >
                <div className='m-widget17'>
                  <div className='m-widget17__visual m-widget17__visual--chart m-portlet-fit--top m-portlet-fit--sides ' style={{'backgroundColor': '#0083C2'}}>
                    <div className='m-widget17__chart'>
                      <div className='chartjs-size-monitor' style={{position: 'absolute', left: 0, top: 0, right: 0, bottom: 0, overflow: 'hidden', visibility: 'hidden'}}><div className='chartjs-size-monitor-expand' style={{position: 'absolute', left: 0, top: 0, right: 0, bottom: 0, overflow: 'hidden', visibility: 'hidden', zIndex: -1}}>
                        <div style={{position: 'absolute', width: 1000000, height: 1000000, left: 0, top: 0}} /></div>
                        <div className='chartjs-size-monitor-shrink' style={{position: 'absolute', left: 0, top: 0, right: 0, bottom: 0, overflow: 'hidden', visibility: 'hidden', zIndex: -1}}>
                          <div style={{position: 'absolute', width: '200%', height: '200%', left: 0, top: 0}} /></div></div>
                      <canvas id='m_chart_activities' width={509} height={16} className='chartjs-render-monitor' style={{display: 'block', width: 509, height: 50}} />
                    </div>
                  </div>
                  <div className='m-widget17__stats'>
                    <div className='m-widget17__items m-widget17__items-col2'>
                      <div className='m-widget17__item' style={{'marginTop': '-8.87rem'}}>
                        <span className='m-widget17__icon'>
                          <i className='flaticon-file m--font-brand' />
                        </span>
                        <span className='m-widget17__subtitle'>
                          <h3>Cost&nbsp;&nbsp;</h3>
                          <h5 style={{'float': 'right', 'paddingRight': '25px', 'marginTop': '-35px'}}>R {formatAmount(entitlementCost)}</h5>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* The table structure ends */}
        <div className='row col-sm-12'>
          <div className='col-md-5 m-portlet'>
            <div className={styles.tabsprops}>
              <ul className='nav nav-tabs' role='tablist'>
                <li className='nav-item'>
                  <a className={'nav-link' + showProperties} data-toggle='tab' onClick={showProperty} href='javascript:void(0);'>Properties</a>
                </li>
                <li className='nav-item'>
                  <a className={'nav-link' + showRelationships} data-toggle='tab' onClick={showRelationship} href='javascript:void(0);'>Relationships</a>
                </li>
              </ul>
              <div className='tab-content'>
                <div className={'tab-pane' + showProperties} id='m_tabs_3_1' role='tabpanel'>
                  <table className={'table table-striped- table-bordered table-hover table-checkable dataTable dtr-inline collapsed ' + styles.borderless}>
                    {entitlementPropertiesList}
                  </table>
                </div>
                <div className={'tab-pane' + showRelationships} id='m_tabs_3_2' role='tabpanel'>
                  {/* <div className='row'>
                    <div className='col-6' />
                    <div className='col-6 float-right'>
                      <a href='javascript:void(0);' data-skin='light' data-toggle='m-tooltip' data-placement='top' data-original-title='Add Relationship' onClick={openModal} className='btn btn-info m-btn m-btn--icon btn-sm m-btn--icon-only  m-btn--pill m-btn--air pull-right'>
                        <i className='fa flaticon-add fa-2x' />
                      </a>
                    </div>
                  </div> */}
                  <div className={'row'} style={{'marginTop': '20px'}}>
                    <div className='m--space-10' />
                    <div className='accordion m-accordion m-accordion--bordered' id='m_accordion_2' style={{width: '100%'}} role='tablist' aria-multiselectable='true'>
                      {parentApplicationRelationshipList}
                      {outgoingApplicationRelationshipList}
                      {incomingApplicationRelationshipList}
                      {childApplicationRelationshipList}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='col-md-7'>
            <div className='row'>
              <div id='divPaperWrapper' style={divStyle}>
                <DataModelComponent startNode={startNode} relationships={modelRelationshipData} />
                {/* <DataModelComponent /> */}
              </div>
            </div>
            {/* <img alt='model' src='https://via.placeholder.com/900x545?text=Model%20Visualization' /> */}
          </div>
        </div>
        <div>
          <ReactModal isOpen={props.updateEntitlementSettings.isConfirmationModalOpen}
            style={customStylescrud} >
            {/* <button onClick={closeModal} ><i className='la la-close' /></button> */}
            <div className={styles.modalwidth}>
              <div className='modal-dialog'>
                <div className='modal-content'>
                  <div className='modal-header'>
                    <h4 className='modal-title' id='exampleModalLabel'>Confirmation</h4>
                  </div>
                  <div className='modal-body'>
                    <div className='col-md-12'>
                      {props.validationProperty.length > 0 && (<span>
                        <p className={styles.confirmsg}>Some of the required properties do not have any values.</p>
                        <ul style={{'marginTop': '10px', 'marginLeft': '20px'}}>
                          {validationPropertyList}
                        </ul>
                      </span>)}
                      <p className={styles.confirmsg}>Are you sure you want to continue?</p>
                    </div>
                  </div>
                  <div className='modal-footer'>
                    <div className='row'>
                      <div className='col-md-6'>
                        <div className='btn-group m-btn-group m-btn-group--pill ' role='group' aria-label='...'>
                          <button type='button' onClick={closeConfirmationModal} className='m-btn btn btn-secondary'>Back</button>
                          <button type='button' onClick={submitUpdates} className='m-btn btn btn-secondary'>Submit Updates</button>
                        </div>
                      </div>
                    </div>
                    {/* <button onClick={closeConfirmationModal} className='btn btn-sm btn-outline-info'>Back</button>
                    <button onClick={submitUpdates} className='btn btn-sm btn-outline-info'>Submit Updates</button> */}
                  </div>
                </div>
              </div>
            </div>
          </ReactModal>
          <ReactModal isOpen={props.updateEntitlementSettings.isDeleteModalOpen}
            onRequestClose={closeDeleteModal}
            className=''
            style={customStyles}
            >
            <div className={''}>
              <div className='modal-dialog'>
                <div className='modal-content'>
                  <div className='modal-header'>
                    <h6 className='modal-title' id='exampleModalLabel'>Deleting the {'Entitlement'} {entitlementName}, are you sure?</h6>
                    <button type='button' onClick={closeDeleteModal} className='close' data-dismiss='modal' aria-label='Close'>
                      <span aria-hidden='true'>×</span>
                    </button>
                  </div>
                  {/* <div className='modal-body'>
                    <h6>Deleting the {componentTypeComponentName} {ComponentTypeName} will also delete the following:</h6>
                    <div>
                      <h5>Children Components</h5>
                      {childrenList}
                    </div>
                    <div>
                      <h5>Relationships</h5>
                      {parentComponentRelationshipList}
                      {outgoingComponentRelationshipList}
                      {incomingComponentRelationshipList}
                      {childComponentRelationshipList}
                    </div>
                  </div> */}
                  <div className='modal-footer'>
                    <div className='row'>
                      <div className='col-md-6'>
                        <div className='btn-group m-btn-group m-btn-group--pill ' role='group' aria-label='...'>
                          <button type='button' onClick={closeDeleteModal} className='m-btn btn btn-secondary'>Back</button>
                          <button type='button' onClick={removeEntitlement} className='m-btn btn btn-secondary'>Delete</button>
                        </div>
                      </div>
                    </div>
                    {/* <button type='button' onClick={closeDeleteModal} id='m_login_signup' className={'btn btn-outline-info'}>Back</button>
                    <button type='button' id='m_login_signup' className={'btn btn-outline-info'} onClick={removeEntitlement}>Delete</button> */}
                  </div>
                </div>
              </div>
            </div>
          </ReactModal>
          <ReactModal isOpen={props.addNewConnectionSettings.isModalOpen}
            onRequestClose={closeModal}
            shouldCloseOnOverlayClick={false}
            className='modal-dialog modal-lg'
            style={{'overlay': {zIndex: '1000'}, 'content': {'top': '20%'}}}
            // className={''}
            >
            {/* <button onClick={closeModal} ><i className='la la-close' /></button> */}
            <div>
              <div>
                <div className='modal-content'>
                  <div className='modal-header'>
                    <h4 className='modal-title' id='exampleModalLabel'>{'How is the ' + entitlementName + ' related to other things'}</h4>
                    <button type='button' onClick={closeModal} className='close' data-dismiss='modal' aria-label='Close'>
                      <span aria-hidden='true'>×</span>
                    </button>
                  </div>
                  <div className='modal-body'>
                    <div className='form-group m-form__group row'>
                      <label htmlFor='SelectRelationship' className='col-5 col-form-label'>Choose Relationship Type</label>
                      <div className='col-7'>
                        <Select
                          className='input-sm m-input'
                          placeholder='Choose Relationships Type'
                          isClearable
                          isOptionDisabled={(option) => { return (isParentSelected && option.isParent) }}
                          // defaultValue={childPropertyOption[0]}
                          // isDisabled={false}
                          // isLoading={false}
                          // isClearable={true}
                          value={props.addNewConnectionSettings.firstSelectboxIndex}
                          // clearValue={() => { return true }}
                          onChange={handleFirstSelect}
                          isSearchable={false}
                          name='selectConstraint'
                          options={SelectedData}
                        />
                      </div>
                    </div>
                    {props.addNewConnectionSettings.firstSelectboxSelected === true && !props.addNewConnectionSettings.isWaitingForApiResponse && (
                      <div className='form-group m-form__group row'>
                        <label htmlFor='SelectRelatedComponent' className='col-5 col-form-label'>Choose Select Related Component</label>
                        <div className='col-7'>
                          {/* <select className='form-control m-input' onBlur={handleSecondSelect} >{selectComponentOptions}</select> */}
                          <CreatableSelect
                            isClearable
                            className='input-sm m-input'
                            // name='component-select'
                            // value={props.addNewConnectionSettings.secondSelectboxValue}
                            onChange={handleSecondSelect}
                            onInputChange={handleInputChange}
                            options={selectComponentOptions1}
                            // isOptionDisabled={(option) => option.is_disabled === true}
                          />
                        </div>
                        <div className='m--space-10' />
                      </div>
                    )}
                    {props.addNewConnectionSettings.secondSelectboxSelected === true && !props.addNewConnectionSettings.isNewComponent && (
                      <div className='row'>
                        <p className='col-8'>{props.addNewConnectionSettings.relationshipText + ' ' + props.addNewConnectionSettings.componentText}</p>
                        <div className='col-4'>
                          <button onClick={addRelationShip} className={'btn btn-sm btn-outline-info' + ' '}>Add Relationships</button>
                        </div>
                        <div className='m--space-10' />
                      </div>
                    )}
                    {props.addNewConnectionSettings.secondSelectboxSelected === true && props.addNewConnectionSettings.isNewComponent && (
                      <div className='row'>
                        <p className='col-5'>{props.addNewConnectionSettings.relationshipText + ' '}</p>
                        <input type='text' className='col-4 form-control m-input' onChange={handleNewComponent} value={props.addNewConnectionSettings.newComponentName} placeholder='New Component' aria-describedby='basic-addon2' />
                        <div className='col-3'>
                          <button onClick={addRelationShip} className={'btn btn-sm btn-outline-info' + ' ' + addRelationshipClass}>Add Relationships</button>
                        </div>
                        <div className='m--space-10' />
                      </div>
                    )}
                    <div className='col-md-12'>
                      <div className='m--space-10' />
                      <div className='m--space-10' />
                      <hr size='3' />
                      {props.addNewConnectionSettings.newConnectionArray.length > 0 &&
                        props.addNewConnectionSettings.newConnectionArray.map(function (connection, index) {
                          return (
                            <div className='row'>
                              <p className='col-8'>{connection.display_name}</p>
                              <div className='col-4'>
                                <a href='javscript:void(0);' onClick={() => { removeRelationship(index) }} >remove</a>
                              </div>
                            </div>)
                        })
                      }
                    </div>
                  </div>
                  <div className='modal-footer'>
                    <div className='row'>
                      <div className='col-md-6 '>
                        <div className='btn-group m-btn-group m-btn-group--pill ' role='group' aria-label='...'>
                          <button type='button' onClick={closeModal} className='m-btn btn btn-secondary'>Cancel</button>
                          <button type='button' onClick={addConnections} className={'m-btn btn btn-secondary' + addConnectionClass} >Confirm</button>
                        </div>
                      </div>
                    </div>
                    {/* <button onClick={closeModal} className='btn btn-sm btn-outline-info'>Cancel</button>
                    <button onClick={addConnections} className={'btn btn-sm btn-info ' + addConnectionClass}>Confirm</button> */}
                  </div>
                </div>
              </div>
            </div>
          </ReactModal>
          <ReactModal isOpen={props.relationshipActionSettings.isModalOpen}
            onRequestClose={closeRelationshipActionModal}
            shouldCloseOnOverlayClick={false}
            className=''
            style={customStylescrud}>
            {/* <button onClick={closeModal} ><i className='la la-close' /></button> */}
            <div className={''} id='relationshipPropertyContent'>
              <div className='modal-dialog modal-lg'>
                <div className='modal-content' >
                  <div className='modal-header'>
                    {(props.relationshipActionSettings.actionType === 'edit' || props.relationshipActionSettings.actionType === 'view') && (
                      <h4 className='modal-title' id='exampleModalLabel'>{'Relationship details for ' + props.relationshipActionSettings.relationshipText + ': ' + props.relationshipActionSettings.componentName}</h4>
                    )}
                    {props.relationshipActionSettings.actionType === 'delete' && (
                      <h4 className='modal-title' id='exampleModalLabel'>Deleting Relationship, are you sure?</h4>
                    )}
                    <button type='button' onClick={closeRelationshipActionModal} className='close' data-dismiss='modal' aria-label='Close'>
                      <span aria-hidden='true'>×</span>
                    </button>
                  </div>
                  <div className='modal-body' style={{'height': 'calc(50vh - 65px)', 'overflow': 'auto'}}>
                    {props.relationshipActionSettings.actionType === 'edit' && componentRelationshipPropertiesList !== '' && (
                    <table className={'table ' + styles.borderless}>
                      {componentRelationshipPropertiesList}
                    </table>
                    )}
                    {props.relationshipActionSettings.actionType === 'delete' && (
                    <h4>Are you sure you want to remove the following relationship?</h4>
                    )}
                    {props.relationshipActionSettings.actionType === 'delete' && (
                    <h5 style={{'text-align': 'center'}}>{'' + props.relationshipActionSettings.relationshipText + ': ' + props.relationshipActionSettings.componentName}</h5>
                    )}
                  </div>
                  <div className='modal-footer'>
                    <div className='row'>
                      <div className='col-md-6 '>
                        <div className='btn-group m-btn-group m-btn-group--pill ' role='group' aria-label='...'>
                          <button type='button' onClick={closeRelationshipActionModal} className='m-btn btn btn-secondary'>Cancel</button>
                          {props.relationshipActionSettings.actionType === 'edit' && (<button type='button' onClick={updateRelationshipProperty} className='m-btn btn btn-secondary'>Update</button>)}
                          {props.relationshipActionSettings.actionType === 'delete' && (<button type='button' onClick={removeComponentRelationship} className='m-btn btn btn-secondary'>Delete</button>)}
                        </div>
                      </div>
                    </div>
                    {/* <button onClick={closeRelationshipActionModal} className='btn btn-sm btn-outline-info'>Cancel</button>
                    {props.relationshipActionSettings.actionType === 'edit' && (
                    <button onClick={updateRelationshipProperty} className={'btn btn-sm btn-info '}>Update</button>
                    )}
                    {props.relationshipActionSettings.actionType === 'delete' && (
                    <button onClick={removeComponentRelationship} className={'btn btn-sm btn-info '}>Delete</button>
                    )} */}
                  </div>
                </div>
              </div>
            </div>
          </ReactModal>
          <ReactModal isOpen={props.addSettings.isEditModalOpen}
            onRequestClose={closeEditModal}
            // className='modal-dialog modal-lg'
            style={customStylescrud}
            >
            {/* <button onClick={closeModal} ><i className='la la-close' /></button> */}
            <div className={''}>
              <div className=''>
                <div className='modal-content' >
                  <div className='modal-header'>
                    {props.addSettings.updateResponse === null && (<h4 className='modal-title' id='exampleModalLabel'>Edit Entitlement</h4>)}
                    {props.addSettings.updateResponse !== null && (<h4 className='modal-title' id='exampleModalLabel'>Update Report</h4>)}
                    <button type='button' onClick={closeEditModal} className='close' data-dismiss='modal' aria-label='Close'>
                      <span aria-hidden='true'>×</span>
                    </button>
                  </div>
                  <div className='modal-body' style={{'height': 'calc(70vh - 30px)', 'overflow': 'auto'}}>
                    {props.addSettings.updateResponse === null && (<div className='col-md-12'>
                      {/* {messageBlock} */}
                      <div className='form-group m-form__group row'>
                        <div className='col-8'>
                          {/* <input className='form-control m-input' type='email' placeholder='Enter User Name' ref={input => (userName = input)} id='example-userName-input' /> */}
                        </div>
                      </div>
                      <div className='form-group m-form__group row'>
                        <label htmlFor='example-input' className='col-2 col-form-label'>Name</label>
                        <div className='col-8'>
                          <input className='form-control m-input' value={props.addSettings.name} onChange={editName} placeholder='Enter Name' id='example-email-input' autoComplete='off' />
                        </div>
                      </div>
                      <div className='form-group m-form__group row'>
                        <label htmlFor='example-input' className='col-2 col-form-label'>Description</label>
                        <div className='col-8'>
                          <textarea className='form-control m-input' value={props.addSettings.description} onChange={editDescription} placeholder='Enter Description' />
                        </div>
                      </div>
                      {businessPropertyList}
                      {connectionSelectBoxList}
                    </div>)}
                    {props.addSettings.updateResponse !== null && (<div className='m-list-search__results'>
                      {messageList}
                    </div>)}
                  </div>
                  <div className='modal-footer'>
                    <button type='button' onClick={closeEditModal} className='btn btn-outline-danger btn-sm'>Close</button>
                    {props.addSettings.updateResponse === null && (<button className='btn btn-outline-info btn-sm' onClick={updateSoftware} >Update</button>)}
                  </div>
                </div>
              </div>
            </div>
          </ReactModal>
        </div>
        <Discussion name={entitlementName} type='Component' {...props} />
        <NewDiscussion contextId={contextId} name={entitlementName} type='Component' {...props} />
      </div>
      )
    }
EntitlementDetail.propTypes = {
  match: PropTypes.any,
  entitlement: PropTypes.any,
  entitlementProperties: PropTypes.any,
  entitlementRelationships: PropTypes.any,
  updateEntitlementSettings: PropTypes.any,
  isEditComponent: PropTypes.any,
  entitlementPropertiesPayload: PropTypes.any,
  copiedEntitlementProperties: PropTypes.any,
  copiedEntitlementData: PropTypes.any,
  relationshipPropertyPayload: PropTypes.any,
  relationshipProperty: PropTypes.any,
  relationshipActionSettings: PropTypes.any,
  addNewConnectionSettings: PropTypes.any,
  componentTypeComponentConstraints: PropTypes.any,
  componentTypeComponents: PropTypes.any,
  showTabs: PropTypes.any,
  validationProperty: PropTypes.any,
  addSettings: PropTypes.any,
  connectionData: PropTypes.any
}
