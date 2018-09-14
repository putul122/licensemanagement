import React from 'react'
// import PropTypes from 'prop-types'
import './softwarelistComponent.scss'
import Softwares from '../../mockData/mockGetSoftwares'

export default function Softwarelists () {
console.log('JSON data for Softwares', Softwares)
let SoftwareData = Softwares.resources
console.log('list for softwares', SoftwareData)
let softwarelists = SoftwareData.map(function (software, index) {
  return (
    <tr key={index}>
      <td><a href={'/softwares/' + software.id}>{software.name}</a></td>
      <td>{software.agreement_count}</td>
      <td>{software.supplier}</td>
      <td>{software.instances}</td>
      <td>{software.cost}</td>
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
                  <h1>100</h1>
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
                  <h2 className='pull-right'>R 1 433 658.00</h2>
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
              <th className='' style={{width: '58.25px'}}><h5>Agreement type</h5></th>
              <th className='' style={{width: '108.25px'}}><h5>Suppliers</h5></th>
              <th className='' style={{width: '137.25px'}}><h5>#Instances</h5></th>
              <th className='' style={{width: '171.25px'}}><h5>Total cost</h5></th>
            </tr>
          </thead>
          <tbody>
            {softwarelists}
          </tbody>
        </table>
      </div>
    </div>
    {/* The table structure ends */}
  </div>
      )
    }
 Softwarelists.propTypes = {
 }
