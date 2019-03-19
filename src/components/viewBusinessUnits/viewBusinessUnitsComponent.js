import React from 'react'
import _ from 'lodash'
import debounce from 'lodash/debounce'
import ReactModal from 'react-modal'
import PropTypes from 'prop-types'
import Select from 'react-select'
// import Discussion from '../../containers/discussion/discussionContainer'
// import NewDiscussion from '../../containers/newDiscussion/newDiscussionContainer'
import styles from './viewBusinessUnitsComponent.scss'
// import { format } from 'url'
ReactModal.setAppElement('#root')
// const customStyles = {
//   overlay: {zIndex: '1000'},
//   content: {
//     top: '50%',
//     left: '50%',
//     right: 'auto',
//     bottom: 'auto',
//     marginRight: '-50%',
//     border: 'none',
//     background: 'none',
//     transform: 'translate(-50%, -50%)',
//     width: '100%'
//   }
// }
const formatAmount = (x) => {
  let parts = x.toString().split('.')
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
  if (typeof parts[1] !== 'undefined') {
    parts[1] = parts[1].substring(0, 2)
  }
  return parts.join('.')
}

export default function viewBusinessUnits (props) {
  console.log(props.activeTab, props.businessUnit, props.entitlementComponents, props.businessOwnsApplications, props.businessUsesApplications, props.businessUnitAgreements, props.businessUnitEntitlements)
  let entitlementCount = ''
  let totalCost = ''
  let businessUnitName = ''
  let searchTextBox
  let searchText1Box
  let searchText2Box
  let searchText3Box
  let businessUnitEntitlementList = ''
  let businessUnitAgreementList = ''
  let businessUnitOwnsApplicationList = ''
  let businessUnitUsesApplicationList = ''
//   let totalNoPages
  let perPage = 10
  let currentPage = props.currentPage
  let totalEntitlementPages
  let totalAgreementPages
  let totalOwnsApplicationPages
  let totalUsesApplicationPages
  let entitlementPageArray = []
  let agreementPageArray = []
  let ownApplicationPageArray = []
  let usesApplicationPageArray = []
  let listEntitlementPage = []
  let listAgreementPage = []
  let listOwnApplicationPage = []
  let listUsesApplicationPage = []
  let selectOptions = []
  let paginationLimit = 6
  let nextClass = ''
  let previousClass = ''
  if (props.entitlementComponents !== '' && props.entitlementComponents.error_code === null) {
    selectOptions = props.entitlementComponents.resources.map((component, index) => {
      let option = {...component}
      option.value = component.name
      option.label = component.name
      return option
    })
    console.log('if selectOptions', selectOptions)
  } else {
    console.log('else selectOptions', selectOptions)
  }
  let handleSelect = function (newValue: any, actionMeta: any) {
    console.group('Value Changed first select')
    console.log(newValue)
    console.log(`action: ${actionMeta.action}`)
    console.groupEnd()
    if (actionMeta.action === 'select-option') {
      let entitlementActionSettings = {...props.entitlementActionSettings, 'entitlementSelected': newValue}
      props.setEntitlementActionSettings(entitlementActionSettings)
    }
    if (actionMeta.action === 'clear') {
      let entitlementActionSettings = {...props.entitlementActionSettings, 'entitlementSelected': null}
      props.setEntitlementActionSettings(entitlementActionSettings)
    }
  }
  let handleLicenseCountChange = function (event) {
    let entitlementActionSettings = {...props.entitlementActionSettings, 'licenseCount': event.target.value}
    props.setEntitlementActionSettings(entitlementActionSettings)
  }
  let openLinkEntitlementModal = function (event) {
    event.preventDefault()
    let entitlementActionSettings = {...props.entitlementActionSettings, 'isLinkModalOpen': true}
    props.setEntitlementActionSettings(entitlementActionSettings)
   }
  let openLinkDeleteModal = function (data) {
    console.log('*&&&*&&', data)
    let entitlementActionSettings = {...props.entitlementActionSettings, 'isLinkDeleteModalOpen': true, 'entitlementSelected': data, 'licenseCount': data.license_count}
    props.setEntitlementActionSettings(entitlementActionSettings)
  }
  let openLinkUpdateModal = function (data) {
    console.log('*&&&*&&', data)
    let entitlementActionSettings = {...props.entitlementActionSettings, 'isLinkUpdateModalOpen': true, 'entitlementSelected': data, 'licenseCount': data.license_count}
    props.setEntitlementActionSettings(entitlementActionSettings)
  }
  let closeLinkDeleteModal = function () {
    let entitlementActionSettings = {...props.entitlementActionSettings, 'isLinkDeleteModalOpen': false, 'entitlementSelected': null, 'licenseCount': 0}
    props.setEntitlementActionSettings(entitlementActionSettings)
  }
  let closeLinkUpdateModal = function () {
    let entitlementActionSettings = {...props.entitlementActionSettings, 'isLinkUpdateModalOpen': false, 'entitlementSelected': null, 'licenseCount': 0}
    props.setEntitlementActionSettings(entitlementActionSettings)
  }
  let closeLinkEntitlementModal = function () {
    let entitlementActionSettings = {...props.entitlementActionSettings, 'isLinkModalOpen': false}
    props.setEntitlementActionSettings(entitlementActionSettings)
  }
  let listBusinessUnitEntitlements = function () {
  if (props.businessUnitEntitlements !== '') {
    if (props.businessUnitEntitlements.resources.length > 0) {
      businessUnitEntitlementList = props.businessUnitEntitlements.resources.slice(perPage * (currentPage - 1), ((currentPage - 1) + 1) * perPage).map(function (data, index) {
        return (
          <tr key={index}>
            <td>{data.name}</td>
            <td>{data.license_count}</td>
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
      businessUnitEntitlementList = []
      businessUnitEntitlementList.push((
        <tr key={0}>
          <td colSpan='4'>{'No data to display'}</td>
        </tr>
      ))
    }
  }
}
let listBusinessUnitAgreements = function () {
  if (props.businessUnitAgreements !== '') {
    if (props.businessUnitAgreements.resources.length > 0) {
      businessUnitAgreementList = props.businessUnitAgreements.resources.slice(perPage * (currentPage - 1), ((currentPage - 1) + 1) * perPage).map(function (data, index) {
        return (
          <tr key={index}>
            <td><a href={'/agreements/' + data.id} >{data.name}</a></td>
            <td>{data.supplier}</td>
            <td>{data.entitlement_count}</td>
            <td>{data.entitlement_cost}</td>
          </tr>
        )
      })
    } else {
      businessUnitAgreementList = []
      businessUnitAgreementList.push((
        <tr key={0}>
          <td colSpan='5'>{'No data to display'}</td>
        </tr>
      ))
    }
  }
}
let listBusinessOwnsApplication = function () {
  if (props.businessOwnsApplications !== '') {
    if (props.businessOwnsApplications.resources.length > 0) {
      businessUnitOwnsApplicationList = props.businessOwnsApplications.resources.slice(perPage * (currentPage - 1), ((currentPage - 1) + 1) * perPage).map(function (data, index) {
        return (
          <tr key={index}>
            <td><a href={'/applications/' + data.id}>{data.name}</a></td>
            <td>{data.supplier}</td>
            <td>{'R ' + formatAmount(data.total_cost)}</td>
          </tr>
        )
      })
    } else {
      businessUnitOwnsApplicationList = []
      businessUnitOwnsApplicationList.push((
        <tr key={0}>
          <td colSpan='2'>{'No data to display'}</td>
        </tr>
      ))
    }
  }
}
let listBusinessUsesApplication = function () {
   if (props.businessUsesApplications !== '') {
    if (props.businessUsesApplications.resources.length > 0) {
      businessUnitUsesApplicationList = props.businessUsesApplications.resources.slice(perPage * (currentPage - 1), ((currentPage - 1) + 1) * perPage).map(function (data, index) {
        return (
          <tr key={index}>
            <td><a href={'/applications/' + data.id}>{data.name}</a></td>
            <td>{data.supplier}</td>
            <td>{data.owner}</td>
            <td>{'R ' + formatAmount(data.total_cost)}</td>
          </tr>
        )
      })
    } else {
      businessUnitUsesApplicationList = []
      businessUnitUsesApplicationList.push((
        <tr key={0}>
          <td colSpan='2'>{'No data to display'}</td>
        </tr>
      ))
    }
  }
    // // eslint-disable-next-line
    // mApp && mApp.block('#bussinessUnitsAllList', {overlayColor:'#000000',type:'loader',state:'success',message:'Processing...'})
}
  if (props.businessUnit && props.businessUnit !== '') {
    entitlementCount = props.businessUnit.resources[0].entitlement_count
    totalCost = props.businessUnit.resources[0].total_license_cost
    businessUnitName = props.businessUnit.resources[0].name
  }
  if (props.businessUnitEntitlements && props.businessUnitEntitlements !== '') {
    totalEntitlementPages = Math.ceil(props.businessUnitEntitlements.resources.length / perPage)
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
    // List initial data for Business Entitlements
    listBusinessUnitEntitlements()
  }
  if (props.businessUnitAgreements && props.businessUnitAgreements !== '') {
    totalAgreementPages = Math.ceil(props.businessUnitAgreements.resources.length / perPage)
    let i = 1
    while (i <= totalAgreementPages) {
      let pageParameter = {}
      pageParameter.number = i
      pageParameter.class = ''
      agreementPageArray.push(pageParameter)
      i++
    }
    agreementPageArray = _.chunk(agreementPageArray, paginationLimit)
    listAgreementPage = _.filter(agreementPageArray, function (group) {
      let found = _.filter(group, {'number': currentPage})
      if (found.length > 0) { return group }
    })
    // List initial data for Business Agreement
    listBusinessUnitAgreements()
  }
  if (props.businessOwnsApplications && props.businessOwnsApplications !== '') {
    totalOwnsApplicationPages = Math.ceil(props.businessOwnsApplications.resources.length / perPage)
    let i = 1
    while (i <= totalOwnsApplicationPages) {
      let pageParameter = {}
      pageParameter.number = i
      pageParameter.class = ''
      ownApplicationPageArray.push(pageParameter)
      i++
    }
    ownApplicationPageArray = _.chunk(ownApplicationPageArray, paginationLimit)
    listOwnApplicationPage = _.filter(ownApplicationPageArray, function (group) {
      let found = _.filter(group, {'number': currentPage})
      if (found.length > 0) { return group }
    })
    // List initial data for supplier Applications
    listBusinessOwnsApplication()
  }

  if (props.businessUsesApplications && props.businessUsesApplications !== '') {
    totalUsesApplicationPages = Math.ceil(props.businessUsesApplications.resources.length / perPage)
    let i = 1
    while (i <= totalUsesApplicationPages) {
      let pageParameter = {}
      pageParameter.number = i
      pageParameter.class = ''
      usesApplicationPageArray.push(pageParameter)
      i++
    }
    usesApplicationPageArray = _.chunk(usesApplicationPageArray, paginationLimit)
    listUsesApplicationPage = _.filter(usesApplicationPageArray, function (group) {
      let found = _.filter(group, {'number': currentPage})
      if (found.length > 0) { return group }
    })
    // List initial data for supplier Applications
    listBusinessUsesApplication()
  }
  if (props.activeTab === 'allocatedentitlements') {
    if (currentPage === 1) {
      previousClass = 'm-datatable__pager-link--disabled'
    }
    if (currentPage === totalEntitlementPages) {
      nextClass = 'm-datatable__pager-link--disabled'
    }
  } else if (props.activeTab === 'agreement') {
    if (currentPage === 1) {
      previousClass = 'm-datatable__pager-link--disabled'
    }
    if (currentPage === totalAgreementPages) {
      nextClass = 'm-datatable__pager-link--disabled'
    }
  } else if (props.activeTab === 'ownsapplication') {
    if (currentPage === 1) {
      previousClass = 'm-datatable__pager-link--disabled'
    }
    if (currentPage === totalOwnsApplicationPages) {
      nextClass = 'm-datatable__pager-link--disabled'
    }
  } else if (props.activeTab === 'usesapplication') {
    if (currentPage === 1) {
      previousClass = 'm-datatable__pager-link--disabled'
    }
    if (currentPage === totalUsesApplicationPages) {
      nextClass = 'm-datatable__pager-link--disabled'
    }
  }

  let handleListAndPagination = function (page) {
    if (props.activeTab === 'allocatedentitlements') {
      listBusinessUnitEntitlements()
       // eslint-disable-next-line
       mApp && mApp.block('#bussinessUnitsAllList', {overlayColor:'#000000',type:'loader',state:'success',message:'Processing...'})
      props.setCurrentPage(page)
      listEntitlementPage = _.filter(entitlementPageArray, function (group) {
        let found = _.filter(group, {'number': page})
        if (found.length > 0) { return group }
      })
    } else if (props.activeTab === 'agreement') {
      // eslint-disable-next-line
      mApp && mApp.block('#bussinessUnitsAllList', {overlayColor:'#000000',type:'loader',state:'success',message:'Processing...'})
      listBusinessUnitAgreements()
      props.setCurrentPage(page)
      listAgreementPage = _.filter(agreementPageArray, function (group) {
        let found = _.filter(group, {'number': page})
        if (found.length > 0) { return group }
      })
    } else if (props.activeTab === 'ownsapplication') {
      listBusinessOwnsApplication()
      props.setCurrentPage(page)
      listOwnApplicationPage = _.filter(ownApplicationPageArray, function (group) {
        let found = _.filter(group, {'number': page})
        if (found.length > 0) { return group }
      })
    } else if (props.activeTab === 'usesapplication') {
      listBusinessUsesApplication()
      props.setCurrentPage(page)
      listUsesApplicationPage = _.filter(usesApplicationPageArray, function (group) {
        let found = _.filter(group, {'number': page})
        if (found.length > 0) { return group }
      })
    }
  }
  let handlePage = function (page) {
    if (props.activeTab === 'allocatedentitlements') {
      if (page === 1) {
        previousClass = 'm-datatable__pager-link--disabled'
      } else if (page === totalEntitlementPages) {
        nextClass = 'm-datatable__pager-link--disabled'
      }
      handleListAndPagination(page)
    } else if (props.activeTab === 'agreement') {
      if (page === 1) {
        previousClass = 'm-datatable__pager-link--disabled'
      } else if (page === totalAgreementPages) {
        nextClass = 'm-datatable__pager-link--disabled'
      }
      handleListAndPagination(page)
    } else if (props.activeTab === 'ownsapplication') {
      if (page === 1) {
        previousClass = 'm-datatable__pager-link--disabled'
      } else if (page === totalOwnsApplicationPages) {
        nextClass = 'm-datatable__pager-link--disabled'
      }
      handleListAndPagination(page)
    } else if (props.activeTab === 'usesapplication') {
      if (page === 1) {
        previousClass = 'm-datatable__pager-link--disabled'
      } else if (page === totalUsesApplicationPages) {
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
    if (props.activeTab === 'allocatedentitlments') {
      if (currentPage === totalEntitlementPages) {
        nextClass = styles.disabled
      } else {
        props.setCurrentPage(currentPage + 1)
        handleListAndPagination(currentPage + 1)
      }
    } else if (props.activeTab === 'agreement') {
      if (currentPage === totalAgreementPages) {
        nextClass = styles.disabled
      } else {
        props.setCurrentPage(currentPage + 1)
        handleListAndPagination(currentPage + 1)
      }
    } else if (props.activeTab === 'ownsapplication') {
      if (currentPage === totalOwnsApplicationPages) {
        nextClass = styles.disabled
      } else {
        props.setCurrentPage(currentPage + 1)
        handleListAndPagination(currentPage + 1)
      }
    } else if (props.activeTab === 'usesapplication') {
      if (currentPage === totalUsesApplicationPages) {
        nextClass = styles.disabled
      } else {
        props.setCurrentPage(currentPage + 1)
        handleListAndPagination(currentPage + 1)
      }
  }
}
let handleInputEntitlementChange = debounce((e) => {
  console.log(e)
  if (searchTextBox) {
    const value = searchTextBox.value
    // entitlementsList = ''
    let payload = {
      'business_unit_id': props.match.params.id,
      'search': value || '',
      'page_size': 10,
      'page': 1
    }
    props.setCurrentPage(1)
    // if (searchTextBox.value.length > 2 || searchTextBox.value.length === 0) {
      props.fetchBusinessUnitEntitlements(payload)
      // eslint-disable-next-line
      mApp && mApp.block('#entitlementList', {overlayColor:'#000000',type:'loader',state:'success',message:'Processing...'})
      // props.setComponentTypeLoading(true)
    // }
    listEntitlementPage = _.filter(entitlementPageArray, function (group) {
      let found = _.filter(group, {'number': currentPage})
      if (found.length > 0) { return group }
    })
    // handleListAndPagination(currentPage)
  }
}, 500)

let handleInputAgreementChange = debounce((e) => {
  console.log(e)
  if (searchText1Box) {
    const value = searchText1Box.value
    // entitlementsList = ''
    let payload = {
      'business_unit_id': props.match.params.id,
      'search': value || '',
      'page_size': 10,
      'page': 1
    }
    props.setCurrentPage(1)
    // if (searchTextBox.value.length > 2 || searchTextBox.value.length === 0) {
      props.fetchBusinessUnitAgreements(payload)
      // eslint-disable-next-line
      mApp && mApp.block('#bussinessUnitsAllList', {overlayColor:'#000000',type:'loader',state:'success',message:'Processing...'})
      // props.setComponentTypeLoading(true)
    // }
    listAgreementPage = _.filter(agreementPageArray, function (group) {
      let found = _.filter(group, {'number': currentPage})
      if (found.length > 0) { return group }
    })
    listBusinessUnitAgreements()
  }
}, 500)

let handleInputOwnApplicationsChange = debounce((e, page) => {
  console.log(e)
  console.log(page)
  props.setCurrentPage(1)
   if (searchText2Box) {
    const value = searchText2Box.value
    // entitlementsList = ''
    let payload = {
      'business_unit_id': props.match.params.id,
      'search': value,
      'page_size': 10,
      'page': page
    }
      props.fetchBusinessOwnsApplications(payload)
      // eslint-disable-next-line
      mApp && mApp.block('#bussinessUnitsAllList', {overlayColor:'#000000',type:'loader',state:'success',message:'Processing...'})

    ownApplicationPageArray = _.chunk(ownApplicationPageArray, paginationLimit)
    listOwnApplicationPage = _.filter(ownApplicationPageArray, function (group) {
      console.log('%%%%%', listOwnApplicationPage)
      // props.setCurrentPage(currentPage)
      let found = _.filter(group, {'number': page})
      console.log('***', found)
      if (found.length > 0) { return group }
    })
  }
  if (searchText2Box.value === null) {
    console.log('hi')
    handleListAndPagination(page)
    listBusinessOwnsApplication()
      props.setCurrentPage(page)
      listOwnApplicationPage = _.filter(ownApplicationPageArray, function (group) {
        let found = _.filter(group, {'number': page})
        console.log('909', found)
        if (found.length > 0) { return group }
    })
  }
}, 500)

let handleInputUsesApplicationsChange = debounce((e, page) => {
  console.log(e)
  console.log(page)
  props.setCurrentPage(1)
   if (searchText3Box) {
    const value = searchText3Box.value
    // entitlementsList = ''
    let payload = {
      'business_unit_id': props.match.params.id,
      'search': value,
      'page_size': 10,
      'page': page
    }
      props.fetchBusinessUsesApplications(payload)
      // eslint-disable-next-line
      mApp && mApp.block('#bussinessUnitsAllList', {overlayColor:'#000000',type:'loader',state:'success',message:'Processing...'})
    listUsesApplicationPage = _.filter(usesApplicationPageArray, function (group) {
      console.log('%%%%%', listUsesApplicationPage)
      // props.setCurrentPage(currentPage)
      let found = _.filter(group, {'number': page})
      console.log('***', found)
      if (found.length > 0) { return group }
    })
  }
  if (searchText3Box.value === null) {
    console.log('hi')
    handleListAndPagination(page)
    listBusinessUsesApplication()
      props.setCurrentPage(page)
      listUsesApplicationPage = _.filter(usesApplicationPageArray, function (group) {
        let found = _.filter(group, {'number': page})
        console.log('909', found)
        if (found.length > 0) { return group }
    })
  }
}, 500)
let linkBusinessUnitEntitlement = function (event) {
  // eslint-disable-next-line
  mApp.blockPage({overlayColor:'#000000',type:'loader',state:'success',message:'Processing...'})
  event.preventDefault()
  let dataPayload = []
  let obj = {}
  obj.op = 'add'
  obj.path = '/-'
  obj.value = {
    id: props.entitlementActionSettings.entitlementSelected.id,
    license_count: parseInt(props.entitlementActionSettings.licenseCount)
  }
  dataPayload.push(obj)
  let businessUnitId = props.match.params.id
  let payload = {}
  payload.businessUnitId = businessUnitId
  payload.data = dataPayload
  console.log('payload', payload)
  props.addBusinessUnitEntitlements(payload)
  closeLinkEntitlementModal()
}
let editBusinessUnitEntitlement = function (event) {
  // eslint-disable-next-line
  mApp.blockPage({overlayColor:'#000000',type:'loader',state:'success',message:'Processing...'})
  event.preventDefault()
  let dataPayload = []
  let obj = {}
  obj.op = 'replace'
  obj.path = '/' + props.entitlementActionSettings.entitlementSelected.connection_id + '/license_count'
  obj.value = parseInt(props.entitlementActionSettings.licenseCount)
  dataPayload.push(obj)
  let businessUnitId = props.match.params.id
  let payload = {}
  payload.businessUnitId = businessUnitId
  payload.data = dataPayload
  console.log('payload', payload)
  props.updateBusinessUnitEntitlements(payload)
  closeLinkUpdateModal()
}
let deleteBusinessUnitEntitlement = function (event) {
  // eslint-disable-next-line
  mApp.blockPage({overlayColor:'#000000',type:'loader',state:'success',message:'Processing...'})
  event.preventDefault()
  let dataPayload = []
  let obj = {}
  obj.op = 'remove'
  obj.path = '/' + props.entitlementActionSettings.entitlementSelected.connection_id
  dataPayload.push(obj)
  let businessUnitId = props.match.params.id
  let payload = {}
  payload.businessUnitId = businessUnitId
  payload.data = dataPayload
  console.log('payload', payload)
  props.deleteBusinessUnitEntitlements(payload)
  closeLinkDeleteModal()
}
return (
  <div>
    <div className='row'>
      <div className='col-md-9'>
        <h2>Business Unit: {businessUnitName}</h2>
      </div>
      <div className='col-md-3 float-right'>
        <span className='pull-right'>
          <a href='javascript:void(0);' data-skin='light' data-toggle='m-tooltip' data-placement='top' data-original-title='Add Entitlement' onClick={''} className='btn btn-info m-btn m-btn--icon btn-sm m-btn--icon-only  m-btn--pill m-btn--air'>
            <i className='fa flaticon-plus fa-2x' />
          </a>&nbsp;&nbsp;
          <a href='javascript:void(0);' data-skin='light' data-toggle='m-tooltip' data-placement='top' data-original-title='Initiate Discussion' onClick={''} className='btn btn-info m-btn m-btn--icon btn-sm m-btn--icon-only  m-btn--pill m-btn--air'>
            <i className='fa flaticon-multimedia-3 fa-2x' />
          </a>
        </span>
        {/* <button type='button' onClick={openModal} className='btn btn-outline-info btn-sm'>Add Entitlment</button>&nbsp;
        <button onClick={openDiscussionModal} className='btn btn-outline-info btn-sm'>Create Discussion</button>&nbsp; */}
      </div>
    </div>
    <div className='row' id='entitlementSummary'>
      <div className='col-xl-6'>
        <div className='m-portlet m-portlet--bordered-semi m-portlet--full-height m-portlet--skin-light  m-portlet--rounded-force'>
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
                      <h3>#Entitlements</h3>
                      <h5 style={{'float': 'right', 'paddingRight': '25px', 'marginTop': '-35px'}}>{entitlementCount}</h5>
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
      <div className='col-md-offset-1 col-xl-6'>
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
                      <h3>Total License Cost</h3>
                      <h5 style={{'float': 'right', 'paddingRight': '25px', 'marginTop': '-35px'}}>{ 'R ' + formatAmount(totalCost) }</h5>
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
      {/* <button className='btn btn-outline-info btn-sm'>Add Entitlment</button> */}
    </div>
    <div className={styles.borderline} style={{'marginTop': '20px'}}>
      <ul className='nav nav-tabs nav-fill' role='tablist'>
        <li className='nav-item'>
          <a className='nav-link active' onClick={() => { props.setCurrentPage(1); props.setActiveTab('allocatedentitlements') }} data-toggle='tab' href='#m_tabs_2_4'>Allocated Entitlements</a>
        </li>
        <li className='nav-item'>
          <a className='nav-link' onClick={() => { props.setCurrentPage(1); props.setActiveTab('agreement') }} data-toggle='tab' href='#m_tabs_2_1'>Agreements</a>
        </li>
        <li className='nav-item'>
          <a className='nav-link' onClick={() => { props.setCurrentPage(1); props.setActiveTab('ownsapplication') }} data-toggle='tab' href='#m_tabs_2_3'>Owned Applications</a>
        </li>
        <li className='nav-item'>
          <a className='nav-link' onClick={() => { props.setCurrentPage(1); props.setActiveTab('usesapplication') }} data-toggle='tab' href='#m_tabs_2_2'>Used Applications</a>
        </li>
      </ul>
      <div className='tab-content' id='bussinessUnitsAllList'>
        <div className='tab-pane active' id='m_tabs_2_4' role='tabpanel'>
          <div className='col-md-12 m_datatable m-datatable m-datatable--default m-datatable--loaded m-datatable--scroll'>
            <div className='m-portlet'>
              <div className='m-portlet__body'>
                <div className='col-sm-12'>
                  <div className='col-md-6 pull-left'>
                    <div className='dataTables_length' id='m_table_1_length' style={{'display': 'flex'}}>
                      <div style={{'display': 'flex', 'marginBottom': '15px'}}>
                        <h5 style={{'margin': '10px'}}>Search</h5>
                        <div className='m-input-icon m-input-icon--left'>
                          <input type='text' className='form-control m-input' placeholder='Search...' id='generalSearch' ref={input => (searchTextBox = input)} onKeyUp={handleInputEntitlementChange} />
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
                    <a href='javascript:void(0);' data-skin='light' data-toggle='m-tooltip' data-placement='top' data-original-title='Link Entitlement' onClick={openLinkEntitlementModal} className='btn btn-info m-btn m-btn--icon btn-sm m-btn--icon-only  m-btn--pill m-btn--air' style={{'float': 'right'}}>
                      <i className='fa flaticon-app fa-2x' />
                    </a>
                  </div>
                </div>
                <table className='m-portlet table table-striped- table-bordered table-hover table-checkable dataTable no-footer' id='m_table_1' aria-describedby='m_table_1_info' role='grid'>
                  <thead>
                    <tr role='row'>
                      <th className='' ><h5>Name</h5></th>
                      <th className='' ><h5>#Allocated</h5></th>
                      <th className='' ><h5>Action</h5></th>
                    </tr>
                  </thead>
                  <tbody>
                    {businessUnitEntitlementList}
                    {/* <tr>
                      <td>XYZ</td>
                      <td>xyz</td>
                      <td>
                        <div className='m-btn-group m-btn-group--pill btn-group' role='group' aria-label='First group'>
                          <button type='button' onClick={openLinkUpdateModal} className='m-btn btn btn-info'><i className='fa flaticon-edit-1' /></button>
                          <button type='button' onClick={openLinkDeleteModal} className='m-btn btn btn-danger'><i className='fa flaticon-delete-1' /></button>
                        </div>
                      </td>
                    </tr> */}
                  </tbody>
                </table>
              </div>
            </div>
            {businessUnitEntitlementList.length > 0 && (
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
        <div className='tab-pane' id='m_tabs_2_1' role='tabpanel'>
          <div className='col-md-12 m_datatable m-datatable m-datatable--default m-datatable--loaded m-datatable--scroll'>
            <div className='m-portlet' id='bussinessagreementsList'>
              <div className='m-portlet__body'>
                <div className='col-sm-12'>
                  <div className='col-md-6'>
                    <div className='dataTables_length' id='m_table_1_length' style={{'display': 'flex'}}>
                      <div style={{'display': 'flex', 'marginBottom': '15px'}}>
                        <h5 style={{'margin': '10px'}}>Search</h5>
                        <div className='m-input-icon m-input-icon--left'>
                          <input type='text' className='form-control m-input' placeholder='Search...' id='generalSearch' ref={input => (searchText1Box = input)} onKeyUp={handleInputAgreementChange} />
                          <span className='m-input-icon__icon m-input-icon__icon--left'>
                            <span>
                              <i className='la la-search' />
                            </span>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <table className='m-portlet table table-striped- table-bordered table-hover table-checkable dataTable no-footer' id='m_table_1' aria-describedby='m_table_1_info' role='grid'>
                  <thead>
                    <tr role='row'>
                      <th className='' ><h5>Name</h5></th>
                      <th className='' ><h5>Supplier</h5></th>
                      <th className='' ><h5>#Entitlements</h5></th>
                      <th className='' ><h5>Total Cost</h5></th>
                    </tr>
                  </thead>
                  <tbody>
                    {businessUnitAgreementList}
                  </tbody>
                </table>
              </div>
            </div>
            {businessUnitAgreementList.length > 0 && (
            <div className='m-datatable__pager m-datatable--paging-loaded clearfix' style={{ 'textAlign': 'center' }}>
              <ul className='m-datatable__pager-nav'>
                <li><a href='' title='Previous' className={'m-datatable__pager-link m-datatable__pager-link--prev ' + previousClass} onClick={handlePrevious} data-page='4'><i className='la la-angle-left' /></a></li>
                {listAgreementPage[0] && listAgreementPage[0].map(function (page, index) {
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
        <div className='tab-pane' id='m_tabs_2_3' role='tabpanel'>
          <div className='col-md-12 m_datatable m-datatable m-datatable--default m-datatable--loaded m-datatable--scroll'>
            <div className=''>
              <div className='m-portlet' id='bussinessownedapplicationList'>
                <div className='m-portlet__body'>
                  <div className='col-sm-12'>
                    <div className='col-md-6 pull-left'>
                      <div className='dataTables_length' id='m_table_1_length' style={{'display': 'flex'}}>
                        <div style={{'display': 'flex', 'marginBottom': '15px'}}>
                          <h5 style={{'margin': '10px'}}>Search</h5>
                          <div className='m-input-icon m-input-icon--left'>
                            <input type='text' className='form-control m-input' placeholder='Search...' id='generalSearch' ref={input => (searchText2Box = input)} onKeyUp={handleInputOwnApplicationsChange} />
                            <span className='m-input-icon__icon m-input-icon__icon--left'>
                              <span>
                                <i className='la la-search' />
                              </span>
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <table className='m-portlet table table-striped- table-bordered table-hover table-checkable dataTable no-footer' aria-describedby='m_table_1_info' role='grid'>
                      <thead>
                        <tr role='row'>
                          <th className='' ><h5>Name</h5></th>
                          <th className='' ><h5>Supplier</h5></th>
                          <th className='' ><h5>Total Cost</h5></th>
                        </tr>
                      </thead>
                      <tbody>
                        {businessUnitOwnsApplicationList}
                        {/* <tr>
                          <td>XYZ</td>
                          <td>xyz</td>
                          <td>asdjadj</td>
                        </tr> */}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
            {businessUnitOwnsApplicationList.length > 0 && (
            <div className='m-datatable__pager m-datatable--paging-loaded clearfix' style={{ 'textAlign': 'center' }}>
              <ul className='m-datatable__pager-nav'>
                <li><a href='' title='Previous' className={'m-datatable__pager-link m-datatable__pager-link--prev ' + previousClass} onClick={handlePrevious} data-page='4'><i className='la la-angle-left' /></a></li>
                {listOwnApplicationPage[0] && listOwnApplicationPage[0].map(function (page, index) {
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
        <div className='tab-pane' id='m_tabs_2_2' role='tabpanel'>
          <div className='col-md-12 m_datatable m-datatable m-datatable--default m-datatable--loaded m-datatable--scroll'>
            <div className='m-portlet'>
              <div className='m-portlet__body' id='bussinessusesapplicationList'>
                <div className='col-md-6 pull-left'>
                  <div className='dataTables_length' id='m_table_1_length' style={{'display': 'flex'}}>
                    <div style={{'display': 'flex', 'marginBottom': '15px'}}>
                      <h5 style={{'margin': '10px'}}>Search</h5>
                      <div className='m-input-icon m-input-icon--left'>
                        <input type='text' className='form-control m-input' placeholder='Search...' id='generalSearch' ref={input => (searchText3Box = input)} onKeyUp={handleInputUsesApplicationsChange} />
                        <span className='m-input-icon__icon m-input-icon__icon--left'>
                          <span>
                            <i className='la la-search' />
                          </span>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <table className='m-portlet table table-striped- table-bordered table-hover table-checkable dataTable no-footer' id='m_table_1' aria-describedby='m_table_1_info' role='grid'>
                  <thead>
                    <tr role='row'>
                      <th className='' ><h5>Name</h5></th>
                      <th className='' ><h5>Supplier</h5></th>
                      <th className='' ><h5>Owner</h5></th>
                      <th className='' ><h5>Total Cost</h5></th>
                    </tr>
                  </thead>
                  <tbody>
                    {businessUnitUsesApplicationList}
                  </tbody>
                </table>
              </div>
            </div>
            {businessUnitUsesApplicationList.length > 0 && (
            <div className='m-datatable__pager m-datatable--paging-loaded clearfix' style={{ 'textAlign': 'center' }}>
              <ul className='m-datatable__pager-nav'>
                <li><a href='' title='Previous' className={'m-datatable__pager-link m-datatable__pager-link--prev ' + previousClass} onClick={handlePrevious} data-page='4'><i className='la la-angle-left' /></a></li>
                {listUsesApplicationPage[0] && listUsesApplicationPage[0].map(function (page, index) {
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
    <div>
      <ReactModal isOpen={props.entitlementActionSettings.isLinkModalOpen}
        onRequestClose={closeLinkEntitlementModal}
        className='modal-dialog modal-lg'
        style={{'overlay': {zIndex: '1000'}, 'content': {'top': '20%'}}}
        >
        {/* <button onClick={closeLinkEntitlementModal} ><i className='la la-close' /></button> */}
        <div className={''}>
          <div className=''>
            <div className='modal-content'>
              <div className='modal-header'>
                <h4 className='modal-title' id='exampleModalLabel'>Link Entitlements</h4>
                <button type='button' onClick={closeLinkEntitlementModal} className='close' data-dismiss='modal' aria-label='Close'>
                  <span aria-hidden='true'>×</span>
                </button>
              </div>
              <div className='modal-body'>
                <div className='form-group row'>
                  <div className='col-4'><label htmlFor='SelectEntitlement' className='col-form-label'>Select Entitlements</label></div>
                  <div className='col-8'>
                    <Select
                      className='input-sm m-input'
                      placeholder='Select Entitlement'
                      isClearable
                      value={props.entitlementActionSettings.entitlementSelected}
                      onChange={handleSelect}
                      isSearchable
                      options={selectOptions}
                    />
                  </div>
                </div>
                <div className='form-group row'>
                  <div className='col-4'><label htmlFor='text' className='form-control-label'>Number of Licenses</label></div>
                  <div className='col-8'><input type='number'className='form-control' onChange={handleLicenseCountChange} value={props.entitlementActionSettings.licenseCount} autoComplete='off' required /></div>
                </div>
              </div>
              <div className='modal-footer'>
                <div className='row'>
                  <div className='col-md-6'>
                    <div className='btn-group m-btn-group m-btn-group--pill ' role='group' aria-label='...'>
                      <button type='button' onClick={closeLinkEntitlementModal} className='m-btn btn btn-secondary'>Close</button>
                      <button type='button' onClick={linkBusinessUnitEntitlement} className='m-btn btn btn-secondary'>Link</button>
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
      <ReactModal isOpen={props.entitlementActionSettings.isLinkUpdateModalOpen}
        onRequestClose={closeLinkUpdateModal}
        className='modal-dialog modal-lg'
        style={{'overlay': {zIndex: '1000'}, 'content': {'top': '20%'}}}
        >
        {/* <button onClick={closeLinkUpdateModal} ><i className='la la-close' /></button> */}
        <div className={''}>
          <div className=''>
            <div className='modal-content'>
              <div className='modal-header'>
                <h4 className='modal-title' id='exampleModalLabel'>Edit Link Entitlement</h4>
                <button type='button' onClick={closeLinkUpdateModal} className='close' data-dismiss='modal' aria-label='Close'>
                  <span aria-hidden='true'>×</span>
                </button>
              </div>
              <div className='modal-body'>
                <div className='form-group row'>
                  <div className='col-4'><label htmlFor='SelectEntitlement' className='col-form-label'>Entitlements</label></div>
                  <div className='col-8'>
                    {props.entitlementActionSettings.entitlementSelected ? props.entitlementActionSettings.entitlementSelected.name : ''}
                  </div>
                </div>
                <div className='form-group row'>
                  <div className='col-4'><label htmlFor='text' className='form-control-label'>Number of Licenses</label></div>
                  <div className='col-8'><input className='form-control' onChange={handleLicenseCountChange} value={props.entitlementActionSettings.licenseCount} autoComplete='off' required /></div>
                </div>
              </div>
              <div className='modal-footer'>
                <div className='row'>
                  <div className='col-md-6'>
                    <div className='btn-group m-btn-group m-btn-group--pill ' role='group' aria-label='...'>
                      <button type='button' onClick={closeLinkUpdateModal} className='m-btn btn btn-secondary'>Cancel</button>
                      <button type='button' onClick={editBusinessUnitEntitlement} className='m-btn btn btn-secondary'>Update</button>
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
      <ReactModal isOpen={props.entitlementActionSettings.isLinkDeleteModalOpen}
        onRequestClose={closeLinkDeleteModal}
        className='modal-dialog'
        style={{'overlay': {zIndex: '1000'}, 'content': {'top': '20%'}}}
        >
        <div className={''}>
          <div className=''>
            <div className='modal-content'>
              <div className='modal-header'>
                <h6 className='modal-title' id='exampleModalLabel'>Delete Link to Entitlement</h6>
                <button type='button' onClick={closeLinkDeleteModal} className='close' data-dismiss='modal' aria-label='Close'>
                  <span aria-hidden='true'>×</span>
                </button>
              </div>
              <div className='modal-body'>
                <p>Confirm deletion of Link to {props.entitlementActionSettings.entitlementSelected ? props.entitlementActionSettings.entitlementSelected.name : ''}</p>
              </div>
              <div className='modal-footer'>
                <div className='row'>
                  <div className='col-md-6'>
                    <div className='btn-group m-btn-group m-btn-group--pill ' role='group' aria-label='...'>
                      <button type='button' onClick={closeLinkDeleteModal} className='m-btn btn btn-secondary'>Back</button>
                      <button type='button' onClick={deleteBusinessUnitEntitlement} className='m-btn btn btn-secondary'>Confirm</button>
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
    {/* <Discussion name={'Entitlements'} TypeKey='Entitlement' type='ComponentType' {...props} />
    <NewDiscussion contextId={contextId} name={'Entitlements'} type='ComponentType' {...props} /> */}
  </div>
      )
    }
viewBusinessUnits.propTypes = {
    activeTab: PropTypes.any,
    setActiveTab: PropTypes.func,
    setCurrentPage: PropTypes.func,
    businessUnit: PropTypes.any,
    businessUnitAgreements: PropTypes.any,
    businessUnitEntitlements: PropTypes.any,
    businessOwnsApplications: PropTypes.any,
    businessUsesApplications: PropTypes.any,
    currentPage: PropTypes.any,
    entitlementActionSettings: PropTypes.any,
    entitlementComponents: PropTypes.any
}
