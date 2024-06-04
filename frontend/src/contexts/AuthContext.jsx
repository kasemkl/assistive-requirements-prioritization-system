import { createContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export default AuthContext;

export const AuthProvider = ({ children }) => {
  const baseURL = "http://127.0.0.1:8000";
  let [authTokens, setAuthTokens] = useState(() =>
    localStorage.getItem("authTokens")
      ? JSON.parse(localStorage.getItem("authTokens"))
      : null,
  );
  let [user, setUser] = useState(() =>
    localStorage.getItem("user") ? localStorage.getItem("user") : null,
  );
  let [loading, setLoading] = useState(true);
  let [isLoggedIn, setIsLoggedIn] = useState(false);
  const [render, setRender] = useState(false);
  const history = useNavigate();

  let loginUser = async (formData) => {
    let response = await fetch("http://127.0.0.1:8000/api/token/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: formData.email,
        password: formData.password,
      }),
    });

    let data = await response.json();
    // console.log(data);
    if (response.status === 200) {
      setAuthTokens(data);
      setUser(jwtDecode(data.access));
      localStorage.setItem("authTokens", JSON.stringify(data));
      localStorage.setItem("user", JSON.stringify(jwtDecode(data.access)));
      setIsLoggedIn(true);
      history("/");
      return { status: response.status, data: data };
    } else {
      return { status: response.status, data: data };
      alert("Something went wrong!");
    }
  };

  let logoutUser = () => {
    setAuthTokens(null);
    setUser(null);
    setIsLoggedIn(false);
    localStorage.removeItem("authTokens");
    localStorage.removeItem("user");
    setRender(!render);
    history("/login");
  };

  let registerUser = async (formData) => {
    try {
      if (formData.profile_photo === null) {
        delete formData.profile_photo;
      }
      console.log(formData);
      const formDataObj = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        formDataObj.append(key, value);
      });
      // Return the fetch promise
      let response = await fetch("http://127.0.0.1:8000/sign-up", {
        method: "POST",
        body: formDataObj,
      });
      return response;
    } catch (error) {
      console.error("Error fetching requests:", error);
      return error;
      // If an error occurs, you might want to reject the promise here
    }
  };

  useEffect(() => {
    if (authTokens) {
      setUser(jwtDecode(authTokens.access));
    }
    setLoading(false);
  }, [authTokens, loading]);

  const contextData = {
    baseURL: baseURL,
    user: user,
    authTokens: authTokens,
    setAuthTokens: setAuthTokens,
    setUser: setUser,
    registerUser: registerUser,
    loginUser: loginUser,
    logoutUser: logoutUser,
  };

  return (
    <AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>
  );
};
