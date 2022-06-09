import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import styles from './Task.module.css';
import Input from '../Shared/Input';
import Select from '../Shared/SelectDropdown';
import Button from '../Shared/Button';
import Modal from '../Shared/Modal';
import LoadingScreen from '../Shared/LoadingScreen';

const TaskForm = () => {
  const [descriptionValue, setDescriptionValue] = useState('');
  const [workedHoursValue, setWorkedHoursValue] = useState('');
  const [dateValue, setDateValue] = useState('');
  const [projectNameValue, setProjectNameValue] = useState('');

  const [isLoading, setLoading] = useState('');

  const [projectId, setProjectId] = useState('');
  const [projects, setProjects] = useState([]);

  const [isOpen, setIsOpen] = useState(false);
  const [requestType, setRequestType] = useState('POST');
  const [modalTitle, setModalTitle] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    setLoading(true);
    const params = new URLSearchParams(window.location.search);
    const taskId = params.get('id');
    if (taskId) {
      setRequestType('PUT');
      fetch(`${process.env.REACT_APP_API_URL}/tasks/${taskId}`)
        .then(async (response) => {
          if (response.status !== 200) {
            const { message } = await response.json();
            throw new Error(message);
          }
          return response.json();
        })
        .then((response) => {
          setDescriptionValue(response.data.description);
          setDateValue(response.data.date.slice(0, 10));
          setWorkedHoursValue(response.data.workedHours);
          setProjectNameValue(response.data.projectId.name);
          setProjectId(response.data.projectId._id);
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => setLoading(false));
    }
    fetch(`${process.env.REACT_APP_API_URL}/projects/`)
      .then(async (response) => {
        if (response.status !== 200) {
          const { message } = await response.json();
          throw new Error(message);
        }
        return response.json();
      })
      .then((response) => {
        setProjects(
          response.data.map((project) => ({
            value: project._id,
            label: project.name
          }))
        );
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => setLoading(false));
  }, []);

  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      const params = new URLSearchParams(window.location.search);
      const tasksId = params.get('id');
      let url;
      const options = {
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          description: descriptionValue,
          workedHours: workedHoursValue,
          date: dateValue,
          projectId: projectId
        })
      };
      if (tasksId) {
        options.method = 'PUT';
        url = `${process.env.REACT_APP_API_URL}/tasks/${tasksId}`;
      } else {
        options.method = 'POST';
        setRequestType('POST');
        url = `${process.env.REACT_APP_API_URL}/tasks`;
      }
      const response = await fetch(url, options);
      const data = await response.json();
      {
        if (data.error) {
          setModalTitle('An error validation has ocurred.');
          setMessage('Check the fields.');
          setIsOpen(!isOpen);
        } else {
          setModalTitle(requestType === 'POST' ? 'Task Created' : 'Task Updated');
          setMessage(requestType === 'POST' ? 'Task Created' : 'Task Updated');
          setIsOpen(!isOpen);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const history = useHistory();
  const routeChange = () => {
    let path = `/tasks`;
    history.push(path);
  };

  if (isLoading) {
    return (
      <div className={styles.loadingDiv}>
        <LoadingScreen />
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={onSubmit}>
        <h2>Task</h2>
        <Input
          name="Description"
          type="text"
          value={descriptionValue}
          placeholder="Description here..."
          onChange={setDescriptionValue}
        />
        <Input
          name="Worked hours"
          type="text"
          value={workedHoursValue}
          placeholder="Hours here..."
          onChange={setWorkedHoursValue}
        />
        <div>
          <Select
            name="Projects"
            value={projectNameValue}
            onChange={(e) => {
              setProjectId(e.target.value);
              setProjectNameValue(e.target.value);
            }}
            options={projects}
          />
        </div>
        <Input name="Date" type="date" value={dateValue} onChange={setDateValue} />
        <div className={styles.buttonContainer}>
          <Button text="Return" handler={routeChange} />
          <Button text={requestType === 'POST' ? 'Save Task' : 'Update Task'} handler={onSubmit} />
          <Modal modalTitle={modalTitle} isOpen={isOpen} handleClose={() => setIsOpen(!isOpen)}>
            <p>{message}</p>
            <div>
              <Button text="Accept" handler={routeChange} />
            </div>
          </Modal>
        </div>
      </form>
    </div>
  );
};

export default TaskForm;
