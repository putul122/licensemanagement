import React from 'react'
import _ from 'lodash'
import debounce from 'lodash/debounce'
import ReactModal from 'react-modal'
import PropTypes from 'prop-types'
import Discussion from '../../containers/discussion/discussionContainer'
import NewDiscussion from '../../containers/newDiscussion/newDiscussionContainer'
import styles from './projectsComponent.scss'
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

export default function Projects (props) {
  console.log(props.currentPage, props.projects, props.createProject, props.createProjectResponse)
  let projectCount = ''
  let totalLicenseCost = ''
//   let consumed = ''
  let searchTextBox
  let projectsList = ''
  let totalNoPages
  let perPage = props.perPage
  let currentPage = props.currentPage
  let nextClass = ''
  let previousClass = ''
  let pageArray = []
  let listPage = []
  let paginationLimit = 6
  let totalProject
  let newProjectName = ''
  let newProjectDescription = ''
  let contextId = ''
  let appPackage = JSON.parse(localStorage.getItem('packages'))
  let componentTypes = appPackage.resources[0].component_types
  let componentId = _.result(_.find(componentTypes, function (obj) {
      return obj.key === 'Project'
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

  if (props.projects && props.projects !== '') {
    projectsList = props.projects.resources.map(function (data, index) {
      return (
        <tr key={index}>
          <td><a href={'/projects/' + data.id} >{data.name}</a></td>
          <td>{data.status}</td>
          <td>{data.wbs_element}</td>
          <td>{data.entitlement_count}</td>
          <td>{'R ' + formatAmount(data.total_license_cost)}</td>
        </tr>
      )
    })

    totalProject = props.projects.total_count
    totalNoPages = Math.ceil(totalProject / perPage)

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
    if (searchTextBox) {
      props.setCurrentPage(1)
      const value = searchTextBox ? searchTextBox.value : ''
      projectsList = ''
      let payload = {
        'search': value,
        'page_size': props.perPage,
        'page': currentPage
      }
      // if (searchTextBox.value.length > 2 || searchTextBox.value.length === 0) {
        props.fetchProjects(payload)
        // eslint-disable-next-line
        mApp && mApp.block('#entitlementList', {overlayColor:'#000000',type:'loader',state:'success',message:'Processing...'})
        // props.setComponentTypeLoading(true)
      // }
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
      let payload = {
        'search': searchTextBox.value ? searchTextBox.value : '',
        'page_size': props.perPage,
        'page': currentPage - 1
      }
      props.fetchProjects(payload)
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
      props.fetchProjects(payload)
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
    props.fetchProjects(payload)
    // eslint-disable-next-line
    mApp && mApp.block('#entitlementList', {overlayColor:'#000000',type:'loader',state:'success',message:'Processing...'})
    props.setCurrentPage(page)

    listPage = _.filter(pageArray, function (group) {
      let found = _.filter(group, {'number': page})
      if (found.length > 0) { return group }
    })
  }
  if (props.projectsSummary && props.projectsSummary !== '') {
    projectCount = props.projectsSummary.resources[0].project_count
    totalLicenseCost = props.projectsSummary.resources[0].total_license_cost
  }
  let openModal = function (event) {
    event.preventDefault()
    props.setModalOpenStatus(true)
    console.log('props', props.setModalOpenStatus)
   }
  let closeModal = function () {
    props.setModalOpenStatus(false)
  }
  let createProject = function (event) {
    event.preventDefault()
    let appPackage = JSON.parse(localStorage.getItem('packages'))
    let componentTypes = appPackage.resources[0].component_types
    let componentTypeId = _.result(_.find(componentTypes, function (obj) {
      return obj.key === 'Project'
    }), 'component_type')
    let payload = {
      'component_type': {
        'id': componentTypeId
      },
      'name': newProjectName.value,
      'description': newProjectDescription.value
    }
    props.createProject(payload)
    props.setModalOpenStatus(false)
   }

return (
  <div>
    <div className='row'>
      <div className='col-md-8'>
        <h2>Projects</h2>
      </div>
      <div className='col-md-4 float-right' >
        <span className='pull-right'>
          <a href='javascript:void(0);' data-skin='light' data-toggle='m-tooltip' data-placement='top' data-original-title='Add Project' onClick={openModal} className='btn btn-info m-btn m-btn--icon btn-sm m-btn--icon-only  m-btn--pill m-btn--air'>
            <i className='fa flaticon-plus fa-2x' />
          </a>&nbsp;&nbsp;
          <a href='javascript:void(0);' data-skin='light' data-toggle='m-tooltip' data-placement='top' data-original-title='Initiate Discussion' onClick={openDiscussionModal} className='btn btn-info m-btn m-btn--icon btn-sm m-btn--icon-only  m-btn--pill m-btn--air'>
            <i className='fa flaticon-multimedia-3 fa-2x' />
          </a>
        </span>
      </div>
      {/* <div className='col-md-3'>
        <button type='button' onClick={openModal} className='btn btn-outline-info btn-sm'>Add Project</button>&nbsp;
        <button onClick={openDiscussionModal} className='btn btn-outline-info btn-sm'>New Discussion</button>&nbsp;
      </div> */}
    </div>
    <br />
    <div>
      <ReactModal isOpen={props.modalIsOpen}
        onRequestClose={closeModal} style={customStyles}
        >
        {/* <button onClick={closeModal} ><i className='la la-close' /></button> */}
        <div className={''}>
          <div className='modal-dialog'>
            <div className='modal-content'>
              <div className='modal-header'>
                <h4 className='modal-title' id='exampleModalLabel'>New { 'Project' }</h4>
                <button type='button' onClick={closeModal} className='close' data-dismiss='modal' aria-label='Close'>
                  <span aria-hidden='true'>×</span>
                </button>
              </div>
              <div className='modal-body'>
                <form>
                  {/* {messageBlock} */}
                  <div className='form-group'>
                    <label htmlFor='component-name' className='form-control-label'>Name:</label>
                    <input type='text' className='form-control' id='agreement-name' ref={input => (newProjectName = input)} autoComplete='off' required />
                  </div>
                  <div className='form-group'>
                    <label htmlFor='description-text' className='form-control-label'>Description:</label>
                    <textarea className='form-control' ref={textarea => (newProjectDescription = textarea)} defaultValue={''} autoComplete='off' required />
                  </div>
                </form>
              </div>
              <div className='modal-footer'>
                {/* <button type='button' className='btn btn-primary'>Save changes</button> */}
                <button type='button' onClick={createProject} id='m_login_signup' className='btn btn-sm btn-info' >Add { '' }</button>
              </div>
            </div>
          </div>
        </div>
      </ReactModal>
    </div>
    <div className='row' id='entitlementSummary'>
      <div className='col-xl-6'>
        <div className='m-portlet m-portlet--bordered-semi m-portlet--full-height m-portlet--skin-light  m-portlet--rounded-force'>
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
                      <h3>Total</h3>
                      <h5 style={{'float': 'right', 'paddingRight': '25px', 'marginTop': '-35px'}}>{projectCount}</h5>
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
        <div className='m-portlet m-portlet--bordered-semi m-portlet--skin-light  m-portlet--rounded-force'>
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
                      <i className='flaticon-coins m--font-brand' />
                    </span>
                    <span className='m-widget17__subtitle'>
                      <h3>Total License Cost</h3>
                      <h5 style={{'float': 'right', 'paddingRight': '25px', 'marginTop': '-35px'}}>R {totalLicenseCost}</h5>
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
                            <th className='' style={{width: '61.25px'}}><h5>Name</h5></th>
                            <th className='' style={{width: '58.25px'}}><h5>Status</h5></th>
                            <th className='' style={{width: '108.25px'}}><h5>WBS Element</h5></th>
                            <th className='' style={{width: '137.25px'}}><h5>#Entitlements</h5></th>
                            <th className='' style={{width: '171.25px'}}><h5>Total License Cost</h5></th>
                          </tr>
                        </thead>
                        <tbody>
                          {projectsList}
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
    <Discussion name={'Projects'} TypeKey='Project' type='ComponentType' {...props} />
    <NewDiscussion contextId={contextId} name={'Projects'} type='ComponentType' {...props} />
  </div>
      )
    }
 Projects.propTypes = {
  projectsSummary: PropTypes.any,
  projects: PropTypes.any,
  currentPage: PropTypes.any,
  modalIsOpen: PropTypes.any,
  setModalOpenStatus: PropTypes.func,
  perPage: PropTypes.any,
  createProjectResponse: PropTypes.any,
  createProject: PropTypes.func
 }
