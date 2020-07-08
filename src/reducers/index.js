import { combineReducers } from 'redux';
import loginInformationReducer from './loginInformationReducer';
import loginReducer from './loginReducer';
import compilingLanguageReducer from './compilingLanguageReducer';
import jobReducer from './jobReducer';

export default combineReducers({
    loginInformation: loginInformationReducer,
    login: loginReducer,
    compilingLanguage: compilingLanguageReducer,
    jobs: jobReducer,
});