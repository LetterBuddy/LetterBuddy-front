import axios from "axios";
import useUserStore from "./store/useUserStore";

// if VITE_APP_API_URL is not set as an env var - use the default one
const baseURL = import.meta.env.VITE_APP_API_URL || 'http://127.0.0.1:8000/'

const axiosAPI = axios.create({
  baseURL: baseURL,
  timeout: 20000,
  headers: {
    "Content-Type": "application/json",
  },
});

const cleanUserInfoAndTokens = () => {
  useUserStore.getState().clearUser();
  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");
}

axiosAPI.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem("access_token");
  if (accessToken)
    config.headers.Authorization = `Bearer ${accessToken}`;
  return config;
});

axiosAPI.interceptors.response.use(
  (response) => response,
  (error) => {
    const originalRequest = error.config;

    console.log(originalRequest.url)
    // prevent infinite loops
    if (
      error.response.status === 401 &&
      originalRequest.url === "/accounts/token/refresh/"
    ) {
      return Promise.reject(error);
    }

    if (
      error.response.data.code === "token_not_valid" &&
      error.response.status === 401
    ) {
      const refreshToken = localStorage.getItem("refresh_token");

      if (refreshToken) {
        const tokenParts = JSON.parse(atob(refreshToken.split(".")[1]));

        // exp date in token is expressed in seconds, while now() returns milliseconds:
        const now = Math.ceil(Date.now() / 1000);

        if (tokenParts.exp > now) {
          return axiosAPI
            .post("/accounts/token/refresh/", { refresh: refreshToken })
            .then((response) => {
              localStorage.setItem("access_token", response.data.access);
              localStorage.setItem("refresh_token", response.data.refresh);

              axiosAPI.defaults.headers["Authorization"] = response.data.access;
              originalRequest.headers["Authorization"] = response.data.access;
              
              // if the original request was logout we need to update the refresh token in its data
              if (originalRequest.url === "/accounts/logout/") {
                try {
                  const parsedData = JSON.parse(originalRequest.data);
                  if (parsedData.refresh) {
                    parsedData.refresh = response.data.refresh;
                  }
                  originalRequest.data = JSON.stringify(parsedData);
                } catch (error) {
                  console.error("Error parsing original request data:", error);
                }
              }
              return axiosAPI(originalRequest);
            })
            .catch((err) => {
              console.log(err);
            });
        } else {
          console.log("Refresh token is expired", tokenParts.exp, now);
          cleanUserInfoAndTokens();
          window.location.href = "/splash/";
        }
      } else {
        console.log("Refresh token not available.");
        cleanUserInfoAndTokens();
        window.location.href = "/splash/";
      }
    }
    return Promise.reject(error);
  }
);

export default axiosAPI;
