export default (state={}, action) => {
    switch (action.type) {
        case 'SELECT_JOB':
            return action.payload;
        default:
            return state;
    }
};