import { combineReducers } from 'redux';
import loginInformationReducer from './loginInformationReducer';
import loginReducer from './loginReducer';
import compilingLanguageReducer from './compilingLanguageReducer';
import jobReducer from './jobReducer';
import selectJobReducer from './selectJobReducer';
import userContextReducer from './userContextReducer';
import userReducer from './userReducer';

export default combineReducers({
    loginInformation: loginInformationReducer,
    login: loginReducer,
    compilingLanguage: compilingLanguageReducer,
    jobs: jobReducer,
    selectJob: selectJobReducer,
    userContext: userContextReducer,
    user: userReducer,
});