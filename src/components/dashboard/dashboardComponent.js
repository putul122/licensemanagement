import React from 'react'
import PropTypes from 'prop-types'
import {defaults, Pie, Bar} from 'react-chartjs-2'
import SuppliersSummaryData from '../../mockData/GetSuppliersSummary'
// import ApplicationsSummaryData from '../applicationInfoComponent/mockGetApplicationsSummary'
import EntitlementSummaryData from '../../mockData/GetEntitlementSummary'
defaults.global.legend.display = false

export default function Dashboard (props) {
  let SuppliersSummary = SuppliersSummaryData.resources[0]
  let EntitlementSummary = EntitlementSummaryData.resources[0]
  let EntitlementList = ''
  let supplierCount = SuppliersSummaryData.resources[0].supplier_count
  let agreementCount = SuppliersSummaryData.resources[0].agreement_count
  let applicationCount = ''
  let supplierPieChartData = {}
  let agreementPieChartData = {}
  let applicationPieChartData = {}

  if (EntitlementSummary && EntitlementSummary !== '') {
    let EntitlementContent = []
    for (let supplier in EntitlementSummary.usage_per_supplier) {
      if (EntitlementSummary.usage_per_supplier.hasOwnProperty(supplier)) {
        let liability = EntitlementSummary.usage_per_supplier[supplier].liability_percent
        let overspend = EntitlementSummary.usage_per_supplier[supplier].overspend_percent
        EntitlementContent.push(
          <span>
            <div className='col-sm-5 row pull-left'><p style={{'font-weight': 'normal'}}>{supplier}</p></div>
            <div className='progress'>
              <div className='progress-bar bg-danger' role='progressbar' style={{width: `${liability}%`}} aria-valuenow={liability} aria-valuemin='0' aria-valuemax='100' />
              <div className='progress-bar bg-success' role='progressbar' style={{width: `${overspend}%`}} aria-valuenow={overspend} aria-valuemin='0' aria-valuemax='100' />
            </div>
          </span>
        )
      }
    }
    EntitlementList = EntitlementContent.map(function (element, index) {
      return element
    })
    console.log(EntitlementList)
  }
  if (SuppliersSummary && SuppliersSummary !== '') {
    let labels = []
    let supplierPieData = []
    let agreementPieData = []
    let colorData1 = []
    let colorData2 = []
    let datasetSupplierObject = {}
    let datasetAgreementObject = {}
    SuppliersSummary.top10_cost_suppliers.forEach(function (element, i) {
      labels.push(element.name)
      supplierPieData.push(element.total_cost)
      agreementPieData.push(element.total_cost)
      colorData1.push('#' + ((Math.random() * 0xffffff) << 0).toString(16))
      colorData2.push('#' + ((Math.random() * 0xffffff) << 0).toString(16))
    })
    supplierPieChartData.labels = labels
    supplierPieChartData.legend = false
    supplierPieChartData.datasets = []
    datasetSupplierObject.data = supplierPieData
    datasetSupplierObject.backgroundColor = colorData1
    datasetSupplierObject.hoverBackgroundColor = colorData1
    supplierPieChartData.datasets.push(datasetSupplierObject)
    agreementPieChartData.labels = labels
    agreementPieChartData.legend = false
    agreementPieChartData.datasets = []
    datasetAgreementObject.data = agreementPieData
    datasetAgreementObject.backgroundColor = colorData2
    datasetAgreementObject.hoverBackgroundColor = colorData2
    agreementPieChartData.datasets.push(datasetAgreementObject)
  }

  if (props.applicationSummary && props.applicationSummary !== '') {
    applicationCount = props.applicationSummary.resources[0].application_count
    let labels = []
    let data = []
    let colorData = []
    let datasetObject = {}
    props.applicationSummary.resources[0].top10_cost_applications.forEach(function (element, i) {
      labels.push(element.name)
      // data.push(element.total_cost)
      data.push(Math.floor(Math.random() * 20))
      colorData.push('#' + ((Math.random() * 0xffffff) << 0).toString(16))
    })
    applicationPieChartData.labels = labels
    applicationPieChartData.legend = false
    applicationPieChartData.datasets = []
    datasetObject.data = data
    datasetObject.backgroundColor = colorData
    datasetObject.hoverBackgroundColor = colorData
    applicationPieChartData.datasets.push(datasetObject)
  }
  const data1 = {
    labels: ['January', 'February', 'March'],
    datasets: [
      {
        label: 'My First dataset',
        backgroundColor: 'rgba(255,99,132,0.2)',
        borderColor: 'rgba(255,99,132,1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(255,99,132,0.4)',
        hoverBorderColor: 'rgba(255,99,132,1)',
        data: [65, 59, 80]
      }
    ]
  }
  return (
    <div className=''>
      <div className='row'>
        <div className={'col-md-3'}>
          <select className='form-control m-input m-input--solid' id='exampleSelect1'>
            <option>Telkom Corporate Centre</option>
          </select>
        </div>
      </div>
      <div className='row'>
        <div className='col-md-8'>
          <div className='row'>
            <div className='col-md-6'>
              <div className='m-portlet m-portlet--full-height'>
                <div className='m-portlet__body'>
                  <div className='m-widget12'>
                    <div className='m-widget12__item'>
                      <span className='m-widget12__text1'>
                        <h4>Suppliers</h4>
                      </span>
                      <span className='m-widget12__text1'>
                        <h4>{supplierCount}</h4>
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
                          <h4>Cost Per</h4>
                          <br />
                          <h5>Top 10 Suppliers</h5>
                        </span>
                      </div>
                      <div className='col'>
                        <span className='m-widget12__text2'>
                          <Pie data={supplierPieChartData} />
                        </span>
                      </div>
                      {/* <div className='m-widget12__text2'></div> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='row'>
            <div className='col-md-6'>
              <div className='m-portlet m-portlet--full-height'>
                <div className='m-portlet__body'>
                  <div className='m-widget12'>
                    <div className='m-widget12__item'>
                      <span className='m-widget12__text1'>
                        <h4>Aggrements</h4>
                        <br />
                        <h4>R 1044444.00</h4>
                      </span>
                      <span className='m-widget12__text1'>
                        <h4>{agreementCount}</h4>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className='col-md-6' style={{'overflow': 'visible'}}>
              <div className='m-portlet m-portlet--full-height'>
                <div className='m-portlet__body'>
                  <div className='m-widget12'>
                    <div className='m-widget12__item'>
                      <div className='col m-widget12__text1'>
                        <span className=''>
                          <h4>Cost Per</h4>
                          <br />
                          <h5>Agreement Type</h5>
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
        </div>
        <div className='col-md-4'>
          <div className='m-portlet m-portlet--full-height'>
            <div className='m-portlet__body'>
              <div className='m-widget12'>
                <div className='m-widget12__item'>
                  <span className='m-widget12__text1 row'>
                    <h4>Entitlements</h4>
                    <br />
                    <h5>Liability/Overspend</h5>
                    <div className='row'>
                      <div className='col-sm-12'>
                        {EntitlementList}
                      </div>
                    </div>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='row' style={{'overflow': 'visible'}}>
        <div className='col-md-8'>
          <div className='row'>
            <div className='col-md-6'>
              <div className='m-portlet m-portlet--full-height'>
                <div className='m-portlet__body'>
                  <div className='m-widget12'>
                    <div className='m-widget12__item'>
                      <span className='m-widget12__text1'>
                        <h4>Applications</h4>
                        <br />
                        <h4>R 10444444.00</h4>
                      </span>
                      <span className='m-widget12__text1'>
                        <h4>{applicationCount}</h4>
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
                          <h4>Cost Per</h4>
                          <br />
                          <h5>Top 10 Applications</h5>
                        </span>
                      </div>
                      <div className='col'>
                        <span className='m-widget12__text2'>
                          <Pie data={applicationPieChartData} />
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='col-md-4'>
          <div className='m-portlet m-portlet--full-height'>
            <div className='m-portlet__body'>
              <div className='m-widget12'>
                <div className='m-widget12__item'>
                  <div className='col m-widget12__text1'>
                    <span className=''>
                      <h4>Software Reference</h4>
                    </span>
                  </div>
                  <div className='col'>
                    <Bar
                      data={data1}
                      width={200}
                      height={60}
                      options={{
                        maintainAspectRatio: false
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

Dashboard.propTypes = {
  applicationSummary: PropTypes.any
}
