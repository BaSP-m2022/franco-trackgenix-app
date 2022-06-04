import { useState, useEffect } from 'react';
import styles from './Task.module.css';
import Input from './Input';
import Select from './Select';

const Form = () => {
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
  const onChangeDescriptionValue = (event) => {
    setDescriptionValue(event.target.value);
  };
  const onChangeWorkedHoursValue = (event) => {
    setWorkedHoursValue(event.target.value);
  };
  const onChangeDateValue = (event) => {
    setDateValue(event.target.value);
  };
  const onChangeProjectNameValue = (event) => {
    setProjectNameValue(event.target.value);
    setProjectId(event.target.value);
  };

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

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={onSubmit}>
        <h2>task</h2>
        <div>
          <label className={styles.label}>Description</label>
          <Input
            name="description"
            value={descriptionValue}
            onChange={onChangeDescriptionValue}
            type="text"
            required
            disabled={isLoading}
          />
        </div>
        <div>
          <label className={styles.label}>Worked Hours</label>
          <Input
            name="workedHours"
            value={workedHoursValue}
            onChange={onChangeWorkedHoursValue}
            type="text"
            required
            disabled={isLoading}
          />
        </div>
        <div>
          <label className={styles.label}>Project Name</label>
          <Select
            name="projects"
            value={projectNameValue}
            onChange={onChangeProjectNameValue}
            options={projects}
            disabled={isLoading}
          />
        </div>
        <div>
          <label className={styles.label}>Date</label>
          <Input
            name="date"
            value={dateValue}
            onChange={onChangeDateValue}
            type="date"
            required
            disabled={isLoading}
          />
        </div>
        <button className={styles.btn} disabled={isLoading} type="submit">
          Save
        </button>
      </form>
    </div>
  );
};

export default Form;
