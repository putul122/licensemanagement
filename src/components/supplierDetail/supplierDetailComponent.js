import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import _ from 'lodash'
import styles from './supplierDetailComponent.scss'
import {defaults, Pie} from 'react-chartjs-2'
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

  if (props.supplier && props.supplier !== '') {
    supplierName = props.supplier.resources[0].name
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
      } else {
        handleListAndPagination(page)
      }
    } else if (props.activeTab === 'software') {
      if (page === 1) {
        previousClass = 'm-datatable__pager-link--disabled'
      } else if (page === totalSoftwarePages) {
        nextClass = 'm-datatable__pager-link--disabled'
      } else {
        handleListAndPagination(page)
      }
    } else if (props.activeTab === 'application') {
      if (page === 1) {
        previousClass = 'm-datatable__pager-link--disabled'
      } else if (page === totalApplicationPages) {
        nextClass = 'm-datatable__pager-link--disabled'
      } else {
        handleListAndPagination(page)
      }
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
        <h2>{supplierName}</h2>
        <div className='row' id='supplier'>
          <div className='col-md-3'>
            <div className='m-portlet m-portlet--full-height'>
              <div className='m-portlet__body'>
                <div className='m-widget12'>
                  <div className='m-widget12__item'>
                    <span className='m-widget12__text1'>
                      <h2>Agreements&nbsp;&nbsp;&nbsp;</h2>
                      <br /><br /><br /><br />
                      <h2 className='pull-right'>R {formatAmount(agreementCost)}</h2>
                    </span>
                    <span className='m-widget12__text2'>
                      <h2>{agreementCount}</h2>
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
                      <h2>Software</h2>
                    </span>
                    <span className='m-widget12__text2'>
                      <h2>{suppliedSoftwareCount}</h2>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='col-md-5'>
            <div className='m-portlet m-portlet--full-height'>
              <div className='m-portlet__body'>
                <div className='m-widget12'>
                  <div className='m-widget12__item'>
                    <div className='col m-widget12__text1'>
                      <span className=''>
                        <h2>Cost Per</h2>
                        <br />
                        <h5>Agreement Type</h5>
                      </span>
                    </div>
                    <div className='col'>
                      <span className='m-widget12__text2'>
                        <Pie
                          data={agreementPieChartData}
                          options={{
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
            </div>
          </div>
        </div>
        {/* The table structure begins */}
        <div className='' style={{'marginTop': '20px'}}>
          <ul className='nav nav-tabs nav-fill' role='tablist'>
            <li className='nav-item'>
              <a className='nav-link active' onClick={() => { props.setCurrentPage(1); props.setActiveTab('agreement') }} data-toggle='tab' href='#m_tabs_2_1'>Agreements</a>
            </li>
            <li className='nav-item'>
              <a className='nav-link' onClick={() => { props.setCurrentPage(1); props.setActiveTab('software') }} data-toggle='tab' href='#m_tabs_2_2'>Supplied Software</a>
            </li>
            <li className='nav-item'>
              <a className='nav-link' onClick={() => { props.setCurrentPage(1); props.setActiveTab('application') }} data-toggle='tab' href='#m_tabs_2_3'>Managed Applications</a>
            </li>
          </ul>
          <div className='tab-content'>
            <div className='tab-pane active' id='m_tabs_2_1' role='tabpanel'>
              <div className='col-md-12 m_datatable m-datatable m-datatable--default m-datatable--loaded m-datatable--scroll'>
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
            <div className='tab-pane' id='m_tabs_2_3' role='tabpanel'>
              <div className='col-md-12 m_datatable m-datatable m-datatable--default m-datatable--loaded m-datatable--scroll' >
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
      </div>
      )
    }
    Suppliers.propTypes = {
      supplier: PropTypes.any,
      supplierApplications: PropTypes.any,
      supplierSoftwares: PropTypes.any,
      supplierAgreements: PropTypes.any,
      currentPage: PropTypes.any,
      activeTab: PropTypes.any,
      setCurrentPage: PropTypes.func,
      setActiveTab: PropTypes.func
 }
