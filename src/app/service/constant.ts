import {environment} from '../../environments/environment';

export const API_ENDPOINT_URL = environment.BASE_URL + environment.API_VERSION;

export const API = {
  LOGIN: API_ENDPOINT_URL + '/admin/admin/login',
  RESET_PASSWORD: API_ENDPOINT_URL + '/admin/admin/resetPassword',
  PROFILE_VIEW: API_ENDPOINT_URL + '/admin/admin/adminProfile',
  PROFILE_UPDATE: API_ENDPOINT_URL + '/admin/admin/updateAdminProfile',
  IMAGE_UPLOAD: API_ENDPOINT_URL + '/admin/admin/imageUpdate',
  SERVICE_LIST: API_ENDPOINT_URL + '/appointments/defaultServices/list',
  SERVICE_ADD: API_ENDPOINT_URL + '/appointments/defaultServices/add',
  SERVICE_UPDATE: API_ENDPOINT_URL + '/appointments/defaultServices/update',
  TRANSACTION_HIST0RY: API_ENDPOINT_URL + '/Admin/AdminController_transactionHistory',
  SERVICE_DELETE: API_ENDPOINT_URL + '/appointments/defaultServices/delete',
  COSMETOLOGIST_LIST: API_ENDPOINT_URL + '/admin/getCosmetologistList',
  COSMETOLOGIST_DETAILS: API_ENDPOINT_URL + '/admin/cosmetologistDetails',
  GET_APPOINTMENT_LIST: API_ENDPOINT_URL + '/admin/appointmentList',
  CLIENT_LIST: API_ENDPOINT_URL + '/admin/getCustomerList',
  CLIENT_DETAILS: API_ENDPOINT_URL + '/admin/getCustomerDetails',
  GET_CLIENT_APPOINTMENT_LIST: API_ENDPOINT_URL + '/admin/appointmentList'
};
