import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import styles from './suppliersComponent.scss'
import debounce from 'lodash/debounce'
import {defaults, Doughnut} from 'react-chartjs-2'
defaults.global.legend.display = false
const doughnutColor = ['#716aca', '#ffb822', '#00c5dc', '#f4516c', '#35bfa3 ', '#800000', '#808000', '#008000', '#008080', '#800080']
const formatAmount = (x) => {
  let parts = x.toString().split('.')
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
  if (typeof parts[1] !== 'undefined') {
    parts[1] = parts[1].substring(0, 2)
  }
  return parts.join('.')
}

export default function Suppliers (props) {
  console.log('props')
  console.log('props', props.expandSettings)
  let searchTextBox
  let suppliersList = ''
  let totalNoPages
  let perPage = 10
  let currentPage = props.currentPage
  let nextClass = ''
  let previousClass = ''
  let pageArray = []
  let listPage = []
  let paginationLimit = 6
  let totalSupplier
  let supplierPieChartData = {}
  let supplierCount = ''
  let agreementCount = ''
  let supplierAgreementCost = ''

  // Code for formating pie chart data
  if (props.suppliersSummary && props.suppliersSummary !== '') {
    supplierCount = props.suppliersSummary.resources[0].supplier_count
    agreementCount = props.suppliersSummary.resources[0].agreement_count
    supplierAgreementCost = props.suppliersSummary.resources[0].cost
    let labels = []
    let supplierPieData = []
    let colorData = []
    let datasetSupplierObject = {}
    let idx = 0
    props.suppliersSummary.resources[0].top10_cost_suppliers.forEach(function (element, i) {
      labels.push(element.name)
      supplierPieData.push(element.cost)
      colorData.push(doughnutColor[idx++])
    })
    supplierPieChartData.labels = labels
    supplierPieChartData.legend = false
    supplierPieChartData.datasets = []
    datasetSupplierObject.data = supplierPieData
    datasetSupplierObject.backgroundColor = colorData
    datasetSupplierObject.hoverBackgroundColor = colorData
    supplierPieChartData.datasets.push(datasetSupplierObject)
    console.log('s pie', supplierPieChartData)
  }

  // Code for populating data in table
  if (props.suppliers && props.suppliers !== '') {
    let sortedArray = _.orderBy(props.suppliers.resources, ['name'], ['asc'])
    suppliersList = sortedArray.map(function (data, index) {
      return (
        <tbody>
          <tr key={index} onClick={() => handleClick(data)}>
            <td><i className='fa fa-plus' aria-hidden='true' />&nbsp;<a href={'/suppliers/' + data.id} >{data.name}</a></td>
            <td>{''}</td>
            <td>{data.agreement_count}</td>
            <td>{data.managed_application_count}</td>
            <td>{data.supplied_software_count}</td>
            <td>{'R ' + formatAmount(data.cost)}</td>
          </tr>
        </tbody>
      )
    })

    totalSupplier = props.suppliers.total_count
    totalNoPages = Math.ceil(totalSupplier / perPage)
  }
  if (currentPage === 1) {
    previousClass = 'm-datatable__pager-link--disabled'
  }

  if (currentPage === totalNoPages) {
    nextClass = 'm-datatable__pager-link--disabled'
  }

  let i = 1
  while (i <= totalNoPages) {
    let pageParameter = {}
    pageParameter.number = i
    pageParameter.class = ''
    pageArray.push(pageParameter)
    i++
  }
  pageArray = _.chunk(pageArray, paginationLimit)
  listPage = _.filter(pageArray, function (group) {
    let found = _.filter(group, {'number': currentPage})
    if (found.length > 0) { return group }
  })

  let handleInputChange = debounce((e) => {
    console.log(e)
    const value = searchTextBox.value
    suppliersList = ''
    let payload = {
      'search': value || '',
      'page_size': 10,
      'page': currentPage
    }
    // if (searchTextBox.value.length > 2 || searchTextBox.value.length === 0) {
      props.fetchSuppliers(payload)
      // eslint-disable-next-line
      mApp && mApp.block('#supplierList', {overlayColor:'#000000',type:'loader',state:'success',message:'Processing...'})
      // mApp.blockPage({overlayColor:'#000000',type:'loader',state:'success',message:'Processing...'})
    // }
    listPage = _.filter(pageArray, function (group) {
      let found = _.filter(group, {'number': currentPage})
      if (found.length > 0) { return group }
    })
  }, 500)
  let handlePage = function (page) {
    if (page === 1) {
      previousClass = 'm-datatable__pager-link--disabled'
    } else if (page === totalNoPages) {
      nextClass = 'm-datatable__pager-link--disabled'
    }
    suppliersList = ''
    let payload = {
      'search': searchTextBox.value ? searchTextBox.value : '',
      'page_size': 10,
      'page': page
    }
    props.fetchSuppliers(payload)
    // eslint-disable-next-line
    mApp && mApp.block('#supplierList', {overlayColor:'#000000',type:'loader',state:'success',message:'Processing...'})
    // mApp.blockPage({overlayColor:'#000000',type:'loader',state:'success',message:'Processing...'})
    props.setCurrentPage(page)

    listPage = _.filter(pageArray, function (group) {
      let found = _.filter(group, {'number': page})
      if (found.length > 0) { return group }
    })
  }

  let handlePrevious = function (event) {
    event.preventDefault()
    if (currentPage === 1) {
      previousClass = styles.disabled
    } else {
      let payload = {
        'search': searchTextBox.value ? searchTextBox.value : '',
        'page_size': 10,
        'page': currentPage - 1
      }
      props.fetchSuppliers(payload)
      // eslint-disable-next-line
      mApp && mApp.block('#supplierList', {overlayColor:'#000000',type:'loader',state:'success',message:'Processing...'})
      // mApp.blockPage({overlayColor:'#000000',type:'loader',state:'success',message:'Processing...'})
      props.setCurrentPage(currentPage - 1)
    }
    listPage = _.filter(pageArray, function (group) {
      let found = _.filter(group, {'number': currentPage - 1})
      if (found.length > 0) { return group }
    })
  }

  let handleNext = function (event) {
    event.preventDefault()
    if (currentPage === totalNoPages) {
      nextClass = styles.disabled
    } else {
      let payload = {
        'search': searchTextBox.value ? searchTextBox.value : '',
        'page_size': 10,
        'page': currentPage + 1
      }
      suppliersList = ''
      props.fetchSuppliers(payload)
      // eslint-disable-next-line
      mApp && mApp.block('#supplierList', {overlayColor:'#000000',type:'loader',state:'success',message:'Processing...'})
      // mApp.blockPage({overlayColor:'#000000',type:'loader',state:'success',message:'Processing...'})
      props.setCurrentPage(currentPage + 1)
    }
    listPage = _.filter(pageArray, function (group) {
      let found = _.filter(group, {'number': currentPage + 1})
      if (found.length > 0) { return group }
    })
  }

  let resetList = function () {
    let sortedArray = _.orderBy(props.suppliers.resources, ['name'], ['asc'])
    suppliersList = sortedArray.map(function (data, index) {
      return (
        <tbody>
          <tr key={index} onClick={() => handleClick(data)}>
            <td><i className='fa fa-plus' aria-hidden='true' />&nbsp;<a href={'/suppliers/' + data.id} >{data.name}</a></td>
            <td>{''}</td>
            <td>{data.agreement_count}</td>
            <td>{data.managed_application_count}</td>
            <td>{data.supplied_software_count}</td>
            <td>{'R ' + formatAmount(data.cost)}</td>
          </tr>
        </tbody>
      )
    })
  }

  let handleClick = function (data) {
    console.log(data)
    let payload = {
      'supplier_id': data.id
    }
    let expandFalg = true
    if (props.expandSettings.selectedId === data.id) {
      expandFalg = !props.expandSettings.expandFlag
      console.log('test flag', expandFalg)
      if (!expandFalg) {
        resetList()
        // props.resetResponse()
      }
    } else {
      expandFalg = true
    }

    let expandSettings = {...props.expandSettings, 'selectedId': data.id, 'expandFlag': expandFalg}
    props.setExpandSettings(expandSettings)
    props.fetchSupplierSoftwares && props.fetchSupplierSoftwares(payload)
    // eslint-disable-next-line
    mApp && mApp.block('#supplierList', {overlayColor:'#000000',type:'loader',state:'success',message:'Processing...'})
  }

  if (props.supplierSoftwares && props.supplierSoftwares !== '') {
    let sortedArray = _.orderBy(props.suppliers.resources, ['name'], ['asc'])
    suppliersList = sortedArray.map(function (data, index) {
      let faClass = 'fa fa-plus'
      let childList = ''
      if (data.id === props.expandSettings.selectedId) {
        if (props.expandSettings.expandFlag) {
          faClass = 'fa fa-minus'
          if (props.supplierSoftwares.resources.length > 0) {
            childList = props.supplierSoftwares.resources.map(function (childData, idx) {
              return (
                <tr key={'child' + idx}>
                  <td>{''}</td>
                  <td><a href={'/softwares/' + childData.id} >{childData.name}</a></td>
                  <td>{''}</td>
                  <td>{''}</td>
                  <td>{''}</td>
                  <td>{'R ' + formatAmount(childData.cost)}</td>
                </tr>
              )
            })
          } else {
            childList = []
            childList.push((
              <tr key={0}>
                <td colSpan='6'>{'No data to display'}</td>
              </tr>
            ))
          }
        }
      }
      return (
        <tbody>
          <tr key={index} onClick={() => handleClick(data)}>
            <td><i className={faClass} aria-hidden='true' />&nbsp;<a href={'/suppliers/' + data.id} >{data.name}</a></td>
            <td>{''}</td>
            <td>{data.agreement_count}</td>
            <td>{data.managed_application_count}</td>
            <td>{data.supplied_software_count}</td>
            <td>{data.cost}</td>
          </tr>
          {childList}
        </tbody>
      )
    })
  }
    return (
      <div>
        <div className='row' id='supplierSummary' >
          <div className='col-md-4'>
            {/* <div className='m-portlet m-portlet--full-height'>
              <div className='m-portlet__body'>
                <div className='m-widget12'>
                  <div className='m-widget12__item'>
                    <span className='m-widget12__text1'>
                      <h2>Suppliers&nbsp;&nbsp;&nbsp;</h2>
                    </span>
                    <span className='m-widget12__text2'>
                      <h2>{supplierCount}</h2>
                    </span>
                  </div>
                </div>
              </div>
            </div> */}
            <div className='m-portlet m-portlet--bordered-semi m-portlet--widget-fit m-portlet--full-height m-portlet--skin-light  m-portlet--rounded-force'>
              <div className='m-portlet__head'>
                <div className='m-portlet__head-caption'>
                  <div className='m-portlet__head-title'>
                    <h3 className='m-portlet__head-text m--font-light'>
                      Activity
                    </h3>
                  </div>
                </div>
              </div>
              <div className='m-portlet__body'>
                <div className='m-widget17'>
                  <div className='m-widget17__visual m-widget17__visual--chart m-portlet-fit--top m-portlet-fit--sides m--bg-danger'>
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
                      <div className='m-widget17__item'>
                        <span className='m-widget17__icon'>
                          <i className='flaticon-truck m--font-brand' />
                        </span>
                        <span className='m-widget17__subtitle'>
                          <h3><a href='/suppliers'>Suppliers</a></h3>
                        </span>
                        <span className='m-widget17__desc'>
                          <h5>{supplierCount}</h5>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='col-md-4'>
            <div className='m-portlet m-portlet--bordered-semi m-portlet--widget-fit m-portlet--full-height m-portlet--skin-light  m-portlet--rounded-force'>
              <div className='m-portlet__head'>
                <div className='m-portlet__head-caption'>
                  <div className='m-portlet__head-title'>
                    <h3 className='m-portlet__head-text m--font-light'>
                      Activity
                    </h3>
                  </div>
                </div>
              </div>
              <div className='m-portlet__body'>
                <div className='m-widget17'>
                  <div className='m-widget17__visual m-widget17__visual--chart m-portlet-fit--top m-portlet-fit--sides m--bg-danger'>
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
                      <div className='m-widget17__item'>
                        <span className='m-widget17__icon'>
                          <i className='flaticon-business m--font-brand' />
                          <h4 style={{'float': 'right', 'paddingRight': '25px'}}>{agreementCount}</h4>
                        </span>
                        <span className='m-widget17__subtitle'>
                          <h3><a href='/agreements'>Agreements</a></h3>
                          <h5>R {formatAmount(supplierAgreementCost)}</h5>
                        </span>
                      </div>
                    </div>
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
                    <div className='col m-widget12__text1'>
                      <span className=''>
                        <h2>Cost Per</h2>
                        <br />
                        <h5>Top 10 Suppliers</h5>
                      </span>
                    </div>
                    <div className='col'>
                      <span className='m-widget12__text2'>
                        <Doughnut
                          id='supplierChart'
                          // width={180}
                          data={supplierPieChartData}
                          options={{
                            tooltips: {
                              callbacks: {
                                label: function (tooltipItem) {
                                    return supplierPieChartData.labels[tooltipItem.index] + ': R ' + formatAmount(supplierPieChartData.datasets[0].data[tooltipItem.index])
                                }
                              }
                            }
                          }}
                           />
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div id='supplierList'>
          <div className='row'>
            <div className={'col-md-3'}>
              <div className='m-input-icon m-input-icon--left'>
                <input type='text' className='form-control m-input' placeholder='Search...' id='generalSearch' ref={input => (searchTextBox = input)} onKeyUp={handleInputChange} />
                <span className='m-input-icon__icon m-input-icon__icon--left'>
                  <span>
                    <i className='la la-search' />
                  </span>
                </span>
              </div>
            </div>
          </div>
          {/* The table structure begins */}
          <div className='m-portlet m-portlet--mobile'>
            <div className='row' style={{'marginTop': '20px'}}>
              <div className='col-md-12'>
                <table className='table table-striped- table-bordered table-hover table-checkable responsive no-wrap dataTable dtr-inline collapsed' id='m_table_1' aria-describedby='m_table_1_info' role='grid'>
                  <thead>
                    <tr role='row'>
                      <th className='' style={{width: '61.25px'}}><h5>Supplier</h5></th>
                      <th className='' style={{width: '58.25px'}}><h5>Software</h5></th>
                      <th className='' style={{width: '108.25px'}}><h5># Agreements</h5></th>
                      <th className='' style={{width: '137.25px'}}><h5># Application Managed</h5></th>
                      <th className='' style={{width: '171.25px'}}><h5># Software Supplied</h5></th>
                      <th className='' style={{width: '132.25px'}}><h5>Total Cost</h5></th>
                    </tr>
                  </thead>
                  {/* <tbody> */}
                  {suppliersList}
                  {/* </tbody> */}
                </table>
              </div>
              <div className='row'>
                <div className='m_datatable m-datatable m-datatable--default m-datatable--loaded m-datatable--scroll' id='scrolling_vertical' style={{}}>
                  <div className='m-datatable__pager m-datatable--paging-loaded' style={{ 'textAlign': 'center' }}>
                    <ul className='m-datatable__pager-nav'>
                      <li><a href='' title='Previous' id='m_blockui_1_5' className={'m-datatable__pager-link m-datatable__pager-link--prev ' + previousClass} onClick={handlePrevious} data-page='4'><i className='la la-angle-left' /></a></li>
                      {listPage[0] && listPage[0].map(function (page, index) {
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
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* The table structure ends */}
      </div>
      )
    }
    Suppliers.propTypes = {
      suppliers: PropTypes.any,
      suppliersSummary: PropTypes.any,
      currentPage: PropTypes.any,
      supplierSoftwares: PropTypes.any,
      expandSettings: PropTypes.any
    }
