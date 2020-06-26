export const setLoginInformation = (object) => ({
    type: 'LOGIN_INFORMATION',
    payload: object,
});

export const login = (bool) => ({
    type: 'LOGIN',
    payload: bool,
});
