import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URI,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

// Optional: attach your interceptors here
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    // existing interceptor logic (e.g., auto-logout on 401/403)
    return Promise.reject(error);
  }
);

/**
 * General API connector.
 * Only POST, PUT, PATCH include a request body.
 */
export const apiConnector = (method, url, bodyData, headers, params) => {
  const config = {
    method: method.toUpperCase(),
    url,
    headers: headers || {},
    params: params || {},
  };

  // 🚀 Only include data property for methods that accept a body
  const methodsWithBody = ["POST", "PUT", "PATCH"];
  if (methodsWithBody.includes(config.method)) {
    // Use provided bodyData if given, otherwise default to empty object
    config.data = bodyData !== undefined ? bodyData : {};
  }

  return axiosInstance(config);
};
