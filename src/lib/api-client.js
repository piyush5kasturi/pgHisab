import Axios from "axios";
import Cookies from "js-cookie";
// import { setAlert } from 'src/reducers/alert';
// import { setEnoughPermission, setSessionExpired } from 'src/reducers/auth';

// import { store } from './create-store';

const axios = Axios.create({
  baseURL: import.meta.env.VITE_API_HOST,
  withCredentials: true,
});

// // A function that calls '/api/csrf-cookie' to set the CSRF cookies. The
// // default is 'sanctum/csrf-cookie' but you can configure it to be anything.
// const setCSRFToken = () => {
//   return axios.get('/api/csrf-cookie');
// };

axios.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${Cookies.get("pg-token")}`;
  return config;
});

export default async function API(method = "get", url = "", data = {}) {
  // const auth = store.getState()?.auth;

  try {
    const response = await axios[method](url, data);
    if (!response) {
      throw false;
    }
    return await response;
  } catch (error) {
    // if (error.response?.status === 400) {
    //   store.dispatch(setAlert({ type: 'error', message: error.response?.data?.message }));
    // }
    // if (error.response?.status === 401 && auth?.user?.id && !auth?.isSessionExpired) {
    //   store.dispatch(setSessionExpired({}));
    // }
    // if (error.response?.status === 403 && !auth.isEnoughPermission) {
    //   store.dispatch(setEnoughPermission({}));
    // }
    // if (error.response?.status === 419) {
    //   Cookies.remove('XSRF-TOKEN', { domain: window.location.hostname });
    //   Cookies.remove('datacube_session', { domain: window.location.hostname });
    //   localStorage.removeItem('user');
    // }
    // throw error.response;
  }
}
