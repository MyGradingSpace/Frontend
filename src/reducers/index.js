import { combineReducers } from 'redux';
import loginInformationReducer from './loginInformationReducer';
import loginReducer from './loginReducer';


export default combineReducers({
    loginInformation: loginInformationReducer,
    login: loginReducer,
});