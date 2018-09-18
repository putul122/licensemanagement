import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import styles from './softwareComponent.scss'
// import Softwares from '../../mockData/mockGetSoftwares'

export default function Softwarelists (props) {
console.log('JSON data for Softwares', props.softwareSummary)
console.log('softwarelist', props.software)
let softwareCount
let totalCost
let searchTextBox
let softwareList = ''
let totalNoPages
let perPage = 10
let currentPage = props.currentPage
let nextClass = ''
let previousClass = ''
let pageArray = []
let listPage = []
let paginationLimit = 6
let totalSoftware

if (props.software && props.software !== '') {
  softwareList = props.software.resources.map(function (data, index) {
    return (
      <tr key={index}>
        <td><a href={'/softwares/' + data.id} >{data.name}</a></td>
        <td>{data.agreement_count}</td>
        <td>{data.supplier}</td>
        <td>{data.instances}</td>
        <td>{data.cost}</td>
      </tr>
    )
  })

  totalSoftware = props.software.total_count
  totalNoPages = Math.ceil(totalSoftware / perPage)
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
  softwareList = ''
  let payload = {
    'search': searchTextBox.value ? searchTextBox.value : '',
    'page_size': 10,
    'page': currentPage
  }
  if (searchTextBox.value.length > 2 || searchTextBox.value.length === 0) {
    props.fetchSoftware(payload)
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
  softwareList = ''
  let payload = {
    'search': searchTextBox.value ? searchTextBox.value : '',
    'page_size': 10,
    'page': page
  }
  props.fetchSoftware(payload)
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
    props.fetchSoftware(payload)
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
    softwareList = ''
    props.fetchSoftware(payload)
    // eslint-disable-next-line
    // mApp.blockPage({overlayColor:'#000000',type:'loader',state:'success',message:'Processing...'})
    props.setCurrentPage(currentPage + 1)
  }
  listPage = _.filter(pageArray, function (group) {
    let found = _.filter(group, {'number': currentPage + 1})
    if (found.length > 0) { return group }
  })
}
// let SoftwareData = Softwares.resources
// console.log('list for softwares', SoftwareData)
// let softwarelists = SoftwareData.map(function (software, index) {
//   return (
//     <tr key={index}>
//       <td><a href={'/softwares/' + software.id}>{software.name}</a></td>
//       <td>{software.agreement_count}</td>
//       <td>{software.supplier}</td>
//       <td>{software.instances}</td>
//       <td>{software.cost}</td>
//     </tr>
//   )
// })
if (props.softwareSummary && props.softwareSummary !== '') {
  softwareCount = props.softwareSummary.resources[0].software_count
  totalCost = props.softwareSummary.resources[0].cost
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
                  <h1>{softwareCount}</h1>
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
                  <h2 className=''>R {totalCost}</h2>
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
              <th className='' style={{width: '58.25px'}}><h5>Agreement type</h5></th>
              <th className='' style={{width: '108.25px'}}><h5>Suppliers</h5></th>
              <th className='' style={{width: '137.25px'}}><h5>#Instances</h5></th>
              <th className='' style={{width: '171.25px'}}><h5>Total cost</h5></th>
            </tr>
          </thead>
          <tbody>
            {softwareList}
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
 Softwarelists.propTypes = {
  softwareSummary: PropTypes.any,
  software: PropTypes.any,
  currentPage: PropTypes.any
 }
