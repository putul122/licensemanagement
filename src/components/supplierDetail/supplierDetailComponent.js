import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import _ from 'lodash'
import Discussion from '../../containers/discussion/discussionContainer'
import NewDiscussion from '../../containers/newDiscussion/newDiscussionContainer'
import styles from './supplierDetailComponent.scss'
import {defaults, Doughnut} from 'react-chartjs-2'
defaults.global.legend.display = false
const pieColor = ['#FF0000', '#FFFF00', '#00FF00', '#00FFFF', '#FF00FF', '#800000', '#808000', '#008000', '#008080', '#800080']
const formatAmount = (x) => {
  let parts = x.toString().split('.')
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
  if (typeof parts[1] !== 'undefined') {
    parts[1] = parts[1].substring(0, 2)
  }
  return parts.join('.')
}

export default function Suppliers (props) {
  console.log(props)
  let supplierSoftwareList = ''
  let supplierApplicationList = ''
  let supplierAgreementList = ''
  let supplierName = ''
  let supplierId = ''
  let agreementCount = ''
  let agreementCost = ''
  let suppliedSoftwareCount = ''
  let agreementPieChartData = {}
  let totalAgreementPages
  let totalApplicationPages
  let totalSoftwarePages
  let perPage = 10
  let currentPage = props.currentPage
  let nextClass = ''
  let previousClass = ''
  let applicationPageArray = []
  let agreementPageArray = []
  let softwarePageArray = []
  let listApplicationPage = []
  let listAgreementPage = []
  let listSoftwarePage = []
  let paginationLimit = 6
  let DepartmentName
  let functionName
  let Product
  let PersonName
  let email
  let cellNumber
  let emailValue
  let DepartmentNameValue
  let PersonNameValue
  let functionNameValue
  let ProductValue
  let cellNumberValue
  let Surname
  let SurnameValue
  let contextId = props.match.params.id
  let openDiscussionModal = function (event) {
    event.preventDefault()
    props.setDiscussionModalOpenStatus(true)
  }
  if (props.supplier && props.supplier !== '') {
    supplierName = props.supplier.resources[0].name
    supplierId = props.supplier.resources[0].id
    agreementCount = props.supplier.resources[0].agreement_count
    agreementCost = props.supplier.resources[0].cost
    suppliedSoftwareCount = props.supplier.resources[0].supplied_software_count
    let costByAgreementType = props.supplier.resources[0].cost_by_agreement_type
    let labels = []
    let agreementPieData = []
    let colorData = []
    let datasetAgreementObject = {}
    let i = 0
    for (let keyField in costByAgreementType) {
      if (costByAgreementType.hasOwnProperty(keyField)) {
        labels.push(keyField)
        agreementPieData.push(costByAgreementType[keyField])
        // agreementPieData.push(10)
        colorData.push(pieColor[i++])
      }
    }
    agreementPieChartData.labels = labels
    agreementPieChartData.legend = false
    agreementPieChartData.datasets = []
    datasetAgreementObject.data = agreementPieData
    datasetAgreementObject.backgroundColor = colorData
    datasetAgreementObject.hoverBackgroundColor = colorData
    agreementPieChartData.datasets.push(datasetAgreementObject)
  }
  // code for supplier properties ends
  if (props.supplierDetails && props.supplierDetails !== '') {
    props.supplierDetails.forEach(function (property, index) {
      if (property.name === 'department_name') {
        DepartmentName = property.displayName
        DepartmentNameValue = property.value
      }
      if (property.name === 'person_name') {
        PersonName = property.displayName
        PersonNameValue = property.value
      }
      if (property.name === 'function') {
        functionName = property.displayName
        functionNameValue = property.value
      }
      if (property.name === 'email') {
        email = property.displayName
        emailValue = property.value
      }
      if (property.name === 'product') {
        Product = property.displayName
        ProductValue = property.value
      }
      if (property.name === 'cell_number') {
        cellNumber = property.displayName
        cellNumberValue = property.value
      }
      if (property.name === 'surname') {
        Surname = property.displayName
        SurnameValue = property.value
      }
    })
  }
  /* Code for edit functionality begins */
  let editDetailProperty = function (key, value) {
    let supplierPropertySettings = {...props.supplierPropertySettings}
    supplierPropertySettings[key] = value
    console.log(supplierPropertySettings)
    props.setSupplierPropertySettings(supplierPropertySettings)
  }

  let submitUpdates = function (event) {
    event.preventDefault()
    // eslint-disable-next-line
    mApp.blockPage({overlayColor:'#000000',type:'loader',state:'success',message:'Processing...'})
    let propertyPayload = []
    let supplierPropertySettings = {...props.supplierPropertySettings, 'isEditFlag': false}
    props.supplierDetails.forEach(function (property, index) {
      if (property.name === 'department_name') {
        let propertyPayloadObject = { 'op': 'replace', 'path': `/${property.typeProperty}/${property.valueType}`, 'value': supplierPropertySettings.department_name }
        propertyPayload.push(propertyPayloadObject)
      }
      if (property.name === 'person_name') {
        let propertyPayloadObject = { 'op': 'replace', 'path': `/${property.typeProperty}/${property.valueType}`, 'value': supplierPropertySettings.person_name }
        propertyPayload.push(propertyPayloadObject)
      }
      if (property.name === 'function') {
        let propertyPayloadObject = { 'op': 'replace', 'path': `/${property.typeProperty}/${property.valueType}`, 'value': supplierPropertySettings.function }
        propertyPayload.push(propertyPayloadObject)
      }
      if (property.name === 'email') {
        let propertyPayloadObject = { 'op': 'replace', 'path': `/${property.typeProperty}/${property.valueType}`, 'value': supplierPropertySettings.email }
        propertyPayload.push(propertyPayloadObject)
      }
      if (property.name === 'product') {
        let propertyPayloadObject = { 'op': 'replace', 'path': `/${property.typeProperty}/${property.valueType}`, 'value': supplierPropertySettings.product }
        propertyPayload.push(propertyPayloadObject)
      }
      if (property.name === 'cell_number') {
        let propertyPayloadObject = { 'op': 'replace', 'path': `/${property.typeProperty}/${property.valueType}`, 'value': supplierPropertySettings.cell_number }
        propertyPayload.push(propertyPayloadObject)
      }
      if (property.name === 'surname') {
        let propertyPayloadObject = { 'op': 'replace', 'path': `/${property.typeProperty}/${property.valueType}`, 'value': supplierPropertySettings.surname }
        propertyPayload.push(propertyPayloadObject)
      }
    })
    let payload = {}
    payload.componentId = supplierId
    payload.propertyData = propertyPayload
    console.log(payload)
    props.updateSupplierProperties(payload)
  }
  let editSupplierPropertyCancel = function () {
    let supplierPropertySettings = {...props.supplierPropertySettings, 'isEditFlag': false}
    props.supplierDetails.forEach(function (property, index) {
      if (property.name === 'department_name') {
        supplierPropertySettings.department_name = property.value
      }
      if (property.name === 'person_name') {
        supplierPropertySettings.person_name = property.value
      }
      if (property.name === 'function') {
        supplierPropertySettings.function = property.value
      }
      if (property.name === 'email') {
        supplierPropertySettings.email = property.value
      }
      if (property.name === 'product') {
        supplierPropertySettings.product = property.value
      }
      if (property.name === 'cell_number') {
        supplierPropertySettings.cell_number = property.value
      }
      if (property.name === 'surname') {
        supplierPropertySettings.surname = property.value
      }
    })
    props.setSupplierPropertySettings(supplierPropertySettings)
  }
  let editSuppliersProperty = function () {
    let supplierPropertySettings = {...props.supplierPropertySettings, 'isEditFlag': true}
    props.supplierDetails.forEach(function (property, index) {
      if (property.name === 'department_name') {
        supplierPropertySettings.department_name = property.value
      }
      if (property.name === 'person_name') {
        supplierPropertySettings.person_name = property.value
      }
      if (property.name === 'function') {
        supplierPropertySettings.function = property.value
      }
      if (property.name === 'email') {
        supplierPropertySettings.email = property.value
      }
      if (property.name === 'product') {
        supplierPropertySettings.product = property.value
      }
      if (property.name === 'cell_number') {
        supplierPropertySettings.cell_number = property.value
      }
      if (property.name === 'surname') {
        supplierPropertySettings.surname = property.value
      }
    })
    props.setSupplierPropertySettings(supplierPropertySettings)
  }
  /* Code for edit functionality begins */
  // code for suppliers properties ends
  let listApplication = function () {
    if (props.supplierApplications !== '') {
      if (props.supplierApplications.resources.length > 0) {
        supplierApplicationList = props.supplierApplications.resources.slice(perPage * (currentPage - 1), ((currentPage - 1) + 1) * perPage).map(function (data, index) {
          return (
            <tr key={index}>
              <td><a href={'/applications/' + data.id} >{data.name}</a></td>
              <td>{data.stage}</td>
              <td>{data.owner}</td>
              <td>{'R ' + formatAmount(data.cost)}</td>
            </tr>
          )
        })
      } else {
        supplierApplicationList = []
        supplierApplicationList.push((
          <tr key={0}>
            <td colSpan='4'>{'No data to display'}</td>
          </tr>
        ))
      }
    }
  }
  let listAgreement = function () {
    if (props.supplierAgreements !== '') {
      if (props.supplierAgreements.resources.length > 0) {
        supplierAgreementList = props.supplierAgreements.resources.slice(perPage * (currentPage - 1), ((currentPage - 1) + 1) * perPage).map(function (data, index) {
          return (
            <tr key={index}>
              <td><a href={'/agreements/' + data.id} >{data.name}</a></td>
              <td>{moment(data.expiry_date).format('DD MMM YYYY')}</td>
              <td>{data.agreement_type}</td>
              <td>{data.entitlement_count}</td>
              <td>{'R ' + formatAmount(data.cost)}</td>
            </tr>
          )
        })
      } else {
        supplierAgreementList = []
        supplierAgreementList.push((
          <tr key={0}>
            <td colSpan='5'>{'No data to display'}</td>
          </tr>
        ))
      }
    }
  }
  let listSoftware = function () {
    if (props.supplierSoftwares !== '') {
      if (props.supplierSoftwares.resources.length > 0) {
        supplierSoftwareList = props.supplierSoftwares.resources.slice(perPage * (currentPage - 1), ((currentPage - 1) + 1) * perPage).map(function (data, index) {
          return (
            <tr key={index}>
              <td><a href={'/softwares/' + data.id} >{data.name}</a></td>
              <td>{'R ' + formatAmount(data.cost)}</td>
            </tr>
          )
        })
      } else {
        supplierSoftwareList = []
        supplierSoftwareList.push((
          <tr key={0}>
            <td colSpan='2'>{'No data to display'}</td>
          </tr>
        ))
      }
    }
  }
  if (props.supplierApplications && props.supplierApplications !== '') {
    totalApplicationPages = Math.ceil(props.supplierApplications.resources.length / perPage)
    let i = 1
    while (i <= totalApplicationPages) {
      let pageParameter = {}
      pageParameter.number = i
      pageParameter.class = ''
      applicationPageArray.push(pageParameter)
      i++
    }
    applicationPageArray = _.chunk(applicationPageArray, paginationLimit)
    listApplicationPage = _.filter(applicationPageArray, function (group) {
      let found = _.filter(group, {'number': currentPage})
      if (found.length > 0) { return group }
    })
    // List initial data for supplier Applications
    listApplication()
  }
  if (props.supplierAgreements && props.supplierAgreements !== '') {
    totalAgreementPages = Math.ceil(props.supplierAgreements.resources.length / perPage)
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
    // List initial data for supplier Agreement
    listAgreement()
  }
  if (props.supplierSoftwares && props.supplierSoftwares !== '') {
    totalSoftwarePages = Math.ceil(props.supplierSoftwares.resources.length / perPage)
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
    // List initial data for supplier Applications
    listSoftware()
  }
  if (props.activeTab === 'agreement') {
    if (currentPage === 1) {
      previousClass = 'm-datatable__pager-link--disabled'
    }
    if (currentPage === totalAgreementPages) {
      nextClass = 'm-datatable__pager-link--disabled'
    }
  } else if (props.activeTab === 'software') {
    if (currentPage === 1) {
      previousClass = 'm-datatable__pager-link--disabled'
    }
    if (currentPage === totalSoftwarePages) {
      nextClass = 'm-datatable__pager-link--disabled'
    }
  } else if (props.activeTab === 'application') {
    if (currentPage === 1) {
      previousClass = 'm-datatable__pager-link--disabled'
    }
    if (currentPage === totalApplicationPages) {
      nextClass = 'm-datatable__pager-link--disabled'
    }
  }
  let handleListAndPagination = function (page) {
    if (props.activeTab === 'agreement') {
      listAgreement()
      props.setCurrentPage(page)
      listAgreementPage = _.filter(agreementPageArray, function (group) {
        let found = _.filter(group, {'number': page})
        if (found.length > 0) { return group }
      })
    } else if (props.activeTab === 'software') {
      listSoftware()
      props.setCurrentPage(page)
      listSoftwarePage = _.filter(softwarePageArray, function (group) {
        let found = _.filter(group, {'number': page})
        if (found.length > 0) { return group }
      })
    } else if (props.activeTab === 'application') {
      listApplication()
      props.setCurrentPage(page)
      listApplicationPage = _.filter(applicationPageArray, function (group) {
        let found = _.filter(group, {'number': page})
        if (found.length > 0) { return group }
      })
    }
  }
  let handlePage = function (page) {
    if (props.activeTab === 'agreement') {
      if (page === 1) {
        previousClass = 'm-datatable__pager-link--disabled'
      } else if (page === totalAgreementPages) {
        nextClass = 'm-datatable__pager-link--disabled'
      }
      handleListAndPagination(page)
    } else if (props.activeTab === 'software') {
      if (page === 1) {
        previousClass = 'm-datatable__pager-link--disabled'
      } else if (page === totalSoftwarePages) {
        nextClass = 'm-datatable__pager-link--disabled'
      }
      handleListAndPagination(page)
    } else if (props.activeTab === 'application') {
      if (page === 1) {
        previousClass = 'm-datatable__pager-link--disabled'
      } else if (page === totalApplicationPages) {
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
    if (props.activeTab === 'agreement') {
      if (currentPage === totalAgreementPages) {
        nextClass = styles.disabled
      } else {
        props.setCurrentPage(currentPage + 1)
        handleListAndPagination(currentPage + 1)
      }
    } else if (props.activeTab === 'software') {
      if (currentPage === totalSoftwarePages) {
        nextClass = styles.disabled
      } else {
        props.setCurrentPage(currentPage + 1)
        handleListAndPagination(currentPage + 1)
      }
    } else if (props.activeTab === 'application') {
      if (currentPage === totalApplicationPages) {
        nextClass = styles.disabled
      } else {
        props.setCurrentPage(currentPage + 1)
        handleListAndPagination(currentPage + 1)
      }
    }
  }
    return (
      <div>
        <div className='row'>
          <div className='col-md-10'>
            <h2>{supplierName}</h2>
          </div>
          <div className='col-md-2'>
            <button onClick={openDiscussionModal} className='btn btn-outline-info btn-sm'>Create Discussion</button>&nbsp;
          </div>
        </div>
        <div className='row' id='supplier'>
          <div className='col-md-4'>
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
                          <i className='flaticon-business m--font-brand' />
                          <h4 style={{'float': 'right', 'paddingRight': '25px'}}>{agreementCount}</h4>
                        </span>
                        <span className='m-widget17__subtitle'>
                          <h3><a href='/entitlements'>Agreements</a></h3>
                          <h5>R {formatAmount(agreementCost)}</h5>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='col-md-4'>
            <div className='m-portlet m-portlet--bordered-semi m-portlet--widget-fit  m-portlet--skin-light  m-portlet--rounded-force'>
              <div className='m-portlet__head'>
                <div className='m-portlet__head-caption'>
                  <div className='m-portlet__head-title' />
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
                          <h4 style={{'float': 'right', 'paddingRight': '25px'}}>{suppliedSoftwareCount}</h4>
                        </span>
                        <span className='m-widget17__subtitle'>
                          <h3><a href='/entitlements'>Software</a></h3>
                          {/* <h5>R {formatAmount(agreementCost)}</h5> */}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='col-md-4'>
            <div className='m-portlet m-portlet--head-overlay m-portlet--full-height  m-portlet--rounded-force'>
              <div className='m-portlet__body'>
                <div className='m-widget27 m-portlet-fit--sides' >
                  <div className='m-widget27__container' >
                    <div className='m-widget27__tab tab-content m-widget27--no-padding' >
                      <br />
                      <div className='row  align-items-center'>
                        <div className='col'>
                          <div className='m-widget14__legends' >
                            <div className='m-widget14__legend' >
                              <span className='m-widget14__legend-text'><h5>Cost per agreement type</h5></span>
                            </div>
                          </div>
                        </div>
                        <div className='col'>
                          <div id='m_chart_personal_income_quater_1' className='m-widget27__chart' style={{'height': '150px'}}>
                            <Doughnut
                              data={agreementPieChartData}
                              options={{
                                responsive: true,
                                tooltips: {
                                  callbacks: {
                                    label: function (tooltipItem) {
                                        return agreementPieChartData.labels[tooltipItem.index] + ': R ' + formatAmount(agreementPieChartData.datasets[0].data[tooltipItem.index])
                                    }
                                  }
                                }
                              }} />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* <div className='m-portlet'>
              <div className='m-portlet__body' style={{'height': '217px'}}>
                <div className='m-widget12'>
                  <div className='m-widget12__item'>
                    <div className='col-md-4' style={{'marginLeft': '80px'}}>
                      <span className='m-widget12__text2' >
                        <h3 style={{'textAlign': 'center', 'color': '#5867dd'}}>Cost per agreement type</h3>
                        <Doughnut
                          data={agreementPieChartData}
                          options={{
                            responsive: true,
                            tooltips: {
                              callbacks: {
                                label: function (tooltipItem) {
                                    return agreementPieChartData.labels[tooltipItem.index] + ': R ' + formatAmount(agreementPieChartData.datasets[0].data[tooltipItem.index])
                                }
                              }
                            }
                          }} />
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div> */}
          </div>
        </div>
        {/* The table structure begins */}
        <div className='' style={{'marginTop': '20px'}}>
          <ul className='nav nav-tabs nav-fill' role='tablist'>
            <li className='nav-item'>
              <a className='nav-link active' onClick={() => { props.setCurrentPage(1); props.setActiveTab('suppliersdetail') }} data-toggle='tab' href='#m_tabs_2_4'>Suppliers Details</a>
            </li>
            <li className='nav-item'>
              <a className='nav-link' onClick={() => { props.setCurrentPage(1); props.setActiveTab('agreement') }} data-toggle='tab' href='#m_tabs_2_1'>Agreements</a>
            </li>
            <li className='nav-item'>
              <a className='nav-link' onClick={() => { props.setCurrentPage(1); props.setActiveTab('software') }} data-toggle='tab' href='#m_tabs_2_2'>Supplied Software</a>
            </li>
            <li className='nav-item'>
              <a className='nav-link' onClick={() => { props.setCurrentPage(1); props.setActiveTab('application') }} data-toggle='tab' href='#m_tabs_2_3'>Managed Applications</a>
            </li>
          </ul>
          <div className='tab-content'>
            <div className='tab-pane' id='m_tabs_2_1' role='tabpanel'>
              <div className='col-md-12 m_datatable m-datatable m-datatable--default m-datatable--loaded m-datatable--scroll'>
                <div className='m-portlet'>
                  <div className='m-portlet__body'>
                    <table className='m-portlet table table-striped- table-bordered table-hover table-checkable dataTable no-footer' id='m_table_1' aria-describedby='m_table_1_info' role='grid'>
                      <thead>
                        <tr role='row'>
                          <th className='' ><h5>Name</h5></th>
                          <th className='' ><h5>Expiry Date</h5></th>
                          <th className='' ><h5>Agreement Type</h5></th>
                          <th className='' ><h5># Entitlements</h5></th>
                          <th className='' ><h5>Cost</h5></th>
                        </tr>
                      </thead>
                      <tbody>
                        {supplierAgreementList}
                      </tbody>
                    </table>
                  </div>
                </div>
                {supplierAgreementList.length > 0 && (
                  <div className='m-datatable__pager m-datatable--paging-loaded clearfix' style={{ 'text-align': 'center' }}>
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
            <div className='tab-pane' id='m_tabs_2_2' role='tabpanel'>
              <div className='col-md-12 m_datatable m-datatable m-datatable--default m-datatable--loaded m-datatable--scroll'>
                <div className='m-portlet'>
                  <div className='m-portlet__body'>
                    <table className='m-portlet table table-striped- table-bordered table-hover table-checkable dataTable no-footer' id='m_table_1' aria-describedby='m_table_1_info' role='grid'>
                      <thead>
                        <tr role='row'>
                          <th className='' style={{width: '61.25px'}}><h5>Name</h5></th>
                          <th className='' style={{width: '58.25px'}}><h5>Cost</h5></th>
                        </tr>
                      </thead>
                      <tbody>
                        {supplierSoftwareList}
                      </tbody>
                    </table>
                  </div>
                </div>
                {supplierSoftwareList.length > 0 && (
                  <div className='m-datatable__pager m-datatable--paging-loaded clearfix' style={{ 'text-align': 'center' }}>
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
            <div className='tab-pane active' id='m_tabs_2_4' role='tabpanel'>
              <div className='m-portlet m-portlet--mobile m-portlet--body-progress-'>
                <div className='m-portlet__body'>
                  <div className='row'>
                    <div className='col-xl-12'>
                      <div className='m-section m-section--last'>
                        <div className='m-section__content'>
                          <div className='m-demo'>
                            <div className='m-demo__preview'>
                              {!props.supplierPropertySettings.isEditFlag && (<div className='pull-right'><button type='button' onClick={editSuppliersProperty} className='btn btn-outline-info btn-sm'>Edit Suppliers Details</button></div>)}
                              <div className='m-list-search'>
                                <div className='m-list-search__results'>
                                  <div className='m-widget13'>
                                    <div className='m-widget13__item'>
                                      <span className='m-widget13__desc m-widget13__text' style={{'width': '10%', 'color': '#000000'}}>
                                        {DepartmentName}
                                      </span>
                                      {!props.supplierPropertySettings.isEditFlag && <div className='col-md-3'>
                                        <span className='m-widget13__text'>{DepartmentNameValue}</span>
                                      </div>}
                                      {props.supplierPropertySettings.isEditFlag && <div className='col-md-3 m--margin-bottom-20'>
                                        <input type='text' className='form-control m-input' value={props.supplierPropertySettings.department_name} onChange={(event) => { editDetailProperty('department_name', event.target.value) }} aria-describedby='basic-addon2' />
                                      </div>}
                                    </div>
                                    <div className='m-widget13__item'>
                                      <span className='m-widget13__desc m-widget13__text' style={{'width': '10%', 'color': '#000000'}}>
                                        {functionName}
                                      </span>
                                      {!props.supplierPropertySettings.isEditFlag && <div className='col-md-3'>
                                        <span className='m-widget13__text'>{functionNameValue}</span>
                                      </div>}
                                      {props.supplierPropertySettings.isEditFlag && <div className='col-md-3 m--margin-bottom-20'>
                                        <input type='text' className='form-control m-input' value={props.supplierPropertySettings.function} onChange={(event) => { editDetailProperty('function', event.target.value) }} aria-describedby='basic-addon2' />
                                      </div>}
                                    </div>
                                    <div className='m-widget13__item'>
                                      <span className='m-widget13__desc m-widget13__text m-widget13__number-bolder' style={{'width': '10%', 'color': '#000000'}}>
                                        {Product}
                                      </span>
                                      {!props.supplierPropertySettings.isEditFlag && <div className='col-md-3'>
                                        <span className='m-widget13__text'>{ProductValue}</span>
                                      </div>}
                                      {props.supplierPropertySettings.isEditFlag && <div className='col-md-3 m--margin-bottom-20'>
                                        <input type='text' className='form-control m-input' value={props.supplierPropertySettings.product} onChange={(event) => { editDetailProperty('product', event.target.value) }} aria-describedby='basic-addon2' />
                                      </div>}
                                    </div>
                                    <div className='m-widget13__item'>
                                      <span className='m-widget13__desc m-widget13__text m-widget13__number-bolder' style={{'width': '10%', 'color': '#000000'}}>
                                        {PersonName}
                                      </span>
                                      {!props.supplierPropertySettings.isEditFlag && <div className='col-md-3'>
                                        <span className='m-widget13__text'>{PersonNameValue}</span>
                                      </div>}
                                      {props.supplierPropertySettings.isEditFlag && <div className='col-md-3 m--margin-bottom-20'>
                                        <input type='text' className='form-control m-input' value={props.supplierPropertySettings.person_name} onChange={(event) => { editDetailProperty('person_name', event.target.value) }} aria-describedby='basic-addon2' />
                                      </div>}
                                    </div>
                                    <div className='m-widget13__item'>
                                      <span className='m-widget13__desc m-widget13__text m-widget13__number-bolder' style={{'width': '10%', 'color': '#000000'}}>
                                        {Surname}
                                      </span>
                                      {!props.supplierPropertySettings.isEditFlag && <div className='col-md-3'>
                                        <span className='m-widget13__text'>{SurnameValue}</span>
                                      </div>}
                                      {props.supplierPropertySettings.isEditFlag && <div className='col-md-3 m--margin-bottom-20'>
                                        <input type='text' className='form-control m-input' value={props.supplierPropertySettings.surname} onChange={(event) => { editDetailProperty('surname', event.target.value) }} aria-describedby='basic-addon2' />
                                      </div>}
                                    </div>
                                    <div className='m-widget13__item'>
                                      <span className='m-widget13__desc m-widget13__text m-widget13__number-bolder' style={{'width': '10%', 'color': '#000000'}}>
                                        {email}
                                      </span>
                                      {!props.supplierPropertySettings.isEditFlag && <div className='col-md-3'>
                                        <span className='m-widget13__text'>{emailValue}</span>
                                      </div>}
                                      {props.supplierPropertySettings.isEditFlag && <div className='col-md-3 m--margin-bottom-20'>
                                        <input type='text' className='form-control m-input' value={props.supplierPropertySettings.email} onChange={(event) => { editDetailProperty('email', event.target.value) }} aria-describedby='basic-addon2' />
                                      </div>}
                                    </div>
                                    <div className='m-widget13__item'>
                                      <span className='m-widget13__desc m-widget13__text m-widget13__number-bolder' style={{'width': '10%', 'color': '#000000'}}>
                                        {cellNumber}
                                      </span>
                                      {!props.supplierPropertySettings.isEditFlag && <div className='col-md-3'>
                                        <span className='m-widget13__text'>{cellNumberValue}</span>
                                      </div>}
                                      {props.supplierPropertySettings.isEditFlag && <div className='col-md-3 m--margin-bottom-20'>
                                        <input type='text' className='form-control m-input' value={props.supplierPropertySettings.cell_number} onChange={(event) => { editDetailProperty('cell_number', event.target.value) }} aria-describedby='basic-addon2' />
                                      </div>}
                                    </div>
                                    {props.supplierPropertySettings.isEditFlag && <div className='pull-right' style={{'paddingBottom': '20px'}}>
                                      <button type='button' onClick={editSupplierPropertyCancel} className='btn btn-outline-info btn-sm m--margin-left-10'>Cancel</button>
                                      <button type='button' onClick={submitUpdates} className='btn btn-outline-info btn-sm m--margin-left-10'>Save</button>
                                    </div>}
                                    <br />
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className='tab-pane' id='m_tabs_2_3' role='tabpanel'>
              <div className='col-md-12 m_datatable m-datatable m-datatable--default m-datatable--loaded m-datatable--scroll' >
                <div className='m-portlet'>
                  <div className='m-portlet__body'>
                    <table className='m-portlet table table-striped- table-bordered table-hover table-checkable dataTable no-footer' id='m_table_1' aria-describedby='m_table_1_info' role='grid'>
                      <thead>
                        <tr role='row'>
                          <th className='' ><h5>Name</h5></th>
                          <th className='' ><h5>Stage</h5></th>
                          <th className='' ><h5>Owner</h5></th>
                          <th className='' ><h5>Cost</h5></th>
                        </tr>
                      </thead>
                      <tbody>
                        {supplierApplicationList}
                      </tbody>
                    </table>
                  </div>
                </div>
                {supplierApplicationList.length > 0 && (
                  <div className='m-datatable__pager m-datatable--paging-loaded clearfix' style={{ 'text-align': 'center' }}>
                    <ul className='m-datatable__pager-nav'>
                      <li><a href='' title='Previous' className={'m-datatable__pager-link m-datatable__pager-link--prev ' + previousClass} onClick={handlePrevious} data-page='4'><i className='la la-angle-left' /></a></li>
                      {listApplicationPage[0] && listApplicationPage[0].map(function (page, index) {
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
        {/* The table structure ends */}
        <Discussion name={supplierName} type='Component' {...props} />
        <NewDiscussion contextId={contextId} name={supplierName} type='Component' {...props} />
      </div>
      )
    }
    Suppliers.propTypes = {
      match: PropTypes.any,
      supplier: PropTypes.any,
      supplierApplications: PropTypes.any,
      supplierSoftwares: PropTypes.any,
      supplierAgreements: PropTypes.any,
      supplierPropertySettings: PropTypes.any,
      // supplierPropertiesPayload: PropTypes.any,
      currentPage: PropTypes.any,
      activeTab: PropTypes.any,
      setCurrentPage: PropTypes.func,
      setActiveTab: PropTypes.func,
      // pushSupplierPropertyPayload: PropTypes.func,
      supplierDetails: PropTypes.any
      // setSupplierPropertySettings: PropTypes.func
 }
