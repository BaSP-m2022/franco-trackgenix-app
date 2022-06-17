import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getTimeSheets, postTimeSheet, putTimeSheet } from '../../redux/timeSheets/thunks';
import { clearError } from '../../redux/timeSheets/actions';
import { getEmployees } from '../../redux/employees/thunks';
import { getTasks } from '../../redux/tasks/thunks';
import Modal from '../Shared/Modal';
import Button from '../Shared/Button';
import Input from '../Shared/Input';
import LoadingScreen from '../Shared/LoadingScreen';
import SelectDropdown from '../Shared/SelectDropdown';
import styles from './form.module.css';

const TimeSheetForm = () => {
  const [taskValue, setTaskValue] = useState('');
  const [totalHoursValue, setTotalHoursValue] = useState('');
  const [statusValue, setStatusValue] = useState('');
  const [startDateValue, setStartDateValue] = useState('');
  const [endDateValue, setEndDateValue] = useState('');
  const [employeeIdValue, setEmployeeIdValue] = useState('');

  const [employeeOptions, setEmployeeOptions] = useState([]);
  const [tasksOptions, setTasksOptions] = useState([]);

  const [isOpen, setIsOpen] = useState(false);
  const [requestType, setRequestType] = useState('POST');
  const [modalText, setModalText] = useState('');
  const [modalTitle, setModalTitle] = useState('');

  const history = useHistory();

  const dispatch = useDispatch();

  const employees = useSelector((state) => state.employees.list);
  const tasks = useSelector((state) => state.tasks.list);
  const timeSheet = useSelector((state) => state.timeSheets.timeSheet);
  const loading = useSelector((state) => state.timeSheets.loading);
  const error = useSelector((state) => state.timeSheets.error);

  const statusOption = [
    { value: 'To do', label: 'To do' },
    { value: 'In progress', label: 'In progress' },
    { value: 'Done', label: 'Done' }
  ];

  const onChangeStatusInput = (event) => {
    setStatusValue(event.target.value);
  };

  const onChangeTaskInput = (event) => {
    if (taskValue.indexOf(event.target.value) > -1) {
      setTaskValue(taskValue.filter((task) => task !== event.target.value));
    } else {
      setTaskValue([...taskValue, event.target.value]);
    }
  };

  const onChangeEmployeeIdInput = (event) => {
    setEmployeeIdValue(event.target.value);
  };

  useEffect(() => {
    if (!employees.length) {
      dispatch(getEmployees());
    }
    setEmployeeOptions(
      employees.map(({ _id, firstName, lastName }) => ({
        value: _id,
        label: `${firstName} ${lastName}`
      }))
    );
  }, [employees]);

  useEffect(() => {
    if (!tasks.length) {
      dispatch(getTasks());
    }
    setTasksOptions(tasks.map(({ _id, description }) => ({ value: _id, label: description })));
  }, [tasks]);

  useEffect(() => {
    console.log(timeSheet);
    if (timeSheet._id) {
      setTaskValue(timeSheet.task);
      setTotalHoursValue(timeSheet.totalHours);
      setStatusValue(timeSheet.status);
      setStartDateValue(timeSheet.startDate.slice(0, 10));
      setEndDateValue(timeSheet.endDate.slice(0, 10));
      setEmployeeIdValue(timeSheet.employeeId);
      setRequestType('PUT');
    }
  }, [error]);

  const routeChange = () => {
    dispatch(getTimeSheets());
    const path = `/time-sheets`;
    history.push(path);
  };

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  if (loading) {
    return (
      <div className={styles.loading}>
        <LoadingScreen />
      </div>
    );
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const body = JSON.stringify({
      tasks: taskValue,
      totalHours: totalHoursValue,
      status: statusValue,
      startDate: startDateValue,
      endDate: endDateValue,
      employeeId: employeeIdValue
    });
    if (requestType === 'PUT') {
      setModalTitle('TimeSheet Updated');
      setModalText('TimeSheet has been updated');
      dispatch(putTimeSheet(timeSheet._id, body));
      openModal();
    } else {
      setModalTitle('TimeSheet Created');
      setModalText('TimeSheet has been created');
      dispatch(postTimeSheet(body));
      openModal();
    }
  };

  return (
    <div className={styles.container}>
      <h3>{requestType === 'PUT' ? 'Update Time Sheet' : 'Add Time Sheet'}</h3>
      <form className={styles.form}>
        <div className={styles.inputs}>
          <div className={styles.select}>
            <SelectDropdown
              name="Task"
              onChange={onChangeTaskInput}
              value={taskValue}
              required="true"
              type="text"
              options={tasksOptions}
              disabled={loading}
            />
          </div>
          <div className={styles.input}>
            <Input
              name="Total Hours"
              placeholder="Total Hours"
              type="number"
              value={totalHoursValue}
              onChange={setTotalHoursValue}
              disabled={loading}
            />
          </div>
          <div className={styles.select}>
            <SelectDropdown
              name="status"
              onChange={onChangeStatusInput}
              value={statusValue}
              props="status"
              required="true"
              type="status"
              options={statusOption}
              disabled={loading}
            />
          </div>
          <div className={styles.input}>
            <Input
              name="Start Date"
              placeholder="Start Date"
              type="date"
              value={startDateValue}
              onChange={setStartDateValue}
              disabled={loading}
            />
          </div>
          <div className={styles.input}>
            <Input
              name="End Date"
              placeholder="End Date"
              type="date"
              value={endDateValue}
              onChange={setEndDateValue}
              disabled={loading}
            />
          </div>
          <div className={styles.select}>
            <SelectDropdown
              name="Employees"
              onChange={onChangeEmployeeIdInput}
              value={employeeIdValue}
              props="employeeId"
              required="true"
              type="text"
              options={employeeOptions}
              disabled={loading}
            />
          </div>
          <div>
            <div className={styles.buttonDiv}>
              <Button
                text="Return"
                handler={() => {
                  dispatch(clearError());
                  routeChange();
                }}
              />
              <Button handler={handleSubmit} text={requestType === 'PUT' ? 'Update' : 'Save'} />
            </div>
            <Modal
              modalTitle={error ? 'error' : modalTitle}
              isOpen={isOpen}
              handleClose={closeModal}
            >
              <p className={styles.message}>{error ? error : modalText}</p>
              <div>
                <Button text="OK" handler={!error ? routeChange : closeModal} />
              </div>
            </Modal>
          </div>
        </div>
      </form>
    </div>
  );
};

export default TimeSheetForm;
