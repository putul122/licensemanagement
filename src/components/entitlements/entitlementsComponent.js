import React from 'react'
import _ from 'lodash'
import debounce from 'lodash/debounce'
import ReactModal from 'react-modal'
import PropTypes from 'prop-types'
import Discussion from '../../containers/discussion/discussionContainer'
import NewDiscussion from '../../containers/newDiscussion/newDiscussionContainer'
import styles from './entitlementsComponent.scss'
ReactModal.setAppElement('#root')
const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    border: 'none',
    background: 'none',
    transform: 'translate(-50%, -50%)',
    width: '100%'
  }
}
const formatAmount = (x) => {
  let parts = x.toString().split('.')
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
  if (typeof parts[1] !== 'undefined') {
    parts[1] = parts[1].substring(0, 2)
  }
  return parts.join('.')
}

export default function Entitlementlists (props) {
  console.log(props.currentPage, props.entitlements)
  let entitlementCount = ''
  let consumed = ''
  let searchTextBox
  let entitlementsList = ''
  let totalNoPages
  let perPage = props.perPage
  let currentPage = props.currentPage
  let nextClass = ''
  let previousClass = ''
  let pageArray = []
  let listPage = []
  let paginationLimit = 6
  let totalEntitlement
  let newEntitlementName = ''
  let newEntitlementDescription = ''
  let contextId = ''
  let appPackage = JSON.parse(localStorage.getItem('packages'))
  let componentTypes = appPackage.resources[0].component_types
  let componentId = _.result(_.find(componentTypes, function (obj) {
      return obj.key === 'Entitlement'
  }), 'component_type')
  contextId = componentId
  let openDiscussionModal = function (event) {
    event.preventDefault()
    props.setDiscussionModalOpenStatus(true)
  }
  console.log('props', props.setModalOpenStatus)
  let handleBlurdropdownChange = function (event) {
    console.log('handle Blur change', event.target.value)
  }
  let handledropdownChange = function (event) {
    console.log('handle change', event.target.value, typeof event.target.value)
    props.setPerPage(parseInt(event.target.value))
  }

  if (props.entitlements && props.entitlements !== '') {
    entitlementsList = props.entitlements.resources.map(function (data, index) {
      return (
        <tr key={index}>
          <td><a href={'/entitlements/' + data.id} >{data.name}</a></td>
          <td><a href={'/suppliers/' + data.supplier_id}>{data.supplier}</a></td>
          <td>{data.purchased}</td>
          <td>{data.consumed}</td>
          <td>{'R ' + formatAmount(data.cost)}</td>
          <td>{'R ' + formatAmount(data.total_cost)}</td>
          {/* <td>{data.cost}</td> */}
        </tr>
      )
    })

    totalEntitlement = props.entitlements.total_count
    totalNoPages = Math.ceil(totalEntitlement / perPage)

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
  }

  let handleInputChange = debounce((e) => {
    console.log(e)
    const value = searchTextBox.value
    // entitlementsList = ''
    let payload = {
      'search': value || '',
      'page_size': props.perPage,
      'page': currentPage
    }
    // if (searchTextBox.value.length > 2 || searchTextBox.value.length === 0) {
      props.fetchEntitlements(payload)
      // eslint-disable-next-line
      mApp && mApp.block('#entitlementList', {overlayColor:'#000000',type:'loader',state:'success',message:'Processing...'})
      // props.setComponentTypeLoading(true)
    // }
    listPage = _.filter(pageArray, function (group) {
      let found = _.filter(group, {'number': currentPage})
      if (found.length > 0) { return group }
    })
  }, 500)
  let handlePrevious = function (event) {
    event.preventDefault()
    if (currentPage === 1) {
      previousClass = styles.disabled
    } else {
      let payload = {
        'search': searchTextBox.value ? searchTextBox.value : '',
        'page_size': props.perPage,
        'page': currentPage - 1
      }
      props.fetchEntitlements(payload)
      // eslint-disable-next-line
      mApp && mApp.block('#entitlementList', {overlayColor:'#000000',type:'loader',state:'success',message:'Processing...'})
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
        'page_size': props.perPage,
        'page': currentPage + 1
      }
      // entitlementsList = ''
      props.fetchEntitlements(payload)
      // eslint-disable-next-line
      mApp && mApp.block('#entitlementList', {overlayColor:'#000000',type:'loader',state:'success',message:'Processing...'})
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
    // entitlementsList = ''
    let payload = {
      'search': searchTextBox.value ? searchTextBox.value : '',
      'page_size': props.perPage,
      'page': page
    }
    props.fetchEntitlements(payload)
    // eslint-disable-next-line
    mApp && mApp.block('#entitlementList', {overlayColor:'#000000',type:'loader',state:'success',message:'Processing...'})
    props.setCurrentPage(page)

    listPage = _.filter(pageArray, function (group) {
      let found = _.filter(group, {'number': page})
      if (found.length > 0) { return group }
    })
  }
  if (props.entitlementsSummary && props.entitlementsSummary !== '') {
    entitlementCount = props.entitlementsSummary.resources[0].entitlement_count
    consumed = props.entitlementsSummary.resources[0].consumption_ratio_percent
  }
  let openModal = function (event) {
    event.preventDefault()
    props.setModalOpenStatus(true)
    console.log('props', props.setModalOpenStatus)
   }
  let closeModal = function () {
    props.setModalOpenStatus(false)
  }
  let createEntitlement = function (event) {
    event.preventDefault()
    // messageBlock = addComponentMessageResponse('')
    let payload = {
      'component_type': {
        'id': 975
      },
      'name': newEntitlementName.value,
      'description': newEntitlementDescription.value
    }
    props.addEntitlement(payload)
    props.setModalOpenStatus(false)
   }

return (
  <div>
    <div className='row'>
      <div className='col-md-9'>
        <h2>Entitlements</h2>
      </div>
      <div className='col-md-3'>
        <button type='button' onClick={openModal} className='btn btn-outline-info btn-sm'>Add Entitlment</button>&nbsp;
        <button onClick={openDiscussionModal} className='btn btn-outline-info btn-sm'>Create Discussion</button>&nbsp;
      </div>
    </div>
    <div>
      <ReactModal isOpen={props.modalIsOpen}
        onRequestClose={closeModal} style={customStyles}
        >
        {/* <button onClick={closeModal} ><i className='la la-close' /></button> */}
        <div className={''}>
          <div className='modal-dialog'>
            <div className='modal-content'>
              <div className='modal-header'>
                <h4 className='modal-title' id='exampleModalLabel'>New { 'Entitlement' }</h4>
                <button type='button' onClick={closeModal} className='close' data-dismiss='modal' aria-label='Close'>
                  <span aria-hidden='true'>×</span>
                </button>
              </div>
              <div className='modal-body'>
                <form>
                  {/* {messageBlock} */}
                  <div className='form-group'>
                    <label htmlFor='component-name' className='form-control-label'>Name:</label>
                    <input type='text' className='form-control' ref={input => (newEntitlementName = input)} id='agreement-name' autoComplete='off' required />
                  </div>
                  <div className='form-group'>
                    <label htmlFor='description-text' className='form-control-label'>Description:</label>
                    <textarea className='form-control'ref={textarea => (newEntitlementDescription = textarea)} defaultValue={''} autoComplete='off' required />
                  </div>
                </form>
              </div>
              <div className='modal-footer'>
                {/* <button type='button' className='btn btn-primary'>Save changes</button> */}
                <button type='button' onClick={createEntitlement} id='m_login_signup' className='btn btn-sm btn-info' >Add { '' }</button>
              </div>
            </div>
          </div>
        </div>
      </ReactModal>
    </div>
    <div className='row' id='entitlementSummary'>
      <div className='col-xl-6'>
        {/* <div className='m-portlet m-portlet--full-height'>
          <div className='m-portlet__body'>
            <div className='m-widget12'>
              <div className='m-widget12__item'>
                <span className='m-widget12__text1'>
                  <h1>Total</h1>
                </span>
                <span className='m-widget12__text2'>
                  <h1>{entitlementCount}</h1>
                </span>
              </div>
            </div>
          </div>
        </div> */}
        <div className='m-portlet m-portlet--bordered-semi m-portlet--widget-fit m-portlet--full-height m-portlet--skin-light  m-portlet--rounded-force'>
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
                  <div className='m-widget17__item' style={{'marginTop': '-8.87rem'}}>
                    <span className='m-widget17__icon'>
                      <i className='flaticon-file m--font-brand' />
                    </span>
                    <span className='m-widget17__subtitle'>
                      <h3>Total</h3>
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
        <div className='m-portlet m-portlet--bordered-semi m-portlet--widget-fit m-portlet--full-height m-portlet--skin-light  m-portlet--rounded-force'>
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
                  <div className='m-widget17__item' style={{'marginTop': '-8.87rem'}}>
                    <span className='m-widget17__icon'>
                      <i className='flaticon-coins m--font-brand' />
                    </span>
                    <span className='m-widget17__subtitle'>
                      <h3>Consumed</h3>
                      <h5 style={{'float': 'right', 'paddingRight': '25px', 'marginTop': '-35px'}}>{Number(consumed).toFixed(2) + '%'}</h5>
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
    <div id='entitlementList'>
      {/* The table structure begins */}
      <div className='row' style={{'marginTop': '20px'}}>
        <div className='col-md-12'>
          <div className='m_datatable' id='scrolling_vertical'>
            <div className='m_datatable m-datatable m-datatable--default m-datatable--loaded m-datatable--scroll' id='scrolling_vertical' style={{}}>
              <div className='dataTables_scrollBody' style={{position: 'relative', overflow: 'auto', width: '100%', 'maxHeight': '80vh'}}>
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
                    <table className='m-portlet table table-striped- table-bordered table-hover table-checkable dataTable no-footer' id='m_table_1' aria-describedby='m_table_1_info' role='grid'>
                      <thead>
                        <tr role='row'>
                          <th className='' style={{width: '61.25px'}}><h5>Name</h5></th>
                          <th className='' style={{width: '58.25px'}}><h5>Supplier</h5></th>
                          <th className='' style={{width: '108.25px'}}><h5>Purchased</h5></th>
                          <th className='' style={{width: '137.25px'}}><h5>Consumed</h5></th>
                          <th className='' style={{width: '171.25px'}}><h5>Cost Per Unit</h5></th>
                          <th className='' style={{width: '132.25px'}}><h5>Total cost</h5></th>
                        </tr>
                      </thead>
                      <tbody>
                        {entitlementsList}
                      </tbody>
                    </table>
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
    <Discussion name={'Entitlements'} TypeKey='Entitlement' type='ComponentType' {...props} />
    <NewDiscussion contextId={contextId} name={'Entitlements'} type='ComponentType' {...props} />
  </div>
      )
    }
 Entitlementlists.propTypes = {
  entitlementsSummary: PropTypes.any,
  entitlements: PropTypes.any,
  currentPage: PropTypes.any,
  modalIsOpen: PropTypes.any,
  setModalOpenStatus: PropTypes.func,
  perPage: PropTypes.any
 }
