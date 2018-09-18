import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import styles from './suppliersComponent.scss'
// import SupplierData from '../../mockData/GetSuppliers'
// import PropTypes from 'prop-types'
import {defaults, Pie} from 'react-chartjs-2'
defaults.global.legend.display = false
const pieColor = ['#FF0000', '#FFFF00', '#00FF00', '#00FFFF', '#FF00FF', '#800000', '#808000', '#008000', '#008080', '#800080']

export default function Suppliers (props) {
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
      colorData.push(pieColor[idx++])
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
    suppliersList = props.suppliers.resources.map(function (data, index) {
      return (
        <tr key={index}>
          <td><a href={'/suppliers/' + data.id} >{data.name}</a></td>
          <td>{''}</td>
          <td>{''}</td>
          <td>{data.managed_application_count}</td>
          <td>{data.supplied_software_count}</td>
          <td>{data.cost}</td>
        </tr>
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

  let handleInputChange = function (event) {
    suppliersList = ''
    let payload = {
      'search': searchTextBox.value ? searchTextBox.value : '',
      'page_size': 10,
      'page': currentPage
    }
    if (searchTextBox.value.length > 2 || searchTextBox.value.length === 0) {
      props.fetchSuppliers(payload)
      // eslint-disable-next-line
      mApp && mApp.block('#supplierList', {overlayColor:'#000000',type:'loader',state:'success',message:'Processing...'})
      // mApp.blockPage({overlayColor:'#000000',type:'loader',state:'success',message:'Processing...'})
    }
    listPage = _.filter(pageArray, function (group) {
      let found = _.filter(group, {'number': currentPage})
      if (found.length > 0) { return group }
    })
  }
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

  // const data = {
  //   labels: [
  //     'Red',
  //     'Green',
  //     'Yellow'
  //   ],
  //   legend: false,
  //   datasets: [{
  //     data: [300, 50, 100],
  //     backgroundColor: [
  //     '#FF6384',
  //     '#36A2EB',
  //     '#FFCE56'
  //     ],
  //     hoverBackgroundColor: [
  //     '#FF6384',
  //     '#36A2EB',
  //     '#FFCE56'
  //     ]
  //   }]
  // }
    return (
      <div>
        <div className='row' id='supplierSummary' >
          <div className='col-md-3'>
            <div className='m-portlet m-portlet--full-height'>
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
            </div>
          </div>
          <div className='col-md-3'>
            <div className='m-portlet m-portlet--full-height'>
              <div className='m-portlet__body'>
                <div className='m-widget12'>
                  <div className='m-widget12__item'>
                    <span className='m-widget12__text1'>
                      <h2>Agreements&nbsp;&nbsp;&nbsp;</h2>
                      <br />
                      <h4>R {supplierAgreementCost}</h4>
                    </span>
                    <span className='m-widget12__text2'>
                      <h2>{agreementCount}</h2>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='col-md-6'>
            <div className='m-portlet m-portlet--full-height'>
              <div className='m-portlet__body'>
                <div className='m-widget12'>
                  <div className='m-widget12__item'>
                    <div className='col m-widget12__text1'>
                      <span className=''>
                        <h2>Cost Per</h2>
                        <br />
                        <h5>License</h5>
                        <h5>Support & Maintenance</h5>
                        <h5>Professional Service</h5>
                        <h5>Managed Services</h5>
                      </span>
                    </div>
                    <div className='col'>
                      <span className='m-widget12__text2'>
                        <Pie data={supplierPieChartData} />
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
                <input type='text' className='form-control m-input' placeholder='Search...' id='generalSearch' ref={input => (searchTextBox = input)} onChange={handleInputChange} />
                <span className='m-input-icon__icon m-input-icon__icon--left'>
                  <span>
                    <i className='la la-search' />
                  </span>
                </span>
              </div>
            </div>
          </div>
          {/* The table structure begins */}
          <div className='row' style={{'marginTop': '20px'}}>
            <div className='col-md-12'>
              <table className='m-portlet table table-striped- table-bordered table-hover table-checkable dataTable no-footer' id='m_table_1' aria-describedby='m_table_1_info' role='grid'>
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
                <tbody>
                  {suppliersList}
                </tbody>
              </table>
            </div>
            <div className='row col-md-12' id='scrolling_vertical'>
              <div className='m_datatable m-datatable m-datatable--default m-datatable--loaded m-datatable--scroll' id='scrolling_vertical' style={{}}>
                <div className='m-datatable__pager m-datatable--paging-loaded clearfix' style={{ 'text-align': 'center' }}>
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
        {/* The table structure ends */}
      </div>
      )
    }
    Suppliers.propTypes = {
      suppliers: PropTypes.any,
      suppliersSummary: PropTypes.any,
      currentPage: PropTypes.any
 }
