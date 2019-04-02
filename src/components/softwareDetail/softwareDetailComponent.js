import React from 'react'
import PropTypes from 'prop-types'
import styles from './softwareDetailComponent.scss'
import Select from 'react-select'
import moment from 'moment'
import DataModelComponent from '../../containers/dataModel/dataModelContainer'
import _ from 'lodash'
import Discussion from '../../containers/discussion/discussionContainer'
import NewDiscussion from '../../containers/newDiscussion/newDiscussionContainer'
import DatePicker from 'react-datepicker'
import ReactModal from 'react-modal'
import 'react-datepicker/dist/react-datepicker.css'
ReactModal.setAppElement('#root')
var divStyle = {
  // width: '900px',
  // height: '600px',
  'overflowY': 'scroll',
  'overflowX': 'scroll',
  'border': '1px solid #000000',
  'background-color': '#FFFFFF'
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

export default function Softwareview (props) {
  console.log('props sd', props)
  let connectionSelectBoxList = ''
  let businessPropertyList = ''
  let messageList = ''
  let softwareName = ''
  let softwareInstances = ''
  let softwareCost = ''
  let softwarePropertiesList = ''
  let parentSoftwareRelationshipList = ''
  let outgoingSoftwareRelationshipList = ''
  let incomingSoftwareRelationshipList = ''
  let childSoftwareRelationshipList = ''
  let modelRelationshipData = ''
  let showProperties = props.showTabs.showProperty
  let showRelationships = props.showTabs.showRelationship
  let startNode = {}
  let contextId = props.match.params.id
  let openDiscussionModal = function (event) {
    event.preventDefault()
    props.setDiscussionModalOpenStatus(true)
  }
  let toggleExpandIcon = function (index) {
    // eslint-disable-next-line
    let iconClass = $('#expandIcon' + index).attr('class')
    if (iconClass === 'fa fa-plus') {
      // eslint-disable-next-line
      $('#expandIcon' + index).removeClass('fa-plus').addClass('fa-minus')
    } else {
      // eslint-disable-next-line
      $('#expandIcon' + index).removeClass('fa-minus').addClass('fa-plus')
    }
  }
  let showProperty = function (event) {
    let payload = {'showProperty': ' active show', 'showRelationship': ''}
    props.setCurrentTab(payload)
  }
  let showRelationship = function (event) {
    let payload = {'showProperty': '', 'showRelationship': ' active show'}
    props.setCurrentTab(payload)
  }
  if (props.softwarebyId && props.softwarebyId !== '') {
    softwareName = props.softwarebyId.resources[0].name
    softwareInstances = props.softwarebyId.resources[0].instances
    softwareCost = props.softwarebyId.resources[0].cost
    let appPackage = JSON.parse(localStorage.getItem('packages'))
    let componentTypes = appPackage.resources[0].component_types
    let componentTypeIcon = _.result(_.find(componentTypes, function (obj) {
        return obj.key === 'Software'
    }), 'icon')
    startNode.name = props.softwarebyId.resources[0].name
    startNode.title = props.softwarebyId.resources[0].name
    startNode.icon = componentTypeIcon
  }
  if (props.softwareProperties && props.softwareProperties !== '') {
    softwarePropertiesList = props.softwareProperties.resources.map(function (property, index) {
      let propertyProperties = property.properties
      let childProperties = propertyProperties.map(function (childProperty, childIndex) {
        let value
        // console.log('childProperty', childProperty)
        if (childProperty.property_type.key === 'Integer') {
          value = childProperty.int_value
        } else if (childProperty.property_type.key === 'Decimal') {
          value = childProperty.float_value
        } else if (childProperty.property_type.key === 'DateTime') {
          value = childProperty.date_time_value ? moment(childProperty.date_time_value).format('DD MMM YYYY') : ''
        } else if (childProperty.property_type.key === 'Text') {
          value = childProperty.text_value
        } else if (childProperty.property_type.key === 'List') {
          // let childPropertyOption = childProperty.value_set.values.map((option, opIndex) => {
          //   option.label = option.name
          //   option.value = option.id
          //   return option
          // })
          let dvalue = childProperty.value_set_value
          if (childProperty.value_set_value !== null) {
            dvalue.label = childProperty.value_set_value.name
            dvalue.value = childProperty.value_set_value.id
          }
          value = childProperty.value_set_value ? childProperty.value_set_value.name : null
        } else {
          value = childProperty.other_value
        }
        return (
          <tr key={'child' + childIndex}>
            <td><span className={styles.labelbold}>{childProperty.name}</span></td>
            <td><span>{value}</span></td>
          </tr>
        )
      })
      return (
        <tbody key={index} className={'col-6'}>
          <tr id={'property' + index} onClick={(event) => { event.preventDefault(); toggleExpandIcon(index) }} data-toggle='collapse' data-target={'#expand' + index} style={{cursor: 'pointer'}}>
            <td><icon id={'expandIcon' + index} className={'fa fa-plus'} aria-hidden='true' />&nbsp;</td>
            <td><span className={styles.labelbold}>{property.name}</span></td>
          </tr>
          <tr className='collapse' id={'expand' + index}>
            <td colSpan='2'>
              <table>
                {childProperties}
              </table>
            </td>
          </tr>
        </tbody>
      )
    })
    console.log('-------------', softwarePropertiesList)
  }
  if (props.softwareRelationships && props.softwareRelationships !== '') {
    modelRelationshipData = props.softwareRelationships.resources
    let parent = _.filter(props.softwareRelationships.resources, {'relationship_type': 'Parent'})
    let outgoing = _.filter(props.softwareRelationships.resources, {'relationship_type': 'ConnectFrom'})
    outgoing = _.orderBy(outgoing, ['connection.name', 'target_component.name'], ['asc', 'asc'])
    let incoming = _.filter(props.softwareRelationships.resources, {'relationship_type': 'ConnectTo'})
    incoming = _.orderBy(incoming, ['connection.name', 'target_component.name'], ['asc', 'asc'])
    let child = _.filter(props.softwareRelationships.resources, {'relationship_type': 'Child'})
    let parentSoftwareRelationshipListFn = function () {
      if (parent.length > 0) {
        let childElementList = parent.map(function (element, i) {
        return (<span className='row' style={{'padding': '5px'}}>
          <div className='col-md-10'><span>{element.target_component.name}</span></div>
        </span>)
      })
      return (
        <div className='m-accordion__item' style={{'overflow': 'visible'}}>
          <div className='m-accordion__item-head collapsed' role='tab' id='m_accordion_2_item_1_head' data-toggle='collapse' href={'#m_accordion_2_item_1_body' + parent[0].relationship_type} aria-expanded='true'>
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
    let childSoftwareRelationshipListFn = function () {
      if (child.length > 0) {
        let childElementList = child.map(function (element, i) {
        return (<span className='row' style={{'padding': '5px'}}>
          <div className='col-md-10'><span>{element.target_component.name}</span></div>
        </span>)
      })
      return (
        <div className='m-accordion__item' style={{'overflow': 'visible'}}>
          <div className='m-accordion__item-head collapsed' role='tab' id='m_accordion_2_item_1_head' data-toggle='collapse' href={'#m_accordion_2_item_1_body' + child[0].relationship_type} aria-expanded='true'>
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
    let outgoingSoftwareRelationshipListFn = function () {
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
                let childElementList = outgoingGroup[connectionKey][targetComponentTypeKey].map(function (element, i) {
                  return (<span className='row' style={{'padding': '5px'}}>
                    <div className='col-md-10'><span>{element.target_component.name}</span></div>
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
    let incomingSoftwareRelationshipListFn = function () {
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
                let childElementList = incomingGroup[connectionKey][targetComponentTypeKey].map(function (element, i) {
                  return (<span className='row' style={{'padding': '5px'}}>
                    <div className='col-md-10'><span>{element.target_component.name}</span></div>
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

    parentSoftwareRelationshipList = parentSoftwareRelationshipListFn()
    outgoingSoftwareRelationshipList = outgoingSoftwareRelationshipListFn()
    incomingSoftwareRelationshipList = incomingSoftwareRelationshipListFn()
    childSoftwareRelationshipList = childSoftwareRelationshipListFn()
  }
  // Code for delete Software
  let deleteSoftware = function () {
    let addSettings = {...props.addSettings, isDeleteModalOpen: true}
    props.setAddSettings(addSettings)
  }
  let removeSoftware = function () {
    let payload = {
      'id': props.softwarebyId.resources[0].id
    }
    // eslint-disable-next-line
    mApp.blockPage({overlayColor:'#000000',type:'loader',state:'success',message:'Processing...'})
    props.deleteSoftware(payload)
    closeDeleteModal()
  }
  let closeDeleteModal = function () {
    let addSettings = {...props.addSettings, isDeleteModalOpen: false}
    props.setAddSettings(addSettings)
  }
  // End code for delete agreement
  // Code for update Software
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
  let handlePropertySelect = function (index) {
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
    // addSettings.name = props.softwarebyId.resources[0].name
    // addSettings.description = props.softwarebyId.resources[0].description
    addSettings.isEditModalOpen = true
    props.setAddSettings(addSettings)
  }
  let closeEditModal = function () {
    let addSettings = {...props.addSettings, isEditModalOpen: false}
    props.setAddSettings(addSettings)
  }
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
    let payload = {}
    payload.queryString = {}
    payload.queryString.meta_model_perspective_id = props.metaModelPerspective.resources[0].id
    payload.queryString.apply_changes = true
    payload.data = {}
    payload.data[props.metaModelPerspective.resources[0].id] = patchPayload
    console.log('payload', payload)
    props.updateModelPrespectives(payload)
  }
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
            onChange={handlePropertySelect(index)}
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
  // End code for update agreement
    return (
      <div>
        <div className='row'>
          <div className='col-md-8'>
            <h2>Software: {softwareName}</h2>
          </div>
          <div className='col-md-4 float-right'>
            <span className='pull-right'>
              <a href='/softwares' data-skin='light' data-toggle='m-tooltip' data-placement='top' data-original-title='back' className='btn btn-info m-btn m-btn--icon btn-sm m-btn--icon-only  m-btn--pill m-btn--air'>
                <i className='fa flaticon-list-1 fa-2x' />
              </a>&nbsp;&nbsp;
              <a href='javascript:void(0);' onClick={openEditModal} data-skin='light' data-toggle='m-tooltip' data-placement='top' data-original-title='Edit Software' className='btn btn-info m-btn m-btn--icon btn-sm m-btn--icon-only  m-btn--pill m-btn--air'>
                <i className='fa flaticon-edit-1 fa-2x' />
              </a>&nbsp;&nbsp;
              <a href='javascript:void(0);' data-skin='light' data-toggle='m-tooltip' data-placement='top' data-original-title='Delete Software' onClick={deleteSoftware} className='btn btn-info m-btn m-btn--icon btn-sm m-btn--icon-only  m-btn--pill m-btn--air'>
                <i className='fa flaticon-delete-1 fa-2x' />
              </a>&nbsp;&nbsp;
              <a href='javascript:void(0);' data-skin='light' data-toggle='m-tooltip' data-placement='top' data-original-title='Initiate Discussion' onClick={openDiscussionModal} className='btn btn-info m-btn m-btn--icon btn-sm m-btn--icon-only  m-btn--pill m-btn--air'>
                <i className='fa flaticon-multimedia-3 fa-2x' />
              </a>
            </span>
          </div>
        </div>
        <br />
        <div className='row'>
          <div className='col-xl-6'>
            <div className='m-portlet m-portlet--bordered-semi m-portlet--widget-fit m-portlet--skin-light  m-portlet--rounded-force'>
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
                          <i className='flaticon-file m--font-brand' />
                        </span>
                        <span className='m-widget17__subtitle'>
                          <h3>Instances</h3>
                          <h5 style={{'float': 'right', 'paddingRight': '25px', 'marginTop': '-35px'}}>{softwareInstances}</h5>
                        </span>
                        {/* <span className='m-widget17__desc'>
                          <h1>{softwareCount}</h1>
                        </span> */}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='col-xl-6'>
            {/* <div className='m-portlet m-portlet--full-height'>
              <div className='m-portlet__body'>
                <div className='m-widget12'>
                  <div className='m-widget12__item'>
                    <span className='m-widget12__text1'>
                      <h1>Total Cost</h1>
                      <br />
                      <h2 className='pull-right'>{'R ' + formatAmount(softwareCost)}</h2>
                    </span>
                  </div>
                </div>
              </div>
            </div> */}
            <div className='m-portlet m-portlet--bordered-semi m-portlet--widget-fit m-portlet--skin-light  m-portlet--rounded-force'>
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
                          <i className='flaticon-file m--font-brand' />
                        </span>
                        <span className='m-widget17__subtitle'>
                          <h3>Total Cost</h3>
                          <h5 style={{'float': 'right', 'paddingRight': '25px', 'marginTop': '-35px'}}>{'R ' + formatAmount(softwareCost)}</h5>
                        </span>
                        {/* <span className='m-widget17__desc'>
                          <h1>{softwareCount}</h1>
                        </span> */}
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
                    {softwarePropertiesList}
                  </table>
                </div>
                <div className={'tab-pane' + showRelationships} id='m_tabs_3_2' role='tabpanel'>
                  {/* <div className='pull-right'>
                    <button onClick={openModal} className={'btn btn-sm btn-outline-info pull-right'}>Add Relationship</button>
                  </div> */}
                  <div className={'row'} style={{'marginTop': '20px'}}>
                    <div className='m--space-10' />
                    <div className='accordion m-accordion m-accordion--bordered' id='m_accordion_2' role='tablist' aria-multiselectable='true'>
                      {parentSoftwareRelationshipList}
                      {outgoingSoftwareRelationshipList}
                      {incomingSoftwareRelationshipList}
                      {childSoftwareRelationshipList}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='col-md-7'>
            {/* <DataModelComponent startNode={startNode} relationships={modelRelationshipData} /> */}
            {/* <img alt='model' src='https://via.placeholder.com/900x545?text=Model%20Visualization' /> */}
            <div className='row'>
              <div id='divPaperWrapper' style={divStyle}>
                <DataModelComponent startNode={startNode} relationships={modelRelationshipData} />
                {/* <DataModelComponent /> */}
              </div>
            </div>
          </div>
        </div>
        <div>
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
                    {props.addSettings.updateResponse === null && (<h4 className='modal-title' id='exampleModalLabel'>Edit Software</h4>)}
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
          <ReactModal isOpen={props.addSettings.isDeleteModalOpen}
            onRequestClose={closeDeleteModal}
            className=''
            style={customStylescrud}
            >
            <div className={''}>
              <div className='modal-dialog'>
                <div className='modal-content'>
                  <div className='modal-header'>
                    <h6 className='modal-title' id='exampleModalLabel'>Deleting the {'Software'} {softwareName}</h6>
                    <button type='button' onClick={closeDeleteModal} className='close' data-dismiss='modal' aria-label='Close'>
                      <span aria-hidden='true'>×</span>
                    </button>
                  </div>
                  <div className='modal-body'>
                    <h6>are you sure?</h6>
                  </div>
                  <div className='modal-footer'>
                    <div className='row'>
                      <div className='col-md-6'>
                        <div className='btn-group m-btn-group m-btn-group--pill ' role='group' aria-label='...'>
                          <button type='button' onClick={closeDeleteModal} className='m-btn btn btn-secondary'>Back</button>
                          <button type='button' onClick={removeSoftware} className='m-btn btn btn-secondary'>Delete</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </ReactModal>
        </div>
        <Discussion name={softwareName} type='Component' {...props} />
        <NewDiscussion contextId={contextId} name={softwareName} type='Component' {...props} />
      </div>
      )
    }
 Softwareview.propTypes = {
  match: PropTypes.any,
  softwarebyId: PropTypes.any,
  softwareProperties: PropTypes.any,
  softwareRelationships: PropTypes.any,
  showTabs: PropTypes.any,
  addSettings: PropTypes.any,
  connectionData: PropTypes.any
}
