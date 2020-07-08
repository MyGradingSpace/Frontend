export default (state=[], action) => {
    switch (action.type) {
        case 'JOBS':
            return action.payload;
        default:
            return state;
    }
};