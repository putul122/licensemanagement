import React from 'react'
import moment from 'moment'
import PropTypes from 'prop-types'
import styles from './entitlementDetailComponent.scss'
import DataModelComponent from '../dataModel/dataModelComponent'
import _ from 'lodash'
import ReactModal from 'react-modal'
import Select from 'react-select'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
ReactModal.setAppElement('#root')
var divStyle = {
  width: '900px',
  height: '600px',
  // 'overflowY': 'scroll',
  // 'overflowX': 'scroll',
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
const customStyles = {
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
  console.log(props)
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
    event.preventDefault()
    let updateEntitlementSettings = {...props.updateEntitlementSettings, isConfirmationModalOpen: true}
    props.setUpdateEntitlementSettings(updateEntitlementSettings)
  }
  let closeConfirmationModal = function (event) {
    event.preventDefault()
    let updateEntitlementSettings = {...props.updateEntitlementSettings, isConfirmationModalOpen: false}
    props.setUpdateEntitlementSettings(updateEntitlementSettings)
    cancelEditEntitlement()
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
  let handlePropertySelect = function (index, childIndex) {
    return function (newValue: any, actionMeta: any) {
      if (actionMeta.action === 'select-option') {
        if (newValue !== null) {
          let payload
          let typeProperty = entitlementProperties[index].properties[childIndex].type_property
          entitlementProperties[index].properties[childIndex].value_set_value = newValue
          payload = { 'op': 'replace', 'path': `/${typeProperty}/value_set_value`, 'value': {id: newValue.value} }

          if (entitlementPropertiesPayload.property.length === 0) {
            entitlementPropertiesPayload.property.push(payload)
          } else {
            if (payload.path === entitlementPropertiesPayload.property[entitlementPropertiesPayload.property.length - 1].path) {
              entitlementPropertiesPayload.property[entitlementPropertiesPayload.property.length - 1] = payload
            } else {
              entitlementPropertiesPayload.property.push(payload)
            }
          }
          let editPayload = {}
          editPayload.entitlement = entitlementData
          editPayload.property = {resources: entitlementProperties}
          props.editEntitlementProperties(editPayload)
          props.pushEntitlementPropertyPayload(entitlementPropertiesPayload)
        }
      }
      if (actionMeta.action === 'clear') {
        let payload
        let typeProperty = entitlementProperties[index].properties[childIndex].type_property
        entitlementProperties[index].properties[childIndex].value_set_value = newValue
        payload = { 'op': 'replace', 'path': `/${typeProperty}/value_set_value`, 'value': newValue }

        if (entitlementPropertiesPayload.property.length === 0) {
          entitlementPropertiesPayload.property.push(payload)
        } else {
          if (payload.path === entitlementPropertiesPayload.property[entitlementPropertiesPayload.property.length - 1].path) {
            entitlementPropertiesPayload.property[entitlementPropertiesPayload.property.length - 1] = payload
          } else {
            entitlementPropertiesPayload.property.push(payload)
          }
        }
        let editPayload = {}
        editPayload.entitlement = entitlementData
        editPayload.property = {resources: entitlementProperties}
        props.editEntitlementProperties(editPayload)
        props.pushEntitlementPropertyPayload(entitlementPropertiesPayload)
      }
    }
  }
  let editDateProperty = function (index, childIndex, value) {
    let payload
    let typeProperty = entitlementProperties[index].properties[childIndex].type_property
    let selectedDate = value.format('DD MMM YYYY')
    entitlementProperties[index].properties[childIndex].date_time_value = value.format('DD MMM YYYY')
    payload = { 'op': 'replace', 'path': `/${typeProperty}/date_time_value`, 'value': selectedDate }
    if (entitlementPropertiesPayload.property.length === 0) {
      entitlementPropertiesPayload.property.push(payload)
    } else {
      if (payload.path === entitlementPropertiesPayload.property[entitlementPropertiesPayload.property.length - 1].path) {
        entitlementPropertiesPayload.property[entitlementPropertiesPayload.property.length - 1] = payload
      } else {
        entitlementPropertiesPayload.property.push(payload)
      }
    }
    let editPayload = {}
    editPayload.entitlement = entitlementData
    editPayload.property = {resources: entitlementProperties}
    props.editEntitlementProperties(editPayload)
    props.pushEntitlementPropertyPayload(entitlementPropertiesPayload)
  }
  let editTextProperty = function (index, childIndex, value) {
    let payload
    let typeProperty = entitlementProperties[index].properties[childIndex].type_property
    if (entitlementProperties[index].properties[childIndex].property_type.key === 'Boolean') {
      entitlementProperties[index].properties[childIndex].boolean_value = value
      payload = { 'op': 'replace', 'path': `/${typeProperty}/boolean_value`, 'value': value }
    } else if (entitlementProperties[index].properties[childIndex].property_type.key === 'Integer') {
      entitlementProperties[index].properties[childIndex].int_value = value
      payload = { 'op': 'replace', 'path': `/${typeProperty}/int_value`, 'value': value }
    } else if (entitlementProperties[index].properties[childIndex].property_type.key === 'Decimal') {
      entitlementProperties[index].properties[childIndex].float_value = value
      payload = { 'op': 'replace', 'path': `/${typeProperty}/float_value`, 'value': value }
    } else if (entitlementProperties[index].properties[childIndex].property_type.key === 'DateTime') {
      entitlementProperties[index].properties[childIndex].date_time_value = value
      payload = { 'op': 'replace', 'path': `/${typeProperty}/date_time_value`, 'value': value }
    } else if (entitlementProperties[index].properties[childIndex].property_type.key === 'Text') {
      entitlementProperties[index].properties[childIndex].text_value = value
      payload = { 'op': 'replace', 'path': `/${typeProperty}/text_value`, 'value': value }
    } else {
      entitlementProperties[index].properties[childIndex].other_value = value
      payload = { 'op': 'replace', 'path': `/${typeProperty}/other_value`, 'value': value }
      entitlementProperties[index].properties[childIndex].showMessage = false
    }
    if (entitlementPropertiesPayload.property.length === 0) {
      entitlementPropertiesPayload.property.push(payload)
    } else {
      if (payload.path === entitlementPropertiesPayload.property[entitlementPropertiesPayload.property.length - 1].path) {
        entitlementPropertiesPayload.property[entitlementPropertiesPayload.property.length - 1] = payload
      } else {
        entitlementPropertiesPayload.property.push(payload)
      }
    }
    let editPayload = {}
    editPayload.entitlement = entitlementData
    editPayload.property = {resources: entitlementProperties}
    props.editEntitlementProperties(editPayload)
    props.pushEntitlementPropertyPayload(entitlementPropertiesPayload)
  }
  // End Code for Update Entitlement

  if (props.entitlement && props.entitlement !== '') {
    entitlementName = props.entitlement.resources[0].name
    entitlementDescription = props.entitlement.resources[0].description
    entitlementPurchased = props.entitlement.resources[0].purchased
    entitlementConsumed = props.entitlement.resources[0].consumption_ratio_percent || ''
    entitlementCost = props.entitlement.resources[0].cost
    startNode.name = props.entitlement.resources[0].name
    startNode.title = props.entitlement.resources[0].name
  }
  if (props.entitlementProperties && props.entitlementProperties !== '') {
    console.log('test', props)
    entitlementPropertiesList = props.entitlementProperties.resources.map(function (property, index) {
      let propertyProperties = property.properties
      let childProperties = propertyProperties.map(function (childProperty, childIndex) {
        let value
        let htmlElement
        // console.log('childProperty', childProperty)
        if (childProperty.property_type.key === 'Integer') {
          value = childProperty.int_value
          htmlElement = function () {
            return (<div className='col-8 form-group m-form__group has-info'>
              <input type='number' className='input-sm form-control m-input' value={value} onChange={(event) => { editTextProperty(index, childIndex, event.target.value) }} placeholder='Enter Here' />
              {false && (<div className='form-control-feedback'>should be Number</div>)}
            </div>)
          }
        } else if (childProperty.property_type.key === 'Decimal') {
          value = childProperty.float_value
          htmlElement = function () {
            return (<div className='col-8 form-group m-form__group has-info'>
              <input type='number' className='input-sm form-control m-input' value={value} onChange={(event) => { editTextProperty(index, childIndex, event.target.value) }} placeholder='Enter Here' />
              {false && (<div className='form-control-feedback'>should be Number</div>)}
            </div>)
          }
        } else if (childProperty.property_type.key === 'DateTime') {
          value = childProperty.date_time_value ? moment(childProperty.date_time_value).format('DD MMM YYYY') : ''
          htmlElement = function () {
            return (<div className='col-8 form-group m-form__group has-info'>
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
          value = childProperty.text_value
          htmlElement = function () {
            return (<div className='col-8 form-group m-form__group has-info'>
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
            return (<div className='col-8 form-group has-info'><Select
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
          value = childProperty.other_value
          htmlElement = function () {
            return (<div className='col-8 form-group m-form__group has-info'>
              <input type='text' className='input-sm form-control m-input' value={value} onChange={(event) => { editTextProperty(index, childIndex, event.target.value) }} placeholder='Enter Here' />
              {false && (<div className='form-control-feedback'>should be Text</div>)}
            </div>)
          }
        }
        return (
          <tr key={'child' + childIndex}>
            <td><span className={styles.labelbold}>{childProperty.name}</span></td>
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
  }
  if (props.entitlementRelationships && props.entitlementRelationships !== '') {
    modelRelationshipData = props.entitlementRelationships.resources
    let parent = _.filter(props.entitlementRelationships.resources, {'relationship_type': 'Parent'})
    let outgoing = _.filter(props.entitlementRelationships.resources, {'relationship_type': 'ConnectFrom'})
    outgoing = _.orderBy(outgoing, ['connection.name', 'target_component.name'], ['asc', 'asc'])
    let incoming = _.filter(props.entitlementRelationships.resources, {'relationship_type': 'ConnectTo'})
    incoming = _.orderBy(incoming, ['connection.name', 'target_component.name'], ['asc', 'asc'])
    let child = _.filter(props.entitlementRelationships.resources, {'relationship_type': 'Child'})
    let parentApplicationRelationshipListFn = function () {
      if (parent.length > 0) {
        let childElementList = parent.map(function (element, i) {
        return (<span className='row' style={{'padding': '5px'}}>
          <div className='col-md-10'><a href='javascript:void(0);'>{element.target_component.name}</a></div>
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
    let childApplicationRelationshipListFn = function () {
      if (child.length > 0) {
        let childElementList = child.map(function (element, i) {
        return (<span className='row' style={{'padding': '5px'}}>
          <div className='col-md-10'><a href='javascript:void(0);'>{element.target_component.name}</a></div>
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
                let childElementList = outgoingGroup[connectionKey][targetComponentTypeKey].map(function (element, i) {
                  return (<span className='row' style={{'padding': '5px'}}>
                    <div className='col-md-10'><a href='javascript:void(0);'>{element.target_component.name}</a></div>
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
                let childElementList = incomingGroup[connectionKey][targetComponentTypeKey].map(function (element, i) {
                  return (<span className='row' style={{'padding': '5px'}}>
                    <div className='col-md-10'><a href='javascript:void(0);'>{element.target_component.name}</a></div>
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

    parentApplicationRelationshipList = parentApplicationRelationshipListFn()
    outgoingApplicationRelationshipList = outgoingApplicationRelationshipListFn()
    incomingApplicationRelationshipList = incomingApplicationRelationshipListFn()
    childApplicationRelationshipList = childApplicationRelationshipListFn()
  }
    return (
      <div>
        <div className='row'>
          <div className='col-md-9'>
            {!props.isEditComponent && (<h2>{entitlementName}</h2>)}
            {props.isEditComponent && (<div className='col-6 form-group m-form__group has-danger'>
              <input type='text' className='form-control m-input' onChange={editEntitlementName} value={entitlementName} placeholder='Entitlement Name' aria-describedby='basic-addon2' />
              </div>)}
            <br />
            {props.isEditComponent && (<div className='col-6 form-group m-form__group has-danger'>
              <input type='text' className='form-control m-input' onChange={editEntitlementDescription} value={entitlementDescription} placeholder='Entitlement Description' aria-describedby='basic-addon2' />
            </div>)}
          </div>
          {!props.isEditComponent && (
          <div className='col-md-3 pull-right' >
            <button onClick={updateEntitlement} className='btn btn-outline-info btn-sm'>Edit Entitlement</button>&nbsp;
            <button onClick={deleteEntitlement} className='btn btn-outline-info btn-sm'>Delete Entitlement</button>&nbsp;
          </div>
          )}
          {props.isEditComponent && (
          <div className='col-md-2' >
            <button onClick={cancelEditEntitlement} className='btn btn-outline-info btn-sm'>Cancel</button>&nbsp;
            <button onClick={saveEntitlementProperty} className='btn btn-outline-info btn-sm'>Save</button>&nbsp;
          </div>
          )}
        </div>
        <div className='row'>
          <div className='col-md-4'>
            <div className='m-portlet m-portlet--full-height'>
              <div className='m-portlet__body'>
                <div className='m-widget12'>
                  <div className='m-widget12__item'>
                    <span className='m-widget12__text1'>
                      <h1>Purchased&nbsp;&nbsp;</h1>
                    </span>
                    <span className='m-widget12__text2'>
                      <h1>{entitlementPurchased}</h1>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='col-md-4'>
            <div className='m-portlet m-portlet--full-height'>
              <div className='m-portlet__body'>
                <div className='m-widget12'>
                  <div className='m-widget12__item'>
                    <span className='m-widget12__text1'>
                      <h1>Consumed&nbsp;&nbsp;</h1>
                    </span>
                    <span className='m-widget12__text2'>
                      <h1>{Number(entitlementConsumed).toFixed(2) + '%'}</h1>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='col-md-4'>
            <div className='m-portlet m-portlet--full-height'>
              <div className='m-portlet__body'>
                <div className='m-widget12'>
                  <div className='m-widget12__item'>
                    <span className='m-widget12__text1'>
                      <h1>Cost</h1>
                      <br />
                      <h2 className='pull-right'> R {formatAmount(entitlementCost)}</h2>
                    </span>
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
              <ul className='nav nav-tabs nav-fill' role='tablist'>
                <li className='nav-item'>
                  <a className='nav-link active show' data-toggle='tab' href='#m_tabs_3_1'>Properties</a>
                </li>
                <li className='nav-item'>
                  <a className='nav-link' data-toggle='tab' href='#m_tabs_3_2'>RelationShips</a>
                </li>
              </ul>
              <div className={styles.tabcontentborder}>
                <div className='tab-content'>
                  <div className='tab-pane active' id='m_tabs_3_1' role='tabpanel'>
                    <div className='col-md-12'>
                      <table className={'table ' + styles.borderless}>
                        {entitlementPropertiesList}
                      </table>
                    </div>
                  </div>
                  <div className='tab-pane' id='m_tabs_3_2' role='tabpanel'>
                    <div className='m-accordion m-accordion--bordered' id='m_accordion_2' role='tablist'>
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
            style={customStyles} >
            {/* <button onClick={closeModal} ><i className='la la-close' /></button> */}
            <div className={styles.modalwidth}>
              <div className='modal-dialog'>
                <div className='modal-content'>
                  <div className='modal-header'>
                    <h4 className='modal-title' id='exampleModalLabel'>Confirmation</h4>
                  </div>
                  <div className='modal-body'>
                    <p className={styles.confirmsg}>Some of the required properties do not have any values.</p>
                    <p className={styles.confirmsg}>Are you sure you want to continue?</p>
                  </div>
                  <div className='modal-footer'>
                    <button onClick={closeConfirmationModal} className='btn btn-sm btn-outline-info'>Back</button>
                    <button onClick={submitUpdates} className='btn btn-sm btn-outline-info'>Submit Updates</button>
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
                    <button type='button' onClick={closeDeleteModal} id='m_login_signup' className={'btn btn-outline-info'}>Back</button>
                    <button type='button' id='m_login_signup' className={'btn btn-outline-info'} onClick={removeEntitlement}>Delete</button>
                  </div>
                </div>
              </div>
            </div>
          </ReactModal>
        </div>
      </div>
      )
    }
EntitlementDetail.propTypes = {
    entitlement: PropTypes.any,
    entitlementProperties: PropTypes.any,
    entitlementRelationships: PropTypes.any,
    updateEntitlementSettings: PropTypes.any,
    isEditComponent: PropTypes.any,
    entitlementPropertiesPayload: PropTypes.any,
    copiedEntitlementProperties: PropTypes.any,
    copiedEntitlementData: PropTypes.any
 }
