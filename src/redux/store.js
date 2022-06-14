import { composeWithDevTools } from 'redux-devtools-extension';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { employeesReducer } from './employees/reducer';
import { superAdminsReducer } from './superAdmins/reducer';
import { timeSheetsReducer } from './timeSheets/reducer';

const rootReducer = combineReducers({
  employees: employeesReducer,
  superAdmins: superAdminsReducer,
  timeSheets: timeSheetsReducer
});

const configureStore = () => {
  const enhancer = composeWithDevTools(applyMiddleware(thunk));
  return createStore(rootReducer, enhancer);
};

const store = configureStore();

export default store;
