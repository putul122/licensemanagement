import React from 'react'
import _ from 'lodash'
import PropTypes from 'prop-types'
import styles from './applicationsComponent.scss'
import debounce from 'lodash/debounce'
import Discussion from '../../containers/discussion/discussionContainer'
import NewDiscussion from '../../containers/newDiscussion/newDiscussionContainer'
const formatAmount = (x) => {
  let parts = x.toString().split('.')
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
  if (typeof parts[1] !== 'undefined') {
    parts[1] = parts[1].substring(0, 2)
  }
  return parts.join('.')
}
export default function Applicationlists (props) {
  console.log(props.currentPage, props.application, props.applicationSoftwares, props.businessUnits)
  console.log('props', props.expandSettings)
  console.log('######UID', props.businessUnitId)
  console.log('pagination', props.perPage)
  let applicationCount = ''
  let totalCost = ''
  let searchTextBox
  let applicationList = ''
  let selectOptionList = ''
  let totalNoPages
  let perPage = props.perPage
  let currentPage = props.currentPage
  // let businessUnitId = props.businessUnitId
  let nextClass = ''
  let previousClass = ''
  let pageArray = []
  let listPage = []
  let paginationLimit = 6
  let totalApplication
  let contextId = ''
  let appPackage = JSON.parse(localStorage.getItem('packages'))
  let componentTypes = appPackage.resources[0].component_types
  let componentId = _.result(_.find(componentTypes, function (obj) {
      return obj.key === 'Application'
  }), 'component_type')
  contextId = componentId
  let openDiscussionModal = function (event) {
    event.preventDefault()
    props.setDiscussionModalOpenStatus(true)
  }
  let handleBlurdropdownChange = function (event) {
    console.log('handle Blur change', event.target.value)
  }
  let handledropdownChange = function (event) {
    console.log('handle change', event.target.value, typeof event.target.value)
    props.setPerPage(parseInt(event.target.value))
  }
  // let businessUnitId
  if (props.application && props.application !== '') {
    let sortedArray = _.orderBy(props.application.resources, ['name'], ['asc'])
    applicationList = sortedArray.map(function (data, index) {
      return (
        <tbody>
          <tr className='odd' key={index} onClick={() => handleClick(data)}>
            <td><i className='fa fa-plus' aria-hidden='true' />&nbsp;<a href={'/applications/' + data.id} >{data.name}</a></td>
            <td>{''}</td>
            <td>{''}</td>
            <td>{'R ' + formatAmount(data.cost)}</td>
            <td>{''}</td>
          </tr>
        </tbody>
      )
    })

    totalApplication = props.application.total_count
    totalNoPages = Math.ceil(totalApplication / perPage)
    console.log('%%%%%%', totalNoPages)
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
      let found = _.filter(group, {'number': 1})
      if (found.length > 0) { return group }
    })
  }

  let handleInputChange = debounce((e) => {
    console.log(e)
    if (searchTextBox) {
      const value = searchTextBox ? searchTextBox.value : ''
      props.setCurrentPage(1)
      if (props.businessUnitId === '') {
        let payload = {
          'search': value || '',
          'page_size': props.perPage,
          'page': currentPage
        }
        props.fetchApplications(payload)
        // eslint-disable-next-line
        mApp && mApp.block('#applicationList', {overlayColor:'#000000',type:'loader',state:'success',message:'Processing...'})
      }
      if (props.businessUnitId !== '') {
        let payload = {
          // 'business_unit_id': props.businessUnits.resources[0].id,
          'business_unit_id': props.businessUnitId,
          'search': value || '',
          'page_size': props.perPage,
          'page': currentPage
        }
        props.fetchApplications(payload)
        // eslint-disable-next-line
        mApp && mApp.block('#applicationList', {overlayColor:'#000000',type:'loader',state:'success',message:'Processing...'})
      }
      listPage = _.filter(pageArray, function (group) {
        let found = _.filter(group, {'number': currentPage})
        if (found.length > 0) { return group }
      })
    }
  }, 500)

    let handlePrevious = function (event) {
    event.preventDefault()
    if (currentPage === 1) {
      previousClass = styles.disabled
    } else {
    if (props.businessUnitId === '') {
        let payload = {
        'search': searchTextBox.value ? searchTextBox.value : '',
        'page_size': props.perPage,
        'page': currentPage - 1
        }
        props.fetchApplications(payload)
        // eslint-disable-next-line
        mApp && mApp.block('#applicationList', {overlayColor:'#000000',type:'loader',state:'success',message:'Processing...'})
        // props.setCurrentPage(currentPage - 1)
      }
      if (props.businessUnitId !== '') {
        let payload = {
          // 'business_unit_id': props.businessUnits.resources[0].id,
          'business_unit_id': props.businessUnitId,
          'search': searchTextBox.value ? searchTextBox.value : '',
          'page_size': props.perPage,
          'page': currentPage - 1
        }
        props.fetchApplications(payload)
        // eslint-disable-next-line
        mApp && mApp.block('#applicationList', {overlayColor:'#000000',type:'loader',state:'success',message:'Processing...'})
        }
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
    if (props.businessUnitId === '') {
        let payload = {
        'search': searchTextBox.value ? searchTextBox.value : '',
        'page_size': props.perPage,
        'page': currentPage + 1
        }
        props.fetchApplications(payload)
        // eslint-disable-next-line
        mApp && mApp.block('#applicationList', {overlayColor:'#000000',type:'loader',state:'success',message:'Processing...'})
        // props.setCurrentPage(currentPage + 1)
      }
      // props.setCurrentPage(currentPage + 1)
      if (props.businessUnitId !== '') {
        let payload = {
          // 'business_unit_id': props.businessUnits.resources[0].id,
          'business_unit_id': props.businessUnitId,
          'search': searchTextBox.value ? searchTextBox.value : '',
          'page_size': props.perPage,
          'page': currentPage + 1
        }
        props.fetchApplications(payload)
        // eslint-disable-next-line
        mApp && mApp.block('#applicationList', {overlayColor:'#000000',type:'loader',state:'success',message:'Processing...'})
        // props.setCurrentPage(currentPage + 1)
      }
      props.setCurrentPage(currentPage + 1)
    }
    listPage = _.filter(pageArray, function (group) {
      let found = _.filter(group, {'number': currentPage + 1})
      if (found.length > 0) { return group }
    })
  }

  let handlePage = function (page) {
    if (page === 1) {
      previousClass = 'm-datatable__pager-link--disabled'
    } else if (page === totalNoPages) {
      nextClass = 'm-datatable__pager-link--disabled'
    }
    // applicationList = ''
    if (props.businessUnitId === '') {
      let payload = {
      'search': searchTextBox.value ? searchTextBox.value : '',
      'page_size': props.perPage,
      'page': page
      }
      props.fetchApplications(payload)
      // eslint-disable-next-line
      mApp && mApp.block('#applicationList', {overlayColor:'#000000',type:'loader',state:'success',message:'Processing...'})
      // props.setCurrentPage(page)
    }
    if (props.businessUnitId !== '') {
      let payload = {
        // 'business_unit_id': props.businessUnits.resources[0].id,
        'business_unit_id': props.businessUnitId,
        'search': searchTextBox.value ? searchTextBox.value : '',
        'page_size': props.perPage,
        'page': page
      }
      props.fetchApplications(payload)
      // eslint-disable-next-line
      mApp && mApp.block('#applicationList', {overlayColor:'#000000',type:'loader',state:'success',message:'Processing...'})
      // props.setCurrentPage(page)
    }
    // let payload = {
    //   // 'business_unit_id': props.businessUnits.resources[0].id,
    //   'search': searchTextBox.value ? searchTextBox.value : '',
    //   'page_size': 10,
    //   'page': page
    // }
    // props.fetchApplications(payload)
    // // props.fetchBusinessUnits(payload)
    // // eslint-disable-next-line
    // mApp && mApp.block('#applicationList', {overlayColor:'#000000',type:'loader',state:'success',message:'Processing...'})
    // eslint-disable-next-line
    // eslint-disable-next-line
    // mApp.blockPage({overlayColor:'#000000',type:'loader',state:'success',message:'Processing...'})
    props.setCurrentPage(page)
    console.log('&&&&', page)
    listPage = _.filter(pageArray, function (group) {
      let found = _.filter(group, {'number': page})
      if (found.length > 0) { return group }
      console.log('&&&&', listPage)
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
  let resetList = function () {
    let sortedArray = _.orderBy(props.application.resources, ['name'], ['asc'])
    applicationList = sortedArray.map(function (data, index) {
      return (
        <tbody>
          <tr role='row' key={index} onClick={() => handleClick(data)}>
            <td><i className='fa fa-plus' aria-hidden='true' />&nbsp;<a href={'/applications/' + data.id} >{data.name}</a></td>
            <td>{''}</td>
            <td>{''}</td>
            <td>{'R ' + formatAmount(data.cost)}</td>
            <td>{''}</td>
          </tr>
        </tbody>
      )
    })
  }

  let handleClick = function (data) {
    console.log(data)
    let payload = {
      'application_id': data.id
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
    // props.fetchApplicationSoftwares && props.fetchApplicationSoftwares(payload)
    props.fetchApplicationEntitlements && props.fetchApplicationEntitlements(payload)
    // eslint-disable-next-line
    mApp && mApp.block('#supplierList', {overlayColor:'#000000',type:'loader',state:'success',message:'Processing...'})
  }

  if (props.applicationEntitlements && props.applicationEntitlements !== '') {
    let sortedArray = _.orderBy(props.application.resources, ['name'], ['asc'])
    applicationList = sortedArray.map(function (data, index) {
      let faClass = 'fa fa-plus'
      let childList = ''
      if (data.id === props.expandSettings.selectedId) {
        if (props.expandSettings.expandFlag) {
          faClass = 'fa fa-minus'
          if (props.applicationEntitlements.resources.length > 0) {
            childList = props.applicationEntitlements.resources.map(function (childData, idx) {
              let cost = childData.license_count * childData.license_unit_cost
              return (
                <tr key={'child' + idx}>
                  <td>{''}</td>
                  <td><a href={'/entitlements/' + childData.entitlement.id}>{childData.entitlement.name}</a></td>
                  <td>{childData.entitlement.supplier}</td>
                  <td>{''}</td>
                  <td>{childData.entitlement.cost ? 'R ' + formatAmount(cost) : ''}</td>
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
      return (
        <tbody>
          <tr key={index} onClick={() => handleClick(data)}>
            <td><i className={faClass} aria-hidden='true' />&nbsp;<a href={'/applications/' + data.id} >{data.name}</a></td>
            <td>{''}</td>
            <td>{''}</td>
            <td>{'R ' + formatAmount(data.cost)}</td>
            <td>{''}</td>
          </tr>
          {childList}
        </tbody>
      )
    })
  }
  let handleBlurChange = function (event) {
    console.log('handle Blur change', event.target.value)
  }
  let handleChange = function (event) {
    console.log('handle change', event.target.value, event.target.name, typeof event.target.value)
    if (parseInt(event.target.value) !== -111111) {
      let payload = {
        'business_unit_id': event.target.value,
        'search': '',
        'page_size': props.perPage,
        'page': 1
      }
      props.setDefaultSelect(event.target.value)
      props.setbusinessUnitId(event.target.value)
      // eslint-disable-next-line
      mApp.block('#applicationSummary', {overlayColor:'#000000',type:'loader',state:'success',message:'Processing...'})
      // eslint-disable-next-line
      mApp.block('#applicationList', {overlayColor:'#000000',type:'loader',state:'success',message:'Processing...'})
      props.fetchApplicationsSummary && props.fetchApplicationsSummary(payload)
      props.fetchApplications && props.fetchApplications(payload)
      // props.fetchBusinessUnits && props.fetchBusinessUnits(payload)
    }
    if (parseInt(event.target.value) === -111111) {
      let payload = {
        // 'business_unit_id': event.target.value,
        'search': '',
        'page_size': props.perPage,
        'page': 1
      }
      props.setDefaultSelect(event.target.value)
      // eslint-disable-next-line
      mApp.block('#applicationSummary', {overlayColor:'#000000',type:'loader',state:'success',message:'Processing...'})
      // eslint-disable-next-line
      mApp.block('#applicationList', {overlayColor:'#000000',type:'loader',state:'success',message:'Processing...'})
      props.fetchApplicationsSummary && props.fetchApplicationsSummary(payload)
      props.fetchApplications && props.fetchApplications(payload)
      // props.fetchBusinessUnits && props.fetchBusinessUnits(payload)
    }
  }

  if (props.businessUnits && props.businessUnits !== '') {
    if (props.businessUnits.error_code === null) {
      selectOptionList = props.businessUnits.resources.map(function (data, index) {
        return (<option key={index} value={data.id} style={{'backgroundColor': '#ffffff', 'color': '#000000', 'fontSize': '13px'}}>{data.name}</option>)
      })
      selectOptionList.unshift(<option key={-111111} value={-111111}>{'Select Business Unit'}</option>)
    }
  }

return (
  <div>
    <div className='row'>
      <div className='col-md-9'>
        <h2>Applications</h2>
      </div>
      <div className='col-md-3 float-right'>
        <a href='javascript:void(0);' data-skin='light' data-toggle='m-tooltip' data-placement='top' data-original-title='Initiate Discussion' onClick={openDiscussionModal} className='btn btn-info m-btn m-btn--icon btn-sm m-btn--icon-only  m-btn--pill m-btn--air pull-right'>
          <i className='fa flaticon-multimedia-3 fa-2x' />
        </a>
      </div>
    </div>
    <div className='row' style={{'marginBottom': '20px'}}>
      <div className={'col-md-3'}>
        <select className='btn btn-primary dropdown-toggle dropdown-toggle-split' data-toggle='dropdown' aria-haspopup='true' aria-expanded='false' onBlur={handleBlurChange} onChange={handleChange}>
          {selectOptionList}
        </select>
      </div>
    </div>
    <div className='row' id='applicationSummary'>
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
          <div className='m-portlet__body'>
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
                      <h3>Total </h3>
                      <h5 style={{'float': 'right', 'paddingRight': '25px', 'marginTop': '-35px'}}>{applicationCount}</h5>
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
                  <h2>{'R' + formatAmount(totalCost)}</h2>
                </span>
              </div>
            </div>
          </div>
        </div> */}
        <div className='m-portlet m-portlet--bordered-semi m-portlet--widget-fit  m-portlet--skin-light  m-portlet--rounded-force'>
          <div className='m-portlet__head'>
            <div className='m-portlet__head-caption'>
              <div className='m-portlet__head-title'>
                {/* <h3 className='m-portlet__head-text m--font-light'>
                 Activity
                </h3> */}
              </div>
            </div>
          </div>
          <div className='m-portlet__body'>
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
                      <h3>Total Cost</h3>
                      <h5 style={{'float': 'right', 'paddingRight': '25px', 'marginTop': '-35px'}}>{'R' + formatAmount(totalCost)}</h5>
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
    <div id='applicationList'>
      <div className='row' style={{'marginTop': '20px'}}>
        <div className='col-md-12'>
          <div className='m_datatable' id='scrolling_vertical'>
            <div className='m_datatable m-datatable m-datatable--default m-datatable--loaded m-datatable--scroll' id='scrolling_vertical' style={{}}>
              <div >
                <div className='m-portlet'>
                  <div className='m-portlet__body'>
                    <div id='m_table_1_wrapper' className='dataTables_wrapper dt-bootstrap4'>
                      <div className='row' style={{'marginBottom': '20px'}}>
                        <div className='col-sm-12 col-md-6'>
                          <div className='dataTables_length' id='m_table_1_length' style={{'display': 'flex'}}>
                            <h5 style={{'margin': '8px'}}>Show</h5>
                            <select value={props.perPage} onBlur={handleBlurdropdownChange} onChange={handledropdownChange} name='m_table_1_length' aria-controls='m_table_1' className='custom-select custom-select-sm form-control form-control-sm' style={{'height': '40px'}}>
                              <option value={10}>10</option>
                              <option value={25}>25</option>
                              <option value={50}>50</option>
                              <option value={100}>100</option>
                            </select>
                            <h5 style={{'margin': '8px'}}>Entries</h5>
                            {/* </label> */}
                          </div>
                        </div>
                        <div className='col-sm-12 col-md-6'>
                          <div className='dataTables_length pull-right' id='m_table_1_length' style={{'display': 'flex'}}>
                            <div style={{'display': 'flex'}}>
                              <h5 style={{'margin': '10px'}}>Search</h5>
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
                        </div>
                      </div>
                    </div>
                    <div className='dataTables_scrollBody' style={{position: 'relative', overflow: 'auto', width: '100%', 'maxHeight': '80vh'}}>
                      <table className='table table-striped- table-bordered table-hover table-checkable responsive no-wrap dataTable dtr-inline collapsed' id='m_table_1' aria-describedby='m_table_1_info' role='grid'>
                        <thead>
                          <tr role='row'>
                            <th className='sorting' style={{width: '61.25px'}}><h5>Application Name</h5></th>
                            {/* <th className='' style={{width: '38.25px'}}><h5>Software</h5></th> */}
                            <th className='' style={{width: '58.25px'}}><h5>Supplier Product Name</h5></th>
                            <th className='' style={{width: '137.25px'}}><h5>Supplier</h5></th>
                            <th className='' style={{width: '171.25px'}}><h5>Cost</h5></th>
                            <th className='' style={{width: '132.25px'}}><h5>Supplier Product Cost</h5></th>
                            {/* <th className='' style={{width: '206.25px'}}><h5>Cost</h5></th> */}
                          </tr>
                        </thead>
                        {/* <tbody> */}
                        {applicationList}
                        {/* </tbody> */}
                      </table>
                    </div>
                    <div className='row'>
                      <div className='col-md-12' id='scrolling_vertical'>
                        <div className='m_datatable m-datatable m-datatable--default m-datatable--loaded m-datatable--scroll pull-right' id='scrolling_vertical' style={{}}>
                          <div className='m-datatable__pager m-datatable--paging-loaded clearfix'>
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    {/* The table structure ends */}
    <Discussion name={'Applications'} TypeKey='Application' type='ComponentType' {...props} />
    <NewDiscussion contextId={contextId} name={'Applications'} type='ComponentType' {...props} />
  </div>
      )
    }
 Applicationlists.propTypes = {
  applicationSummary: PropTypes.any,
  application: PropTypes.any,
  currentPage: PropTypes.any,
  applicationSoftwares: PropTypes.any,
  applicationEntitlements: PropTypes.any,
  expandSettings: PropTypes.any,
  businessUnits: PropTypes.any,
  perPage: PropTypes.any,
  businessUnitId: PropTypes.any
 }
