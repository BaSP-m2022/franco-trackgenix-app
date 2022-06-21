import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { clearError } from 'redux/tasks/actions';
import { getTasks, postTask, putTask } from 'redux/tasks/thunks';
import { getProjects } from 'redux/projects/thunks';
import { useForm, Controller } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import Joi from 'joi';
import Input from 'components/Shared/Input';
import SelectDropdown from 'components/Shared/SelectDropdown';
import Button from 'components/Shared/Button';
import Modal from 'components/Shared/Modal';
import LoadingScreen from 'components/Shared/LoadingScreen';
import styles from './Task.module.css';

const TaskForm = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const task = useSelector((state) => state.tasks.task);
  const loading = useSelector((state) => state.tasks.loading);
  const error = useSelector((state) => state.tasks.error);
  const projects = useSelector((state) => state.projects.list);

  const [projectsOptions, setProjectsOptions] = useState([]);

  const [isOpen, setIsOpen] = useState(false);
  const [requestType, setRequestType] = useState('POST');
  const [modalTitle, setModalTitle] = useState('');
  const [modalText, setModalText] = useState('');

  const {
    handleSubmit,
    // formState: { errors },
    reset,
    control
  } = useForm({
    mode: 'onChange',
    resolver: joiResolver(schema)
  });

  const schema = Joi.object({
    description: Joi.string().min(3).max(50).required(),
    workedHours: Joi.number().min(1).required(),
    projectId: Joi.string().required(),
    date: Joi.date().required()
  });

  useEffect(() => {
    if (!projects.length) {
      dispatch(getProjects());
    }
    setProjectsOptions([...projects.map((item) => ({ value: item._id, label: item.name }))]);
  }, [projects]);

  useEffect(() => {
    if (task._id) {
      reset({
        description: task.description,
        date: formatDate(task.date),
        workedHours: task.workedHours,
        projectId: task.projectId._id
      });
      setRequestType('PUT');
    }
  }, [error]);

  const onSubmit = async (data) => {
    const body = JSON.stringify({
      description: data.description,
      date: data.date,
      workedHours: data.workedHours,
      projectId: data.projectId
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

  const formatDate = (date) => {
    let d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();
    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;
    return [year, month, day].join('-');
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
        <Controller
          control={control}
          name="description"
          render={({ field: { value, onChange }, fieldState: { errors } }) => (
            <Input
              name="Description"
              type="text"
              value={value}
              placeholder="Description here..."
              onChange={onChange}
              error={errors.description?.message}
            />
          )}
        />
        <Controller
          control={control}
          name="workedHours"
          render={({ field: { value, onChange }, fieldState: { errors } }) => (
            <Input
              name="Worked hours"
              type="text"
              value={value}
              placeholder="Hours here..."
              onChange={onChange}
              error={errors.workedHours?.message}
            />
          )}
        />
        <div className={styles.select}>
          <Controller
            control={control}
            name="firstName"
            render={({ field: { value, onChange }, fieldState: { errors } }) => (
              <SelectDropdown
                name="Projects"
                value={value}
                onChange={
                  onChange /*(e) => {
                setProjectId(e.target.value);
              }*/
                }
                options={projectsOptions}
                error={errors.projectId?.message}
              />
            )}
          />
        </div>
        <Controller
          control={control}
          name="firstName"
          render={({ field: { value, onChange }, fieldState: { error } }) => (
            <Input
              name="Date"
              type="date"
              value={value}
              onChange={onChange}
              error={error?.message}
            />
          )}
        />
        <div className={styles.buttonContainer}>
          <Button
            text="Return"
            handler={() => {
              dispatch(clearError());
              routeChange();
            }}
          />
          <Button
            handler={handleSubmit(onSubmit)}
            text={requestType === 'PUT' ? 'Update' : 'Save'}
          />
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
