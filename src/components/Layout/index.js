import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { Header, Sidebar, Footer, LoadingScreen } from 'components/Shared';
import styles from './layout.module.css';

const SignUp = React.lazy(() => import('components/pages/Signup'));
const Login = React.lazy(() => import('components/pages/Login'));

const AdminList = React.lazy(() => import('components/pages/Admin/List'));
const AdminForm = React.lazy(() => import('components/pages/Admin/Form'));
const AdminHome = React.lazy(() => import('components/pages/Admin/Home'));
const AdminProfile = React.lazy(() => import('components/Shared/Profile/Admin'));

const SuperAdminList = React.lazy(() => import('components/pages/SuperAdmin/List'));
const SuperAdminForm = React.lazy(() => import('components/pages/SuperAdmin/Form'));
const SuperAdminHome = React.lazy(() => import('components/pages/SuperAdmin/Home'));

const EmployeeList = React.lazy(() => import('components/pages/Employee/List'));
const EmployeeForm = React.lazy(() => import('components/pages/Employee/Form'));
const EmployeeHome = React.lazy(() => import('components/pages/Employee/Home'));
const EmployeeProfile = React.lazy(() => import('components/Shared/Profile/Employee'));
const EmployeeTableProfile = React.lazy(() => import('components/pages/Employee/Profile'));

const ProjectList = React.lazy(() => import('components/pages/Project/List'));
const ProjectForm = React.lazy(() => import('components/pages/Project/Form'));
const ProjectProfile = React.lazy(() => import('components/pages/Project/Profile'));

const TimeSheetList = React.lazy(() => import('components/pages/TimeSheet/List'));
const TimeSheetForm = React.lazy(() => import('components/pages/TimeSheet/Form'));

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
              <Route exact path="/signup" component={SignUp} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/admins" component={AdminList} />
              <Route exact path="/admins/form" component={AdminForm} />
              <Route exact path="/admins/home" component={AdminHome} />
              <Route exact path="/admins/profile" component={AdminProfile} />
              <Route exact path="/super-admins" component={SuperAdminList} />
              <Route exact path="/super-admins/form" component={SuperAdminForm} />
              <Route exact path="/super-admins/home" component={SuperAdminHome} />
              <Route exact path="/super-admins/profile" component={AdminProfile} />
              <Route exact path="/employees" component={EmployeeList} />
              <Route exact path="/employees/form" component={EmployeeForm} />
              <Route exact path="/employees/home" component={EmployeeHome} />
              <Route exact path="/employees/profile" component={EmployeeProfile} />
              <Route exact path="/employees/:id" component={EmployeeTableProfile} />
              <Route exact path="/projects" component={ProjectList} />
              <Route exact path="/projects/form" component={ProjectForm} />
              <Route exact path="/projects/:id" component={ProjectProfile} />
              <Route exact path="/time-sheets" component={TimeSheetList} />
              <Route exact path="/time-sheets/form" component={TimeSheetForm} />
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
