import AxiosInstance from "@/api/todoListsApi";
import {
  AuthContextType,
  ContactFormType,
  UsersType,
  UserType,
} from "@/types/Types";
import {
  createContext,
  memo,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

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

  //validate of login signup password_reset page

  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: "",
  });

  const handleEmailError = (data: UsersType | ContactFormType) => {
    if (data.email.indexOf("@") === -1) {
      alert("'@'をいれたemailを入力してください");
      return false;
    }
    return true;
  };

  const handlePasswordError = (data: UsersType) => {
    const commonPasswords = ["password", "12345678"];
    if (data.password.length < 8) {
      alert("パスワードは8文字以上で入力してください");
      return false;
    }
    if (/^\d+$/.test(data.password)) {
      alert("パスワードを数字だけにすることはできません");
      return false;
    }

    const lowerValue = data.password.toLowerCase();
    if (commonPasswords.some((common) => lowerValue.includes(common))) {
      alert("パスワードが簡単すぎます");
      return false;
    }

    const lowerUsername = data.username.toLowerCase();
    const lowerEmail = data.email.toLowerCase();
    if (lowerValue.includes(lowerUsername) || lowerValue.includes(lowerEmail)) {
      alert("パスワードがユーザー、またはメール情報と似すぎています");
      return false;
    }
    return true;
  };

  //

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        login,
        logout,
        token,
        formData,
        setFormData,
        handleEmailError,
        handlePasswordError,
      }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
});
