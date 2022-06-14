import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getTasks, deleteTask } from '../../redux/tasks/thunks';
import { setTask } from '../../redux/tasks/actions';
import Table from '../Shared/Table';
import LoadingScreen from '../Shared/LoadingScreen';
import Modal from '../Shared/Modal';
import Button from '../Shared/Button';
import Search from '../Shared/Search-bar';
import styles from './tasks.module.css';

const Tasks = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const tasks = useSelector((state) => state.tasks.list);
  const loading = useSelector((state) => state.tasks.loading);
  const error = useSelector((state) => state.tasks.error);

  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [taskId, setTaskId] = useState('');
  const [filteredList, setFilteredList] = useState(tasks);

  const column = [
    { heading: 'Id', value: '_id' },
    { heading: 'Description', value: 'description' },
    { heading: 'Worked Hours', value: 'workedHours' },
    { heading: 'Project', value: 'projectId.name' },
    { heading: 'Date', value: 'date' }
  ];

  useEffect(() => {
    if (!tasks.length) {
      dispatch(getTasks());
    }
    if (error) {
      openModal();
    }
  }, [error]);

  useEffect(() => {
    setFilteredList(
      tasks.filter((item) => item.description.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  }, [tasks, searchQuery]);

  const handleSetTask = (id) => {
    dispatch(setTask(id));
    history.push('/tasks/form');
  };

  const buttonDelete = (id) => {
    setTaskId(id);
    openModal();
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
    <section className={styles.containerTask}>
      <Modal
        modalTitle={'Tasks'}
        isOpen={isOpen}
        handleClose={() => {
          closeModal();
        }}
      >
        <p>{error ? error : 'Are you sure to delete a Task?'}</p>
        <div>
          {error ? (
            <div>
              <Button text="Close" handler={closeModal} />
            </div>
          ) : (
            <div>
              <Button
                text="Yes"
                type="delete"
                handler={() => {
                  dispatch(deleteTask(taskId));
                  closeModal();
                }}
              />
              <Button text="No" handler={closeModal} />
            </div>
          )}
        </div>
      </Modal>
      <h2 className={styles.h2Task}>Tasks</h2>
      <div className={styles.containerTaskBS}>
        <Button
          text={'Add Task'}
          handler={() => {
            dispatch(setTask());
            history.push('/tasks/form');
          }}
        />
        <Search
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          placeholder={'Search by Id'}
        />
      </div>
      <Table
        data={searchQuery.length ? filteredList : tasks}
        column={column}
        deleteItem={buttonDelete}
        editItem={handleSetTask}
      />
    </section>
  );
};

export default Tasks;
