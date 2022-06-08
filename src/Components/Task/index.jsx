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
  const [errorMessage, setErrorMessage] = useState('');

  const [projectId, setProjectId] = useState('');
  const [projects, setProjects] = useState([]);

  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setLoading(true);
    const params = new URLSearchParams(window.location.search);
    const taskId = params.get('id');
    if (taskId) {
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
          let date = response.data.date.slice(0, 10);
          setDateValue(date);
          setWorkedHoursValue(response.data.workedHours);
          setProjectNameValue(response.data.projectId.name);
          console.log(projectNameValue);
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
        url = `${process.env.REACT_APP_API_URL}/tasks`;
      }
      const response = await fetch(url, options);
      const data = await response.json();
      {
        if (data.error) {
          setErrorMessage(data.message);
        } else {
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
        <Select
          name="Projects"
          value={projectNameValue}
          onChange={(e) => setProjectId(e.target.value)}
          options={projects}
        />
        {console.log(projectId)}
        <Input name="Date" type="date" value={dateValue} onChange={setDateValue} />
        <span>
          {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}
          {isLoading && <LoadingScreen />}
        </span>
        <div className={styles.buttonContainer}>
          <Button text="Return" handler={routeChange} />
          <Button text="Submit" handler={onSubmit} />
          <Modal isOpen={isOpen} handleClose={() => setIsOpen(!isOpen)}>
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
