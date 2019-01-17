import React from 'react'
// import _ from 'lodash'
// import debounce from 'lodash/debounce'
import ReactModal from 'react-modal'
import PropTypes from 'prop-types'
import moment from 'moment'
// import Discussion from '../../containers/discussion/discussionContainer'
// import NewDiscussion from '../../containers/newDiscussion/newDiscussionContainer'
import Select from 'react-select'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import styles from './projectDetailComponent.scss'
ReactModal.setAppElement('#root')
const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    border: 'none',
    background: 'none',
    transform: 'translate(-50%, -50%)',
    width: '100%'
  }
}
const formatAmount = (x) => {
  let parts = x.toString().split('.')
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
  if (typeof parts[1] !== 'undefined') {
    parts[1] = parts[1].substring(0, 2)
  }
  return parts.join('.')
}
const options = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' }
]

export default function ProjectDetail (props) {
  console.log('Flag', props.setModalOpenStatus)
  console.log('***', props.setDeleteProjectModalStatus)
  console.log('*****', props.entitlementActionSettings)
  console.log('test', props.setEntitlementActionSettings)
  console.log('projectData', props.projectData)
  console.log('projectEntitlements', props.projectEntitlements, props)
  let listPage = ''
  let currentPage = ''
  let nextClass = ''
  let previousClass = ''
  let ProjectName = ''
  let EntitlementCount = ''
  let projectPropertiesList = ''
  let Cost = 0
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
  let projectProperties = props.projectProperties.resources ? [...props.projectProperties.resources] : ''
  let projectPropertiesPayload = {...props.projectPropertiesPayload}
  let copiedProjectProperties = {...props.copiedProjectProperties}
  let copiedProjectData = {...props.copiedProjectData}
  console.log('copiedProjectProperties', copiedProjectProperties, copiedProjectData)
  let projectData = props.projectData
  let updateProjectData = function () {
    let payloadProjectData = JSON.parse(JSON.stringify(props.projectData))
    props.copyProjectProperties({'resources': JSON.parse(JSON.stringify(projectProperties))})
    props.copyProjectData(payloadProjectData)
    props.setEditComponentFlag(true)
  }
  let cancelEditProject = function () {
    let payload = {}
    payload.property = JSON.parse(JSON.stringify(copiedProjectProperties))
    payload.project = JSON.parse(JSON.stringify(copiedProjectData))
    props.restoreProjectProperties(payload)
    props.setEditComponentFlag(false)
  }
  let updateProjectConfirm = function () {
    let entitlementActionSettings = {...props.entitlementActionSettings, 'isConfirmationModalOpen': true}
    props.setEntitlementActionSettings(entitlementActionSettings)
    props.setEditComponentFlag(true)
  }
  let closeConfirmationModal = function (event) {
    event.preventDefault()
    let entitlementActionSettings = {...props.entitlementActionSettings, isConfirmationModalOpen: false}
    props.setEntitlementActionSettings(entitlementActionSettings)
    cancelEditProject()
  }
  let submitUpdates = function (event) {
    event.preventDefault()
    props.setEditComponentFlag(false)
    // eslint-disable-next-line
    mApp.blockPage({overlayColor:'#000000',type:'loader',state:'success',message:'Processing...'})
    let payload = {}
    payload.componentId = props.projectData.resources[0].id
    payload.property = projectPropertiesPayload.property
    payload.project = projectPropertiesPayload.project
    console.log('payload', payload)
    props.updateProjectProperties(payload)
    props.updateProject(payload)
    let entitlementActionSettings = {...props.entitlementActionSettings, isConfirmationModalOpen: false}
    props.setEntitlementActionSettings(entitlementActionSettings)
  }
  let editProjectName = function (event) {
    console.log('edit project name', projectPropertiesPayload)
    let value = event.target.value
    let payload = { 'op': 'replace', 'path': '/name', 'value': value }
    let projectPayload
    if (value === '') {
      projectData.resources[0].nameMessage = true
    } else {
      projectData.resources[0].nameMessage = false
      if (projectPropertiesPayload.project.length === 0) {
        projectPropertiesPayload.project.push(payload)
      } else if (projectPropertiesPayload.project.length === 1) {
        if (projectPropertiesPayload.project[0].path === '/name') {
          projectPropertiesPayload.project[0].value = value
        } else {
          projectPropertiesPayload.project.push(payload)
        }
      } else {
        projectPayload = projectPropertiesPayload.project.map((payload, index) => {
          if (payload.path === '/name') {
            payload.value = value
            return payload
          } else {
            return payload
          }
        })
        projectPropertiesPayload.project = projectPayload
      }
    }
    projectData.resources[0].name = value
    let editPayload = {}
    editPayload.project = projectData
    editPayload.property = {resources: projectProperties}
    props.editComponentProperties(editPayload)
  }
  let handlePropertySelect = function (index, childIndex) {
    return function (newValue: any, actionMeta: any) {
      console.log('value selectesd', newValue)
      if (actionMeta.action === 'select-option') {
        if (newValue !== null) {
          let payload
          let typeProperty = projectProperties[index].properties[childIndex].type_property
          projectProperties[index].properties[childIndex].value_set_value = newValue
          payload = { 'op': 'replace', 'path': `/${typeProperty}/value_set_value`, 'value': {id: newValue.value} }

          if (projectPropertiesPayload.property.length === 0) {
            projectPropertiesPayload.property.push(payload)
          } else {
            if (payload.path === projectPropertiesPayload.property[projectPropertiesPayload.property.length - 1].path) {
              projectPropertiesPayload.property[projectPropertiesPayload.property.length - 1] = payload
            } else {
              projectPropertiesPayload.property.push(payload)
            }
          }
          let editPayload = {}
          editPayload.project = projectData
          editPayload.property = {resources: projectProperties}
          props.editComponentProperties(editPayload)
          props.pushComponentPropertyPayload(projectPropertiesPayload)
        }
      }
      if (actionMeta.action === 'clear') {
        let payload
        let typeProperty = projectProperties[index].properties[childIndex].type_property
        projectProperties[index].properties[childIndex].value_set_value = newValue
        payload = { 'op': 'replace', 'path': `/${typeProperty}/value_set_value`, 'value': newValue }

        if (projectPropertiesPayload.property.length === 0) {
          projectPropertiesPayload.property.push(payload)
        } else {
          if (payload.path === projectPropertiesPayload.property[projectPropertiesPayload.property.length - 1].path) {
            projectPropertiesPayload.property[projectPropertiesPayload.property.length - 1] = payload
          } else {
            projectPropertiesPayload.property.push(payload)
          }
        }
        let editPayload = {}
        editPayload.project = projectData
        editPayload.property = {resources: projectProperties}
        props.editComponentProperties(editPayload)
        props.pushComponentPropertyPayload(projectPropertiesPayload)
      }
    }
  }
  let editDateProperty = function (index, childIndex, value) {
    let payload
    let typeProperty = projectProperties[index].properties[childIndex].type_property
    let selectedDate = value.format('DD MMM YYYY')
    projectProperties[index].properties[childIndex].date_time_value = value.format('DD MMM YYYY')
    payload = { 'op': 'replace', 'path': `/${typeProperty}/date_time_value`, 'value': selectedDate }
    if (projectPropertiesPayload.property.length === 0) {
      projectPropertiesPayload.property.push(payload)
    } else {
      if (payload.path === projectPropertiesPayload.property[projectPropertiesPayload.property.length - 1].path) {
        projectPropertiesPayload.property[projectPropertiesPayload.property.length - 1] = payload
      } else {
        projectPropertiesPayload.property.push(payload)
      }
    }
    let editPayload = {}
    editPayload.project = projectData
    editPayload.property = {resources: projectProperties}
    props.editComponentProperties(editPayload)
    props.pushComponentPropertyPayload(projectPropertiesPayload)
  }
  let editTextProperty = function (index, childIndex, value) {
    let payload
    let typeProperty = projectProperties[index].properties[childIndex].type_property
    if (projectProperties[index].properties[childIndex].property_type.key === 'Boolean') {
      projectProperties[index].properties[childIndex].boolean_value = value
      payload = { 'op': 'replace', 'path': `/${typeProperty}/boolean_value`, 'value': value }
    } else if (projectProperties[index].properties[childIndex].property_type.key === 'Integer') {
      projectProperties[index].properties[childIndex].int_value = value
      payload = { 'op': 'replace', 'path': `/${typeProperty}/int_value`, 'value': value }
    } else if (projectProperties[index].properties[childIndex].property_type.key === 'Decimal') {
      projectProperties[index].properties[childIndex].float_value = value
      payload = { 'op': 'replace', 'path': `/${typeProperty}/float_value`, 'value': value }
    } else if (projectProperties[index].properties[childIndex].property_type.key === 'DateTime') {
      projectProperties[index].properties[childIndex].date_time_value = value
      payload = { 'op': 'replace', 'path': `/${typeProperty}/date_time_value`, 'value': value }
    } else if (projectProperties[index].properties[childIndex].property_type.key === 'Text') {
      projectProperties[index].properties[childIndex].text_value = value
      payload = { 'op': 'replace', 'path': `/${typeProperty}/text_value`, 'value': value }
    } else {
      projectProperties[index].properties[childIndex].other_value = value
      payload = { 'op': 'replace', 'path': `/${typeProperty}/other_value`, 'value': value }
      projectProperties[index].properties[childIndex].showMessage = false
    }
    if (projectPropertiesPayload.property.length === 0) {
      projectPropertiesPayload.property.push(payload)
    } else {
      if (payload.path === projectPropertiesPayload.property[projectPropertiesPayload.property.length - 1].path) {
        projectPropertiesPayload.property[projectPropertiesPayload.property.length - 1] = payload
      } else {
        projectPropertiesPayload.property.push(payload)
      }
    }
    let editPayload = {}
    editPayload.project = projectData
    editPayload.property = {resources: projectProperties}
    props.editComponentProperties(editPayload)
    props.pushComponentPropertyPayload(projectPropertiesPayload)
  }
  let handlePrevious = function (event) {
    // event.preventDefault()
    // if (currentPage === 1) {
    //   previousClass = styles.disabled
    // } else {
    //   let payload = {
    //     'search': searchTextBox.value ? searchTextBox.value : '',
    //     'page_size': props.perPage,
    //     'page': currentPage - 1
    //   }
    //   props.fetchAgreements(payload)
    //   // eslint-disable-next-line
    //   mApp && mApp.block('#projectList', {overlayColor:'#000000',type:'loader',state:'success',message:'Processing...'})
    //   // eslint-disable-next-line
    //   // mApp.blockPage({overlayColor:'#000000',type:'loader',state:'success',message:'Processing...'})
    //   props.setCurrentPage(currentPage - 1)
    // }
    // listPage = _.filter(pageArray, function (group) {
    //   let found = _.filter(group, {'number': currentPage - 1})
    //   if (found.length > 0) { return group }
    // })
  }

  let handleNext = function (event) {
    event.preventDefault()
    // if (currentPage === totalNoPages) {
    //   nextClass = styles.disabled
    // } else {
    //   let payload = {
    //     'search': searchTextBox.value ? searchTextBox.value : '',
    //     'page_size': props.perPage,
    //     'page': currentPage + 1
    //   }
    //   projectsList = ''
    //   props.fetchAgreements(payload)
    //   // eslint-disable-next-line
    //   mApp && mApp.block('#projectList', {overlayColor:'#000000',type:'loader',state:'success',message:'Processing...'})
    //   // eslint-disable-next-line
    //   // mApp.blockPage({overlayColor:'#000000',type:'loader',state:'success',message:'Processing...'})
    //   props.setCurrentPage(currentPage + 1)
    // }
    // listPage = _.filter(pageArray, function (group) {
    //   let found = _.filter(group, {'number': currentPage + 1})
    //   if (found.length > 0) { return group }
    // })
  }
  let handlePage = function (page) {
    // if (page === 1) {
    //   previousClass = 'm-datatable__pager-link--disabled'
    // } else if (page === totalNoPages) {
    //   nextClass = 'm-datatable__pager-link--disabled'
    // }
    // // projectsList = ''
    // let payload = {
    //   'search': searchTextBox.value ? searchTextBox.value : '',
    //   'page_size': props.perPage,
    //   'page': page
    // }
    // props.fetchAgreements(payload)
    // // eslint-disable-next-line
    // mApp && mApp.block('#projectList', {overlayColor:'#000000',type:'loader',state:'success',message:'Processing...'})
    // // eslint-disable-next-line
    // // mApp.blockPage({overlayColor:'#000000',type:'loader',state:'success',message:'Processing...'})
    // props.setCurrentPage(page)

    // listPage = _.filter(pageArray, function (group) {
    //   let found = _.filter(group, {'number': page})
    //   if (found.length > 0) { return group }
    // })
  }
  let openLinkEntitlementModal = function (event) {
    event.preventDefault()
    props.setModalOpenStatus(true)
    console.log('props', props.setModalOpenStatus)
   }
  let openDeleteProjectModal = function (event) {
    event.preventDefault()
    props.setDeleteProjectModalStatus(true)
    console.log('props', props.setDeleteProjectModalStatus)
   }
  let openLinkDeleteModal = function (event) {
    event.preventDefault()
    let entitlementActionSettings = {...props.entitlementActionSettings, 'isLinkDeleteModalOpen': true}
    props.setEntitlementActionSettings(entitlementActionSettings)
  }
  let openLinkUpdateModal = function (event) {
    event.preventDefault()
    let entitlementActionSettings = {...props.entitlementActionSettings, 'isLinkUpdateModalOpen': true}
    props.setEntitlementActionSettings(entitlementActionSettings)
  }
  let closeLinkDeleteModal = function (event) {
    event.preventDefault()
    let entitlementActionSettings = {...props.entitlementActionSettings, 'isLinkDeleteModalOpen': false}
    props.setEntitlementActionSettings(entitlementActionSettings)
  }
  let closeLinkUpdateModal = function (event) {
    event.preventDefault()
    let entitlementActionSettings = {...props.entitlementActionSettings, 'isLinkUpdateModalOpen': false}
    props.setEntitlementActionSettings(entitlementActionSettings)
  }
  let closeModal = function () {
    props.setModalOpenStatus(false)
    props.setDeleteProjectModalStatus(false)
  }
  if (props.projectData !== '' && props.projectData.error_code === null) {
    ProjectName = props.projectData.resources[0].name
    EntitlementCount = props.projectData.resources[0].entitlement_count
    Cost = props.projectData.resources[0].total_license_cost
  }
  if (props.projectProperties && props.projectProperties !== '') {
    projectPropertiesList = props.projectProperties.resources.map(function (property, index) {
      let propertyProperties = property.properties
      let childProperties = propertyProperties.map(function (childProperty, childIndex) {
        let value
        let htmlElement
        // console.log('childProperty', childProperty)
        if (childProperty.property_type.key === 'Integer') {
          value = childProperty.int_value
          htmlElement = function () {
            return (<div className='col-8 form-group m-form__group has-info'>
              <input type='number' className='input-sm form-control m-input' value={value} onChange={(event) => { editTextProperty(index, childIndex, event.target.value) }} placeholder='Enter Here' />
              {false && (<div className='form-control-feedback'>should be Number</div>)}
            </div>)
          }
        } else if (childProperty.property_type.key === 'Decimal') {
          value = childProperty.float_value
          htmlElement = function () {
            return (<div className='col-8 form-group m-form__group has-info'>
              <input type='number' className='input-sm form-control m-input' value={value} onChange={(event) => { editTextProperty(index, childIndex, event.target.value) }} placeholder='Enter Here' />
              {false && (<div className='form-control-feedback'>should be Number</div>)}
            </div>)
          }
        } else if (childProperty.property_type.key === 'DateTime') {
          value = childProperty.date_time_value ? moment(childProperty.date_time_value).format('DD MMM YYYY') : ''
          htmlElement = function () {
            return (<div className='col-8 form-group m-form__group has-info'>
              <DatePicker
                className='input-sm form-control m-input'
                selected={childProperty.date_time_value ? moment(childProperty.date_time_value) : null}
                dateFormat='DD MMM YYYY'
                onSelect={(date) => { editDateProperty(index, childIndex, date) }}
                />
              {/* <input type='text' className='input-sm form-control m-input' value={value} onChange={(event) => { editTextProperty(index, childIndex, event.target.value) }} placeholder='Enter Here' /> */}
              {false && (<div className='form-control-feedback'>should be Date</div>)}
            </div>)
          }
        } else if (childProperty.property_type.key === 'Text') {
          value = childProperty.text_value
          htmlElement = function () {
            return (<div className='col-8 form-group m-form__group has-info'>
              <input type='text' className='input-sm form-control m-input' value={value} onChange={(event) => { editTextProperty(index, childIndex, event.target.value) }} placeholder='Enter Here' />
              {false && (<div className='form-control-feedback'>should be Text</div>)}
            </div>)
          }
        } else if (childProperty.property_type.key === 'List') {
          let childPropertyOption = childProperty.value_set.values.map((option, opIndex) => {
            option.label = option.name
            option.value = option.id
            return option
          })
          console.log('childPropertyOption', childPropertyOption)
          let dvalue = childProperty.value_set_value
          if (childProperty.value_set_value !== null) {
            dvalue.label = childProperty.value_set_value.name
            dvalue.value = childProperty.value_set_value.id
          }
          value = childProperty.value_set_value ? childProperty.value_set_value.name : null
          htmlElement = function () {
            return (<div className='col-8 form-group has-info'><Select
              className='input-sm m-input'
              placeholder='Select Options'
              isClearable
              defaultValue={dvalue}
              onChange={handlePropertySelect(index, childIndex)}
              isSearchable={false}
              name={'selectProperty'}
              options={childPropertyOption}
            /></div>)
          }
        } else {
          value = childProperty.other_value
          htmlElement = function () {
            return (<div className='col-8 form-group m-form__group has-info'>
              <input type='text' className='input-sm form-control m-input' value={value} onChange={(event) => { editTextProperty(index, childIndex, event.target.value) }} placeholder='Enter Here' />
              {false && (<div className='form-control-feedback'>should be Text</div>)}
            </div>)
          }
        }
        return (
          <tr key={'child' + childIndex}>
            <td><span className={styles.labelbold}>{childProperty.name}</span></td>
            <td>
              {!props.isEditComponent && (<span>{value}</span>)}
              {props.isEditComponent && htmlElement()}
            </td>
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
  }
return (
  <div>
    <div className='row'>
      <div className='col-md-7'>
        {!props.isEditComponent && (<h2>{ProjectName}</h2>)}
        {props.isEditComponent && (<div className='col-6 form-group m-form__group has-danger'>
          <input type='text' className='form-control m-input' onChange={editProjectName} value={ProjectName} placeholder='Project Name' aria-describedby='basic-addon2' />
          </div>)}
      </div>
      {!props.isEditComponent && (<div className='col-md-5 float-right'>
        <button type='button' onClick={updateProjectData} className='btn btn-outline-info btn-sm'>Edit Project</button>&nbsp;
        <button type='button' className='btn btn-outline-info btn-sm' onClick={openDeleteProjectModal}>Delete Project</button>&nbsp;
        {/* <button className='btn btn-outline-info btn-sm'>New Discussion</button>&nbsp; */}
      </div>)}
      {props.isEditComponent && (
        <div className='col-md-4' >
          <button onClick={cancelEditProject} className='btn btn-outline-info btn-sm'>Cancel</button>&nbsp;
          <button onClick={updateProjectConfirm} className='btn btn-outline-info btn-sm'>Save</button>&nbsp;
        </div>
      )}
    </div>
    <div className='row' id='entitlementSummary'>
      <div className='col-xl-6'>
        <div className='m-portlet m-portlet--bordered-semi m-portlet--full-height m-portlet--skin-light  m-portlet--rounded-force'>
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
                      <i className='flaticon-file m--font-brand' />
                    </span>
                    <span className='m-widget17__subtitle'>
                      <h3># Entitlements</h3>
                      <h5 style={{'float': 'right', 'paddingRight': '25px', 'marginTop': '-35px'}}>{EntitlementCount}</h5>
                    </span>
                    {/* <span className='m-widget17__desc'>
                      <h1>{softwareCount}</h1>
                    </span> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='col-md-offset-1 col-xl-6'>
        <div className='m-portlet m-portlet--bordered-semi m-portlet--skin-light  m-portlet--rounded-force'>
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
                      <i className='flaticon-coins m--font-brand' />
                    </span>
                    <span className='m-widget17__subtitle'>
                      <h3>Cost</h3>
                      <h5 style={{'float': 'right', 'paddingRight': '25px', 'marginTop': '-35px'}}>{'R ' + formatAmount(Cost)}</h5>
                    </span>
                    {/* <span className='m-widget17__desc'>
                      <h1>{softwareCount}</h1>
                    </span> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <button className='btn btn-outline-info btn-sm'>Add Entitlment</button> */}
    </div>
    <div id=''>
      {/* The table structure begins */}
      <div className='row' style={{'marginTop': '20px'}}>
        <div className='col-md-6 col-sm-12'>
          <div className='m-portlet'>
            <div className='m-portlet__head'>
              <div className='m-portlet__head-caption'>
                <div className='m-portlet__head-title'>
                  <h3 className='m-portlet__head-text'>
                                Properties
                            </h3>
                </div>
              </div>
            </div>
            <div className='m-portlet__body'>
              <table className='table' >{projectPropertiesList}</table>
            </div>
          </div>
        </div>
        <div className='col-md-6 col-sm-12'>
          <div className='m-portlet'>
            <div className='m-portlet__head'>
              <div className='m-portlet__head-caption'>
                <div className='m-portlet__head-title'>
                  <h3 className='m-portlet__head-text'>Entitlements</h3>
                </div>
              </div>
              <div className='m-portlet__head-tools'>
                <button type='button' className='btn btn-outline-info btn-sm' onClick={openLinkEntitlementModal}>Link Entitlement</button>
              </div>
            </div>
            <div className='m-portlet__body'>
              <div className='col-md-12'>
                <div className='m_datatable' id='scrolling_vertical'>
                  <div className='m_datatable m-datatable m-datatable--default m-datatable--loaded m-datatable--scroll' id='scrolling_vertical' style={{}}>
                    <div className=''>
                      <div className='m-portlet'>
                        <div className='m-portlet__body'>
                          <div className='dataTables_scrollBody' style={{position: 'relative', overflow: 'auto', width: '100%', 'maxHeight': '80vh'}}>
                            <table className='m-portlet table table-striped- table-bordered table-hover table-checkable dataTable no-footer' id='m_table_1' aria-describedby='m_table_1_info' role='grid'>
                              <thead>
                                <tr role='row'>
                                  <th className=''><h5>Name</h5></th>
                                  <th className=''><h5># Reserved</h5></th>
                                  <th className=''><h5>Action</h5></th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr role='row'>
                                  <td className=''>HANA</td>
                                  <td className=''>100</td>
                                  <td className=''>
                                    <a href='' className='' onClick={openLinkUpdateModal}>Edit</a>&nbsp;|&nbsp;
                                    <a href='' className='' onClick={openLinkDeleteModal}>Delete</a>
                                  </td>
                                </tr>
                                <tr role='row'>
                                  <td className=''>ARIBA</td>
                                  <td className=''>30</td>
                                  <td className=''>
                                    <a href='' className='' onClick={openLinkUpdateModal}>Edit</a>&nbsp;|&nbsp;
                                    <a href='' className='' onClick={openLinkDeleteModal}>Delete</a>
                                  </td>
                                </tr>
                                <tr role='row'>
                                  <td className=''>Access & Process Control</td>
                                  <td className=''>20</td>
                                  <td className=''>
                                    <a href='' className='' onClick={openLinkUpdateModal}>Edit</a>&nbsp;|&nbsp;
                                    <a href='' className='' onClick={openLinkDeleteModal}>Delete</a>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                          <div className='row'>
                            <div className='col-md-12' id='scrolling_vertical'>
                              <div className='m_datatable m-datatable m-datatable--default m-datatable--loaded m-datatable--scroll pull-right' id='scrolling_vertical' style={{}}>
                                <div className='m-datatable__pager m-datatable--paging-loaded clearfix'>
                                  <ul className='m-datatable__pager-nav'>
                                    <li><a href='' title='Previous' id='m_blockui_1_5' className={'m-datatable__pager-link m-datatable__pager-link--prev ' + previousClass} onClick={handlePrevious} data-page='4'><i className='la la-angle-left' /></a></li>
                                    {listPage[0] && listPage[0].map(function (page, index) {
                                        if (page.number === currentPage) {
                                                page.class = 'm-datatable__pager-link--active'
                                              } else {
                                                page.class = ''
                                              }
                                              return (<li key={index} >
                                                <a href='' className={'m-datatable__pager-link m-datatable__pager-link-number ' + page.class} data-page={page.number} title={page.number} onClick={(event) => { event.preventDefault(); handlePage(page.number) }} >{page.number}</a>
                                              </li>)
                                            })}
                                    <li><a href='' title='Next' className={'m-datatable__pager-link m-datatable__pager-link--next ' + nextClass} onClick={handleNext} data-page='4'><i className='la la-angle-right' /></a></li>
                                  </ul>
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
            </div>
          </div>
        </div>
      </div>
    </div>
    <div>
      <ReactModal isOpen={props.modalIsOpen}
        onRequestClose={closeModal} style={customStyles}
        >
        {/* <button onClick={closeModal} ><i className='la la-close' /></button> */}
        <div className={''}>
          <div className='modal-dialog'>
            <div className='modal-content'>
              <div className='modal-header'>
                <h4 className='modal-title' id='exampleModalLabel'>Link Entitlements</h4>
                <button type='button' onClick={closeModal} className='close' data-dismiss='modal' aria-label='Close'>
                  <span aria-hidden='true'>×</span>
                </button>
              </div>
              <div className='modal-body'>
                <div className='form-group row'>
                  <div className='col-4'><label htmlFor='SelectEntitlement' className='col-form-label'>Select Entitlements</label></div>
                  <div className='col-8'>
                    <Select
                      className='input-sm m-input'
                      placeholder=''
                      isClearable
                      // isOptionDisabled={''}
                      // defaultValue={childPropertyOption[0]}
                      // isDisabled={false}
                      // isLoading={false}
                      // isClearable={true}
                      value={''}
                      // clearValue={() => { return true }}
                      onChange={''}
                      isSearchable={false}
                      options={options}
                    />
                  </div>
                </div>
                <div className='form-group row'>
                  <div className='col-4'><label htmlFor='text' className='form-control-label'>Number of Licenses</label></div>
                  <div className='col-8'><input className='form-control' defaultValue={''} autoComplete='off' required /></div>
                </div>
              </div>
              <div className='modal-footer'>
                {/* <button type='button' className='btn btn-primary'>Save changes</button> */}
                <button type='button' onClick={closeModal} id='m_login_signup' className='btn btn-outline-danger btn-sm' >Close</button>
                <button type='button' id='m_login_signup' className='btn btn-outline-info btn-sm' >Link</button>
              </div>
            </div>
          </div>
        </div>
      </ReactModal>
    </div>
    <div>
      <ReactModal isOpen={props.modalDeleteProjectIsOpen}
        onRequestClose={closeModal} style={customStyles}
        >
        <div className={''}>
          <div className='modal-dialog'>
            <div className='modal-content'>
              <div className='modal-header'>
                <h4 className='modal-title' id='exampleModalLabel'>Delete Project</h4>
                <button type='button' onClick={closeModal} className='close' data-dismiss='modal' aria-label='Close'>
                  <span aria-hidden='true'>×</span>
                </button>
              </div>
              <div className='modal-body'>
                <p>Confirm deletion of project Name</p>
              </div>
              <div className='modal-footer'>
                <button type='button' onClick={closeModal} id='m_login_signup' className='btn btn-outline-danger btn-sm'>Close</button>
                <button type='button' id='m_login_signup' className='btn btn-sm btn-info' >Confirm</button>
              </div>
            </div>
          </div>
        </div>
      </ReactModal>
    </div>
    <div>
      <ReactModal isOpen={props.entitlementActionSettings.isLinkUpdateModalOpen}
        onRequestClose={closeModal}
        className='modal-dialog'
        style={{'content': {'top': '20%'}}}
        >
        {/* <button onClick={closeModal} ><i className='la la-close' /></button> */}
        <div className={''}>
          <div className=''>
            <div className='modal-content'>
              <div className='modal-header'>
                <h4 className='modal-title' id='exampleModalLabel'>Edit Link Entitlement</h4>
                <button type='button' onClick={closeLinkUpdateModal} className='close' data-dismiss='modal' aria-label='Close'>
                  <span aria-hidden='true'>×</span>
                </button>
              </div>
              <div className='modal-body'>
                <div className='form-group row'>
                  <div className='col-4'><label htmlFor='SelectEntitlement' className='col-form-label'>Select Entitlements</label></div>
                  <div className='col-8'>
                    <Select
                      className='input-sm m-input'
                      placeholder=''
                      isClearable
                      // isOptionDisabled={''}
                      // defaultValue={childPropertyOption[0]}
                      // isDisabled={false}
                      // isLoading={false}
                      // isClearable={true}
                      value={''}
                      // clearValue={() => { return true }}
                      onChange={''}
                      isSearchable={false}
                      options={options}
                    />
                  </div>
                </div>
                <div className='form-group row'>
                  <div className='col-4'><label htmlFor='text' className='form-control-label'>Number of Licenses</label></div>
                  <div className='col-8'><input className='form-control' defaultValue={''} autoComplete='off' required /></div>
                </div>
              </div>
              <div className='modal-footer'>
                <button type='button' onClick={closeLinkUpdateModal} className='btn btn-outline-danger btn-sm'>Cancel</button>
                <button className='btn btn-outline-info btn-sm'>Update</button>
              </div>
            </div>
          </div>
        </div>
      </ReactModal>
    </div>
    <div>
      <ReactModal isOpen={props.entitlementActionSettings.isLinkDeleteModalOpen}
        onRequestClose={closeLinkDeleteModal}
        className='modal-dialog'
        style={{'content': {'top': '20%'}}}
        >
        <div className={''}>
          <div className=''>
            <div className='modal-content'>
              <div className='modal-header'>
                <h6 className='modal-title' id='exampleModalLabel'>Delete Link to Entitlement</h6>
                <button type='button' onClick={closeLinkDeleteModal} className='close' data-dismiss='modal' aria-label='Close'>
                  <span aria-hidden='true'>×</span>
                </button>
              </div>
              <div className='modal-body'>
                <p>Confirm deletion of Link to Entitlement Name</p>
              </div>
              <div className='modal-footer'>
                <button type='button' onClick={closeLinkDeleteModal} id='m_login_signup' className={'btn btn-sm btn-outline-info'}>Cancel</button>
                <button type='button' className={'btn btn-sm btn-outline-info'}>Confirm</button>
              </div>
            </div>
          </div>
        </div>
      </ReactModal>
      <ReactModal isOpen={props.entitlementActionSettings.isConfirmationModalOpen}
        style={customStyles} >
        {/* <button onClick={closeModal} ><i className='la la-close' /></button> */}
        <div className={styles.modalwidth}>
          <div className='modal-dialog'>
            <div className='modal-content'>
              <div className='modal-header'>
                <h4 className='modal-title' id='exampleModalLabel'>Confirmation</h4>
              </div>
              <div className='modal-body'>
                <p className={styles.confirmsg}>Some of the required properties do not have any values.</p>
                <p className={styles.confirmsg}>Are you sure you want to continue?</p>
              </div>
              <div className='modal-footer'>
                <button onClick={closeConfirmationModal} className='btn btn-sm btn-outline-info'>Back</button>
                <button onClick={submitUpdates} className='btn btn-sm btn-outline-info'>Submit Updates</button>
              </div>
            </div>
          </div>
        </div>
      </ReactModal>
    </div>
    {/* <Discussion name={'Entitlements'} TypeKey='Entitlement' type='ComponentType' {...props} />
    <NewDiscussion contextId={contextId} name={'Entitlements'} type='ComponentType' {...props} /> */}
  </div>
      )
    }
    ProjectDetail.propTypes = {
      modalIsOpen: PropTypes.any,
      setModalOpenStatus: PropTypes.func,
      modalDeleteProjectIsOpen: PropTypes.any,
      setDeleteProjectModalStatus: PropTypes.func,
      entitlementActionSettings: PropTypes.any,
      setEntitlementActionSettings: PropTypes.func,
      projectData: PropTypes.any,
      projectEntitlements: PropTypes.any,
      projectProperties: PropTypes.any,
      isEditComponent: PropTypes.any,
      projectPropertiesPayload: PropTypes.any,
      copiedProjectProperties: PropTypes.any,
      copiedProjectData: PropTypes.any
      //   setModalOpenStatus: PropTypes.func,
      //   perPage: PropTypes.any
 }
