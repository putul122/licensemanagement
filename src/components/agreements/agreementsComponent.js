import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import styles from './agreementsComponent.scss'
// import SupplierData from '../../mockData/GetSuppliers'
// import PropTypes from 'prop-types'
import {defaults, Pie} from 'react-chartjs-2'
defaults.global.legend.display = false
const pieColor = ['#FF0000', '#FFFF00', '#00FF00', '#00FFFF', '#FF00FF', '#800000', '#808000', '#008000', '#008080', '#800080']

export default function Agreements (props) {
  console.log(props.agreementsSummary, props.agreements, props.currentPage)
  let agreementsList = ''
  let agreementCount = ''
  let expireIn90Days = ''
  let searchTextBox
  let totalNoPages
  let perPage = 10
  let currentPage = props.currentPage
  let nextClass = ''
  let previousClass = ''
  let pageArray = []
  let listPage = []
  let paginationLimit = 6
  let totalAgreement
  let agreementPieChartData = {}

  if (props.agreementsSummary && props.agreementsSummary !== '') {
    agreementCount = props.agreementsSummary.resources[0].agreement_count
    expireIn90Days = props.agreementsSummary.resources[0].expire_in_90_days
    let costByAgreementType = props.agreementsSummary.resources[0].cost_by_agreement_type
    let labels = []
    let agreementPieData = []
    let colorData = []
    let datasetAgreementObject = {}
    let idx = 0
    for (let keyField in costByAgreementType) {
      if (costByAgreementType.hasOwnProperty(keyField)) {
        labels.push(keyField)
        agreementPieData.push(costByAgreementType[keyField])
        colorData.push(pieColor[idx++])
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

  if (props.agreements && props.agreements !== '') {
    agreementsList = props.agreements.resources.map(function (data, index) {
      return (
        <tr key={index}>
          <td><a href={'javascript:void(0);'} >{data.name}</a></td>
          <td>{data.supplier}</td>
          <td>{data.expiry_date}</td>
          <td>{''}</td>
          <td>{data.entitlement_count}</td>
          <td>{data.cost}</td>
        </tr>
      )
    })

    totalAgreement = props.agreements.total_count
    totalNoPages = Math.ceil(totalAgreement / perPage)
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
    agreementsList = ''
    let payload = {
      'search': searchTextBox.value ? searchTextBox.value : '',
      'page_size': 10,
      'page': currentPage
    }
    if (searchTextBox.value.length > 2 || searchTextBox.value.length === 0) {
      props.fetchAgreements(payload)
      // eslint-disable-next-line
      mApp && mApp.block('#agreementList', {overlayColor:'#000000',type:'loader',state:'success',message:'Processing...'})
      // eslint-disable-next-line
      // mApp.blockPage({overlayColor:'#000000',type:'loader',state:'success',message:'Processing...'})
      // props.setComponentTypeLoading(true)
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
    agreementsList = ''
    let payload = {
      'search': searchTextBox.value ? searchTextBox.value : '',
      'page_size': 10,
      'page': page
    }
    props.fetchAgreements(payload)
    // eslint-disable-next-line
    mApp && mApp.block('#agreementList', {overlayColor:'#000000',type:'loader',state:'success',message:'Processing...'})
    // eslint-disable-next-line
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
      props.fetchAgreements(payload)
      // eslint-disable-next-line
      mApp && mApp.block('#agreementList', {overlayColor:'#000000',type:'loader',state:'success',message:'Processing...'})
      // eslint-disable-next-line
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
      agreementsList = ''
      props.fetchAgreements(payload)
      // eslint-disable-next-line
      mApp && mApp.block('#agreementList', {overlayColor:'#000000',type:'loader',state:'success',message:'Processing...'})
      // eslint-disable-next-line
      // mApp.blockPage({overlayColor:'#000000',type:'loader',state:'success',message:'Processing...'})
      props.setCurrentPage(currentPage + 1)
    }
    listPage = _.filter(pageArray, function (group) {
      let found = _.filter(group, {'number': currentPage + 1})
      if (found.length > 0) { return group }
    })
  }

    return (
      <div>
        <h3>Agreements</h3>
        <div className='row' id='agreementSummary'>
          <div className='col-md-3'>
            <div className='m-portlet m-portlet--full-height'>
              <div className='m-portlet__body'>
                <div className='m-widget12'>
                  <div className='m-widget12__item'>
                    <span className='m-widget12__text1'>
                      <h3>Agreements&nbsp;&nbsp;&nbsp;</h3>
                      <br />
                      <h2>R {'50'}</h2>
                    </span>
                    <span className='m-widget12__text2'>
                      <h2>{agreementCount}</h2>
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
                      <h4>Expiry in 90 days</h4>
                    </span>
                    <span className='m-widget12__text2'>
                      <h2>{expireIn90Days}</h2>
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
                        <h5>Professional Service</h5>
                        <h5>Support & Maintenance</h5>
                      </span>
                    </div>
                    <div className='col'>
                      <span className='m-widget12__text2'>
                        <Pie data={agreementPieChartData} />
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div id='agreementList'>
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
                    <th className='' style={{width: '108.25px'}}><h5># Agreements</h5></th>
                    <th className='' style={{width: '61.25px'}}><h5>Supplier</h5></th>
                    <th className='' style={{width: '58.25px'}}><h5>Expiry Date</h5></th>
                    <th className='' style={{width: '137.25px'}}><h5>Type</h5></th>
                    <th className='' style={{width: '171.25px'}}><h5># Entitlements</h5></th>
                    <th className='' style={{width: '132.25px'}}><h5>Cost</h5></th>
                  </tr>
                </thead>
                <tbody>
                  {agreementsList}
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
    Agreements.propTypes = {
    agreements: PropTypes.any,
    agreementsSummary: PropTypes.any,
    currentPage: PropTypes.any
 }
