import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import styles from './softwareComponent.scss'
import debounce from 'lodash/debounce'
// import Softwares from '../../mockData/mockGetSoftwares'
const formatAmount = (x) => {
  let parts = x.toString().split('.')
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
  if (typeof parts[1] !== 'undefined') {
    parts[1] = parts[1].substring(0, 2)
  }
  return parts.join('.')
}

export default function Softwarelists (props) {
console.log('JSON data for Softwares', props.softwareSummary)
console.log('softwarelist', props.software)
console.log('props', props.expandSettings)
let softwareCount
let totalCost = ''
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
// let softwareagreementList
if (props.software && props.software !== '') {
  let sortedArray = _.orderBy(props.software.resources, ['name'], ['asc'])
  softwareList = props.software.resources.map(function (data, index) {
    return (
      <tr key={index}>
        <td><i className='fa fa-minus clickable' aria-hidden='true' data-toggle='collapse' data-target='#group-of-rows-1' aria-expanded='false' aria-controls='group-of-rows-1' /><a href={'/softwares/' + data.id} >{data.name}</a></td>
        <td>{''}</td>
        <td>{data.supplier}</td>
        <td>{data.instances}</td>
        <td>{data.cost}</td>
      </tr>
    )
  })
  softwareList = sortedArray.map(function (data, index) {
    return (
      <tbody>
        <tr key={index} onClick={() => handleClick(data)}>
          <td><i className='fa fa-plus' aria-hidden='true' />&nbsp;<a href={'/softwares/' + data.id} >{data.name}</a></td>
          <td>{''}</td>
          <td>{data.supplier}</td>
          <td>{data.instances}</td>
          <td>{'R ' + formatAmount(data.cost)}</td>
        </tr>
      </tbody>
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

let handleInputChange = debounce((e) => {
  console.log(e)
  const value = searchTextBox.value
  softwareList = ''
  let payload = {
    'search': value || '',
    'page_size': 10,
    'page': currentPage
  }
  // if (searchTextBox.value.length > 2 || searchTextBox.value.length === 0) {
    props.fetchSoftwares(payload)
    // eslint-disable-next-line
    mApp && mApp.block('#softwareList', {overlayColor:'#000000',type:'loader',state:'success',message:'Processing...'})
    // eslint-disable-next-line
    // eslint-disable-next-line
    // mApp.blockPage({overlayColor:'#000000',type:'loader',state:'success',message:'Processing...'})
    // props.setComponentTypeLoading(true)
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
  softwareList = ''
  let payload = {
    'search': searchTextBox.value ? searchTextBox.value : '',
    'page_size': 10,
    'page': page
  }
  props.fetchSoftwares(payload)
  // eslint-disable-next-line
  mApp && mApp.block('#softwareList', {overlayColor:'#000000',type:'loader',state:'success',message:'Processing...'})
  // eslint-disable-next-line
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
    props.fetchSoftwares(payload)
  // eslint-disable-next-line
  mApp && mApp.block('#softwareList', {overlayColor:'#000000',type:'loader',state:'success',message:'Processing...'})
  // eslint-disable-next-line
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
    props.fetchSoftwares(payload)
   // eslint-disable-next-line
   mApp && mApp.block('#softwareList', {overlayColor:'#000000',type:'loader',state:'success',message:'Processing...'})
   // eslint-disable-next-line
    props.setCurrentPage(currentPage + 1)
  }
  listPage = _.filter(pageArray, function (group) {
    let found = _.filter(group, {'number': currentPage + 1})
    if (found.length > 0) { return group }
  })
}
if (props.softwareSummary && props.softwareSummary !== '') {
  softwareCount = props.softwareSummary.resources[0].software_count
  totalCost = props.softwareSummary.resources[0].cost
}
let resetList = function () {
  let sortedArray = _.orderBy(props.software.resources, ['name'], ['asc'])
  softwareList = sortedArray.map(function (data, index) {
    return (
      <tbody>
        <tr key={index} onClick={() => handleClick(data)}>
          <td><i className='fa fa-plus' aria-hidden='true' />&nbsp;<a href={'/softwares/' + data.id} >{data.name}</a></td>
          <td>{''}</td>
          <td>{data.supplier}</td>
          <td>{data.instances}</td>
          <td>{'R ' + formatAmount(data.cost)}</td>
        </tr>
      </tbody>
    )
  })
}

let handleClick = function (data) {
  console.log(data)
  let payload = {
    'software_id': data.id
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
  props.fetchSoftwareAgreement && props.fetchSoftwareAgreement(payload)
  // eslint-disable-next-line
  mApp && mApp.block('#softwareList', {overlayColor:'#000000',type:'loader',state:'success',message:'Processing...'})
}

if (props.softwareAgreements && props.softwareAgreements !== '') {
  let sortedArray = _.orderBy(props.software.resources, ['name'], ['asc'])
  softwareList = sortedArray.map(function (data, index) {
    let faClass = 'fa fa-plus'
    let childList = ''
    if (data.id === props.expandSettings.selectedId) {
      if (props.expandSettings.expandFlag) {
        faClass = 'fa fa-minus'
        if (props.softwareAgreements.resources.length > 0) {
          let costByAgreementType = props.softwareAgreements.resources[0].cost_by_agreement_type
          let childArray = []
          for (let keyField in costByAgreementType) {
            if (costByAgreementType.hasOwnProperty(keyField)) {
              let obj = {}
              obj.name = keyField
              obj.cost = costByAgreementType[keyField]
              childArray.push(obj)
            }
          }
          if (childArray.length > 0) {
            childList = childArray.map(function (childData, idx) {
              return (
                <tr key={'child' + idx}>
                  <td>{''}</td>
                  <td>{childData.name}</td>
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
                <td colSpan='7'>{'No data to display'}</td>
              </tr>
            ))
          }
        }
      }
    }
    return (
      <tbody>
        <tr key={index} onClick={() => handleClick(data)}>
          <td><i className={faClass} aria-hidden='true' />&nbsp;<a href={'/softwares/' + data.id} >{data.name}</a></td>
          <td>{''}</td>
          <td>{data.supplier}</td>
          <td>{data.instances}</td>
          <td>{'R ' + formatAmount(data.cost)}</td>
        </tr>
        {childList}
      </tbody>
    )
  })
}
return (
  <div>
    <div className='row' id='softwareSummary'>
      <div className='col-xl-6'>
        {/* <div className='m-portlet m-portlet--full-height'>
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
                      <i className='flaticon-file m--font-brand' />
                    </span>
                    <span className='m-widget17__subtitle'>
                      <h1>Total</h1>
                      <h1 style={{'float': 'right', 'paddingRight': '25px', 'marginTop': '-35px'}}>{softwareCount}</h1>
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
      <div className='col-xl-6'>
        {/* <div className='m-portlet m-portlet--full-height'>
          <div className='m-portlet__body'>
            <div className='m-widget12'>
              <div className='m-widget12__item'>
                <span className='m-widget12__text1'>
                  <h1>Total Cost</h1>
                  <br />
                  <h2 className=''>{'R' + formatAmount(totalCost)}</h2>
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
                      <i className='flaticon-coins m--font-brand' />
                    </span>
                    <span className='m-widget17__subtitle'>
                      <h1>Total Cost</h1>
                      <h1 style={{'float': 'right', 'paddingRight': '25px', 'marginTop': '-35px'}}>{'R' + formatAmount(totalCost)}</h1>
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
    </div>
    <div id='softwareList'>
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
            {/* <tbody> */}
            {softwareList}
            {/* </tbody> */}
          </table>
        </div>
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
  currentPage: PropTypes.any,
  softwareAgreements: PropTypes.any,
  expandSettings: PropTypes.any
 }
