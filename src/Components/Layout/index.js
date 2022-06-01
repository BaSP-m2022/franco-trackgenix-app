import Header from '../Header/index';
import Footer from '../Footer/index';
import Admins from '../Admins/index';
import AdminForm from '../Admin/index';
import SuperAdmins from '../SuperAdmins/index';
import Home from '../Home/index';
import styles from './layout.module.css';
import Employees from '../Employees/index';
import EmployeeForm from '../Employee/index';
import Projects from '../Projects';
import TimeSheets from '../TimeSheets';
import TimesheetForm from '../TimeSheet';
import Tasks from '../Tasks/index';

function Layout() {
  let currentScreen = <Home />;
  switch (window.location.pathname) {
    case '/admins':
      currentScreen = <Admins />;
      break;
    case '/admins/form':
      currentScreen = <AdminForm />;
      break;
    case '/super-admins':
      currentScreen = <SuperAdmins />;
      break;
    case '/employees':
      currentScreen = <Employees />;
      break;
    case '/employees/form':
      currentScreen = <EmployeeForm />;
      break;
    case '/projects':
      currentScreen = <Projects />;
      break;
    case '/time-sheets':
      currentScreen = <TimeSheets />;
      break;
    case '/time-sheets/form':
      currentScreen = <TimesheetForm />;
      break;
    case '/tasks':
      currentScreen = <Tasks />;
      break;
    default:
      break;
  }

  return (
    <div className={styles.container}>
      <Header />
      {currentScreen}
      <Footer />
    </div>
  );
}

export default Layout;
