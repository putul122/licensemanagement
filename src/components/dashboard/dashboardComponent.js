import React from 'react'
import PropTypes from 'prop-types'
import {defaults, Pie, Bar} from 'react-chartjs-2'
// import SuppliersSummaryData from '../../mockData/GetSuppliersSummary'
// import EntitlementSummaryData from '../../mockData/GetEntitlementSummary'
defaults.global.legend.display = false
const pieColor = ['#FF0000', '#FFFF00', '#00FF00', '#00FFFF', '#FF00FF', '#800000', '#808000', '#008000', '#008080', '#800080']

export default function Dashboard (props) {
  console.log('my props', props)
  console.log(props.applicationSummary)
  console.log(props.agreementSummary)
  console.log(props.supplierSummary)
  console.log(props.entitlementSummary)
  console.log(props.softwareSummary)
  // let SuppliersSummary = SuppliersSummaryData.resources[0]
  // let EntitlementSummary = EntitlementSummaryData.resources[0]
  let EntitlementList = ''
  let supplierCount = ''
  let agreementCount = ''
  let agreementCost = ''
  let applicationCount = ''
  let supplierPieChartData = {}
  let agreementPieChartData = {}
  let applicationPieChartData = {}
  let applicationCost = ''

  if (props.entitlementSummary && props.entitlementSummary !== '') {
    let EntitlementContent = []
    for (let supplier in props.entitlementSummary.resources[0].usage_per_supplier) {
      if (props.entitlementSummary.resources[0].usage_per_supplier.hasOwnProperty(supplier)) {
        let liability = props.entitlementSummary.resources[0].usage_per_supplier[supplier].liability_percent
        let overspend = props.entitlementSummary.resources[0].usage_per_supplier[supplier].overspend_percent
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
  if (props.agreementSummary && props.agreementSummary !== '') {
    agreementCount = props.agreementSummary.resources[0].agreement_count
    agreementCost = props.agreementSummary.resources[0].cost
    let costByAgreementType = props.agreementSummary.resources[0].cost_by_agreement_type
    let labels = []
    let agreementPieData = []
    let colorData = []
    let datasetAgreementObject = {}
    let i = 0
    for (let keyField in costByAgreementType) {
      if (costByAgreementType.hasOwnProperty(keyField)) {
        labels.push(keyField)
        agreementPieData.push(costByAgreementType[keyField])
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
  if (props.supplierSummary && props.supplierSummary !== '') {
    supplierCount = props.supplierSummary.resources[0].supplier_count
    // agreementCount = props.supplierSummary.resources[0].agreement_count
    let labels = []
    let supplierPieData = []
    let colorData = []
    let datasetSupplierObject = {}
    let j = 0
    props.supplierSummary.resources[0].top10_cost_suppliers.forEach(function (element, i) {
      labels.push(element.name)
      supplierPieData.push(element.cost)
      colorData.push(pieColor[j++])
    })
    supplierPieChartData.labels = labels
    supplierPieChartData.legend = false
    supplierPieChartData.datasets = []
    datasetSupplierObject.data = supplierPieData
    datasetSupplierObject.backgroundColor = colorData
    datasetSupplierObject.hoverBackgroundColor = colorData
    supplierPieChartData.datasets.push(datasetSupplierObject)
  }

  if (props.applicationSummary && props.applicationSummary !== '') {
    applicationCount = props.applicationSummary.resources[0].application_count
    applicationCost = props.applicationSummary.resources[0].cost
    let labels = []
    let data = []
    let colorData = []
    let datasetObject = {}
    let k = 0
    props.applicationSummary.resources[0].top10_cost_applications.forEach(function (element, i) {
      labels.push(element.name)
      data.push(element.cost)
      colorData.push(pieColor[k++]) // colorData.push('#' + ((Math.random() * 0xffffff) << 0).toString(16))
    })
    applicationPieChartData.labels = labels
    applicationPieChartData.legend = false
    applicationPieChartData.datasets = []
    datasetObject.data = data
    datasetObject.backgroundColor = colorData
    datasetObject.hoverBackgroundColor = colorData
    applicationPieChartData.datasets.push(datasetObject)
  }

  var data = {
    labels: ['label1', 'label2', 'label3'],
    barValueSpacing: 5,
    datasets: [
        {
          label: 'Harpo',
          backgroundColor: 'green',
          data: [10, 7, 4]
        },
        {
          label: 'Chico',
          backgroundColor: 'red',
          data: [4, 3, 5]
        }
    ]
  }
  // const data1 = {
  //   labels: ['January', 'February', 'March'],
  //   datasets: [
  //     {
  //       label: 'My First dataset',
  //       backgroundColor: 'rgba(255,99,132,0.2)',
  //       borderColor: 'rgba(255,99,132,1)',
  //       borderWidth: 1,
  //       hoverBackgroundColor: 'rgba(255,99,132,0.4)',
  //       hoverBorderColor: 'rgba(255,99,132,1)',
  //       data: [20, 23, 23]
  //     }
  //   ]
  // }
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
          <div className='row' id='supplierSummary'>
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
          <div className='row' id='agreementSummary'>
            <div className='col-md-6'>
              <div className='m-portlet m-portlet--full-height'>
                <div className='m-portlet__body'>
                  <div className='m-widget12'>
                    <div className='m-widget12__item'>
                      <span className='m-widget12__text1'>
                        <h4>Aggrements</h4>
                        <br />
                        <h4>R {agreementCost}</h4>
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
        <div className='col-md-4' id='entitlementSummary'>
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
          <div className='row' id='applicationSummary'>
            <div className='col-md-6'>
              <div className='m-portlet m-portlet--full-height'>
                <div className='m-portlet__body'>
                  <div className='m-widget12'>
                    <div className='m-widget12__item'>
                      <span className='m-widget12__text1'>
                        <h4>Applications</h4>
                        <br />
                        <h4>R {applicationCost}</h4>
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
        <div className='col-md-4' id='softwareSummary'>
          <div className='m-portlet m-portlet--full-height'>
            <div className='m-portlet__body'>
              <div className='m-widget12'>
                <div className='m-widget12__item'>
                  <div className='m-widget12__text1'>
                    <span className=''>
                      <h4>Software Reference</h4>
                    </span>
                  </div>
                  <div className='col'>
                    <Bar
                      data={data}
                      width={200}
                      height={200}
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
  applicationSummary: PropTypes.any,
  agreementSummary: PropTypes.any,
  supplierSummary: PropTypes.any,
  entitlementSummary: PropTypes.any,
  softwareSummary: PropTypes.any
}
