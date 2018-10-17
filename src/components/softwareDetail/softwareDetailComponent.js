import React from 'react'
import PropTypes from 'prop-types'
import styles from './softwareDetailComponent.scss'
import moment from 'moment'
import DataModelComponent from '../dataModel/dataModelComponent'
import _ from 'lodash'
import Discussion from '../../containers/discussion/discussionContainer'
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

export default function Softwareview (props) {
  let softwareName = ''
  let softwareInstances = ''
  let softwareCost = ''
  let softwarePropertiesList = ''
  let parentSoftwareRelationshipList = ''
  let outgoingSoftwareRelationshipList = ''
  let incomingSoftwareRelationshipList = ''
  let childSoftwareRelationshipList = ''
  let modelRelationshipData = ''
  let startNode = {}
  if (props.softwarebyId && props.softwarebyId !== '') {
    softwareName = props.softwarebyId.resources[0].name
    softwareInstances = props.softwarebyId.resources[0].instances
    softwareCost = props.softwarebyId.resources[0].cost
    startNode.name = props.softwarebyId.resources[0].name
    startNode.title = props.softwarebyId.resources[0].name
  }
  if (props.softwareProperties && props.softwareProperties !== '') {
    softwarePropertiesList = props.softwareProperties.resources.map(function (property, index) {
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
        <tbody key={index} className={'col-6'}>
          <tr>
            <td><span className={styles.title}>Type</span></td>
            <td><span className={styles.labelbold}>{property.name}</span></td>
          </tr>
          {childProperties}
        </tbody>
      )
    })
    console.log('-------------', softwarePropertiesList)
  }
  if (props.softwareRelationships && props.softwareRelationships !== '') {
    modelRelationshipData = props.softwareRelationships.resources
    let parent = _.filter(props.softwareRelationships.resources, {'relationship_type': 'Parent'})
    let outgoing = _.filter(props.softwareRelationships.resources, {'relationship_type': 'ConnectFrom'})
    outgoing = _.orderBy(outgoing, ['connection.name', 'target_component.name'], ['asc', 'asc'])
    let incoming = _.filter(props.softwareRelationships.resources, {'relationship_type': 'ConnectTo'})
    incoming = _.orderBy(incoming, ['connection.name', 'target_component.name'], ['asc', 'asc'])
    let child = _.filter(props.softwareRelationships.resources, {'relationship_type': 'Child'})
    let parentSoftwareRelationshipListFn = function () {
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
    let childSoftwareRelationshipListFn = function () {
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
    let outgoingSoftwareRelationshipListFn = function () {
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
    let incomingSoftwareRelationshipListFn = function () {
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

    parentSoftwareRelationshipList = parentSoftwareRelationshipListFn()
    outgoingSoftwareRelationshipList = outgoingSoftwareRelationshipListFn()
    incomingSoftwareRelationshipList = incomingSoftwareRelationshipListFn()
    childSoftwareRelationshipList = childSoftwareRelationshipListFn()
  }
    return (
      <div>
        <h2>{softwareName}</h2>
        <div className='row'>
          <div className='col-xl-4'>
            <div className='m-portlet m-portlet--full-height'>
              <div className='m-portlet__body'>
                <div className='m-widget12'>
                  <div className='m-widget12__item'>
                    <span className='m-widget12__text1'>
                      <h1>Instances</h1>
                    </span>
                    <span className='m-widget12__text2'>
                      <h1>{softwareInstances}</h1>
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
                      <h2 className='pull-right'>{'R ' + formatAmount(softwareCost)}</h2>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* The table structure ends */}
        <div className='row col-sm-12'>
          <div className='col-md-5 m-portlet'>
            <div className={styles.tabsprops}>
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
                        {softwarePropertiesList}
                      </table>
                    </div>
                  </div>
                  <div className='tab-pane' id='m_tabs_3_2' role='tabpanel'>
                    <div className='m-accordion m-accordion--bordered' id='m_accordion_2' role='tablist'>
                      {parentSoftwareRelationshipList}
                      {outgoingSoftwareRelationshipList}
                      {incomingSoftwareRelationshipList}
                      {childSoftwareRelationshipList}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='col-md-7'>
            {/* <DataModelComponent startNode={startNode} relationships={modelRelationshipData} /> */}
            {/* <img alt='model' src='https://via.placeholder.com/900x545?text=Model%20Visualization' /> */}
            <div className='row'>
              <div id='divPaperWrapper' style={divStyle}>
                <DataModelComponent startNode={startNode} relationships={modelRelationshipData} />
                {/* <DataModelComponent /> */}
              </div>
            </div>
          </div>
        </div>
        <Discussion name={softwareName} type='Component' {...props} />
      </div>
      )
    }
 Softwareview.propTypes = {
  softwarebyId: PropTypes.any,
  softwareProperties: PropTypes.any,
  softwareRelationships: PropTypes.any
 }
