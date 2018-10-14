import {
    REQUEST_REGISTRATION,
    REGISTRATION_SUCCESS,
    REGISTRATION_FAIL,
    REQUEST_AUTHENTICATION,
    AUTHENTICATION_SUCCESS,
    AUTHENTICATION_FAIL
} from '../constants/User';
import 'whatwg-fetch'
import { NotificationManager } from 'react-notifications';

/**
 * Аутентификация
 */
export const authentication = (data, router) => {
    console.log(data);
    return (dispatch) => {
        dispatch(requestAuthentication({preloader: true}));
        fetch('/api/clients/authentication', {
            method: 'post',
            credentials: 'same-origin',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(response => response.json())
            .then(json => {
                console.log(json);
                if (json.result) {
                    if (json.data.result) {
                        json.data.data.preloader = false;
                        dispatch(authenticationSuccess(json.data.data));
                        console.log(router);
                        router.history.push('/');
                    } else {
                        NotificationManager.error(json.data.note, 'Ошибка авторицаии', 5000);
                        dispatch(authenticationFail({preloader: false}));
                    }
                } else {
                    NotificationManager.error('Функция авторизации не доступна', 'Ошибка', 5000);
                    dispatch(authenticationFail({preloader: false}));
                }

            })
            .catch(err => {
                NotificationManager.error('Попробуй позже', 'Ошибка авторицаии', 5000);
                dispatch(authenticationFail({preloader: false}));
                console.log(err);
            })
    }
};

/**
 * Регистрация
 */
export const registration = (data, router) => {
    console.log(data);
    return (dispatch) => {
        dispatch(requestRegistration({preloader: true}));
        fetch('/api/clients/registration', {
            method: 'post',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(response => response.json())
            .then(json => {
                console.log(json);
                if (json.result) {
                    if (json.data.result) {
                        dispatch(registrationSuccess({preloader: false}));
                        NotificationManager.info('Регистрация прошла успешно', 'Регистрация', 5000);
                        router.history.push('/');
                    } else {
                        dispatch(registrationFail({preloader: false}));
                        NotificationManager.error(json.data.note, 'Регистрация', 5000);
                    }
                } else {
                    NotificationManager.error('Функция регистрации не доступна', 'Ошибка', 5000);
                    dispatch(registrationFail({preloader: false}));
                }
            })
            .catch(err => {
                dispatch(registrationFail({preloader: false}));
                NotificationManager.error('Ошибка регистрации', 'Регистрация', 5000);
                console.log(err);
            })
    }
};

const requestRegistration = (data) => {
    return {
        type: REQUEST_REGISTRATION,
        data: {
            preloader: data.preloader
        }
    }
};

const registrationSuccess = (data) => {
    return {
        type: REGISTRATION_SUCCESS,
        data: {
            preloader: data.preloader
        }
    }
};

const registrationFail = (data) => {
    return {
        type: REGISTRATION_FAIL,
        data: {
            preloader: data.preloader,
        }
    }
};

const requestAuthentication = (data) => {
    return {
        type: REQUEST_AUTHENTICATION,
        data: {
            preloader: data.preloader
        }
    }
};

const authenticationSuccess = (data) => {
    return {
        type: AUTHENTICATION_SUCCESS,
        data: {
            preloader: data.preloader,
            user: data.user,
            isAuth: true
        }
    }
};

const authenticationFail = (data) => {
    return {
        type: AUTHENTICATION_FAIL,
        data: {
            preloader: data.preloader,
        }
    }
};
