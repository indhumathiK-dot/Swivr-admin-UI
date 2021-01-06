import {environment} from '../../environments/environment';

export const API_ENDPOINT_URL = environment.BASE_URL + environment.API_VERSION;

export const API = {
  LOGIN: API_ENDPOINT_URL + '/admin/admin/login',
  PROFILE_VIEW: API_ENDPOINT_URL + '/admin/admin/adminProfile',
  SERVICE_LIST: API_ENDPOINT_URL + '/appointments/defaultServices/list',
  SERVICE_ADD: API_ENDPOINT_URL + '/appointments/defaultServices/add',
  SERVICE_UPDATE: API_ENDPOINT_URL + '/appointments/defaultServices/update'
};
