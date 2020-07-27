import Service from '../service/service';
import D2L from '../D2L/valence';
import axios from 'axios';

const service = new Service();

export const login = (bool) => ({
    type: 'LOGIN',
    payload: bool,
});

export const setLoginInformation = (object) => ({
    type: 'LOGIN_INFORMATION',
    payload: object,
});

export const getCompilingLanguage = () => async (dispatch) => {
    const response = await service.getCompilingLanguage();
    dispatch({
        type: 'COMPILING_LANGUAGES',
        payload: response,
    });
};

export const getJobs = (professorId) => async (dispatch) => {
    const response = await service.getJobs(professorId);
    dispatch({
        type: 'JOBS',
        payload: response,
    });
};


export const selectJob = (job) => ({
    type: 'SELECT_JOB',
    payload: job,
});

export const selectGrading = (id) => async (dispatch) => {
    const response = await service.getGrading(id);
    dispatch({
        type: 'SELECT_GRADING',
        payload: response,
    });
};

export const createUserContext = (xA, xB, xC) => ({
    type: 'USER_CONTEXT',
    payload: { xA: xA, xB: xB, xC: xC },

});

export const createUserInfo = (xA, xB) => async (dispatch) => {
    const D2LAppContext = new D2L.ApplicationContext(process.env.REACT_APP_APP_ID, process.env.REACT_APP_APP_KEY);
    const D2LUserContext = D2LAppContext.createUserContextWithValues(process.env.REACT_APP_HOST_URL, 443, xA, xB);
    const URL = D2LUserContext.createAuthenticatedUrl("/d2l/api/lp/1.0/users/whoami", "get");
    const data = (await axios.get(URL)).data;
    dispatch({
        type: 'USER_INFO',
        payload: data,
    });
};

export const createMarkingResult = (obj) => ({
    type: 'STUDENTS_MARKS',
    payload: obj,

});