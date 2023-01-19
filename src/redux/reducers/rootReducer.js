import { combineReducers } from 'redux';
import { patientReducer } from './patientReducer';
import { doctorReducer } from './doctorReducer';

 const rootreducer =combineReducers({
    patientReducer,
    doctorReducer
});

export default rootreducer;