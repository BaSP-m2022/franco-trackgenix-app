import { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getProjectsFiltered } from 'redux/projects/thunks';
import { clearError as clearErrorProject, clearProjects } from 'redux/projects/actions';
import { clearError as clearErrorEmployee } from 'redux/employees/actions';
import { ProfileItem, Table, LoadingScreen } from 'components/Shared';
import styles from './profile.module.css';

const ProjectProfile = () => {
  const { id } = useParams();

  const dispatch = useDispatch();
  const history = useHistory();

  const [project, setProject] = useState({});

  const filteredProjects = useSelector((state) => state.projects.filteredList);
  const loadingProjetcs = useSelector((state) => state.projects.loading);
  const errorProjetcs = useSelector((state) => state.projects.error);

  useEffect(() => {
    if (filteredProjects[0]?._id === id) {
      const employees = filteredProjects[0].employees.map((employee) => {
        return {
          rate: employee.rate,
          role: employee.role,
          employeeId: employee.employeeId,
          _id: employee.employeeId._id
        };
      });
      setProject({
        ...filteredProjects[0],
        employees: employees
      });
    } else if (!errorProjetcs) {
      dispatch(
        getProjectsFiltered({
          _id: id
        })
      );
    }
  }, [filteredProjects]);

  useEffect(
    () => () => {
      dispatch(clearErrorEmployee());
      dispatch(clearErrorProject());
      dispatch(clearProjects());
    },
    []
  );

  const column = [
    { heading: 'First Name', value: 'employeeId.firstName' },
    { heading: 'Role', value: 'role' },
    { heading: 'Rate', value: 'rate' }
  ];

  if (loadingProjetcs) {
    <LoadingScreen />;
  }

  return (
    <section className={styles.container}>
      {!project._id ? (
        <h3 className={styles.errorText}>{errorProjetcs ? errorProjetcs : 'No project found'}</h3>
      ) : (
        <>
          <svg
            width="200px"
            height="200px"
            viewBox="0 0 200 200"
            data-name="Layer 1"
            id="Layer_1"
            xmlns="http://www.w3.org/2000/svg"
            className={styles.backImg}
            onClick={() => {
              history.push('/projects');
            }}
          >
            <title />
            <path d="M100,15a85,85,0,1,0,85,85A84.93,84.93,0,0,0,100,15Zm0,150a65,65,0,1,1,65-65A64.87,64.87,0,0,1,100,165ZM116.5,57.5a9.67,9.67,0,0,0-14,0L74,86a19.92,19.92,0,0,0,0,28.5L102.5,143a9.9,9.9,0,0,0,14-14l-28-29L117,71.5C120.5,68,120.5,61.5,116.5,57.5Z" />
          </svg>
          <div className={`${styles.div} ${styles.profile}`}>
            <h2 className={styles.subtitle}>{project.name}</h2>
            <ProfileItem label={'Description'} text={project.description} />
            <ProfileItem label={'Status'} text={project.status} />
            <ProfileItem label={'Start Date'} text={project.startDate?.slice(0, 10)} />
            {project.endDate && (
              <ProfileItem label={'End Date'} text={project.endDate?.slice(0, 10)} />
            )}
          </div>
          <div className={`${styles.div} ${styles.table}`}>
            <h2 className={styles.subtitleSmall}>Employees</h2>
            {!project.employees?.length ? (
              <h3 className={styles.errorText}>Project has no assigned employees</h3>
            ) : (
              <Table
                data={project.employees}
                column={column}
                handleRowClick={(e) =>
                  history.replace(`/employee/${e.currentTarget.getAttribute('data-id')}`)
                }
              />
            )}
          </div>
        </>
      )}
    </section>
  );
};

export default ProjectProfile;
