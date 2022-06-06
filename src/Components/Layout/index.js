import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Header from '../Shared/Header';
import Sidebar from '../Shared/Sidebar';
import Footer from '../Shared/Footer';
import Admins from '../Admins';
import AdminForm from '../Admin';
import SuperAdmins from '../SuperAdmins';
import SuperAdminForm from '../SuperAdmin';
import Home from '../Home';
import styles from './layout.module.css';
import Employees from '../Employees';
import EmployeeForm from '../Employee';
import Projects from '../Projects';
import ProjectForm from '../Project';
import TimeSheets from '../TimeSheets';
import TimeSheetForm from '../TimeSheet';
import Tasks from '../Tasks';
import TaskForm from '../Task';

function Layout() {
  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.mainDiv}>
        <div className={styles.divSideBar}>
          <Sidebar />
        </div>
        <div className={styles.divSwitch}>
          <Switch>
            <Route exact path="/home" component={Home} />
            <Route exact path="/admins" component={Admins} />
            <Route exact path="/admins/form" component={AdminForm} />
            <Route exact path="/super-admins" component={SuperAdmins} />
            <Route exact path="/super-admins/form" component={SuperAdminForm} />
            <Route exact path="/employees" component={Employees} />
            <Route exact path="/employees/form" component={EmployeeForm} />
            <Route exact path="/projects" component={Projects} />
            <Route exact path="/projects/form" component={ProjectForm} />
            <Route exact path="/time-sheets" component={TimeSheets} />
            <Route exact path="/time-sheets/form" component={TimeSheetForm} />
            <Route exact path="/Tasks" component={Tasks} />
            <Route exact path="/Tasks/form" component={TaskForm} />
            <Route exact path="/">
              <Redirect to="/home" />
            </Route>
          </Switch>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Layout;
