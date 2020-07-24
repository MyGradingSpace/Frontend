export default (state={}, action) => {
    switch (action.type) {
        case 'SELECT_GRADING':
            return action.payload;
        default:
            return state;
    }
};