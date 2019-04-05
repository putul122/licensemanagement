import React from 'react'
import PropTypes from 'prop-types'
import styles from './searchComponent.scss'
import ReactHtmlParser from 'react-html-parser'

export default function Search (props) {
  let searchTextBox
  let searchList = ''
  let handleChange = function (event) {
    let value = event.target.value
    props.setSearchText(value)
  }
  let handleGlobalSearch = function (event) {
    event.preventDefault()
    window.location.href = window.location.origin + '/searchAll?search=' + props.searchText
  }
  let loadMoreData = function (event) {
    event.preventDefault()
    let payload = {}
    payload.search = props.searchText
    payload.page_size = props.perPage
    payload.page = props.currentPage + 1
    props.searchAll && props.searchAll(payload)
    // eslint-disable-next-line
    mApp.blockPage({overlayColor:'#000000',type:'loader',state:'success',message:'Processing...'})
    props.setCurrentPage(props.currentPage + 1)
  }
  console.log(searchTextBox)
  let componentClickHandle = function (data) {
    console.log('data', data)
    let payload = {}
    payload.isModalOpen = false
    payload.componentId = null
    payload.callAPI = false
    props.setModalSettings(payload)
    let componentTypeName = data.component_type_name
    let componentId = data.component_id
    if (componentTypeName === 'Application') {
      window.location.href = window.location.origin + '/applications/' + componentId
    } else if (componentTypeName === 'Agreement') {
      window.location.href = window.location.origin + '/agreements/' + componentId
    } else if (componentTypeName === 'Supplier') {
      window.location.href = window.location.origin + '/suppliers/' + componentId
    } else if (componentTypeName === 'Software') {
      window.location.href = window.location.origin + '/softwares/' + componentId
    } else if (componentTypeName === 'Entitlement') {
      window.location.href = window.location.origin + '/entitlements/' + componentId
    } else {
      let payload = {}
      payload.isModalOpen = true
      payload.componentId = componentId
      payload.callAPI = true
      props.setModalSettings(payload)
    }
  }
  if (props.searchData.length > 0) {
    searchList = []
    props.searchData.forEach(function (data, index) {
      data.matches.forEach(function (matchData, idx) {
        let searchMarkText = matchData.search_text
        searchMarkText = searchMarkText.replace(props.searchText, `<span style='background-color: #FFFF00' >${props.searchText}</span>`)
        console.log('search', index, searchMarkText)
        let searchBlock = []
        searchBlock.push(<b>{data.component_type_name + ' '}</b>)
        searchBlock.push(<a onClick={(event) => { event.preventDefault(); componentClickHandle(data) }} href='javascript:void(0);'>{data.component_name}</a>)
        searchBlock.push(<b>{' - ' + matchData.search_type_name + ' - '}</b>)
        searchBlock.push(ReactHtmlParser(searchMarkText))
        searchList.push(<span className='m-list-search__result-item' key={index + '-' + idx}>
          <span className='m-list-search__result-item-text'>{searchBlock}</span>
        </span>)
      })
    })
  } else {
    searchList = ''
  }
  return (
    <div className=''>
      <div className={styles.borderline} style={{'marginTop': '20px'}}>
        <div className='row'>
          <div className={'col-md-6'} />
          <div className={'col-md-6'}>
            <div className='pull-right' id='m_table_1_length' style={{'display': 'flex'}}>
              <div style={{'display': 'flex'}}>
                <div className='m-input-icon m-input-icon--left'>
                  <input type='text' className='form-control m-input' value={props.searchText} onChange={handleChange} placeholder='Search...' id='generalSearch' />
                  <span className='m-input-icon__icon m-input-icon__icon--left'>
                    <span>
                      <i className='la la-search' />
                    </span>
                  </span>
                </div>
                <button onClick={handleGlobalSearch} className='btn btn-md btn-secondary'>Search</button>
              </div>
            </div>
          </div>
        </div>
        <br />
        <div className='row' >
          <div className='m-section m-section--last' style={{width: '100%'}}>
            <div className='m-section__content'>
              <div className='m-demo'>
                <div className='m-demo__preview'>
                  <div className='m-list-search'>
                    <div className='m-list-search__results'>
                      <span className='m-list-search__result-category m-list-search__result-category--first'>
                                Search Results
                            </span>
                      {searchList}
                      <span className='m-list-search__result-item' key={'last'}>
                        <span className='m-list-search__result-item-text'>
                          <div className='float-right' >
                            <a href='javascript:void(0);' onClick={loadMoreData} title='Next' className={'pull-right '} >...<i className='fa	fa-angle-double-down fa-2x' /></a>
                          </div>
                        </span>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

Search.propTypes = {
    searchText: PropTypes.any,
    searchData: PropTypes.any
}
