import styles from './projects.module.css';
import { useEffect, useState } from 'react';

function Projects() {
  const [projects, setProjects] = useState([]);

  useEffect(async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/projects`);
      const data = await response.json();
      setProjects(data.data);
    } catch (error) {
      console.log(error);
    }
  }, []);

  async function deleteProject(projectId) {
    let confirm = window.confirm('Are you sure yo want to delete Project');
    if (confirm) {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/projects/${projectId}`, {
          method: 'DELETE'
        });
        const data = await response.json();
        console.log(data);
        const result = projects.filter((project) => project._id !== projectId);
        setProjects(result);
      } catch (error) {
        console.log(error);
      }
    }
  }

  return (
    <section className={styles.container}>
      <h2>- Projects List -</h2>
      <div className={styles.flex}>
        <a className={styles.add} href="/projects/form">
          Add Form
        </a>
        <table id={styles.projects_list_table}>
          <tbody>
            <tr className={styles.capitalize}>
              <th>id</th>
              <th>name</th>
              <th>status</th>
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
                  <td>{project.description}</td>
                  <td>{project.startDate}</td>
                  <td>{project.endDate}</td>
                  <i
                    onClick={() => deleteProject(project._id)}
                    className={`fa fa-trash ` + styles.fa_style}
                  ></i>
                  <i className={`fa fa-pencil ` + styles.fa_style}></i>
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
