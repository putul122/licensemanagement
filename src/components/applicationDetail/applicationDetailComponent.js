import React from 'react'
// import OneApplication from './mockGetApplication'
import moment from 'moment'
import PropTypes from 'prop-types'
import styles from './applicationDetailComponent.scss'
import DataModelComponent from '../dataModel/dataModelComponent'
import Discussion from '../../containers/discussion/discussionContainer'
import NewDiscussion from '../../containers/newDiscussion/newDiscussionContainer'
import _ from 'lodash'
var divStyle = {
  width: '900px',
  height: '600px',
  // 'overflowY': 'scroll',
  // 'overflowX': 'scroll',
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
  let applicationProperties = props.applicationProperties.resources
  console.log('%%%%', applicationProperties)
  let startNode = {}
  let contextId = props.match.params.id
  let openDiscussionModal = function (event) {
    event.preventDefault()
    props.setDiscussionModalOpenStatus(true)
  }
  let toggleExpandIcon = function (index) {
    // eslint-disable-next-line
    let iconClass = $('#expandIcon' + index).attr('class')
    if (iconClass === 'fa fa-plus') {
      // eslint-disable-next-line
      $('#expandIcon' + index).removeClass('fa-plus').addClass('fa-minus')
    } else {
      // eslint-disable-next-line
      $('#expandIcon' + index).removeClass('fa-minus').addClass('fa-plus')
    }
  }
  let showProperty = function (event) {
    let payload = {'showProperty': ' active show', 'showRelationship': ''}
    props.setCurrentTab(payload)
  }
  let showRelationship = function (event) {
    let payload = {'showProperty': '', 'showRelationship': ' active show'}
    props.setCurrentTab(payload)
  }
  if (props.applicationbyId && props.applicationbyId !== '') {
    applicationName = props.applicationbyId.resources[0].name
    applicationCount = props.applicationbyId.resources[0].used_by_business_unit_count
    applicationCost = props.applicationbyId.resources[0].cost
    startNode.name = props.applicationbyId.resources[0].name
    startNode.title = props.applicationbyId.resources[0].name
  }
  if (props.applicationProperties !== '') {
    applicationPropertiesList = applicationProperties.map(function (property, index) {
      let propertyProperties = property.properties
      let childProperties = propertyProperties.map(function (childProperty, childIndex) {
        let value
        // console.log('childProperty', childProperty)
        if (childProperty.property_type.key === 'Integer') {
          value = childProperty.int_value
        } else if (childProperty.property_type.key === 'Decimal') {
          value = childProperty.float_value
        } else if (childProperty.property_type.key === 'DateTime') {
          value = childProperty.date_time_value ? moment(childProperty.date_time_value).format('DD MMM YYYY') : ''
        } else if (childProperty.property_type.key === 'Text') {
          value = childProperty.text_value
        } else if (childProperty.property_type.key === 'List') {
          // let childPropertyOption = childProperty.value_set.values.map((option, opIndex) => {
          //   option.label = option.name
          //   option.value = option.id
          //   return option
          // })
          let dvalue = childProperty.value_set_value
          if (childProperty.value_set_value !== null) {
            dvalue.label = childProperty.value_set_value.name
            dvalue.value = childProperty.value_set_value.id
          }
          value = childProperty.value_set_value ? childProperty.value_set_value.name : null
        } else {
          value = childProperty.other_value
        }
        return (
          <tr key={'child' + childIndex}>
            <td><span className={styles.labelbold}>{childProperty.name}</span></td>
            <td><span>{value}</span></td>
          </tr>
        )
      })
      return (
        // <tbody key={index} className={'col-6'}>
        //   <tr>
        //     <td><span className={styles.title}>Type</span></td>
        //     <td><span className={styles.labelbold}>{property.name}</span></td>
        //   </tr>
        //   {childProperties}
        // </tbody>
        <tbody key={index} className={'col-6'}>
          <tr id={'property' + index} onClick={(event) => { event.preventDefault(); toggleExpandIcon(index) }} data-toggle='collapse' data-target={'#expand' + index} style={{cursor: 'pointer'}}>
            <td><icon id={'expandIcon' + index} className={'fa fa-plus'} aria-hidden='true' />&nbsp;</td>
            <td><span className={styles.labelbold}>{property.name}</span></td>
          </tr>
          <tr className='collapse' id={'expand' + index}>
            <td colSpan='2'>
              <table>
                {childProperties}
              </table>
            </td>
          </tr>
        </tbody>
      )
    })
    console.log('-------------', applicationPropertiesList)
  }
  if (props.applicationRelationships && props.applicationRelationships !== '') {
    modelRelationshipData = props.applicationRelationships.resources
    let parent = _.filter(props.applicationRelationships.resources, {'relationship_type': 'Parent'})
    let outgoing = _.filter(props.applicationRelationships.resources, {'relationship_type': 'ConnectFrom'})
    outgoing = _.orderBy(outgoing, ['connection.name', 'target_component.name'], ['asc', 'asc'])
    let incoming = _.filter(props.applicationRelationships.resources, {'relationship_type': 'ConnectTo'})
    incoming = _.orderBy(incoming, ['connection.name', 'target_component.name'], ['asc', 'asc'])
    let child = _.filter(props.applicationRelationships.resources, {'relationship_type': 'Child'})
    let parentApplicationRelationshipListFn = function () {
      if (parent.length > 0) {
        let childElementList = parent.map(function (element, i) {
        return (<span className='row' style={{'padding': '5px'}}>
          <div className='col-md-10'><span>{element.target_component.name}</span></div>
        </span>)
      })
      return (
        <div className='m-accordion__item' style={{'overflow': 'visible'}}>
          <div className='m-accordion__item-head collapsed' role='tab' id='m_accordion_2_item_1_head' data-toggle='collapse' href={'#m_accordion_2_item_1_body' + parent[0].relationship_type} aria-expanded='true'>
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
        let childElementList = child.map(function (element, i) {
        return (<span className='row' style={{'padding': '5px'}}>
          <div className='col-md-10'><span>{element.target_component.name}</span></div>
        </span>)
      })
      return (
        <div className='m-accordion__item' style={{'overflow': 'visible'}}>
          <div className='m-accordion__item-head collapsed' role='tab' id='m_accordion_2_item_1_head' data-toggle='collapse' href={'#m_accordion_2_item_1_body' + child[0].relationship_type} aria-expanded='true'>
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
        var outgoingGroup = _.chain(outgoing)
        .groupBy('connection.name')
        .mapValues(connectionTypeGroup => _.groupBy(connectionTypeGroup, targetComponentTypeGroup => targetComponentTypeGroup.target_component.component_type.name))
        .value()
        let outerKey = 0
        for (let connectionKey in outgoingGroup) {
          if (outgoingGroup.hasOwnProperty(connectionKey)) {
            outerKey++
            let innerKey = 0
            for (let targetComponentTypeKey in outgoingGroup[connectionKey]) {
              if (outgoingGroup[connectionKey].hasOwnProperty(targetComponentTypeKey)) {
                innerKey++
                let childElementList = outgoingGroup[connectionKey][targetComponentTypeKey].map(function (element, i) {
                  return (<span className='row' style={{'padding': '5px'}}>
                    <div className='col-md-10'><span>{element.target_component.name}</span></div>
                  </span>)
                })
                // let cleanKey = targetComponentTypeKey.replace(/ /g, '')
                outgoingElements.push(
                  <div className='m-accordion__item' style={{'overflow': 'visible'}}>
                    <div className='m-accordion__item-head collapsed' role='tab' id='m_accordion_2_item_1_head' data-toggle='collapse' href={'#outgoing_accordion_body' + outerKey + '-' + innerKey} aria-expanded='false'>
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
        let incomingElements = []
        let outerKey = 0
        for (let connectionKey in incomingGroup) {
          if (incomingGroup.hasOwnProperty(connectionKey)) {
            outerKey++
            let innerKey = 0
            for (let targetComponentTypeKey in incomingGroup[connectionKey]) {
              if (incomingGroup[connectionKey].hasOwnProperty(targetComponentTypeKey)) {
                innerKey++
                let childElementList = incomingGroup[connectionKey][targetComponentTypeKey].map(function (element, i) {
                  return (<span className='row' style={{'padding': '5px'}}>
                    <div className='col-md-10'><span>{element.target_component.name}</span></div>
                  </span>)
                })
                // let cleanKey = targetComponentTypeKey.replace(/ /g, '')
                incomingElements.push(
                  <div className='m-accordion__item' style={{'overflow': 'visible'}}>
                    <div className='m-accordion__item-head collapsed' role='tab' id='m_accordion_2_item_1_head' data-toggle='collapse' href={'#incoming_accordion_body' + outerKey + '-' + innerKey} aria-expanded='true'>
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
            <h2>{applicationName}</h2>
          </div>
          <div className='col-md-4 float-right' >
            <span className='pull-right'>
              <a href='/applications' className='btn btn-info m-btn m-btn--icon btn-sm m-btn--icon-only  m-btn--pill m-btn--air'>
                <i className='fa flaticon-list-1 fa-2x' />
              </a>&nbsp;&nbsp;
              <a href='javascript:void(0);' onClick={openDiscussionModal} className='btn btn-info m-btn m-btn--icon btn-sm m-btn--icon-only  m-btn--pill m-btn--air'>
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
          <div className='col-md-5 m-portlet'>
            {/* <div className={styles.tabsprops}>
              <ul className='nav nav-tabs nav-fill' role='tablist'>
                <li className='nav-item'>
                  <a className='nav-link active show' data-toggle='tab' href='#m_tabs_3_1'>Properties</a>
                </li>
                <li className='nav-item'>
                  <a className='nav-link' data-toggle='tab' href='#m_tabs_3_2'>Relationships</a>
                </li>
              </ul>
              <div className={styles.tabcontentborder}>
                <div className='tab-content'>
                  <div className='tab-pane active' id='m_tabs_3_1' role='tabpanel'>
                    <div className='col-md-12'>
                      <table className={'table ' + styles.borderless}>
                        {applicationPropertiesList}
                      </table>
                    </div>
                  </div>
                  <div className='tab-pane' id='m_tabs_3_2' role='tabpanel'>
                    <div className='m-accordion m-accordion--bordered' id='m_accordion_2' role='tablist'>
                      {parentApplicationRelationshipList}
                      {outgoingApplicationRelationshipList}
                      {incomingApplicationRelationshipList}
                      {childApplicationRelationshipList}
                    </div>
                  </div>
                </div>
              </div>
            </div> */}
            <div className={styles.tabsprops}>
              <ul className='nav nav-tabs' role='tablist'>
                <li className='nav-item'>
                  <a className={'nav-link' + showProperties} data-toggle='tab' onClick={showProperty} href='javascript:void(0);'>Properties</a>
                </li>
                <li className='nav-item'>
                  <a className={'nav-link' + showRelationships} data-toggle='tab' onClick={showRelationship} href='javascript:void(0);'>Relationships</a>
                </li>
              </ul>
              <div className='tab-content'>
                <div className={'tab-pane' + showProperties} id='m_tabs_3_1' role='tabpanel'>
                  <table className={'table table-striped- table-bordered table-hover table-checkable dataTable dtr-inline collapsed ' + styles.borderless}>
                    {applicationPropertiesList}
                  </table>
                </div>
                <div className={'tab-pane' + showRelationships} id='m_tabs_3_2' role='tabpanel'>
                  {/* <div className='pull-right'>
                    <button onClick={openModal} className={'btn btn-sm btn-outline-info pull-right'}>Add Relationship</button>
                  </div> */}
                  <div className={'row'} style={{'marginTop': '20px'}}>
                    <div className='m--space-10' />
                    <div className='accordion m-accordion m-accordion--bordered' id='m_accordion_2' role='tablist' aria-multiselectable='true'>
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
        <Discussion name={applicationName} type='Component' {...props} />
        <NewDiscussion contextId={contextId} name={applicationName} type='Component' {...props} />
      </div>
      )
    }
 Applicationview.propTypes = {
  match: PropTypes.any,
  applicationbyId: PropTypes.any,
  applicationProperties: PropTypes.any,
  applicationRelationships: PropTypes.any,
  showTabs: PropTypes.any
 }
