import {
    REQUEST_REGISTRATION,
    REGISTRATION_SUCCESS,
    REGISTRATION_FAIL,
    REQUEST_AUTHENTICATION,
    AUTHENTICATION_SUCCESS,
    AUTHENTICATION_FAIL
} from '../constants/User';

const initialState = {
    isAuth: false,
    user: {},
    preloader: false
};

export default function user(state = initialState, action) {
    switch (action.type) {

        case REQUEST_REGISTRATION:
            return { ...state, preloader: action.data.preloader};
        case REGISTRATION_SUCCESS:
            return { ...state, preloader: action.data.preloader};
        case REGISTRATION_FAIL:
            return { ...state, preloader: action.data.preloader};
        case REQUEST_AUTHENTICATION:
            return { ...state, preloader: action.data.preloader};
        case AUTHENTICATION_SUCCESS:
            return { ...state, preloader: action.data.preloader, user: action.data.user, isAuth: action.data.isAuth};
        case AUTHENTICATION_FAIL:
            return { ...state, preloader: action.data.preloader};

        default:
            return state
    }
}