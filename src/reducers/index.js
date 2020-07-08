import { combineReducers } from 'redux';
import loginInformationReducer from './loginInformationReducer';
import loginReducer from './loginReducer';
import compilingLanguageReducer from './compilingLanguageReducer';
import jobReducer from './jobReducer';
import selectJobReducer from './selectJobReducer';

export default combineReducers({
    loginInformation: loginInformationReducer,
    login: loginReducer,
    compilingLanguage: compilingLanguageReducer,
    jobs: jobReducer,
    selectJob: selectJobReducer,
});