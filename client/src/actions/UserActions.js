import {
    LOGIN_REQUEST,
    LOGIN_FAIL,
    LOGIN_SUCCESS,
    LOGOUT_SUCCES
} from '../constants/User';
import 'whatwg-fetch'
import { NotificationManager } from 'react-notifications';

/**
 * Аутентификация
 */
export const authentication = (data) => {
    console.log(data);
    return (dispatch) => {
        console.log(data);
        dispatch(getClient({preloader: true}));
        fetch('/api/authentication', {
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
                //dispatch(readClientSuccess(json.data));
                NotificationManager.info('Авторизация прошла успешно', 'Авторизация', 5000);
                console.log(json.data);
            } else {
                NotificationManager.error(json.note, 'Авторизация', 5000);
                console.log(json.note);
            }
        })
        .catch(err => {
            NotificationManager.error('Ошибка авторицаии', 'Авторизация', 5000);
            console.log(err);
        })
    }
};

const getClient = (data) => {
    return {
        type: LOGIN_REQUEST,
        data: {
            preloader: data.preloader
        }
    }
};
