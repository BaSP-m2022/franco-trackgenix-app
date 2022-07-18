import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { getEmployees } from 'redux/employees/thunks';
import { getProjects } from 'redux/projects/thunks';
import { clearError, clearProjects } from 'redux/projects/actions';
import styles from './profile.module.css';
import { Table } from 'components/Shared';
import { ProfileItem } from 'components/Shared';

const EmployeeProfile = () => {
  const { id } = useParams();

  const dispatch = useDispatch();
  const history = useHistory();

  const [employee, setEmployee] = useState({});
  const [employeeProjects, setEmployeeProjects] = useState([]);

  const employees = useSelector((state) => state.employees.list);
  const projects = useSelector((state) => state.projects.list);

  useEffect(() => {
    if (employees.length > 0) {
      setEmployee(employees.find((employee) => employee._id === id));
    } else {
      dispatch(
        getEmployees({
          _id: id
        })
      );
    }
  }, [employees]);

  useEffect(() => {
    if (employee._id) {
      dispatch(
        getProjects({
          'employees.employeeId': id
        })
      );
    }
  }, [employee]);

  useEffect(() => {
    if (projects.length > 0) {
      const projectsWithRole = projects.map((project) => {
        const { role } = project.employees.find((employee) => employee.employeeId._id === id);
        return {
          _id: project._id,
          name: project.name,
          status: project.status,
          role: role
        };
      });
      setEmployeeProjects(projectsWithRole);
    }
  }, [projects]);

  useEffect(
    () => () => {
      dispatch(clearError());
      dispatch(clearProjects());
      dispatch(getEmployees());
    },
    []
  );

  const column = [
    { heading: 'Name', value: 'name' },
    { heading: 'Role', value: 'role' },
    { heading: 'Status', value: 'status' }
  ];

  return (
    <section className={styles.container}>
      {employee[0]?._id ? (
        <h3 className={styles.errorText}>No employee found</h3>
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
