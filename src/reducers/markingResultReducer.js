export default (state={}, action) => {
    switch (action.type) {
        case 'STUDENTS_MARKS':
            return action.payload;
        default:
            return state;
    }
};