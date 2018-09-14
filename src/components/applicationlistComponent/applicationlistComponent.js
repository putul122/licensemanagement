import React from 'react'
import ApplicationsSummaryData from '../../mockData/mockGetApplicationsSummary'
import ApplicationsData from '../../mockData/mockGetApplications'
// import PropTypes from 'prop-types'
import './applicationlistComponent.scss'

export default function Applicationlists () {
  console.log('Dummy data for Summary', ApplicationsSummaryData)
  console.log('Application list', ApplicationsData)
  let applicationList = ''
  let ApplicationsSummary = ApplicationsSummaryData.resources
  let ApplicationsDatalist = ApplicationsData.resources
  console.log('filteredData****', ApplicationsDatalist)
  applicationList = ApplicationsDatalist.map(function (application, index) {
    return (
      <tr key={index}>
        <td><a href={'/applications/' + application.id}>{application.name}</a></td>
        <td />
        <td>{application.supplied_by}</td>
        <td>{application.managed_by}</td>
        <td>{application.stage}</td>
        <td>{application.owner}</td>
        <td>{application.total_cost}</td>
      </tr>
    )
  })
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
                  <h1>{ApplicationsSummary[0].application_count}</h1>
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
                  <h2>R {ApplicationsSummary[0].total_cost}</h2>
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
          <input type='text' className='form-control m-input' placeholder='Search...' id='generalSearch' />
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
              <th className='' style={{width: '58.25px'}}><h5>Software</h5></th>
              <th className='' style={{width: '108.25px'}}><h5>Supplied By</h5></th>
              <th className='' style={{width: '137.25px'}}><h5>Managed By</h5></th>
              <th className='' style={{width: '171.25px'}}><h5>Stage</h5></th>
              <th className='' style={{width: '132.25px'}}><h5>Owner</h5></th>
              <th className='' style={{width: '206.25px'}}><h5>Cost</h5></th>
            </tr>
          </thead>
          <tbody>
            {applicationList}
          </tbody>
        </table>
      </div>
    </div>
    {/* The table structure ends */}
  </div>
      )
    }
 Applicationlists.propTypes = {
 }
