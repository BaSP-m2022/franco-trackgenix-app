/* eslint-disable no-unused-vars */
import Button from 'components/Shared/Button';
import Modal from 'components/Shared/Modal';
import Input from 'components/Shared/Input';
import SelectDropdown from 'components/Shared/SelectDropdown';
import styles from './employee.module.css';
import { useState, useEffect } from 'react';
import formatDate from 'utils/formatters';
import { useDispatch, useSelector } from 'react-redux';
import { useForm, Controller } from 'react-hook-form';
import { getTimeSheets } from 'redux/timeSheets/thunks';
import { getProjects } from 'redux/projects/thunks';

const TableRow = ({ project, tasks }) => {
  const totalProjectTasksHours = tasks
    .filter((task) => task.projectId === project._id)
    .map((task) => task.workedHours)
    .reduce((partialSum, a) => partialSum + a, 0);
  //console.log('projectTasksHours', totalProjectTasksHours);
  return (
    <tr className={styles.containerTable}>
      <td>{project?.name}</td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td>{totalProjectTasksHours}</td>
    </tr>
  );
};

const EmployeeHome = () => {
  const [isOpen, setIsOpen] = useState(false);
  const date = new Date();
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [projectIdValue, setProjectIdValue] = useState('');
  const [projectOptions, setProjectsOptions] = useState([]);
  const [timeSheetEmployee, setTimeSheetEmployee] = useState({});
  const [tasksEmployee, setTasksEmployee] = useState([]);
  const [projectsEmployee, setProjectsEmployee] = useState([]);
  const dispatch = useDispatch();
  const { control, handleSubmit } = useForm();
  const timeSheets = useSelector((state) => state.timeSheets.list);
  const projects = useSelector((state) => state.projects.list);
  const error = useSelector((state) => state.timeSheets.error);
  const idEmployee = '62b225b3fa1f7cdcabb06d6c';

  const onChangeProjectID = (event) => {
    setProjectIdValue(event.target.value);
  };

  useEffect(() => {
    if (!timeSheets.length) {
      dispatch(getTimeSheets());
    }
    if (!projects.length) {
      dispatch(getProjects());
    }
    if (error) {
      openModal();
    }
    if (date.getDay() > 0) {
      setStartDate(date.setDate(date.getDate() - date.getDay()));
    }
    if (date.getDay() < 6) {
      setEndDate(date.setDate(date.getDate() + 6));
    }
    const tsEmployee = timeSheets.filter((ts) => {
      if (ts.employeeId._id === idEmployee) {
        return ts;
      }
    });
    setTimeSheetEmployee(tsEmployee);
    let projectsIdsEmployeeUnfiltered = [];
    for (let i = 1; i < tsEmployee.length; i++) {
      for (let j = 0; j < tsEmployee[i].tasks.length; j++) {
        projectsIdsEmployeeUnfiltered.push(tsEmployee[i].tasks[j].projectId);
      }
    }
    const projectsIdsEmployee = projectsIdsEmployeeUnfiltered.reduce((acc, item) => {
      if (!acc.includes(item)) {
        acc.push(item);
      }
      return acc;
    }, []);
    console.log(projectsIdsEmployee);

    if (projectsIdsEmployee.length > 0) {
      const projectsEmp = projectsIdsEmployee.map((projectId) => {
        return projects.find((project) => {
          return project._id === projectId;
        });
      });
      // console.log(projectsEmp);
      setProjectsEmployee(projectsEmp);
    }
  }, [timeSheets, projects]);

  useEffect(() => {
    let tasksEmployee = [];
    for (let i = 1; i < timeSheetEmployee.length; i++) {
      for (let j = 0; j < timeSheetEmployee[i].tasks.length; j++) {
        tasksEmployee.push(timeSheetEmployee[i].tasks[j]);
      }
    }
    setTasksEmployee(tasksEmployee);
  }, [timeSheets, projects]);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <div className={styles.container}>
      <Modal modalTitle="Add new progress" isOpen={isOpen} handleClose={closeModal}>
        <div className={styles.modal}>
          <form>
            <div className={styles.date}>
              <Controller
                control={control}
                name="date"
                render={({ field: { value, onChange }, fieldState: { error } }) => (
                  <Input
                    className={styles.label}
                    name="Date"
                    type="date"
                    value={value}
                    onChange={onChange}
                    error={error?.message}
                  />
                )}
              />
            </div>
            <h3 className={styles.h3}>Tasks</h3>
            <div className={styles.row}>
              <div className={styles.col}>
                <Controller
                  control={control}
                  name="project"
                  render={({
                    field: { projectIdValue, onChangeProjectID },
                    fieldState: { error }
                  }) => (
                    <SelectDropdown
                      name="Project"
                      className={styles.label}
                      value={projectIdValue}
                      onChange={onChangeProjectID}
                      options={projectOptions}
                      required={true}
                      error={error}
                    />
                  )}
                />
              </div>
              <div className={styles.col}>
                <Controller
                  control={control}
                  name="description"
                  render={({ field: { value, onChange }, fieldState: { error } }) => (
                    <Input
                      className={styles.label}
                      name="Description"
                      type="text"
                      value={value}
                      onChange={onChange}
                      error={error?.message}
                    />
                  )}
                />
              </div>
              <div className={styles.col}>
                <Controller
                  control={control}
                  name="hours"
                  render={({ field: { value, onChange }, fieldState: { error } }) => (
                    <Input
                      className={styles.label}
                      name="Hs"
                      type="number"
                      value={value}
                      onChange={onChange}
                      error={error?.message}
                    />
                  )}
                />
              </div>
              <div className={styles.col}>
                <Button text="+" />
              </div>
            </div>
          </form>
        </div>
      </Modal>
      <h2 className={styles.h2}>Employee &gt; Home</h2>
      <table className={styles.table}>
        <thead>
          <tr>
            <th colSpan={9} className={styles.date}>
              <Button text="<" />
              {formatDate(startDate)} - {formatDate(endDate)}
              <Button text=">" />
            </th>
          </tr>
          <tr>
            <th>Project</th>
            <th>Sun</th>
            <th>Mon</th>
            <th>Tue</th>
            <th>Wed</th>
            <th>Thu</th>
            <th>Fri</th>
            <th>Sat</th>
            <th>Total hs</th>
          </tr>
        </thead>
        <tbody>
          {projectsEmployee.map((project, key) => (
            <TableRow key={key} project={project} tasks={tasksEmployee} />
          ))}
        </tbody>
      </table>
      <div className={styles.buttonContainer}>
        <Button text="Add new progress" handler={openModal} />
      </div>
    </div>
  );
};
export default EmployeeHome;
