import { composeWithDevTools } from 'redux-devtools-extension';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { employeesReducer } from './employees/reducer';
import { superAdminsReducer } from './superAdmins/reducer';
import { tasksReducer } from './tasks/reducer';
import { projectsReducer } from './projects/reducer';
import { adminsReducer } from './admins/reducer';

const rootReducer = combineReducers({
  employees: employeesReducer,
  superAdmins: superAdminsReducer,
  tasks: tasksReducer,
  projects: projectsReducer,
  admins: adminsReducer
});

const configureStore = () => {
  const enhancer = composeWithDevTools(applyMiddleware(thunk));
  return createStore(rootReducer, enhancer);
};

const store = configureStore();

export default store;
