import React from 'react'
// import ApplicationsSummaryData from '../../mockData/mockGetApplicationsSummary'
// import ApplicationsData from '../../mockData/mockGetApplications'
import _ from 'lodash'
import ReactModal from 'react-modal'
import PropTypes from 'prop-types'
import styles from './entitlementsComponent.scss'
ReactModal.setAppElement('#root')
const customStyles = {
  content: {
    top: '27%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    border: 'none',
    background: 'none',
    transform: 'translate(-50%, -50%)'
  }
}
export default function Entitlementlists (props) {
  console.log(props.currentPage, props.entitlements)
  let entitlementCount = ''
  let consumed = ''
  let searchTextBox
  let entitlementsList = ''
  let totalNoPages
  let perPage = 10
  let currentPage = props.currentPage
  let nextClass = ''
  let previousClass = ''
  let pageArray = []
  let listPage = []
  let paginationLimit = 6
  let totalEntitlement
  let newEntitlementName = ''
  let newEntitlementDescription = ''
  console.log('props', props.setModalOpenStatus)

  if (props.entitlements && props.entitlements !== '') {
    entitlementsList = props.entitlements.resources.map(function (data, index) {
      return (
        <tr key={index}>
          <td><a href={'/entitlements/' + data.id} >{data.name}</a></td>
          <td>{data.supplier}</td>
          <td>{data.purchased}</td>
          <td>{data.consumed}</td>
          <td>{data.cost}</td>
          <td>{data.total_cost}</td>
          {/* <td>{data.cost}</td> */}
        </tr>
      )
    })

    totalEntitlement = props.entitlements.total_count
    totalNoPages = Math.ceil(totalEntitlement / perPage)
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
    entitlementsList = ''
    let payload = {
      'search': searchTextBox.value ? searchTextBox.value : '',
      'page_size': 10,
      'page': currentPage
    }
    if (searchTextBox.value.length > 2 || searchTextBox.value.length === 0) {
      props.fetchEntitlements(payload)
      // eslint-disable-next-line
      mApp && mApp.block('#entitlementList', {overlayColor:'#000000',type:'loader',state:'success',message:'Processing...'})
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
    entitlementsList = ''
    let payload = {
      'search': searchTextBox.value ? searchTextBox.value : '',
      'page_size': 10,
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
        'page_size': 10,
        'page': currentPage + 1
      }
      entitlementsList = ''
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
  if (props.entitlementsSummary && props.entitlementsSummary !== '') {
    entitlementCount = props.entitlementsSummary.resources[0].entitlement_count
    consumed = props.entitlementsSummary.resources[0].used
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
    <button type='button' onClick={openModal} className='btn btn-outline-info btn-sm pull-right'>Add Entitlment</button>
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
                <button type='button' onClick={createEntitlement} id='m_login_signup' className=''>Add { '' }</button>
              </div>
            </div>
          </div>
        </div>
      </ReactModal>
    </div>
    <div className='row' id='entitlementSummary'>
      <div className='col-xl-4'>
        <div className='m-portlet m-portlet--full-height'>
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
        </div>
      </div>
      <div className='col-md-offset-1 col-xl-5'>
        <div className='m-portlet m-portlet--full-height'>
          <div className='m-portlet__body'>
            <div className='m-widget12'>
              <div className='m-widget12__item'>
                <span className='m-widget12__text1'>
                  <h1>Consumed</h1>
                </span>
                <span className='m-widget12__text2'>
                  <h1>R {consumed}</h1>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <button className='btn btn-outline-info btn-sm'>Add Entitlment</button> */}
    </div>
    <div id='entitlementList'>
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
  </div>
      )
    }
 Entitlementlists.propTypes = {
  entitlementsSummary: PropTypes.any,
  entitlements: PropTypes.any,
  currentPage: PropTypes.any,
  modalIsOpen: PropTypes.any,
  setModalOpenStatus: PropTypes.func
 }
