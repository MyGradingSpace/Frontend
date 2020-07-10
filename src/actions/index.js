import Service from '../service/serviec';

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

export const selectJob = (id) => async (dispatch) => {
    const response = await service.getGrading(id);
    dispatch({
        type: 'SELECT_JOB',
        payload: response,
    });
};