import patientReducer from './reducers/patients';
import doctorReducer from './reducers/doctors';
import notificationReducer from './reducers/notifications';
import testReducer from './reducers/lab_test';
import resultReducer from './reducers/results';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

const reducer = combineReducers({ patientReducer, doctorReducer, notificationReducer, testReducer, resultReducer });
export default createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));
