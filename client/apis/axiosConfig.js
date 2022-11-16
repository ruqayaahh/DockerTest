import axios from "axios";

const apiInstance = axios.create();

export const api = async (axiosConfig) => {
  const response = await apiInstance(axiosConfig);
  return response.data;
};

// intercept requests
apiInstance.interceptors.request.use(
  (config) => config,
  (error) => Promise.reject(error)
);

// intercept responses
apiInstance.interceptors.response.use(
  // Any status code that lie within the range of 2xx cause this function to trigger
  (response) => response,
  // Any status codes that falls outside the range of 2xx cause this function to trigger
  (error) => Promise.reject(error)
);

// error handler
export const getRequestError = (error) => {
  console.log(error, "in axiosConfig file");
  return error;
};

export default api;

// {
//   "message": "Request failed with status code 400",
//   "name": "AxiosError",
//   "stack": "AxiosError: Request failed with status code 400\n    at settle (http://localhost:8080/bundle.js:85964:12)\n    at XMLHttpRequest.onloadend (http://localhost:8080/bundle.js:84522:66)",
//   "config": {
//       "transitional": {
//           "silentJSONParsing": true,
//           "forcedJSONParsing": true,
//           "clarifyTimeoutError": false
//       },
//       "transformRequest": [
//           null
//       ],
//       "transformResponse": [
//           null
//       ],
//       "timeout": 0,
//       "xsrfCookieName": "XSRF-TOKEN",
//       "xsrfHeaderName": "X-XSRF-TOKEN",
//       "maxContentLength": -1,
//       "maxBodyLength": -1,
//       "env": {},
//       "headers": {
//           "Accept": "application/json, text/plain, */*",
//           "Content-Type": "application/json"
//       },
//       "url": "/dashboard/78/library",
//       "method": "post",
//       "data": "{\"title\":\"shhajd\",\"author\":\"dashajad\",\"is_read\":false,\"in_custody\":true}"
//   },
//   "code": "ERR_BAD_REQUEST",
//   "status": 400
// }
