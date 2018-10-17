import React from 'react'
import PropTypes from 'prop-types'
import ReactHtmlParser from 'react-html-parser'
import { MentionsInput, Mention } from 'react-mentions'
import defaultStyle from './defaultStyle.js'
import defaultMentionStyle from './defaultMentionStyle.js'
import styles from './discussionComponent.scss'
import ReactModal from 'react-modal'
ReactModal.setAppElement('#root')

export default function Discussion (props) {
  // console.log('Discussion Components', props.newMessage, props.formattedAccounts, props.type, props.formattedModels, props)
  let discussionList = ''
  let discussionReplyList = ''
  let getMessages = function (data) {
    console.log(data)
    props.setMessageData('')
    if (props.discussionId !== data.id) {
      let payload = {
        id: data.id
      }
      props.setDiscussionId(data.id)
      props.fetchDiscussionMessages && props.fetchDiscussionMessages(payload)
    }
  }
  let openSlide = function (event) {
    props.setQuickslideDiscussion('m-quick-sidebar--on')
  }
  let closeSlide = function (event) {
    props.setQuickslideDiscussion('m-quick-sidebar--off')
  }
  let openModal = function (message) {
    props.setQuickslideDiscussion('m-quick-sidebar--off')
    let payload = {...props.replySettings, 'isModalOpen': true, 'selectedMessage': message, 'messageReply': '@[' + message.author.name + ':Mention:' + message.author.id + ']'}
    props.setReplySettings(payload)
  }
  let closeModal = function (event) {
    let payload = {...props.replySettings, 'isModalOpen': false, 'selectedMessage': '', 'messageReply': ''}
    props.setReplySettings(payload)
  }
  let handleChange = function (event) {
    console.log(props)
    console.log(event.target.value)
    let str = event.target.value
    let matches = str.match(/[^@!a-z$]\$[a-z]+/gi)
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
    console.log('payload', payload)
    props.setMessageData(payload)
  }
  let handleMessageReply = function (event) {
    let str = event.target.value
    let matches = str.match(/[^@!a-z$]\$[a-z]+/gi)
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
            let messageContent = cdata.name.replace(/<m ix=0>/g, '<a href="javascript:void(0);">@').replace(/<\/m>/g, '</a>')
            .replace(/<r ix=0>/g, '<a href="javascript:void(0);">#').replace(/<\/r>/g, '</a>')
            .replace(/<r ix=1>/g, '<a href="javascript:void(0);">#').replace(/<\/r>/g, '</a>')
            .replace(/<t>/g, ' #').replace(/<\/t>/g, '')
            let mentionArray = cdata.name.match(/\[(.*?)\]/g)
            if (mentionArray) {
              mentionArray.forEach(function (data, index) {
                data = data.substring(1, data.length - 1)
                let parts = data.toString().split(':')
                // eslint-disable-next-line
                let str = `\\@\\[${data}\\]`
                console.log('str replace', str)
                let reg = new RegExp(str, 'g')
                console.log('message content', messageContent)
                console.log('reg', reg)
                if (parts[1] === 'Mention') {
                  console.log('Mention string', data)
                  messageContent = messageContent.replace(reg, '<a href="javascript:void(0);">@' + parts[0] + '</a>')
                  console.log('Mention string', messageContent)
                } else if (parts[1] === 'Reference') {
                  console.log('Reference string', data)
                  messageContent = messageContent.replace(reg, '<a href="javascript:void(0);">#' + parts[0] + '</a>')
                  console.log('Reference string', messageContent)
                } else if (parts[1] === 'Tag') {
                  console.log('tag string', data)
                  messageContent = messageContent.replace(reg, '#' + parts[0] + '')
                  console.log('tag string', messageContent)
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
                  <img src={userIconlink} alt={cdata.author.name} />{ReactHtmlParser(messageContent)}
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
                  <MentionsInput value={value} placeholder={'for mentions use \'@\', for references use \'#\' and for tags use \'$\''} onChange={handleMessageReply} markup='@[__display__:__type__:__id__]' style={defaultStyle}>
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
      if (props.discussionId === data.id) {
        childElement = props.discussionMessages.resources.map(function (cdata, cindex) {
          let userIconlink = cdata.author.icon ? 'https://ecoconductor-dev-api-resources.azurewebsites.net/icons/' + cdata.author.icon : 'https://ecoconductor-dev-api-resources.azurewebsites.net/icons/18'
          let messageContent = cdata.name.replace(/<m ix=0>/g, '<a href="javascript:void(0);">@').replace(/<\/m>/g, '</a>')
          .replace(/<r ix=0>/g, '<a href="javascript:void(0);">#').replace(/<\/r>/g, '</a>')
          .replace(/<r ix=1>/g, '<a href="javascript:void(0);">#').replace(/<\/r>/g, '</a>')
          .replace(/<t>/g, ' #').replace(/<\/t>/g, '')
          let mentionArray = cdata.name.match(/\[(.*?)\]/g)
          if (mentionArray) {
            mentionArray.forEach(function (data, index) {
              data = data.substring(1, data.length - 1)
              let parts = data.toString().split(':')
              // eslint-disable-next-line
              let str = `\\@\\[${data}\\]`
              let reg = new RegExp(str, 'g')
              if (parts[1] === 'Mention') {
                messageContent = messageContent.replace(reg, '<a href="javascript:void(0);">@' + parts[0] + '</a>')
              } else if (parts[1] === 'Reference') {
                messageContent = messageContent.replace(reg, '<a href="javascript:void(0);">#' + parts[0] + '</a>')
              } else if (parts[1] === 'Tag') {
                messageContent = messageContent.replace(reg, '#' + parts[0] + '')
              }
            })
          }
          return (<li><img src={userIconlink} alt={cdata.author.name} />{ReactHtmlParser(messageContent)}<span className='pull-right' style={{cursor: 'pointer'}}><a href='javascript:void(0);' onClick={(event) => { openModal(cdata) }} ><i className='fa fa-reply' /></a></span></li>)
        })
      }
      return (
        <div className='m-accordion__item'>
          <a className='m-accordion__item-head collapsed' onClick={() => getMessages(data)} role='tab' id={'m_accordion_7_item_1_head' + index} data-toggle='collapse' href={'#m_accordion_7_item_1_body' + index} aria-expanded='false'>
            {/* <span className='m-accordion__item-icon'><i className='fa flaticon-user-ok' /></span> */}
            <span className='m-accordion__item-title'>{data.name}</span>
            <span className='m-accordion__item-mode' />
          </a>
          <div className='m-accordion__item-body collapse' id={'m_accordion_7_item_1_body' + index} role='tabpanel' aria-labelledby={'m_accordion_7_item_1_head' + index} data-parent='#m_accordion_7'>
            <div className='m-accordion__item-content' >
              <div className='m-messenger m-messenger--message-arrow m-messenger--skin-light'>
                <br />
                <div className='m-messenger__form'>
                  <div className='m-messenger__form-controls'>
                    {/* <input type='text' name='' placeholder='New Messages' className='m-messenger__form-input' /> */}
                    <MentionsInput value={props.newMessage} placeholder={'for mentions use \'@\', for references use \'#\' and for tags use \'$\''} onChange={handleChange} markup='@[__display__:__type__:__id__]' style={defaultStyle}>
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
          className='modal-dialog modal-lg'
          style={{'content': {'top': '20%'}}}
          // className={''}
          >
          {/* <button onClick={closeModal} ><i className='la la-close' /></button> */}
          <div>
            <div>
              <div className='modal-content'>
                <div className='modal-header'>
                  <h4 className='modal-title' id='exampleModalLabel'>{props.name + ' Discussion'}</h4>
                  <button type='button' onClick={closeModal} className='close' data-dismiss='modal' aria-label='Close'>
                    <span aria-hidden='true'>×</span>
                  </button>
                </div>
                <div className='modal-body'>
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
  replySettings: PropTypes.any
}
