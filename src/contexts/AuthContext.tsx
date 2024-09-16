import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  ReactNode,
} from "react";
import axios from "axios";

interface AuthContextProps {
  isAuthenticated: boolean;
  user: any; // eslint-disable-line @typescript-eslint/no-explicit-any
  login: (token: string, user: any) => void; // eslint-disable-line @typescript-eslint/no-explicit-any
  logout: () => void;
}

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<any>(null); // eslint-disable-line @typescript-eslint/no-explicit-any

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      setIsAuthenticated(true);

      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        try {
          const parsedUser = JSON.parse(storedUser);
          setUser(parsedUser);
        } catch (error) {
          console.error("Failed to parse user JSON:", error);
          localStorage.removeItem("user");
        }
      }
    }
  }, []);

  const login = (token: string, user: any) => {
    // eslint-disable-line @typescript-eslint/no-explicit-any
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    setIsAuthenticated(true);
    setUser(user);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    delete axios.defaults.headers.common["Authorization"];
    setIsAuthenticated(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
