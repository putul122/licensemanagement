import React from 'react'
import PropTypes from 'prop-types'
import ReactHtmlParser from 'react-html-parser'
import { MentionsInput, Mention } from 'react-mentions'
import debounce from 'lodash/debounce'
import defaultStyle from './defaultStyle.js'
import defaultMentionStyle from './defaultMentionStyle.js'
// import axios from 'axios'
// import api from '../../constants'
import styles from './discussionComponent.scss'
import ReactModal from 'react-modal'
ReactModal.setAppElement('#root')
const customStylescrud = { content: { top: '20%', background: 'none', border: '0px', overflow: 'none' } }

export default function Discussion (props) {
  console.log('Discussion Components', props.newMessage, props.formattedAccounts, props.type, props.formattedModels, props)
  let viewMessageBox = ''
  let discussionList = ''
  let discussionReplyList = ''
  let tempMessageStorage = ''
  let tempTagStorage = []
  let openDiscussionModal = function (event) {
    event.preventDefault()
    closeSlide()
    props.setDiscussionModalOpenStatus(true)
  }
  let getMessages = function (data) {
    props.setMessageData('')
    if (props.discussionId !== data.id) {
      let payload = {
        id: data.id
      }
      props.setDiscussionId(data.id)
      props.setAccordianOpenFlag(true)
      props.fetchDiscussionMessages && props.fetchDiscussionMessages(payload)
    } else {
      props.setAccordianOpenFlag(false)
    }
  }
  let openSlide = function (event) {
    tempMessageStorage = ''
    tempTagStorage = []
    props.setQuickslideDiscussion('m-quick-sidebar--on')
  }
  let closeSlide = function (event) {
    tempMessageStorage = ''
    tempTagStorage = []
    props.setQuickslideDiscussion('m-quick-sidebar--off')
  }
  let openModal = function (message) {
    tempMessageStorage = ''
    tempTagStorage = []
    props.setQuickslideDiscussion('m-quick-sidebar--off')
    let payload = {...props.replySettings, 'isModalOpen': true, 'selectedMessage': message, 'messageReply': '@[' + message.author.name + ':Mention:' + message.author.id + ']'}
    props.setReplySettings(payload)
  }
  let closeModal = function (event) {
    tempMessageStorage = ''
    tempTagStorage = []
    let payload = {...props.replySettings, 'isModalOpen': false, 'selectedMessage': '', 'messageReply': ''}
    props.setReplySettings(payload)
  }
  // let asyncData = debounce((query, callback) => {
  //   console.log(query)
  //   // function (query, callback) {
  //   console.log('my data', callback)
  //   axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('userAccessToken')
  //   axios.get(api.getModelArtefacts, {
  //     params: {
  //       'search': query,
  //       page_size: 100,
  //       page: 1
  //     }
  //   })
  //   .then(function (response) {
  //     console.log(response)
  //     if (response.data.error_code === null) {
  //       return response.data.resources.map(reference => ({ display: reference.name, id: reference.id }))
  //     }
  //   })
  //   .then(callback)
  //   .catch(function (error) {
  //     console.log('error', error)
  //   })
  //   // asyncQuery(query).then(callback);
  // }, 500)
  let onAddReference = function (id, display) {
    // Unicode Replacement Mapping
    // "[" ---> 8261
    // "]" ---> 8262
    // ":" ---> 8285
    setTimeout(function () {
      console.log('on select')
      let originalMessage = props.newMessage
      let formattedText = display.replace('[', String.fromCharCode(8261)).replace(']', String.fromCharCode(8262)).replace(':', String.fromCharCode(8285)).trim()
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
      // console.log('set props', payload)
      // props.setMessageData(payload)
    }, 0)
  }
  let onAddReplyReference = function (id, display) {
    // Unicode Replacement Mapping
    // "[" ---> 8261
    // "]" ---> 8262
    // ":" ---> 8285
    setTimeout(function () {
      console.log('onselect', id, display)
      let originalMessage = props.replySettings.messageReply
      let formattedText = display.replace('[', String.fromCharCode(8261)).replace(']', String.fromCharCode(8262)).replace(':', String.fromCharCode(8285)).trim()
      // console.log(formattedText)
      // console.log(display)
      // console.log(originalMessage + '@[' + display + ':Reference:' + id + ']')
      console.log(tempMessageStorage)
      // console.log(tempTagStorage)
      if (!tempTagStorage.length > 0) {
        tempTagStorage.push({id: 1, display: '...'})
      }
      // eslint-disable-next-line
      let matches = originalMessage.match(/(?:^|\s)(#[a-zA-Z0-9:\[\]\s]{0,}\w*)/gi)
      console.log('matches', matches)
      if (matches) {
        let noRefText = originalMessage.replace(matches[0].trim(), '')
        let buildMessage = noRefText + '@[' + formattedText + ':Reference:' + id + ']'
        console.log('buildMessage', buildMessage)
        let payload = {...props.replySettings, 'messageReply': buildMessage, 'tags': tempTagStorage}
        props.setReplySettings(payload)
      }
      // console.log(props)
      // let buildMessage = originalMessage.substring(0, originalMessage.length - 2) + '@[' + display + ':Reference:' + id + ']'
      // let formattedMessage = buildMessage.replace(display, formattedText)
      // console.log(formattedMessage)
      // let payload = {...props.replySettings, 'messageReply': formattedMessage, 'tags': tempTagStorage}
      // props.setReplySettings(payload)
    }, 0)
  }
  let handleChange1 = debounce((e) => {
    console.log(e)
    console.log('call api', viewMessageBox, viewMessageBox ? viewMessageBox.props.value : '')
    if (viewMessageBox) {
      let str = viewMessageBox ? viewMessageBox.props.value : ''
      // eslint-disable-next-line
      let matches = str.match(/(?:^|\s)(#[a-zA-Z0-9:\[\]\s]{0,}\w*)/gi)
      let reference = []
      if (matches !== null) {
        matches.forEach(function (data, index) {
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
      // console.log(props)
      console.log('handleChange', event.target.value)
    let str = event.target.value
    let matches = str.match(/(?:^|\s)(\$[a-zA-Z0-9]\w*)/gi)
    let tags = []
    if (matches !== null) {
      matches.forEach(function (data, index) {
        let obj = {}
        obj.id = ++index
        obj.display = data.trim().substring(1, data.trim().length)
        console.log('inside for', obj)
        tags.push(obj)
      })
    } else {
      tags.push({id: 1, display: '...'})
    }
    console.log('payload matches', matches, tags)
    let payload = {}
    payload.message = str
    payload.tags = tags
    tempMessageStorage = str
    tempTagStorage = tags
    console.log('payload', payload)
    props.setMessageData(payload)
  }
  let handleMessageReply1 = debounce((e) => {
    console.log(e)
    console.log('call api', viewMessageBox, viewMessageBox ? viewMessageBox.props.value : '')
    if (viewMessageBox) {
      let str = viewMessageBox ? viewMessageBox.props.value : ''
      // eslint-disable-next-line
      let matches = str.match(/(?:^|\s)(#[a-zA-Z0-9:\[\]\s]{0,}\w*)/gi)
      let reference = []
      if (matches !== null) {
        matches.forEach(function (data, index) {
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
  let handleMessageReply = function (event) {
    let str = event.target.value
    let matches = str.match(/(?:^|\s)(\$[a-zA-Z0-9]\w*)/gi)
    let tags = []
    if (matches !== null) {
      matches.forEach(function (data, index) {
        let obj = {}
        obj.id = ++index
        obj.display = data.trim().substring(1, data.trim().length)
        console.log('inside for', obj)
        tags.push(obj)
      })
    } else {
      tags.push({id: 1, display: '...'})
    }
    tempMessageStorage = str
    tempTagStorage = tags
    let payload = {...props.replySettings, 'messageReply': str, 'tags': tags}
    props.setReplySettings(payload)
  }
  let replyToMessage = function (event) {
    let message = props.replySettings.messageReply
    let mentionArray = message.match(/\[(.*?)\]/g)
    let payload = {}
    payload.id = props.discussionId
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
              'key': props.type
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
    payload.data = dataPayload
    console.log(payload)
    props.replyDiscussionMessages && props.replyDiscussionMessages(payload)
    let replySettingPayload = {...props.replySettings, 'isModalOpen': true, 'selectedMessage': '', 'messageReply': '', 'tags': [{id: 1, display: '...'}]}
    props.setReplySettings(replySettingPayload)
  }
  let createNewMessage = function (event) {
    let message = props.newMessage
    let mentionArray = message.match(/\[(.*?)\]/g)
    let payload = {}
    payload.id = props.discussionId
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
              'key': props.type
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
    payload.data = dataPayload
    console.log(payload)
    props.replyDiscussionMessages && props.replyDiscussionMessages(payload)
    let resetPayload = {}
    resetPayload.message = ''
    resetPayload.tags = [{id: 1, display: '...'}]
    props.setMessageData(resetPayload)
  }
  if (props.replySettings.isModalOpen) {
    discussionReplyList = props.discussions.resources.map(function (data, index) {
      if (props.discussionId === data.id) {
        let childElement = ''
        // if (props.discussionId === data.id) {
          childElement = props.discussionMessages.resources.map(function (cdata, cindex) {
            let userIconlink = cdata.author.icon ? 'https://ecoconductor-dev-api-resources.azurewebsites.net/icons/' + cdata.author.icon : 'https://ecoconductor-dev-api-resources.azurewebsites.net/icons/18'
            // For old Static Message Format
            let messageContent = cdata.name.replace(/<m ix=0>/g, '<a href="javascript:void(0);">@').replace(/<\/m>/g, '</a>')
            .replace(/<r ix=0>/g, '<a href="javascript:void(0);">#').replace(/<\/r>/g, '</a>')
            .replace(/<r ix=1>/g, '<a href="javascript:void(0);">#').replace(/<\/r>/g, '</a>')
            .replace(/<t>/g, ' #').replace(/<\/t>/g, '')
            // End
            let mentionArray = cdata.name.match(/\[(.*?)\]/g)
            if (mentionArray) {
              mentionArray.forEach(function (data, index) {
                data = data.substring(1, data.length - 1)
                let parts = data.toString().split(':')
                // eslint-disable-next-line
                // let str = `\\@\\[${data}\\]`
                // let reg = new RegExp(str, 'g')
                let match = '@[' + data + ']'
                if (parts[1] === 'Mention') {
                  messageContent = messageContent.replace(match, '<a href="javascript:void(0);">@' + parts[0] + '</a>')
                } else if (parts[1] === 'Reference') {
                  messageContent = messageContent.replace(match, '<a href="javascript:void(0);">#' + parts[0] + '</a>')
                  messageContent = messageContent.replace(String.fromCharCode(8261), '[').replace(String.fromCharCode(8262), ']').replace(String.fromCharCode(8285), ':')
                } else if (parts[1] === 'Tag') {
                  messageContent = messageContent.replace(match, '#' + parts[0] + '')
                }
              })
            }
            let value = ''
            let showReply = false
            if (props.replySettings.selectedMessage.id && (cdata.id === props.replySettings.selectedMessage.id)) {
              value = props.replySettings.messageReply
            } else {
              showReply = true
            }
            return (<li>
              <div className='row'>
                <div className='col-md-8'>
                  <img src={userIconlink} alt={cdata.author.name} />{cdata.author.name} {ReactHtmlParser(messageContent)}
                </div>
                <div className='col-md-4'>
                  <span className=''>
                    <a href='javascript:void(0);' ><i className='fa fa-thumbs-up' /></a>&nbsp;
                    <a href='javascript:void(0);' ><i className='fa fa-thumbs-down' /></a>&nbsp;
                    {showReply && (<a href='javascript:void(0);' onClick={(event) => { openModal(cdata) }} ><i className='fa fa-reply' /></a>)}
                  </span>
                </div>
              </div>
              {!showReply && (<div className='row'>
                <div className='col-md-8'>
                  <MentionsInput value={value} allowSpaceInQuery='true' ref={input => (viewMessageBox = input)} placeholder={'for mentions use \'@\', for references use \'#\' and for tags use \'$\''} onKeyUp={handleMessageReply1} onChange={handleMessageReply} markup='@[__display__:__type__:__id__]' style={defaultStyle}>
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
                      onAdd={onAddReplyReference}
                      // data={asyncData}
                      style={defaultMentionStyle}
                    />
                    <Mention
                      type='Tag'
                      trigger='$'
                      data={props.replySettings.tags}
                      style={defaultMentionStyle}
                    />
                  </MentionsInput>
                </div>
                <div className='col-md-4'>
                  <a href='javascript:void(0);' onClick={replyToMessage} className='btn btn-sm btn-metal'>Reply</a>
                </div>
              </div>)}
            </li>)
          })
        // }
        return (
          <li className={styles.groupspace} key={index} >
            <div>
              <h4>{data.name}</h4>
              <ul>
                {childElement}
              </ul>
            </div>
          </li>
        )
      }
    })
  }
  if (props.discussions && props.discussions !== '') {
    if (props.discussions.resources.length > 0) {
      discussionList = props.discussions.resources.map(function (data, index) {
        return (
          <div className='m-accordion__item'>
            <a className='m-accordion__item-head collapsed' onClick={() => getMessages(data)} role='tab' id={'m_accordion_7_item_1_head' + index} data-toggle='collapse' href={'#m_accordion_7_item_1_body' + index} aria-expanded='false'>
              {/* <span className='m-accordion__item-icon'><i className='fa flaticon-user-ok' /></span> */}
              <span className='m-accordion__item-title'>{data.name}</span>
              <span className='m-accordion__item-mode' />
            </a>
            <div className='m-accordion__item-body collapse' id={'m_accordion_7_item_1_body' + index} role='tabpanel' aria-labelledby={'m_accordion_7_item_1_head' + index} data-parent='#m_accordion_7'>
              <div className='m-accordion__item-content' />
            </div>
          </div>
        )
      })
    }
  }
  if (props.discussionMessages && props.discussionMessages !== '') {
    console.log(props.discussionId)
    discussionList = props.discussions.resources.map(function (data, index) {
      let childElement = ''
      let collapsedClass = ''
      let showClass = ''
      if (props.discussionId === data.id) {
        if (props.isAccordianOpen) {
          collapsedClass = 'collapsed'
          showClass = 'show'
        } else {
          collapsedClass = ''
          showClass = ''
        }
        childElement = props.discussionMessages.resources.map(function (cdata, cindex) {
          let userIconlink = cdata.author.icon ? 'https://ecoconductor-dev-api-resources.azurewebsites.net/icons/' + cdata.author.icon : 'https://ecoconductor-dev-api-resources.azurewebsites.net/icons/18'
          // For old Static Message Format
          let messageContent = cdata.name.replace(/<m ix=0>/g, '<a href="javascript:void(0);">@').replace(/<\/m>/g, '</a>')
          .replace(/<r ix=0>/g, '<a href="javascript:void(0);">#').replace(/<\/r>/g, '</a>')
          .replace(/<r ix=1>/g, '<a href="javascript:void(0);">#').replace(/<\/r>/g, '</a>')
          .replace(/<t>/g, ' #').replace(/<\/t>/g, '')
          // End
          let mentionArray = cdata.name.match(/\[(.*?)\]/g)
          console.log('mentionArray', mentionArray)
          if (mentionArray) {
            mentionArray.forEach(function (data, index) {
              data = data.substring(1, data.length - 1)
              console.log(data)
              let parts = data.toString().split(':')
              console.log(parts)
              console.log(messageContent)
              // eslint-disable-next-line
              // let str = `\\@\\[${data}\\]`
              // let reg = new RegExp(str, 'g')
              let match = '@[' + data + ']'
              if (parts[1] === 'Mention') {
                console.log('Mention', parts[0])
                messageContent = messageContent.replace(match, '<a href="javascript:void(0);">@' + parts[0] + '</a>')
              } else if (parts[1] === 'Reference') {
                console.log('Reference', parts[0])
                messageContent = messageContent.replace(match, '<a href="javascript:void(0);">#' + parts[0] + '</a>')
                console.log(messageContent)
                messageContent = messageContent.replace(String.fromCharCode(8261), '[').replace(String.fromCharCode(8262), ']').replace(String.fromCharCode(8285), ':')
                console.log(messageContent)
              } else if (parts[1] === 'Tag') {
                console.log('Tag')
                messageContent = messageContent.replace(match, '#' + parts[0] + '')
              }
            })
          }
          return (<li><img src={userIconlink} alt={cdata.author.name} />{cdata.author.name} {ReactHtmlParser(messageContent)}<span className='pull-right' style={{cursor: 'pointer'}}><a href='javascript:void(0);' onClick={(event) => { openModal(cdata) }} ><i className='fa fa-reply' /></a></span></li>)
        })
      }
      return (
        <div className='m-accordion__item' style={{'overflow': 'visible'}}>
          <a className={'m-accordion__item-head ' + collapsedClass} onClick={() => getMessages(data)} role='tab' id={'m_accordion_7_item_1_head' + index} data-toggle='collapse' href={'#m_accordion_7_item_1_body' + index} aria-expanded='false'>
            {/* <span className='m-accordion__item-icon'><i className='fa flaticon-user-ok' /></span> */}
            <span className='m-accordion__item-title'>{data.name}</span>
            <span className='m-accordion__item-mode' />
          </a>
          <div className={'m-accordion__item-body collapse' + showClass} id={'m_accordion_7_item_1_body' + index} role='tabpanel' aria-labelledby={'m_accordion_7_item_1_head' + index} data-parent='#m_accordion_7'>
            <div className='m-accordion__item-content' >
              <div className='m-messenger m-messenger--message-arrow m-messenger--skin-light'>
                <br />
                <div className='m-messenger__form'>
                  <div className='m-messenger__form-controls'>
                    <MentionsInput allowSpaceInQuery='true' ref={input => (viewMessageBox = input)} value={props.newMessage} placeholder={'for mentions use \'@\', for references use \'#\' and for tags use \'$\''} onKeyUp={handleChange1} onChange={handleChange} markup='@[__display__:__type__:__id__]' style={defaultStyle}>
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
                  <div className='m-messenger__form-tools'>
                    <a href='javascript:void(0);' onClick={createNewMessage} className='btn btn-sm btn-metal'>Reply</a>
                  </div>
                </div>
                <div className='m-messenger__seperator' />
                <ul>
                  {childElement}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )
    })
  }
  return (
    <div>
      <div id='m_quick_sidebar' className={'m-quick-sidebar m-quick-sidebar--tabbed m-quick-sidebar--skin-light ' + props.discussionSlide} >
        <div className='m-quick-sidebar__content'>
          <span id='m_quick_sidebar_close' className='m-quick-sidebar__close'><a href='javascript:void(0);' onClick={closeSlide} ><i className='la la-close' /></a></span>
          <ul id='m_quick_sidebar_tabs' className='nav nav-tabs m-tabs m-tabs-line m-tabs-line--brand' role='tablist'>
            <li className='nav-item m-tabs__item'>
              <a className='nav-link m-tabs__link active show' data-toggle='tab' href='#m_quick_sidebar_tabs_messenger' role='tab' aria-selected='false'>Discussions</a>
            </li>
            <li className='nav-item m-tabs__item'>
              <a className='nav-link m-tabs__link' data-toggle='tab' href='#m_quick_sidebar_tabs_logs' role='tab' aria-selected='false'>Activity</a>
            </li>
          </ul>
          <div className='tab-content'>
            <div className='tab-pane active show' id='m_quick_sidebar_tabs_messenger' role='tabpanel'>
              <div className='row'>
                <div className='col-6' />
                <div className='col-6 float-right'>
                  <button onClick={openDiscussionModal} className='btn btn-outline-info btn-sm pull-right'>New Discussion</button>
                </div>
              </div>
              <br />
              <div className='m-accordion m-accordion--default m-accordion--solid m-accordion--section  m-accordion--toggle-arrow' id='m_accordion_7' role='tablist'>
                {discussionList}
              </div>
            </div>
            <div className='tab-pane' id='m_quick_sidebar_tabs_logs' role='tabpanel'>
              <div className='m-list-timeline m-scrollable m-scroller ps' style={{height: '452px', overflow: 'hidden'}}>
                <div className='m-list-timeline__group'>
                  <div className='m-list-timeline__heading'>
                      System Logs
                    </div>
                  <div className='m-list-timeline__items'>
                    <div className='m-list-timeline__item'>
                      <span className='m-list-timeline__badge m-list-timeline__badge--state-success' />
                      <a href='' className='m-list-timeline__text'>12 new users registered <span className='m-badge m-badge--warning m-badge--wide'>important</span></a>
                      <span className='m-list-timeline__time'>Just now</span>
                    </div>
                    <div className='m-list-timeline__item'>
                      <span className='m-list-timeline__badge m-list-timeline__badge--state-info' />
                      <a href='' className='m-list-timeline__text'>System shutdown</a>
                      <span className='m-list-timeline__time'>11 mins</span>
                    </div>
                    <div className='m-list-timeline__item'>
                      <span className='m-list-timeline__badge m-list-timeline__badge--state-danger' />
                      <a href='' className='m-list-timeline__text'>New invoice received</a>
                      <span className='m-list-timeline__time'>20 mins</span>
                    </div>
                    <div className='m-list-timeline__item'>
                      <span className='m-list-timeline__badge m-list-timeline__badge--state-warning' />
                      <a href='' className='m-list-timeline__text'>Database overloaded 89% <span className='m-badge m-badge--success m-badge--wide'>resolved</span></a>
                      <span className='m-list-timeline__time'>1 hr</span>
                    </div>
                    <div className='m-list-timeline__item'>
                      <span className='m-list-timeline__badge m-list-timeline__badge--state-success' />
                      <a href='' className='m-list-timeline__text'>System error</a>
                      <span className='m-list-timeline__time'>2 hrs</span>
                    </div>
                    <div className='m-list-timeline__item'>
                      <span className='m-list-timeline__badge m-list-timeline__badge--state-info' />
                      <a href='' className='m-list-timeline__text'>Production server down <span className='m-badge m-badge--danger m-badge--wide'>pending</span></a>
                      <span className='m-list-timeline__time'>3 hrs</span>
                    </div>
                    <div className='m-list-timeline__item'>
                      <span className='m-list-timeline__badge m-list-timeline__badge--state-success' />
                      <a href='' className='m-list-timeline__text'>Production server up</a>
                      <span className='m-list-timeline__time'>5 hrs</span>
                    </div>
                  </div>
                </div>
                <div className='m-list-timeline__group'>
                  <div className='m-list-timeline__heading'>
                      Applications Logs
                    </div>
                  <div className='m-list-timeline__items'>
                    <div className='m-list-timeline__item'>
                      <span className='m-list-timeline__badge m-list-timeline__badge--state-info' />
                      <a href='' className='m-list-timeline__text'>New order received <span className='m-badge m-badge--info m-badge--wide'>urgent</span></a>
                      <span className='m-list-timeline__time'>7 hrs</span>
                    </div>
                    <div className='m-list-timeline__item'>
                      <span className='m-list-timeline__badge m-list-timeline__badge--state-success' />
                      <a href='' className='m-list-timeline__text'>12 new users registered</a>
                      <span className='m-list-timeline__time'>Just now</span>
                    </div>
                    <div className='m-list-timeline__item'>
                      <span className='m-list-timeline__badge m-list-timeline__badge--state-info' />
                      <a href='' className='m-list-timeline__text'>System shutdown</a>
                      <span className='m-list-timeline__time'>11 mins</span>
                    </div>
                    <div className='m-list-timeline__item'>
                      <span className='m-list-timeline__badge m-list-timeline__badge--state-danger' />
                      <a href='' className='m-list-timeline__text'>New invoices received</a>
                      <span className='m-list-timeline__time'>20 mins</span>
                    </div>
                    <div className='m-list-timeline__item'>
                      <span className='m-list-timeline__badge m-list-timeline__badge--state-warning' />
                      <a href='' className='m-list-timeline__text'>Database overloaded 89%</a>
                      <span className='m-list-timeline__time'>1 hr</span>
                    </div>
                    <div className='m-list-timeline__item'>
                      <span className='m-list-timeline__badge m-list-timeline__badge--state-success' />
                      <a href='' className='m-list-timeline__text'>System error <span className='m-badge m-badge--info m-badge--wide'>pending</span></a>
                      <span className='m-list-timeline__time'>2 hrs</span>
                    </div>
                    <div className='m-list-timeline__item'>
                      <span className='m-list-timeline__badge m-list-timeline__badge--state-info' />
                      <a href='' className='m-list-timeline__text'>Production server down</a>
                      <span className='m-list-timeline__time'>3 hrs</span>
                    </div>
                  </div>
                </div>
                <div className='m-list-timeline__group'>
                  <div className='m-list-timeline__heading'>
                      Server Logs
                    </div>
                  <div className='m-list-timeline__items'>
                    <div className='m-list-timeline__item'>
                      <span className='m-list-timeline__badge m-list-timeline__badge--state-success' />
                      <a href='' className='m-list-timeline__text'>Production server up</a>
                      <span className='m-list-timeline__time'>5 hrs</span>
                    </div>
                    <div className='m-list-timeline__item'>
                      <span className='m-list-timeline__badge m-list-timeline__badge--state-info' />
                      <a href='' className='m-list-timeline__text'>New order received</a>
                      <span className='m-list-timeline__time'>7 hrs</span>
                    </div>
                    <div className='m-list-timeline__item'>
                      <span className='m-list-timeline__badge m-list-timeline__badge--state-success' />
                      <a href='' className='m-list-timeline__text'>12 new users registered</a>
                      <span className='m-list-timeline__time'>Just now</span>
                    </div>
                    <div className='m-list-timeline__item'>
                      <span className='m-list-timeline__badge m-list-timeline__badge--state-info' />
                      <a href='' className='m-list-timeline__text'>System shutdown</a>
                      <span className='m-list-timeline__time'>11 mins</span>
                    </div>
                    <div className='m-list-timeline__item'>
                      <span className='m-list-timeline__badge m-list-timeline__badge--state-danger' />
                      <a href='' className='m-list-timeline__text'>New invoice received</a>
                      <span className='m-list-timeline__time'>20 mins</span>
                    </div>
                    <div className='m-list-timeline__item'>
                      <span className='m-list-timeline__badge m-list-timeline__badge--state-warning' />
                      <a href='' className='m-list-timeline__text'>Database overloaded 89%</a>
                      <span className='m-list-timeline__time'>1 hr</span>
                    </div>
                    <div className='m-list-timeline__item'>
                      <span className='m-list-timeline__badge m-list-timeline__badge--state-success' />
                      <a href='' className='m-list-timeline__text'>System error</a>
                      <span className='m-list-timeline__time'>2 hrs</span>
                    </div>
                    <div className='m-list-timeline__item'>
                      <span className='m-list-timeline__badge m-list-timeline__badge--state-info' />
                      <a href='' className='m-list-timeline__text'>Production server down</a>
                      <span className='m-list-timeline__time'>3 hrs</span>
                    </div>
                    <div className='m-list-timeline__item'>
                      <span className='m-list-timeline__badge m-list-timeline__badge--state-success' />
                      <a href='' className='m-list-timeline__text'>Production server up</a>
                      <span className='m-list-timeline__time'>5 hrs</span>
                    </div>
                    <div className='m-list-timeline__item'>
                      <span className='m-list-timeline__badge m-list-timeline__badge--state-info' />
                      <a href='' className='m-list-timeline__text'>New order received</a>
                      <span className='m-list-timeline__time'>1117 hrs</span>
                    </div>
                  </div>
                </div>
                <div className='ps__rail-x' style={{left: '0px', bottom: '0px'}}><div className='ps__thumb-x' style={{left: '0px', width: '0px'}} /></div>
                <div className='ps__rail-y' style={{top: '0px', right: '4px'}}><div className='ps__thumb-y' style={{top: '0px', height: '0px'}} /></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ul className='m-nav-sticky' style={{'marginTop': '30px'}}>
        <li className='m-nav-sticky__item' data-toggle='m-tooltip' title='' data-placement='left' data-original-title='Layout Builder'>
          <a href='javsscript:void(0);' onClick={openSlide}><i className='la la-angle-double-left' /></a>
        </li>
      </ul>
      <div>
        <ReactModal isOpen={props.replySettings.isModalOpen}
          // onRequestClose={closeModal}
          shouldCloseOnOverlayClick={false}
          className=''
          style={customStylescrud}
          // className={''}
          >
          {/* <button onClick={closeModal} ><i className='la la-close' /></button> */}
          <div>
            <div className='modal-dialog modal-lg'>
              <div className='modal-content'>
                <div className='modal-header'>
                  <h4 className='modal-title' id='exampleModalLabel'>{props.name + ' Discussion'}</h4>
                  <button type='button' onClick={closeModal} className='close' data-dismiss='modal' aria-label='Close'>
                    <span aria-hidden='true'>×</span>
                  </button>
                </div>
                <div className='modal-body' style={{'height': 'calc(60vh - 55px)', 'overflow': 'auto'}}>
                  <ul>
                    {discussionReplyList}
                  </ul>
                </div>
                <div className='modal-footer'>
                  <button onClick={closeModal} className='btn btn-sm btn-outline-info'>Cancel</button>
                </div>
              </div>
            </div>
          </div>
        </ReactModal>
      </div>
    </div>
  )
}
Discussion.propTypes = {
  // eslint-disable-next-line
  type: PropTypes.any,
  name: PropTypes.any,
  discussionSlide: PropTypes.any,
  discussions: PropTypes.any,
  discussionMessages: PropTypes.any,
  // eslint-disable-next-line
  formattedAccounts: PropTypes.any,
  // eslint-disable-next-line
  formattedModels: PropTypes.any,
  // eslint-disable-next-line
  formattedTags: PropTypes.any,
  discussionId: PropTypes.any,
  // eslint-disable-next-line
  newMessage: PropTypes.any,
  replySettings: PropTypes.any,
  // eslint-disable-next-line
  isAccordianOpen: PropTypes.any
}
