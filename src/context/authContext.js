import React, { createContext, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

const AuthContext = createContext();
const { Provider } = AuthContext;

const TOKEN = "token";
const AUTH_INFO = "auth";

const AuthProvider = ({ children }) => {
  const history = useHistory();
  const [authState, setAuthState] = useState({});

  useEffect(() => {
    const token = localStorage.getItem(TOKEN);
    const auth = localStorage.getItem(AUTH_INFO);

    setAuthState({
      token: token ? JSON.parse(token) : {},
      auth: auth ? JSON.parse(auth) : {},
    });
  }, []);

  const logout = () => {
    localStorage.removeItem(TOKEN);
    localStorage.removeItem(AUTH_INFO);
    setAuthState({});
    history.push("/auth/login");
  };

  const setAuthInfo = ({ auth, token }) => {
    localStorage.setItem(AUTH_INFO, JSON.stringify(auth));
    localStorage.setItem(TOKEN, JSON.stringify(token));

    setAuthState({
      token,
    });
  };

  const isAuthenticated = () => {
    if (
      !authState.token ||
      !authState.token.token ||
      !authState.token.expiredAt
    ) {
      return false;
    }
    return true;
  };

  const isExpired = () => {
    if (
      authState.token &&
      authState.token.token &&
      authState.token.expiredAt &&
      new Date().getTime() > new Date(authState.token.expiredAt).getTime()
    ) {
      logout();
      return true;
    }
    return false;
  };

  return (
    <Provider
      value={{
        logout,
        authState,
        isAuthenticated,
        isExpired,
        setAuthState: (authInfo) => setAuthInfo(authInfo),
      }}
    >
      {children}
    </Provider>
  );
};

export { AuthProvider, AuthContext };
