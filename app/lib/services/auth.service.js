import api from "./api";
import TokenService from "./token.service";
import { toast } from 'react-toastify';
import jwtDecode from "jwt-decode";
import Cookies from "js-cookie";
import { responseErrorHandler } from "@/utils/errorHandler";


const register = async (username, firstname, lastname, phoneNum, sex, email, password) => {
  return api.post("/user/create", {
    username,
    firstName: firstname,
    lastName : lastname,
    phoneNum,
    sex,
    email,
    password
  });
};


const login = (email, password) => {

    return api
      .post("/user/login", {
        email,
        password
      })
      .then((response) => {
        if (response?.data?.accessToken) {
         TokenService.updateLocalAccessToken(response?.data);
        }
  
        return response?.data;
      }).catch((error) => {
        let errorMessage = responseErrorHandler(error)
        toast.error(errorMessage)
        return false;
      });
  };

const logout = () => {
  TokenService.removeUser();
};

const getCurrentUser = () => {
    try {
            const accessToken = Cookies.get("accessToken")
            const decoded = jwtDecode(accessToken)
            console.log("decoded", decoded)
            return decoded;
        
    } catch (error) {
        return false;
    }
};

const AuthService = {
  register,
  login,
  logout,
  getCurrentUser,
};

export default AuthService;