import axios from "axios";
import React, { useEffect } from "react";
import useAuth from "./useAuth";
import { useNavigate } from "react-router-dom";

const axiosInstance = axios.create({
  baseURL:
    "https://job-portal-server-for-recruiter-part3-wine-gamma.vercel.app",
  withCredentials: true,
});

const useAxiosSecure = () => {
  const { signOutUser } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    axiosInstance.interceptors.response.use(
      (response) => {
        return response;
      },
      (error) => {
        console.log("error caught in interceptor", error);
        if (error.status === 401 || error.status === 403) {
          console.log("need to logout the user");
          signOutUser()
            .then(() => {
              console.log("logout user");
              navigate("/signIn");
            })
            .catch((err) => console.log(err.message));
        }
        return Promise.reject(error);
      }
    );
  }, []);
  return axiosInstance;
};

export default useAxiosSecure;
