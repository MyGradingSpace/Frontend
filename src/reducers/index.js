import { combineReducers } from 'redux';
import loginInformationReducer from './loginInformationReducer';
import loginReducer from './loginReducer';
import compilingLanguageReducer from './compilingLanguageReducer';
import jobReducer from './jobReducer';
import selectJobReducer from './selectJobReducer';
import selectGradingReducer from './selectGradingReducer';
import userContextReducer from './userContextReducer';
import userReducer from './userReducer';
import markingResultReducer from './markingResultReducer';

export default combineReducers({
    loginInformation: loginInformationReducer,
    login: loginReducer,
    compilingLanguage: compilingLanguageReducer,
    jobs: jobReducer,
    selectJob: selectJobReducer,
    selectGrading: selectGradingReducer,
    userContext: userContextReducer,
    user: userReducer,
    markingResult: markingResultReducer,
});