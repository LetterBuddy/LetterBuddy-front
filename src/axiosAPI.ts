import axios from "axios";
const baseURL = import.meta.env.VITE_APP_API_URL;

const axiosAPI = axios.create({
  baseURL: baseURL,
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
  // withCredentials: true,
});

// axiosAPI.interceptors.request.use((config) => {
//   const accessToken = localStorage.getItem("access_token");
//   if (accessToken) config.headers.Authorization = `Bearer ${accessToken}`;
//   return config;
// });

axiosAPI.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Prevent infinite loops early
    // if (
    //   error.response.status === 401 &&
    //   originalRequest.url === baseURL + "token/refresh/"
    // ) {
    //   window.location.href = "/login/";
    //   return Promise.reject(error);
    // }

    if (
      error.response?.status === 401 &&
      error.response?.config?.url === "/accounts/token/refresh/"
    ) {
      window.location.href = "/splash/";
      return Promise.reject(error);
    }

    if (
      error.response?.data?.code === "token_not_valid" &&
      error.response?.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      try {
        await axios.post("/accounts/token/refresh/", null);

        // const newAccessToken = res.data.access;
        // localStorage.setItem("access_token", newAccessToken);

        // Update headers
        // axios.defaults.headers.Authorization = `Bearer ${newAccessToken}`;
        // originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

        // Retry the original request
        return axiosAPI(originalRequest);
      } catch (err) {
        console.log("Refresh token expired or invalid");
        window.location.href = "/splash/";
        return Promise.reject(err);
      }
    }
    return Promise.reject(error);
  }
);

export default axiosAPI;
