import { toast } from 'react-toastify';
import jwtDecode from 'jwt-decode';
import Cookies from 'js-cookie';

const getLocalRefreshToken = () => {
    try {
        return Cookies.get("refreshToken")
    } catch (error) {
        return false;
    }
  };

  const getLocalAccessToken = () => {
    try {
        return Cookies.get("accessToken")
    } catch (error) {
        return false;
    }
  };
  
  const updateLocalAccessToken = (token) => {
        try {

            const accessTokenDecoded = jwtDecode(token.accessToken)
            const refreshTokenDecoded = jwtDecode(token.refreshToken)
            const accessTokenExpiry = new Date(accessTokenDecoded.exp * 1000)
            const refreshTokenExpiry = new Date(refreshTokenDecoded.exp * 1000)

            const accessTokenCokieOptions = {
              httpOnly: false,
              expires: accessTokenExpiry,
              path: "/",
              sameSite: "strict",
              secure: process.env.NODE_ENV === "production",
            };

            const refreshTokenCokieOptions = {
              httpOnly: false,
              expires: refreshTokenExpiry,
              path: "/",
              sameSite: "strict",
              secure: process.env.NODE_ENV === "production",
            };


            Cookies.set("accessToken", token.accessToken, accessTokenCokieOptions);
            Cookies.set("refreshToken", token.refreshToken, refreshTokenCokieOptions);

        } catch (error) {
            return false;
        }
  };
  
  const getUser = () => {
    try {
        if (typeof window !== 'undefined') {
            return Cookies.get("accessToken")
        } else return false;
    } catch (error) {
            console.log(error)
        return false;
    }
    
  };
  

  // const getExpiryDate = async (token) => {
  //   const decodedUser = jwtDecode(token.refreshToken)
  //   return new Date(decodedUser.exp * 1000)
  // }

  // const getIsExpired = () => {
  //   return new Date() > getExpiryDate()
  // }

  const removeUser = () => {
    try {

        Cookies.remove('accessToken', { path: '/' })
        Cookies.remove('refreshToken', {path: '/'})
    } catch (error) {
        console.log(error)
        return false;
    }
  };
  
  const TokenService = {
    getLocalRefreshToken,
    getLocalAccessToken,
    updateLocalAccessToken,
    getUser,
    removeUser,
    // getIsExpired,
    // getExpiryDate
  };
  
  export default TokenService;