import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { getProjects, deleteProject } from 'redux/projects/thunks';
import { setProject } from 'redux/projects/actions';
import { Button, Table, LoadingScreen, Modal, Search } from 'components/Shared';
import styles from './list.module.css';

const Projects = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const projects = useSelector((state) => state.projects.list);
  const loading = useSelector((state) => state.projects.loading);
  const error = useSelector((state) => state.projects.error);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [idToDelete, setIdToDelete] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredList, setFilteredList] = useState(projects);
  const [isTable, setIsTable] = useState(false);
  const [employeesData, setEmployeesData] = useState([]);
  const [modalTitle, setModalTitle] = useState('');

  const column = [
    { heading: 'Name', value: 'name' },
    { heading: 'Status', value: 'status' },
    { heading: 'Description', value: 'description' },
    { heading: 'Start date', value: 'startDate' },
    { heading: 'End date', value: 'endDate' },
    { heading: 'Employees', value: 'employees' }
  ];

  const columnEmployees = [
    { heading: 'First Name', value: 'employeeId.firstName' },
    { heading: 'Last Name', value: 'employeeId.lastName' },
    { heading: 'Role', value: 'role' },
    { heading: 'Rate', value: 'rate' }
  ];

  const handleArray = (employees) => {
    setEmployeesData(employees);
    setIsTable(true);
    setModalTitle('Employees in Project');
    openModal();
  };

  const handleSetProject = (id) => {
    dispatch(setProject(id));
    history.push('/projects/form');
  };

  const buttonDelete = (id) => {
    setModalTitle('Delete Project');
    setIsTable(false);
    setIdToDelete(id);
    openModal();
  };

  useEffect(() => {
    if (!projects.length) {
      dispatch(getProjects());
      if (error) {
        openModal();
      }
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
      <Modal modalTitle={modalTitle} isOpen={isModalOpen} handleClose={closeModal}>
        {isTable && <Table data={employeesData} column={columnEmployees} modal={handleArray} />}
        {isTable && (
          <div>
            <Button text="OK" handler={closeModal} />
          </div>
        )}
        {!isTable && <p>{error ? error : 'Are you sure you want to delete a Project?'}</p>}
        {!isTable && (
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
          </div>
        )}
      </Modal>
      <div className={styles.flex}>
        <Table
          data={filteredList}
          deleteItem={buttonDelete}
          column={column}
          editItem={handleSetProject}
          buttons={true}
          modal={handleArray}
          arrayName={'Employees'}
        ></Table>
      </div>
    </section>
  );
};

export default Projects;
