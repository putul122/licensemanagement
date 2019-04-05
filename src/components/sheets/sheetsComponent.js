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
import moment from 'moment'
ReactModal.setAppElement('#root')
const parseDateExcel = (excelTimestamp) => {
  const secondsInDay = 24 * 60 * 60
  const excelEpoch = new Date(1899, 11, 31)
  const excelEpochAsUnixTimestamp = excelEpoch.getTime()
  const missingLeapYearDay = secondsInDay * 1000
  const delta = excelEpochAsUnixTimestamp - missingLeapYearDay
  const excelTimestampAsUnixTimestamp = excelTimestamp * secondsInDay * 1000
  const parsed = excelTimestampAsUnixTimestamp + delta
  return isNaN(parsed) ? null : parsed
}

export default function Sheets (props) {
  console.log(props)
  let copyModelPrespectives = props.copyModelPrespectives
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
  let wrapperClass = ''
  let importDisabledClass = ''
  let importWrapperClass = ''
  let messageList = ''
  let uploadFile = ''
  let style = {}
  let handleBlurdropdownChange = function (event) {
    console.log('handle Blur change', event.target.value)
  }
  let handledropdownChange = function (event) {
    props.setPerPage(parseInt(event.target.value))
  }
  let exportAllToSheet = function () {
    let fileName = props.modalSettings.enterFileName
    if (fileName.trim() === '') {
      let modalSettings = {...props.modalSettings, 'exportValidationClass': 'form-group m-form__group row has-danger'}
      props.setModalSetting(modalSettings)
    } else {
      // eslint-disable-next-line
      mApp && mApp.blockPage({overlayColor:'#000000',type:'loader',state:'success',message:'Processing...'})
      let modalSettings = {...props.modalSettings}
      let exportAllPayload = modalSettings.exportAllPayload
      console.log('exportAllPayload', exportAllPayload)
      props.fetchAllModelPrespectives(exportAllPayload)
    }
  }
  let openExportAllModal = function () {
    let modalSettings = {...props.modalSettings, 'isExportAllModalOpen': true, 'enterFileName': '', 'exportValidationClass': 'form-group m-form__group row'}
    props.setModalSetting(modalSettings)
  }
  let openImportAllModal = function () {
    let modalSettings = {...props.modalSettings, 'isImportAllModalOpen': true, 'isImportButtonEnabled': false}
    props.setModalSetting(modalSettings)
  }
  let openExportModal = function () {
    // eslint-disable-next-line
    mApp && mApp.blockPage({overlayColor:'#000000',type:'loader',state:'success',message:'Processing...'})
    let data = []
    copyModelPrespectives.forEach(function (modelPrespective, index) {
      // console.log(index)
      let obj = {}
      let labelParts = props.metaModelPerspective.resources[0].parts
      if (modelPrespective.parts) {
        modelPrespective.parts.forEach(function (partData, ix) {
          let value = ''
          if (labelParts[ix].standard_property !== null && labelParts[ix].type_property === null) { // Standard Property
            value = partData.value
          } else if (labelParts[ix].standard_property === null && labelParts[ix].type_property === null) { // Connection Property
            if (partData.value) {
              let targetComponents = []
              partData.value.forEach(function (data, index) {
                targetComponents.push(data.target_component.name)
              })
              value = targetComponents.toString()
            } else {
              value = partData.value || ''
            }
          } else if (labelParts[ix].type_property.property_type.key === 'Integer') { // below are Customer Property
            value = partData.value !== null ? partData.value.int_value : ''
          } else if (labelParts[ix].type_property.property_type.key === 'Decimal') {
            value = partData.value !== null ? partData.value.float_value : ''
          } else if (labelParts[ix].type_property.property_type.key === 'Text') {
            value = partData.value !== null ? partData.value.text_value : ''
          } else if (labelParts[ix].type_property.property_type.key === 'DateTime') {
            value = partData.value !== null ? partData.value.date_time_value : ''
          } else if (labelParts[ix].type_property.property_type.key === 'Boolean') {
            value = partData.value !== null ? partData.value.boolean_value : ''
          } else if (labelParts[ix].type_property.property_type.key === 'List') {
            value = partData.value !== null ? partData.value.value_set_value : ''
          } else {
            value = partData.value !== null ? partData.value.other_value : ''
          }
          obj[labelParts[ix].name.toLowerCase().trim().replace(/ /g, '_')] = value
        })
        obj['subject_id'] = modelPrespective.subject_id
        data.push(obj)
      }
    })
    // eslint-disable-next-line
    mApp && mApp.unblockPage()
    let modalSettings = {...props.modalSettings, 'isExportModalOpen': true, 'enterFileName': '', 'apiData': data, 'exportValidationClass': 'form-group m-form__group row'}
    props.setModalSetting(modalSettings)
  }
  let openImportModal = function () {
    // eslint-disable-next-line
    mApp && mApp.blockPage({overlayColor:'#000000',type:'loader',state:'success',message:'Processing...'})
    let data = []
    copyModelPrespectives.forEach(function (modelPrespective, index) {
      // console.log(index)
      let obj = {}
      let labelParts = props.metaModelPerspective.resources[0].parts
      if (modelPrespective.parts) {
        modelPrespective.parts.forEach(function (partData, ix) {
          let value = ''
          if (labelParts[ix].standard_property !== null && labelParts[ix].type_property === null) { // Standard Property
            value = partData.value
          } else if (labelParts[ix].standard_property === null && labelParts[ix].type_property === null) { // Connection Property
            if (partData.value) {
              let targetComponents = []
              partData.value.forEach(function (data, index) {
                targetComponents.push(data.target_component.name)
              })
              value = targetComponents.toString()
            } else {
              value = partData.value || ''
            }
          } else if (labelParts[ix].type_property.property_type.key === 'Integer') { // below are Customer Property
            value = partData.value !== null ? partData.value.int_value : ''
          } else if (labelParts[ix].type_property.property_type.key === 'Decimal') {
            value = partData.value !== null ? partData.value.float_value : ''
          } else if (labelParts[ix].type_property.property_type.key === 'Text') {
            value = partData.value !== null ? partData.value.text_value : ''
          } else if (labelParts[ix].type_property.property_type.key === 'DateTime') {
            value = partData.value !== null ? partData.value.date_time_value : ''
          } else if (labelParts[ix].type_property.property_type.key === 'Boolean') {
            value = partData.value !== null ? partData.value.boolean_value : ''
          } else if (labelParts[ix].type_property.property_type.key === 'List') {
            value = partData.value !== null ? partData.value.value_set_value : ''
          } else {
            value = partData.value !== null ? partData.value.other_value : ''
          }
          obj[labelParts[ix].name.toLowerCase().trim().replace(/ /g, '_')] = value
        })
        obj['subject_id'] = modelPrespective.subject_id
        data.push(obj)
      }
    })
    // eslint-disable-next-line
    mApp && mApp.unblockPage()
    let modalSettings = {...props.modalSettings, 'isImportModalOpen': true, 'apiData': data, 'isImportButtonEnabled': false}
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
    let files = e.target.files
    if (files.length > 0) {
      let fileType = files[0].type
      if (fileType === 'application/vnd.ms-excel' || fileType === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
        let modalSettings = {...props.modalSettings, 'isFileLoading': true}
        props.setModalSetting(modalSettings)
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
            let columnParts = props.metaModelPerspective.resources[0].parts
            let columnLength = columnParts.length
            let fileData = []
            let columnRow = data.shift()
            // check imported file content validation
            let fileContentSupported = true
            for (let i = 0; i < columnLength; i++) {
              if (columnParts[i].name.toLowerCase().trim().replace(/ /g, '_') !== columnRow[i]) {
                fileContentSupported = false
              }
            }
            if (fileContentSupported) {
              data.forEach(function (value, index) {
                if (value.length > 0) {
                  let obj = {}
                  for (let i = 0; i < columnLength; i++) {
                    obj[columnParts[i].name.toLowerCase().trim().replace(/ /g, '_')] = value[i] === undefined ? '' : value[i]
                  }
                  obj['subject_id'] = value[columnLength] || ''
                  fileData.push(obj)
                }
              })
              modalSettings = {...props.modalSettings, 'isFileLoading': false, 'fileData': fileData, 'columnRow': columnRow, 'isImportButtonEnabled': true}
              props.setModalSetting(modalSettings)
            } else {
              alert('file content not supported for selected Sheet')
              console.log('uploadFile', uploadFile)
              modalSettings = {...props.modalSettings, 'isFileLoading': false, 'isImportButtonEnabled': false}
              props.setModalSetting(modalSettings)
            }
          }
          reader.readAsBinaryString(f)
        }
      } else {
        alert('file type not supported')
        uploadFile.value = ''
        return false
      }
    } else {
      console.log('file', e)
    }
  }
  let handleImportAllFile = function (e) {
    let files = e.target.files
    if (files.length > 0) {
      let fileType = files[0].type
      if (fileType === 'application/vnd.ms-excel' || fileType === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
        let formData = new FormData()
        formData.append('file', files[0])
        console.log('formData', formData)
        console.log('files', files)
        let modalSettings = {...props.modalSettings, 'formData': formData, 'isImportButtonEnabled': true}
        props.setModalSetting(modalSettings)
      } else {
        alert('file type not supported')
        uploadFile.value = ''
        return false
      }
    } else {
      console.log('file', e)
    }
  }
  let ImportAllData = function () {
    // let fileName = props.modalSettings.enterFileName
    // if (fileName.trim() === '') {
    //   let modalSettings = {...props.modalSettings, 'exportValidationClass': 'form-group m-form__group row has-danger'}
    //   props.setModalSetting(modalSettings)
    // } else {
    //   // eslint-disable-next-line
    //   mApp && mApp.blockPage({overlayColor:'#000000',type:'loader',state:'success',message:'Processing...'})
    // eslint-disable-next-line
    mApp.blockPage({overlayColor:'#000000',type:'loader',state:'success',message:'Processing...'})
    let modalSettings = {...props.modalSettings}
    let payload = {}
    payload.queryPart = modalSettings.exportAllPayload
    payload.formData = modalSettings.formData
    props.updateAllModelPrespectives(payload)
    // }
  }
  if (props.modalSettings.selectedMetaModel) {
    disabledClass = ''
    wrapperClass = ''
  } else {
    disabledClass = styles.disabled
    wrapperClass = styles.wrapper
  }
  if (props.modalSettings.isImportButtonEnabled) {
    importDisabledClass = ''
    importWrapperClass = ''
  } else {
    importDisabledClass = styles.disabled
    importWrapperClass = styles.wrapper
  }
  if (props.modelPrespectives !== '') {
    if (props.modalSettings.isFileLoading) {
      // eslint-disable-next-line
      mApp.blockPage({overlayColor:'#000000',type:'loader',state:'success',message:'Processing...'})
    } else {
      console.log('not loader')
      // eslint-disable-next-line
      mApp && mApp.unblockPage()
    }
  }
  let closeModal = function () {
    let modalSettings = {...props.modalSettings, 'isExportModalOpen': false, 'isImportModalOpen': false, 'isExportAllModalOpen': false, 'isImportAllModalOpen': false, 'updateResponse': null, 'isConfirmPressed': false}
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
    // eslint-disable-next-line
    mApp.blockPage({overlayColor:'#000000',type:'loader',state:'success',message:'Processing...'})
    let apiData = props.modalSettings.apiData
    let fileData = props.modalSettings.fileData
    let arrayLength = fileData.length
    let patchPayload = []
    let columnRow = props.modalSettings.columnRow
    let labelParts = props.metaModelPerspective.resources[0].parts
    // console.log('apiData', apiData)
    // console.log('fileData', fileData)
    for (let i = 0; i < arrayLength; i++) {
      let subjectId = fileData[i].subject_id
      if (subjectId !== '') {
        let apiObject = _.find(apiData, function (obj) {
          return obj.subject_id === subjectId
        })
        let patch = createPatch(apiObject, fileData[i])
        if (patch.length > 0) {
          // let modelPrespective = props.modelPrespectives[i]
          patch = patch.map(function (data, idx) {
            let column = data.path.substring(1)
            // console.log('column', column, data)
            let index = columnRow.indexOf(column)
            // console.log('index', index, labelParts)
            let metaModelPrespective = labelParts[index]
            let valueType = ''
            if (metaModelPrespective.standard_property !== null && metaModelPrespective.type_property === null) { // Standard Property
              valueType = metaModelPrespective.standard_property
            } else if (metaModelPrespective.standard_property === null && metaModelPrespective.type_property === null) { // Connection Property
              data.op = 'add'
              valueType = 'value/-'
              let valueArray = data.value.split(',')
              let valueData = []
              valueArray.forEach(function (targetData, tid) {
                let obj = {}
                obj.target_name = targetData
                valueData.push(obj)
              })
              data.value = valueData
            } else if (metaModelPrespective.type_property !== null) { // below are Customer Property
              let propertyType = metaModelPrespective.type_property.property_type.key
              if (propertyType === 'Integer') {
                valueType = 'int_value'
              } else if (propertyType === 'Decimal') {
                valueType = 'float_value'
              } else if (propertyType === 'Text') {
                valueType = 'text_value'
              } else if (propertyType === 'DateTime') {
                valueType = 'date_time_value'
                let timeStamp = data.value
                if (timeStamp !== '') {
                  let convertedDate = new Date(parseDateExcel(timeStamp))
                  data.value = moment(convertedDate).format('YYYY-MM-DD')
                }
              } else if (propertyType === 'Boolean') {
                valueType = 'boolean_value'
              } else if (propertyType === 'List') {
                valueType = 'value_set_value'
              } else {
                valueType = 'other_value'
              }
            }
            data.path = '/' + subjectId + '/parts/' + index + '/' + valueType
            return data
          })
          patchPayload = patchPayload.concat(patch)
        }
      } else {
        let newPatch = {}
        newPatch.op = 'add'
        newPatch.path = '/-'
        let parts = []
        labelParts.forEach(function (partData, index) {
          let obj = {}
          if (partData.standard_property !== null && partData.type_property === null) { // Standard Property
            obj.value = fileData[i][partData.standard_property] || ''
          } else if (partData.standard_property === null && partData.type_property === null) { // Connection Property
            let connectionValue = '' + fileData[i][partData.name.toLowerCase().trim().replace(/ /g, '_')] || ''
            if (connectionValue.trim() !== '') {
              obj.value = connectionValue.split(',')
            } else {
              obj.value = []
            }
          } else if (partData.type_property !== null) { // below are Customer Property
            let propertyType = partData.type_property.property_type.key
            if (propertyType === 'Integer') {
              obj.value = {'int_value': fileData[i][partData.name.toLowerCase().trim().replace(/ /g, '_')] || ''}
            } else if (propertyType === 'Decimal') {
              obj.value = {'float_value': fileData[i][partData.name.toLowerCase().trim().replace(/ /g, '_')] || ''}
            } else if (propertyType === 'Text') {
              obj.value = {'text_value': fileData[i][partData.name.toLowerCase().trim().replace(/ /g, '_')] || ''}
            } else if (propertyType === 'DateTime') {
              let timeStamp = fileData[i][partData.name.toLowerCase().trim().replace(/ /g, '_')] || ''
              if (timeStamp !== '') {
                let convertedDate = new Date(parseDateExcel(timeStamp))
                obj.value = {'date_time_value': moment(convertedDate).format('YYYY-MM-DD')}
              } else {
                obj.value = {'date_time_value': ''}
              }
            } else if (propertyType === 'Boolean') {
              obj.value = {'boolean_value': fileData[i][partData.name.toLowerCase().trim().replace(/ /g, '_')] || ''}
            } else if (propertyType === 'List') {
              obj.value = {'value_set_value': fileData[i][partData.name.toLowerCase().trim().replace(/ /g, '_')] || ''}
            } else {
              obj.value = {'other_value': fileData[i][partData.name.toLowerCase().trim().replace(/ /g, '_')] || ''}
            }
          }
          parts.push(obj)
        })
        newPatch.value = {'parts': parts}
        patchPayload = patchPayload.concat(newPatch)
      }
    }
    let payload = {}
    // payload.metaModelPerspectiveId = props.modalSettings.selectedMetaModel.perspective
    payload.queryString = {}
    payload.queryString.meta_model_perspective_id = props.modalSettings.selectedMetaModel.perspective
    payload.queryString.apply_changes = false
    let newPatch = {}
    newPatch[props.modalSettings.selectedMetaModel.perspective] = patchPayload
    payload.data = newPatch
    console.log('payload', payload)
    props.updateModelPrespectives(payload)
  }
  let confirmChanges = function () {
    let modalSettings = {...props.modalSettings, 'isConfirmPressed': true}
    props.setModalSetting(modalSettings)
    if (props.modalSettings.updateResponse !== null) {
      let responselength = props.modalSettings.updateResponse.length
      if (responselength > 0) {
        if (props.modalSettings.updateResponse[responselength - 1].error_code === null && props.modalSettings.updateResponse[responselength - 1].message === null) {
          // eslint-disable-next-line
          mApp.blockPage({overlayColor:'#000000',type:'loader',state:'success',message:'Processing...'})
          let payload = {}
          // payload.metaModelPerspectiveId = props.modalSettings.selectedMetaModel.perspective
          payload.queryString = {}
          payload.queryString.meta_model_perspective_id = props.modalSettings.selectedMetaModel.perspective
          payload.queryString.apply_changes = true
          payload.data = props.modalSettings.updateResponse[responselength - 1].patch
          console.log('payload', payload)
          props.updateModelPrespectives(payload)
        }
      }
    }
  }
  let confirmImportAllChanges = function () {
    let modalSettings = {...props.modalSettings, 'isConfirmPressed': true}
    props.setModalSetting(modalSettings)
    if (props.modalSettings.updateResponse !== null) {
      let responselength = props.modalSettings.updateResponse.length
      if (responselength > 0) {
        if (props.modalSettings.updateResponse[responselength - 1].error_code === null && props.modalSettings.updateResponse[responselength - 1].message === null) {
          // eslint-disable-next-line
          mApp.blockPage({overlayColor:'#000000',type:'loader',state:'success',message:'Processing...'})
          let appPackage = JSON.parse(localStorage.getItem('packages'))
          let perspectives = appPackage.resources[0].perspectives
          let exportAllPayload = {}
          perspectives.forEach(function (data, index) {
            exportAllPayload['meta_model_perspective_id[' + index + ']'] = data.perspective
          })
          let payload = {}
          payload.queryString = exportAllPayload
          // payload.queryString.meta_model_perspective_id = props.modalSettings.selectedMetaModel.perspective
          payload.queryString.apply_changes = true
          // payload.queryPart = props.modalSettings.exportAllPayload + 'apply_changes=true'
          payload.data = props.modalSettings.updateResponse[responselength - 1].patch
          console.log('payload', payload)
          props.updateModelPrespectives(payload)
        }
      }
    }
  }
  let handleSelect = function (newValue: any, actionMeta: any) {
    if (actionMeta.action === 'select-option') {
      let payload = {}
      payload.data = ''
      payload.copyData = ''
      props.setModalPerspectivesData(payload)
      // let selectedStandard = newValue
      let perspectiveId = newValue.perspective
      let modelPrespectivesPayload = {'meta_model_perspective_id': perspectiveId}
      // eslint-disable-next-line
      mApp.blockPage({overlayColor:'#000000',type:'loader',state:'success',message:'Processing...'})
      // props.fetchMetaModelPrespective(perspectiveId)
      let metaPayload = {}
      metaPayload.id = perspectiveId
      metaPayload.data = {} // {'view_key': perspectiveObj.view_key}
      props.fetchMetaModelPrespective && props.fetchMetaModelPrespective(metaPayload)
      props.fetchModelPrespectives(modelPrespectivesPayload)
      let modalSettings = {...props.modalSettings, 'selectedMetaModel': newValue, 'apiData': []}
      props.setModalSetting(modalSettings)
    }
    if (actionMeta.action === 'clear') {
      let modalSettings = {...props.modalSettings, 'selectedMetaModel': null, 'apiData': []}
      props.setModalSetting(modalSettings)
      let payload = {}
      payload.data = ''
      payload.copyData = ''
      props.setModalPerspectivesData(payload)
    }
  }
  let handleInputChange = debounce((e) => {
    console.log(searchTextBox, copyModelPrespectives)
    // eslint-disable-next-line
    mApp.blockPage({overlayColor:'#000000',type:'loader',state:'success',message:'Processing...'})
    let searchText = searchTextBox ? searchTextBox.value : ''
    let originalData = copyModelPrespectives
    if (searchText.trim() !== '') {
      if (originalData !== '') {
        let list = _.filter(originalData, function (data, index) {
          if (data.parts) {
            if ((data.parts[0].value.toLowerCase()).match(searchText.toLowerCase())) {
              return data
            }
          }
        })
        let payload = {}
        payload.data = list
        payload.copyData = props.copyModelPrespectives
        props.setModalPerspectivesData(payload)
      }
      // eslint-disable-next-line
      mApp && mApp.unblockPage()
    } else {
      let payload = {}
      payload.data = props.copyModelPrespectives
      payload.copyData = props.copyModelPrespectives
      props.setModalPerspectivesData(payload)
      // eslint-disable-next-line
      mApp && mApp.unblockPage()
    }
    props.setCurrentPage(1)
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
      let labelParts = props.metaModelPerspective.resources[0].parts
      if (props.modelPrespectives.length > 0) {
        console.log('props.modelPrespectives', props.modelPrespectives)
        modelPrespectivesList = props.modelPrespectives.slice(perPage * (currentPage - 1), ((currentPage - 1) + 1) * perPage).map(function (data, index) {
          let childList = []
          // console.log('data', data)
          if (data.parts) {
            data.parts.forEach(function (partData, ix) {
              let value
              // console.log('partData', partData, labelParts, ix)
              if (labelParts[ix].standard_property !== null && labelParts[ix].type_property === null) { // Standard Property
                value = partData ? partData.value : ''
              } else if (labelParts[ix].standard_property === null && labelParts[ix].type_property === null) { // Connection Property
                if (partData.value) {
                  let targetComponents = []
                  partData.value.forEach(function (data, index) {
                    targetComponents.push(data.target_component.name)
                  })
                  value = targetComponents.toString()
                } else {
                  value = partData.value || ''
                }
              } else if (labelParts[ix].type_property.property_type.key === 'Integer') { // below are Customer Property
                value = (partData && partData.value !== null) ? partData.value.int_value : ''
              } else if (labelParts[ix].type_property.property_type.key === 'Decimal') {
                value = (partData && partData.value !== null) ? partData.value.float_value : ''
              } else if (labelParts[ix].type_property.property_type.key === 'Text') {
                value = (partData && partData.value !== null) ? partData.value.text_value : ''
              } else if (labelParts[ix].type_property.property_type.key === 'DateTime') {
                value = (partData && partData.value !== null) ? partData.value.date_time_value : ''
              } else if (labelParts[ix].type_property.property_type.key === 'Boolean') {
                value = (partData && partData.value !== null) ? partData.value.boolean_value : ''
              } else if (labelParts[ix].type_property.property_type.key === 'List') {
                value = (partData && partData.value !== null) ? (partData.value.value_set_value ? partData.value.value_set_value.name : '') : ''
              } else {
                value = (partData && partData.value !== null) ? partData.value.other_value : ''
              }
              childList.push(<td className='' key={'ch_' + index + '_' + ix}>{value}</td>)
            })
          }
          return (<tr key={index}>{childList}</tr>)
        })
      } else {
        modelPrespectivesList = []
        modelPrespectivesList.push((
          <tr key={0}>
            <td colSpan={labelParts.length}>{'No data to display'}</td>
          </tr>
        ))
      }
      // console.log('modelPrespectivesList', modelPrespectivesList)
    }
  }
  if (props.modelPrespectives && props.modelPrespectives !== '') {
    totalPages = Math.ceil(props.modelPrespectives.length / perPage)
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
  if (props.modalSettings.updateResponse !== null) {
    if (props.modalSettings.updateResponse.length > 0) {
      messageList = props.modalSettings.updateResponse.map(function (data, index) {
        if (data.error_code === null) {
          if (data.message != null) {
            return (<li key={index}>{data.message}</li>)
          } else {
            if (props.modalSettings.updateResponse.length === 1) {
              return (<li key={99}>{'No changes in data to update'}</li>)
            }
          }
        } else {
          return (<li key={index}>{'Error Code: ' + data.error_code + 'Message: ' + data.error_message}</li>)
        }
      })
    } else {
      messageList = []
      messageList.push((
        <li key={0}>{'No changes in data to update'}</li>
      ))
    }
  }
  if (props.modalSettings.updateResponse !== null) {
    style = {'height': 'calc(60vh - 55px)', 'overflow': 'auto'}
  } else {
    style = {}
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
                        <div className='col-sm-12 col-md-5'>
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
                        <div className='col-sm-12 col-md-7'>
                          <div className='row clearfix'>
                            <div className='col-6 pull-right'>
                              <span className={wrapperClass}>
                                <button type='button' onClick={openExportModal} className={'btn btn-secondary m-btn m-btn--pill m-btn--label-info ' + disabledClass}><i className='flaticon-folder-2' />&nbsp;&nbsp;Export</button>&nbsp;&nbsp;&nbsp;&nbsp;
                                <button type='button' onClick={openImportModal} className={'btn btn-secondary m-btn m-btn--pill m-btn--label-info ' + disabledClass}><i className='flaticon-folder-3' />&nbsp;&nbsp;Import</button>
                              </span>
                            </div>
                            <div className='col-6 pull-left'>
                              <button type='button' onClick={openExportAllModal} className={'btn btn-secondary m-btn m-btn--pill m-btn--label-info '}><i className='flaticon-download' />&nbsp;&nbsp;Export All</button>&nbsp;&nbsp;&nbsp;&nbsp;
                              <button type='button' onClick={openImportAllModal} className={'btn btn-secondary m-btn m-btn--pill m-btn--label-info '}><i className='flaticon-up-arrow' />&nbsp;&nbsp;Import All</button>
                            </div>
                          </div>
                        </div>
                      </div>
                      {props.modalSettings.selectedMetaModel !== null && (<div className='row' style={{'marginBottom': '20px'}}>
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
                      </div>)}
                    </div>
                    {props.modalSettings.selectedMetaModel !== null && (<div className='dataTables_scrollBody' style={{position: 'relative', overflow: 'auto', width: '100%', 'maxHeight': '100vh'}} id='ModelPerspectiveList'>
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
                    </div>)}
                    {props.modalSettings.selectedMetaModel !== null && (<div className='row'>
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
                    </div>)}
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
                <div className='row'>
                  <div className='col-md-6'>
                    <div className='btn-group m-btn-group m-btn-group--pill ' role='group' aria-label='...'>
                      <button type='button' onClick={closeModal} className='m-btn btn btn-secondary'>Cancel</button>
                      <button type='button' onClick={exportToSheet} className='m-btn btn btn-secondary'>Export</button>
                    </div>
                  </div>
                </div>
                {/* <button type='button' onClick={closeModal} className='btn btn-outline-danger btn-sm'>Cancel</button>
                <button onClick={exportToSheet} className='btn btn-outline-info btn-sm' >Export</button> */}
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
                {props.modalSettings.updateResponse !== null && !props.modalSettings.isConfirmPressed && (<h4 className='modal-title' id='exampleModalLabel'>Import Report: changes to be applied</h4>)}
                {props.modalSettings.updateResponse !== null && props.modalSettings.isConfirmPressed && (<h4 className='modal-title' id='exampleModalLabel'>Import Report: changes has been applied</h4>)}
                <button type='button' onClick={closeModal} className='close' data-dismiss='modal' aria-label='Close'>
                  <span aria-hidden='true'>×</span>
                </button>
              </div>
              <div className='modal-body' style={style}>
                <div className='col-md-12'>
                  {/* {messageBlock} */}
                  {props.modalSettings.updateResponse === null && (<div className='form-group m-form__group row'>
                    <label htmlFor='example-email-input' className='col-4 col-form-label'>Select File</label>
                    <div className='col-8'>
                      <input className='form-control m-input' type='file' onChange={handleFile} ref={input => (uploadFile = input)} placeholder='Select File to import' id='example-userName-input' />
                    </div>
                  </div>)}
                  {props.modalSettings.updateResponse !== null && (<ul className=''>
                    {messageList}
                  </ul>)}
                </div>
              </div>
              <div className={'modal-footer ' + importWrapperClass} >
                <div className='row'>
                  <div className='col-md-6'>
                    <div className='btn-group m-btn-group m-btn-group--pill ' role='group' aria-label='...'>
                      <button type='button' onClick={closeModal} className='m-btn btn btn-secondary'>Cancel</button>
                      {props.modalSettings.updateResponse === null && (<button onClick={ImportData} className={'m-btn btn btn-secondary ' + importDisabledClass} >Import</button>)}
                      {(props.modalSettings.updateResponse !== null && props.modalSettings.updateResponse.length > 1 && !props.modalSettings.isConfirmPressed) && (<button onClick={confirmChanges} className={'m-btn btn btn-secondary'} >Confirm</button>)}
                    </div>
                  </div>
                </div>
                {/* <button type='button' onClick={closeModal} className='btn btn-outline-danger btn-sm'>Close</button>
                {props.modalSettings.updateResponse === null && (<button onClick={ImportData} className={'btn btn-outline-info btn-sm ' + importDisabledClass} >Import</button>)}
                {(props.modalSettings.updateResponse !== null && props.modalSettings.updateResponse.length > 1 && !props.modalSettings.isConfirmPressed) && (<button onClick={confirmChanges} className={'btn btn-outline-info btn-sm ' + 'importDisabledClass'} >Confirm</button>)} */}
              </div>
            </div>
          </div>
        </div>
      </ReactModal>
      <ReactModal isOpen={props.modalSettings.isExportAllModalOpen}
        onRequestClose={closeModal}
        className='modal-dialog'
        style={{'content': {'top': '20%'}}}
        >
        {/* <button onClick={closeModal} ><i className='la la-close' /></button> */}
        <div className={''}>
          <div className=''>
            <div className='modal-content'>
              <div className='modal-header'>
                <h4 className='modal-title' id='exampleModalLabel'>Export All to Excel sheet</h4>
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
                <div className='row'>
                  <div className='col-md-6'>
                    <div className='btn-group m-btn-group m-btn-group--pill ' role='group' aria-label='...'>
                      <button type='button' onClick={closeModal} className='m-btn btn btn-secondary'>Cancel</button>
                      <button type='button' onClick={exportAllToSheet} className='m-btn btn btn-secondary'>Export All</button>
                    </div>
                  </div>
                </div>
                {/* <button type='button' onClick={closeModal} className='btn btn-outline-danger btn-sm'>Cancel</button>
                <button onClick={exportAllToSheet} className='btn btn-outline-info btn-sm' >Export All</button> */}
              </div>
            </div>
          </div>
        </div>
      </ReactModal>
      <ReactModal isOpen={props.modalSettings.isImportAllModalOpen}
        onRequestClose={closeModal}
        className='modal-dialog'
        style={{'content': {'top': '20%'}}}
        >
        {/* <button onClick={closeModal} ><i className='la la-close' /></button> */}
        <div className={''}>
          <div className=''>
            <div className='modal-content'>
              <div className='modal-header'>
                {props.modalSettings.updateResponse === null && (<h4 className='modal-title' id='exampleModalLabel'>Import All from Excel sheet</h4>)}
                {props.modalSettings.updateResponse !== null && !props.modalSettings.isConfirmPressed && (<h4 className='modal-title' id='exampleModalLabel'>Import Report: changes to be applied</h4>)}
                {props.modalSettings.updateResponse !== null && props.modalSettings.isConfirmPressed && (<h4 className='modal-title' id='exampleModalLabel'>Import Report: changes has been applied</h4>)}
                <button type='button' onClick={closeModal} className='close' data-dismiss='modal' aria-label='Close'>
                  <span aria-hidden='true'>×</span>
                </button>
              </div>
              <div className='modal-body' style={style}>
                <div className='col-md-12'>
                  {/* {messageBlock} */}
                  {props.modalSettings.updateResponse === null && (<div className='form-group m-form__group row'>
                    <label htmlFor='example-email-input' className='col-4 col-form-label'>Select File</label>
                    <div className='col-8'>
                      <input className='form-control m-input' type='file' onChange={handleImportAllFile} ref={input => (uploadFile = input)} placeholder='Select File to import' id='example-userName-input' />
                    </div>
                  </div>)}
                  {props.modalSettings.updateResponse !== null && (<ul className=''>
                    {messageList}
                  </ul>)}
                </div>
              </div>
              <div className={'modal-footer ' + importWrapperClass} >
                <div className='row'>
                  <div className='col-md-6'>
                    <div className='btn-group m-btn-group m-btn-group--pill ' role='group' aria-label='...'>
                      <button type='button' onClick={closeModal} className='m-btn btn btn-secondary'>Close</button>
                      {props.modalSettings.updateResponse === null && (<button onClick={ImportAllData} className={'m-btn btn btn-secondary ' + importDisabledClass} >Import</button>)}
                      {(props.modalSettings.updateResponse !== null && props.modalSettings.updateResponse.length > 1 && !props.modalSettings.isConfirmPressed) && (<button onClick={confirmImportAllChanges} className={'m-btn btn btn-secondary'} >Confirm</button>)}
                    </div>
                  </div>
                </div>
                {/* <button type='button' onClick={closeModal} className='btn btn-outline-danger btn-sm'>Close</button>
                {props.modalSettings.updateResponse === null && (<button onClick={ImportAllData} className={'btn btn-outline-info btn-sm ' + importDisabledClass} >Import All</button>)}
                {(props.modalSettings.updateResponse !== null && props.modalSettings.updateResponse.length > 1 && !props.modalSettings.isConfirmPressed) && (<button onClick={confirmImportAllChanges} className={'btn btn-outline-info btn-sm ' + importDisabledClass} >Confirm</button>)} */}
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
  copyModelPrespectives: PropTypes.any,
  currentPage: PropTypes.any,
  perPage: PropTypes.any
 }
