export default (state=[], action) => {
    switch (action.type) {
        case 'COMPILING_LANGUAGES':
            return action.payload;
        default:
            return state;
    }
};