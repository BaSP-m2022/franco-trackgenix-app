import { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getEmployeesFiltered } from 'redux/employees/thunks';
import { clearError as clearErrorEmployee } from 'redux/employees/actions';
import { getProjectsFiltered } from 'redux/projects/thunks';
import { clearError as clearErrorProject, clearProjects } from 'redux/projects/actions';
import { ProfileItem, Table, LoadingScreen } from 'components/Shared';
import styles from './profile.module.css';

const EmployeeProfile = () => {
  const { id } = useParams();

  const dispatch = useDispatch();
  const history = useHistory();

  const [employee, setEmployee] = useState({});
  const [employeeProjects, setEmployeeProjects] = useState([]);

  const filteredEmployees = useSelector((state) => state.employees.filteredList);
  const loadingEmployees = useSelector((state) => state.employees.loading);
  const errorEmployees = useSelector((state) => state.employees.error);
  const filteredProjects = useSelector((state) => state.projects.filteredList);

  useEffect(() => {
    if (filteredEmployees[0]?._id === id) {
      setEmployee(filteredEmployees[0]);
    } else if (!errorEmployees) {
      dispatch(
        getEmployeesFiltered({
          _id: id
        })
      );
    }
  }, [filteredEmployees]);

  useEffect(() => {
    if (employee._id) {
      dispatch(
        getProjectsFiltered({
          'employees.employeeId': id
        })
      );
    }
  }, [employee]);

  useEffect(() => {
    if (filteredProjects.length > 0) {
      const projectsWithRole = filteredProjects.map((project) => {
        const currentEmployee = project.employees?.find(
          (employee) => employee.employeeId._id === id
        );
        return {
          _id: project._id,
          name: project.name,
          status: project.status,
          role: currentEmployee ? currentEmployee.role : 'Not found'
        };
      });
      setEmployeeProjects(projectsWithRole);
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
    { heading: 'Name', value: 'name' },
    { heading: 'Role', value: 'role' },
    { heading: 'Status', value: 'status' }
  ];

  if (loadingEmployees) {
    return <LoadingScreen />;
  }

  return (
    <section className={styles.container}>
      {!employee._id ? (
        <h3 className={styles.errorText}>
          {errorEmployees ? errorEmployees : 'No employee found'}
        </h3>
      ) : (
        <>
          <div className={`${styles.div} ${styles.profile}`}>
            <svg
              width="200px"
              height="200px"
              viewBox="0 0 200 200"
              data-name="Layer 1"
              id="Layer_1"
              xmlns="http://www.w3.org/2000/svg"
              className={styles.backImg}
              onClick={() => {
                history.push('/employees');
              }}
            >
              <title />
              <path d="M100,15a85,85,0,1,0,85,85A84.93,84.93,0,0,0,100,15Zm0,150a65,65,0,1,1,65-65A64.87,64.87,0,0,1,100,165ZM116.5,57.5a9.67,9.67,0,0,0-14,0L74,86a19.92,19.92,0,0,0,0,28.5L102.5,143a9.9,9.9,0,0,0,14-14l-28-29L117,71.5C120.5,68,120.5,61.5,116.5,57.5Z" />
            </svg>
            <h2 className={styles.subtitle}>{`${employee.firstName} ${employee.lastName}`}</h2>
            <ProfileItem label={'Email'} text={employee.email} />
            <ProfileItem label={'DNI'} text={employee.dni} />
            <ProfileItem label={'Date of bith'} text={employee.dateOfBirth?.slice(0, 10)} />
          </div>
          <div className={`${styles.div} ${styles.table}`}>
            <h2 className={styles.subtitleSmall}>Projects</h2>
            {!employeeProjects.length ? (
              <h3
                className={styles.errorText}
              >{`${employee.firstName} ${employee.lastName} has no projects`}</h3>
            ) : (
              <Table
                data={employeeProjects}
                column={column}
                handleRowClick={(e) =>
                  history.replace(`/project/${e.currentTarget.getAttribute('data-id')}`)
                }
              />
            )}
          </div>
        </>
      )}
    </section>
  );
};

export default EmployeeProfile;
