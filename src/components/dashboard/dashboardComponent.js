import React from 'react'
import PropTypes from 'prop-types'
import {defaults, Doughnut, Bar} from 'react-chartjs-2'
import styles from './dashboardComponent.scss'
import _ from 'lodash'
defaults.global.legend.display = false
const doughnutColor = ['#716aca', '#ffb822', '#00c5dc', '#f4516c', '#35bfa3 ', '#800000', '#808000', '#008000', '#008080', '#800080']
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
  let chartOptionSoftware = {
    responsive: true,
    title: {
      display: true,
      text: 'Top 5 Technology'
    },
    maintainAspectRatio: true,
    scales: {
      yAxes: [{
          ticks: {
            beginAtZero: true,
            callback: function (label, index, labels) {
              switch (label) {
                case labels[0]:
                  return 'R ' + formatAmount(label)
                case labels[1]:
                  return 'R ' + formatAmount(label)
                case labels[2]:
                  return 'R ' + formatAmount(label)
                case labels[3]:
                  return 'R ' + formatAmount(label)
                case labels[4]:
                  return 'R ' + formatAmount(label)
              }
            }
          },
          display: true,
          scaleLabel: {
            display: true,
            labelString: 'Cost'
          }
      }],
      xAxes: [{
          ticks: {
              autoSkip: false
          },
          display: true,
          scaleLabel: {
            display: true,
            fontStyle: 'normal',
            labelString: 'Software'
          },
          stacked: false
      }]
    },
    'tooltips': {
      callbacks: {
        label: function (tooltipItem) {
          console.log(tooltipItem)
          return 'Cost: R ' + formatAmount(softwareSummaryData.datasets[0].data[tooltipItem.index])
        }
      }
    }
  }
  let chartOptionSupplier = {
    'responsive': true,
    'tooltips': {
      'enabled': false,
      'custom': (tooltipModel) => {
        // Tooltip Element
        var tooltipEl = document.getElementById('chartjs-tooltip')
        // Create element on first render
        if (!tooltipEl) {
          tooltipEl = document.createElement('div')
          tooltipEl.id = 'chartjs-tooltip'
          tooltipEl.innerHTML = '<table></table>'
          document.body.appendChild(tooltipEl)
        }
        // hide the tooltip
        if (tooltipModel.opacity === 0) {
          tooltipEl.style.opacity = 0
          return
        }
        // Set caret Position
        tooltipEl.classList.remove('above', 'below', 'no-transform')
        if (tooltipModel.yAlign) {
            tooltipEl.classList.add(tooltipModel.yAlign)
        } else {
            tooltipEl.classList.add('no-transform')
        }
        function getBody (bodyItem) {
          return bodyItem.lines
        }
        // Set Text
        if (tooltipModel.body) {
          var titleLines = tooltipModel.title || []
          var bodyLines = tooltipModel.body.map(getBody)

          var innerHtml = '<thead>'

          titleLines.forEach(function (title) {
            innerHtml += '<tr><th>' + title + '</th></tr>'
          })
          innerHtml += '</thead><tbody>'
          bodyLines.forEach(function (body, i) {
            let parts = body.toString().split(':')
            let toolBody = []
            if (parts.length > 2) {
              toolBody.push(parts[0] + ':' + parts[1] + ': R ' + formatAmount(parts[2].trim()))
            } else {
              toolBody.push(parts[0] + ': R ' + formatAmount(parts[1].trim()))
            }
            var colors = tooltipModel.labelColors[i]
            var style = 'background:' + colors.backgroundColor
            style += '; border-color:' + colors.borderColor
            style += '; border-width: 2px'
            var span = '<span class="' + styles['chartjs-tooltip-key'] + '" style="' + style + '"></span>'
            innerHtml += '<tr><td>' + span + toolBody + '</td></tr>'
          })
          innerHtml += '</tbody>'

          var tableRoot = tooltipEl.querySelector('table')
          tableRoot.innerHTML = innerHtml
        }
        // eslint-disable-next-line
        var position = $('#supplierChart').offset()
        // Display, position, and set styles for font
        // eslint-disable-next-line
        // $('#chartjs-tooltip').addClass(styles['chartjs-tooltip'])
        tooltipEl.classList.add(styles['chartjs-tooltip'])
        tooltipEl.style.opacity = 1
        tooltipEl.style.position = 'absolute'
        tooltipEl.style.background = 'rgba(0, 0, 0, .7)'
        tooltipEl.style.color = 'white'
        tooltipEl.style.borderRadius = '3px'
        tooltipEl.style.webkitTransition = 'all .1s ease'
        tooltipEl.style.transition = 'all .1s ease'
        tooltipEl.style.pointerEvents = 'none'
        tooltipEl.style.transform = 'translate(-50%, 0)'
        tooltipEl.style.left = position.left + tooltipModel.caretX + 'px'
        tooltipEl.style.top = position.top + tooltipModel.caretY + 'px'
        tooltipEl.style.fontFamily = tooltipModel._bodyFontFamily
        tooltipEl.style.fontSize = tooltipModel.bodyFontSize
        tooltipEl.style.fontStyle = tooltipModel._bodyFontStyle
        tooltipEl.style.padding = tooltipModel.yPadding + 'px ' + tooltipModel.xPadding + 'px'
      }
    }
  }
  let chartOptionAgreement = {
    'responsive': true,
    'tooltips': {
      'enabled': false,
      'custom': (tooltipModel) => {
        // Tooltip Element
        var tooltipEl = document.getElementById('chartjs-tooltip')
        // Create element on first render
        if (!tooltipEl) {
          tooltipEl = document.createElement('div')
          tooltipEl.id = 'chartjs-tooltip'
          tooltipEl.innerHTML = '<table></table>'
          document.body.appendChild(tooltipEl)
        }
        // hide the tooltip
        if (tooltipModel.opacity === 0) {
          tooltipEl.style.opacity = 0
          return
        }
        // Set caret Position
        tooltipEl.classList.remove('above', 'below', 'no-transform')
        if (tooltipModel.yAlign) {
            tooltipEl.classList.add(tooltipModel.yAlign)
        } else {
            tooltipEl.classList.add('no-transform')
        }
        function getBody (bodyItem) {
          return bodyItem.lines
        }
        // Set Text
        if (tooltipModel.body) {
          var titleLines = tooltipModel.title || []
          var bodyLines = tooltipModel.body.map(getBody)

          var innerHtml = '<thead>'

          titleLines.forEach(function (title) {
            innerHtml += '<tr><th>' + title + '</th></tr>'
          })
          innerHtml += '</thead><tbody>'
          bodyLines.forEach(function (body, i) {
            let parts = body.toString().split(':')
            let toolBody = []
            if (parts.length > 2) {
              toolBody.push(parts[0] + ':' + parts[1] + ': R ' + formatAmount(parts[2].trim()))
            } else {
              toolBody.push(parts[0] + ': R ' + formatAmount(parts[1].trim()))
            }
            var colors = tooltipModel.labelColors[i]
            var style = 'background:' + colors.backgroundColor
            style += '; border-color:' + colors.borderColor
            style += '; border-width: 2px'
            var span = '<span class="' + styles['chartjs-tooltip-key'] + '" style="' + style + '"></span>'
            innerHtml += '<tr><td>' + span + toolBody + '</td></tr>'
          })
          innerHtml += '</tbody>'

          var tableRoot = tooltipEl.querySelector('table')
          tableRoot.innerHTML = innerHtml
        }
        // eslint-disable-next-line
        var position = $('#agreementChart').offset()
        // Display, position, and set styles for font
        // eslint-disable-next-line
        // $('#chartjs-tooltip').addClass(styles['chartjs-tooltip'])
        tooltipEl.classList.add(styles['chartjs-tooltip'])
        tooltipEl.style.opacity = 1
        tooltipEl.style.position = 'absolute'
        tooltipEl.style.background = 'rgba(0, 0, 0, .7)'
        tooltipEl.style.color = 'white'
        tooltipEl.style.borderRadius = '3px'
        tooltipEl.style.webkitTransition = 'all .1s ease'
        tooltipEl.style.transition = 'all .1s ease'
        tooltipEl.style.pointerEvents = 'none'
        tooltipEl.style.transform = 'translate(-50%, 0)'
        tooltipEl.style.left = position.left + tooltipModel.caretX + 'px'
        tooltipEl.style.top = position.top + tooltipModel.caretY + 'px'
        tooltipEl.style.fontFamily = tooltipModel._bodyFontFamily
        tooltipEl.style.fontSize = tooltipModel.bodyFontSize
        tooltipEl.style.fontStyle = tooltipModel._bodyFontStyle
        tooltipEl.style.padding = tooltipModel.yPadding + 'px ' + tooltipModel.xPadding + 'px'
      }
    }
  }
  let chartOptionApplication = {
    'responsive': true,
    'tooltips': {
      'enabled': false,
      'custom': (tooltipModel) => {
        // Tooltip Element
        var tooltipEl = document.getElementById('chartjs-tooltip')
        // Create element on first render
        if (!tooltipEl) {
          tooltipEl = document.createElement('div')
          tooltipEl.id = 'chartjs-tooltip'
          tooltipEl.innerHTML = '<table></table>'
          document.body.appendChild(tooltipEl)
        }
        // hide the tooltip
        if (tooltipModel.opacity === 0) {
          tooltipEl.style.opacity = 0
          return
        }
        // Set caret Position
        tooltipEl.classList.remove('above', 'below', 'no-transform')
        if (tooltipModel.yAlign) {
            tooltipEl.classList.add(tooltipModel.yAlign)
        } else {
            tooltipEl.classList.add('no-transform')
        }
        function getBody (bodyItem) {
          return bodyItem.lines
        }
        // Set Text
        if (tooltipModel.body) {
          var titleLines = tooltipModel.title || []
          var bodyLines = tooltipModel.body.map(getBody)

          var innerHtml = '<thead>'

          titleLines.forEach(function (title) {
            innerHtml += '<tr><th>' + title + '</th></tr>'
          })
          innerHtml += '</thead><tbody>'
          bodyLines.forEach(function (body, i) {
            let parts = body.toString().split(':')
            let toolBody = []
            if (parts.length > 2) {
              toolBody.push(parts[0] + ':' + parts[1] + ': R ' + formatAmount(parts[2].trim()))
            } else {
              toolBody.push(parts[0] + ': R ' + formatAmount(parts[1].trim()))
            }
            var colors = tooltipModel.labelColors[i]
            var style = 'background:' + colors.backgroundColor
            style += '; border-color:' + colors.borderColor
            style += '; border-width: 2px'
            var span = '<span class="' + styles['chartjs-tooltip-key'] + '" style="' + style + '"></span>'
            innerHtml += '<tr><td>' + span + toolBody + '</td></tr>'
          })
          innerHtml += '</tbody>'

          var tableRoot = tooltipEl.querySelector('table')
          tableRoot.innerHTML = innerHtml
        }
        // eslint-disable-next-line
        var position = $('#applicationChart').offset()
        // Display, position, and set styles for font
        // eslint-disable-next-line
        // $('#chartjs-tooltip').addClass(styles['chartjs-tooltip'])
        tooltipEl.classList.add(styles['chartjs-tooltip'])
        tooltipEl.style.opacity = 1
        tooltipEl.style.position = 'absolute'
        tooltipEl.style.background = 'rgba(0, 0, 0, .7)'
        tooltipEl.style.color = 'white'
        tooltipEl.style.borderRadius = '3px'
        tooltipEl.style.webkitTransition = 'all .1s ease'
        tooltipEl.style.transition = 'all .1s ease'
        tooltipEl.style.pointerEvents = 'none'
        tooltipEl.style.transform = 'translate(-50%, 0)'
        tooltipEl.style.left = position.left + tooltipModel.caretX + 'px'
        tooltipEl.style.top = position.top + tooltipModel.caretY + 'px'
        tooltipEl.style.fontFamily = tooltipModel._bodyFontFamily
        tooltipEl.style.fontSize = tooltipModel.bodyFontSize
        tooltipEl.style.fontStyle = tooltipModel._bodyFontStyle
        tooltipEl.style.padding = tooltipModel.yPadding + 'px ' + tooltipModel.xPadding + 'px'
      }
    }
  }
  let handleBlurChange = function (event) {
    console.log('handle Blur change', event.target.value)
  }
  let handleChange = function (event) {
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
        return (<option key={index} value={data.id} style={{'backgroundColor': '#ffffff', 'color': '#000000', 'fontSize': '13px'}}>{data.name}</option>)
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
        let limit = sortedCostByTechnology.length > 5 ? 5 : sortedCostByTechnology.length
        for (let i = 0; i < limit; i++) {
          // let names = sortedCostByTechnology[i].name.toString().split(' ')
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
                <div className='col-sm-4' style={{'marginTop': '6px'}}><p style={{'width': '165px', 'fontSize': '0.7vw'}}>{supplier || 'No Supplier'}</p></div>
                <div className='col-sm-8 pull-left'>
                  <div className='m--space-10' />
                  <div className='progress'>
                    <div className='progress-bar bg-danger' role='progressbar' style={{width: `${liability}%`}} aria-valuenow={liability} aria-valuemin='0' aria-valuemax='100'><div style={{'fontSize': '12px'}}>{formatAmount(liability)}%</div></div>
                    <div className='progress-bar bg-success' role='progressbar' style={{width: `${overspend}%`}} aria-valuenow={overspend} aria-valuemin='0' aria-valuemax='100' ><div style={{'fontSize': '12px'}}>{formatAmount(overspend)}%</div></div>
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
          colorData.push(doughnutColor[i++])
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
        colorData.push(doughnutColor[j++])
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
        colorData.push(doughnutColor[k++]) // colorData.push('#' + ((Math.random() * 0xffffff) << 0).toString(16))
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
          <select className='btn btn-primary dropdown-toggle dropdown-toggle-split' data-toggle='dropdown' aria-haspopup='true' aria-expanded='false' onBlur={handleBlurChange} onChange={handleChange}>
            {selectOptionList}
          </select>
        </div>
      </div>
      <br />
      <div className='row'>
        <div className='col-md-8'>
          <div className='row' id='supplierSummary'>
            <div className='col-md-6'>
              <div className='m-portlet m-portlet--bordered-semi m-portlet--widget-fit m-portlet--skin-light  m-portlet--rounded-force'>
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
                            <i className='flaticon-truck m--font-brand' />
                          </span>
                          <span className='m-widget17__subtitle'>
                            <h4><a href='/suppliers'>Suppliers</a></h4>
                          </span>
                          <span className='m-widget17__desc'>
                            <h4>{supplierCount}</h4>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* <div className='col-md-6'>
              <div className='m-portlet'>
                <div className='m-portlet__body'>
                  <div className='m-widget12'>
                    <div className='m-widget12__item'>
                      <div className='col m-widget12__text1'>
                        <span className=''>
                          <h4 style={{'position': 'relative', 'top': '-67px', 'color': '#5867dd'}}>Cost Per</h4>
                          <br />
                          <h5 style={{'position': 'relative', 'top': '-81px'}}>Top 10 Suppliers</h5>
                        </span>
                      </div>
                      <div className='col'>
                        <span className='m-widget12__text2'>
                          <Doughnut id='supplierChart' ref='chart' width={180} data={supplierPieChartData} options={chartOptionSupplier} />
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div> */}
            <div className='col-md-6' style={{'overflow': 'visible'}}>
              <div className='m-portlet'>
                <div className='m-portlet__body'>
                  <div className='m-widget12'>
                    <div className='m-widget12__item' >
                      <div className='col m-widget12__text1'>
                        <span className=''>
                          <h4 style={{'position': 'relative', 'top': '-67px', 'color': '#5867dd', 'width': '100px'}}>Cost Per</h4>
                          <br />
                          <h5 style={{'position': 'relative', 'top': '-81px'}}>Top 10 Suppliers</h5>
                        </span>
                      </div>
                      <div className='col'>
                        <span className='m-widget12__text2'>
                          <Doughnut id='supplierChart' ref='chart' width={180} data={supplierPieChartData} options={chartOptionSupplier} />
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
          <div className='m-portlet' style={{'height': '285px'}}>
            <div className='m-portlet__body'>
              <div className='m-widget12'>
                <div className='m-widget12__item'>
                  <span className='m-widget12__text1 row'>
                    <h4><a href='/entitlements'>Entitlements</a></h4>
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
      <div className='row'>
        <div className='col-md-8'>
          <div className='row' id='agreementSummary'>
            <div className='col-md-6' style={{'position': 'relative', 'top': '-75px'}}>
              <div className='m-portlet m-portlet--bordered-semi m-portlet--widget-fit m-portlet--full-height m-portlet--skin-light  m-portlet--rounded-force'>
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
                            <i className='flaticon-business m--font-brand' />
                            <h4 style={{'float': 'right', 'paddingRight': '25px'}}>{agreementCount}</h4>
                          </span>
                          <span className='m-widget17__subtitle'>
                            <h4><a href='/agreements'>Agreements</a></h4>
                            <h4>R {formatAmount(agreementCost)}</h4>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className='col-md-6' style={{'position': 'relative', 'top': '-75px', 'overflow': 'visible'}}>
              <div className='m-portlet'>
                <div className='m-portlet__body'>
                  <div className='m-widget12'>
                    <div className='m-widget12__item' >
                      <div className='col m-widget12__text1'>
                        <span className=''>
                          <h4 style={{'position': 'relative', 'top': '-67px', 'color': '#5867dd'}}>Cost Per</h4>
                          <br />
                          <h5 style={{'position': 'relative', 'top': '-81px'}}>Agreement Type</h5>
                        </span>
                      </div>
                      <div className='col'>
                        <span className='m-widget12__text2'>
                          <Doughnut id='agreementChart' width={180} data={agreementPieChartData} options={chartOptionAgreement} />
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='row' id='applicationSummary'>
            <div className='col-md-6' style={{'position': 'relative', 'top': '-75px'}}>
              <div className='m-portlet m-portlet--bordered-semi m-portlet--widget-fit m-portlet--skin-light  m-portlet--rounded-force'>
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
                            <i className='flaticon-folder-4 m--font-brand' />
                            <h4 style={{'float': 'right', 'paddingRight': '25px'}}>{applicationCount}</h4>
                          </span>
                          <span className='m-widget17__subtitle'>
                            <h4><a href='/applications'>Applications</a></h4>
                            <h4>R {formatAmount(applicationCost)}</h4>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className='col-md-6' style={{'position': 'relative', 'top': '-75px'}}>
              <div className='m-portlet'>
                <div className='m-portlet__body'>
                  <div className='m-widget12'>
                    <div className='m-widget12__item' >
                      <div className='col m-widget12__text1'>
                        <span className=''>
                          <h4 style={{'position': 'relative', 'top': '-67px', 'color': '#5867dd'}}>Cost Per</h4>
                          <br />
                          <h5 style={{'position': 'relative', 'top': '-81px'}}>Top 10 Applications</h5>
                        </span>
                      </div>
                      <div className='col'>
                        <span className='m-widget12__text2'>
                          <Doughnut id='applicationChart' width={180} data={applicationPieChartData} options={chartOptionApplication} />
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
          <div className='m-portlet'>
            <div className='m-portlet__body'>
              <div className='m-widget12'>
                <div className='m-widget12__item'>
                  <div className='m-widget12__text1'>
                    <span className=''>
                      <h4><a href='/softwares'>Software per Technology Category</a></h4>
                      <Bar
                        id='softwareChart'
                        data={softwareSummaryData}
                        width={200}
                        height={250}
                        options={chartOptionSoftware}
                      />
                      <br />
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
