import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import styles from './agreementsComponent.scss'
import Select from 'react-select'
import moment from 'moment'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import ReactModal from 'react-modal'
import debounce from 'lodash/debounce'
import NewDiscussion from '../../containers/newDiscussion/newDiscussionContainer'
import Discussion from '../../containers/discussion/discussionContainer'
import {defaults, Doughnut} from 'react-chartjs-2'
ReactModal.setAppElement('#root')
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
const customStyles = {
  overlay: {
    zIndex: 1000
  },
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    border: 'none',
    background: 'none',
    transform: 'translate(-50%, -50%)',
    width: '100%',
    zIndex: 2
  }
}

export default function Agreements (props) {
  console.log('test agreement', props)
  let connectionSelectBoxList = ''
  let businessPropertyList = ''
  let agreementsList = ''
  let agreementCount = ''
  let agreementCost = ''
  let expireIn90Days = ''
  let searchTextBox
  let totalNoPages
  let perPage = props.perPage
  let currentPage = props.currentPage
  let messageList = ''
  let nextClass = ''
  let previousClass = ''
  let pageArray = []
  let listPage = []
  let paginationLimit = 6
  let totalAgreement
  let agreementPieChartData = {}
  let contextId = ''
  let appPackage = JSON.parse(localStorage.getItem('packages'))
  let componentTypes = appPackage.resources[0].component_types
  let componentId = _.result(_.find(componentTypes, function (obj) {
      return obj.key === 'Agreement'
  }), 'component_type')
  contextId = componentId
  let editProperty = function (index, value) {
    let connectionData = {...props.connectionData}
    let customerProperty = connectionData.customerProperty
    let propertyType = customerProperty[index].type_property.property_type
    if (propertyType.key === 'Boolean') {
      customerProperty[index].type_property.boolean_value = value
    } else if (propertyType.key === 'Integer') {
      customerProperty[index].type_property.int_value = value
    } else if (propertyType.key === 'Decimal') {
      customerProperty[index].type_property.float_value = value
    } else if (propertyType.key === 'DateTime') {
      customerProperty[index].type_property.date_time_value = value.format('DD MMM YYYY')
    } else if (propertyType.key === 'Text') {
      customerProperty[index].type_property.text_value = value
    } else {
      customerProperty[index].type_property.other_value = value
    }
    connectionData.customerProperty = customerProperty
    props.setConnectionData(connectionData)
  }
  let handlePropertySelect = function (index) {
    return function (newValue: any, actionMeta: any) {
      console.log('newValue', newValue)
      console.log('actionMeta', actionMeta)
      let connectionData = JSON.parse(JSON.stringify(props.connectionData))
      let customerProperty = connectionData.customerProperty
      if (actionMeta.action === 'select-option') {
        customerProperty[index].type_property.value_set_value = newValue
      }
      if (actionMeta.action === 'clear') {
        customerProperty[index].type_property.value_set_value = newValue
      }
      connectionData.customerProperty = customerProperty
      props.setConnectionData(connectionData)
    }
  }
  let handleSelectChange = function (index) {
    return function (newValue: any, actionMeta: any) {
      console.log('newValue', newValue)
      console.log('actionMeta', actionMeta)
      console.log('index', index)
      let connectionData = {...props.connectionData}
      let selectedValues = connectionData.selectedValues
      if (actionMeta.action === 'select-option' || actionMeta.action === 'remove-value') {
        selectedValues[index] = newValue
        connectionData.selectedValues = selectedValues
        props.setConnectionData(connectionData)
      }
      if (actionMeta.action === 'clear') {
        selectedValues[index] = null
        connectionData.selectedValues = selectedValues
        props.setConnectionData(connectionData)
      }
    }
  }
  let openDiscussionModal = function (event) {
    event.preventDefault()
    props.setDiscussionModalOpenStatus(true)
  }
  // Code for add new agreement
  let newAgreementName = ''
  let newAgreementDescription = ''
  let openAddAgreementModal = function () {
    let addAgreementSettings = {...props.addAgreementSettings, isAddModalOpen: true}
    props.setAddAgreementSettings(addAgreementSettings)
    let connectionData = {...props.connectionData}
    let selectedValues = []
    connectionData.selectedValues.forEach(function (data) {
      selectedValues.push(null)
    })
    let resetCustomerProperty = connectionData.customerProperty.map(function (data, index) {
      if (data.type_property.property_type.key === 'Boolean') {
        data.type_property.boolean_value = null
      } else if (data.type_property.property_type.key === 'Integer') {
        data.type_property.int_value = null
      } else if (data.type_property.property_type.key === 'Decimal') {
        data.type_property.float_value = null
      } else if (data.type_property.property_type.key === 'DateTime') {
        data.type_property.date_time_value = null
      } else if (data.type_property.property_type.key === 'Text') {
        data.type_property.text_value = null
      } else if (data.type_property.property_type.key === 'List') {
        data.type_property.value_set_value = null
      } else {
        data.type_property.other_value = null
      }
      return data
    })
    connectionData.selectedValues = selectedValues
    connectionData.customerProperty = resetCustomerProperty
    props.setConnectionData(connectionData)
  }
  let createNewAgreement = function () {
    // eslint-disable-next-line
    mApp.blockPage({overlayColor:'#000000',type:'loader',state:'success',message:'Processing...'})
    let appPackage = JSON.parse(localStorage.getItem('packages'))
    let perspectives = appPackage.resources[0].perspectives
    let perspectiveObj = _.find(perspectives, function (obj) {
      return (obj.key === 'Agreement_Create' && obj.role_key === 'Create')
    })
    // let payload = {
    //   'component_type': {
    //     'id': componentTypeId
    //   },
    //   'name': newAgreementName.value,
    //   'description': newAgreementDescription.value
    // }
    let patchPayload = []
    let obj = {}
    obj.op = 'add'
    obj.path = '/-'
    obj.value = {}
    obj.value.parts = []
    obj.value.parts[0] = {'value': newAgreementName.value}
    obj.value.parts[1] = {'value': newAgreementDescription.value}
    let connectionData = {...props.connectionData}
    connectionData.selectedValues.forEach(function (data, index) {
      if (Array.isArray(data)) {
        if (data.length > 0) {
          let connections = []
          data.forEach(function (selectedValue, ix) {
            let obj = {}
            obj.target_id = selectedValue.id
            connections.push(obj)
          })
          obj.value.parts[connectionData.data[index].partIndex] = {'value': connections}
        } else {
          obj.value.parts[connectionData.data[index].partIndex] = {}
        }
      } else {
        if (data) {
          let connections = []
          let obj = {}
          obj.target_id = data.id
          connections.push(obj)
          obj.value.parts[connectionData.data[index].partIndex] = {'value': connections}
        } else {
          obj.value.parts[connectionData.data[index].partIndex] = {}
        }
      }
    })
    connectionData.customerProperty.forEach(function (data, index) {
      if (data.type_property.property_type.key === 'Boolean') {
        obj.value.parts[data.partIndex] = {value: {'boolean_value': data.type_property.boolean_value}}
      } else if (data.type_property.property_type.key === 'Integer') {
        obj.value.parts[data.partIndex] = {value: {'int_value': data.type_property.int_value}}
      } else if (data.type_property.property_type.key === 'Decimal') {
        obj.value.parts[data.partIndex] = {value: {'float_value': data.type_property.float_value}}
      } else if (data.type_property.property_type.key === 'DateTime') {
        obj.value.parts[data.partIndex] = {value: {'date_time_value': data.type_property.date_time_value}}
      } else if (data.type_property.property_type.key === 'Text') {
        obj.value.parts[data.partIndex] = {value: {'text_value': data.type_property.text_value}}
      } else if (data.type_property.property_type.key === 'List') {
        obj.value.parts[data.partIndex] = {value: {'value_set_value_id': data.type_property.value_set_value ? data.type_property.value_set_value.id : null}}
      } else {
        obj.value.parts[data.partIndex] = {value: {'other_value': data.type_property.other_value}}
      }
    })
    patchPayload.push(obj)
    let payload = {}
    payload.queryString = {}
    payload.queryString.meta_model_perspective_id = props.metaModelPerspective.resources[0].id
    payload.queryString.apply_changes = true
    payload.queryString.view_key = perspectiveObj.view_key
    payload.data = {}
    payload.data[perspectiveObj.perspective] = patchPayload
    console.log('payload', payload)
    props.updateModelPrespectives(payload)
    // props.addAgreement(payload)
    // closeAddModal()
  }
  let closeAddModal = function () {
    let addAgreementSettings = {...props.addAgreementSettings, isAddModalOpen: false, createResponse: null}
    props.setAddAgreementSettings(addAgreementSettings)
  }
  // End code for add new agreement
  let handleBlurdropdownChange = function (event) {
    console.log('handle Blur change', event.target.value)
  }
  let handledropdownChange = function (event) {
    console.log('handle change', event.target.value, typeof event.target.value)
    props.setPerPage(parseInt(event.target.value))
  }
  if (props.agreementsSummary && props.agreementsSummary !== '') {
    agreementCount = props.agreementsSummary.resources[0].agreement_count
    agreementCost = props.agreementsSummary.resources[0].cost
    expireIn90Days = props.agreementsSummary.resources[0].expire_in_90_days
    let costByAgreementType = props.agreementsSummary.resources[0].cost_by_agreement_type
    let labels = []
    let agreementPieData = []
    let colorData = []
    let datasetAgreementObject = {}
    let idx = 0
    for (let keyField in costByAgreementType) {
      if (costByAgreementType.hasOwnProperty(keyField)) {
        labels.push(keyField)
        agreementPieData.push(costByAgreementType[keyField])
        colorData.push(doughnutColor[idx++])
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

  if (props.agreements && props.agreements !== '') {
    let todayDate = moment()
    let sortedArray = _.orderBy(props.agreements.resources, ['name'], ['asc'])
    agreementsList = sortedArray.map(function (data, index) {
    let tdBlock = []
    let notificationPeriod = data.notification_period === null ? 90 : parseInt(data.notification_period)
    if (moment(data.expiry_date).subtract(notificationPeriod, 'd') > (todayDate)) {
      tdBlock.push(<td><span className={styles.badge_success}>{data.expiry_date ? moment(data.expiry_date).format('DD MMM YYYY') : ''}</span></td>)
    } else if ((moment(data.expiry_date).subtract(notificationPeriod, 'd') < todayDate) && (moment(data.expiry_date) > todayDate)) {
      tdBlock.push(<td><span className={styles.badge_proccess}>{data.expiry_date ? moment(data.expiry_date).format('DD MMM YYYY') : ''}</span></td>)
    } else if ((moment(data.expiry_date) < todayDate)) {
      tdBlock.push(<td><span className={styles.badge_danger}>{data.expiry_date ? moment(data.expiry_date).format('DD MMM YYYY') : ''}</span></td>)
    } else {
      tdBlock.push(<td className={''}>{data.expiry_date ? moment(data.expiry_date).format('DD MMM YYYY') : ''}</td>)
    }
      return (
        <tr key={index}>
          <td><a href={'/agreements/' + data.id} >{data.name}</a></td>
          <td>{data.supplier}</td>
          {tdBlock}
          <td>{data.entitlement_count}</td>
          <td>{'R ' + formatAmount(data.cost)}</td>
        </tr>
      )
    })

    totalAgreement = props.agreements.total_count
    totalNoPages = Math.ceil(totalAgreement / perPage)

    if (currentPage === 1) {
      previousClass = 'm-datatable__pager-link--disabled'
    }
    if (currentPage === totalNoPages) {
      nextClass = 'm-datatable__pager-link--disabled'
    }
    let i = 1
    while (i <= totalNoPages) {
      let pageParameter = {}
      pageParameter.number = i
      pageParameter.class = ''
      pageArray.push(pageParameter)
      i++
    }
    pageArray = _.chunk(pageArray, paginationLimit)
    listPage = _.filter(pageArray, function (group) {
      let found = _.filter(group, {'number': currentPage})
      if (found.length > 0) { return group }
    })
  }

  let handleInputChange = debounce((e) => {
    console.log(e)
    if (searchTextBox) {
      const value = searchTextBox.value
      agreementsList = ''
      props.setCurrentPage(1)
      let payload = {
        'search': value || '',
        'page_size': props.perPage,
        'page': currentPage
      }
      props.fetchAgreements(payload)
      // eslint-disable-next-line
      mApp && mApp.block('#agreementList', {overlayColor:'#000000',type:'loader',state:'success',message:'Processing...'})
      // eslint-disable-next-line
      // mApp.blockPage({overlayColor:'#000000',type:'loader',state:'success',message:'Processing...'})
      listPage = _.filter(pageArray, function (group) {
        let found = _.filter(group, {'number': currentPage})
        if (found.length > 0) { return group }
      })
    }
  }, 500)

  let handlePrevious = function (event) {
    event.preventDefault()
    if (currentPage === 1) {
      previousClass = styles.disabled
    } else {
      let payload = {
        'search': searchTextBox.value ? searchTextBox.value : '',
        'page_size': props.perPage,
        'page': currentPage - 1
      }
      props.fetchAgreements(payload)
      // eslint-disable-next-line
      mApp && mApp.block('#agreementList', {overlayColor:'#000000',type:'loader',state:'success',message:'Processing...'})
      // eslint-disable-next-line
      // mApp.blockPage({overlayColor:'#000000',type:'loader',state:'success',message:'Processing...'})
      props.setCurrentPage(currentPage - 1)
    }
    listPage = _.filter(pageArray, function (group) {
      let found = _.filter(group, {'number': currentPage - 1})
      if (found.length > 0) { return group }
    })
  }

  let handleNext = function (event) {
    event.preventDefault()
    if (currentPage === totalNoPages) {
      nextClass = styles.disabled
    } else {
      let payload = {
        'search': searchTextBox.value ? searchTextBox.value : '',
        'page_size': props.perPage,
        'page': currentPage + 1
      }
      agreementsList = ''
      props.fetchAgreements(payload)
      // eslint-disable-next-line
      mApp && mApp.block('#agreementList', {overlayColor:'#000000',type:'loader',state:'success',message:'Processing...'})
      // eslint-disable-next-line
      // mApp.blockPage({overlayColor:'#000000',type:'loader',state:'success',message:'Processing...'})
      props.setCurrentPage(currentPage + 1)
    }
    listPage = _.filter(pageArray, function (group) {
      let found = _.filter(group, {'number': currentPage + 1})
      if (found.length > 0) { return group }
    })
  }
  let handlePage = function (page) {
    if (page === 1) {
      previousClass = 'm-datatable__pager-link--disabled'
    } else if (page === totalNoPages) {
      nextClass = 'm-datatable__pager-link--disabled'
    }
    // agreementsList = ''
    let payload = {
      'search': searchTextBox.value ? searchTextBox.value : '',
      'page_size': props.perPage,
      'page': page
    }
    props.fetchAgreements(payload)
    // eslint-disable-next-line
    mApp && mApp.block('#agreementList', {overlayColor:'#000000',type:'loader',state:'success',message:'Processing...'})
    // eslint-disable-next-line
    // mApp.blockPage({overlayColor:'#000000',type:'loader',state:'success',message:'Processing...'})
    props.setCurrentPage(page)

    listPage = _.filter(pageArray, function (group) {
      let found = _.filter(group, {'number': page})
      if (found.length > 0) { return group }
    })
  }
  if (props.connectionData !== '' && props.connectionData.operation.isComplete) {
    // eslint-disable-next-line
    mApp && mApp.unblockPage()
    let connectionData = {...props.connectionData}
    connectionSelectBoxList = connectionData.data.map(function (data, index) {
      let selectOptions = connectionData.selectOption[index].map(function (component, id) {
        component.value = component.id
        component.label = component.name
        return component
      })
      return (<div className='form-group row'>
        <div className='col-2'><label htmlFor='Category' className='col-form-label'>{data.name}</label></div>
        <div className='col-8'>
          <Select
            className='input-sm m-input'
            placeholder={'Select ' + data.name}
            isMulti={data.max !== 1}
            isClearable
            value={connectionData.selectedValues[index]}
            onChange={handleSelectChange(index)}
            options={selectOptions}
            />
        </div>
      </div>)
    })
    businessPropertyList = connectionData.customerProperty.map(function (data, index) {
      let value = null
      if (data.type_property.property_type.key === 'Integer') {
        value = data.type_property.int_value
        return (<div className='form-group row'>
          <div className='col-2'><label htmlFor='Category' className='col-form-label'>{data.name}</label></div>
          <div className='col-8 form-group m-form__group has-info'>
            <input type='number' className='input-sm form-control m-input' value={value} onChange={(event) => { editProperty(index, event.target.value) }} placeholder='Enter Here' />
            {false && (<div className='form-control-feedback'>should be Number</div>)}
          </div>
        </div>)
      } else if (data.type_property.property_type.key === 'Decimal') {
        value = data.type_property.float_value
        return (<div className='form-group row'>
          <div className='col-2'><label htmlFor='Category' className='col-form-label'>{data.name}</label></div>
          <div className='col-8 form-group m-form__group has-info'>
            <input type='number' className='input-sm form-control m-input' value={value} onChange={(event) => { editProperty(index, event.target.value) }} placeholder='Enter Here' />
            {false && (<div className='form-control-feedback'>should be Number</div>)}
          </div>
        </div>)
      } else if (data.type_property.property_type.key === 'DateTime') {
        value = data.type_property.date_time_value ? moment(data.type_property.date_time_value).format('DD MMM YYYY') : ''
        return (<div className='form-group row'>
          <div className='col-2'><label htmlFor='Category' className='col-form-label'>{data.name}</label></div>
          <div className='col-8 form-group m-form__group has-info'>
            <DatePicker
              className='input-sm form-control m-input'
              selected={data.type_property.date_time_value ? moment(data.type_property.date_time_value) : ''}
              dateFormat='DD MMM YYYY'
              onSelect={(date) => { editProperty(index, date) }}
              />
            {/* <input type='text' className='input-sm form-control m-input' value={value} onChange={(event) => { editTextProperty(index, childIndex, event.target.value) }} placeholder='Enter Here' /> */}
            {false && (<div className='form-control-feedback'>should be Date</div>)}
          </div>
        </div>)
      } else if (data.type_property.property_type.key === 'Text') {
        value = data.type_property.text_value
        return (<div className='form-group row'>
          <div className='col-2'><label htmlFor='Category' className='col-form-label'>{data.name}</label></div>
          <div className='col-8 form-group m-form__group has-info'>
            <input type='text' className='input-sm form-control m-input' value={value} onChange={(event) => { editProperty(index, event.target.value) }} placeholder='Enter Here' />
            {false && (<div className='form-control-feedback'>should be Text</div>)}
          </div>
        </div>)
      } else if (data.type_property.property_type.key === 'List') {
        let propertyOption = data.type_property.value_set.values.map((option, opIndex) => {
          option.label = option.name
          option.value = option.id
          return option
        })
        let dvalue = data.type_property.value_set_value
        if (data.type_property.value_set_value !== null) {
          dvalue.label = data.type_property.value_set_value.name
          dvalue.value = data.type_property.value_set_value.id
        }
        value = data.type_property.value_set_value ? data.type_property.value_set_value.name : null
        return (<div className='form-group row'>
          <div className='col-2'><label htmlFor='Category' className='col-form-label'>{data.name}</label></div>
          <Select
            className='col-8 input-sm m-input'
            placeholder='Select Options'
            isClearable
            defaultValue={dvalue}
            onChange={handlePropertySelect(index)}
            isSearchable={false}
            name={'selectProperty'}
            options={propertyOption}
          />
        </div>)
      } else {
        value = data.type_property.other_value
        return (<div className='form-group row'>
          <div className='col-2'><label htmlFor='Category' className='col-form-label'>{data.name}</label></div>
          <div className='col-8 form-group m-form__group has-info'>
            <input type='text' className='input-sm form-control m-input' value={value} onChange={(event) => { editProperty(index, event.target.value) }} placeholder='Enter Here' />
            {true && (<div className='form-control-feedback'>should be Text</div>)}
          </div>
        </div>)
      }
    })
  }
  if (props.addAgreementSettings.createResponse !== null) {
    if (props.addAgreementSettings.createResponse.length > 0) {
      messageList = props.addAgreementSettings.createResponse.map(function (data, index) {
        if (data.error_code === null) {
          if (data.message != null) {
            return (<li className='m-list-search__result-item' key={index}>{data.message}</li>)
          } else {
            if (props.addAgreementSettings.createResponse.length === 1) {
              return (<li className='m-list-search__result-item' key={99}>{'No data has been added.'}</li>)
            }
          }
        } else {
          return (<li className='m-list-search__result-item' key={index}>{'Error Code: ' + data.error_code + 'Message: ' + data.error_message}</li>)
        }
      })
    } else {
      messageList = []
      messageList.push((
        <li key={0}>{'No data has been added.'}</li>
      ))
    }
  }
    return (
      <div>
        <div className='row'>
          <div className='col-md-9'>
            <h2>Agreements</h2>
          </div>
          <div className='col-md-3 float-right'>
            <span className='pull-right'>
              <a href='javascript:void(0);' data-skin='light' data-toggle='m-tooltip' data-placement='top' data-original-title='Add Agreement' onClick={openAddAgreementModal} className='btn btn-info m-btn m-btn--icon btn-sm m-btn--icon-only  m-btn--pill m-btn--air'>
                <i className='fa flaticon-plus fa-2x' />
              </a>&nbsp;&nbsp;
              <a href='javascript:void(0);' data-skin='light' data-toggle='m-tooltip' data-placement='top' data-original-title='Initiate Discussion' onClick={openDiscussionModal} className='btn btn-info m-btn m-btn--icon btn-sm m-btn--icon-only  m-btn--pill m-btn--air'>
                <i className='fa flaticon-multimedia-3 fa-2x' />
              </a>
            </span>
            {/* <button onClick={openAddAgreementModal} className='btn btn-outline-info btn-sm'>Add Agreement</button>&nbsp;
            <button onClick={openDiscussionModal} className='btn btn-outline-info btn-sm'>Create Discussion</button>&nbsp; */}
          </div>
        </div>
        <br />
        <div className='row' id='agreementSummary'>
          <div className='col-md-4'>
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
                          <i className='flaticon-truck m--font-brand' />
                        </span>
                        <span className='m-widget17__subtitle'>
                          <h3>Agreements&nbsp;&nbsp;&nbsp;</h3>
                          <h4 style={{'float': 'right', 'paddingRight': '25px', 'marginTop': '-35px'}}>{agreementCount}</h4>
                        </span>
                        <span className='m-widget17__desc'>
                          <h5>R {formatAmount(agreementCost)}</h5>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='col-md-4'>
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
                          <i className='flaticon-calendar-1 m--font-brand' />
                        </span>
                        <span className='m-widget17__subtitle'>
                          <h3>Expiry in 90 days</h3>
                        </span>
                        <span className='m-widget17__desc'>
                          <h5>{expireIn90Days}</h5>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='col-md-4'>
            <div className='m-portlet m-portlet--head-overlay m-portlet--full-height  m-portlet--rounded-force'>
              <div className='m-portlet__body'>
                <div className='m-widget27 m-portlet-fit--sides' >
                  <div className='m-widget27__container' >
                    <div className='m-widget27__tab tab-content m-widget27--no-padding' >
                      <br />
                      <div className='row  align-items-center'>
                        <div className='col'>
                          <div className='m-widget14__legends' >
                            <div className='m-widget14__legend' >
                              <span className='m-widget14__legend-text'><h5>Cost per agreement type</h5></span>
                            </div>
                          </div>
                        </div>
                        <div className='col'>
                          <div id='m_chart_personal_income_quater_1' className='m-widget27__chart' style={{'height': '150px'}}>
                            <Doughnut data={agreementPieChartData}
                                // width={280}
                              options={{
                                responsive: true,
                                tooltips: {
                                  callbacks: {
                                    label: function (tooltipItem) {
                                        return agreementPieChartData.labels[tooltipItem.index] + ': R ' + formatAmount(agreementPieChartData.datasets[0].data[tooltipItem.index])
                                    }
                                  }
                                }
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
          </div>
        </div>
        <div id='agreementList'>
          {/* The table structure begins */}
          <div className='row' style={{'marginTop': '20px'}}>
            <div className='col-md-12'>
              <div className='m_datatable' id='scrolling_vertical'>
                <div className='m_datatable m-datatable m-datatable--default m-datatable--loaded m-datatable--scroll' id='scrolling_vertical' style={{}}>
                  <div >
                    <div className='m-portlet'>
                      <div className='m-portlet__body'>
                        <div id='m_table_1_wrapper' className='dataTables_wrapper dt-bootstrap4'>
                          <div className='row' style={{'marginBottom': '20px'}}>
                            <div className='col-sm-12 col-md-6'>
                              <div className='dataTables_length' id='m_table_1_length' style={{'display': 'flex'}}>
                                <h5 style={{'margin': '8px'}}>Show</h5>
                                <select value={props.perPage} onBlur={handleBlurdropdownChange} onChange={handledropdownChange} name='m_table_1_length' aria-controls='m_table_1' className='custom-select custom-select-sm form-control form-control-sm' style={{'height': '40px'}}>
                                  <option value={10}>10</option>
                                  <option value={25}>25</option>
                                  <option value={50}>50</option>
                                  <option value={100}>100</option>
                                </select>
                                <h5 style={{'margin': '8px'}}>Entries</h5>
                                {/* </label> */}
                              </div>
                            </div>
                            <div className='col-sm-12 col-md-6'>
                              <div className='dataTables_length pull-right' id='m_table_1_length' style={{'display': 'flex'}}>
                                <div style={{'display': 'flex'}}>
                                  <h5 style={{'margin': '10px'}}>Search</h5>
                                  <div className='m-input-icon m-input-icon--left'>
                                    <input type='text' className='form-control m-input' placeholder='Search...' id='generalSearch' ref={input => (searchTextBox = input)} onKeyUp={handleInputChange} />
                                    <span className='m-input-icon__icon m-input-icon__icon--left'>
                                      <span>
                                        <i className='la la-search' />
                                      </span>
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className='dataTables_scrollBody' style={{position: 'relative', overflow: 'auto', width: '100%', 'maxHeight': '80vh'}}>
                          <table className='m-portlet table table-striped- table-bordered table-hover table-checkable dataTable no-footer' id='m_table_1' aria-describedby='m_table_1_info' role='grid'>
                            <thead>
                              <tr role='row'>
                                <th className=''><h5># Agreements</h5></th>
                                <th className=''><h5>Supplier</h5></th>
                                <th className=''><h5>Expiry Date</h5></th>
                                <th className=''><h5># Entitlements</h5></th>
                                <th className=''><h5>Cost</h5></th>
                              </tr>
                            </thead>
                            <tbody>
                              {agreementsList}
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
        <div>
          <ReactModal isOpen={props.addAgreementSettings.isAddModalOpen}
            onRequestClose={closeAddModal}
            style={customStyles}
            >
            {/* <button onClick={closeModal} ><i className='la la-close' /></button> */}
            <div className={''}>
              <div className=''>
                <div className='modal-content'>
                  <div className='modal-header'>
                    {props.addAgreementSettings.createResponse === null && (<h4 className='modal-title' id='exampleModalLabel'>New Agreement</h4>)}
                    {props.addAgreementSettings.createResponse !== null && (<h4 className='modal-title' id='exampleModalLabel'>Create Report</h4>)}
                    <button type='button' onClick={closeAddModal} className='close' data-dismiss='modal' aria-label='Close'>
                      <span aria-hidden='true'>×</span>
                    </button>
                  </div>
                  <div className='modal-body' style={{'height': 'calc(70vh - 30px)', 'overflow': 'auto'}}>
                    {props.addAgreementSettings.createResponse === null && (<div className='col-md-12'>
                      {/* {messageBlock} */}
                      <div className='form-group m-form__group row'>
                        <div className='col-8'>
                          {/* <input className='form-control m-input' type='email' placeholder='Enter User Name' ref={input => (userName = input)} id='example-userName-input' /> */}
                        </div>
                      </div>
                      <div className='form-group m-form__group row'>
                        <label htmlFor='example-input' className='col-2 col-form-label'>Name</label>
                        <div className='col-8'>
                          <input className='form-control m-input' ref={input => (newAgreementName = input)} placeholder='Enter Name' id='example-email-input' autoComplete='off' required />
                        </div>
                      </div>
                      <div className='form-group m-form__group row'>
                        <label htmlFor='example-input' className='col-2 col-form-label'>Description</label>
                        <div className='col-8'>
                          <textarea className='form-control m-input' ref={textarea => (newAgreementDescription = textarea)} defaultValue={''} placeholder='Enter Description' autoComplete='off' required />
                        </div>
                      </div>
                      {businessPropertyList}
                      {connectionSelectBoxList}
                    </div>)}
                    {props.addAgreementSettings.createResponse !== null && (<div className='m-list-search__results'>
                      {messageList}
                    </div>)}
                  </div>
                  <div className='modal-footer'>
                    <div className='row'>
                      <div className='col-md-6t' />
                      <div className='col-md-6'>
                        {props.addAgreementSettings.createResponse === null && (<div className='btn-group m-btn-group m-btn-group--pill ' role='group' aria-label='...'>
                          <button type='button' onClick={closeAddModal} className='m-btn btn btn-secondary'>Back</button>
                          <button type='button' onClick={createNewAgreement} className='m-btn btn btn-secondary'>Add</button>
                        </div>)}
                        {props.addAgreementSettings.createResponse !== null && (<button type='button' onClick={closeAddModal} className='m-btn btn btn-secondary'>Close</button>)}
                      </div>
                    </div>
                    {/* <button type='button' className='btn btn-primary'>Save changes</button> */}
                    {/* <button onClick={createNewAgreement} className='btn btn-sm btn-info ' >Add { '' }</button> */}
                  </div>
                </div>
              </div>
            </div>
          </ReactModal>
        </div>
        <Discussion name={'Agreements'} TypeKey='Agreement' type='ComponentType' {...props} />
        <NewDiscussion contextId={contextId} name={'Agreements'} type='ComponentType' {...props} />
      </div>
      )
    }
    Agreements.propTypes = {
    agreements: PropTypes.any,
    agreementsSummary: PropTypes.any,
    currentPage: PropTypes.any,
    addAgreementSettings: PropTypes.any,
    perPage: PropTypes.any,
    connectionData: PropTypes.any
 }
