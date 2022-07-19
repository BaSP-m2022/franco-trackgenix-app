import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { getEmployeesFiltered } from 'redux/employees/thunks';
import { getProjectsFiltered } from 'redux/projects/thunks';
import { clearError } from 'redux/projects/actions';
import styles from './profile.module.css';
import { ProfileItem, Table, LoadingScreen } from 'components/Shared';

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
      dispatch(clearError());
    },
    []
  );

  const column = [
    { heading: 'Name', value: 'name' },
    { heading: 'Role', value: 'role' },
    { heading: 'Status', value: 'status' }
  ];

  if (loadingEmployees) {
    return (
      <div className={styles.loading}>
        <LoadingScreen />
      </div>
    );
  }
  return (
    <section className={styles.container}>
      {!employee._id ? (
        <h3 className={styles.errorText}>
          {errorEmployees ? errorEmployees : 'No employee found'}
        </h3>
      ) : (
        <>
          <div className={`${styles.profile} ${styles.div}`}>
            <h2 className={styles.subtitle}>{`${employee.firstName} ${employee.lastName}`}</h2>
            <ProfileItem label={'Email'} text={employee.email} />
            <ProfileItem label={'DNI'} text={employee.dni} />
            <ProfileItem label={'Date of bith'} text={employee.dateOfBirth?.slice(0, 10)} />
          </div>
          <div className={`${styles.projects} ${styles.div}`}>
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
                  history.replace(`/projects/${e.currentTarget.getAttribute('data-id')}`)
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
