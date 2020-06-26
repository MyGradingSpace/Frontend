export default (state={}, action) => {
    switch (action.type) {
        case 'LOGIN_INFORMATION':
            return action.payload;
        default:
            return state;
    }
};