import React from 'react'
import Header from '../../containers/header/headerContainer'
import LeftNavigation from '../../components/leftNavigation/leftNavigation.js'
import ProjectsList from '../../containers/projects/projectsContainer'
// import SmartDisplayStars from '../../containers/displayStars/displayStarsContainer'

class ProjectsPageRoute extends React.Component {
  render () {
    return (
      <div>
        <Header {...this.props} />
        <div className='m-grid__item m-grid__item--fluid m-grid m-grid--ver-desktop m-grid--desktop m-body'>
          <LeftNavigation />
          <div className='m-content col-xl-12'>
            <ProjectsList {...this.props} />
          </div>
        </div>
      </div>
    )
  }
  // props: {}
}
export default ProjectsPageRoute
