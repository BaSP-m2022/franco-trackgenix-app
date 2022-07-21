import { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getProjectsFiltered } from 'redux/projects/thunks';
import { clearError as clearErrorProject } from 'redux/projects/actions';
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
    },
    []
  );

  const column = [
    { heading: 'First Name', value: 'employeeId.firstName' },
    { heading: 'Role', value: 'role' },
    { heading: 'Rate', value: 'rate' }
  ];

  if (loadingProjetcs) {
    return (
      <div className={styles.loading}>
        <LoadingScreen />
      </div>
    );
  }

  return (
    <section className={styles.container}>
      {!project._id ? (
        <h3 className={styles.errorText}>{errorProjetcs ? errorProjetcs : 'No project found'}</h3>
      ) : (
        <>
          <div className={`${styles.div} ${styles.profile}`}>
            <h2 className={styles.subtitle}>{project.name}</h2>
            <ProfileItem label={'Description'} text={project.description} />
            <ProfileItem label={'Status'} text={project.status} />
            <ProfileItem label={'Start Date'} text={project.startDate?.slice(0, 10)} />
            <ProfileItem label={'End Date'} text={project.endDate?.slice(0, 10)} />
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
                  history.replace(`/employees/${e.currentTarget.getAttribute('data-id')}`)
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
