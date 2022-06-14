import { composeWithDevTools } from 'redux-devtools-extension';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { employeesReducer } from './employees/reducer';
import { adminsReducer } from './admins/reducer';

const rootReducer = combineReducers({ employees: employeesReducer, admins: adminsReducer });

const configureStore = () => {
  const enhancer = composeWithDevTools(applyMiddleware(thunk));
  return createStore(rootReducer, enhancer);
};

const store = configureStore();

export default store;
