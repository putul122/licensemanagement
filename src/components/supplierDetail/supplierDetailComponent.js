import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
// import './suppliersComponent.scss'
// import SupplierData from '../../mockData/GetSuppliers'
// import PropTypes from 'prop-types'
import {defaults, Pie} from 'react-chartjs-2'
defaults.global.legend.display = false
const pieColor = ['#FF0000', '#FFFF00', '#00FF00', '#00FFFF', '#FF00FF', '#800000', '#808000', '#008000', '#008080', '#800080']

export default function Suppliers (props) {
  let supplierSoftwareList = ''
  let supplierApplicationList = ''
  let supplierAgreementList = ''
  let supplierName = ''
  let agreementCount = ''
  let suppliedSoftwareCount = ''
  let agreementPieChartData = {}
  if (props.supplier && props.supplier !== '') {
    supplierName = props.supplier.resources[0].name
    agreementCount = props.supplier.resources[0].agreement_count
    suppliedSoftwareCount = props.supplier.resources[0].supplied_software_count
    let costByAgreementType = props.supplier.resources[0].cost_by_agreement_type
    let labels = []
    let agreementPieData = []
    let colorData = []
    let datasetAgreementObject = {}
    let i = 0
    for (let keyField in costByAgreementType) {
      if (costByAgreementType.hasOwnProperty(keyField)) {
        labels.push(keyField)
        // agreementPieData.push(costByAgreementType[keyField])
        agreementPieData.push(10)
        colorData.push(pieColor[i++])
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
  if (props.supplierApplications && props.supplierApplications !== '') {
    if (props.supplierApplications.resources.length > 0) {
      supplierApplicationList = props.supplierApplications.resources.map(function (data, index) {
        return (
          <tr key={index}>
            <td>{data.name}</td>
            <td>{data.stage}</td>
            <td>{data.owner}</td>
            <td>{data.cost}</td>
          </tr>
        )
      })
    } else {
      supplierApplicationList = []
      supplierApplicationList.push((
        <tr key={0}>
          <td colSpan='4'>{'No data to display'}</td>
        </tr>
      ))
    }
  }
  if (props.supplierAgreements && props.supplierAgreements !== '') {
    if (props.supplierAgreements.resources.length > 0) {
      supplierAgreementList = props.supplierAgreements.resources.map(function (data, index) {
        return (
          <tr key={index}>
            <td>{data.name}</td>
            <td>{moment(data.expiry_date).format('DD MMM YYYY')}</td>
            <td>{data.agreement_type}</td>
            <td>{data.entitlement_count}</td>
            <td>{data.cost}</td>
          </tr>
        )
      })
    } else {
      supplierAgreementList = []
      supplierAgreementList.push((
        <tr key={0}>
          <td colSpan='5'>{'No data to display'}</td>
        </tr>
      ))
    }
  }
  if (props.supplierSoftwares && props.supplierSoftwares !== '') {
    if (props.supplierSoftwares.resources.length > 0) {
      supplierSoftwareList = props.supplierSoftwares.resources.map(function (data, index) {
        return (
          <tr key={index}>
            <td>{data.name}</td>
            <td>{data.cost}</td>
          </tr>
        )
      })
    } else {
      supplierSoftwareList = []
      supplierSoftwareList.push((
        <tr key={0}>
          <td colSpan='2'>{'No data to display'}</td>
        </tr>
      ))
    }
  }
    return (
      <div>
        <h2>{supplierName}</h2>
        <div className='row' id='supplier'>
          <div className='col-md-3'>
            <div className='m-portlet m-portlet--full-height'>
              <div className='m-portlet__body'>
                <div className='m-widget12'>
                  <div className='m-widget12__item'>
                    <span className='m-widget12__text1'>
                      <h2>Agreements&nbsp;&nbsp;&nbsp;</h2>
                    </span>
                    <span className='m-widget12__text2'>
                      <h2>{agreementCount}</h2>
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
                      <h2>R {suppliedSoftwareCount}</h2>
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
                        <Pie data={agreementPieChartData} />
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* The table structure begins */}
        <div className='' style={{'marginTop': '20px'}}>
          <ul className='nav nav-tabs nav-fill' role='tablist'>
            <li className='nav-item'>
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
            <div className='tab-pane active' id='m_tabs_2_1' role='tabpanel'>
              <div className='col-md-12'>
                <table className='m-portlet table table-striped- table-bordered table-hover table-checkable dataTable no-footer' id='m_table_1' aria-describedby='m_table_1_info' role='grid'>
                  <thead>
                    <tr role='row'>
                      <th className='' ><h5>Name</h5></th>
                      <th className='' ><h5>Expiry Date</h5></th>
                      <th className='' ><h5>Agreement Type</h5></th>
                      <th className='' ><h5># Entitlements</h5></th>
                      <th className='' ><h5>Cost</h5></th>
                    </tr>
                  </thead>
                  <tbody>
                    {supplierAgreementList}
                  </tbody>
                </table>
              </div>
            </div>
            <div className='tab-pane' id='m_tabs_2_2' role='tabpanel'>
              <div className='col-md-12'>
                <table className='m-portlet table table-striped- table-bordered table-hover table-checkable dataTable no-footer' id='m_table_1' aria-describedby='m_table_1_info' role='grid'>
                  <thead>
                    <tr role='row'>
                      <th className='' style={{width: '61.25px'}}><h5>Name</h5></th>
                      <th className='' style={{width: '58.25px'}}><h5>Cost</h5></th>
                    </tr>
                  </thead>
                  <tbody>
                    {supplierSoftwareList}
                  </tbody>
                </table>
              </div>
            </div>
            <div className='tab-pane' id='m_tabs_2_3' role='tabpanel'>
              <div className='col-md-12' >
                <table className='m-portlet table table-striped- table-bordered table-hover table-checkable dataTable no-footer' id='m_table_1' aria-describedby='m_table_1_info' role='grid'>
                  <thead>
                    <tr role='row'>
                      <th className='' ><h5>Name</h5></th>
                      <th className='' ><h5>Stage</h5></th>
                      <th className='' ><h5>Owner</h5></th>
                      <th className='' ><h5>Cost</h5></th>
                    </tr>
                  </thead>
                  <tbody>
                    {supplierApplicationList}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        {/* The table structure ends */}
      </div>
      )
    }
    Suppliers.propTypes = {
      supplier: PropTypes.any,
      supplierApplications: PropTypes.any,
      supplierSoftwares: PropTypes.any,
      supplierAgreements: PropTypes.any
 }
