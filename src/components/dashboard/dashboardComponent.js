import React from 'react'
import PropTypes from 'prop-types'
import {defaults, Pie, Bar} from 'react-chartjs-2'
import _ from 'lodash'
// import SuppliersSummaryData from '../../mockData/GetSuppliersSummary'
// import EntitlementSummaryData from '../../mockData/GetEntitlementSummary'
defaults.global.legend.display = false
const pieColor = ['#FF0000', '#FFFF00', '#00FF00', '#00FFFF', '#FF00FF', '#800000', '#808000', '#008000', '#008080', '#800080']
const formatAmount = (x) => {
  let parts = x.toString().split('.')
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
  if (typeof parts[1] !== 'undefined') {
    parts[1] = parts[1].substring(0, 2)
  }
  return parts.join('.')
}
export default function Dashboard (props) {
  console.log(props.softwareSummary)
  let EntitlementList = ''
  let supplierCount = ''
  let agreementCount = ''
  let agreementCost = ''
  let applicationCount = ''
  let supplierPieChartData = {}
  let agreementPieChartData = {}
  let applicationPieChartData = {}
  let applicationCost = ''
  let selectOptionList = ''
  let costByTechnology = []
  let softwareSummaryData = {}
  let handleBlurChange = function (event) {
    console.log('handle Blur change', event.target.value)
  }
  let handleChange = function (event) {
    console.log('handle change', event.target.value, typeof event.target.value)
    if (parseInt(event.target.value) !== -111111) {
      let payload = {
        'business_unit_id': event.target.value
      }
      props.setDefaultSelect(event.target.value)
      // eslint-disable-next-line
      mApp.block('#supplierSummary', {overlayColor:'#000000',type:'loader',state:'success',message:'Processing...'})
      // eslint-disable-next-line
      mApp.block('#agreementSummary', {overlayColor:'#000000',type:'loader',state:'success',message:'Processing...'})
      // eslint-disable-next-line
      mApp.block('#applicationSummary', {overlayColor:'#000000',type:'loader',state:'success',message:'Processing...'})
      // eslint-disable-next-line
      mApp.block('#entitlementSummary', {overlayColor:'#000000',type:'loader',state:'success',message:'Processing...'})
      // eslint-disable-next-line
      mApp.block('#softwareSummary', {overlayColor:'#000000',type:'loader',state:'success',message:'Processing...'})
      props.fetchApplicationsSummary && props.fetchApplicationsSummary(payload)
      props.fetchAgreementsSummary && props.fetchAgreementsSummary(payload)
      props.fetchSuppliersSummary && props.fetchSuppliersSummary(payload)
      props.fetchSoftwaresSummary && props.fetchSoftwaresSummary(payload)
      props.fetchEntitlementsSummary && props.fetchEntitlementsSummary(payload)
    }
  }

  if (props.businessUnits && props.businessUnits !== '') {
    if (props.businessUnits.error_code === null) {
      selectOptionList = props.businessUnits.resources.map(function (data, index) {
        return (<option key={index} value={data.id}>{data.name}</option>)
      })
      selectOptionList.unshift(<option key={-111111} value={-111111}>{'Select Business Unit'}</option>)
    }
  }
  if (props.softwareSummary && props.softwareSummary !== '') {
    if (props.softwareSummary.error_code === null) {
      let item = 0
      for (let software in props.softwareSummary.resources[0].cost_by_technology_classification) {
        if (props.softwareSummary.resources[0].cost_by_technology_classification.hasOwnProperty(software)) {
          item++
          let obj = {}
          obj.name = software
          obj.cost = props.softwareSummary.resources[0].cost_by_technology_classification[software]
          costByTechnology.push(obj)
        }
      }
      if (item > 0) {
        let sortedCostByTechnology = _.orderBy(costByTechnology, ['cost'], ['desc'])
        let labels = []
        let data = []
        for (let i = 0; i < 5; i++) {
          labels.push(sortedCostByTechnology[i].name)
          data.push(sortedCostByTechnology[i].cost)
        }
        softwareSummaryData = {
          labels: labels,
          datasets: [
            {
              label: 'Cost',
              backgroundColor: 'rgba(255,99,132,0.2)',
              borderColor: 'rgba(255,99,132,1)',
              borderWidth: 1,
              hoverBackgroundColor: 'rgba(255,99,132,0.4)',
              hoverBorderColor: 'rgba(255,99,132,1)',
              data: data
            }
          ]
        }
      }
    }
  }
  if (props.entitlementSummary && props.entitlementSummary !== '') {
    if (props.entitlementSummary.error_code === null) {
      let EntitlementContent = []
      let index = 0
      for (let supplier in props.entitlementSummary.resources[0].usage_per_supplier) {
        if (props.entitlementSummary.resources[0].usage_per_supplier.hasOwnProperty(supplier)) {
          let liability = props.entitlementSummary.resources[0].usage_per_supplier[supplier].liability_percent
          let overspend = props.entitlementSummary.resources[0].usage_per_supplier[supplier].overspend_percent
          EntitlementContent.push(
            <span key={index++}>
              <div className='row'>
                <div className='col-sm-3' style={{'marginTop': '6px'}}><span style={{'fontWeight': 'normal'}}>{supplier || 'No Supplier'}</span></div>
                <div className='col-sm-9 pull-left'>
                  <div className='m--space-10' />
                  <div className='progress'>
                    <div className='progress-bar bg-danger' role='progressbar' style={{width: `${liability}%`}} aria-valuenow={liability} aria-valuemin='0' aria-valuemax='100' />
                    <div className='progress-bar bg-success' role='progressbar' style={{width: `${overspend}%`}} aria-valuenow={overspend} aria-valuemin='0' aria-valuemax='100' />
                  </div>
                  <div className='m--space-10' />
                </div>
              </div>
            </span>
          )
        }
      }
      EntitlementList = EntitlementContent.map(function (element, index) {
        return element
      })
    }
  }
  if (props.agreementSummary && props.agreementSummary !== '') {
    if (props.agreementSummary.error_code === null) {
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
  }
  if (props.supplierSummary && props.supplierSummary !== '') {
    if (props.supplierSummary.error_code === null) {
      supplierCount = props.supplierSummary.resources[0].supplier_count
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
  }

  if (props.applicationSummary && props.applicationSummary !== '') {
    if (props.applicationSummary.error_code === null) {
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
  }
  return (
    <div className=''>
      <div className='row'>
        <div className={'col-md-3'}>
          <select className='form-control m-input m-input--solid' onBlur={handleBlurChange} onChange={handleChange}>
            {selectOptionList}
          </select>
        </div>
      </div>
      <br />
      <div className='row'>
        <div className='col-md-8'>
          <div className='row' id='supplierSummary'>
            <div className='col-md-6'>
              <div className='m-portlet m-portlet--full-height'>
                <div className='m-portlet__body'>
                  <div className='m-widget12'>
                    <div className='m-widget12__item'>
                      <span className='m-widget12__text1'>
                        <h4><a href='/suppliers'>Suppliers</a></h4>
                      </span>
                      <span className='m-widget12__text1'>
                        <h4 style={{'float': 'right'}}>{supplierCount}</h4>
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
                          <Pie width={180} data={supplierPieChartData} />
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
                        <h4><a href='/agreements'>Agreements</a></h4>
                        <br /><br /><br /><br />
                        <h4>R {formatAmount(agreementCost)}</h4>
                      </span>
                      <span className='m-widget12__text1'>
                        <h4 style={{'float': 'right'}}>{agreementCount}</h4>
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
                          <Pie width={180} data={agreementPieChartData} />
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
                    <h4><a href='/entitlements'>Entitlements</a></h4>
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
                        <h4><a href='/applications'>Applications</a></h4>
                        <br /><br /><br /><br />
                        <h4>R {formatAmount(applicationCost)}</h4>
                      </span>
                      <span className='m-widget12__text1'>
                        <h4 style={{'float': 'right'}}>{applicationCount}</h4>
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
                          <Pie width={180} data={applicationPieChartData} />
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
                      <Bar
                        data={softwareSummaryData}
                        width={200}
                        height={250}
                        options={{
                          maintainAspectRatio: true,
                          scales: {
                            yAxes: [{
                                ticks: {
                                    beginAtZero: true
                                }
                            }],
                            // yAxes: [{
                            //     ticks: {
                            //         fontSize: 40
                            //     }
                            // }],
                            xAxes: [{
                                ticks: {
                                    fontSize: 7
                                }
                            }]
                          }
                        }}
                      />
                      <br />
                      <h4><a href='/softwares'>Software per Technology Category</a></h4>
                    </span>
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
  softwareSummary: PropTypes.any,
  businessUnits: PropTypes.any
}
