import React from 'react'
import moment from 'moment'
import PropTypes from 'prop-types'
import styles from './applicationDetailComponent.scss'
import debounce from 'lodash/debounce'
import DataModelComponent from '../../containers/dataModel/dataModelContainer'
import Discussion from '../../containers/discussion/discussionContainer'
import NewDiscussion from '../../containers/newDiscussion/newDiscussionContainer'
import _ from 'lodash'
import Select from 'react-select'
import ReactModal from 'react-modal'
ReactModal.setAppElement('#root')
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

export default function Applicationview (props) {
  console.log('Single Application Data', props)
  let applicationName = ''
  let applicationCount = ''
  let applicationCost = ''
  let applicationPropertiesList = ''
  let parentApplicationRelationshipList = ''
  let outgoingApplicationRelationshipList = ''
  let incomingApplicationRelationshipList = ''
  let childApplicationRelationshipList = ''
  let modelRelationshipData = ''
  let showProperties = props.showTabs.showProperty
  let showRelationships = props.showTabs.showRelationship
  let showApplication = props.showTabs.parentTab === 'Application' ? ' active show' : ''
  let showSoftware = props.showTabs.parentTab === 'Software' ? ' active show' : ''
  let showEntitlements = props.showTabs.parentTab === 'Entitlements' ? ' active show' : ''
  let startNode = {}
  let contextId = props.match.params.id
  let openDiscussionModal = function (event) {
    event.preventDefault()
    props.setDiscussionModalOpenStatus(true)
  }
  // code for Link Management
  let handleLicenseCountChange = function (event) {
    let linkActionSettings = {...props.linkActionSettings, 'licenseCount': event.target.value}
    props.setLinkActionSettings(linkActionSettings)
  }
  let handleEntitlementSelect = function (newValue: any, actionMeta: any) {
    if (actionMeta.action === 'select-option') {
      let linkActionSettings = {...props.linkActionSettings, 'entitlement': newValue}
      props.setLinkActionSettings(linkActionSettings)
    }
    if (actionMeta.action === 'clear') {
      let linkActionSettings = {...props.linkActionSettings, 'entitlement': null}
      props.setLinkActionSettings(linkActionSettings)
    }
  }
  let handleAgreementSelect = function (newValue: any, actionMeta: any) {
    if (actionMeta.action === 'select-option') {
      let linkActionSettings = {...props.linkActionSettings, 'agreement': newValue}
      props.setLinkActionSettings(linkActionSettings)
    }
    if (actionMeta.action === 'clear') {
      let linkActionSettings = {...props.linkActionSettings, 'agreement': null}
      props.setLinkActionSettings(linkActionSettings)
    }
  }
  let handleSupplierSelect = function (newValue: any, actionMeta: any) {
    if (actionMeta.action === 'select-option') {
      let linkActionSettings = {...props.linkActionSettings, 'supplier': newValue, 'agreement': null, 'entitlement': null}
      props.setLinkActionSettings(linkActionSettings)
    }
    if (actionMeta.action === 'clear') {
      let linkActionSettings = {...props.linkActionSettings, 'supplier': null}
      props.setLinkActionSettings(linkActionSettings)
    }
  }
  let handleSoftwareSelect = function (newValue: any, actionMeta: any) {
    if (actionMeta.action === 'select-option') {
      let linkActionSettings = {...props.linkActionSettings, 'software': newValue}
      props.setLinkActionSettings(linkActionSettings)
    }
    if (actionMeta.action === 'clear') {
      let linkActionSettings = {...props.linkActionSettings, 'software': null}
      props.setLinkActionSettings(linkActionSettings)
    }
  }
  let openLinkAddModal = function (event) {
    event.preventDefault()
    let linkActionSettings = {...props.linkActionSettings,
      'isLinkDeleteModalOpen': false,
      'isLinkUpdateModalOpen': false,
      'isLinkModalOpen': true,
      'selectedObject': null,
      'entitlement': null,
      'agreement': null,
      'supplier': null,
      'software': null,
      'licenseCount': 0}
    props.setLinkActionSettings(linkActionSettings)
   }
  let openLinkDeleteModal = function (data) {
    console.log('*&&&*&&', data)
    let linkActionSettings = {...props.linkActionSettings, 'isLinkDeleteModalOpen': true, 'selectedObject': data, 'licenseCount': data.license_count}
    props.setLinkActionSettings(linkActionSettings)
  }
  let openLinkUpdateModal = function (data) {
    console.log('*&&&*&&', data)
    let linkActionSettings = {...props.linkActionSettings, 'isLinkUpdateModalOpen': true, 'selectedObject': data, 'licenseCount': data.license_count}
    props.setLinkActionSettings(linkActionSettings)
  }
  let closeLinkModal = function () {
    let linkActionSettings = {...props.linkActionSettings,
      'isLinkDeleteModalOpen': false,
      'isLinkUpdateModalOpen': false,
      'isLinkModalOpen': false,
      'selectedObject': null,
      'licenseCount': 0}
    props.setLinkActionSettings(linkActionSettings)
  }
  let addLinkOperation = function (event) {
    event.preventDefault()
    // eslint-disable-next-line
    mApp.blockPage({overlayColor:'#000000',type:'loader',state:'success',message:'Processing...'})
    let dataPayload = []
    if (props.linkActionSettings.entitlement) {
      let obj = {}
      obj.op = 'add'
      obj.path = '/-'
      obj.value = {
        id: props.linkActionSettings.entitlement.id,
        license_count: parseInt(props.linkActionSettings.licenseCount)
      }
      dataPayload.push(obj)
    }
    // if (props.linkActionSettings.agreement) {
    //   let obj = {}
    //   obj.op = 'add'
    //   obj.path = '/-'
    //   obj.value = {
    //     id: props.linkActionSettings.agreement.id,
    //     license_count: parseInt(props.linkActionSettings.licenseCount)
    //   }
    //   dataPayload.push(obj)
    // }
    // if (props.linkActionSettings.supplier) {
    //   let obj = {}
    //   obj.op = 'add'
    //   obj.path = '/-'
    //   obj.value = {
    //     id: props.linkActionSettings.supplier.id,
    //     license_count: parseInt(props.linkActionSettings.licenseCount)
    //   }
    //   dataPayload.push(obj)
    // }
    if (props.linkActionSettings.software) {
      let obj = {}
      obj.op = 'add'
      obj.path = '/-'
      obj.value = {
        id: props.linkActionSettings.software.id
      }
      dataPayload.push(obj)
    }
    let applicationId = props.match.params.id
    let payload = {}
    if (showTabs.parentTab === 'Entitlements') {
      payload.tab = 'Entitlements'
    } else if (showTabs.parentTab === 'Software') {
      payload.tab = 'Software'
    }
    payload.applicationId = applicationId
    payload.data = dataPayload
    console.log('payload', payload)
    props.addLink(payload)
    // closeLinkEntitlementModal()
  }
  let editLinkOperation = function (event) {
    event.preventDefault()
    // eslint-disable-next-line
    mApp.blockPage({overlayColor:'#000000',type:'loader',state:'success',message:'Processing...'})
    let dataPayload = []
    let obj = {}
    obj.op = 'replace'
    obj.path = '/' + props.linkActionSettings.selectedObject.connection_id + '/license_count'
    obj.value = parseInt(props.linkActionSettings.licenseCount)
    dataPayload.push(obj)
    let applicationId = props.match.params.id
    let payload = {}
    payload.applicationId = applicationId
    payload.data = dataPayload
    if (showTabs.parentTab === 'Entitlements') {
      payload.tab = 'Entitlements'
    } else if (showTabs.parentTab === 'Software') {
      payload.tab = 'Software'
    }
    console.log('payload', payload)
    props.updateLink(payload)
  }
  let deleteLinkOperation = function (event) {
    event.preventDefault()
    // eslint-disable-next-line
    mApp.blockPage({overlayColor:'#000000',type:'loader',state:'success',message:'Processing...'})
    let dataPayload = []
    let obj = {}
    obj.op = 'remove'
    obj.path = '/' + props.linkActionSettings.selectedObject.connection_id
    dataPayload.push(obj)
    let applicationId = props.match.params.id
    let payload = {}
    payload.applicationId = applicationId
    payload.data = dataPayload
    console.log('payload', payload)
    props.deleteLink(payload)
  }
  // end code for link management
  // Entitlement and Software tab
  let searchTextBox
  let applicationEntitlementList = ''
  let applicationSoftwareList = ''
  let listEntitlementPage = []
  let listSoftwarePage = []
  let entitlementPageArray = []
  let softwarePageArray = []
  let totalEntitlementPages
  let totalSoftwarePages
  let paginationLimit = 6
  let nextClass = ''
  let previousClass = ''
  let perPage = props.perPage
  let currentPage = props.currentPage
  let showTabs = {...props.showTabs}
  let selectEntitlementOptions = []
  let selectSupplierOptions = []
  let selectAgreementOptions = []
  let selectSoftwareOptions = []
  let handleSearchChange = debounce((e) => {
    console.log(e)
    if (searchTextBox) {
      const value = searchTextBox ? searchTextBox.value : ''
      props.setCurrentPage(1)
      let payload = {
        'application_id': props.match.params.id,
        'search': value || '',
        'page_size': props.perPage,
        'page': 1
      }
      // eslint-disable-next-line
      mApp.blockPage({overlayColor:'#000000',type:'loader',state:'success',message:'Processing...'})
      if (showTabs.parentTab === 'Entitlements') {
        props.fetchApplicationEntitlements && props.fetchApplicationEntitlements(payload)
      } else if (showTabs.parentTab === 'Software') {
        props.fetchApplicationSoftwares && props.fetchApplicationSoftwares(payload)
      }
      // listPage = _.filter(pageArray, function (group) {
      //   let found = _.filter(group, {'number': currentPage})
      //   if (found.length > 0) { return group }
      // })
    } else {
      props.setCurrentPage(1)
      let payload = {
        'application_id': props.match.params.id,
        'search': '',
        'page_size': props.perPage,
        'page': 1
      }
      // eslint-disable-next-line
      mApp.blockPage({overlayColor:'#000000',type:'loader',state:'success',message:'Processing...'})
      if (showTabs.parentTab === 'Entitlements') {
        props.fetchApplicationEntitlements && props.fetchApplicationEntitlements(payload)
      } else if (showTabs.parentTab === 'Software') {
        props.fetchApplicationSoftwares && props.fetchApplicationSoftwares(payload)
      }
    }
  }, 500)
  if (props.entitlements !== '' && props.allEntitlements !== '' && props.entitlements.error_code === null && props.allEntitlements.error_code === null) {
    let linkActionSettings = {...props.linkActionSettings}
    let entitlementData = []
    if (linkActionSettings.supplier !== null || linkActionSettings.agreement !== null) {
      // agreementData = _.filter(props.agreements.resources, {'supplier': linkActionSettings.supplier.name})
      if (linkActionSettings.supplier !== null && linkActionSettings.agreement === null) {
        if (props.entitlements.resources.length > 0) {
          // all datas are in object fields
          for (let supplier in props.entitlements.resources[0]) {
            if (props.entitlements.resources[0].hasOwnProperty(supplier)) {
              if (supplier && supplier === linkActionSettings.supplier.name) {
                for (let agreement in props.entitlements.resources[0][supplier]) {
                  if (props.entitlements.resources[0][supplier].hasOwnProperty(agreement)) {
                    if (agreement) {
                      entitlementData = props.entitlements.resources[0][supplier][agreement]
                    }
                  }
                }
              }
            }
          }
        }
        console.log(entitlementData)
        if (entitlementData.length > 0) {
          selectEntitlementOptions = entitlementData.map((component, index) => {
            let option = {...component}
            option.value = component.name
            option.label = component.name
            return option
          })
        }
      } else if (linkActionSettings.supplier === null && linkActionSettings.agreement !== null) {
        if (props.entitlements.resources.length > 0) {
          // all datas are in object fields
          for (let supplier in props.entitlements.resources[0]) {
            if (props.entitlements.resources[0].hasOwnProperty(supplier)) {
              if (supplier) {
                for (let agreement in props.entitlements.resources[0][supplier]) {
                  if (props.entitlements.resources[0][supplier].hasOwnProperty(agreement)) {
                    if (agreement && agreement === linkActionSettings.agreement.name) {
                      entitlementData = props.entitlements.resources[0][supplier][agreement]
                    }
                  }
                }
              }
            }
          }
        }
        console.log(entitlementData)
        if (entitlementData.length > 0) {
          selectEntitlementOptions = entitlementData.map((component, index) => {
            let option = {...component}
            option.value = component.name
            option.label = component.name
            return option
          })
        }
      } else if (linkActionSettings.supplier !== null && linkActionSettings.agreement !== null) {
        if (props.entitlements.resources.length > 0) {
          // all datas are in object fields
          for (let supplier in props.entitlements.resources[0]) {
            if (props.entitlements.resources[0].hasOwnProperty(supplier)) {
              if (supplier && supplier === linkActionSettings.supplier.name) {
                for (let agreement in props.entitlements.resources[0][supplier]) {
                  if (props.entitlements.resources[0][supplier].hasOwnProperty(agreement)) {
                    if (agreement && agreement === linkActionSettings.agreement.name) {
                      entitlementData = props.entitlements.resources[0][supplier][agreement]
                    }
                  }
                }
              }
            }
          }
        }
        console.log(entitlementData)
        if (entitlementData.length > 0) {
          selectEntitlementOptions = entitlementData.map((component, index) => {
            let option = {...component}
            option.value = component.name
            option.label = component.name
            return option
          })
        }
      }
    } else {
      selectEntitlementOptions = props.allEntitlements.resources.map((component, index) => {
        let option = {...component}
        option.value = component.name
        option.label = component.name
        return option
      })
    }
  }
  if (props.agreements !== '' && props.agreements.error_code === null) {
    let linkActionSettings = {...props.linkActionSettings}
    let agreementData = []
    if (linkActionSettings.supplier !== null) {
      agreementData = _.filter(props.agreements.resources, {'supplier': linkActionSettings.supplier.name})
    } else {
      selectAgreementOptions = props.agreements.resources.map((component, index) => {
        let option = {...component}
        option.value = component.name
        option.label = component.name
        return option
      })
    }
    if (agreementData.length > 0) {
      selectAgreementOptions = agreementData.map((component, index) => {
        let option = {...component}
        option.value = component.name
        option.label = component.name
        return option
      })
    }
  }
  if (props.suppliers !== '' && props.suppliers.error_code === null) {
    selectSupplierOptions = props.suppliers.resources.map((component, index) => {
      let option = {...component}
      option.value = component.name
      option.label = component.name
      return option
    })
  }
  if (props.softwares !== '' && props.softwares.error_code === null) {
    selectSoftwareOptions = props.softwares.resources.map((component, index) => {
      let option = {...component}
      option.value = component.name
      option.label = component.name
      return option
    })
    console.log('selectSoftwareOptions', selectSoftwareOptions)
  }
  let listApplicationEntitlements = function () {
    if (props.applicationEntitlements !== '') {
      if (props.applicationEntitlements.resources.length > 0) {
        applicationEntitlementList = props.applicationEntitlements.resources.slice(perPage * (currentPage - 1), ((currentPage - 1) + 1) * perPage).map(function (data, index) {
          return (
            <tr key={index}>
              <td>{data.entitlement.supplier}</td>
              <td><a href={'/entitlements/' + data.id}>{data.entitlement.name}</a></td>
              <td>{data.entitlement.part_number}</td>
              {/* <td>{data.entitlement.purchased}</td> */}
              <td className={(data.entitlement.purchased < data.entitlement.consumed) ? styles.danger : styles.success}>{data.entitlement.purchased}</td>
              <td>{data.entitlement.consumed}</td>
              <td>{data.entitlement.reserved}</td>
              <td>{data.entitlement.bu_allocated}</td>
              <td>{data.license_count}</td>
              <td>{'R ' + formatAmount(data.license_count * data.license_unit_cost)}</td>
              <td>
                <div className='m-btn-group m-btn-group--pill btn-group' role='group' aria-label='First group'>
                  <button type='button' onClick={(event) => { event.preventDefault(); openLinkUpdateModal(data) }} className='m-btn btn btn-info'><i className='fa flaticon-edit-1' /></button>
                  <button type='button' onClick={(event) => { event.preventDefault(); openLinkDeleteModal(data) }} className='m-btn btn btn-danger'><i className='fa flaticon-delete-1' /></button>
                </div>
              </td>
            </tr>
          )
        })
      } else {
        applicationEntitlementList = []
        applicationEntitlementList.push((
          <tr key={0}>
            <td colSpan='4'>{'No data to display'}</td>
          </tr>
        ))
      }
    }
  }
  let listApplicationSoftwares = function () {
    if (props.applicationSoftwares !== '') {
      if (props.applicationSoftwares.resources.length > 0) {
        applicationSoftwareList = props.applicationSoftwares.resources.slice(perPage * (currentPage - 1), ((currentPage - 1) + 1) * perPage).map(function (data, index) {
          return (
            <tr key={index}>
              <td>{data.supplier}</td>
              <td>{data.name}</td>
              <td>{moment(data.end_of_service_life).format('DD MMM YYYY')}</td>
              <td>
                <div className='m-btn-group m-btn-group--pill btn-group' role='group' aria-label='First group'>
                  <button type='button' onClick={(event) => { event.preventDefault(); openLinkDeleteModal(data) }} className='m-btn btn btn-danger'><i className='fa flaticon-delete-1' /></button>
                </div>
              </td>
            </tr>
          )
        })
      } else {
        applicationSoftwareList = []
        applicationSoftwareList.push((
          <tr key={0}>
            <td colSpan='4'>{'No data to display'}</td>
          </tr>
        ))
      }
    }
  }
  if (showTabs.parentTab === 'Entitlements') {
    if (currentPage === 1) {
      previousClass = 'm-datatable__pager-link--disabled'
    }
    if (currentPage === totalEntitlementPages) {
      nextClass = 'm-datatable__pager-link--disabled'
    }
  } else if (showTabs.parentTab === 'Software') {
    if (currentPage === 1) {
      previousClass = 'm-datatable__pager-link--disabled'
    }
    if (currentPage === totalSoftwarePages) {
      nextClass = 'm-datatable__pager-link--disabled'
    }
  }
  if (props.applicationEntitlements && props.applicationEntitlements !== '') {
    totalEntitlementPages = Math.ceil(props.applicationEntitlements.resources.length / perPage)
    let i = 1
    while (i <= totalEntitlementPages) {
      let pageParameter = {}
      pageParameter.number = i
      pageParameter.class = ''
      entitlementPageArray.push(pageParameter)
      i++
    }
    entitlementPageArray = _.chunk(entitlementPageArray, paginationLimit)
    listEntitlementPage = _.filter(entitlementPageArray, function (group) {
      let found = _.filter(group, {'number': currentPage})
      if (found.length > 0) { return group }
    })
    // List initial data for Application Entitlements
    listApplicationEntitlements()
  }
  if (props.applicationSoftwares && props.applicationSoftwares !== '') {
    totalSoftwarePages = Math.ceil(props.applicationSoftwares.resources.length / perPage)
    let i = 1
    while (i <= totalSoftwarePages) {
      let pageParameter = {}
      pageParameter.number = i
      pageParameter.class = ''
      softwarePageArray.push(pageParameter)
      i++
    }
    softwarePageArray = _.chunk(softwarePageArray, paginationLimit)
    listSoftwarePage = _.filter(softwarePageArray, function (group) {
      let found = _.filter(group, {'number': currentPage})
      if (found.length > 0) { return group }
    })
    // List initial data for Application Software
    listApplicationSoftwares()
  }
  let handleListAndPagination = function (page) {
    if (showTabs.parentTab === 'Entitlements') {
      listApplicationEntitlements()
      // eslint-disable-next-line
      mApp && mApp.block('#bussinessUnitsAllList', {overlayColor:'#000000',type:'loader',state:'success',message:'Processing...'})
      props.setCurrentPage(page)
      listEntitlementPage = _.filter(entitlementPageArray, function (group) {
        let found = _.filter(group, {'number': page})
        if (found.length > 0) { return group }
      })
    } else if (showTabs.parentTab === 'Software') {
      // eslint-disable-next-line
      mApp && mApp.block('#bussinessUnitsAllList', {overlayColor:'#000000',type:'loader',state:'success',message:'Processing...'})
      listApplicationSoftwares()
      props.setCurrentPage(page)
      listSoftwarePage = _.filter(softwarePageArray, function (group) {
        let found = _.filter(group, {'number': page})
        if (found.length > 0) { return group }
      })
    }
  }
  let handlePage = function (page) {
    if (showTabs.parentTab === 'Entitlements') {
      if (page === 1) {
        previousClass = 'm-datatable__pager-link--disabled'
      } else if (page === totalEntitlementPages) {
        nextClass = 'm-datatable__pager-link--disabled'
      }
      handleListAndPagination(page)
    } else if (showTabs.parentTab === 'Software') {
      if (page === 1) {
        previousClass = 'm-datatable__pager-link--disabled'
      } else if (page === totalSoftwarePages) {
        nextClass = 'm-datatable__pager-link--disabled'
      }
      handleListAndPagination(page)
    }
  }

  let handlePrevious = function (event) {
    event.preventDefault()
    if (currentPage === 1) {
      previousClass = styles.disabled
    } else {
      props.setCurrentPage(currentPage - 1)
      handleListAndPagination(currentPage - 1)
    }
  }

  let handleNext = function (event) {
    event.preventDefault()
    if (showTabs.parentTab === 'Entitlements') {
      if (currentPage === totalEntitlementPages) {
        nextClass = styles.disabled
      } else {
        props.setCurrentPage(currentPage + 1)
        handleListAndPagination(currentPage + 1)
      }
    } else if (showTabs.parentTab === 'Software') {
      if (currentPage === totalSoftwarePages) {
        nextClass = styles.disabled
      } else {
        props.setCurrentPage(currentPage + 1)
        handleListAndPagination(currentPage + 1)
      }
    }
  }
  // End entitlement tab code
  let handleCheckbox = function (value, data) {
    let displayIndex = data.displayIndex
    let applicationRelationshipData = JSON.parse(JSON.stringify(props.applicationRelationshipData))
    let index = _.findIndex(applicationRelationshipData, {displayIndex: displayIndex})
    let checkedObject = applicationRelationshipData[index]
    checkedObject.isDisplay = value
    applicationRelationshipData[index] = checkedObject
    props.setApplicationRelationship(applicationRelationshipData)
  }
  let handleGroupCheckbox = function (value, checkData) {
    console.log('handle group checkbox', value, checkData)
    let applicationRelationshipData = JSON.parse(JSON.stringify(props.applicationRelationshipData))
    if (checkData.relationshipType === 'Parent') {
      let parent = _.filter(props.applicationRelationshipData, {'relationship_type': 'Parent'})
      if (parent.length > 0) {
        parent.forEach(function (data, id) {
          let index = _.findIndex(applicationRelationshipData, {displayIndex: data.displayIndex})
          let checkedObject = applicationRelationshipData[index]
          checkedObject.isDisplay = value
          applicationRelationshipData[index] = checkedObject
        })
      }
    } else if (checkData.relationshipType === 'Child') {
      let child = _.filter(props.applicationRelationshipData, {'relationship_type': 'Child'})
      if (child.length > 0) {
        child.forEach(function (data, isCheckboxChecked) {
          let index = _.findIndex(applicationRelationshipData, {displayIndex: data.displayIndex})
          let checkedObject = applicationRelationshipData[index]
          checkedObject.isDisplay = value
          applicationRelationshipData[index] = checkedObject
        })
      }
    } else if (checkData.relationshipType === 'ConnectFrom') {
      let outgoing = _.filter(props.applicationRelationshipData, {'relationship_type': 'ConnectFrom'})
      outgoing = _.filter(outgoing, function (data) {
        return data.connection.name === checkData.connectionName
      })
      outgoing = _.filter(outgoing, function (data) {
        return data.target_component.component_type.name === checkData.targetComponentTypeName
      })
      if (outgoing.length > 0) {
        outgoing.forEach(function (data, id) {
          let index = _.findIndex(applicationRelationshipData, {displayIndex: data.displayIndex})
          let checkedObject = applicationRelationshipData[index]
          checkedObject.isDisplay = value
          applicationRelationshipData[index] = checkedObject
        })
      }
    } else if (checkData.relationshipType === 'ConnectTo') {
      let incoming = _.filter(props.applicationRelationshipData, {'relationship_type': 'ConnectTo'})
      incoming = _.filter(incoming, function (data) {
        return data.connection.name === checkData.connectionName
      })
      incoming = _.filter(incoming, function (data) {
        return data.target_component.component_type.name === checkData.targetComponentTypeName
      })
      if (incoming.length > 0) {
        incoming.forEach(function (data, id) {
          let index = _.findIndex(applicationRelationshipData, {displayIndex: data.displayIndex})
          let checkedObject = applicationRelationshipData[index]
          checkedObject.isDisplay = value
          applicationRelationshipData[index] = checkedObject
        })
      }
    }
    console.log('applicationRelationshipData', applicationRelationshipData)
    // let displayIndex = data.displayIndex
    // let index = _.findIndex(applicationRelationshipData, {displayIndex: displayIndex})
    // let checkedObject = applicationRelationshipData[index]
    // checkedObject.isDisplay = value
    // applicationRelationshipData[index] = checkedObject
    props.setApplicationRelationship(applicationRelationshipData)
  }
  let setCurrentTab = function (parentTab, childTab) {
    let showTabs = {...props.showTabs}
    if (parentTab) {
      if (parentTab === 'Application') {
        showTabs.parentTab = 'Application'
        showTabs.showProperty = ' active show'
        showTabs.showRelationship = ''
      } else if (parentTab === 'Software') {
        showTabs.parentTab = 'Software'
        showTabs.showProperty = ' active show'
        showTabs.showRelationship = ''
      } else if (parentTab === 'Entitlements') {
        showTabs.parentTab = 'Entitlements'
        showTabs.showProperty = ' active show'
        showTabs.showRelationship = ''
      }
    }
    if (childTab) {
      if (childTab === 'Property') {
        showTabs.showProperty = ' active show'
        showTabs.showRelationship = ''
      } else if (childTab === 'Relationship') {
        showTabs.showProperty = ''
        showTabs.showRelationship = ' active show'
      }
    }
    props.setCurrentTab(showTabs)
  }

  if (props.applicationbyId && props.applicationbyId !== '') {
    applicationName = props.applicationbyId.resources[0].name
    applicationCount = props.applicationbyId.resources[0].used_by_business_unit_count
    applicationCost = props.applicationbyId.resources[0].cost
    let appPackage = JSON.parse(localStorage.getItem('packages'))
    let componentTypes = appPackage.resources[0].component_types
    let componentTypeIcon = _.result(_.find(componentTypes, function (obj) {
        return obj.key === 'Application'
    }), 'icon')
    startNode.name = props.applicationbyId.resources[0].name
    startNode.title = props.applicationbyId.resources[0].name
    startNode.icon = componentTypeIcon
  }
  if (props.applicationProperties.length > 0) {
    applicationPropertiesList = props.applicationProperties.map(function (data, index) {
      return (
        <tr id={'property' + index}>
          <td><span className={styles.labelbold}>{data.name}</span></td>
          <td><span className={''}>{data.value}</span></td>
        </tr>
      )
    })
  }
  if (props.applicationRelationshipData && props.applicationRelationshipData !== '') {
    modelRelationshipData = _.filter(props.applicationRelationshipData, {'isDisplay': true})
    let parent = _.filter(props.applicationRelationshipData, {'relationship_type': 'Parent'})
    let outgoing = _.filter(props.applicationRelationshipData, {'relationship_type': 'ConnectFrom'})
    outgoing = _.orderBy(outgoing, ['connection.name', 'target_component.name'], ['asc', 'asc'])
    let incoming = _.filter(props.applicationRelationshipData, {'relationship_type': 'ConnectTo'})
    incoming = _.orderBy(incoming, ['connection.name', 'target_component.name'], ['asc', 'asc'])
    let child = _.filter(props.applicationRelationshipData, {'relationship_type': 'Child'})
    console.log('props.applicationRelationshipData', props.applicationRelationshipData)
    console.log('incoming.incoming', incoming)
    let parentApplicationRelationshipListFn = function () {
      if (parent.length > 0) {
        let isCheckboxChecked = false
        let checkData = {}
        checkData.relationshipType = parent[0].relationship_type
        checkData.connectionName = null
        checkData.targetComponentTypeName = parent[0].target_component.component_type.name
        let childElementList = parent.map(function (element, i) {
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
        <div className='m-accordion__item' style={{'overflow': 'visible'}}>
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
        <div className='m-accordion__item' style={{'overflow': 'visible'}}>
          <div className='m-accordion__item-head collapsed' role='tab' id='m_accordion_2_item_1_head' data-toggle='collapse' href={'#m_accordion_2_item_1_body' + child[0].relationship_type} aria-expanded='true'>
            <input style={{cursor: 'pointer'}} checked={isCheckboxChecked} onChange={(event) => { handleGroupCheckbox(event.target.checked, checkData) }} className='pull-left' type='checkbox' />
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
        console.log('outgoing', outgoing)
        var outgoingGroup = _.chain(outgoing)
        .groupBy('connection.name')
        .mapValues(connectionTypeGroup => _.groupBy(connectionTypeGroup, targetComponentTypeGroup => targetComponentTypeGroup.target_component.component_type.name))
        .value()
        console.log('outgoingGroup', outgoingGroup)
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
                let childElementList = outgoingGroup[connectionKey][targetComponentTypeKey].map(function (element, i) {
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
                // let cleanKey = targetComponentTypeKey.replace(/ /g, '')
                outgoingElements.push(
                  <div className='m-accordion__item' style={{'overflow': 'visible'}}>
                    <div className='m-accordion__item-head collapsed' role='tab' id='m_accordion_2_item_1_head' data-toggle='collapse' href={'#outgoing_accordion_body' + outerKey + '-' + innerKey} aria-expanded='false'>
                      <input style={{cursor: 'pointer'}} checked={isCheckboxChecked} onChange={(event) => { handleGroupCheckbox(event.target.checked, checkData) }} className='pull-left' type='checkbox' />
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
        console.log('incomingGroup', incomingGroup)
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
                let childElementList = incomingGroup[connectionKey][targetComponentTypeKey].map(function (element, i) {
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
                // let cleanKey = targetComponentTypeKey.replace(/ /g, '')
                incomingElements.push(
                  <div className='m-accordion__item' style={{'overflow': 'visible'}}>
                    <div className='m-accordion__item-head collapsed' role='tab' id='m_accordion_2_item_1_head' data-toggle='collapse' href={'#incoming_accordion_body' + outerKey + '-' + innerKey} aria-expanded='true'>
                      <input className='pull-left' style={{cursor: 'pointer'}} onChange={(event) => { handleGroupCheckbox(event.target.checked, checkData) }} checked={isCheckboxChecked} type='checkbox' />
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
          <div className='col-md-8'>
            <h2>Application: {applicationName}</h2>
          </div>
          <div className='col-md-4 float-right' >
            <span className='pull-right'>
              <a href='/applications' data-skin='light' data-toggle='m-tooltip' data-placement='top' data-original-title='back' className='btn btn-info m-btn m-btn--icon btn-sm m-btn--icon-only  m-btn--pill m-btn--air'>
                <i className='fa flaticon-list-1 fa-2x' />
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
              <div className='m-portlet__body' style={{'height': '150px'}} >
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
                          <h3># BU Uses</h3>
                          <h5 style={{'float': 'right', 'paddingRight': '25px', 'marginTop': '-35px'}}>{applicationCount}</h5>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
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
                          <i className='flaticon-coins m--font-brand' />
                        </span>
                        <span className='m-widget17__subtitle'>
                          <h3>Cost</h3>
                          <h5 style={{'float': 'right', 'paddingRight': '25px', 'marginTop': '-35px'}}>{'R ' + formatAmount(applicationCost)}</h5>
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
          <div className='m-portlet' style={{width: '100%'}}>
            <div className={styles.tabsprops}>
              <ul className='nav nav-tabs' role='tablist'>
                <li className='nav-item'>
                  <a className={'nav-link ' + showApplication} data-toggle='tab' onClick={(event) => { event.preventDefault(); setCurrentTab('Application', null) }} href='javascript:void(0);'>Application</a>
                </li>
                <li className='nav-item'>
                  <a className={'nav-link ' + showSoftware} data-toggle='tab' onClick={(event) => { event.preventDefault(); setCurrentTab('Software', null) }} href='javascript:void(0);'>Software</a>
                </li>
                <li className='nav-item'>
                  <a className={'nav-link ' + showEntitlements} data-toggle='tab' onClick={(event) => { event.preventDefault(); setCurrentTab('Entitlements', null) }} href='javascript:void(0);'>Entitlements</a>
                </li>
              </ul>
              <div className='tab-content'>
                <div className={'tab-pane' + showApplication} id='m_tabs_3_1' role='tabpanel'>
                  <div className='row'>
                    <div className='col-md-5'>
                      <div className={styles.tabsprops}>
                        <ul className='nav nav-tabs' role='tablist'>
                          <li className='nav-item'>
                            <a className={'nav-link' + showProperties} data-toggle='tab' onClick={(event) => { event.preventDefault(); setCurrentTab(null, 'Property') }} href='javascript:void(0);'>Properties</a>
                          </li>
                          <li className='nav-item'>
                            <a className={'nav-link' + showRelationships} data-toggle='tab' onClick={(event) => { event.preventDefault(); setCurrentTab(null, 'Relationship') }} href='javascript:void(0);'>Relationships</a>
                          </li>
                        </ul>
                        <div className='tab-content'>
                          <div className={'tab-pane' + showProperties} id='m_tabs_3_1' role='tabpanel'>
                            <table className={'table table-striped- table-bordered table-hover table-checkable dataTable dtr-inline collapsed ' + styles.borderless}>
                              <tbody>
                                {applicationPropertiesList}
                              </tbody>
                            </table>
                          </div>
                          <div className={'tab-pane' + showRelationships} id='m_tabs_3_2' role='tabpanel'>
                            {/* <div className='pull-right'>
                              <button onClick={openModal} className={'btn btn-sm btn-outline-info pull-right'}>Add Relationship</button>
                            </div> */}
                            <div className={'row'} style={{'marginTop': '20px'}}>
                              <div className='m--space-10' />
                              <div className='accordion m-accordion m-accordion--bordered' style={{width: '100%'}} id='m_accordion_2' role='tablist' aria-multiselectable='true'>
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
                </div>
                <div className={'tab-pane' + showSoftware} id='m_tabs_3_2' role='tabpanel'>
                  <div className='col-md-12 m_datatable m-datatable m-datatable--default m-datatable--loaded m-datatable--scroll'>
                    <div className='m-portlet'>
                      <div className='m-portlet__body'>
                        <div className='col-sm-12'>
                          <div className='col-md-6 pull-left'>
                            <div className='dataTables_length' id='m_table_1_length' style={{'display': 'flex'}}>
                              <div style={{'display': 'flex', 'marginBottom': '15px'}}>
                                <h5 style={{'margin': '10px'}}>Search</h5>
                                <div className='m-input-icon m-input-icon--left'>
                                  <input type='text' className='form-control m-input' placeholder='Search...' id='generalSearch' ref={input => (searchTextBox = input)} onKeyUp={handleSearchChange} />
                                  <span className='m-input-icon__icon m-input-icon__icon--left'>
                                    <span>
                                      <i className='la la-search' />
                                    </span>
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className='col-md-6 pull-right'>
                            <a href='javascript:void(0);' data-skin='light' data-toggle='m-tooltip' data-placement='top' data-original-title='Link Entitlement' onClick={openLinkAddModal} className='btn btn-info m-btn m-btn--icon btn-sm m-btn--icon-only  m-btn--pill m-btn--air' style={{'float': 'right'}}>
                              <i className='fa flaticon-app fa-2x' />
                            </a>
                          </div>
                        </div>
                        <table className='m-portlet table table-striped- table-bordered table-hover table-checkable dataTable no-footer' id='m_table_1' aria-describedby='m_table_1_info' role='grid'>
                          <thead>
                            <tr role='row'>
                              <th className='' ><h5>Supplier</h5></th>
                              <th className='' ><h5>Name</h5></th>
                              <th className='' ><h5>EOSL</h5></th>
                              <th className='' ><h5>Action</h5></th>
                            </tr>
                          </thead>
                          <tbody>
                            {applicationSoftwareList}
                          </tbody>
                        </table>
                      </div>
                    </div>
                    {applicationSoftwareList.length > 0 && (
                    <div className='m-datatable__pager m-datatable--paging-loaded clearfix' style={{ 'textAlign': 'center' }}>
                      <ul className='m-datatable__pager-nav'>
                        <li><a href='' title='Previous' className={'m-datatable__pager-link m-datatable__pager-link--prev ' + previousClass} onClick={handlePrevious} data-page='4'><i className='la la-angle-left' /></a></li>
                        {listSoftwarePage[0] && listSoftwarePage[0].map(function (page, index) {
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
                <div className={'tab-pane' + showEntitlements} id='m_tabs_3_2' role='tabpanel'>
                  <div className='col-md-12 m_datatable m-datatable m-datatable--default m-datatable--loaded m-datatable--scroll'>
                    <div className='m-portlet'>
                      <div className='m-portlet__body'>
                        <div className='col-sm-12'>
                          <div className='col-md-6 pull-left'>
                            <div className='dataTables_length' id='m_table_1_length' style={{'display': 'flex'}}>
                              <div style={{'display': 'flex', 'marginBottom': '15px'}}>
                                <h5 style={{'margin': '10px'}}>Search</h5>
                                <div className='m-input-icon m-input-icon--left'>
                                  <input type='text' className='form-control m-input' placeholder='Search...' id='generalSearch' ref={input => (searchTextBox = input)} onKeyUp={handleSearchChange} />
                                  <span className='m-input-icon__icon m-input-icon__icon--left'>
                                    <span>
                                      <i className='la la-search' />
                                    </span>
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className='col-md-6 pull-right'>
                            <a href='javascript:void(0);' data-skin='light' data-toggle='m-tooltip' data-placement='top' data-original-title='Link Entitlement' onClick={openLinkAddModal} className='btn btn-info m-btn m-btn--icon btn-sm m-btn--icon-only  m-btn--pill m-btn--air' style={{'float': 'right'}}>
                              <i className='fa flaticon-app fa-2x' />
                            </a>
                          </div>
                        </div>
                        <table className='m-portlet table table-striped- table-bordered table-hover table-checkable dataTable no-footer' id='m_table_1' aria-describedby='m_table_1_info' role='grid'>
                          <thead>
                            <tr role='row'>
                              <th className='' ><h5>Supplier</h5></th>
                              <th className='' ><h5>Supplier Product Name</h5></th>
                              <th className='' ><h5>Supplier Part Number</h5></th>
                              <th className='' ><h5>Purchased</h5></th>
                              <th className='' ><h5>Consumed</h5></th>
                              <th className='' ><h5>Project Reserved</h5></th>
                              <th className='' ><h5>#BU Allocated</h5></th>
                              <th className='' ><h5>Application Entitlements</h5></th>
                              <th className='' ><h5>Cost</h5></th>
                              <th className='' ><h5>Action</h5></th>
                            </tr>
                          </thead>
                          <tbody>
                            {applicationEntitlementList}
                          </tbody>
                        </table>
                      </div>
                    </div>
                    {applicationEntitlementList.length > 0 && (
                    <div className='m-datatable__pager m-datatable--paging-loaded clearfix' style={{ 'textAlign': 'center' }}>
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
              </div>
            </div>
          </div>
        </div>
        <div>
          <ReactModal isOpen={props.linkActionSettings.isLinkModalOpen}
            onRequestClose={closeLinkModal}
            className='modal-dialog modal-lg'
            style={{'overlay': {zIndex: '1000'}, 'content': {'top': '20%'}}}
            >
            {/* <button onClick={closeLinkEntitlementModal} ><i className='la la-close' /></button> */}
            <div className={''}>
              <div className=''>
                <div className='modal-content'>
                  <div className='modal-header'>
                    <h4 className='modal-title' id='exampleModalLabel'>Link {props.showTabs.parentTab}</h4>
                    <button type='button' onClick={closeLinkModal} className='close' data-dismiss='modal' aria-label='Close'>
                      <span aria-hidden='true'>×</span>
                    </button>
                  </div>
                  <div className='modal-body'>
                    {props.showTabs.parentTab === 'Entitlements' && (<div className='form-group row'>
                      <div className='col-4'><label htmlFor='SelectEntitlement' className='col-form-label'>Select Supplier</label></div>
                      <div className='col-8'>
                        <Select
                          className='input-sm m-input'
                          placeholder='Select'
                          isClearable
                          value={props.linkActionSettings.supplier}
                          onChange={handleSupplierSelect}
                          isSearchable
                          options={selectSupplierOptions}
                        />
                      </div>
                    </div>)}
                    {props.showTabs.parentTab === 'Entitlements' && (<div className='form-group row'>
                      <div className='col-4'><label htmlFor='SelectEntitlement' className='col-form-label'>Select Agreement</label></div>
                      <div className='col-8'>
                        <Select
                          className='input-sm m-input'
                          placeholder='Select'
                          isClearable
                          value={props.linkActionSettings.agreement}
                          onChange={handleAgreementSelect}
                          isSearchable
                          options={selectAgreementOptions}
                        />
                      </div>
                    </div>)}
                    {props.showTabs.parentTab === 'Entitlements' && (<div className='form-group row'>
                      <div className='col-4'><label htmlFor='SelectEntitlement' className='col-form-label'>Select Entitlements</label></div>
                      <div className='col-8'>
                        <Select
                          className='input-sm m-input'
                          placeholder='Select'
                          isClearable
                          value={props.linkActionSettings.entitlement}
                          onChange={handleEntitlementSelect}
                          isSearchable
                          options={selectEntitlementOptions}
                        />
                      </div>
                    </div>)}
                    {props.showTabs.parentTab === 'Entitlements' && (<div className='form-group row'>
                      <div className='col-4'><label htmlFor='text' className='form-control-label'>Number of Licenses</label></div>
                      <div className='col-8'><input type='number'className='form-control' onChange={handleLicenseCountChange} value={props.linkActionSettings.licenseCount} autoComplete='off' required /></div>
                    </div>)}
                    {props.showTabs.parentTab === 'Software' && (<div className='form-group row'>
                      <div className='col-4'><label htmlFor='SelectEntitlement' className='col-form-label'>Select Software</label></div>
                      <div className='col-8'>
                        <Select
                          className='input-sm m-input'
                          placeholder='Select'
                          isClearable
                          value={props.linkActionSettings.software}
                          onChange={handleSoftwareSelect}
                          isSearchable
                          options={selectSoftwareOptions}
                        />
                      </div>
                    </div>)}
                  </div>
                  <div className='modal-footer'>
                    <div className='row'>
                      <div className='col-md-6'>
                        <div className='btn-group m-btn-group m-btn-group--pill ' role='group' aria-label='...'>
                          <button type='button' onClick={closeLinkModal} className='m-btn btn btn-secondary'>Close</button>
                          <button type='button' onClick={addLinkOperation} className='m-btn btn btn-secondary'>Link</button>
                        </div>
                      </div>
                    </div>
                    {/* <button type='button' className='btn btn-primary'>Save changes</button> */}
                    {/* <button type='button' onClick={closeLinkEntitlementModal} id='m_login_signup' className='btn btn-outline-danger btn-sm' >Close</button>
                    <button type='button' onClick={linkProjectEntitlement} className='btn btn-outline-info btn-sm' >Link</button> */}
                  </div>
                </div>
              </div>
            </div>
          </ReactModal>
        </div>
        <div>
          <ReactModal isOpen={props.linkActionSettings.isLinkUpdateModalOpen}
            onRequestClose={closeLinkModal}
            className='modal-dialog modal-lg'
            style={{'overlay': {zIndex: '1000'}, 'content': {'top': '20%'}}}
            >
            {/* <button onClick={closeLinkUpdateModal} ><i className='la la-close' /></button> */}
            <div className={''}>
              <div className=''>
                <div className='modal-content'>
                  <div className='modal-header'>
                    <h4 className='modal-title' id='exampleModalLabel'>Edit Link {props.showTabs.parentTab}</h4>
                    <button type='button' onClick={closeLinkModal} className='close' data-dismiss='modal' aria-label='Close'>
                      <span aria-hidden='true'>×</span>
                    </button>
                  </div>
                  <div className='modal-body'>
                    <div className='form-group row'>
                      <div className='col-4'><label htmlFor='SelectEntitlement' className='col-form-label'>Entitlements</label></div>
                      <div className='col-8'>
                        {props.linkActionSettings.selectedObject ? props.linkActionSettings.selectedObject.name : ''}
                      </div>
                    </div>
                    <div className='form-group row'>
                      <div className='col-4'><label htmlFor='text' className='form-control-label'>Number of Licenses</label></div>
                      <div className='col-8'><input className='form-control' onChange={handleLicenseCountChange} value={props.linkActionSettings.licenseCount} autoComplete='off' required /></div>
                    </div>
                  </div>
                  <div className='modal-footer'>
                    <div className='row'>
                      <div className='col-md-6'>
                        <div className='btn-group m-btn-group m-btn-group--pill ' role='group' aria-label='...'>
                          <button type='button' onClick={closeLinkModal} className='m-btn btn btn-secondary'>Cancel</button>
                          <button type='button' onClick={editLinkOperation} className='m-btn btn btn-secondary'>Update</button>
                        </div>
                      </div>
                    </div>
                    {/* <button type='button' onClick={closeLinkUpdateModal} className='btn btn-outline-danger btn-sm'>Cancel</button>
                    <button onClick={editProjectEntitlement} className='btn btn-outline-info btn-sm'>Update</button> */}
                  </div>
                </div>
              </div>
            </div>
          </ReactModal>
        </div>
        <div>
          <ReactModal isOpen={props.linkActionSettings.isLinkDeleteModalOpen}
            onRequestClose={closeLinkModal}
            className='modal-dialog'
            style={{'overlay': {zIndex: '1000'}, 'content': {'top': '20%'}}}
            >
            <div className={''}>
              <div className=''>
                <div className='modal-content'>
                  <div className='modal-header'>
                    <h6 className='modal-title' id='exampleModalLabel'>Delete Link to {props.showTabs.parentTab}</h6>
                    <button type='button' onClick={closeLinkModal} className='close' data-dismiss='modal' aria-label='Close'>
                      <span aria-hidden='true'>×</span>
                    </button>
                  </div>
                  <div className='modal-body'>
                    <p>Confirm deletion of Link to {props.linkActionSettings.selectedObject ? props.linkActionSettings.selectedObject.name : ''}</p>
                  </div>
                  <div className='modal-footer'>
                    <div className='row'>
                      <div className='col-md-6'>
                        <div className='btn-group m-btn-group m-btn-group--pill ' role='group' aria-label='...'>
                          <button type='button' onClick={closeLinkModal} className='m-btn btn btn-secondary'>Back</button>
                          <button type='button' onClick={deleteLinkOperation} className='m-btn btn btn-secondary'>Confirm</button>
                        </div>
                      </div>
                    </div>
                    {/* <button type='button' onClick={closeLinkDeleteModal} id='m_login_signup' className={'btn btn-sm btn-outline-info'}>Cancel</button>
                    <button type='button' onClick={deleteProjectEntitlement} className={'btn btn-sm btn-outline-info'}>Confirm</button> */}
                  </div>
                </div>
              </div>
            </div>
          </ReactModal>
        </div>
        <Discussion name={applicationName} type='Component' {...props} />
        <NewDiscussion contextId={contextId} name={applicationName} type='Component' {...props} />
      </div>
      )
    }
 Applicationview.propTypes = {
  match: PropTypes.any,
  applicationbyId: PropTypes.any,
  applicationProperties: PropTypes.any,
  // applicationRelationships: PropTypes.any,
  applicationRelationshipData: PropTypes.any,
  showTabs: PropTypes.any,
  applicationEntitlements: PropTypes.any,
  applicationSoftwares: PropTypes.any,
  currentPage: PropTypes.any,
  perPage: PropTypes.any,
  linkActionSettings: PropTypes.any,
  entitlements: PropTypes.any,
  agreements: PropTypes.any,
  suppliers: PropTypes.any,
  softwares: PropTypes.any,
  allEntitlements: PropTypes.any
 }
