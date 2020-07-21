export default (state=null, action) => {
    switch (action.type) {
        case 'USER_CONTEXT':
            return action.payload;
        default:
            return state;
    }
};