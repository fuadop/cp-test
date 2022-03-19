import * as React from "react";
import axios from "axios";
import { pageConfig } from "./config";

import AppContext from"context/app"
import UserContext from"context/user"

// set axios interceptors
axios.defaults.baseURL = `${process.env.REACT_APP_API_URL || "http://localhost:2001/api/v1"}`;
axios.interceptors.request.use((req) => {
  const token = sessionStorage.getItem("token");
  if (token) {
    req.headers = {
      ...req.headers,
      Authorization: `Bearer ${token}` 
    }
  }

  return req;
});

axios.interceptors.response.use((res) => {
  return res.data || res;
});

export const App = () => {
  const [page, setPage] = React.useState<"auth" | "exchange">("auth");
  const [name, setName] = React.useState<string>("");

  const CurrentPage = pageConfig[page];
  const logout = () => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("username");
    setPage("auth");
  };

  const login = (token: string, name: string) => {
    sessionStorage.setItem("token", token);
    sessionStorage.setItem("username", name);
    setName(name);
    setPage("auth");
    window.location.reload();
  };

  React.useEffect(() => {
    if (sessionStorage.getItem("token")) {
      // set the user's name
      setName(sessionStorage.getItem("username")!);
      setPage("exchange");
    } else {
      setPage("auth");
    }
  }, [page, setPage])

  return (
    <AppContext.Provider value={{ page, setPage, logout, login }}>
      <UserContext.Provider value={{ name }}>
        <CurrentPage />;
      </UserContext.Provider>
    </AppContext.Provider>
  )
}