import {environment} from '../../../../../environments/environment';

export const constants = {
  urls: {
    loginPage: environment.apiUrl + '/users/login/',
    register: environment.apiUrl + '/auth/users/',
    board: environment.apiUrl + '/users/board/',
    note: environment.apiUrl + '/users/note/',
    logout: environment.apiUrl + '/auth/token/logout/',
    editTask: environment.apiUrl + '/users/edit/',
    whiteBoard: environment.apiUrl + '/users/whiteboard/',
  }
};
