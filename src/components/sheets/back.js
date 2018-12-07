import React from 'react'
import _ from 'lodash'
import debounce from 'lodash/debounce'
import ReactModal from 'react-modal'
import PropTypes from 'prop-types'
import Select from 'react-select'
import styles from './sheetsComponent.scss'
ReactModal.setAppElement('#root')
// const formatAmount = (x) => {
//   let parts = x.toString().split('.')
//   parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
//   if (typeof parts[1] !== 'undefined') {
//     parts[1] = parts[1].substring(0, 2)
//   }
//   return parts.join('.')
// }

export default function Sheets (props) {
  console.log(props)
  let searchTextBox
  let modelPrespectivesList = ''
  let totalNoPages
  let perPage = props.perPage
  let currentPage = props.currentPage
  let nextClass = ''
  let previousClass = ''
  let pageArray = []
  let listPage = []
  let paginationLimit = 6
  let totalPages
  let tableHeader = []
  let handleBlurdropdownChange = function (event) {
    console.log('handle Blur change', event.target.value)
  }
  let handledropdownChange = function (event) {
    console.log('handle change', event.target.value, typeof event.target.value)
    props.setPerPage(parseInt(event.target.value))
  }

  let handleSelect = function (newValue: any, actionMeta: any) {
    console.log('newValue', newValue)
    if (actionMeta.action === 'select-option') {
      let perspectiveId = newValue.perspective
      let payload = {'meta_model_perspective_id': perspectiveId}
      props.fetchMetaModelPrespective(perspectiveId)
      props.fetchModelPrespectives(payload)
      console.log(perspectiveId)
      console.log(payload)
    }
    if (actionMeta.action === 'clear') {
      // let selectedStandard = null
      // props.setSelectedStandard(selectedStandard)
    }
  }
  let handleInputChange = debounce((e) => {
    console.log(e)
    const value = searchTextBox.value
    // entitlementsList = ''
    // let payload = {
    //   'search': value || '',
    //   'page_size': props.perPage,
    //   'page': currentPage
    // }
    // listPage = _.filter(pageArray, function (group) {
    //   let found = _.filter(group, {'number': currentPage})
    //   if (found.length > 0) { return group }
    // })
  }, 500)
  if (props.metaModelPerspective && props.metaModelPerspective !== '' && props.metaModelPerspective.error_code === null) {
    if (props.metaModelPerspective.resources[0].parts.length > 0) {
      tableHeader = props.metaModelPerspective.resources[0].parts.map(function (data, index) {
        return (<th className=''><h5>{data.name}</h5></th>)
      })
    }
  }
  let listModelPrespectives = function () {
    if (props.modelPrespectives !== '') {
      if (props.modelPrespectives.length > 0) {
        modelPrespectivesList = props.modelPrespectives.slice(perPage * (currentPage - 1), ((currentPage - 1) + 1) * perPage).map(function (data, index) {
          let childList = ''
          childList = data.parts.map(function (partData, ix) {
            return (<td className=''><h5>{partData.value}</h5></td>)
          })
          return (<tr key={index}>{childList}</tr>)
        })
      } else {
        modelPrespectivesList = []
        modelPrespectivesList.push((
          <tr key={0}>
            <td colSpan='4'>{'No data to display'}</td>
          </tr>
        ))
      }
    }
  }
  if (props.modelPrespectives && props.modelPrespectives !== '') {
    totalPages = Math.ceil(props.modelPrespectives.length / perPage)
    modelPrespectivesCount = props.modelPrespectives.length
    console.log('totalPages', totalPages)
    let i = 1
    while (i <= totalPages) {
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
    listModelPrespectives()
  }
  if (currentPage === 1) {
    previousClass = 'm-datatable__pager-link--disabled'
  }
  if (currentPage === totalPages) {
    nextClass = 'm-datatable__pager-link--disabled'
  }
  let handleListAndPagination = function (page) {
    listModelPrespectives()
    props.setCurrentPage(page)
    listPage = _.filter(pageArray, function (group) {
      let found = _.filter(group, {'number': page})
      if (found.length > 0) { return group }
    })
  }
return (<div>
    <div className='row'>
      <div className='col-md-9'>
        <h2>Sheets</h2>
      </div>
    </div>
    <div id='entitlementList'>
      {/* The table structure begins */}
      <div className='row' style={{'marginTop': '20px'}}>
        <div className='col-md-12'>
          <div className='m_datatable' id='scrolling_vertical'>
            <div className='m_datatable m-datatable m-datatable--default m-datatable--loaded m-datatable--scroll' id='scrolling_vertical' style={{}}>
              <div>
                <div className='m-portlet'>
                  <div className='m-portlet__body'>
                    <div id='m_table_1_wrapper' className='dataTables_wrapper dt-bootstrap4'>
                      <div className='row' style={{'marginBottom': '20px'}}>
                        <div className='col-sm-12 col-md-6'>
                          <div className='' id='' style={{'display': 'flex'}}>
                            <h5 style={{'margin': '8px'}}>Select</h5>
                            <Select
                              className='col-7 m-input'
                              placeholder='Select Sheets'
                              isClearable
                              // value={props.selectedStandard}
                              onChange={handleSelect}
                              isSearchable={false}
                              name={'roleSelected'}
                              options={props.perspectives}
                            />
                          </div>
                        </div>
                        <div className='col-sm-12 col-md-6'>
                          <span className='pull-left'>
                            <button type='button' className='btn btn-secondary m-btn m-btn--custom m-btn--label-info'><i className='fa fa-angle-double-left fa-2x' />&nbsp;&nbsp;Export</button>
                            <button type='button' className='btn btn-secondary m-btn m-btn--custom m-btn--label-info'><i className='fa fa-angle-double-right fa-2x' />&nbsp;&nbsp;Import</button>
                          </span>
                        </div>
                      </div>
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
                    <div className='dataTables_scrollBody' style={{position: 'relative', overflow: 'auto', width: '100%', 'maxHeight': '100vh'}}>
                      <table className='m-portlet table table-striped- table-bordered table-hover table-checkable dataTable no-footer' id='m_table_1' aria-describedby='m_table_1_info' role='grid'>
                        <thead>
                          <tr role='row'>
                            {tableHeader}
                          </tr>
                        </thead>
                        <tbody>
                          {modelPrespectivesList}
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
      {/* The table structure ends */}
  </div>)
  }
  Sheets.propTypes = {
    perspectives: PropTypes.any,
    metaModelPerspective: PropTypes.any,
    modelPrespectives: PropTypes.any,
    currentPage: PropTypes.any,
    setModalOpenStatus: PropTypes.func,
    perPage: PropTypes.any
 }
