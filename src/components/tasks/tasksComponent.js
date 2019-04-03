import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import moment from 'moment'
import debounce from 'lodash/debounce'
import styles from './tasksComponent.scss'
import ReactModal from 'react-modal'
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

export default function Tasks (props) {
  console.log('props === task comp', props)
  let searchTextBox = ''
  let totalNoPages
  let perPage = props.perPage
  let currentPage = props.currentPage
  let nextClass = ''
  let previousClass = ''
  let tasksList = ''
  let totalTasks
  let paginationLimit = 6
  let pageArray = []
  let listPage = []
  let openModal = function (data) {
    console.log('data', data)
    console.log(props, props.actionSettings)
    let actionSettings = {...props.actionSettings,
      'isNotificationModalOpen': true,
      'selectedTask': data,
      'taskProperties': null
    }
    console.log(actionSettings)
    props.setActionSettings(actionSettings)
    let payload = {id: data.workflow.context.id}
    props.fetchTaskProperties && props.fetchTaskProperties(payload)
  }
  let closeModal = function (event) {
    event.preventDefault()
    let actionSettings = {...props.actionSettings,
      'isNotificationModalOpen': false,
      'selectedTask': null,
      'taskProperties': null
    }
    props.setActionSettings(actionSettings)
  }
  if (props.actionSettings.isNotificationModalOpen && props.actionSettings.taskProperties !== null) {
    // if (nextProps.componentTypeProperties.resources.length > 0) {
    //   props.actionSettings.taskProperties.resources.forEach(function (data, index) {
    //     console.log('data-------------', data)
    //     let valueSet = _.result(_.find(data.properties, function (obj) {
    //       return obj.id === propertyId
    //     }), 'value_set')
    //     console.log('valueset ----', valueSet)
    //     if (valueSet) {
    //       console.log(valueSet.values, 'inside if')
    //       nextProps.setTemplateCategoryData(valueSet.values)
    //     }
    //   })
    // }
  }
  if (props.tasks && props.tasks !== '') {
    tasksList = props.tasks.resources.map(function (data, index) {
      return (
        <tr key={index}>
          <td><a onClick={(event) => { event.preventDefault(); openModal(data) }} href='javascript:void(0);'>{data.id}</a></td>
          <td>{data.name}</td>
          <td>{data.workflow.context.name}</td>
          <td>{data.workflow.name}</td>
          <td>{data.assigned_to.name}</td>
          <td>{ moment(data.created).format('DD MMM YYYY') }</td>
        </tr>
      )
    })

    totalTasks = props.tasks.total_count
    console.log(totalTasks)
    totalNoPages = Math.ceil(totalTasks / perPage)
    console.log(totalNoPages)
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
      tasksList = ''
      let payload = {
        'search': value,
        'page_size': props.perPage,
        'page': currentPage
      }
      // if (searchTextBox.value.length > 2 || searchTextBox.value.length === 0) {
        props.fetchTasks(payload)
        // eslint-disable-next-line
        mApp && mApp.block('#tasksList', {overlayColor:'#000000',type:'loader',state:'success',message:'Processing...'})
        // props.setComponentTypeLoading(true)
      // }
      listPage = _.filter(pageArray, function (group) {
        let found = _.filter(group, {'number': currentPage})
        if (found.length > 0) { return group }
      })
    }
  }, 500)
  let handleBlurdropdownChange = function (event) {
    console.log('handle Blur change', event.target.value)
  }
  let handledropdownChange = function (event) {
    console.log('handle change', event.target.value, typeof event.target.value)
    props.setPerPage(parseInt(event.target.value))
  }
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
      props.fetchTasks(payload)
      // eslint-disable-next-line
      mApp && mApp.block('#tasksList', {overlayColor:'#000000',type:'loader',state:'success',message:'Processing...'})
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
      // agreementsList = ''
      props.fetchTasks(payload)
      // eslint-disable-next-line
      mApp && mApp.block('#tasksList', {overlayColor:'#000000',type:'loader',state:'success',message:'Processing...'})
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
    props.fetchTasks(payload)
    // eslint-disable-next-line
    mApp && mApp.block('#tasksList', {overlayColor:'#000000',type:'loader',state:'success',message:'Processing...'})
    // eslint-disable-next-line
    // mApp.blockPage({overlayColor:'#000000',type:'loader',state:'success',message:'Processing...'})
    props.setCurrentPage(page)

    listPage = _.filter(pageArray, function (group) {
      let found = _.filter(group, {'number': page})
      if (found.length > 0) { return group }
    })
  }
    return (
      <div id='tasksList'>
        {/* The table structure begins */}
        <div className='row'>
          <div className='col-md-12'>
            <div className='m_datatable' id='scrolling_vertical'>
              <div className='m_datatable m-datatable m-datatable--default m-datatable--loaded m-datatable--scroll' id='scrolling_vertical' style={{}}>
                <div className=''>
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
                              <th className=''><h5>Task Id</h5></th>
                              <th className=''><h5>Task Name</h5></th>
                              <th className=''><h5>Component Name</h5></th>
                              <th className=''><h5>Workflow Name</h5></th>
                              <th className=''><h5>Assigned To</h5></th>
                              <th className=''><h5>Created</h5></th>
                            </tr>
                          </thead>
                          <tbody>
                            {tasksList}
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
        <div>
          <ReactModal isOpen={props.actionSettings.isNotificationModalOpen}
            onRequestClose={closeModal}
            style={customStyles}>
            <div className={''}>
              <div className='modal-dialog modal-lg'>
                <div className='modal-content'>
                  <div className='modal-header'>
                    <h4 className='modal-title' id='exampleModalLabel'>Due Date Notification</h4>
                    <button type='button' onClick={closeModal} className='close' data-dismiss='modal' aria-label='Close'>
                      <span aria-hidden='true'>×</span>
                    </button>
                  </div>
                  <div className='modal-header'>
                    <h4 className='modal-title' id='exampleModalLabel'>Name</h4>
                  </div>
                  <div className='modal-body'>
                    <div className='row m--margin-top-20'>
                      <div className='col-xl-12'>
                        <div className='m-section m-section--last'>
                          <div className='m-section__content'>
                            <div className='m-demo'>
                              <div className='m-demo__preview'>
                                <div className='m-list-search'>
                                  <div className='m-list-search__results'>
                                    <span className='m-list-search__result-category m-list-search__result-category--first'>
                                      Properties
                                    </span>
                                    <span className='m-list-search__result-item'>
                                      <div className='m-portlet__body'>
                                        <div className='m-widget13'>
                                          <div className='m-widget13__item'>
                                            <span className='m-widget13__desc' style={{'width': '15%', 'color': '#000000'}}>
                                                Agreement Owner:
                                                </span>
                                            <span className='m-widget13__text'>{'principleStatement'}</span>
                                          </div>
                                          <div className='m-widget13__item'>
                                            <span className='m-widget13__desc m-widget13__text-bolder' style={{'width': '15%', 'color': '#000000'}}>
                                                Agreement Type:
                                                </span>
                                            <span className='m-widget13__text'>{'principleRationale'}</span>
                                          </div>
                                          <div className='m-widget13__item'>
                                            <span className='m-widget13__desc m-widget13__text m-widget13__number-bolder' style={{'width': '15%', 'color': '#000000'}}>
                                                Expiry Date:
                                                </span>
                                            <span className='m-widget13__text'>{'principleImplication'}</span>
                                          </div>
                                          <div className='m-widget13__item'>
                                            <span className='m-widget13__desc m-widget13__text-bolder' style={{'width': '15%', 'color': '#000000'}}>
                                                Notification Period:
                                                </span>
                                            <span className='m-widget13__text'>{'principleType'}</span>
                                          </div>
                                        </div>
                                      </div>
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className='modal-footer'>
                    <button type='button' onClick={closeModal} className='btn btn-sm btn-info'>Close</button>
                    <button type='button' onClick={closeModal} className='btn btn-sm btn-info'>Submit</button>
                  </div>
                </div>
              </div>
            </div>
          </ReactModal>
        </div>
      </div>
      )
    }
    Tasks.propTypes = {
    currentPage: PropTypes.any,
    tasks: PropTypes.any,
    perPage: PropTypes.any,
    actionSettings: PropTypes.any
}
