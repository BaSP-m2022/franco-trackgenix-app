import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Header from 'components/Shared/Header';
import Sidebar from 'components/Shared/Sidebar';
import Footer from 'components/Shared/Footer';
import LoadingScreen from 'components/Shared/LoadingScreen';
import styles from './layout.module.css';

const Profile = React.lazy(() => 'components/Shared/Profile');
const Home = React.lazy(() => import('components/Home'));
const SignUp = React.lazy(() => import('components/Signup'));
const Login = React.lazy(() => import('components/Login'));
const Admins = React.lazy(() => import('components/Admins'));
const AdminForm = React.lazy(() => import('components/Admin'));
const SuperAdmins = React.lazy(() => import('components/SuperAdmins'));
const SuperAdminForm = React.lazy(() => import('components/SuperAdmin'));
const Employees = React.lazy(() => import('components/Employees'));
const EmployeeForm = React.lazy(() => import('components/Employee'));
const Projects = React.lazy(() => import('components/Projects'));
const ProjectForm = React.lazy(() => import('components/Project'));
const TimeSheets = React.lazy(() => import('components/TimeSheets'));
const TimeSheetForm = React.lazy(() => import('components/TimeSheet'));
const Tasks = React.lazy(() => import('components/Tasks'));
const TaskForm = React.lazy(() => import('components/Task'));

function Layout() {
  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.mainDiv}>
        <div className={styles.divSideBar}>
          <Sidebar />
        </div>
        <div className={styles.divSwitch}>
          <React.Suspense fallback={<LoadingScreen />}>
            <Switch>
              <Route exact path="/home" component={Home} />
              <Route exact path="/signup" component={SignUp} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/admins" component={Admins} />
              <Route exact path="/admins/form" component={AdminForm} />
              <Route exact path="/super-admins" component={SuperAdmins} />
              <Route exact path="/super-admins/form" component={SuperAdminForm} />
              <Route exact path="/employees" component={Employees} />
              <Route exact path="/employees/form" component={EmployeeForm} />
              <Route exact path="/employee/profile" component={Profile} />
              <Route exact path="/projects" component={Projects} />
              <Route exact path="/projects/form" component={ProjectForm} />
              <Route exact path="/time-sheets" component={TimeSheets} />
              <Route exact path="/time-sheets/form" component={TimeSheetForm} />
              <Route exact path="/tasks" component={Tasks} />
              <Route exact path="/tasks/form" component={TaskForm} />
              <Route exact path="/">
                <Redirect to="/home" />
              </Route>
            </Switch>
          </React.Suspense>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Layout;
