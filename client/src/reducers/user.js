// import {
//     READ_CLIENT_SUCCESS,
//     LOGOUT_SUCCESS,
//     REFRESH_MONEY_SUCCESS,
//     GET_CLIENT
// } from '../constants/User';

const initialState = {
    isAuth: false,
    name: '',
    preloader: false
};

export default function user(state = initialState, action) {
    switch (action.type) {

        // case GET_CLIENT:
        //     return { ...state, preloader: action.data.preloader};

        default:
            return state
    }
}