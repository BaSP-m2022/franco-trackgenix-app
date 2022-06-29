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
import EmployeeSignUp from '../Employee-Signup';
import Projects from '../Projects';
import ProjectForm from '../Project';
import TimeSheets from '../TimeSheets';
import TimeSheetForm from '../TimeSheet';
import Tasks from '../Tasks';
import TaskForm from '../Task';
import Profile from '../Shared/Profile';

function Layout() {
  sessionStorage.setItem(
    'token',
    'eyJhbGciOiJSUzI1NiIsImtpZCI6Ijk4OTdjZjk0NTllMjU0ZmYxYzY3YTRlYjZlZmVhNTJmMjFhOWJhMTQiLCJ0eXAiOiJKV1QifQ.eyJyb2xlIjoiQURNSU4iLCJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vYmFzcC0yMDIyLXRyYWNrZ2VuaXgtMTNmNDkiLCJhdWQiOiJiYXNwLTIwMjItdHJhY2tnZW5peC0xM2Y0OSIsImF1dGhfdGltZSI6MTY1NjQyODA5NSwidXNlcl9pZCI6Im5UUktmNGJMSFJkMGNsNU5INnZvWFlMb0NJWDIiLCJzdWIiOiJuVFJLZjRiTEhSZDBjbDVOSDZ2b1hZTG9DSVgyIiwiaWF0IjoxNjU2NDI4MDk1LCJleHAiOjE2NTY0MzE2OTUsImVtYWlsIjoiaGVybmFuQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwiZmlyZWJhc2UiOnsiaWRlbnRpdGllcyI6eyJlbWFpbCI6WyJoZXJuYW5AZ21haWwuY29tIl19LCJzaWduX2luX3Byb3ZpZGVyIjoicGFzc3dvcmQifX0.Mt5mVAlePzeFHP0S_6TtkpS0rs7Mx0AnEW6uIvAjW_kOBTtN4Ufb62RwZ1iPUwV8TKQ-0OxUawntPeGy_afF8leoAIbQdhwHu-0hrdJ0WckFEG0cbEPjUl9IvNhNuQRty-Wr8NH4DnTRCw3b-qf3UKEO1m8iTP2rkJfDqbXEccNYw4WkzyBSgsftxndbJ9gNvTOJNtwHMcsvdnvLEkSALmE_l0AVbPRl5GwxV-X_4iDfBaJ4xWF2dcBGIwp-2_BRSeHd1NNjtepHj46HAPwq9oMngr0nDnJtK_PUoKzNIt5SO5RIB3sJKT5-t0PzYsrwYcOiDRcGz5lfuXQLY95CfQ'
  );
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
            <Route exact path="/employee/profile" component={Profile} />
            <Route exact path="/employee/signup" component={EmployeeSignUp} />
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
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Layout;
