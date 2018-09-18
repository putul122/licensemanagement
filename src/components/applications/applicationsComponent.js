import React from 'react'
// import ApplicationsSummaryData from '../../mockData/mockGetApplicationsSummary'
// import ApplicationsData from '../../mockData/mockGetApplications'
import _ from 'lodash'
import PropTypes from 'prop-types'
import styles from './applicationsComponent.scss'

export default function Applicationlists (props) {
  console.log(props.currentPage, props.application)
  let applicationCount = ''
  let totalCost = ''
  let searchTextBox
  let applicationList = ''
  let totalNoPages
  let perPage = 10
  let currentPage = props.currentPage
  let nextClass = ''
  let previousClass = ''
  let pageArray = []
  let listPage = []
  let paginationLimit = 6
  let totalApplication

  if (props.application && props.application !== '') {
    applicationList = props.application.resources.map(function (data, index) {
      return (
        <tr key={index}>
          <td><a href={'/applications/' + data.id} >{data.name}</a></td>
          <td>{data.software_count}</td>
          <td>{data.supplied_by}</td>
          <td>{data.managed_by}</td>
          <td>{data.stage}</td>
          <td>{data.application_owner}</td>
          <td>{data.cost}</td>
        </tr>
      )
    })

    totalApplication = props.application.total_count
    totalNoPages = Math.ceil(totalApplication / perPage)
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
    applicationList = ''
    let payload = {
      'search': searchTextBox.value ? searchTextBox.value : '',
      'page_size': 10,
      'page': currentPage
    }
    if (searchTextBox.value.length > 2 || searchTextBox.value.length === 0) {
      props.fetchApplications(payload)
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
    applicationList = ''
    let payload = {
      'search': searchTextBox.value ? searchTextBox.value : '',
      'page_size': 10,
      'page': page
    }
    props.fetchApplications(payload)
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
      props.fetchApplications(payload)
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
      applicationList = ''
      props.fetchApplications(payload)
      // eslint-disable-next-line
      // mApp.blockPage({overlayColor:'#000000',type:'loader',state:'success',message:'Processing...'})
      props.setCurrentPage(currentPage + 1)
    }
    listPage = _.filter(pageArray, function (group) {
      let found = _.filter(group, {'number': currentPage + 1})
      if (found.length > 0) { return group }
    })
  }
  // applicationList = ApplicationsDatalist.map(function (application, index) {
  //   return (
  //     <tr key={index}>
  //       <td><a href={'/applications/' + application.id}>{application.name}</a></td>
  //       <td />
  //       <td>{application.supplied_by}</td>
  //       <td>{application.managed_by}</td>
  //       <td>{application.stage}</td>
  //       <td>{application.owner}</td>
  //       <td>{application.total_cost}</td>
  //     </tr>
  //   )
  // })
  if (props.applicationSummary && props.applicationSummary !== '') {
    applicationCount = props.applicationSummary.resources[0].application_count
    totalCost = props.applicationSummary.resources[0].cost
  }
return (
  <div>
    <div className='row'>
      <div className='col-xl-4'>
        <div className='m-portlet m-portlet--full-height'>
          <div className='m-portlet__body'>
            <div className='m-widget12'>
              <div className='m-widget12__item'>
                <span className='m-widget12__text1'>
                  <h1>Total</h1>
                </span>
                <span className='m-widget12__text2'>
                  <h1>{applicationCount}</h1>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='col-md-offset-1 col-xl-5'>
        <div className='m-portlet m-portlet--full-height'>
          <div className='m-portlet__body'>
            <div className='m-widget12'>
              <div className='m-widget12__item'>
                <span className='m-widget12__text1'>
                  <h1>Total Cost</h1>
                  <br />
                  <h2>R {totalCost}</h2>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
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
              <th className='' style={{width: '61.25px'}}><h5>Name</h5></th>
              <th className='' style={{width: '58.25px'}}><h5>Software</h5></th>
              <th className='' style={{width: '108.25px'}}><h5>Supplied By</h5></th>
              <th className='' style={{width: '137.25px'}}><h5>Managed By</h5></th>
              <th className='' style={{width: '171.25px'}}><h5>Stage</h5></th>
              <th className='' style={{width: '132.25px'}}><h5>Owner</h5></th>
              <th className='' style={{width: '206.25px'}}><h5>Cost</h5></th>
            </tr>
          </thead>
          <tbody>
            {applicationList}
          </tbody>
        </table>
      </div>
    </div>
    {/* The table structure ends */}
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
      )
    }
 Applicationlists.propTypes = {
  applicationSummary: PropTypes.any,
  application: PropTypes.any,
  currentPage: PropTypes.any
 }
