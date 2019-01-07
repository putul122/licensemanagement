import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import _ from 'lodash'
import ComponentModelComponent from '../componentModel/componentModelComponent'
import styles from './componentModalViewComponent.scss'
import ReactModal from 'react-modal'
ReactModal.setAppElement('#root')
const customStylescrud = { content: { top: '20%', background: 'none', border: '0px', overflow: 'none' } }
var divStyle = {
    // width: '900px',
    // height: '700px',
    'overflowY': 'scroll',
    'overflowX': 'scroll',
    'border': '1px solid #000000'
}

export default function ComponentModalView (props) {
    console.log('modal view props', props)
    let closeModal = function (event) {
        props.setModalSettings(false)
    }
    let componentTypeComponentPropertiesList = ''
    let showProperties = props.showTabs.showProperty
    let showRelationships = props.showTabs.showRelationship
    let componentTypeComponentProperties = props.componentTypeComponentProperties.resources ? [...props.componentTypeComponentProperties.resources] : ''
    let componentTypeComponentRelationships = props.componentTypeComponentRelationships
    let modelRelationshipData = ''
    let startNode = {}
    let parentComponentRelationshipList = ''
    let outgoingComponentRelationshipList = ''
    let incomingComponentRelationshipList = ''
    let childComponentRelationshipList = ''
    let showProperty = function (event) {
        let payload = {'showProperty': ' active show', 'showRelationship': ''}
        props.setCurrentTab(payload)
    }
    let showRelationship = function (event) {
        let payload = {'showProperty': '', 'showRelationship': ' active show'}
        props.setCurrentTab(payload)
    }
    let toggleExpandIcon = function (index) {
        // eslint-disable-next-line
        let iconClass = $('#expandIconModalContent' + index).attr('class')
        if (iconClass === 'fa fa-plus') {
          // eslint-disable-next-line
          $('#expandIconModalContent' + index).removeClass('fa-plus').addClass('fa-minus')
        } else {
          // eslint-disable-next-line
          $('#expandIconModalContent' + index).removeClass('fa-minus').addClass('fa-plus')
        }
      }
    // Display Component Properties
    if (componentTypeComponentProperties !== '') {
        console.log('original', componentTypeComponentProperties)
        componentTypeComponentPropertiesList = componentTypeComponentProperties.map(function (property, index) {
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
              value = childProperty.value_set_value ? childProperty.value_set_value.name : null
            } else {
              value = childProperty.other_value
            }
            return (
              <tr key={'child' + childIndex}>
                <td><span className={styles.labelbold}>{childProperty.name}</span></td>
                <td>
                  <span>{value}</span>
                </td>
              </tr>
            )
          })
          return (
            <tbody key={index} className={'col-6'}>
              <tr id={'property' + index} onClick={(event) => { event.preventDefault(); toggleExpandIcon(index) }} data-toggle='collapse' data-target={'#expandModalContent' + index} style={{cursor: 'pointer'}}>
                <td><icon id={'expandIconModalContent' + index} className={'fa fa-plus'} aria-hidden='true' />&nbsp;</td>
                <td><span className={styles.labelbold}>{property.name}</span></td>
              </tr>
              <tr className='collapse' id={'expandModalContent' + index}>
                <td colSpan='2'>
                  <table>
                    {childProperties}
                  </table>
                </td>
              </tr>
            </tbody>
          )
        })
      } else {
        console.log('check properties else', props)
      }

      if (componentTypeComponentRelationships !== '') {
        modelRelationshipData = componentTypeComponentRelationships.resources
        startNode.name = 'test'
        startNode.title = 'test'
        let parent = _.filter(componentTypeComponentRelationships.resources, {'relationship_type': 'Parent'})
        let outgoing = _.filter(componentTypeComponentRelationships.resources, {'relationship_type': 'ConnectFrom'})
        outgoing = _.orderBy(outgoing, ['connection.name', 'target_component.name'], ['asc', 'asc'])
        let incoming = _.filter(componentTypeComponentRelationships.resources, {'relationship_type': 'ConnectTo'})
        incoming = _.orderBy(incoming, ['connection.name', 'target_component.name'], ['asc', 'asc'])
        let child = _.filter(componentTypeComponentRelationships.resources, {'relationship_type': 'Child'})
        let parentComponentRelationshipListFn = function () {
          if (parent.length > 0) {
            let childElementList = parent.map(function (element, i) {
            // let relationshipActionSettings = {...props.relationshipActionSettings}
            // relationshipActionSettings.relationshipText = parent[0].component.name + ' ' + parent[0].relationship_type + ' Components'
            // relationshipActionSettings.relationshipId = element.target_component.id
            return (<span className='row' style={{'padding': '5px'}}>
              <div className='col-md-10'><a href='javascript:void(0);'>{element.target_component.name}</a></div>
              {/* <div className='dropdown pull-right col-md-2'>
                <button className='m-portlet__nav-link m-dropdown__toggle btn btn-secondary m-btn m-btn--icon m-btn--pill' data-toggle='dropdown' data-hover='dropdown' aria-haspopup='true' aria-expanded='false'><i className='la la-ellipsis-h' /></button>
                <div className={styles.dropmenu}>
                  <ul className='dropdown-menu'>
                    <li><a href='javascript:void(0);'><h6>Relationships Action</h6></a></li>
                    <li><a href='javascript:void(0);' onClick={(event) => { relationshipActionSettings.isModalOpen = true; relationshipActionSettings.componentName = element.target_component.name; relationshipActionSettings.actionType = 'view'; relationshipActionSettings.selectedObject = element; props.setRelationshipActionSettings(relationshipActionSettings) }} >View</a></li>
                    <li><a href='javascript:void(0);' onClick={(event) => { relationshipActionSettings.isModalOpen = true; relationshipActionSettings.actionType = 'edit'; relationshipActionSettings.componentName = element.target_component.name; relationshipActionSettings.selectedObject = element; props.setRelationshipActionSettings(relationshipActionSettings) }} >Edit</a></li>
                    <li><a href='javascript:void(0);' onClick={(event) => { relationshipActionSettings.isModalOpen = true; relationshipActionSettings.actionType = 'delete'; relationshipActionSettings.componentName = element.target_component.name; relationshipActionSettings.selectedObject = element; props.setRelationshipActionSettings(relationshipActionSettings) }} >Delete</a></li>
                  </ul>
                </div>
              </div>
              <br /> */}
            </span>)
          })
          return (
            <div className='m-accordion__item' style={{'overflow': 'visible'}}>
              <div className='m-accordion__item-head collapsed' role='tab' id='m_accordion_2_item_1_head' data-toggle='collapse' href={'#modal_accordion_2_item_1_body' + parent[0].relationship_type} aria-expanded='true'>
                <span className='m-accordion__item-title'>{parent[0].component.name} {'is Child of'} {parent[0].target_component.component_type.name}</span>
                <span className='m-accordion__item-mode' />
              </div>
              <div className='m-accordion__item-body collapse' id={'modal_accordion_2_item_1_body' + parent[0].relationship_type} role='tabpanel' aria-labelledby='m_accordion_2_item_1_head' data-parent='#m_accordion_2'>
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
        let childComponentRelationshipListFn = function () {
          if (child.length > 0) {
            let childElementList = child.map(function (element, i) {
            // let relationshipActionSettings = {...props.relationshipActionSettings}
            // relationshipActionSettings.relationshipText = child[0].component.name + ' ' + child[0].relationship_type + ' Components'
            // relationshipActionSettings.relationshipId = element.target_component.id
            return (<span className='row' style={{'padding': '5px'}}>
              <div className='col-md-10'><a href='javascript:void(0);'>{element.target_component.name}</a></div>
              {/* <div className='dropdown pull-right col-md-2'>
                <button className='m-portlet__nav-link m-dropdown__toggle btn btn-secondary m-btn m-btn--icon m-btn--pill' data-toggle='dropdown' data-hover='dropdown' aria-haspopup='true' aria-expanded='false'><i className='la la-ellipsis-h' /></button>
                <div className={styles.dropmenu}>
                  <ul className='dropdown-menu'>
                    <li><a href='javascript:void(0);'><h6>Relationships Action</h6></a></li>
                    <li><a href='javascript:void(0);' onClick={(event) => { relationshipActionSettings.isModalOpen = true; relationshipActionSettings.componentName = element.target_component.name; relationshipActionSettings.actionType = 'view'; relationshipActionSettings.selectedObject = element; props.setRelationshipActionSettings(relationshipActionSettings) }} >View</a></li>
                    <li><a href='javascript:void(0);' onClick={(event) => { relationshipActionSettings.isModalOpen = true; relationshipActionSettings.actionType = 'edit'; relationshipActionSettings.componentName = element.target_component.name; relationshipActionSettings.selectedObject = element; props.setRelationshipActionSettings(relationshipActionSettings) }} >Edit</a></li>
                    <li><a href='javascript:void(0);' onClick={(event) => { relationshipActionSettings.isModalOpen = true; relationshipActionSettings.actionType = 'delete'; relationshipActionSettings.componentName = element.target_component.name; relationshipActionSettings.selectedObject = element; props.setRelationshipActionSettings(relationshipActionSettings) }} >Delete</a></li>
                  </ul>
                </div>
              </div>
              <br /> */}
            </span>)
          })
          return (
            <div className='m-accordion__item' style={{'overflow': 'visible'}}>
              <div className='m-accordion__item-head collapsed' role='tab' id='m_accordion_2_item_1_head' data-toggle='collapse' href={'#modal_accordion_2_item_2_body' + child[0].relationship_type} aria-expanded='true'>
                <span className='m-accordion__item-title'>{child[0].component.name} {'is Parent of'} {child[0].target_component.component_type.name}</span>
                <span className='m-accordion__item-mode' />
              </div>
              <div className='m-accordion__item-body collapse' id={'modal_accordion_2_item_2_body' + child[0].relationship_type} role='tabpanel' aria-labelledby='m_accordion_2_item_1_head' data-parent='#m_accordion_2'>
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
        let outgoingComponentRelationshipListFn = function () {
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
                    // let relationshipActionSettings = {...props.relationshipActionSettings}
                    // relationshipActionSettings.relationshipText = outgoingGroup[connectionKey][targetComponentTypeKey][0].component.name + ' ' + connectionKey + ' ' + targetComponentTypeKey
                    // relationshipActionSettings.relationshipId = outgoingGroup[connectionKey][targetComponentTypeKey][0].connection.id
                    let childElementList = outgoingGroup[connectionKey][targetComponentTypeKey].map(function (element, i) {
                      return (<span className='row' style={{'padding': '5px'}}>
                        <div className='col-md-10'><a href='javascript:void(0);'>{element.target_component.name}</a></div>
                        {/* <div className='dropdown pull-right col-md-2'>
                          <button className='m-portlet__nav-link m-dropdown__toggle btn btn-secondary m-btn m-btn--icon m-btn--pill' data-toggle='dropdown' data-hover='dropdown' aria-haspopup='true' aria-expanded='false'><i className='la la-ellipsis-h' /></button>
                          <div className={styles.dropmenu}>
                            <ul className='dropdown-menu'>
                              <li><a href='javascript:void(0);'><h6>Relationships Action</h6></a></li>
                              <li><a href='javascript:void(0);' onClick={(event) => { relationshipActionSettings.isModalOpen = true; relationshipActionSettings.componentName = element.target_component.name; relationshipActionSettings.actionType = 'view'; relationshipActionSettings.selectedObject = element; props.setRelationshipActionSettings(relationshipActionSettings) }}>View</a></li>
                              <li><a href='javascript:void(0);' onClick={(event) => { relationshipActionSettings.isModalOpen = true; relationshipActionSettings.actionType = 'edit'; relationshipActionSettings.componentName = element.target_component.name; relationshipActionSettings.selectedObject = element; props.setRelationshipActionSettings(relationshipActionSettings) }}>Edit</a></li>
                              <li><a href='javascript:void(0);' onClick={(event) => { relationshipActionSettings.isModalOpen = true; relationshipActionSettings.actionType = 'delete'; relationshipActionSettings.componentName = element.target_component.name; relationshipActionSettings.selectedObject = element; props.setRelationshipActionSettings(relationshipActionSettings) }}>Delete</a></li>
                            </ul>
                          </div>
                        </div>
                        <br /> */}
                      </span>)
                    })
                    // let cleanKey = targetComponentTypeKey.replace(/ /g, '')
                    outgoingElements.push(
                      <div className='m-accordion__item' style={{'overflow': 'visible'}}>
                        <div className='m-accordion__item-head collapsed' role='tab' id='m_accordion_2_item_1_head' data-toggle='collapse' href={'#outgoing_modal_accordion_body' + outerKey + '-' + innerKey} aria-expanded='false'>
                          <span className='m-accordion__item-title'>{outgoingGroup[connectionKey][targetComponentTypeKey][0].component.name} {connectionKey} {targetComponentTypeKey}</span>
                          <span className='m-accordion__item-mode' />
                        </div>
                        <div className='m-accordion__item-body collapse' id={'outgoing_modal_accordion_body' + outerKey + '-' + innerKey} role='tabpanel' aria-labelledby='m_accordion_2_item_1_head' data-parent='#m_accordion_2'>
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
        let incomingComponentRelationshipListFn = function () {
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
                    // let relationshipActionSettings = {...props.relationshipActionSettings}
                    // relationshipActionSettings.relationshipText = targetComponentTypeKey + ' ' + connectionKey + ' ' + incomingGroup[connectionKey][targetComponentTypeKey][0].component.name
                    // relationshipActionSettings.relationshipId = incomingGroup[connectionKey][targetComponentTypeKey][0].connection.id
                    let childElementList = incomingGroup[connectionKey][targetComponentTypeKey].map(function (element, i) {
                      return (<span className='row' style={{'padding': '5px'}}>
                        <div className='col-md-10'><a href='javascript:void(0);'>{element.target_component.name}</a></div>
                        {/* <div className='dropdown pull-right col-md-2'>
                          <button className='m-portlet__nav-link m-dropdown__toggle btn btn-secondary m-btn m-btn--icon m-btn--pill' data-toggle='dropdown' data-hover='dropdown' aria-haspopup='true' aria-expanded='false'><i className='la la-ellipsis-h' /></button>
                          <div className={styles.dropmenu}>
                            <ul className='dropdown-menu'>
                              <li><a href='javascript:void(0);'><h6>Relationships Action</h6></a></li>
                              <li><a href='javascript:void(0);' onClick={(event) => { relationshipActionSettings.isModalOpen = true; relationshipActionSettings.actionType = 'view'; relationshipActionSettings.componentName = element.target_component.name; relationshipActionSettings.selectedObject = element; props.setRelationshipActionSettings(relationshipActionSettings) }}>View</a></li>
                              <li><a href='javascript:void(0);' onClick={(event) => { relationshipActionSettings.isModalOpen = true; relationshipActionSettings.actionType = 'edit'; relationshipActionSettings.componentName = element.target_component.name; relationshipActionSettings.selectedObject = element; props.setRelationshipActionSettings(relationshipActionSettings) }}>Edit</a></li>
                              <li><a href='javascript:void(0);' onClick={(event) => { relationshipActionSettings.isModalOpen = true; relationshipActionSettings.actionType = 'delete'; relationshipActionSettings.componentName = element.target_component.name; relationshipActionSettings.selectedObject = element; props.setRelationshipActionSettings(relationshipActionSettings) }}>Delete</a></li>
                            </ul>
                          </div>
                        </div>
                        <br /> */}
                      </span>)
                    })
                    // let cleanKey = targetComponentTypeKey.replace(/ /g, '')
                    incomingElements.push(
                      <div className='m-accordion__item' style={{'overflow': 'visible'}}>
                        <div className='m-accordion__item-head collapsed' role='tab' id='m_accordion_2_item_1_head' data-toggle='collapse' href={'#incoming_modal_accordion_body' + outerKey + '-' + innerKey} aria-expanded='true'>
                          <span className='m-accordion__item-title'>{targetComponentTypeKey} {connectionKey} {incomingGroup[connectionKey][targetComponentTypeKey][0].component.name}</span>
                          <span className='m-accordion__item-mode' />
                        </div>
                        <div className='m-accordion__item-body collapse' id={'incoming_modal_accordion_body' + outerKey + '-' + innerKey} role='tabpanel' aria-labelledby='m_accordion_2_item_1_head' data-parent='#m_accordion_2'>
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
        parentComponentRelationshipList = parentComponentRelationshipListFn()
        outgoingComponentRelationshipList = outgoingComponentRelationshipListFn()
        incomingComponentRelationshipList = incomingComponentRelationshipListFn()
        childComponentRelationshipList = childComponentRelationshipListFn()
      }
  return (
    <div>
      <ReactModal isOpen={props.isModalOpen}
            // onRequestClose={closeModal}
        shouldCloseOnOverlayClick={false}
        className=''
        style={customStylescrud}
            >
        {/* <button onClick={closeModal} ><i className='la la-close' /></button> */}
        <div>
          <div className='modal-dialog modal-lg'>
            <div className='modal-content'>
              <div className='modal-header'>
                <h4 className='modal-title' id='exampleModalLabel'>{'View Component'}</h4>
                <button type='button' onClick={closeModal} className='btn btn-sm btn-outline-info' data-dismiss='modal' aria-label='Close'>Close</button>
              </div>
              <div className='modal-body' style={{'height': 'calc(60vh - 55px)', 'overflow': 'auto'}}>
                <div className={styles.borderline}>
                  <div className='row'>
                    <div className='col-sm-12 col-md-5' >
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
                              {componentTypeComponentPropertiesList}
                            </table>
                          </div>
                          <div className={'tab-pane' + showRelationships} id='m_tabs_3_2' role='tabpanel'>
                            <div className={'row'} style={{'marginTop': '20px'}}>
                              <div className='m--space-10' />
                              <div className='accordion m-accordion m-accordion--bordered' id='m_accordion_2' role='tablist' aria-multiselectable='true'>
                                {parentComponentRelationshipList}
                                {outgoingComponentRelationshipList}
                                {incomingComponentRelationshipList}
                                {childComponentRelationshipList}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className='col-sm-12 col-md-7'>
                      <div className='m--space-10' />
                      <div className={''}>
                        <div className='row'>
                          <div id='divPaperWrapper' style={divStyle} >
                            <ComponentModelComponent startNode={startNode} relationships={modelRelationshipData} />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </ReactModal>
    </div>
  )
}
ComponentModalView.propTypes = {
  isModalOpen: PropTypes.any,
  // setCurrentTab: PropTypes.func,
  // setModalSettings: PropTypes.func,
  componentTypeComponentProperties: PropTypes.any,
  componentTypeComponentRelationships: PropTypes.any,
  showTabs: PropTypes.any
}
