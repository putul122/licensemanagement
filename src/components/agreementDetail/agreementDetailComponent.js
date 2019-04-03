import React from 'react'
import PropTypes from 'prop-types'
import styles from './agreementDetailComponent.scss'
import moment from 'moment'
import _ from 'lodash'
import Select from 'react-select'
// import debounce from 'lodash/debounce'
import CreatableSelect from 'react-select/lib/Creatable'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import Discussion from '../../containers/discussion/discussionContainer'
import NewDiscussion from '../../containers/newDiscussion/newDiscussionContainer'
import ReactModal from 'react-modal'
ReactModal.setAppElement('#root')
const NEWCOMPONENT = '99999'
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
let comparer = function (otherArray) {
  return function (current) {
    return otherArray.filter(function (other) {
      return other.value === current.value && other.display === current.display
    }).length === 0
  }
}
const formatAmount = (x) => {
  let parts = x.toString().split('.')
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
  if (typeof parts[1] !== 'undefined') {
    parts[1] = parts[1].substring(0, 2)
  }
  return parts.join('.')
}

// const GetFormattedDate = () =>{
//   var todayTime = new Date();
//   var month = format(todayTime .getMonth() + 1);
//   var day = format(todayTime .getDate());
//   var year = format(todayTime .getFullYear());
//   return month + "/" + day + "/" + year;
// }

// const options = [
//   { value: 'chocolate', label: 'Chocolate' },
//   { value: 'strawberry', label: 'Strawberry' },
//   { value: 'vanilla', label: 'Vanilla' }
// ]
// Agreement 961 to be used as component type id
export default function AgreementDetail (props) {
  console.log(props)
  console.log(props.selectedNotificationPeriod, props.setUpdateAgreementConditionSettings, props.agreementPurchaseOrders)
  console.log(props.isEditComponent, props.setAddConditionSettings, props.fetchAgreementPurchaseOrderById, props.setPurchaseOrderSettings, props.addConditionActionSettings, props.fetchAgreementConditionById, props.agreementCondition, props.notificationPeriodData, props.selectedDate)
  let agreementEntitlementList = ''
  let agreementPropertiesList = ''
  let agreementConditionsList = ''
  let agreementName = ''
  let agreementDescription = ''
  let expireInDays = ''
  let agreementCost = ''
  let entitlementCount = ''
  let parentComponentRelationshipList
  let outgoingComponentRelationshipList
  let incomingComponentRelationshipList
  let childComponentRelationshipList
  let totalEntitlementPages
  let totalConditionPages
  let totalPurchaseOrderPages
  let perPage = 10
  let currentPage = props.currentPage
  let nextClass = ''
  let previousClass = ''
  let pageArray = []
  let conditionpageArray = []
  let purchaseorderpageArray = []
  let listEntitlementPage = []
  let listConditionPage = []
  let listPurchaseOrderPage = []
  let paginationLimit = 6
  let contextId = props.match.params.id
  let validationPropertyList = ''
  let conditionName = ''
  let conditionDescription = ''
  let conditionNotificationId = ''
  let conditionDueDate = ''
  // let conditionSelectedDueDate = ''
  let conditionNotification = ''
  let periodOptions = ''
  // let DateInputBox
  let ConditionNameInputBox
  let ConditionDescriptionInputBox
  let agreementPurchaseOrderList = ''
  let purchaseOrderName
  let purchaseOrderByIdList
  let purchaseOrderItemList

  let openDiscussionModal = function (event) {
    event.preventDefault()
    props.setDiscussionModalOpenStatus(true)
  }
  // Code for Update Agreement using perspective
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
      return (obj.key === 'Agreement_Update' && obj.role_key === 'Update')
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
      return (<div className='form-group row'>
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
        return (<div className='form-group row'>
          <div className='col-2'><label htmlFor='Category' className='col-form-label'>{data.name}</label></div>
          <div className='col-8 form-group m-form__group has-info'>
            <input type='number' className='input-sm form-control m-input' value={value} onChange={(event) => { editProperty(index, event.target.value) }} placeholder='Enter Here' />
            {false && (<div className='form-control-feedback'>should be Number</div>)}
          </div>
        </div>)
      } else if (data.type_property.property_type.key === 'Decimal') {
        value = data.type_property.float_value
        return (<div className='form-group row'>
          <div className='col-2'><label htmlFor='Category' className='col-form-label'>{data.name}</label></div>
          <div className='col-8 form-group m-form__group has-info'>
            <input type='number' className='input-sm form-control m-input' value={value} onChange={(event) => { editProperty(index, event.target.value) }} placeholder='Enter Here' />
            {false && (<div className='form-control-feedback'>should be Number</div>)}
          </div>
        </div>)
      } else if (data.type_property.property_type.key === 'DateTime') {
        value = data.type_property.date_time_value ? moment(data.type_property.date_time_value).format('DD MMM YYYY') : ''
        return (<div className='form-group row'>
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
        return (<div className='form-group row'>
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
        return (<div className='form-group row'>
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
        return (<div className='form-group row'>
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
  // End of code for Update Agreement using perspective
  // Code for Update Agreement
  let agreementProperties = props.agreementProperties.resources ? [...props.agreementProperties.resources] : ''
  let agreementPropertiesPayload = {...props.agreementPropertiesPayload}
  let copiedAgreementProperties = {...props.copiedAgreementProperties}
  let copiedAgreementData = {...props.copiedAgreementData}
  let agreementData = props.agreement
  let editAgreementName = function (event) {
    console.log('entitlementPropertiesPayload', agreementPropertiesPayload)
    console.log(props)
    let value = event.target.value
    let payload = { 'op': 'replace', 'path': '/name', 'value': value }
    let agreementPayload
    if (value === '') {
      agreementData.resources[0].nameMessage = true
    } else {
      agreementData.resources[0].nameMessage = false
      if (agreementPropertiesPayload.agreement.length === 0) {
        agreementPropertiesPayload.agreement.push(payload)
      } else if (agreementPropertiesPayload.agreement.length === 1) {
        if (agreementPropertiesPayload.agreement[0].path === '/name') {
          agreementPropertiesPayload.agreement[0].value = value
        } else {
          agreementPropertiesPayload.agreement.push(payload)
        }
      } else {
        agreementPayload = agreementPropertiesPayload.agreement.map((payload, index) => {
          if (payload.path === '/name') {
            payload.value = value
            return payload
          } else {
            return payload
          }
        })
        agreementPropertiesPayload.agreement = agreementPayload
      }
    }
    agreementData.resources[0].name = value
    let editPayload = {}
    editPayload.agreement = agreementData
    editPayload.property = {resources: agreementProperties}
    props.editComponentProperties(editPayload)
  }
  let editAgreementDescription = function (event) {
    console.log(props)
    let value = event.target.value
    let payload = { 'op': 'replace', 'path': '/description', 'value': value }
    let agreementPayload
    if (agreementPropertiesPayload.agreement.length === 0) {
      agreementPropertiesPayload.agreement.push(payload)
    } else if (agreementPropertiesPayload.agreement.length === 1) {
      if (agreementPropertiesPayload.agreement[0].path === '/description') {
        agreementPropertiesPayload.agreement[0].value = value
      } else {
        agreementPropertiesPayload.agreement.push(payload)
      }
    } else {
      agreementPayload = agreementPropertiesPayload.agreement.map((payload, index) => {
        if (payload.path === '/description') {
          payload.value = value
          return payload
        } else {
          return payload
        }
      })
      agreementPropertiesPayload.agreement = agreementPayload
    }
    agreementData.resources[0].description = value
    let editPayload = {}
    editPayload.agreement = agreementData
    editPayload.property = {resources: agreementProperties}
    props.editComponentProperties(editPayload)
  }
  let updateAgreementData = function () {
    let payloadAgreementData = JSON.parse(JSON.stringify(props.agreement))
    props.copyAgreementProperties({'resources': JSON.parse(JSON.stringify(agreementProperties))})
    props.copyAgreementData(payloadAgreementData)
    // let addAgreementSettings = {...props.addAgreementSettings, isUpdateModalOpen: true}
    // props.setAddAgreementSettings(addAgreementSettings)
    props.setEditComponentFlag(true)
  }
  let updateAgreementConfirm = function () {
    console.log('props.agreementProperties', props.agreementProperties)
    if (props.agreementProperties && props.agreementProperties !== '') {
      let validationProperty = []
      props.agreementProperties.resources.forEach(function (property, index) {
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
    let addAgreementSettings = {...props.addAgreementSettings, isUpdateModalOpen: false, isConfirmationModalOpen: true}
    props.setAddAgreementSettings(addAgreementSettings)
    props.setEditComponentFlag(true)
  }
  let cancelEditAgreement = function () {
    let payload = {}
    payload.property = JSON.parse(JSON.stringify(copiedAgreementProperties))
    payload.agreement = JSON.parse(JSON.stringify(copiedAgreementData))
    props.restoreAgreementProperties(payload)
    props.setEditComponentFlag(false)
  }
  let closeConfirmationModal = function (event) {
    event.preventDefault()
    let addAgreementSettings = {...props.addAgreementSettings, isConfirmationModalOpen: false}
    props.setAddAgreementSettings(addAgreementSettings)
    // cancelEditAgreement()
  }
  let submitUpdates = function (event) {
    console.log('run submit time detector')
    event.preventDefault()
    props.setEditComponentFlag(false)
    // eslint-disable-next-line
    mApp.blockPage({overlayColor:'#000000',type:'loader',state:'success',message:'Processing...'})
    let payload = {}
    payload.componentId = props.agreement.resources[0].id
    payload.property = agreementPropertiesPayload.property
    payload.agreement = agreementPropertiesPayload.agreement
    props.updateAgreementProperties(payload)
    props.updateAgreement(payload)
    let addAgreementSettings = {...props.addAgreementSettings, isConfirmationModalOpen: false}
    props.setAddAgreementSettings(addAgreementSettings)
  }
  let handlePropertySelect = function (index, childIndex) {
    return function (newValue: any, actionMeta: any) {
      if (actionMeta.action === 'select-option') {
        if (newValue !== null) {
          let payload
          let typeProperty = agreementProperties[index].properties[childIndex].type_property
          agreementProperties[index].properties[childIndex].value_set_value = newValue
          payload = { 'op': 'replace', 'path': `/${typeProperty}/value_set_value`, 'value': {id: newValue.value} }

          if (agreementPropertiesPayload.property.length === 0) {
            agreementPropertiesPayload.property.push(payload)
          } else {
            if (payload.path === agreementPropertiesPayload.property[agreementPropertiesPayload.property.length - 1].path) {
              agreementPropertiesPayload.property[agreementPropertiesPayload.property.length - 1] = payload
            } else {
              agreementPropertiesPayload.property.push(payload)
            }
          }
          let editPayload = {}
          editPayload.agreement = agreementData
          editPayload.property = {resources: agreementProperties}
          props.editComponentProperties(editPayload)
          props.pushComponentPropertyPayload(agreementPropertiesPayload)
        }
      }
      if (actionMeta.action === 'clear') {
        let payload
        let typeProperty = agreementProperties[index].properties[childIndex].type_property
        agreementProperties[index].properties[childIndex].value_set_value = newValue
        payload = { 'op': 'replace', 'path': `/${typeProperty}/value_set_value`, 'value': newValue }

        if (agreementPropertiesPayload.property.length === 0) {
          agreementPropertiesPayload.property.push(payload)
        } else {
          if (payload.path === agreementPropertiesPayload.property[agreementPropertiesPayload.property.length - 1].path) {
            agreementPropertiesPayload.property[agreementPropertiesPayload.property.length - 1] = payload
          } else {
            agreementPropertiesPayload.property.push(payload)
          }
        }
        let editPayload = {}
        editPayload.agreement = agreementData
        editPayload.property = {resources: agreementProperties}
        props.editComponentProperties(editPayload)
        props.pushComponentPropertyPayload(agreementPropertiesPayload)
      }
    }
  }
  let editDateProperty = function (index, childIndex, value) {
    let payload
    let typeProperty = agreementProperties[index].properties[childIndex].type_property
    let selectedDate = value.format('DD MMM YYYY')
    agreementProperties[index].properties[childIndex].date_time_value = value.format('DD MMM YYYY')
    payload = { 'op': 'replace', 'path': `/${typeProperty}/date_time_value`, 'value': selectedDate }
    if (agreementPropertiesPayload.property.length === 0) {
      agreementPropertiesPayload.property.push(payload)
    } else {
      if (payload.path === agreementPropertiesPayload.property[agreementPropertiesPayload.property.length - 1].path) {
        agreementPropertiesPayload.property[agreementPropertiesPayload.property.length - 1] = payload
      } else {
        agreementPropertiesPayload.property.push(payload)
      }
    }
    let editPayload = {}
    editPayload.agreement = agreementData
    editPayload.property = {resources: agreementProperties}
    props.editComponentProperties(editPayload)
    props.pushComponentPropertyPayload(agreementPropertiesPayload)
  }
  let editTextProperty = function (index, childIndex, value) {
    let payload
    let typeProperty = agreementProperties[index].properties[childIndex].type_property
    if (agreementProperties[index].properties[childIndex].property_type.key === 'Boolean') {
      agreementProperties[index].properties[childIndex].boolean_value = value
      payload = { 'op': 'replace', 'path': `/${typeProperty}/boolean_value`, 'value': value }
    } else if (agreementProperties[index].properties[childIndex].property_type.key === 'Integer') {
      agreementProperties[index].properties[childIndex].int_value = value
      payload = { 'op': 'replace', 'path': `/${typeProperty}/int_value`, 'value': value }
    } else if (agreementProperties[index].properties[childIndex].property_type.key === 'Decimal') {
      agreementProperties[index].properties[childIndex].float_value = value
      payload = { 'op': 'replace', 'path': `/${typeProperty}/float_value`, 'value': value }
    } else if (agreementProperties[index].properties[childIndex].property_type.key === 'DateTime') {
      agreementProperties[index].properties[childIndex].date_time_value = value
      payload = { 'op': 'replace', 'path': `/${typeProperty}/date_time_value`, 'value': value }
    } else if (agreementProperties[index].properties[childIndex].property_type.key === 'Text') {
      agreementProperties[index].properties[childIndex].text_value = value
      payload = { 'op': 'replace', 'path': `/${typeProperty}/text_value`, 'value': value }
    } else {
      agreementProperties[index].properties[childIndex].other_value = value
      payload = { 'op': 'replace', 'path': `/${typeProperty}/other_value`, 'value': value }
      agreementProperties[index].properties[childIndex].showMessage = false
    }
    if (agreementPropertiesPayload.property.length === 0) {
      agreementPropertiesPayload.property.push(payload)
    } else {
      if (payload.path === agreementPropertiesPayload.property[agreementPropertiesPayload.property.length - 1].path) {
        agreementPropertiesPayload.property[agreementPropertiesPayload.property.length - 1] = payload
      } else {
        agreementPropertiesPayload.property.push(payload)
      }
    }
    let editPayload = {}
    editPayload.agreement = agreementData
    editPayload.property = {resources: agreementProperties}
    props.editComponentProperties(editPayload)
    props.pushComponentPropertyPayload(agreementPropertiesPayload)
  }
  // End of code for Update Agreement
  // Code for delete agreement
  let deleteAgreement = function () {
    let addAgreementSettings = {...props.addAgreementSettings, isDeleteModalOpen: true}
    props.setAddAgreementSettings(addAgreementSettings)
  }
  let removeAgreement = function () {
    let payload = {
      'id': props.agreement.resources[0].id
    }
    // eslint-disable-next-line
    mApp.blockPage({overlayColor:'#000000',type:'loader',state:'success',message:'Processing...'})
    props.deleteAgreement(payload)
    closeDeleteModal()
  }
  let closeDeleteModal = function () {
    let addAgreementSettings = {...props.addAgreementSettings, isDeleteModalOpen: false}
    props.setAddAgreementSettings(addAgreementSettings)
  }
  // End code for delete agreement
  // --------------------------------------
  // Code For Update Connection
  let componentRelationshipPropertiesList = ''
  let relationshipPropertyPayload = props.relationshipPropertyPayload
  console.log('props.relationshipProperty', props.relationshipProperty)
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
    payload.componentId = props.agreement.resources[0].id
    payload.relationshipId = props.relationshipActionSettings.relationshipId
    payload.payloadData = relationshipPropertyPayload
    props.updateRelationshipProperty(payload)
  }
  if (props.relationshipProperty !== '') {
    componentRelationshipPropertiesList = componentRelationshipProperties.map(function (property, index) {
      let propertyProperties = property.properties
      let childProperties = propertyProperties.map(function (childProperty, childIndex) {
        let value
        let htmlElement
        let requiredProperty = false
        if (childProperty.optionality.key === 'Required') {
          requiredProperty = true
        }
        if (childProperty.property_type.key === 'Integer') {
          value = childProperty.int_value
          htmlElement = function () {
            return (<div className='col-8 form-group m-form__group has-info'>
              <input type='number' className='input-sm form-control m-input' value={value} onChange={(event) => { editTextRelationshipProperty(index, childIndex, event.target.value) }} placeholder='Enter Here' />
              {false && (<div className='form-control-feedback'>should be Number</div>)}
            </div>)
          }
        } else if (childProperty.property_type.key === 'Decimal') {
          value = childProperty.float_value
          htmlElement = function () {
            return (<div className='col-8 form-group m-form__group has-info'>
              <input type='number' className='input-sm form-control m-input' value={value} onChange={(event) => { editTextRelationshipProperty(index, childIndex, event.target.value) }} placeholder='Enter Here' />
              {false && (<div className='form-control-feedback'>should be Number</div>)}
            </div>)
          }
        } else if (childProperty.property_type.key === 'DateTime') {
          // value = childProperty.date_time_value
          value = childProperty.date_time_value ? moment(childProperty.date_time_value).format('DD MMM YYYY') : ''
          htmlElement = function () {
            return (<div className='col-8 form-group m-form__group has-info'>
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
            return (<div className='col-8 form-group m-form__group has-info'>
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
              className='col-7 input-sm m-input'
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
    payload.componentId = props.agreement.resources[0].id
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
  if (props.agreement && props.agreement !== '') {
    agreementName = props.agreement.resources[0].name
    agreementDescription = props.agreement.resources[0].description
    expireInDays = props.agreement.resources[0].expire_in_days
    agreementCost = props.agreement.resources[0].cost
    entitlementCount = props.agreement.resources[0].entitlement_count
  }
  if (props.agreementProperties && props.agreementProperties !== '') {
    agreementPropertiesList = props.agreementProperties.resources.map(function (property, index) {
      let propertyProperties = property.properties
      let childProperties = propertyProperties.map(function (childProperty, childIndex) {
        let value
        let htmlElement
        let requiredProperty = false
        if (childProperty.optionality.key === 'Required') {
          requiredProperty = true
        }
        if (childProperty.property_type.key === 'Integer') {
          value = childProperty.int_value || ''
          htmlElement = function () {
            return (<div className='form-group m-form__group has-info'>
              <input type='number' className='input-sm form-control m-input' value={value} onChange={(event) => { editTextProperty(index, childIndex, event.target.value) }} placeholder='Enter Here' />
              {false && (<div className='form-control-feedback'>should be Number</div>)}
            </div>)
          }
        } else if (childProperty.property_type.key === 'Decimal') {
          value = childProperty.float_value || ''
          htmlElement = function () {
            return (<div className='form-group m-form__group has-info'>
              <input type='number' className='input-sm form-control m-input' value={value} onChange={(event) => { editTextProperty(index, childIndex, event.target.value) }} placeholder='Enter Here' />
              {false && (<div className='form-control-feedback'>should be Number</div>)}
            </div>)
          }
        } else if (childProperty.property_type.key === 'DateTime') {
          value = childProperty.date_time_value ? moment(childProperty.date_time_value).format('DD MMM YYYY') : ''
          htmlElement = function () {
            return (<div className='form-group m-form__group has-info'>
              <DatePicker
                className='input-sm form-control m-input'
                selected={childProperty.date_time_value ? moment(childProperty.date_time_value) : ''}
                dateFormat='DD MMM YYYY'
                onSelect={(date) => { editDateProperty(index, childIndex, date) }}
                />
              {/* <input type='text' className='input-sm form-control m-input' value={value} onChange={(event) => { editTextProperty(index, childIndex, event.target.value) }} placeholder='Enter Here' /> */}
              {false && (<div className='form-control-feedback'>should be Date</div>)}
            </div>)
          }
        } else if (childProperty.property_type.key === 'Text') {
          value = childProperty.text_value || ''
          htmlElement = function () {
            return (<div className='form-group m-form__group has-info'>
              <input type='text' className='input-sm form-control m-input' value={value} onChange={(event) => { editTextProperty(index, childIndex, event.target.value) }} placeholder='Enter Here' />
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
            return (<div className='form-group has-info'><Select
              className='input-sm m-input'
              placeholder='Select Options'
              isClearable
              defaultValue={dvalue}
              onChange={handlePropertySelect(index, childIndex)}
              isSearchable={false}
              name={'selectProperty'}
              options={childPropertyOption}
            /></div>)
          }
        } else {
          value = childProperty.other_value || ''
          htmlElement = function () {
            return (<div className='form-group m-form__group has-info'>
              <input type='text' className='input-sm form-control m-input' value={value} onChange={(event) => { editTextProperty(index, childIndex, event.target.value) }} placeholder='Enter Here' />
              {false && (<div className='form-control-feedback'>should be Text</div>)}
            </div>)
          }
        }
        return (
          <tr key={'child' + childIndex}>
            <td><span className={styles.labelbold}>{childProperty.name}</span>{requiredProperty && props.isEditComponent && (<span style={{'fontSize': '20px'}} className='text-danger' >*</span>)}</td>
            <td>
              {!props.isEditComponent && (<span>{value}</span>)}
              {props.isEditComponent && htmlElement()}
            </td>
          </tr>
        )
      })
      return (
        <tbody key={index} className={'col-6'}>
          <tr>
            <td><span className={styles.title}>Type</span></td>
            <td><span className={styles.labelbold}>{property.name}</span></td>
          </tr>
          {childProperties}
        </tbody>
      )
    })
  } else {
    console.log('else')
  }
  let listEntitlement = function () {
    if (props.agreementEntitlements !== '') {
      if (props.agreementEntitlements.resources.length > 0) {
        agreementEntitlementList = props.agreementEntitlements.resources.slice(perPage * (currentPage - 1), ((currentPage - 1) + 1) * perPage).map(function (data, index) {
          return (
            <tr key={index}>
              <td><a href={'/entitlements/' + data.id}>{data.name}</a></td>
              <td>{data.part_number}</td>
              <td className={(data.purchased < data.consumed) ? styles.danger : styles.success}>{data.purchased}</td>
              <td>{data.consumed}</td>
              <td>{data.reserved}</td>
              <td>{data.bu_allocated}</td>
              <td>{'R ' + formatAmount(data.cost)}</td>
            </tr>
          )
        })
      } else {
        agreementEntitlementList = []
        agreementEntitlementList.push((
          <tr key={0}>
            <td colSpan='7'>{'No data to display'}</td>
          </tr>
        ))
      }
    }
  }
  if (props.agreementEntitlements && props.agreementEntitlements !== '') {
    totalEntitlementPages = Math.ceil(props.agreementEntitlements.count / perPage)
    let i = 1
    while (i <= totalEntitlementPages) {
      let pageParameter = {}
      pageParameter.number = i
      pageParameter.class = ''
      pageArray.push(pageParameter)
      i++
    }
    pageArray = _.chunk(pageArray, paginationLimit)
    listEntitlementPage = _.filter(pageArray, function (group) {
      let found = _.filter(group, {'number': currentPage})
      if (found.length > 0) { return group }
    })
    if (currentPage === 1) {
      previousClass = 'm-datatable__pager-link--disabled'
    }
    if (currentPage === totalEntitlementPages) {
      nextClass = 'm-datatable__pager-link--disabled'
    }
    listEntitlement()
  }
  let handleListAndPagination = function (page) {
    listEntitlement()
    props.setCurrentPage(page)
    listEntitlementPage = _.filter(pageArray, function (group) {
      let found = _.filter(group, {'number': page})
      if (found.length > 0) { return group }
    })
  }
  let handlePage = function (page) {
    if (page === 1) {
      previousClass = 'm-datatable__pager-link--disabled'
    } else if (page === totalEntitlementPages) {
      nextClass = 'm-datatable__pager-link--disabled'
    }
    handleListAndPagination(page)
  }

  let handlePrevious = function (event) {
    event.preventDefault()
    if (currentPage === 1) {
      previousClass = 'm-datatable__pager-link--disabled'
    } else {
      props.setCurrentPage(currentPage - 1)
      handleListAndPagination(currentPage - 1)
    }
  }

  let handleNext = function (event) {
    event.preventDefault()
    if (currentPage === totalEntitlementPages) {
      nextClass = 'm-datatable__pager-link--disabled'
    } else {
      props.setCurrentPage(currentPage + 1)
      handleListAndPagination(currentPage + 1)
    }
  }
  if (props.agreementRelationships && props.agreementRelationships !== '') {
    // modelRelationshipData = props.agreementRelationships.resources
    let parent = _.filter(props.agreementRelationships.resources, {'relationship_type': 'Parent'})
    let outgoing = _.filter(props.agreementRelationships.resources, {'relationship_type': 'ConnectFrom'})
    outgoing = _.orderBy(outgoing, ['connection.name', 'target_component.name'], ['asc', 'asc'])
    let incoming = _.filter(props.agreementRelationships.resources, {'relationship_type': 'ConnectTo'})
    incoming = _.orderBy(incoming, ['connection.name', 'target_component.name'], ['asc', 'asc'])
    let child = _.filter(props.agreementRelationships.resources, {'relationship_type': 'Child'})
    let parentComponentRelationshipListFn = function () {
      if (parent.length > 0) {
        let childElementList = parent.map(function (element, i) {
        let relationshipActionSettings = {...props.relationshipActionSettings}
        relationshipActionSettings.relationshipText = parent[0].component.name + ' ' + parent[0].relationship_type + ' Components'
        relationshipActionSettings.relationshipId = element.target_component.id
        return (<span className='row' style={{'padding': '5px'}}>
          <div className='col-md-10'><a href='javascript:void(0);'>{element.target_component.name}</a></div>
          <div className='dropdown pull-right col-md-2'>
            <button className='m-portlet__nav-link m-dropdown__toggle btn btn-secondary m-btn m-btn--icon m-btn--pill' data-toggle='dropdown' data-hover='dropdown' aria-haspopup='true' aria-expanded='false'><i className='la la-ellipsis-h' /></button>
            <div className={styles.dropmenu}>
              <ul className='dropdown-menu'>
                <li><a href='javascript:void(0);'><h6>Relationships Action</h6></a></li>
                <li><a href='javascript:void(0);' onClick={(event) => { relationshipActionSettings.isModalOpen = true; relationshipActionSettings.actionType = 'edit'; relationshipActionSettings.componentName = element.target_component.name; relationshipActionSettings.selectedObject = element; props.setRelationshipActionSettings(relationshipActionSettings) }} >Edit</a></li>
                <li><a href='javascript:void(0);' onClick={(event) => { relationshipActionSettings.isModalOpen = true; relationshipActionSettings.actionType = 'delete'; relationshipActionSettings.componentName = element.target_component.name; relationshipActionSettings.selectedObject = element; props.setRelationshipActionSettings(relationshipActionSettings) }} >Delete</a></li>
              </ul>
            </div>
          </div>
          <br />
        </span>)
      })
      return (
        <div className='m-accordion__item' style={{'overflow': 'visible'}}>
          <div className='m-accordion__item-head collapsed' role='tab' id='m_accordion_2_item_1_head' data-toggle='collapse' href={'#m_accordion_2_item_1_body' + parent[0].relationship_type} aria-expanded='true'>
            <span className='m-accordion__item-title'>{parent[0].component.name} {'is Child of'} {parent[0].target_component.component_type.name}</span>
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
    let childComponentRelationshipListFn = function () {
      if (child.length > 0) {
        let childElementList = child.map(function (element, i) {
        let relationshipActionSettings = {...props.relationshipActionSettings}
        relationshipActionSettings.relationshipText = child[0].component.name + ' ' + child[0].relationship_type + ' Components'
        relationshipActionSettings.relationshipId = element.target_component.id
        return (<span className='row' style={{'padding': '5px'}}>
          <div className='col-md-10'><a href='javascript:void(0);'>{element.target_component.name}</a></div>
          <div className='dropdown pull-right col-md-2'>
            <button className='m-portlet__nav-link m-dropdown__toggle btn btn-secondary m-btn m-btn--icon m-btn--pill' data-toggle='dropdown' data-hover='dropdown' aria-haspopup='true' aria-expanded='false'><i className='la la-ellipsis-h' /></button>
            <div className={styles.dropmenu}>
              <ul className='dropdown-menu'>
                <li><a href='javascript:void(0);'><h6>Relationships Action</h6></a></li>
                <li><a href='javascript:void(0);' onClick={(event) => { relationshipActionSettings.isModalOpen = true; relationshipActionSettings.actionType = 'edit'; relationshipActionSettings.componentName = element.target_component.name; relationshipActionSettings.selectedObject = element; props.setRelationshipActionSettings(relationshipActionSettings) }} >Edit</a></li>
                <li><a href='javascript:void(0);' onClick={(event) => { relationshipActionSettings.isModalOpen = true; relationshipActionSettings.actionType = 'delete'; relationshipActionSettings.componentName = element.target_component.name; relationshipActionSettings.selectedObject = element; props.setRelationshipActionSettings(relationshipActionSettings) }} >Delete</a></li>
              </ul>
            </div>
          </div>
          <br />
        </span>)
      })
      return (
        <div className='m-accordion__item' style={{'overflow': 'visible'}}>
          <div className='m-accordion__item-head collapsed' role='tab' id='m_accordion_2_item_1_head' data-toggle='collapse' href={'#m_accordion_2_item_1_body' + child[0].relationship_type} aria-expanded='true'>
            <span className='m-accordion__item-title'>{child[0].component.name} {'is Parent of'} {child[0].target_component.component_type.name}</span>
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
    let outgoingComponentRelationshipListFn = function () {
      if (outgoing.length > 0) {
        console.log('outgoing', outgoing)
        let outgoingElements = []
        var outgoingGroup = _.chain(outgoing)
        .groupBy('connection.name')
        .mapValues(connectionTypeGroup => _.groupBy(connectionTypeGroup, targetComponentTypeGroup => targetComponentTypeGroup.target_component.component_type.name))
        .value()
        let outerKey = 0
        console.log('outgoingGroup', outgoingGroup)
        for (let connectionKey in outgoingGroup) {
          console.log('connectionKey', connectionKey)
          if (outgoingGroup.hasOwnProperty(connectionKey)) {
            outerKey++
            let innerKey = 0
            for (let targetComponentTypeKey in outgoingGroup[connectionKey]) {
              if (outgoingGroup[connectionKey].hasOwnProperty(targetComponentTypeKey)) {
                innerKey++
                let relationshipActionSettings = {...props.relationshipActionSettings}
                relationshipActionSettings.relationshipText = outgoingGroup[connectionKey][targetComponentTypeKey][0].component.name + ' ' + connectionKey + ' ' + targetComponentTypeKey
                relationshipActionSettings.relationshipId = outgoingGroup[connectionKey][targetComponentTypeKey][0].connection.id
                let childElementList = outgoingGroup[connectionKey][targetComponentTypeKey].map(function (element, i) {
                  return (<span className='row' style={{'padding': '5px'}}>
                    <div className='col-md-10'><a href='javascript:void(0);'>{element.target_component.name}</a></div>
                    <div className='dropdown pull-right col-md-2'>
                      <button className='m-portlet__nav-link m-dropdown__toggle btn btn-secondary m-btn m-btn--icon m-btn--pill' data-toggle='dropdown' data-hover='dropdown' aria-haspopup='true' aria-expanded='false'><i className='la la-ellipsis-h' /></button>
                      <div className={styles.dropmenu}>
                        <ul className='dropdown-menu'>
                          <li><a href='javascript:void(0);'><h6>Relationships Action</h6></a></li>
                          <li><a href='javascript:void(0);' onClick={(event) => { relationshipActionSettings.isModalOpen = true; relationshipActionSettings.actionType = 'edit'; relationshipActionSettings.componentName = element.target_component.name; relationshipActionSettings.selectedObject = element; props.setRelationshipActionSettings(relationshipActionSettings) }}>Edit</a></li>
                          <li><a href='javascript:void(0);' onClick={(event) => { relationshipActionSettings.isModalOpen = true; relationshipActionSettings.actionType = 'delete'; relationshipActionSettings.componentName = element.target_component.name; relationshipActionSettings.selectedObject = element; props.setRelationshipActionSettings(relationshipActionSettings) }}>Delete</a></li>
                        </ul>
                      </div>
                    </div>
                    <br />
                  </span>)
                })
                // let cleanKey = targetComponentTypeKey.replace(/ /g, '')
                outgoingElements.push(
                  <div className='m-accordion__item' style={{'overflow': 'visible'}}>
                    <div className='m-accordion__item-head collapsed' role='tab' id='m_accordion_2_item_1_head' data-toggle='collapse' href={'#outgoing_accordion_body' + outerKey + '-' + innerKey} aria-expanded='false'>
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
    let incomingComponentRelationshipListFn = function () {
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
                let relationshipActionSettings = {...props.relationshipActionSettings}
                relationshipActionSettings.relationshipText = targetComponentTypeKey + ' ' + connectionKey + ' ' + incomingGroup[connectionKey][targetComponentTypeKey][0].component.name
                relationshipActionSettings.relationshipId = incomingGroup[connectionKey][targetComponentTypeKey][0].connection.id
                let childElementList = incomingGroup[connectionKey][targetComponentTypeKey].map(function (element, i) {
                  return (<span className='row' style={{'padding': '5px'}}>
                    <div className='col-md-10'><a href='javascript:void(0);'>{element.target_component.name}</a></div>
                    <div className='dropdown pull-right col-md-2'>
                      <button className='m-portlet__nav-link m-dropdown__toggle btn btn-secondary m-btn m-btn--icon m-btn--pill' data-toggle='dropdown' data-hover='dropdown' aria-haspopup='true' aria-expanded='false'><i className='la la-ellipsis-h' /></button>
                      <div className={styles.dropmenu}>
                        <ul className='dropdown-menu'>
                          <li><a href='javascript:void(0);'><h6>Relationships Action</h6></a></li>
                          <li><a href='javascript:void(0);' onClick={(event) => { relationshipActionSettings.isModalOpen = true; relationshipActionSettings.actionType = 'edit'; relationshipActionSettings.componentName = element.target_component.name; relationshipActionSettings.selectedObject = element; props.setRelationshipActionSettings(relationshipActionSettings) }}>Edit</a></li>
                          <li><a href='javascript:void(0);' onClick={(event) => { relationshipActionSettings.isModalOpen = true; relationshipActionSettings.actionType = 'delete'; relationshipActionSettings.componentName = element.target_component.name; relationshipActionSettings.selectedObject = element; props.setRelationshipActionSettings(relationshipActionSettings) }}>Delete</a></li>
                        </ul>
                      </div>
                    </div>
                    <br />
                  </span>)
                })
                // let cleanKey = targetComponentTypeKey.replace(/ /g, '')
                incomingElements.push(
                  <div className='m-accordion__item' style={{'overflow': 'visible'}}>
                    <div className='m-accordion__item-head collapsed' role='tab' id='m_accordion_2_item_1_head' data-toggle='collapse' href={'#incoming_accordion_body' + outerKey + '-' + innerKey} aria-expanded='true'>
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

    parentComponentRelationshipList = parentComponentRelationshipListFn()
    outgoingComponentRelationshipList = outgoingComponentRelationshipListFn()
    incomingComponentRelationshipList = incomingComponentRelationshipListFn()
    childComponentRelationshipList = childComponentRelationshipListFn()
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
          data.display_name = agreementName + ' is Child of ' + constraint.target_component_type.name
          data.isParent = true
        } else if (constraint.constraint_type === 'Child') {
          // data.display_name = props.componentTypeComponentData.resources[0].name + ' ' + constraint.constraint_type + ' Components'
          data.display_name = agreementName + ' is Parent of ' + constraint.target_component_type.name
          data.isParent = false
        } else if (constraint.constraint_type === 'ConnectFrom') {
          data.display_name = agreementName + ' ' + constraint.connection_type.name + ' ' + constraint.target_component_type.name
          data.isParent = false
        } else if (constraint.constraint_type === 'ConnectTo') {
          data.display_name = constraint.target_component_type.name + ' ' + constraint.connection_type.name + ' ' + agreementName
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
  let openModal = function (event) {
    // event.preventDefault()
    let parent = _.filter(props.agreementRelationships.resources, {'relationship_type': 'Parent'})
    let isParentSelected = parent.length > 0
    let payload = {...props.addNewConnectionSettings, 'isModalOpen': true, 'firstSelectboxSelected': false, 'firstSelectboxIndex': null, 'isParentSelected': isParentSelected, 'secondSelectboxSelected': false, 'showCreateConnectionButton': false, 'slectedConstraintObject': {}, 'relationshipText': '', 'newConnectionArray': []}
    props.setAddConnectionSettings(payload)
    agreementPropertiesPayload.relationship = []
    props.pushComponentPropertyPayload(agreementPropertiesPayload)
  }
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
    component.name = props.agreement.resources[0].name
    component.id = props.agreement.resources[0].id
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
    agreementPropertiesPayload.relationship.push(payload)
    props.pushComponentPropertyPayload(agreementPropertiesPayload)
  }
  let addConnections = function () {
    // comment this below line when actual api work in correct response
    // props.setRelationshipsValue({'resources': newRelationshipArray})
    // eslint-disable-next-line
    mApp.blockPage({overlayColor:'#000000',type:'loader',state:'success',message:'Processing...'})
    let payload = {}
    payload.componentId = props.agreement.resources[0].id
    payload.relationship = agreementPropertiesPayload.relationship
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
      agreementPropertiesPayload.relationship = payload
      props.pushComponentPropertyPayload(agreementPropertiesPayload)
    } else {
      agreementPropertiesPayload.relationship = []
      props.pushComponentPropertyPayload(agreementPropertiesPayload)
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
  if (props.validationProperty.length > 0) {
    validationPropertyList = props.validationProperty.map(function (data, index) {
      return (<li>{data}</li>)
    })
  }
  // Code for Conditions tab begins here
  let openAddConditionModal = function (event) {
   event.preventDefault()
   let addConditionActionSettings = {...props.addConditionActionSettings, 'isAddConditionModalOpen': true}
   props.setAddConditionSettings(addConditionActionSettings)
  }
  let openUpdateConditionModal = function (data) {
    console.log(data)
    let payload = {
      'agreement_id': props.match.params.id,
      'condition_id': data.id
    }
    props.fetchAgreementConditionById(payload)
    let addConditionActionSettings = {...props.addConditionActionSettings, 'isUpdateConditionModalOpen': true, 'conditionData': data, 'isEditFlag': true}
    props.setAddConditionSettings(addConditionActionSettings)
    console.log('*******', props.addConditionActionSettings)
    let updateAgreementConditionSettings = {...props.updateAgreementConditionSettings, 'notificationPeriod': data}
    props.setUpdateAgreementConditionSettings(updateAgreementConditionSettings)
  }
  let openDeleteConditionModal = function (data) {
    let addConditionActionSettings = {...props.addConditionActionSettings, 'isDeleteConditionModalOpen': true, 'conditionData': data}
    props.setAddConditionSettings(addConditionActionSettings)
  }
  let openViewConditionModal = function (data) {
    console.log('Data fr condition', data)
    let addConditionActionSettings = {...props.addConditionActionSettings, 'isViewConditionModalOpen': true, 'conditionData': data}
    props.setAddConditionSettings(addConditionActionSettings)
    let payload = {
      'agreement_id': props.match.params.id,
      'condition_id': data.id
    }
    props.fetchAgreementConditionById(payload)
  }
  let openPurchaseOrderModal = function (data) {
    console.log('Data fr condition', data)
    let agreementPurchaseOrderActionSettings = {...props.agreementPurchaseOrderActionSettings, 'isPoModalOpen': true, 'purchaseOrderData': data}
    props.setPurchaseOrderSettings(agreementPurchaseOrderActionSettings)
    let payload = {
      'agreement_id': props.match.params.id,
      'purchase_order_id': data.id
    }
    props.fetchAgreementPurchaseOrderById(payload)
  }
  let closeAddConditionModal = function () {
    let addConditionActionSettings = {...props.addConditionActionSettings, 'isAddConditionModalOpen': false}
    props.setAddConditionSettings(addConditionActionSettings)
   }
  let closeUpdateConditionModal = function () {
    let addConditionActionSettings = {...props.addConditionActionSettings, 'isUpdateConditionModalOpen': false}
    props.setAddConditionSettings(addConditionActionSettings)
   }
  let closeDeleteConditionModal = function () {
    let addConditionActionSettings = {...props.addConditionActionSettings, 'isDeleteConditionModalOpen': false, 'conditionData': null}
    props.setAddConditionSettings(addConditionActionSettings)
   }
  let closeViewConditionModal = function () {
    let addConditionActionSettings = {...props.addConditionActionSettings, 'isViewConditionModalOpen': false}
    props.setAddConditionSettings(addConditionActionSettings)
   }
  let closePurchaseOrderModal = function () {
    let agreementPurchaseOrderActionSettings = {...props.agreementPurchaseOrderActionSettings, 'isPoModalOpen': false}
    props.setPurchaseOrderSettings(agreementPurchaseOrderActionSettings)
   }
  // Code for Conditions tab ends here

  // Code for Condition Listing begins
  let listCondition = function () {
    if (props.agreementConditions !== '') {
      if (props.agreementConditions.resources.length > 0) {
        agreementConditionsList = props.agreementConditions.resources.slice(perPage * (currentPage - 1), ((currentPage - 1) + 1) * perPage).map(function (data, index) {
          return (
            <tr key={index}>
              <td><a href={'javascript:void(0)' + data.id} onClick={(event) => { event.preventDefault(); openViewConditionModal(data) }}>{data.name}</a></td>
              <td>{moment(data.due_date).format('DD MMM YYYY')}</td>
              <td>
                <div className='m-btn-group m-btn-group--pill btn-group' role='group' aria-label='First group'>
                  <button type='button' onClick={(event) => { event.preventDefault(); openUpdateConditionModal(data) }} className='m-btn btn btn-info'><i className='fa flaticon-edit-1' /></button>
                  <button type='button' onClick={(event) => { event.preventDefault(); openDeleteConditionModal(data) }} className='m-btn btn btn-danger'><i className='fa flaticon-delete-1' /></button>
                </div>
              </td>
            </tr>
          )
        })
      } else {
        agreementConditionsList = []
        agreementConditionsList.push((
          <tr key={0}>
            <td colSpan='7'>{'No data to display'}</td>
          </tr>
        ))
      }
    }
  }
  if (props.agreementConditions && props.agreementConditions !== '') {
    totalConditionPages = Math.ceil(props.agreementConditions.count / perPage)
    let i = 1
    while (i <= totalConditionPages) {
      let pageParameter = {}
      pageParameter.number = i
      pageParameter.class = ''
      conditionpageArray.push(pageParameter)
      i++
    }
    conditionpageArray = _.chunk(conditionpageArray, paginationLimit)
    console.log('***', conditionpageArray)
    listConditionPage = _.filter(conditionpageArray, function (group) {
      let found = _.filter(group, {'number': currentPage})
      if (found.length > 0) { return group }
    })
    if (currentPage === 1) {
      previousClass = 'm-datatable__pager-link--disabled'
    }
    if (currentPage === totalConditionPages) {
      nextClass = 'm-datatable__pager-link--disabled'
    }
    listCondition()
  }
  let handleListAndPaginationForCondition = function (page) {
    listCondition()
    props.setCurrentPage(page)
    listConditionPage = _.filter(conditionpageArray, function (group) {
      let found = _.filter(group, {'number': page})
      if (found.length > 0) { return group }
    })
  }
  let handleConditionPage = function (page) {
    if (page === 1) {
      previousClass = 'm-datatable__pager-link--disabled'
    } else if (page === totalEntitlementPages) {
      nextClass = 'm-datatable__pager-link--disabled'
    }
    handleListAndPaginationForCondition(page)
  }

  let handleConditionPrevious = function (event) {
    event.preventDefault()
    if (currentPage === 1) {
      previousClass = 'm-datatable__pager-link--disabled'
    } else {
      props.setCurrentPage(currentPage - 1)
      handleListAndPaginationForCondition(currentPage - 1)
    }
  }

  let handleConditionNext = function (event) {
    event.preventDefault()
    if (currentPage === totalConditionPages) {
      nextClass = 'm-datatable__pager-link--disabled'
    } else {
      props.setCurrentPage(currentPage + 1)
      handleListAndPaginationForCondition(currentPage + 1)
    }
  }
if (props.notificationPeriodData && props.notificationPeriodData !== '') {
  periodOptions = props.notificationPeriodData.map(function (data, index) {
    data.label = data.name
    return data
  })
}
if (props.agreementCondition && props.agreementCondition !== '' && props.agreementCondition.error_code === null) {
  // let updateAgreementConditionSettings = {...props.updateAgreementConditionSettings}
  conditionName = props.agreementCondition.resources[0].name
  conditionDescription = props.agreementCondition.resources[0].description
  conditionDueDate = props.agreementCondition.resources[0].due_date
  conditionNotification = props.agreementCondition.resources[0].notification_period
  conditionNotificationId = props.agreementCondition.resources[0].notification_period_id || ''
  let typeObject
  if (conditionNotificationId !== '') {
   let typeObject = _.find(periodOptions, function (obj) {
      return obj.id === conditionNotificationId
    })
    console.log('typeObject', typeObject)
  }
  props.updateAgreementConditionSettings.notificationPeriod = typeObject
  props.setUpdateAgreementConditionSettings(props.updateAgreementConditionSettings)
}

let handleNotificationPeriodSelect = function (newValue: any, actionMeta: any) {
  console.group('Value Changed first select')
  console.log(newValue)
  console.log(`action: ${actionMeta.action}`)
  console.groupEnd()
  if (actionMeta.action === 'select-option') {
    let addConditionActionSettings = {...props.addConditionActionSettings, 'notificationPeriodSelected': newValue}
    props.setAddConditionSettings(addConditionActionSettings)
  }
  if (actionMeta.action === 'clear') {
    let addConditionActionSettings = {...props.addConditionActionSettings, 'notificationPeriodSelected': null}
    props.setAddConditionSettings(addConditionActionSettings)
  }
}
let handleDateSelect = function (value) {
  let startDate = value.format('DD MMM YYYY')
  console.log(startDate)
  props.setStartDate(startDate)
  console.log(startDate)
}
let addAgreementCondition = function (event) {
    // eslint-disable-next-line
    mApp.blockPage({overlayColor:'#000000',type:'loader',state:'success',message:'Processing...'})
    event.preventDefault()
    let dataPayload = []
    let obj = {}
    obj.op = 'add'
    obj.path = '/-'
    obj.value = {
      due_date: props.startDate,
      notification_period_id: props.addConditionActionSettings.notificationPeriodSelected.id,
      name: ConditionNameInputBox.value,
      description: ConditionDescriptionInputBox.value
    }
    dataPayload.push(obj)
    let agreementId = props.match.params.id
    let payload = {}
    payload.agreementId = agreementId
    payload.data = dataPayload
    console.log('payload', payload)
    props.addAgreementCondition(payload)
    closeAddConditionModal()
}
let deleteAgreementCondition = function (event) {
  // eslint-disable-next-line
  mApp.blockPage({overlayColor:'#000000',type:'loader',state:'success',message:'Processing...'})
  event.preventDefault()
  let dataPayload = []
  let obj = {}
  obj.op = 'remove'
  obj.path = '/' + props.addConditionActionSettings.conditionData.id
  dataPayload.push(obj)
  let agreementId = props.match.params.id
  let payload = {}
  payload.agreementId = agreementId
  payload.data = dataPayload
  console.log('payload', payload)
  props.deleteAgreementCondition(payload)
  closeDeleteConditionModal()
}
let handleConditionNameChange = function (event) {
  let addConditionActionSettings = JSON.parse(JSON.stringify(props.addConditionActionSettings))
  addConditionActionSettings.conditionData.name = event.target.value
  props.setAddConditionSettings(addConditionActionSettings)
  console.log('Condition Name Change', addConditionActionSettings)
}
let handleConditionDescriptionChange = function (event) {
  let addConditionActionSettings = JSON.parse(JSON.stringify(props.addConditionActionSettings))
  addConditionActionSettings.conditionData.description = event.target.value
  props.setAddConditionSettings(addConditionActionSettings)
  console.log('Condition Description Change', addConditionActionSettings)
}
let handleConditionDueDateChange = function (event) {
  let addConditionActionSettings = JSON.parse(JSON.stringify(props.addConditionActionSettings))
  addConditionActionSettings.conditionData.due_date = event.target.value
  props.setAddConditionSettings(addConditionActionSettings)
  console.log('Condition date change Change', addConditionActionSettings)
}

let editAgreeementCondition = function (event) {
  let payload = []
  let obj = {}
  // edit name payload
  obj.op = 'replace'
  obj.path = props.addConditionActionSettings.conditionData.id + '/' + 'name'
  obj.value = props.addConditionActionSettings.conditionData.name
  payload.push(obj)
  // edit description payload
  obj = {}
  obj.op = 'replace'
  obj.path = props.addConditionActionSettings.conditionData.id + '/' + 'description'
  obj.value = props.addConditionActionSettings.conditionData.description
  payload.push(obj)
  // edit duedate payload
  obj = {}
  obj.op = 'replace'
  obj.path = props.addConditionActionSettings.conditionData.id + '/' + 'due_date'
  obj.value = props.addConditionActionSettings.conditionData.due_date
  payload.push(obj)
  if (props.updateAgreementConditionSettings.notificationPeriod !== '') {
    console.log(props.updateAgreementConditionSettings.notificationPeriod)
    obj = {}
    obj.op = 'replace'
    obj.path = props.addConditionActionSettings.conditionData.id + '/' + 'notification_period_id'
    obj.value = props.addConditionActionSettings.notificationPeriodSelected.id
    payload.push(obj)
  }
  let agreementId = props.match.params.id
  let newPayload = {}
  newPayload.agreementId = agreementId
  newPayload.data = payload
  // eslint-disable-next-line
  mApp.blockPage({overlayColor:'#000000',type:'loader',state:'success',message:'Processing...'})
  props.updateAgreementCondition(newPayload)
  console.log('payload', newPayload, props)
  closeUpdateConditionModal()
}
  // Code for Condition Listing ends
  // Code for PO begins here
  // if (props.agreementPurchaseOrders && props.agreementPurchaseOrders !== '') {
  //   agreementPurchaseOrderList = props.agreementPurchaseOrders.resources.map(function (data, index) {
  //     return (
  //       <tr key={index}>
  //         <td><a href='javascript:void(0)' onClick={(event) => { event.preventDefault(); openPurchaseOrderModal(data) }}>{data.name}</a></td>
  //         <td>{'R ' + formatAmount(data.total_spend)}</td>
  //       </tr>
  //     )
  //   })
  // }
  let listPurchaseOrder = function () {
    if (props.agreementPurchaseOrders !== '') {
      if (props.agreementPurchaseOrders.resources.length > 0) {
        agreementPurchaseOrderList = props.agreementPurchaseOrders.resources.slice(perPage * (currentPage - 1), ((currentPage - 1) + 1) * perPage).map(function (data, index) {
          return (
            <tr key={index}>
              <td><a href='javascript:void(0)' onClick={(event) => { event.preventDefault(); openPurchaseOrderModal(data) }}>{data.name}</a></td>
              <td>{'R ' + formatAmount(data.total_spend)}</td>
            </tr>
          )
        })
      } else {
        agreementPurchaseOrderList = []
        agreementPurchaseOrderList.push((
          <tr key={0}>
            <td colSpan='7'>{'No data to display'}</td>
          </tr>
        ))
      }
    }
  }
  if (props.agreementPurchaseOrders && props.agreementPurchaseOrders !== '') {
    totalPurchaseOrderPages = Math.ceil(props.agreementPurchaseOrders.count / perPage)
    let i = 1
    while (i <= totalPurchaseOrderPages) {
      let pageParameter = {}
      pageParameter.number = i
      pageParameter.class = ''
      purchaseorderpageArray.push(pageParameter)
      i++
    }
    purchaseorderpageArray = _.chunk(purchaseorderpageArray, paginationLimit)
    console.log('***', purchaseorderpageArray)
    listPurchaseOrderPage = _.filter(purchaseorderpageArray, function (group) {
      let found = _.filter(group, {'number': currentPage})
      if (found.length > 0) { return group }
    })
    if (currentPage === 1) {
      previousClass = 'm-datatable__pager-link--disabled'
    }
    if (currentPage === totalPurchaseOrderPages) {
      nextClass = 'm-datatable__pager-link--disabled'
    }
    listPurchaseOrder()
  }
  let handleListAndPaginationForPurchaseOrder = function (page) {
    listPurchaseOrder()
    props.setCurrentPage(page)
    listPurchaseOrderPage = _.filter(purchaseorderpageArray, function (group) {
      let found = _.filter(group, {'number': page})
      if (found.length > 0) { return group }
    })
  }
  let handlePurchaseOrderPage = function (page) {
    if (page === 1) {
      previousClass = 'm-datatable__pager-link--disabled'
    } else if (page === totalPurchaseOrderPages) {
      nextClass = 'm-datatable__pager-link--disabled'
    }
    handleListAndPaginationForPurchaseOrder(page)
  }

  let handlePurchaseOrderPrevious = function (event) {
    event.preventDefault()
    if (currentPage === 1) {
      previousClass = 'm-datatable__pager-link--disabled'
    } else {
      props.setCurrentPage(currentPage - 1)
      handleListAndPaginationForPurchaseOrder(currentPage - 1)
    }
  }

  let handlePurchaseOrderNext = function (event) {
    event.preventDefault()
    if (currentPage === totalPurchaseOrderPages) {
      nextClass = 'm-datatable__pager-link--disabled'
    } else {
      props.setCurrentPage(currentPage + 1)
      handleListAndPaginationForPurchaseOrder(currentPage + 1)
    }
  }

  if (props.agreementPurchaseOrderById && props.agreementPurchaseOrderById !== '' && props.agreementPurchaseOrderById.error_code === null) {
    console.log('****', props.agreementPurchaseOrderById)
    purchaseOrderName = props.agreementPurchaseOrderById.resources[0].name
    purchaseOrderByIdList = props.agreementPurchaseOrderById.resources[0].items
    console.log(purchaseOrderByIdList)
    purchaseOrderItemList = purchaseOrderByIdList.map(function (data, index) {
      return (
        <tr key={index}>
          <td>{data.name}</td>
          <td>{data.activity}</td>
          <td>{data.quantity}</td>
          <td>{data.gross_price ? 'R' + formatAmount(data.gross_price) : ''}</td>
        </tr>
      )
    })
  }
  console.log(updateAgreementData)
  // Code for PO ends here
    return (
      <div>
        <div className='row'>
          <div className='col-md-8'>
            {!props.isEditComponent && (<h2>Agreement: {agreementName}</h2>)}
            {props.isEditComponent && (<div className='col-6 form-group m-form__group has-danger'>
              <input type='text' className='form-control m-input' onChange={editAgreementName} value={agreementName} placeholder='Agreement Name' aria-describedby='basic-addon2' />
              </div>)}
            <br />
            {props.isEditComponent && (<div className='col-6 form-group m-form__group has-danger'>
              <input type='text' className='form-control m-input' onChange={editAgreementDescription} value={agreementDescription} placeholder='Agreement Description' aria-describedby='basic-addon2' />
            </div>)}
          </div>
          {!props.isEditComponent && (
            <div className='col-md-4 float-right' >
              <span className='pull-right'>
                <a href='/agreements' data-skin='light' data-toggle='m-tooltip' data-placement='top' data-original-title='back' className='btn btn-info m-btn m-btn--icon btn-sm m-btn--icon-only  m-btn--pill m-btn--air'>
                  <i className='fa flaticon-list-1 fa-2x' />
                </a>&nbsp;&nbsp;
                <a href='javascript:void(0);' onClick={openEditModal} data-skin='light' data-toggle='m-tooltip' data-placement='top' data-original-title='Edit Agreement' className='btn btn-info m-btn m-btn--icon btn-sm m-btn--icon-only  m-btn--pill m-btn--air'>
                  <i className='fa flaticon-edit-1 fa-2x' />
                </a>&nbsp;&nbsp;
                <a href='javascript:void(0);' data-skin='light' data-toggle='m-tooltip' data-placement='top' data-original-title='Delete Agreement' onClick={deleteAgreement} className='btn btn-info m-btn m-btn--icon btn-sm m-btn--icon-only  m-btn--pill m-btn--air'>
                  <i className='fa flaticon-delete-1 fa-2x' />
                </a>&nbsp;&nbsp;
                <a href='javascript:void(0);' data-skin='light' data-toggle='m-tooltip' data-placement='top' data-original-title='Initiate Discussion' onClick={openDiscussionModal} className='btn btn-info m-btn m-btn--icon btn-sm m-btn--icon-only  m-btn--pill m-btn--air'>
                  <i className='fa flaticon-multimedia-3 fa-2x' />
                </a>
              </span>
              {/* <button onClick={updateAgreementData} className='btn btn-outline-info btn-sm'>Edit Agreement</button>&nbsp;
              <button onClick={deleteAgreement} className='btn btn-outline-info btn-sm'>Delete Agreement</button>&nbsp;
              <button onClick={openDiscussionModal} className='btn btn-outline-info btn-sm'>Create Discussion</button> */}
            </div>
          )}
          {props.isEditComponent && (<div className='col-md-4 float-right' >
            <div className='row pull-right'>
              <div className='col-md-6'>
                <div className='btn-group m-btn-group m-btn-group--pill' role='group' aria-label='...'>
                  <button type='button' onClick={cancelEditAgreement} className='m-btn btn btn-secondary'>Cancel</button>
                  <button type='button' onClick={updateAgreementConfirm} className='m-btn btn btn-secondary'>Save</button>
                </div>
              </div>
            </div></div>)}
          {/* {props.isEditComponent && (
            <div className='col-md-4' >
              <button onClick={cancelEditAgreement} className='btn btn-outline-info btn-sm'>Cancel</button>&nbsp;
              <button onClick={updateAgreementConfirm} className='btn btn-outline-info btn-sm'>Save</button>&nbsp;
            </div>
          )} */}
        </div>
        <div className='row' id='supplier'>
          <div className='col-md-6'>
            <div className='m-portlet m-portlet--bordered-semi m-portlet--widget-fit m-portlet--full-height m-portlet--skin-light  m-portlet--rounded-force'>
              <div className='m-portlet__head'>
                <div className='m-portlet__head-caption'>
                  <div className='m-portlet__head-title'>
                    {/* <h3 className='m-portlet__head-text m--font-light'>
                      Activity
                    </h3> */}
                  </div>
                </div>
              </div>
              <div className='m-portlet__body' style={{'height': '150px'}}>
                <div className='m-widget17'>
                  <div className='m-widget17__visual m-widget17__visual--chart m-portlet-fit--top m-portlet-fit--sides ' style={{'backgroundColor': '#0083C2'}}>
                    <div className='m-widget17__chart'>
                      <div className='chartjs-size-monitor' style={{position: 'absolute', left: 0, top: 0, right: 0, bottom: 0, overflow: 'hidden', pointerEvents: 'none', visibility: 'hidden', zIndex: -1}}><div className='chartjs-size-monitor-expand' style={{position: 'absolute', left: 0, top: 0, right: 0, bottom: 0, overflow: 'hidden', pointerEvents: 'none', visibility: 'hidden', zIndex: -1}}>
                        <div style={{position: 'absolute', width: 1000000, height: 1000000, left: 0, top: 0}} /></div>
                        <div className='chartjs-size-monitor-shrink' style={{position: 'absolute', left: 0, top: 0, right: 0, bottom: 0, overflow: 'hidden', pointerEvents: 'none', visibility: 'hidden', zIndex: -1}}>
                          <div style={{position: 'absolute', width: '200%', height: '200%', left: 0, top: 0}} /></div></div>
                      <canvas id='m_chart_activities' width={509} height={16} className='chartjs-render-monitor' style={{display: 'block', width: 509, height: 50}} />
                    </div>
                  </div>
                  <div className='m-widget17__stats'>
                    <div className='m-widget17__items m-widget17__items-col2'>
                      <div className='m-widget17__item' style={{'marginTop': '-8.87rem'}}>
                        <span className='m-widget17__icon'>
                          <i className='flaticon-business m--font-brand' />
                          <h4 style={{'float': 'right', 'paddingRight': '25px'}}>{entitlementCount}</h4>
                        </span>
                        <span className='m-widget17__subtitle'>
                          <h3><a href='/entitlements'>Entitlements</a></h3>
                          <h5>R {formatAmount(agreementCost)}</h5>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='col-md-6'>
            <div className='m-portlet m-portlet--bordered-semi m-portlet--widget-fit m-portlet--full-height m-portlet--skin-light  m-portlet--rounded-force'>
              <div className='m-portlet__head'>
                <div className='m-portlet__head-caption'>
                  <div className='m-portlet__head-title'>
                    {/* <h3 className='m-portlet__head-text m--font-light'>
                      Activity
                    </h3> */}
                  </div>
                </div>
              </div>
              <div className='m-portlet__body' style={{'height': '150px'}}>
                <div className='m-widget17'>
                  <div className='m-widget17__visual m-widget17__visual--chart m-portlet-fit--top m-portlet-fit--sides ' style={{'backgroundColor': '#0083C2'}}>
                    <div className='m-widget17__chart'>
                      <div className='chartjs-size-monitor' style={{position: 'absolute', left: 0, top: 0, right: 0, bottom: 0, overflow: 'hidden', pointerEvents: 'none', visibility: 'hidden', zIndex: -1}}><div className='chartjs-size-monitor-expand' style={{position: 'absolute', left: 0, top: 0, right: 0, bottom: 0, overflow: 'hidden', pointerEvents: 'none', visibility: 'hidden', zIndex: -1}}>
                        <div style={{position: 'absolute', width: 1000000, height: 1000000, left: 0, top: 0}} /></div>
                        <div className='chartjs-size-monitor-shrink' style={{position: 'absolute', left: 0, top: 0, right: 0, bottom: 0, overflow: 'hidden', pointerEvents: 'none', visibility: 'hidden', zIndex: -1}}>
                          <div style={{position: 'absolute', width: '200%', height: '200%', left: 0, top: 0}} /></div></div>
                      <canvas id='m_chart_activities' width={509} height={16} className='chartjs-render-monitor' style={{display: 'block', width: 509, height: 50}} />
                    </div>
                  </div>
                  <div className='m-widget17__stats'>
                    <div className='m-widget17__items m-widget17__items-col2'>
                      <div className='m-widget17__item' style={{'marginTop': '-8.87rem'}}>
                        <span className='m-widget17__icon'>
                          <i className='flaticon-calendar-1 m--font-brand' />
                        </span>
                        <span className='m-widget17__subtitle'>
                          <h3 className='pull-left'>Expiry in {expireInDays + ' days'}</h3>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='col-md-5' />
        </div>
        {/* The table structure begins */}
        <div className={styles.borderline} style={{'marginTop': '20px'}}>
          <ul className='nav nav-tabs nav-fill' role='tablist'>
            <li className='nav-item'>
              <a className='nav-link show active' data-toggle='tab' href='#m_tabs_2_1'>Details</a>
            </li>
            <li className='nav-item'>
              <a className='nav-link' data-toggle='tab' href='#m_tabs_2_2'>Bill of Material</a>
            </li>
            <li className='nav-item'>
              <a className='nav-link' data-toggle='tab' href='#m_tabs_2_4'>Conditions</a>
            </li>
            <li className='nav-item'>
              <a className='nav-link' data-toggle='tab' href='#m_tabs_2_5'>PO</a>
            </li>
            <li className='nav-item'>
              <a className='nav-link' data-toggle='tab' href='#m_tabs_2_3'>Relationships</a>
            </li>
          </ul>
          <div className='tab-content'>
            <div className='tab-pane active' id='m_tabs_2_1' role='tabpanel'>
              <div className='col-md-12'>
                <div className='m-portlet'>
                  <div className='m-portlet__body'>
                    <table className={'table ' + styles.borderless}>
                      {agreementPropertiesList}
                    </table>
                  </div>
                </div>
              </div>
            </div>
            <div className='tab-pane' id='m_tabs_2_2' role='tabpanel'>
              <div className='col-md-12 m_datatable m-datatable m-datatable--default m-datatable--loaded m-datatable--scroll'>
                <div className='m-portlet'>
                  <div className='m-portlet__body'>
                    <table className='m-portlet table table-striped- table-bordered table-hover table-checkable dataTable no-footer' id='m_table_1' aria-describedby='m_table_1_info' role='grid'>
                      <thead>
                        <tr role='row'>
                          <th className=''><h5>Supplier Product Name</h5></th>
                          <th className=''><h5>Part Number</h5></th>
                          <th className=''><h5>Purchased</h5></th>
                          <th className=''><h5>Consumed</h5></th>
                          <th className=''><h5>Project Reserved</h5></th>
                          <th className=''><h5>BU Allocated</h5></th>
                          <th className=''><h5>Cost</h5></th>
                          {/* <th className=''><h5>Total Cost</h5></th> */}
                        </tr>
                      </thead>
                      <tbody>
                        {agreementEntitlementList}
                      </tbody>
                    </table>
                  </div>
                </div>
                {agreementEntitlementList.length > 0 && (
                  <div className='m-datatable__pager m-datatable--paging-loaded clearfix' style={{ 'text-align': 'center' }}>
                    <ul className='m-datatable__pager-nav'>
                      <li><a href='' title='Previous' className={'m-datatable__pager-link m-datatable__pager-link--prev ' + previousClass} onClick={handlePrevious} data-page='4'><i className='la la-angle-left' /></a></li>
                      {listEntitlementPage[0] && listEntitlementPage[0].map(function (page, index) {
                          if (page.number === currentPage) {
                            page.class = 'm-datatable__pager-link--active'
                          } else {
                            page.class = ''
                          }
                          return (<li key={index} >
                            <a href='' className={'m-datatable__pager-link m-datatable__pager-link-number ' + page.class} data-page={page.number} title={page.number} onClick={(event) => { event.preventDefault(); handlePage(page.number) }} >{page.number}</a>
                          </li>)
                        })}
                      <li><a href='' title='Next' className={'m-datatable__pager-link m-datatable__pager-link--next ' + nextClass} onClick={handleNext} data-page='4'><i className='la la-angle-right' /></a></li>
                    </ul>
                  </div>
                )}
              </div>
            </div>
            <div className='tab-pane' id='m_tabs_2_4' role='tabpanel'>
              <div className='col-md-12 m_datatable m-datatable m-datatable--default m-datatable--loaded m-datatable--scroll'>
                <div className='m-portlet'>
                  <div className='m-portlet__body'>
                    <div className='col-sm-12'>
                      <div className='col-md-6 pull-left' />
                      <div className='col-md-6 pull-right' style={{'marginBottom': '10px'}}>
                        <a href='javascript:void(0);' data-skin='light' data-toggle='m-tooltip' data-placement='top' data-original-title='Add Condition' onClick={openAddConditionModal} className='btn btn-info m-btn m-btn--icon btn-sm m-btn--icon-only  m-btn--pill m-btn--air' style={{'float': 'right'}}>
                          <i className='fa flaticon-app fa-2x' />
                        </a>
                      </div>
                    </div>
                    <table className='m-portlet table table-striped- table-bordered table-hover table-checkable dataTable no-footer' id='m_table_1' aria-describedby='m_table_1_info' role='grid'>
                      <thead>
                        <tr role='row'>
                          <th className=''><h5>Name</h5></th>
                          <th><h5>Expire Date</h5></th>
                          <th><h5>Action</h5></th>
                        </tr>
                      </thead>
                      <tbody>
                        {agreementConditionsList}
                      </tbody>
                    </table>
                  </div>
                </div>
                {agreementConditionsList.length > 0 && (
                  <div className='m-datatable__pager m-datatable--paging-loaded clearfix' style={{ 'text-align': 'center' }}>
                    <ul className='m-datatable__pager-nav'>
                      <li><a href='' title='Previous' className={'m-datatable__pager-link m-datatable__pager-link--prev ' + previousClass} onClick={handleConditionPrevious} data-page='4'><i className='la la-angle-left' /></a></li>
                      {listConditionPage[0] && listConditionPage[0].map(function (page, index) {
                          if (page.number === currentPage) {
                            page.class = 'm-datatable__pager-link--active'
                          } else {
                            page.class = ''
                          }
                          return (<li key={index} >
                            <a href='' className={'m-datatable__pager-link m-datatable__pager-link-number ' + page.class} data-page={page.number} title={page.number} onClick={(event) => { event.preventDefault(); handleConditionPage(page.number) }} >{page.number}</a>
                          </li>)
                        })}
                      <li><a href='' title='Next' className={'m-datatable__pager-link m-datatable__pager-link--next ' + nextClass} onClick={handleConditionNext} data-page='4'><i className='la la-angle-right' /></a></li>
                    </ul>
                  </div>
                )}
              </div>
            </div>
            <div className='tab-pane' id='m_tabs_2_5' role='tabpanel'>
              <div className='col-md-12 m_datatable m-datatable m-datatable--default m-datatable--loaded m-datatable--scroll'>
                <div className='m-portlet'>
                  <div className='m-portlet__body' style={{height: '200px', overflowY: 'auto'}}>
                    <table className='m-portlet table table-striped- table-bordered table-hover table-checkable dataTable no-footer' id='m_table_1' aria-describedby='m_table_1_info' role='grid'>
                      <thead>
                        <tr role='row'>
                          <th className=''><h5>PO Number</h5></th>
                          <th><h5>Price</h5></th>
                        </tr>
                      </thead>
                      <tbody>
                        {agreementPurchaseOrderList}
                        {/* <tr>
                          <td><a href='javascript:void(0);'>Abcedfjfff dfdbffb</a></td>
                          <td>31 Mar 2018</td>
                        </tr> */}
                      </tbody>
                    </table>
                  </div>
                </div>
                {agreementPurchaseOrderList.length > 0 && (
                  <div className='m-datatable__pager m-datatable--paging-loaded clearfix' style={{ 'text-align': 'center' }}>
                    <ul className='m-datatable__pager-nav'>
                      <li><a href='' title='Previous' className={'m-datatable__pager-link m-datatable__pager-link--prev ' + previousClass} onClick={handlePurchaseOrderPrevious} data-page='4'><i className='la la-angle-left' /></a></li>
                      {listPurchaseOrderPage[0] && listPurchaseOrderPage[0].map(function (page, index) {
                          if (page.number === currentPage) {
                            page.class = 'm-datatable__pager-link--active'
                          } else {
                            page.class = ''
                          }
                          return (<li key={index} >
                            <a href='' className={'m-datatable__pager-link m-datatable__pager-link-number ' + page.class} data-page={page.number} title={page.number} onClick={(event) => { event.preventDefault(); handlePurchaseOrderPage(page.number) }} >{page.number}</a>
                          </li>)
                        })}
                      <li><a href='' title='Next' className={'m-datatable__pager-link m-datatable__pager-link--next ' + nextClass} onClick={handlePurchaseOrderNext} data-page='4'><i className='la la-angle-right' /></a></li>
                    </ul>
                  </div>
                )}
              </div>
            </div>
            <div className='tab-pane' id='m_tabs_2_3' role='tabpanel'>
              <div className='col-lg-12' >
                <div className='row'>
                  <div className='col-6' />
                  <div className='col-6 float-right'>
                    <a href='javascript:void(0);' data-skin='light' data-toggle='m-tooltip' data-placement='top' data-original-title='Add Relationship' onClick={openModal} className='btn btn-info m-btn m-btn--icon btn-sm m-btn--icon-only  m-btn--pill m-btn--air pull-right'>
                      <i className='fa flaticon-add fa-2x' />
                    </a>
                    {/* <button onClick={openModal} className={'btn btn-sm btn-outline-info pull-right'}>Add Relationship</button> */}
                  </div>
                </div>
                <div className='' style={{'marginTop': '20px'}}>
                  <div className='m--space-10' />
                  <div className='accordion m-accordion m-accordion--bordered' id='m_accordion_2' style={{width: '100%'}} role='tablist' aria-multiselectable='true'>
                    {parentComponentRelationshipList}
                    {outgoingComponentRelationshipList}
                    {incomingComponentRelationshipList}
                    {childComponentRelationshipList}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <ReactModal isOpen={props.addAgreementSettings.isConfirmationModalOpen}
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
                      <div className='col-md-6 '>
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
          <ReactModal isOpen={props.addAgreementSettings.isDeleteModalOpen}
            onRequestClose={closeDeleteModal}
            className=''
            style={customStyles}
            >
            <div className={''}>
              <div className='modal-dialog'>
                <div className='modal-content'>
                  <div className='modal-header'>
                    <h6 className='modal-title' id='exampleModalLabel'>Deleting the {'Agreement'} {agreementName}, are you sure?</h6>
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
                          <button type='button' onClick={removeAgreement} className='m-btn btn btn-secondary'>Delete</button>
                        </div>
                      </div>
                    </div>
                    {/* <button type='button' onClick={closeDeleteModal} id='m_login_signup' className={'btn btn-outline-info'}>Back</button>
                    <button type='button' id='m_login_signup' className={'btn btn-outline-info'} onClick={removeAgreement}>Delete</button> */}
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
                    <h4 className='modal-title' id='exampleModalLabel'>{'How is the ' + agreementName + ' related to other things'}</h4>
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
          <ReactModal isOpen={props.addConditionActionSettings.isAddConditionModalOpen}
            onRequestClose={closeAddConditionModal} shouldCloseOnOverlayClick={false}
            className='modal-dialog modal-lg'
            style={{'overlay': {zIndex: '1000'}, 'content': {'top': '20%'}}}
            >
            <div className={''}>
              <div className='modal-dialog modal-lg'>
                <div className='modal-content'>
                  <div className='modal-header'>
                    <h4 className='modal-title' id='exampleModalLabel'>Add Condition</h4>
                    <button type='button' onClick={closeAddConditionModal} className='close' data-dismiss='modal' aria-label='Close'>
                      <span aria-hidden='true'>×</span>
                    </button>
                  </div>
                  <div className='modal-body'>
                    <div className='col-md-12'>
                      <div className='form-group row'>
                        <div className='col-4'><label htmlFor='text' className='form-control-label'>Name</label></div>
                        <div className='col-8'><input className='form-control' ref={input => (ConditionNameInputBox = input)} autoComplete='off' required /></div>
                      </div>
                      <div className='form-group row'>
                        <div className='col-4'><label htmlFor='text' className='form-control-label'>Description</label></div>
                        <div className='col-8'><textarea className='form-control' ref={input => (ConditionDescriptionInputBox = input)} autoComplete='off' required /></div>
                      </div>
                      <div className='form-group row'>
                        <div className='col-4'><label htmlFor='text' className='form-control-label'>Due Date</label></div>
                        <div className='col-8'>
                          <DatePicker
                            className='input-sm form-control m-input'
                            value={props.startDate}
                            dateFormat='DD MMM YYYY'
                            onChange={(date) => { handleDateSelect(date) }}
                          />
                        </div>
                        {/* <div className='col-8'><input type='date' className='form-control' ref={input => (DateInputBox = input)} autoComplete='off' required onChange={(event) => { addDate(event.target.value) }} /></div> */}
                      </div>
                      <div className='form-group row'>
                        <div className='col-4'><label htmlFor='SelectNotificationPeriod' className='col-form-label'>Notification Period</label></div>
                        <div className='col-8'>
                          <Select
                            className='input-sm m-input'
                            placeholder='Select Notification Period'
                            isClearable
                            value={props.addConditionActionSettings.notificationPeriodSelected}
                            onChange={handleNotificationPeriodSelect}
                            isSearchable
                            options={periodOptions}
                          />
                        </div>
                        {/* <div className='form-group row'>
                          <input type='text' name='city' list='cityname'>
                            <datalist id='cityname'>
                              <option value={periodOptions} />
                            </datalist>
                          </input>
                        </div> */}
                      </div>
                    </div>
                  </div>
                  <div className='modal-footer'>
                    <div className='btn-group m-btn-group m-btn-group--pill ' role='group' aria-label='...'>
                      <button type='button' onClick={closeAddConditionModal} className='m-btn btn btn-secondary'>Close</button>
                      <button type='button' onClick={addAgreementCondition} className='m-btn btn btn-secondary'>Add</button>
                    </div>
                    {/* <button type='button' onClick={closeAddConditionModal} className='btn btn-sm btn-outline-info'>Cancel</button>
                    <button type='button' onClick={addAgreementCondition} className='btn btn-sm btn-outline-info'>Add</button> */}
                  </div>
                </div>
              </div>
            </div>
          </ReactModal>
          <ReactModal isOpen={props.addConditionActionSettings.isUpdateConditionModalOpen}
            onRequestClose={closeUpdateConditionModal} shouldCloseOnOverlayClick={false}
            className='modal-dialog modal-lg'
            style={{'overlay': {zIndex: '1000'}, 'content': {'top': '20%'}}}
            >
            <div className={''}>
              <div className='modal-dialog modal-lg'>
                <div className='modal-content'>
                  <div className='modal-header'>
                    <h4 className='modal-title' id='exampleModalLabel'>Edit Condition</h4>
                    <button type='button' onClick={closeUpdateConditionModal} className='close' data-dismiss='modal' aria-label='Close'>
                      <span aria-hidden='true'>×</span>
                    </button>
                  </div>
                  <div className='modal-body'>
                    <div className='col-md-12'>
                      <div className='form-group row'>
                        <div className='col-4'><label htmlFor='text' className='form-control-label'>Name</label></div>
                        <div className='col-8'><input className='form-control' onChange={handleConditionNameChange} value={props.addConditionActionSettings.conditionData ? props.addConditionActionSettings.conditionData.name : ''} autoComplete='off' required /></div>
                      </div>
                      <div className='form-group row'>
                        <div className='col-4'><label htmlFor='text' className='form-control-label'>Description</label></div>
                        <div className='col-8'><textarea className='form-control' onChange={handleConditionDescriptionChange} value={props.addConditionActionSettings.conditionData ? props.addConditionActionSettings.conditionData.description : ''} autoComplete='off' required /></div>
                      </div>
                      <div className='form-group row'>
                        <div className='col-4'><label htmlFor='date' className='form-control-label'>Due Date</label></div>
                        <div className='col-3'><input type='text' className='form-control' value={props.addConditionActionSettings.conditionData ? moment(props.addConditionActionSettings.conditionData.due_date).format('DD MMM YYYY') : ''} autoComplete='off' required /></div>
                        <div className='col-5'><input type='date' className='form-control' autoComplete='off' onChange={handleConditionDueDateChange} required /></div>
                      </div>
                      {/* <div className='form-group row'>
                        <DatePicker
                          className='input-sm form-control m-input'
                          selected={props.addConditionActionSettings.conditionData ? props.addConditionActionSettings.conditionData.due_date : ''}
                          dateFormat='DD MMM YYYY'
                        />
                      </div> */}
                      <div className='form-group row'>
                        <div className='col-4'><label htmlFor='SelectNotificationPeriod' className='col-form-label'>Notification Period</label></div>
                        <div className='col-3'><input type='text' className='form-control' value={props.addConditionActionSettings.conditionData ? props.addConditionActionSettings.conditionData.notification_period : ''} autoComplete='off' required /></div>
                        <div className='col-5'>
                          <Select
                            // className='col-7 input-sm m-input'
                            placeholder='Select Notification'
                            isClearable
                            value={props.updateAgreementConditionSettings.notificationPeriod}
                            onChange={handleNotificationPeriodSelect}
                            isSearchable={false}
                            name={'notificationSelected'}
                            options={periodOptions}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className='modal-footer'>
                    <div className='btn-group m-btn-group m-btn-group--pill ' role='group' aria-label='...'>
                      <button type='button' onClick={closeUpdateConditionModal} className='m-btn btn btn-secondary'>Close</button>
                      <button type='button' onClick={editAgreeementCondition} className='m-btn btn btn-secondary'>Edit</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </ReactModal>
          <ReactModal isOpen={props.addConditionActionSettings.isDeleteConditionModalOpen}
            onRequestClose={closeDeleteConditionModal} shouldCloseOnOverlayClick={false}
            className='modal-dialog modal-lg'
            style={{'overlay': {zIndex: '1000'}, 'content': {'top': '20%'}}}
            >
            <div className={''}>
              <div className='modal-dialog modal-lg'>
                <div className='modal-content'>
                  <div className='modal-header'>
                    <h4 className='modal-title' id='exampleModalLabel'>Delete Condition</h4>
                    <button type='button' onClick={closeDeleteConditionModal} className='close' data-dismiss='modal' aria-label='Close'>
                      <span aria-hidden='true'>×</span>
                    </button>
                  </div>
                  <div className='modal-body'>
                    <div className='col-md-12'>
                      <div className='form-group row'>
                        <div className='col-2'><label htmlFor='text' className='form-control-label'>Name:</label></div>
                        <div className='col-10'>{props.addConditionActionSettings.conditionData ? props.addConditionActionSettings.conditionData.name : ''}</div>
                      </div>
                    </div>
                  </div>
                  <div className='modal-footer'>
                    <div className='btn-group m-btn-group m-btn-group--pill ' role='group' aria-label='...'>
                      <button type='button' onClick={closeDeleteConditionModal} className='m-btn btn btn-secondary'>Close</button>
                      <button type='button' onClick={deleteAgreementCondition} className='m-btn btn btn-secondary'>Confirm</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </ReactModal>
          <ReactModal isOpen={props.addConditionActionSettings.isViewConditionModalOpen && props.addConditionActionSettings.conditionData}
            onRequestClose={closeViewConditionModal} shouldCloseOnOverlayClick={false}
            className='modal-dialog modal-lg'
            style={{'overlay': {zIndex: '1000'}, 'content': {'top': '20%'}}}
            >
            <div className={''}>
              <div className='modal-dialog modal-lg'>
                <div className='modal-content'>
                  <div className='modal-header'>
                    <h4 className='modal-title' id='exampleModalLabel'>View Condition</h4>
                    <button type='button' onClick={closeViewConditionModal} className='close' data-dismiss='modal' aria-label='Close'>
                      <span aria-hidden='true'>×</span>
                    </button>
                  </div>
                  <div className='modal-body'>
                    <div className='col-md-12'>
                      <div className='form-group row'>
                        <div className='col-4'><label htmlFor='text' className='form-control-label'>Name:</label></div>
                        <div className='col-8'>{conditionName}</div>
                      </div>
                      <div className='form-group row'>
                        <div className='col-4'><label htmlFor='text' className='form-control-label'>Description:</label></div>
                        <div className='col-8'>{conditionDescription}</div>
                      </div>
                      <div className='form-group row'>
                        <div className='col-4'><label htmlFor='text' className='form-control-label'>Due Date:</label></div>
                        <div className='col-8'>{moment(conditionDueDate).format('DD MMM YYYY')}</div>
                      </div>
                      <div className='form-group row'>
                        <div className='col-4'><label htmlFor='text' className='form-control-label'>Notification Period:</label></div>
                        <div className='col-8'>{conditionNotification}</div>
                      </div>
                    </div>
                  </div>
                  <div className='modal-footer'>
                    <div className='btn-group m-btn-group m-btn-group--pill ' role='group' aria-label='...'>
                      <button type='button' onClick={closeViewConditionModal} className='m-btn btn btn-secondary'>Close</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </ReactModal>
          <ReactModal isOpen={props.agreementPurchaseOrderSettings.isPoModalOpen && props.agreementPurchaseOrderSettings.purchaseOrderData}
            onRequestClose={closePurchaseOrderModal} shouldCloseOnOverlayClick={false}
            className='modal-dialog modal-lg'
            style={{'overlay': {zIndex: '1000'}, 'content': {'top': '20%'}}}
            >
            <div className={''}>
              <div className='modal-dialog modal-lg'>
                <div className='modal-content'>
                  <div className='modal-header'>
                    <h4 className='modal-title' id='exampleModalLabel'>View PO Detail: {purchaseOrderName}</h4>
                    <button type='button' onClick={closePurchaseOrderModal} className='close' data-dismiss='modal' aria-label='Close'>
                      <span aria-hidden='true'>×</span>
                    </button>
                  </div>
                  <div className='modal-body' style={{height: '350px', overflowY: 'scroll'}}>
                    <div className='col-md-12'>
                      <div className='form-group row'>
                        <table className='m-portlet table table-striped- table-bordered table-hover table-checkable dataTable no-footer' id='m_table_1' aria-describedby='m_table_1_info' role='grid'>
                          <thead>
                            <tr role='row'>
                              <th className=''><h5>Name</h5></th>
                              <th className=''><h5>Activity Code</h5></th>
                              <th className=''><h5>Quantity</h5></th>
                              <th className=''><h5>Price</h5></th>
                            </tr>
                          </thead>
                          <tbody>
                            {purchaseOrderItemList}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                  <div className='modal-footer'>
                    <div className='btn-group m-btn-group m-btn-group--pill ' role='group' aria-label='...'>
                      <button type='button' onClick={closePurchaseOrderModal} className='m-btn btn btn-secondary'>Close</button>
                    </div>
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
                    {props.addSettings.updateResponse === null && (<h4 className='modal-title' id='exampleModalLabel'>Edit Agreement</h4>)}
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
        {/* The table structure ends */}
        <Discussion name={agreementName} type='Component' {...props} />
        <NewDiscussion contextId={contextId} name={agreementName} type='Component' {...props} />
      </div>
      )
    }
    AgreementDetail.propTypes = {
      match: PropTypes.any,
      agreement: PropTypes.any,
      agreementEntitlements: PropTypes.any,
      agreementProperties: PropTypes.any,
      agreementRelationships: PropTypes.any,
      relationshipActionSettings: PropTypes.any,
      addAgreementSettings: PropTypes.any,
      isEditComponent: PropTypes.any,
      agreementPropertiesPayload: PropTypes.any,
      copiedAgreementProperties: PropTypes.any,
      copiedAgreementData: PropTypes.any,
      relationshipPropertyPayload: PropTypes.any,
      relationshipProperty: PropTypes.any,
      addNewConnectionSettings: PropTypes.any,
      componentTypeComponentConstraints: PropTypes.any,
      componentTypeComponents: PropTypes.any,
      currentPage: PropTypes.any,
      validationProperty: PropTypes.any,
      setAddConditionSettings: PropTypes.any,
      setPurchaseOrderSettings: PropTypes.any,
      agreementPurchaseOrderSettings: PropTypes.any,
      // setSelectedDate: PropTypes.func,
      // setSelectedNotificationPeriod: PropTypes.func,
      setUpdateAgreementConditionSettings: PropTypes.func,
      addConditionActionSettings: PropTypes.any,
      updateAgreementConditionSettings: PropTypes.any,
      agreementConditions: PropTypes.any,
      selectedDate: PropTypes.any,
      selectedNotificationPeriod: PropTypes.any,
      fetchAgreementConditionById: PropTypes.func,
      fetchAgreementPurchaseOrderById: PropTypes.func,
      agreementPurchaseOrderById: PropTypes.any,
      // addAgreementCondition: PropTypes.func,
      agreementCondition: PropTypes.any,
      agreementPurchaseOrders: PropTypes.any,
      notificationPeriodData: PropTypes.any,
      addSettings: PropTypes.any,
      startDate: PropTypes.any,
      connectionData: PropTypes.any
  }
