import styles from './projects.module.css';
import { useEffect, useState } from 'react';
import Button from '../Shared/Button';
import Table from '../Shared/Table';
import LoadingScreen from '../Shared/LoadingScreen';
import Modal from '../Shared/Modal';
import Search from '../Shared/Search-bar';

function Projects() {
  const [projects, setProjects] = useState([]);
  const [data, setData] = useState([]);
  const [untouchedData, setUntouchedData] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [idToDelete, setIdToDelete] = useState();
  const [search, setSearch] = useState();

  const column = [
    { heading: 'Id', value: '_id' },
    { heading: 'Name', value: 'name' },
    { heading: 'Status', value: 'status' },
    { heading: 'Description', value: 'description' },
    { heading: 'Start date', value: 'startDate' },
    { heading: 'End date', value: 'endDate' }
  ];

  useEffect(async () => {
    try {
      setLoading(true);
      const response = await fetch(`${process.env.REACT_APP_API_URL}/projects`);
      const data = await response.json();
      setProjects(data.data);
      setData(data.data);
      setUntouchedData(data.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, []);

  const deleteItem = (_id) => {
    try {
      setLoading(true);
      setIsModalOpen(true);
      setIdToDelete(_id);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  async function deleteProject() {
    try {
      setLoading(true);
      setIsModalOpen(true);
      setLoading(false);
      await fetch(`${process.env.REACT_APP_API_URL}/projects/${idToDelete}`, {
        method: 'DELETE'
      });
      setIsModalOpen(false);
    } catch (error) {
      console.error(error);
    }
    setProjects(projects.filter((projectItem) => projectItem._id !== idToDelete));
    setData(data.filter((projects) => projects._id !== idToDelete));
    setUntouchedData(untouchedData.filter((projects) => projects._id !== idToDelete));
  }

  const setSearchQuery = (value) => {
    setSearch(value);
    setData(untouchedData.filter((project) => project._id.includes(value)));
  };
  if (isLoading) {
    return (
      <div className={styles.loading}>
        <LoadingScreen />
      </div>
    );
  }
  return (
    <section className={styles.container}>
      <h2 className={styles.title}>Projects</h2>
      <div className={styles.add}>
        <Button link={'/projects/form'} text={'Add Project'}></Button>
        <div className={styles.search}>
          <Search
            searchQuery={search}
            setSearchQuery={setSearchQuery}
            placeholder="Search for Projects"
          />
        </div>
      </div>
      <Modal
        modalTitle={'Delete Project'}
        isOpen={isModalOpen}
        handleClose={() => setIsModalOpen(false)}
      >
        <p>Are you sure you want to delete this Project?</p>
        <div>
          <Button text="Yes" type="delete" handler={() => deleteProject(idToDelete)} />
          <Button text="No" handler={() => setIsModalOpen(false)} />
        </div>
      </Modal>
      {isLoading && <LoadingScreen />}
      <div className={styles.flex}>
        <Table column={column} data={data} entity={'project'} deleteItem={deleteItem}></Table>
      </div>
    </section>
  );
}

export default Projects;
