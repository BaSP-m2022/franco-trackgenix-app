import styles from './projects.module.css';
import { useEffect, useState } from 'react';

function Projects() {
  const [projects, setProjects] = useState([]);

  useEffect(async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API}/projects`);
      const data = await response.json();
      console.log(data.data);
      setProjects(data.data);
    } catch (error) {
      console.log(error);
    }
  }, []);

  async function deleteProject(projectId) {
    console.log('delete project with id: ' + projectId);
    try {
      const response = await fetch(`${process.env.REACT_APP_API}/projects/${projectId}`, {
        method: 'DELETE'
      });
      const data = await response.json();
      console.log('response.json() del delete: ');
      console.log(data);
      console.log('projects: ');
      console.log(projects);
      const result = projects.filter((project) => project._id !== projectId);
      setProjects(result);
    } catch (error) {
      console.log(error);
    }
  }

  function editProject() {
    console.log('edit project');
  }

  return (
    <section className={styles.container}>
      <h2>- Projects List -</h2>
      <div>
        <table id={styles.projects_list_table}>
          <tbody>
            <tr>
              <th>id</th>
              <th>name</th>
              <th>status</th>
              {/* <th>employees</th> */}
              <th>description</th>
              <th>start date</th>
              <th>end date</th>
            </tr>
            {projects.map((project) => {
              return (
                <tr key={project._id}>
                  <td>{project._id}</td>
                  <td>{project.name}</td>
                  <td>{project.status}</td>
                  {/* <td>{project.employees}</td> */}
                  <td>{project.description}</td>
                  <td>{project.startDate}</td>
                  <td>{project.endDate}</td>
                  <i onClick={() => deleteProject(project._id)} className="fa fa-trash"></i>
                  <i onClick={() => editProject(project._id)} className="fa fa-pencil"></i>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default Projects;
