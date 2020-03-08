
let initialState={
    locale : 'fa'
};
const settingsReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_LOCALE':
            return state.locale ;
        default:
            return state;
    }
};
export default settingsReducer;