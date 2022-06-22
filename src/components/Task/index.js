import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { clearError } from 'redux/tasks/actions';
import { getTasks, postTask, putTask } from 'redux/tasks/thunks';
import { getProjects } from 'redux/projects/thunks';
import { useForm, Controller } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import Joi from 'joi';
import { formatDate, capitalizeFirstLetter } from '../../utils/formatters';
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
  const errorR = useSelector((state) => state.tasks.error);
  const projects = useSelector((state) => state.projects.list);

  const [projectsOptions, setProjectsOptions] = useState([]);

  const [isOpen, setIsOpen] = useState(false);
  const [requestType, setRequestType] = useState('POST');
  const [modalTitle, setModalTitle] = useState('');
  const [modalText, setModalText] = useState('');

  const schema = Joi.object({
    description: Joi.string().min(3).max(50).required(),
    workedHours: Joi.number().min(1).required(),
    projectId: Joi.string().required(),
    date: Joi.date().required()
  });

  const { handleSubmit, setValue, control } = useForm({
    defaultValues: {
      description: '',
      date: '',
      workedHours: '',
      projectId: ''
    },
    resolver: joiResolver(schema)
  });

  useEffect(() => {
    if (!projects.length) {
      dispatch(getProjects());
    }
    setProjectsOptions([...projects.map((item) => ({ value: item._id, label: item.name }))]);
  }, [projects]);

  useEffect(() => {
    if (task._id) {
      setValue('description', capitalizeFirstLetter(task.description));
      setValue('date', formatDate(task.date));
      setValue('workedHours', task.workedHours);
      setValue('projectId', task.projectId?._id);
      setRequestType('PUT');
    }
  }, [task]);

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
          render={({ field: { value, onChange }, fieldState: { error } }) => (
            <Input
              name="Description"
              type="text"
              value={value}
              placeholder="Description here..."
              onChange={onChange}
              error={error?.message}
            />
          )}
        />
        <Controller
          control={control}
          name="workedHours"
          render={({ field: { value, onChange }, fieldState: { error } }) => (
            <Input
              name="Worked hours"
              type="text"
              value={value}
              placeholder="Hours here..."
              onChange={onChange}
              error={error?.message}
            />
          )}
        />
        <div className={styles.select}>
          <Controller
            control={control}
            name="projectId"
            render={({ field: { value, onChange }, fieldState: { error } }) => (
              <SelectDropdown
                name="Projects"
                value={value}
                onChange={onChange}
                options={projectsOptions}
                error={error?.message}
              />
            )}
          />
        </div>
        <Controller
          control={control}
          name="date"
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
          <Modal
            modalTitle={errorR ? 'error' : modalTitle}
            isOpen={isOpen}
            handleClose={closeModal}
          >
            <p className={styles.message}>{errorR ? errorR : modalText}</p>
            <div>
              <Button text="OK" handler={!errorR ? routeChange : closeModal} />
            </div>
          </Modal>
        </div>
      </form>
    </div>
  );
};

export default TaskForm;
