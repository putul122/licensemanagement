import React from 'react'
// import moment from 'moment'
import PropTypes from 'prop-types'
import styles from './applicationDetailComponent.scss'
import DataModelComponent from '../../containers/dataModel/dataModelContainer'
import Discussion from '../../containers/discussion/discussionContainer'
import NewDiscussion from '../../containers/newDiscussion/newDiscussionContainer'
import _ from 'lodash'
var divStyle = {
  // width: '900px',
  // height: '600px',
  'overflowY': 'scroll',
  'overflowX': 'scroll',
  'border': '1px solid #000000',
  'background-color': '#FFFFFF'
}
const formatAmount = (x) => {
  let parts = x.toString().split('.')
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
  if (typeof parts[1] !== 'undefined') {
    parts[1] = parts[1].substring(0, 2)
  }
  return parts.join('.')
}

export default function Applicationview (props) {
  console.log('Single Application Data', props)
  let applicationName = ''
  let applicationCount = ''
  let applicationCost = ''
  let applicationPropertiesList = ''
  let parentApplicationRelationshipList = ''
  let outgoingApplicationRelationshipList = ''
  let incomingApplicationRelationshipList = ''
  let childApplicationRelationshipList = ''
  let modelRelationshipData = ''
  let showProperties = props.showTabs.showProperty
  let showRelationships = props.showTabs.showRelationship
  let showApplication = props.showTabs.parentTab === 'Application' ? ' active show' : ''
  let showSoftware = props.showTabs.parentTab === 'Software' ? ' active show' : ''
  let showEntitlements = props.showTabs.parentTab === 'Entitlements' ? ' active show' : ''
  let startNode = {}
  let contextId = props.match.params.id
  let openDiscussionModal = function (event) {
    event.preventDefault()
    props.setDiscussionModalOpenStatus(true)
  }
  let handleCheckbox = function (value, data) {
    let displayIndex = data.displayIndex
    let applicationRelationshipData = JSON.parse(JSON.stringify(props.applicationRelationshipData))
    let index = _.findIndex(applicationRelationshipData, {displayIndex: displayIndex})
    let checkedObject = applicationRelationshipData[index]
    checkedObject.isDisplay = value
    applicationRelationshipData[index] = checkedObject
    props.setApplicationRelationship(applicationRelationshipData)
  }
  let handleGroupCheckbox = function (value, checkData) {
    console.log('handle group checkbox', value, checkData)
    let applicationRelationshipData = JSON.parse(JSON.stringify(props.applicationRelationshipData))
    if (checkData.relationshipType === 'Parent') {
      let parent = _.filter(props.applicationRelationshipData, {'relationship_type': 'Parent'})
      if (parent.length > 0) {
        parent.forEach(function (data, id) {
          let index = _.findIndex(applicationRelationshipData, {displayIndex: data.displayIndex})
          let checkedObject = applicationRelationshipData[index]
          checkedObject.isDisplay = value
          applicationRelationshipData[index] = checkedObject
        })
      }
    } else if (checkData.relationshipType === 'Child') {
      let child = _.filter(props.applicationRelationshipData, {'relationship_type': 'Child'})
      if (child.length > 0) {
        child.forEach(function (data, isCheckboxChecked) {
          let index = _.findIndex(applicationRelationshipData, {displayIndex: data.displayIndex})
          let checkedObject = applicationRelationshipData[index]
          checkedObject.isDisplay = value
          applicationRelationshipData[index] = checkedObject
        })
      }
    } else if (checkData.relationshipType === 'ConnectFrom') {
      let outgoing = _.filter(props.applicationRelationshipData, {'relationship_type': 'ConnectFrom'})
      outgoing = _.filter(outgoing, function (data) {
        return data.connection.name === checkData.connectionName
      })
      outgoing = _.filter(outgoing, function (data) {
        return data.target_component.component_type.name === checkData.targetComponentTypeName
      })
      if (outgoing.length > 0) {
        outgoing.forEach(function (data, id) {
          let index = _.findIndex(applicationRelationshipData, {displayIndex: data.displayIndex})
          let checkedObject = applicationRelationshipData[index]
          checkedObject.isDisplay = value
          applicationRelationshipData[index] = checkedObject
        })
      }
    } else if (checkData.relationshipType === 'ConnectTo') {
      let incoming = _.filter(props.applicationRelationshipData, {'relationship_type': 'ConnectTo'})
      incoming = _.filter(incoming, function (data) {
        return data.connection.name === checkData.connectionName
      })
      incoming = _.filter(incoming, function (data) {
        return data.target_component.component_type.name === checkData.targetComponentTypeName
      })
      if (incoming.length > 0) {
        incoming.forEach(function (data, id) {
          let index = _.findIndex(applicationRelationshipData, {displayIndex: data.displayIndex})
          let checkedObject = applicationRelationshipData[index]
          checkedObject.isDisplay = value
          applicationRelationshipData[index] = checkedObject
        })
      }
    }
    console.log('applicationRelationshipData', applicationRelationshipData)
    // let displayIndex = data.displayIndex
    // let index = _.findIndex(applicationRelationshipData, {displayIndex: displayIndex})
    // let checkedObject = applicationRelationshipData[index]
    // checkedObject.isDisplay = value
    // applicationRelationshipData[index] = checkedObject
    props.setApplicationRelationship(applicationRelationshipData)
  }
  let setCurrentTab = function (parentTab, childTab) {
    let showTabs = {...props.showTabs}
    if (parentTab) {
      if (parentTab === 'Application') {
        showTabs.parentTab = 'Application'
        showTabs.showProperty = ' active show'
        showTabs.showRelationship = ''
      } else if (parentTab === 'Software') {
        showTabs.parentTab = 'Software'
        showTabs.showProperty = ' active show'
        showTabs.showRelationship = ''
      } else if (parentTab === 'Entitlements') {
        showTabs.parentTab = 'Entitlements'
        showTabs.showProperty = ' active show'
        showTabs.showRelationship = ''
      }
    }
    if (childTab) {
      if (childTab === 'Property') {
        showTabs.showProperty = ' active show'
        showTabs.showRelationship = ''
      } else if (childTab === 'Relationship') {
        showTabs.showProperty = ''
        showTabs.showRelationship = ' active show'
      }
    }
    props.setCurrentTab(showTabs)
  }

  if (props.applicationbyId && props.applicationbyId !== '') {
    applicationName = props.applicationbyId.resources[0].name
    applicationCount = props.applicationbyId.resources[0].used_by_business_unit_count
    applicationCost = props.applicationbyId.resources[0].cost
    let appPackage = JSON.parse(localStorage.getItem('packages'))
    let componentTypes = appPackage.resources[0].component_types
    let componentTypeIcon = _.result(_.find(componentTypes, function (obj) {
        return obj.key === 'Application'
    }), 'icon')
    startNode.name = props.applicationbyId.resources[0].name
    startNode.title = props.applicationbyId.resources[0].name
    startNode.icon = componentTypeIcon
  }
  if (props.applicationProperties.length > 0) {
    applicationPropertiesList = props.applicationProperties.map(function (data, index) {
      return (
        <tr id={'property' + index}>
          <td><span className={styles.labelbold}>{data.name}</span></td>
          <td><span className={''}>{data.value}</span></td>
        </tr>
      )
    })
  }
  if (props.applicationRelationshipData && props.applicationRelationshipData !== '') {
    modelRelationshipData = _.filter(props.applicationRelationshipData, {'isDisplay': true})
    let parent = _.filter(props.applicationRelationshipData, {'relationship_type': 'Parent'})
    let outgoing = _.filter(props.applicationRelationshipData, {'relationship_type': 'ConnectFrom'})
    outgoing = _.orderBy(outgoing, ['connection.name', 'target_component.name'], ['asc', 'asc'])
    let incoming = _.filter(props.applicationRelationshipData, {'relationship_type': 'ConnectTo'})
    incoming = _.orderBy(incoming, ['connection.name', 'target_component.name'], ['asc', 'asc'])
    let child = _.filter(props.applicationRelationshipData, {'relationship_type': 'Child'})
    console.log('props.applicationRelationshipData', props.applicationRelationshipData)
    console.log('incoming.incoming', incoming)
    let parentApplicationRelationshipListFn = function () {
      if (parent.length > 0) {
        let isCheckboxChecked = false
        let checkData = {}
        checkData.relationshipType = parent[0].relationship_type
        checkData.connectionName = null
        checkData.targetComponentTypeName = parent[0].target_component.component_type.name
        let childElementList = parent.map(function (element, i) {
          if (element.isDisplay) {
            isCheckboxChecked = true
          }
        return (<span className='row' style={{'padding': '5px'}}>
          <div className='col-md-10'>
            <span className='pull-left'>{element.target_component.name}</span>
            <span className='float-right'>
              <span className='pull-right'>
                <input style={{cursor: 'pointer'}} type='checkbox' onChange={(event) => { handleCheckbox(event.target.checked, element) }} checked={element.isDisplay} />{' display'}
              </span>
            </span>
          </div>
        </span>)
      })
      return (
        <div className='m-accordion__item' style={{'overflow': 'visible'}}>
          <div className='m-accordion__item-head collapsed' role='tab' id='m_accordion_2_item_1_head' data-toggle='collapse' href={'#m_accordion_2_item_1_body' + parent[0].relationship_type} aria-expanded='true'>
            <input style={{cursor: 'pointer'}} onChange={(event) => { handleGroupCheckbox(event.target.checked, checkData) }} checked={isCheckboxChecked} className='pull-left' type='checkbox' />
            <span className='m-accordion__item-title'>{parent[0].component.name} {parent[0].relationship_type} {'Components'}</span>
            <span className='m-accordion__item-mode' />
          </div>
          <div className='m-accordion__item-body collapse' id={'m_accordion_2_item_1_body' + parent[0].relationship_type} role='tabpanel' aria-labelledby='m_accordion_2_item_1_head' data-parent='#m_accordion_2'>
            <div className='m-accordion__item-content'>
              {childElementList}
            </div>
          </div>
        </div>
        )
      } else {
        console.log('parent else')
        return false
      }
    }
    let childApplicationRelationshipListFn = function () {
      if (child.length > 0) {
        let isCheckboxChecked = false
        let checkData = {}
        checkData.relationshipType = child[0].relationship_type
        checkData.connectionName = null
        checkData.targetComponentTypeName = child[0].target_component.component_type.name
        let childElementList = child.map(function (element, i) {
          if (element.isDisplay) {
            isCheckboxChecked = true
          }
        return (<span className='row' style={{'padding': '5px'}}>
          <div className='col-md-10'>
            <span className='pull-left'>{element.target_component.name}</span>
            <span className='float-right'>
              <span className='pull-right'>
                <input style={{cursor: 'pointer'}} type='checkbox' onChange={(event) => { handleCheckbox(event.target.checked, element) }} checked={element.isDisplay} />{' display'}
              </span>
            </span>
          </div>
        </span>)
      })
      return (
        <div className='m-accordion__item' style={{'overflow': 'visible'}}>
          <div className='m-accordion__item-head collapsed' role='tab' id='m_accordion_2_item_1_head' data-toggle='collapse' href={'#m_accordion_2_item_1_body' + child[0].relationship_type} aria-expanded='true'>
            <input style={{cursor: 'pointer'}} checked={isCheckboxChecked} onChange={(event) => { handleGroupCheckbox(event.target.checked, checkData) }} className='pull-left' type='checkbox' />
            <span className='m-accordion__item-title'>{child[0].component.name} {child[0].relationship_type} {'Components'}</span>
            <span className='m-accordion__item-mode' />
          </div>
          <div className='m-accordion__item-body collapse' id={'m_accordion_2_item_1_body' + child[0].relationship_type} role='tabpanel' aria-labelledby='m_accordion_2_item_1_head' data-parent='#m_accordion_2'>
            <div className='m-accordion__item-content'>
              {childElementList}
            </div>
          </div>
        </div>
        )
      } else {
        console.log('child else')
        return false
      }
    }
    let outgoingApplicationRelationshipListFn = function () {
      if (outgoing.length > 0) {
        let outgoingElements = []
        console.log('outgoing', outgoing)
        var outgoingGroup = _.chain(outgoing)
        .groupBy('connection.name')
        .mapValues(connectionTypeGroup => _.groupBy(connectionTypeGroup, targetComponentTypeGroup => targetComponentTypeGroup.target_component.component_type.name))
        .value()
        console.log('outgoingGroup', outgoingGroup)
        let outerKey = 0
        for (let connectionKey in outgoingGroup) {
          if (outgoingGroup.hasOwnProperty(connectionKey)) {
            outerKey++
            let innerKey = 0
            for (let targetComponentTypeKey in outgoingGroup[connectionKey]) {
              if (outgoingGroup[connectionKey].hasOwnProperty(targetComponentTypeKey)) {
                innerKey++
                let isCheckboxChecked = false
                let checkData = {}
                checkData.relationshipType = 'ConnectFrom'
                checkData.connectionName = connectionKey
                checkData.targetComponentTypeName = targetComponentTypeKey
                let childElementList = outgoingGroup[connectionKey][targetComponentTypeKey].map(function (element, i) {
                  if (element.isDisplay) {
                    isCheckboxChecked = true
                  }
                  return (<span className='row' style={{'padding': '5px'}}>
                    <div className='col-md-10'>
                      <span className='pull-left'>{element.target_component.name}</span>
                      <span className='float-right'>
                        <span className='pull-right'>
                          <input style={{cursor: 'pointer'}} type='checkbox' onChange={(event) => { handleCheckbox(event.target.checked, element) }} checked={element.isDisplay} />{' display'}
                        </span>
                      </span>
                    </div>
                  </span>)
                })
                // let cleanKey = targetComponentTypeKey.replace(/ /g, '')
                outgoingElements.push(
                  <div className='m-accordion__item' style={{'overflow': 'visible'}}>
                    <div className='m-accordion__item-head collapsed' role='tab' id='m_accordion_2_item_1_head' data-toggle='collapse' href={'#outgoing_accordion_body' + outerKey + '-' + innerKey} aria-expanded='false'>
                      <input style={{cursor: 'pointer'}} checked={isCheckboxChecked} onChange={(event) => { handleGroupCheckbox(event.target.checked, checkData) }} className='pull-left' type='checkbox' />
                      <span className='m-accordion__item-title'>{outgoingGroup[connectionKey][targetComponentTypeKey][0].component.name} {connectionKey} {targetComponentTypeKey}</span>
                      <span className='m-accordion__item-mode' />
                    </div>
                    <div className='m-accordion__item-body collapse' id={'outgoing_accordion_body' + outerKey + '-' + innerKey} role='tabpanel' aria-labelledby='m_accordion_2_item_1_head' data-parent='#m_accordion_2'>
                      <div className='m-accordion__item-content'>
                        {childElementList}
                      </div>
                    </div>
                  </div>
                )
              }
            }
          }
        }
        return outgoingElements
      } else {
        console.log('outgoing else')
        return false
      }
    }
    let incomingApplicationRelationshipListFn = function () {
      if (incoming.length > 0) {
        var incomingGroup = _.chain(incoming)
        .groupBy('connection.name')
        .mapValues(connectionTypeGroup => _.groupBy(connectionTypeGroup, targetComponentTypeGroup => targetComponentTypeGroup.target_component.component_type.name))
        .value()
        console.log('incomingGroup', incomingGroup)
        let incomingElements = []
        let outerKey = 0
        for (let connectionKey in incomingGroup) {
          if (incomingGroup.hasOwnProperty(connectionKey)) {
            outerKey++
            let innerKey = 0
            for (let targetComponentTypeKey in incomingGroup[connectionKey]) {
              if (incomingGroup[connectionKey].hasOwnProperty(targetComponentTypeKey)) {
                innerKey++
                let isCheckboxChecked = false
                let checkData = {}
                checkData.relationshipType = 'ConnectTo'
                checkData.connectionName = connectionKey
                checkData.targetComponentTypeName = targetComponentTypeKey
                let childElementList = incomingGroup[connectionKey][targetComponentTypeKey].map(function (element, i) {
                  if (element.isDisplay) {
                    isCheckboxChecked = true
                  }
                  return (<span className='row' style={{'padding': '5px'}}>
                    <div className='col-md-10'>
                      <span className='pull-left'>{element.target_component.name}</span>
                      <span className='float-right'>
                        <span className='pull-right'>
                          <input style={{cursor: 'pointer'}} type='checkbox' onChange={(event) => { handleCheckbox(event.target.checked, element) }} checked={element.isDisplay} />{' display'}
                        </span>
                      </span>
                    </div>
                  </span>)
                })
                // let cleanKey = targetComponentTypeKey.replace(/ /g, '')
                incomingElements.push(
                  <div className='m-accordion__item' style={{'overflow': 'visible'}}>
                    <div className='m-accordion__item-head collapsed' role='tab' id='m_accordion_2_item_1_head' data-toggle='collapse' href={'#incoming_accordion_body' + outerKey + '-' + innerKey} aria-expanded='true'>
                      <input className='pull-left' style={{cursor: 'pointer'}} onChange={(event) => { handleGroupCheckbox(event.target.checked, checkData) }} checked={isCheckboxChecked} type='checkbox' />
                      <span className='m-accordion__item-title'>{targetComponentTypeKey} {connectionKey} {incomingGroup[connectionKey][targetComponentTypeKey][0].component.name}</span>
                      <span className='m-accordion__item-mode' />
                    </div>
                    <div className='m-accordion__item-body collapse' id={'incoming_accordion_body' + outerKey + '-' + innerKey} role='tabpanel' aria-labelledby='m_accordion_2_item_1_head' data-parent='#m_accordion_2'>
                      <div className='m-accordion__item-content'>
                        {childElementList}
                      </div>
                    </div>
                  </div>
                )
              }
            }
          }
        }
        return incomingElements
      } else {
        console.log('incoming else')
        return false
      }
    }

    parentApplicationRelationshipList = parentApplicationRelationshipListFn()
    outgoingApplicationRelationshipList = outgoingApplicationRelationshipListFn()
    incomingApplicationRelationshipList = incomingApplicationRelationshipListFn()
    childApplicationRelationshipList = childApplicationRelationshipListFn()
  }
    return (
      <div>
        <div className='row'>
          <div className='col-md-8'>
            <h2>Application: {applicationName}</h2>
          </div>
          <div className='col-md-4 float-right' >
            <span className='pull-right'>
              <a href='/applications' data-skin='light' data-toggle='m-tooltip' data-placement='top' data-original-title='back' className='btn btn-info m-btn m-btn--icon btn-sm m-btn--icon-only  m-btn--pill m-btn--air'>
                <i className='fa flaticon-list-1 fa-2x' />
              </a>&nbsp;&nbsp;
              <a href='javascript:void(0);' data-skin='light' data-toggle='m-tooltip' data-placement='top' data-original-title='Initiate Discussion' onClick={openDiscussionModal} className='btn btn-info m-btn m-btn--icon btn-sm m-btn--icon-only  m-btn--pill m-btn--air'>
                <i className='fa flaticon-multimedia-3 fa-2x' />
              </a>
            </span>
          </div>
        </div>
        <br />
        <div className='row'>
          <div className='col-xl-6'>
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
              <div className='m-portlet__body' style={{'height': '150px'}} >
                <div className='m-widget17'>
                  <div className='m-widget17__visual m-widget17__visual--chart m-portlet-fit--top m-portlet-fit--sides ' style={{'backgroundColor': '#0083C2'}}>
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
                          <h3># BU Uses</h3>
                          <h5 style={{'float': 'right', 'paddingRight': '25px', 'marginTop': '-35px'}}>{applicationCount}</h5>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='col-xl-6'>
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
                  <div className='m-widget17__visual m-widget17__visual--chart m-portlet-fit--top m-portlet-fit--sides ' style={{'backgroundColor': '#0083C2'}}>
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
                          <h5 style={{'float': 'right', 'paddingRight': '25px', 'marginTop': '-35px'}}>{'R ' + formatAmount(applicationCost)}</h5>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* The table structure ends */}
        <div className='row col-sm-12'>
          <div className='m-portlet'>
            <div className={styles.tabsprops}>
              <ul className='nav nav-tabs' role='tablist'>
                <li className='nav-item'>
                  <a className={'nav-link ' + showApplication} data-toggle='tab' onClick={(event) => { event.preventDefault(); setCurrentTab('Application', null) }} href='javascript:void(0);'>Application</a>
                </li>
                <li className='nav-item'>
                  <a className={'nav-link ' + showSoftware} data-toggle='tab' onClick={(event) => { event.preventDefault(); setCurrentTab('Software', null) }} href='javascript:void(0);'>Software</a>
                </li>
                <li className='nav-item'>
                  <a className={'nav-link ' + showEntitlements} data-toggle='tab' onClick={(event) => { event.preventDefault(); setCurrentTab('Entitlements', null) }} href='javascript:void(0);'>Entitlements</a>
                </li>
              </ul>
              <div className='tab-content'>
                <div className={'tab-pane' + showApplication} id='m_tabs_3_1' role='tabpanel'>
                  <div className='row'>
                    <div className='col-md-5'>
                      <div className={styles.tabsprops}>
                        <ul className='nav nav-tabs' role='tablist'>
                          <li className='nav-item'>
                            <a className={'nav-link' + showProperties} data-toggle='tab' onClick={(event) => { event.preventDefault(); setCurrentTab(null, 'Property') }} href='javascript:void(0);'>Properties</a>
                          </li>
                          <li className='nav-item'>
                            <a className={'nav-link' + showRelationships} data-toggle='tab' onClick={(event) => { event.preventDefault(); setCurrentTab(null, 'Relationship') }} href='javascript:void(0);'>Relationships</a>
                          </li>
                        </ul>
                        <div className='tab-content'>
                          <div className={'tab-pane' + showProperties} id='m_tabs_3_1' role='tabpanel'>
                            <table className={'table table-striped- table-bordered table-hover table-checkable dataTable dtr-inline collapsed ' + styles.borderless}>
                              <tbody>
                                {applicationPropertiesList}
                              </tbody>
                            </table>
                          </div>
                          <div className={'tab-pane' + showRelationships} id='m_tabs_3_2' role='tabpanel'>
                            {/* <div className='pull-right'>
                              <button onClick={openModal} className={'btn btn-sm btn-outline-info pull-right'}>Add Relationship</button>
                            </div> */}
                            <div className={'row'} style={{'marginTop': '20px'}}>
                              <div className='m--space-10' />
                              <div className='accordion m-accordion m-accordion--bordered' style={{width: '100%'}} id='m_accordion_2' role='tablist' aria-multiselectable='true'>
                                {parentApplicationRelationshipList}
                                {outgoingApplicationRelationshipList}
                                {incomingApplicationRelationshipList}
                                {childApplicationRelationshipList}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className='col-md-7'>
                      <div className='row'>
                        <div id='divPaperWrapper' style={divStyle}>
                          <DataModelComponent startNode={startNode} relationships={modelRelationshipData} />
                          {/* <DataModelComponent /> */}
                        </div>
                      </div>
                      {/* <img alt='model' src='https://via.placeholder.com/900x545?text=Model%20Visualization' /> */}
                    </div>
                  </div>
                </div>
                <div className={'tab-pane' + showSoftware} id='m_tabs_3_2' role='tabpanel'>
                  {/* <div className='pull-right'>
                    <button onClick={openModal} className={'btn btn-sm btn-outline-info pull-right'}>Add Relationship</button>
                  </div> */}
                </div>
                <div className={'tab-pane' + showEntitlements} id='m_tabs_3_2' role='tabpanel'>
                  {/* <div className='pull-right'>
                    <button onClick={openModal} className={'btn btn-sm btn-outline-info pull-right'}>Add Relationship</button>
                  </div> */}
                </div>
              </div>
            </div>
          </div>
        </div>
        <Discussion name={applicationName} type='Component' {...props} />
        <NewDiscussion contextId={contextId} name={applicationName} type='Component' {...props} />
      </div>
      )
    }
 Applicationview.propTypes = {
  match: PropTypes.any,
  applicationbyId: PropTypes.any,
  applicationProperties: PropTypes.any,
  // applicationRelationships: PropTypes.any,
  applicationRelationshipData: PropTypes.any,
  showTabs: PropTypes.any
 }
