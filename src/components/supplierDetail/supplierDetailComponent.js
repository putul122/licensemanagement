import React from 'react'
// import PropTypes from 'prop-types'
// import './suppliersComponent.scss'
import SupplierData from '../../mockData/GetSuppliers'
// import PropTypes from 'prop-types'
import {defaults, Pie} from 'react-chartjs-2'
defaults.global.legend.display = false

export default function Suppliers (props) {
  let suppliersList = ''
  suppliersList = SupplierData.resources.map(function (data, index) {
    return (
      <tr key={index}>
        <td>{data.name}</td>
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
        <h2>Amdocs Development Limited</h2>
        <div className='row'>
          <div className='col-md-3'>
            <div className='m-portlet m-portlet--full-height'>
              <div className='m-portlet__body'>
                <div className='m-widget12'>
                  <div className='m-widget12__item'>
                    <span className='m-widget12__text1'>
                      <h2>Agreements&nbsp;&nbsp;&nbsp;</h2>
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
                      <h2>Software</h2>
                      <br />
                      <h2>R {'50'}</h2>
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
                        <h5>Software License</h5>
                        <h5>Support & Maintenance</h5>
                        <h5>Managed Services</h5>
                        <h5>Professional Service</h5>
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
        {/* The table structure begins */}
        <div className='row' style={{'marginTop': '20px'}}>
          <ul className='nav nav-tabs nav-fill' role='tablist'>
            <li className='nav-item active show'>
              <a className='nav-link' data-toggle='tab' href='#m_tabs_2_1'>Agreements</a>
            </li>
            <li className='nav-item'>
              <a className='nav-link' data-toggle='tab' href='#m_tabs_2_2'>Supplied Software</a>
            </li>
            <li className='nav-item'>
              <a className='nav-link' data-toggle='tab' href='#m_tabs_2_3'>Managed Applications</a>
            </li>
          </ul>
          <div className='tab-content'>
            <div className='tab-pane active' id='m_tabs_1_1' role='tabpanel'>
              <div className='col-md-12'>
                <table className='m-portlet table table-striped- table-bordered table-hover table-checkable dataTable no-footer' id='m_table_1' aria-describedby='m_table_1_info' role='grid'>
                  <thead>
                    <tr role='row'>
                      <th className='' style={{width: '61.25px'}}><h5>Supplier</h5></th>
                      <th className='' style={{width: '58.25px'}}><h5>Software</h5></th>
                      <th className='' style={{width: '108.25px'}}><h5># Agreements</h5></th>
                      <th className='' style={{width: '137.25px'}}><h5># Application Managed</h5></th>
                      <th className='' style={{width: '171.25px'}}><h5># Software Supplied</h5></th>
                      <th className='' style={{width: '132.25px'}}><h5>Total Cost</h5></th>
                    </tr>
                  </thead>
                  <tbody>
                    {suppliersList}
                  </tbody>
                </table>
              </div>
            </div>
            <div className='tab-pane' id='m_tabs_1_2' role='tabpanel'>
              <div className='col-md-12'>
                <table className='m-portlet table table-striped- table-bordered table-hover table-checkable dataTable no-footer' id='m_table_1' aria-describedby='m_table_1_info' role='grid'>
                  <thead>
                    <tr role='row'>
                      <th className='' style={{width: '61.25px'}}><h5>Supplier</h5></th>
                      <th className='' style={{width: '58.25px'}}><h5>Software</h5></th>
                      <th className='' style={{width: '108.25px'}}><h5># Agreements</h5></th>
                      <th className='' style={{width: '137.25px'}}><h5># Application Managed</h5></th>
                      <th className='' style={{width: '171.25px'}}><h5># Software Supplied</h5></th>
                      <th className='' style={{width: '132.25px'}}><h5>Total Cost</h5></th>
                    </tr>
                  </thead>
                  <tbody>
                    {suppliersList}
                  </tbody>
                </table>
              </div>
            </div>
            <div className='tab-pane' id='m_tabs_1_3' role='tabpanel'>
              <div className='col-md-12' />
            </div>
          </div>
        </div>
        {/* The table structure ends */}
      </div>
      )
    }
    Suppliers.propTypes = {
 }
