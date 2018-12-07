import React from 'react'
import _ from 'lodash'
import debounce from 'lodash/debounce'
import XLSX from 'xlsx'
import { saveAs } from 'file-saver'
import ReactModal from 'react-modal'
import { createPatch } from 'rfc6902'
import PropTypes from 'prop-types'
import Select from 'react-select'
import styles from './sheetsComponent.scss'
ReactModal.setAppElement('#root')

export default function Sheets (props) {
  console.log(props)
  let searchTextBox
  let perPage = props.perPage
  let currentPage = props.currentPage
  let nextClass = ''
  let previousClass = ''
  let pageArray = []
  let listPage = []
  let paginationLimit = 6
  let modelPrespectivesList = ''
  let totalPages
  let tableHeader = []
  let labels = []
  let disabledClass = ''
  let handleBlurdropdownChange = function (event) {
    console.log('handle Blur change', event.target.value)
  }
  let handledropdownChange = function (event) {
    console.log('handle change', event.target.value, typeof event.target.value)
    props.setPerPage(parseInt(event.target.value))
  }
  let openExportModal = function () {
    let modalSettings = {...props.modalSettings, 'isExportModalOpen': true, 'enterFileName': ''}
    props.setModalSetting(modalSettings)
  }
  let openImportModal = function () {
    let modalSettings = {...props.modalSettings, 'isImportModalOpen': true}
    props.setModalSetting(modalSettings)
  }
  let handleInputName = function (event) {
    let value = event.target.value
    if (value.trim() !== '') {
      let modalSettings = {...props.modalSettings, 'enterFileName': value, 'exportValidationClass': 'form-group m-form__group row'}
      props.setModalSetting(modalSettings)
    } else {
      let modalSettings = {...props.modalSettings, 'enterFileName': value}
      props.setModalSetting(modalSettings)
    }
  }
  let handleFile = function (e) {
    let modalSettings = {...props.modalSettings, 'isFileLoading': true}
    props.setModalSetting(modalSettings)
    let files = e.target.files
    let i, f
    for (i = 0, f = files[i]; i !== files.length; ++i) {
      let reader = new FileReader()
      // var name = f.name
      reader.onload = function (e) {
        var bstr = e.target.result
        var workbook = XLSX.read(bstr, {type: 'binary'})
        // Get first worksheet
        const workSheetName = workbook.SheetNames[0]
        const workSheet = workbook.Sheets[workSheetName]
        // Convert array of arrays
        const data = XLSX.utils.sheet_to_json(workSheet, {header: 1})
        // Update state
        console.log('Data>>>', data)
        let columnParts = props.metaModelPerspective.resources[0].parts
        let columnLength = columnParts.length
        let fileData = []
        let columnRow = data.shift()
        data.forEach(function (value, index) {
          let obj = {}
          for (let i = 0; i < columnLength; i++) {
            obj[columnParts[i].name.toLowerCase().trim().replace(/ /g, '_')] = value[i] || ''
          }
          fileData.push(obj)
        })
        console.log('fileData', fileData)
        modalSettings = {...props.modalSettings, 'isFileLoading': false, 'fileData': fileData, 'columnRow': columnRow}
        props.setModalSetting(modalSettings)
      }
      reader.readAsBinaryString(f)
    }
  }
  if (props.modalSettings.selectedMetaModel) {
    disabledClass = ''
  } else {
    disabledClass = styles.disabled
  }
  if (props.modelPrespectives !== '') {
    if (props.modalSettings.isFileLoading) {
      // eslint-disable-next-line
      mApp.blockPage({overlayColor:'#000000',type:'loader',state:'success',message:'Processing...'})
    } else {
      // eslint-disable-next-line
      mApp && mApp.unblockPage()
    }
    if ((props.modalSettings.isImportModalOpen || props.modalSettings.isExportModalOpen) && props.modalSettings.apiData.length === 0) {
      // eslint-disable-next-line
      mApp && mApp.blockPage({overlayColor:'#000000',type:'loader',state:'success',message:'Processing...'})
      let data = []
      props.modelPrespectives.forEach(function (modelPrespective, index) {
        console.log(index)
        let obj = {}
        let labelParts = props.metaModelPerspective.resources[0].parts
        if (modelPrespective.parts) {
          modelPrespective.parts.forEach(function (partData, ix) {
            let value = ''
            if (labelParts[ix].type_property === null) {
              value = partData.value.constructor === Array ? '' : partData.value || ''
            } else if (labelParts[ix].type_property === 'Integer') {
              value = partData.value.int_value || ''
            } else if (labelParts[ix].type_property === 'Decimal') {
              value = partData.value.float_value || ''
            } else if (labelParts[ix].type_property === 'Text') {
              value = partData.value.text_value || ''
            } else if (labelParts[ix].type_property === 'DateTime') {
              value = partData.value.date_time_value || ''
            } else if (labelParts[ix].type_property === 'Boolean') {
              value = partData.value.boolean_value || ''
            } else if (labelParts[ix].type_property === 'List') {
              value = partData.value.value_set_value || ''
            } else {
              value = partData.value.other_value || ''
            }
            obj[labelParts[ix].name.toLowerCase().trim().replace(/ /g, '_')] = value
          })
        }
        data.push(obj)
      })
      let modalSettings = {...props.modalSettings, 'apiData': data}
      props.setModalSetting(modalSettings)
      // eslint-disable-next-line
      mApp && mApp.unblockPage()
    }
  }
  let closeModal = function () {
    let modalSettings = {...props.modalSettings, 'isExportModalOpen': false, 'isImportModalOpen': false}
    props.setModalSetting(modalSettings)
  }
  let exportToSheet = function () {
    let fileName = props.modalSettings.enterFileName
    if (fileName.trim() === '') {
      let modalSettings = {...props.modalSettings, 'exportValidationClass': 'form-group m-form__group row has-danger'}
      props.setModalSetting(modalSettings)
    } else {
      let data = props.modalSettings.apiData
      // make the worksheet
      let workSheet = XLSX.utils.json_to_sheet(data)

      // add to workbook
      let workBook = XLSX.utils.book_new()
      let sheetName = props.modalSettings.selectedMetaModel.label
      XLSX.utils.book_append_sheet(workBook, workSheet, sheetName)

      // write workbook (use type 'binary')
      let workBookOutput = XLSX.write(workBook, {bookType: 'xlsx', type: 'binary'})

      // generate a download
      let s2ab = function (str) {
        var buf = new ArrayBuffer(str.length)
        var view = new Uint8Array(buf)
        for (var i = 0; i !== str.length; ++i) view[i] = str.charCodeAt(i) & 0xFF
        return buf
      }
      saveAs(new Blob([s2ab(workBookOutput)], {type: 'application/octet-stream'}), fileName + '.xlsx')
      console.log('excelData', data)
      let modalSettings = {...props.modalSettings, 'isExportModalOpen': false}
      props.setModalSetting(modalSettings)
    }
  }
  let ImportData = function (event) {
    let apiData = props.modalSettings.apiData
    let fileData = props.modalSettings.fileData
    let arrayLength = fileData.length
    let patchPayload = []
    let columnRow = props.modalSettings.columnRow
    let labelParts = props.metaModelPerspective.resources[0].parts
    for (let i = 0; i < arrayLength; i++) {
      // console.log('iterate', i)
      let patch = createPatch(apiData[i], fileData[i])
      if (patch.length > 0) {
        let modelPrespective = props.modelPrespectives[i]
        patch = patch.map(function (data, idx) {
          let column = data.path.substring(1)
          let index = columnRow.indexOf(column)
          let metaModelPrespective = labelParts[index]
          let valueType = ''
          if (metaModelPrespective.type_property) {
            let propertyType = metaModelPrespective.type_property.property_type.key
            if (propertyType === 'Integer') {
              valueType = 'int_value' || ''
            } else if (propertyType === 'Decimal') {
              valueType = 'float_value' || ''
            } else if (propertyType === 'Text') {
              valueType = 'text_value' || ''
            } else if (propertyType === 'DateTime') {
              valueType = 'date_time_value' || ''
            } else if (propertyType === 'Boolean') {
              valueType = 'boolean_value' || ''
            } else if (propertyType === 'List') {
              valueType = 'value_set_value' || ''
            } else {
              valueType = 'other_value' || ''
            }
          } else {
            valueType = metaModelPrespective.standard_property
          }
          data.path = '/' + modelPrespective.subject_id + '/parts/' + index + '/' + valueType
          return data
        })
        patchPayload = patchPayload.concat(patch)
      }
      // console.log('patch', patch)
    }
    let payload = {}
    payload.metaModelPerspectiveId = props.modalSettings.selectedMetaModel.perspective
    payload.data = patchPayload
    console.log('payload', payload)
    props.updateModelPrespectives(payload)
  }
  let handleSelect = function (newValue: any, actionMeta: any) {
    console.log('newValue', newValue)
    if (actionMeta.action === 'select-option') {
      // let selectedStandard = newValue
      let perspectiveId = newValue.perspective
      let payload = {'meta_model_perspective_id': perspectiveId}
      // eslint-disable-next-line
      mApp.blockPage({overlayColor:'#000000',type:'loader',state:'success',message:'Processing...'})
      props.fetchMetaModelPrespective(perspectiveId)
      props.fetchModelPrespectives(payload)
      console.log(perspectiveId)
      console.log(payload)
      let modalSettings = {...props.modalSettings, 'selectedMetaModel': newValue, 'apiData': []}
      props.setModalSetting(modalSettings)
    }
    if (actionMeta.action === 'clear') {
      let modalSettings = {...props.modalSettings, 'selectedMetaModel': null, 'apiData': []}
      props.setModalSetting(modalSettings)
    }
  }
  let handleInputChange = debounce((e) => {
    console.log(e)
    const value = searchTextBox.value
    // entitlementsList = ''
    let payload = {
      'search': value || '',
      'page_size': props.perPage,
      'page': currentPage
    }
    // if (searchTextBox.value.length > 2 || searchTextBox.value.length === 0) {
      props.fetchCheckItems(payload)
      // eslint-disable-next-line
      mApp && mApp.block('#entitlementList', {overlayColor:'#000000',type:'loader',state:'success',message:'Processing...'})
      // props.setComponentTypeLoading(true)
    // }
    listPage = _.filter(pageArray, function (group) {
      let found = _.filter(group, {'number': currentPage})
      if (found.length > 0) { return group }
    })
  }, 500)
  if (props.metaModelPerspective && props.metaModelPerspective !== '' && props.metaModelPerspective.error_code === null) {
    if (props.metaModelPerspective.resources[0].parts.length > 0) {
      tableHeader = props.metaModelPerspective.resources[0].parts.map(function (data, index) {
        labels.push(data.name)
        return (<th key={index} className=''><h5>{data.name}</h5></th>)
      })
    }
  }
  let listModelPrespectives = function () {
    if (props.modelPrespectives !== '') {
      if (props.modelPrespectives.length > 0) {
        modelPrespectivesList = props.modelPrespectives.slice(perPage * (currentPage - 1), ((currentPage - 1) + 1) * perPage).map(function (data, index) {
          let childList = []
          let labelParts = props.metaModelPerspective.resources[0].parts
          data.parts.forEach(function (partData, ix) {
            let value
            if (labelParts[ix].type_property === null) {
              value = partData.value
            } else if (labelParts[ix].type_property === 'Integer') {
              value = partData.value.int_value
            } else if (labelParts[ix].type_property === 'Decimal') {
              value = partData.value.float_value
            } else if (labelParts[ix].type_property === 'Text') {
              value = partData.value.text_value
            } else if (labelParts[ix].type_property === 'DateTime') {
              value = partData.value.date_time_value
            } else if (labelParts[ix].type_property === 'Boolean') {
              value = partData.value.boolean_value
            } else if (labelParts[ix].type_property === 'List') {
              value = partData.value.value_set_value
            } else {
              value = partData.value.other_value
            }
            childList.push(<td className='' key={'ch_' + index + '_' + ix}>{value}</td>)
          })
          return (<tr key={index}>{childList}</tr>)
        })
      } else {
        modelPrespectivesList = []
        modelPrespectivesList.push((
          <tr key={0}>
            <td colSpan='4'>{'No data to display'}</td>
          </tr>
        ))
      }
      // console.log('modelPrespectivesList', modelPrespectivesList)
    }
  }
  if (props.modelPrespectives && props.modelPrespectives !== '') {
    totalPages = Math.ceil(props.modelPrespectives.length / perPage)
    console.log('totalPages', totalPages)
    let i = 1
    while (i <= totalPages) {
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
    listModelPrespectives()
  }
  if (currentPage === 1) {
    previousClass = 'm-datatable__pager-link--disabled'
  }
  if (currentPage === totalPages) {
    nextClass = 'm-datatable__pager-link--disabled'
  }
  let handleListAndPagination = function (page) {
    listModelPrespectives()
    props.setCurrentPage(page)
    listPage = _.filter(pageArray, function (group) {
      let found = _.filter(group, {'number': page})
      if (found.length > 0) { return group }
    })
  }
  let handlePrevious = function (event) {
    event.preventDefault()
    if (currentPage === 1) {
      previousClass = styles.disabled
    } else {
      props.setCurrentPage(currentPage - 1)
      handleListAndPagination(currentPage - 1)
    }
  }

  let handleNext = function (event) {
    event.preventDefault()
    if (currentPage === totalPages) {
      nextClass = styles.disabled
    } else {
      props.setCurrentPage(currentPage + 1)
      handleListAndPagination(currentPage + 1)
    }
  }
  let handlePage = function (page) {
    if (page === 1) {
      previousClass = 'm-datatable__pager-link--disabled'
    } else if (page === totalPages) {
      nextClass = 'm-datatable__pager-link--disabled'
    }
    handleListAndPagination(page)
  }
return (
  <div>
    <div className='row'>
      <div className='col-md-9'>
        <h2>Sheets</h2>
      </div>
    </div>
    <div id='entitlementList'>
      {/* The table structure begins */}
      <div className='row' style={{'marginTop': '20px'}}>
        <div className='col-md-12'>
          <div className='m_datatable' id='scrolling_vertical'>
            <div className='m_datatable m-datatable m-datatable--default m-datatable--loaded m-datatable--scroll' id='scrolling_vertical' style={{}}>
              <div>
                <div className='m-portlet'>
                  <div className='m-portlet__body'>
                    <div id='m_table_1_wrapper' className='dataTables_wrapper dt-bootstrap4'>
                      <div className='row' style={{'marginBottom': '20px'}}>
                        <div className='col-sm-12 col-md-7'>
                          <div className='' id='' style={{'display': 'flex'}}>
                            <h5 style={{'margin': '8px'}}>Select</h5>
                            <Select
                              className='col-10 m-input'
                              placeholder='Select Sheets'
                              isClearable
                              value={props.modalSettings.selectedMetaModel}
                              onChange={handleSelect}
                              isSearchable={false}
                              name={'selectedMetaModel'}
                              options={props.perspectives}
                            />
                          </div>
                        </div>
                        <div className='col-sm-12 col-md-5 pull-left'>
                          <span className='pull-left'>
                            <button type='button' onClick={openExportModal} className={'btn btn-secondary m-btn m-btn--custom m-btn--label-info' + disabledClass}><i className='fa fa-angle-double-left fa-2x' />&nbsp;&nbsp;Export</button>&nbsp;&nbsp;&nbsp;&nbsp;
                            <button type='button' onClick={openImportModal} className={'btn btn-secondary m-btn m-btn--custom m-btn--label-info' + disabledClass}><i className='fa fa-angle-double-right fa-2x' />&nbsp;&nbsp;Import</button>
                          </span>
                        </div>
                      </div>
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
                    <div className='dataTables_scrollBody' style={{position: 'relative', overflow: 'auto', width: '100%', 'maxHeight': '100vh'}}>
                      <table className='m-portlet table table-striped- table-bordered table-hover table-checkable dataTable no-footer' id='m_table_1' aria-describedby='m_table_1_info' role='grid'>
                        <thead>
                          <tr role='row'>
                            {tableHeader}
                          </tr>
                        </thead>
                        <tbody>
                          {modelPrespectivesList}
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
      {/* The table structure ends */}
    </div>
    <div>
      <ReactModal isOpen={props.modalSettings.isExportModalOpen}
        onRequestClose={closeModal}
        className='modal-dialog'
        style={{'content': {'top': '20%'}}}
        >
        {/* <button onClick={closeModal} ><i className='la la-close' /></button> */}
        <div className={''}>
          <div className=''>
            <div className='modal-content'>
              <div className='modal-header'>
                <h4 className='modal-title' id='exampleModalLabel'>Export to Excel sheet</h4>
                <button type='button' onClick={closeModal} className='close' data-dismiss='modal' aria-label='Close'>
                  <span aria-hidden='true'>×</span>
                </button>
              </div>
              <div className='modal-body'>
                <div className='col-md-12 m-form m-form--state m-form--fit'>
                  {/* {messageBlock} */}
                  <div className={props.modalSettings.exportValidationClass}>
                    <label htmlFor='example-email-input' className='col-4 col-form-label'>Enter Filename</label>
                    <input className='col-8 form-control m-input' value={props.modalSettings.enterFileName} onChange={handleInputName} type='email' placeholder='Enter Filename' id='example-userName-input' />
                  </div>
                </div>
              </div>
              <div className='modal-footer'>
                <button type='button' onClick={closeModal} className='btn btn-outline-danger btn-sm'>Cancel</button>
                <button onClick={exportToSheet} className='btn btn-outline-info btn-sm' >Export</button>
              </div>
            </div>
          </div>
        </div>
      </ReactModal>
      <ReactModal isOpen={props.modalSettings.isImportModalOpen}
        onRequestClose={closeModal}
        className='modal-dialog'
        style={{'content': {'top': '20%'}}}
        >
        {/* <button onClick={closeModal} ><i className='la la-close' /></button> */}
        <div className={''}>
          <div className=''>
            <div className='modal-content'>
              <div className='modal-header'>
                {props.modalSettings.updateResponse === null && (<h4 className='modal-title' id='exampleModalLabel'>Import from Excel sheet</h4>)}
                {props.modalSettings.updateResponse !== null && (<h4 className='modal-title' id='exampleModalLabel'>Import Report</h4>)}
                <button type='button' onClick={closeModal} className='close' data-dismiss='modal' aria-label='Close'>
                  <span aria-hidden='true'>×</span>
                </button>
              </div>
              <div className='modal-body'>
                <div className='col-md-12'>
                  {/* {messageBlock} */}
                  {props.modalSettings.updateResponse === null && (<div className='form-group m-form__group row'>
                    <label htmlFor='example-email-input' className='col-4 col-form-label'>Select File</label>
                    <div className='col-8'>
                      <input className='form-control m-input' type='file' onChange={handleFile} placeholder='Select File to import' id='example-userName-input' />
                    </div>
                  </div>)}
                  {props.modalSettings.updateResponse === null && (<ul className=''>
                    <li className=''>Select File</label>
                  </ul>)}
                </div>
              </div>
              <div className='modal-footer'>
                <button type='button' onClick={closeModal} className='btn btn-outline-danger btn-sm'>Close</button>
                {props.updateResponse === null && (<button onClick={ImportData} className='btn btn-outline-info btn-sm' >Import</button>)}
              </div>
            </div>
          </div>
        </div>
      </ReactModal>
    </div>
  </div>
      )
  }
  Sheets.propTypes = {
  modalSettings: PropTypes.any,
  perspectives: PropTypes.any,
  metaModelPerspective: PropTypes.any,
  modelPrespectives: PropTypes.any,
  currentPage: PropTypes.any,
  perPage: PropTypes.any,
  setModalSetting: PropTypes.func
 }
