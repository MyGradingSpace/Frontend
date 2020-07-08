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

export const getJobs = () => async (dispatch) => {
    const response = await service.getJobs();
    dispatch({
        type: 'JOBS',
        payload: response,
    });
};