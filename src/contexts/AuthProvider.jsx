import { createContext, useEffect, useMemo, useState } from "react";

export const AuthContext = createContext({
  token: null,
  user: null,
  setToken: () => {},
  setUser: () => {},
  logout: () => {},
});

export default function AuthProvider({ children }) {
  const [token, setTokenState] = useState(null);
  const [user, setUserState] = useState(null);

  useEffect(() => {
    const t = localStorage.getItem("token");
    const u = localStorage.getItem("user");
    if (t) setTokenState(t);
    if (u) {
      try { setUserState(JSON.parse(u)); } catch {}
    }
  }, []);

  const setToken = (t) => {
    setTokenState(t);
    if (t) localStorage.setItem("token", t);
    else localStorage.removeItem("token");
  };

  const setUser = (u) => {
    setUserState(u);
    if (u) localStorage.setItem("user", JSON.stringify(u));
    else localStorage.removeItem("user");
  };

  const logout = () => {
    setToken(null);
    setUser(null);
  };

  const value = useMemo(() => ({ token, user, setToken, setUser, logout }), [token, user]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
