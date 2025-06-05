import { BrowserRouter, Navigate, Outlet, Route, Routes } from "react-router";

import HeaderAndNav from "./components/layout/HeaderAndNav";
import Page404 from "./components/pages/Page404";
import PageRoutes from "./router/PageRoutes";
import Signup from "./components/pages/Singup";
import Login from "./components/pages/Login";
import { useAuth } from "./providers/AuthContext";
import PasswordResetRequestForm from "./components/pages/PasswordResetRequestForm";
import PasswordReset from "./components/pages/PasswordReset";

const PrivateRoute = () => {
  const { user } = useAuth();
  return user ? <Outlet /> : <Navigate to="/login" />;
};

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/password-reset-request-form"
            element={<PasswordResetRequestForm />}
          />
          <Route path="/" element={<PrivateRoute />}>
            <Route element={<HeaderAndNav />}>
              {PageRoutes.map((route) => (
                <Route
                  key={route.path}
                  path={route.path}
                  element={route.children}
                />
              ))}
            </Route>
          </Route>

          <Route path="/*" element={<Page404 />} />
          <Route path="/password-reset/:token" element={<PasswordReset />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
