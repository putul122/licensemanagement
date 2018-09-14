import React from 'react'
// import PropTypes from 'prop-types'
// import './suppliersComponent.scss'
import SupplierData from '../../mockData/GetSuppliers'
// import PropTypes from 'prop-types'
import {defaults, Pie} from 'react-chartjs-2'
defaults.global.legend.display = false

export default function Agreements (props) {
  let suppliersList = ''
  suppliersList = SupplierData.resources.map(function (data, index) {
    return (
      <tr key={index}>
        <td><a href={'/suppliers/' + data.id} >{data.name}</a></td>
        <td>{''}</td>
        <td>{data.agreements}</td>
        <td>{data.applications_managed}</td>
        <td>{data.softwares_supplied}</td>
        <td>{data.total_cost}</td>
      </tr>
    )
  })

  const data = {
    labels: [
      'Red',
      'Green',
      'Yellow'
    ],
    legend: false,
    datasets: [{
      data: [300, 50, 100],
      backgroundColor: [
      '#FF6384',
      '#36A2EB',
      '#FFCE56'
      ],
      hoverBackgroundColor: [
      '#FF6384',
      '#36A2EB',
      '#FFCE56'
      ]
    }]
  }
    return (
      <div>
        <h3>Agreements</h3>
        <div className='row'>
          <div className='col-md-3'>
            <div className='m-portlet m-portlet--full-height'>
              <div className='m-portlet__body'>
                <div className='m-widget12'>
                  <div className='m-widget12__item'>
                    <span className='m-widget12__text1'>
                      <h3>Agreements&nbsp;&nbsp;&nbsp;</h3>
                      <br />
                      <h2>R {'50'}</h2>
                    </span>
                    <span className='m-widget12__text2'>
                      <h2>{'40'}</h2>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='col-md-3'>
            <div className='m-portlet m-portlet--full-height'>
              <div className='m-portlet__body'>
                <div className='m-widget12'>
                  <div className='m-widget12__item'>
                    <span className='m-widget12__text1'>
                      <h4>Expiry in 90 days</h4>
                    </span>
                    <span className='m-widget12__text2'>
                      <h2>{'40'}</h2>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='col-md-6'>
            <div className='m-portlet m-portlet--full-height'>
              <div className='m-portlet__body'>
                <div className='m-widget12'>
                  <div className='m-widget12__item'>
                    <div className='col m-widget12__text1'>
                      <span className=''>
                        <h2>Cost Per</h2>
                        <br />
                        <h5>License</h5>
                        <h5>Professional Service</h5>
                        <h5>Support & Maintenance</h5>
                      </span>
                    </div>
                    <div className='col'>
                      <span className='m-widget12__text2'>
                        <Pie data={data} />
                      </span>
                    </div>
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
                  <th className='' style={{width: '108.25px'}}><h5># Agreements</h5></th>
                  <th className='' style={{width: '61.25px'}}><h5>Supplier</h5></th>
                  <th className='' style={{width: '58.25px'}}><h5>Expiry Date</h5></th>
                  <th className='' style={{width: '137.25px'}}><h5>Type</h5></th>
                  <th className='' style={{width: '171.25px'}}><h5># Entitlements</h5></th>
                  <th className='' style={{width: '132.25px'}}><h5>Cost</h5></th>
                </tr>
              </thead>
              <tbody>
                {suppliersList}
              </tbody>
            </table>
          </div>
        </div>
        {/* The table structure ends */}
      </div>
      )
    }
    Agreements.propTypes = {
 }
