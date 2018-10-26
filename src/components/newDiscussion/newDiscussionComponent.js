import React from 'react'
import PropTypes from 'prop-types'
import { MentionsInput, Mention } from 'react-mentions'
import defaultStyle from './defaultStyle.js'
import defaultMentionStyle from './defaultMentionStyle.js'
import debounce from 'lodash/debounce'
import ReactModal from 'react-modal'
ReactModal.setAppElement('#root')

export default function NewDiscussion (props) {
  console.log('props new discussion', props, props.isDiscussionModalOpen)
  let NameInputBox
  let tempMessageStorage = ''
  let tempTagStorage = []
  let viewMessageBox = ''
  let closeDiscussionModal = function (event) {
    tempMessageStorage = ''
    tempTagStorage = []
    props.setDiscussionModalOpenStatus(false)
    let payload = {}
    payload.message = ''
    payload.tags = [{id: 1, display: '...'}]
    props.setMessageData(payload)
  }
  let onAddReference = function (id, display) {
    // Unicode Replacement Mapping
    // "[" ---> 8261
    // "]" ---> 8262
    // ":" ---> 8285
    setTimeout(function () {
      console.log('on select new Com')
      let originalMessage = props.newMessage
      let formattedText = display.replace('[', String.fromCharCode(8261)).replace(']', String.fromCharCode(8262)).replace(':', String.fromCharCode(8285)).trim()
      console.log(formattedText)
      console.log(formattedText.trim())
      console.log(display)
      console.log(originalMessage + '@[' + display + ':Reference:' + id + ']')
      console.log(tempMessageStorage)
      console.log(tempTagStorage)
      if (!tempTagStorage.length > 0) {
        tempTagStorage.push({id: 1, display: '...'})
      }
      // eslint-disable-next-line
      let matches = originalMessage.match(/(?:^|\s)(#[a-zA-Z0-9:\[\]\s]{0,}\w*)/gi)
      console.log('matches', matches)
      console.log('tempMessageStorage', tempMessageStorage)
      if (matches) {
        let noRefText = originalMessage.replace(matches[0].trim(), '')
        let buildMessage = noRefText + '@[' + formattedText + ':Reference:' + id + ']'
        console.log('buildMessage', buildMessage)
        let payload = {}
        payload.message = buildMessage
        payload.tags = tempTagStorage
        console.log('set props', payload)
        props.setMessageData(payload)
      }
      // let buildMessage = originalMessage.substring(0, originalMessage.length - 2) + '@[' + display + ':Reference:' + id + ']'
      // let formattedMessage = buildMessage.replace(display, formattedText)
      // let payload = {}
      // payload.message = formattedMessage
      // payload.tags = tempTagStorage
      // console.log(payload)
      // props.setMessageData(payload)
    }, 0)
  }
  let handleChange1 = debounce((e) => {
    console.log(e)
    console.log('call api', viewMessageBox, viewMessageBox ? viewMessageBox.props.value : '')
    if (viewMessageBox) {
      let str = viewMessageBox ? viewMessageBox.props.value : ''
      console.log('str', str)
      // eslint-disable-next-line
      let matches = str.match(/(?:^|\s)(#[a-zA-Z0-9:\[\]\s]{0,}\w*)/gi)
      console.log('matches', matches)
      let reference = []
      if (matches !== null) {
        matches.forEach(function (data, index) {
          console.log('inside for', data.trim().substring(1, data.trim().length))
          reference.push(data.trim().substring(1, data.trim().length))
        })
      }
      if (reference.length > 0) {
        if (reference[reference.length - 1] !== '') {
          let initialPayload = {
            'search': reference[reference.length - 1],
            page_size: 100,
            page: 1
          }
          props.fetchModelArtefacts && props.fetchModelArtefacts(initialPayload)
        }
      } else {
        let initialPayload = {
          'search': '',
          page_size: 100,
          page: 1
        }
        props.fetchModelArtefacts && props.fetchModelArtefacts(initialPayload)
      }
    }
  }, 500)
  let handleChange = function (event) {
    let str = event.target.value
    let matches = str.match(/(?:^|\s)(\$[a-zA-Z0-9]\w*)/gi)
    let tags = []
    if (matches !== null) {
      matches.forEach(function (data, index) {
        let obj = {}
        obj.id = ++index
        obj.display = data.trim().substring(1, data.trim().length)
        tags.push(obj)
      })
    } else {
      tags.push({id: 1, display: '...'})
    }
    tempMessageStorage = str
    tempTagStorage = tags
    let payload = {}
    payload.message = str
    payload.tags = tags
    props.setMessageData(payload)
  }
  let createDiscussion = function (event) {
    let payload = {}
    payload.name = NameInputBox.value
    payload.context = {
          'artefact_type': {
          'key': props.type
          },
          'id': props.contextId
         }
    payload.discussion_type = {
        'key': 'User'
        }
    let message = props.newMessage
    let mentionArray = message.match(/\[(.*?)\]/g)
    let messagePayload = []
    let dataPayload = {}
    let mentions = []
    let references = []
    let tags = []
    if (mentionArray) {
      mentionArray.forEach(function (data, index) {
        data = data.substring(1, data.length - 1)
        let parts = data.toString().split(':')
        if (parts[1] === 'Mention') {
          let obj = {
            'artefact_type': {
              'key': 'User'
            },
            'id': parseInt(parts[2])
          }
          mentions.push(obj)
        } else if (parts[1] === 'Reference') {
          let obj = {
            'artefact_type': {
              'key': 'Component'
            },
            'id': parseInt(parts[2])
          }
          references.push(obj)
        } else if (parts[1] === 'Tag') {
          tags.push(parts[0])
        }
      })
    }
    dataPayload.name = message
    dataPayload.mentions = mentions
    dataPayload.references = references
    dataPayload.tags = tags
    messagePayload.push(dataPayload)
    payload.messages = messagePayload
    console.log(payload)
    props.createDiscussion && props.createDiscussion(payload)
    props.setDiscussionModalOpenStatus(false)
    let resetPayload = {}
    resetPayload.message = ''
    resetPayload.formattedTags = [{id: 1, display: '...'}]
    props.setMessageData(resetPayload)
    tempTagStorage = []
    viewMessageBox = ''
  }
  // if () {}
return (
  <div>
    <ReactModal isOpen={props.isDiscussionModalOpen}
      onRequestClose={closeDiscussionModal}
      className='modal-dialog modal-lg'
      style={{'content': {'top': '20%'}}}>
      <div className=''>
        <div className=''>
          <div className='modal-content'>
            <div className='modal-header'>
              <h6>New Discussion</h6>
              <button type='button' onClick={closeDiscussionModal} className='close' data-dismiss='modal' aria-label='Close'>
                <span aria-hidden='true'>×</span>
              </button>
            </div>
            <div className='modal-body'>
              {/* <TextArea /> */}
              <form>
                <div className='form-group'>
                  <label htmlFor='component-name' className='form-control-label'>Subject:</label>
                  <input type='text' className='form-control' ref={input => (NameInputBox = input)} id='component-name' autoComplete='off' required />
                </div>
                <div className='form-group'>
                  <MentionsInput onKeyUp={handleChange1} allowSpaceInQuery='true' ref={input => (viewMessageBox = input)} value={props.newMessage} placeholder={'for mentions use \'@\', for references use \'#\' and for tags use \'$\''} onChange={handleChange} markup='@[__display__:__type__:__id__]' style={defaultStyle}>
                    <Mention
                      type='Mention'
                      trigger='@'
                      data={props.formattedAccounts}
                      style={defaultMentionStyle}
                    />
                    <Mention
                      type='Reference'
                      trigger='#'
                      data={props.formattedModels}
                      style={defaultMentionStyle}
                      onAdd={onAddReference}
                    />
                    <Mention
                      type='Tag'
                      trigger='$'
                      data={props.formattedTags}
                      style={defaultMentionStyle}
                    />
                  </MentionsInput>
                </div>
              </form>
            </div>
            <div className='modal-footer'>
              <button type='button' onClick={createDiscussion} id='m_login_signup' className='btn btn-outline-info btn-sm m-btn m-btn--custom'>Create Discussion</button>
            </div>
          </div>
        </div>
      </div>
    </ReactModal>
  </div>
  )
}
NewDiscussion.propTypes = {
  type: PropTypes.any,
  isDiscussionModalOpen: PropTypes.any,
  formattedAccounts: PropTypes.any,
  formattedModels: PropTypes.any,
  formattedTags: PropTypes.any,
  newMessage: PropTypes.any,
  createDiscussion: PropTypes.func,
  setDiscussionModalOpenStatus: PropTypes.func,
  setMessageData: PropTypes.func,
  contextId: PropTypes.any
}
