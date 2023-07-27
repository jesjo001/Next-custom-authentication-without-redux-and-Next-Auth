import axios from "axios";
import TokenService from "./token.service";

const dev = process.env.NODE_ENV !== 'production'
const SERVER_ROUTE = dev ?  process.env.NEXT_PUBLIC_LOCALSERVER_URL : process.env.NEXT_PUBLIC_DEVSERVER_URL

const instance = axios.create({
  baseURL: `${SERVER_ROUTE}`,
  headers: {
    "Content-Type": "application/json",
  },
});

instance.interceptors.request.use(
  (config) => {
    const token = TokenService.getLocalAccessToken();
    if (token) {
      // config.headers["Authorization"] = 'Bearer ' + token;  // for Spring Boot back-end
      config.headers["x-access-token"] = token; // for Node.js Express back-end
      config.headers["Authorization"] = "Bearer" + " " + token; // for Node.js Express back-end
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (res) => {
    return res;
  },
  async (err) => {
    const originalConfig = err.config;

    if (originalConfig.url !== "/user/login" && err.response) {
      // Access Token was expired
      if (err.response.status === 401 && !originalConfig._retry) {
        originalConfig._retry = true;

        try {
          const rs = await instance.post("/user/sessions", {
            refreshToken: TokenService.getLocalRefreshToken(),
          });

          const { accessToken } = rs.data;
          // console.log("refreshSession response: ", rs.data)
          TokenService.updateLocalAccessToken(rs.data);


          return instance(originalConfig);
        } catch (_error) {
          return Promise.reject(_error);
        }

      }
    }

    return Promise.reject(err);
  }
);


export default instance;