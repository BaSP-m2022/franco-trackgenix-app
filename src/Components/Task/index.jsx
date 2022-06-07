import { useState, useEffect } from 'react';
import styles from './Task.module.css';
import Input from '../Shared/Input';
import Select from '../Shared/SelectDropdown';
import Button from '../Shared/Button';
import { useHistory } from 'react-router-dom';
import Modal from '../Shared/Modal';
// import LoadingScreen from '../Shared/LoadingScreen';

const TaskForm = () => {
  const [descriptionValue, setDescriptionValue] = useState('');
  const [workedHoursValue, setWorkedHoursValue] = useState('');
  const [dateValue, setDateValue] = useState('');
  const [projectNameValue, setProjectNameValue] = useState('');
  const [isLoading, setLoading] = useState('');
  const [projectId, setProjectId] = useState('');
  const [projects, setProjects] = useState([]);
  let errorAlert = '';

  useEffect(() => {
    setLoading(true);
    const params = new URLSearchParams(window.location.search);
    const taskId = params.get('id');
    if (taskId) {
      fetch(`${process.env.REACT_APP_API_URL}/tasks/${taskId}`)
        .then((response) => {
          if (response.status !== 200) {
            return response.json().then(({ message }) => {
              throw new Error(message);
            });
          }
          return response.json();
        })
        .then((response) => {
          setDescriptionValue(response.data.description);
          let date = response.data.date.slice(0, 10);
          setDateValue(date);
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
      .then((response) => {
        if (response.status !== 200) {
          return response.json().then(({ message }) => {
            throw new Error(message);
          });
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

  // const onChangeDescriptionValue = (event) => {
  //   setDescriptionValue(event.target.value);
  // };
  // const onChangeWorkedHoursValue = (event) => {
  //   setWorkedHoursValue(event.target.value);
  // };
  // const onChangeDateValue = (event) => {
  //   setDateValue(event.target.value);
  // };
  // const onChangeProjectNameValue = (event) => {
  //   setProjectNameValue(event.target.value);
  //   setProjectId(event.target.value);
  // };

  const onSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
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
          errorAlert += data.error;
          window.alert(errorAlert);
          setLoading(false);
        } else {
          if (tasksId) {
            window.alert('Task modified.');
          } else {
            window.alert('Task created.');
          }
          setLoading(false);
          window.location.href = '/tasks';
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
          // onChange={onChangeDescriptionValue}
          onChange={setDescriptionValue}
          disabled={isLoading}
        />
        <Input
          name="Worked hours"
          type="text"
          value={workedHoursValue}
          placeholder="Hours here..."
          // onChange={onChangeWorkedHoursValue}
          onChange={setWorkedHoursValue}
          disabled={isLoading}
        />
        <Select
          name="Projects"
          value={projectNameValue}
          // onChange={onChangeProjectNameValue}
          onChange={setProjectNameValue}
          options={projects}
          required={true}
          disabled={isLoading}
        />
        <Input name="Date" type="date" value={dateValue} onChange={setDateValue} />
        <div>
          <Button text="Return" handler={routeChange} />
          <Button text="Submit" handler={onSubmit} />
          <Modal>
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
