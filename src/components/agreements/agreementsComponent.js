import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import styles from './agreementsComponent.scss'
import moment from 'moment'
import ReactModal from 'react-modal'
import debounce from 'lodash/debounce'
import NewDiscussion from '../../containers/newDiscussion/newDiscussionContainer'
import Discussion from '../../containers/discussion/discussionContainer'
import {defaults, Doughnut} from 'react-chartjs-2'
ReactModal.setAppElement('#root')
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

export default function Agreements (props) {
  console.log(props.agreementsSummary, props.agreements, props.currentPage)
  let agreementsList = ''
  let agreementCount = ''
  let agreementCost = ''
  let expireIn90Days = ''
  let searchTextBox
  let totalNoPages
  let perPage = props.perPage
  let currentPage = props.currentPage
  let nextClass = ''
  let previousClass = ''
  let pageArray = []
  let listPage = []
  let paginationLimit = 6
  let totalAgreement
  let agreementPieChartData = {}
  let contextId = ''
  let appPackage = JSON.parse(localStorage.getItem('packages'))
  let componentTypes = appPackage.resources[0].component_types
  let componentId = _.result(_.find(componentTypes, function (obj) {
      return obj.key === 'Agreement'
  }), 'component_type')
  contextId = componentId
  let openDiscussionModal = function (event) {
    event.preventDefault()
    props.setDiscussionModalOpenStatus(true)
  }
  // Code for add new agreement
  let newAgreementName = ''
  let newAgreementDescription = ''
  let addAgreement = function () {
    let addAgreementSettings = {...props.addAgreementSettings, isAddModalOpen: true}
    props.setAddAgreementSettings(addAgreementSettings)
  }
  let createNewAgreement = function () {
    // eslint-disable-next-line
    mApp.blockPage({overlayColor:'#000000',type:'loader',state:'success',message:'Processing...'})
    let appPackage = JSON.parse(localStorage.getItem('packages'))
    let componentTypes = appPackage.resources[0].component_types
    let componentTypeId = _.result(_.find(componentTypes, function (obj) {
      return obj.key === 'Agreement'
    }), 'component_type')
    let payload = {
      'component_type': {
        'id': componentTypeId
      },
      'name': newAgreementName.value,
      'description': newAgreementDescription.value
    }
    props.addAgreement(payload)
    closeAddModal()
  }
  let closeAddModal = function () {
    let addAgreementSettings = {...props.addAgreementSettings, isAddModalOpen: false}
    props.setAddAgreementSettings(addAgreementSettings)
  }
  // End code for add new agreement
  let handleBlurdropdownChange = function (event) {
    console.log('handle Blur change', event.target.value)
  }
  let handledropdownChange = function (event) {
    console.log('handle change', event.target.value, typeof event.target.value)
    props.setPerPage(parseInt(event.target.value))
  }
  if (props.agreementsSummary && props.agreementsSummary !== '') {
    agreementCount = props.agreementsSummary.resources[0].agreement_count
    agreementCost = props.agreementsSummary.resources[0].cost
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
        colorData.push(doughnutColor[idx++])
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
    let sortedArray = _.orderBy(props.agreements.resources, ['name'], ['asc'])
    agreementsList = sortedArray.map(function (data, index) {
      return (
        <tr key={index}>
          <td><a href={'/agreements/' + data.id} >{data.name}</a></td>
          <td>{data.supplier}</td>
          <td>{moment(data.expiry_date).format('DD MMM YYYY')}</td>
          <td>{''}</td>
          <td>{data.entitlement_count}</td>
          <td>{'R ' + formatAmount(data.cost)}</td>
        </tr>
      )
    })

    totalAgreement = props.agreements.total_count
    totalNoPages = Math.ceil(totalAgreement / perPage)

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
    agreementsList = ''
    let payload = {
      'search': value || '',
      'page_size': props.perPage,
      'page': currentPage
    }
    // if (searchTextBox.value.length > 2 || searchTextBox.value.length === 0) {
      props.fetchAgreements(payload)
      // eslint-disable-next-line
      mApp && mApp.block('#agreementList', {overlayColor:'#000000',type:'loader',state:'success',message:'Processing...'})
      // eslint-disable-next-line
      // mApp.blockPage({overlayColor:'#000000',type:'loader',state:'success',message:'Processing...'})
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
        'page_size': props.perPage,
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
  let handlePage = function (page) {
    if (page === 1) {
      previousClass = 'm-datatable__pager-link--disabled'
    } else if (page === totalNoPages) {
      nextClass = 'm-datatable__pager-link--disabled'
    }
    // agreementsList = ''
    let payload = {
      'search': searchTextBox.value ? searchTextBox.value : '',
      'page_size': props.perPage,
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

    return (
      <div>
        <div className='row'>
          <div className='col-md-9'>
            <h2>Agreements</h2>
          </div>
          <div className='col-md-3'>
            <button onClick={addAgreement} className='btn btn-outline-info btn-sm'>Add Agreement</button>&nbsp;
            <button onClick={openDiscussionModal} className='btn btn-outline-info btn-sm'>Create Discussion</button>&nbsp;
          </div>
        </div>
        <div className='row' id='agreementSummary'>
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
                          <i className='flaticon-truck m--font-brand' />
                        </span>
                        <span className='m-widget17__subtitle'>
                          <h3>Agreements&nbsp;&nbsp;&nbsp;</h3>
                          <h4 style={{'float': 'right', 'paddingRight': '25px', 'marginTop': '-35px'}}>{agreementCount}</h4>
                        </span>
                        <span className='m-widget17__desc'>
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
                          <i className='flaticon-calendar-1 m--font-brand' />
                        </span>
                        <span className='m-widget17__subtitle'>
                          <h3>Expiry in 90 days</h3>
                        </span>
                        <span className='m-widget17__desc'>
                          <h5>{expireIn90Days}</h5>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='col-md-4' style={{'textAlign': 'center'}}>
            <div className='m-portlet'>
              {/* <div className='m-portlet__body' style={{'height': '217px'}}>
                <div className='m-widget12'>
                  <div className='m-widget12__item'>
                    <div className='col-md-4' style={{'marginLeft': '80px'}}>
                      <span className='m-widget12__text2' >
                        <h3 style={{'textAlign': 'center'}}>Cost per agreement type</h3>
                        <Doughnut data={agreementPieChartData}
                          // width={280}
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
              </div> */}
              <div className='m-portlet__body' style={{'height': '217px'}}>
                <div className='m-widget14__header'>
                  <span className='m-widget14__desc'>
                    <h3>Cost per agreement type</h3>
                  </span>
                </div>
                <div className='row  align-items-center'>
                  <div className='col-md-9'>
                    <div style={{'marginLeft': '100px'}}>
                      <Doughnut data={agreementPieChartData}
                          // width={280}
                        options={{
                          tooltips: {
                            callbacks: {
                              label: function (tooltipItem) {
                                  return agreementPieChartData.labels[tooltipItem.index] + ': R ' + formatAmount(agreementPieChartData.datasets[0].data[tooltipItem.index])
                              }
                            }
                          }
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div id='agreementList'>
          {/* The table structure begins */}
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
                          <table className='m-portlet table table-striped- table-bordered table-hover table-checkable dataTable no-footer' id='m_table_1' aria-describedby='m_table_1_info' role='grid'>
                            <thead>
                              <tr role='row'>
                                <th className=''><h5># Agreements</h5></th>
                                <th className=''><h5>Supplier</h5></th>
                                <th className=''><h5>Expiry Date</h5></th>
                                <th className=''><h5>Type</h5></th>
                                <th className=''><h5># Entitlements</h5></th>
                                <th className=''><h5>Cost</h5></th>
                              </tr>
                            </thead>
                            <tbody>
                              {agreementsList}
                            </tbody>
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
        <div>
          <ReactModal isOpen={props.addAgreementSettings.isAddModalOpen}
            onRequestClose={closeAddModal}
            style={customStyles}
            >
            {/* <button onClick={closeModal} ><i className='la la-close' /></button> */}
            <div className={''}>
              <div className='modal-dialog'>
                <div className='modal-content'>
                  <div className='modal-header'>
                    <h4 className='modal-title' id='exampleModalLabel'>New { 'Agreement' }</h4>
                    <button type='button' onClick={closeAddModal} className='close' data-dismiss='modal' aria-label='Close'>
                      <span aria-hidden='true'>×</span>
                    </button>
                  </div>
                  <div className='modal-body'>
                    <form>
                      {/* {messageBlock} */}
                      <div className='form-group'>
                        <label htmlFor='component-name' className='form-control-label'>Name:</label>
                        <input type='text' className='form-control' ref={input => (newAgreementName = input)} id='agreement-name' autoComplete='off' required />
                      </div>
                      <div className='form-group'>
                        <label htmlFor='description-text' className='form-control-label'>Description:</label>
                        <textarea className='form-control'ref={textarea => (newAgreementDescription = textarea)} defaultValue={''} autoComplete='off' required />
                      </div>
                    </form>
                  </div>
                  <div className='modal-footer'>
                    {/* <button type='button' className='btn btn-primary'>Save changes</button> */}
                    <button onClick={createNewAgreement} className='btn btn-sm btn-info ' >Add { '' }</button>
                  </div>
                </div>
              </div>
            </div>
          </ReactModal>
        </div>
        <Discussion name={'Agreements'} TypeKey='Agreement' type='ComponentType' {...props} />
        <NewDiscussion contextId={contextId} name={'Agreements'} type='ComponentType' {...props} />
      </div>
      )
    }
    Agreements.propTypes = {
    agreements: PropTypes.any,
    agreementsSummary: PropTypes.any,
    currentPage: PropTypes.any,
    addAgreementSettings: PropTypes.any,
    perPage: PropTypes.any
 }
