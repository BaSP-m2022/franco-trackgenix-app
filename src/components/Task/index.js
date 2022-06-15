import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { clearError } from '../../redux/tasks/actions';
import { getTasks, postTask, putTask } from '../../redux/tasks/thunks';
import { getProjects } from '../../redux/projects/thunks';

import Input from '../Shared/Input';
import SelectDropdown from '../Shared/SelectDropdown';
import Button from '../Shared/Button';
import Modal from '../Shared/Modal';
import LoadingScreen from '../Shared/LoadingScreen';
import styles from './Task.module.css';

const TaskForm = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const task = useSelector((state) => state.tasks.task);
  const loading = useSelector((state) => state.tasks.loading);
  const error = useSelector((state) => state.tasks.error);
  const projects = useSelector((state) => state.projects.list);

  const [description, setDescription] = useState('');
  const [workedHours, setWorkedHours] = useState('');
  const [date, setDate] = useState('');

  const [projectId, setProjectId] = useState('');

  const [isOpen, setIsOpen] = useState(false);
  const [requestType, setRequestType] = useState('POST');
  const [modalTitle, setModalTitle] = useState('');
  const [modalText, setModalText] = useState('');

  useEffect(() => {
    dispatch(getProjects());
  }, []);

  useEffect(() => {
    if (task._id) {
      setDescription(task.description);
      setDate(formatDate(task.date));
      setWorkedHours(task.workedHours);
      setProjectId(task.projectId._id);
      setRequestType('PUT');
    }
  }, [error]);

  const formatDate = (date) => {
    var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();
    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;
    return [year, month, day].join('-');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const body = JSON.stringify({
      description,
      date,
      workedHours,
      projectId
    });

    if (requestType === 'PUT') {
      dispatch(putTask(task._id, body));
      setModalTitle('Task Updated');
      setModalText('Task has been updated');
    } else {
      dispatch(postTask(body));
      setModalTitle('Task Added');
      setModalText('Task has been added');
    }
    openModal();
  };

  const routeChange = () => {
    dispatch(getTasks());
    history.push('/tasks');
  };

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  if (loading) {
    return (
      <div className={styles.loadingDiv}>
        <LoadingScreen />
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <form className={styles.form}>
        <h2 className={styles.task}>Task</h2>
        <Input
          name="Description"
          type="text"
          value={description}
          placeholder="Description here..."
          onChange={setDescription}
        />
        <Input
          name="Worked hours"
          type="text"
          value={workedHours}
          placeholder="Hours here..."
          onChange={setWorkedHours}
        />
        <div className={styles.select}>
          <SelectDropdown
            name="Projects"
            value={projectId}
            onChange={(e) => {
              setProjectId(e.target.value);
            }}
            options={projects.map((project) => ({
              label: project.name,
              value: project._id
            }))}
          />
        </div>
        <Input name="Date" type="date" value={date} onChange={setDate} />
        <div className={styles.buttonContainer}>
          <Button
            text="Return"
            handler={() => {
              dispatch(clearError());
              routeChange();
            }}
          />
          <Button handler={handleSubmit} text={requestType === 'PUT' ? 'Update' : 'Save'} />
          <Modal modalTitle={error ? 'error' : modalTitle} isOpen={isOpen} handleClose={closeModal}>
            <p className={styles.message}>{error ? error : modalText}</p>
            <div>
              <Button text="OK" handler={!error ? routeChange : closeModal} />
            </div>
          </Modal>
        </div>
      </form>
    </div>
  );
};

export default TaskForm;
