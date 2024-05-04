import React, { createContext, useContext, useState, useEffect } from "react";
import useAxios from "../hooks/useAxios";
import AuthContext from "./AuthContext";

const UserInfoContext = createContext();

export default UserInfoContext;

export const UserInfoProvider = ({ children }) => {
  const { user, isLoggedIn, baseURL } = useContext(AuthContext);
  const api = useAxios();
  const [isEmpty, setIsEmpty] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [userInfo, setUserInfo] = useState({
    email: "",
    first_name: "",
    last_name: "",
    date_of_birth: "",
    profile_photo: "",
    type: "",
  });
  const [load, setLoad] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get(`/single-user/${user.user_id}`);
        // console.log("fetchhh", response.data.data.profile_photo);
        if (response.status === 200) {
          const completeUserInfo = await {
            ...response.data.data,
            profile_photo: `${baseURL}${response.data.data.profile_photo}`,
          };
          setUserInfo(completeUserInfo);
        }
      } catch (error) {
        console.error("Error fetching requests:", error);
      }
    };
    if (user?.user_id) fetchData();
  }, [user]);
  //   console.log("infoooooooou", userInfo);
  const updateUserInfo = async (formData) => {
    try {
      const formDataObj = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (value !== null && value !== "") {
          formDataObj.append(key, value);
        }
      });

      let response = await api.post("/update-profile/", formDataObj);
      if (response.status === 200) {
        setLoad(!load);
      }
    } catch (error) {
      console.error("Error fetching requests:", error);
    }
  };

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await api.get(`/notifications/`);
        if (response.status === 200) {
          const rawData = await response.data.data;
          const dataArray = Object.keys(rawData).map((key) => ({
            id: key,
            ...rawData[key],
          }));

          dataArray.reverse();
          setNotifications(dataArray);
          if (dataArray.length === 0) {
            setIsEmpty(true);
          }
        }
      } catch (error) {
        console.error("Error fetching requests:", error);
      }
    };
    // if (user) fetchNotifications();
    // const timerId = setInterval(() => {
    //   if (user) fetchNotifications();
    // }, 10000);

    // return () => clearInterval(timerId);
  }, [user]);

  const data = {
    userInfo: userInfo,
    notifications: notifications,
    isEmpty: isEmpty,
    updateUserInfo: updateUserInfo,
    setUserInfo: setUserInfo,
    setNotifications: setNotifications,
  };

  return (
    <UserInfoContext.Provider value={data}>{children}</UserInfoContext.Provider>
  );
};
