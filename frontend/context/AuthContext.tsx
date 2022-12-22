import React, {
  Children,
  createContext,
  useContext,
  useState,
  ReactNode,
} from "react";
import { NEXT_URL } from "../config";

interface TAuthContextProps {
  user?: Tuser | null;
  error: any | null;
  register: (user: Tuser) => void;
  logout: (user: Tuser) => void;
  checkUserLoggedIn: (user: Tuser) => void;
  login: (loginInfo: TloginInfo) => void;
}

type Tuser = {
  username: string;
  email: string;
  password: string;
};

type Props = {
  children: React.ReactNode;
};

export interface TloginInfo {
  email: string;
  password: string;
}

const AuthContext = createContext<TAuthContextProps>({
  user: null,
  error: null,
  register: () => {},
  login: () => {},
  logout: () => {},
  checkUserLoggedIn: () => {},
});

type Tlogin = {
  email: string;
  password: string;
};

export const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }: Props) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  // Register User
  const register = async (user: Tuser) => {
    setError(null);
    const res = await fetch(`${NEXT_URL}/api/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    const data = await res.json();
    //
    if (res.ok) {
      setUser(data.user);
    } else {
      setError(data.message);
    }
  };

  // Login User
  const login = async ({ email: identifier, password }: Tlogin) => {
    setError(null);
    const res = await fetch(`${NEXT_URL}/api/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ identifier, password }),
    });
    const data = await res.json();
    //
    if (res.ok) {
      setUser(data.user);
    } else {
      setError(data.message);
    }
  };

  // Logout User
  const logout = async (user: Tuser) => {
    console.log("logout");
  };

  // Check if the user is logged in or  not
  const checkUserLoggedIn = async (user: Tuser) => {
    console.log("checkUserLoggedIn");
  };

  return (
    <AuthContext.Provider
      value={{ user, error, login, logout, checkUserLoggedIn, register }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
