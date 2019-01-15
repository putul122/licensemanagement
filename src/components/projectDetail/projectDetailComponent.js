import React from 'react'
// import _ from 'lodash'
// import debounce from 'lodash/debounce'
// import ReactModal from 'react-modal'
// import PropTypes from 'prop-types'
// import Discussion from '../../containers/discussion/discussionContainer'
// import NewDiscussion from '../../containers/newDiscussion/newDiscussionContainer'
// import styles from './entitlementsComponent.scss'
// ReactModal.setAppElement('#root')
// const customStyles = {
//   content: {
//     top: '50%',
//     left: '50%',
//     right: 'auto',
//     bottom: 'auto',
//     marginRight: '-50%',
//     border: 'none',
//     background: 'none',
//     transform: 'translate(-50%, -50%)',
//     width: '100%'
//   }
// }
const formatAmount = (x) => {
  let parts = x.toString().split('.')
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
  if (typeof parts[1] !== 'undefined') {
    parts[1] = parts[1].substring(0, 2)
  }
  return parts.join('.')
}

export default function ProjectDetail (props) {
  let listPage = ''
  let currentPage = ''
  let nextClass = ''
  let previousClass = ''
  let handlePrevious = function (event) {
    // event.preventDefault()
    // if (currentPage === 1) {
    //   previousClass = styles.disabled
    // } else {
    //   let payload = {
    //     'search': searchTextBox.value ? searchTextBox.value : '',
    //     'page_size': props.perPage,
    //     'page': currentPage - 1
    //   }
    //   props.fetchAgreements(payload)
    //   // eslint-disable-next-line
    //   mApp && mApp.block('#agreementList', {overlayColor:'#000000',type:'loader',state:'success',message:'Processing...'})
    //   // eslint-disable-next-line
    //   // mApp.blockPage({overlayColor:'#000000',type:'loader',state:'success',message:'Processing...'})
    //   props.setCurrentPage(currentPage - 1)
    // }
    // listPage = _.filter(pageArray, function (group) {
    //   let found = _.filter(group, {'number': currentPage - 1})
    //   if (found.length > 0) { return group }
    // })
  }

  let handleNext = function (event) {
    event.preventDefault()
    // if (currentPage === totalNoPages) {
    //   nextClass = styles.disabled
    // } else {
    //   let payload = {
    //     'search': searchTextBox.value ? searchTextBox.value : '',
    //     'page_size': props.perPage,
    //     'page': currentPage + 1
    //   }
    //   agreementsList = ''
    //   props.fetchAgreements(payload)
    //   // eslint-disable-next-line
    //   mApp && mApp.block('#agreementList', {overlayColor:'#000000',type:'loader',state:'success',message:'Processing...'})
    //   // eslint-disable-next-line
    //   // mApp.blockPage({overlayColor:'#000000',type:'loader',state:'success',message:'Processing...'})
    //   props.setCurrentPage(currentPage + 1)
    // }
    // listPage = _.filter(pageArray, function (group) {
    //   let found = _.filter(group, {'number': currentPage + 1})
    //   if (found.length > 0) { return group }
    // })
  }
  let handlePage = function (page) {
    // if (page === 1) {
    //   previousClass = 'm-datatable__pager-link--disabled'
    // } else if (page === totalNoPages) {
    //   nextClass = 'm-datatable__pager-link--disabled'
    // }
    // // agreementsList = ''
    // let payload = {
    //   'search': searchTextBox.value ? searchTextBox.value : '',
    //   'page_size': props.perPage,
    //   'page': page
    // }
    // props.fetchAgreements(payload)
    // // eslint-disable-next-line
    // mApp && mApp.block('#agreementList', {overlayColor:'#000000',type:'loader',state:'success',message:'Processing...'})
    // // eslint-disable-next-line
    // // mApp.blockPage({overlayColor:'#000000',type:'loader',state:'success',message:'Processing...'})
    // props.setCurrentPage(page)

    // listPage = _.filter(pageArray, function (group) {
    //   let found = _.filter(group, {'number': page})
    //   if (found.length > 0) { return group }
    // })
  }
return (
  <div>
    <div className='row'>
      <div className='col-md-7'>
        <h2>SAP HANA Application Software</h2>
      </div>
      <div className='col-md-5'>
        <button type='button' className='btn btn-outline-info btn-sm'>Edit Project</button>&nbsp;
        <button type='button' className='btn btn-outline-info btn-sm'>Delete Project</button>&nbsp;
        {/* <button className='btn btn-outline-info btn-sm'>New Discussion</button>&nbsp; */}
      </div>
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
                      <h3># Entitlements</h3>
                      <h5 style={{'float': 'right', 'paddingRight': '25px', 'marginTop': '-35px'}}>{150}</h5>
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
                      <h3>Cost</h3>
                      <h5 style={{'float': 'right', 'paddingRight': '25px', 'marginTop': '-35px'}}>{'R' + formatAmount(12345677.2345)}</h5>
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
    <div id=''>
      {/* The table structure begins */}
      <div className='row' style={{'marginTop': '20px'}}>
        <div className='col-md-6 col-sm-12'>
          <div className='m-portlet'>
            <div className='m-portlet__head'>
              <div className='m-portlet__head-caption'>
                <div className='m-portlet__head-title'>
                  <h3 className='m-portlet__head-text'>
                                Properties
                            </h3>
                </div>
              </div>
            </div>
            <div className='m-portlet__body'>
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled.
                </div>
          </div>
        </div>
        <div className='col-md-6 col-sm-12'>
          <div className='m-portlet'>
            <div className='m-portlet__head'>
              <div className='m-portlet__head-caption'>
                <div className='m-portlet__head-title'>
                  <h3 className='m-portlet__head-text'>Entitlements</h3>
                </div>
              </div>
              <div className='m-portlet__head-tools'>
                <button type='button' className='btn btn-outline-info btn-sm'>Link Entitlement</button>
              </div>
            </div>
            <div className='m-portlet__body'>
              <div className='col-md-12'>
                <div className='m_datatable' id='scrolling_vertical'>
                  <div className='m_datatable m-datatable m-datatable--default m-datatable--loaded m-datatable--scroll' id='scrolling_vertical' style={{}}>
                    <div className=''>
                      <div className='m-portlet'>
                        <div className='m-portlet__body'>
                          <div className='dataTables_scrollBody' style={{position: 'relative', overflow: 'auto', width: '100%', 'maxHeight': '80vh'}}>
                            <table className='m-portlet table table-striped- table-bordered table-hover table-checkable dataTable no-footer' id='m_table_1' aria-describedby='m_table_1_info' role='grid'>
                              <thead>
                                <tr role='row'>
                                  <th className=''><h5>Name</h5></th>
                                  <th className=''><h5># Reserved</h5></th>
                                  <th className=''><h5>Action</h5></th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr role='row'>
                                  <td className=''>HANA</td>
                                  <td className=''>100</td>
                                  <td className=''>
                                    <a href='' className=''>Edit</a>&nbsp;|&nbsp;
                                    <a href='' className=''>Delete</a>
                                  </td>
                                </tr>
                                <tr role='row'>
                                  <td className=''>ARIBA</td>
                                  <td className=''>30</td>
                                  <td className=''>
                                    <a href='' className=''>Edit</a>&nbsp;|&nbsp;
                                    <a href='' className=''>Delete</a>
                                  </td>
                                </tr>
                                <tr role='row'>
                                  <td className=''>Access & Process Control</td>
                                  <td className=''>20</td>
                                  <td className=''>
                                    <a href='' className=''>Edit</a>&nbsp;|&nbsp;
                                    <a href='' className=''>Delete</a>
                                  </td>
                                </tr>
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
        </div>
      </div>
    </div>
    {/* <Discussion name={'Entitlements'} TypeKey='Entitlement' type='ComponentType' {...props} />
    <NewDiscussion contextId={contextId} name={'Entitlements'} type='ComponentType' {...props} /> */}
  </div>
      )
    }
    ProjectDetail.propTypes = {
//   entitlementsSummary: PropTypes.any,
//   entitlements: PropTypes.any,
//   currentPage: PropTypes.any,
//   modalIsOpen: PropTypes.any,
//   setModalOpenStatus: PropTypes.func,
//   perPage: PropTypes.any
 }
