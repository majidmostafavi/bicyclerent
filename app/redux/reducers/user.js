import {SetUserToken} from "../../components/api/request-server";

let initialState ={
};
const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_USER':
            (action.payload.user) ? SetUserToken(action.payload.user.token_type,action.payload.user.access_token) : SetUserToken(null);
            return {...action.payload.user};
        default:
            return state;
    }
};
export default userReducer;