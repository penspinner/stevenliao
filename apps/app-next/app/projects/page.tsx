import { projectsDescription, projectsTitle } from 'personal-site'

import { ProjectsPageComponent } from './page-component'

export const metadata = {
  title: projectsTitle,
  description: projectsDescription,
}

const ProjectsPage = () => {
  return <ProjectsPageComponent />
}

export default ProjectsPage
