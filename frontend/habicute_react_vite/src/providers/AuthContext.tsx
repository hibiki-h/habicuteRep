import AxiosInstance from "@/api/todoListsApi";
import {
  createContext,
  Dispatch,
  memo,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";

type UserType = {
  username: string;
};

type AuthContextType = {
  user: UserType | null;
  setUser: Dispatch<SetStateAction<UserType | null>>;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  token: string | null;
};

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};

export const AuthProvider = memo(({ children }: { children: ReactNode }) => {
  // todoapp
  const [user, setUser] = useState<UserType | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [token, setToken] = useState<string | null>("");

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    token ? getUserInfo(token) : setLoading(false);
  }, []);

  const getUserInfo = async (token: string) => {
    try {
      const res = await AxiosInstance.get("api/user-info/", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUser(res.data);
      setToken(token);
    } catch (error) {
      console.log(`unfound logined user data : ${error}`);
    } finally {
      setLoading(false);
    }
  };

  const login = async (username: string, password: string) => {
    try {
      const res = await AxiosInstance.post("api/token/", {
        username,
        password,
      });

      const access_token = res.data.access;
      const refresh_token = res.data.refresh;

      localStorage.setItem("access_token", access_token);
      localStorage.setItem("refresh_token", refresh_token);

      await getUserInfo(access_token);

      return true;
    } catch (error) {
      console.log(`Login failed : ${error}`);
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, setUser, login, logout, token }}>
      {!loading && children}
    </AuthContext.Provider>
  );
});
