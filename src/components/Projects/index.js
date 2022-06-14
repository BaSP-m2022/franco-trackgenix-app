import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import styles from './projects.module.css';
import Button from '../Shared/Button';
import Table from '../Shared/Table';
import LoadingScreen from '../Shared/LoadingScreen';
import Modal from '../Shared/Modal';
import Search from '../Shared/Search-bar';
import { getProjects, deleteProject } from '../../redux/projects/thunks';
import { setProject } from '../../redux/projects/actions';

const Projects = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const projects = useSelector((state) => state.projects.list);
  const loading = useSelector((state) => state.projects.loading);
  const error = useSelector((state) => state.projects.error);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [idToDelete, setIdToDelete] = useState();
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredList, setFilteredList] = useState(projects);

  const column = [
    { heading: 'Id', value: '_id' },
    { heading: 'Name', value: 'name' },
    { heading: 'Status', value: 'status' },
    { heading: 'Description', value: 'description' },
    { heading: 'Start date', value: 'startDate' },
    { heading: 'End date', value: 'endDate' }
  ];

  const handleSetProject = (id) => {
    dispatch(setProject(id));
    history.push('/projects/form');
  };

  const buttonDelete = (id) => {
    setIdToDelete(id);
    openModal();
  };

  useEffect(() => {
    if (!projects.length) {
      dispatch(getProjects());
    }
    if (error) {
      openModal();
    }
  }, [error]);

  useEffect(() => {
    setFilteredList(
      projects.filter((project) => project.name.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  }, [projects, searchQuery]);

  const delProject = () => {
    dispatch(deleteProject(idToDelete));
    closeModal();
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  if (loading) {
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
        <Button
          text={'Add new Project'}
          handler={() => {
            dispatch(setProject());
            history.push('/projects/form');
          }}
        ></Button>
        <div className={styles.search}>
          <Search
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            placeholder={'Search for project name'}
          />
        </div>
      </div>
      <Modal modalTitle={'Delete Project'} isOpen={isModalOpen} handleClose={closeModal}>
        <p>{error ? error : 'Are you sure you want to delete a Project?'}</p>
        <div>
          {error ? (
            <div>
              <Button text="Close" handler={closeModal} />
            </div>
          ) : (
            <div>
              <Button text="Yes" type="delete" handler={delProject} />
              <Button text="No" handler={closeModal} />
            </div>
          )}
          ;
        </div>
      </Modal>
      <div className={styles.flex}>
        <Table
          data={filteredList}
          deleteItem={buttonDelete}
          column={column}
          editItem={handleSetProject}
        ></Table>
      </div>
    </section>
  );
};

export default Projects;
