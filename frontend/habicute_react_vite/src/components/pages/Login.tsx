import { FC, memo } from "react";
import LoginAndSingupPageLayout from "../organisms/LoginAndSingupPageLayout";

const Login:FC = memo(() => {
  return (
    <>
      <LoginAndSingupPageLayout
        pageTitle="Login"
        toLink="/signup"
        toLinkTitle="Signup page"
      />
    </>
  );
});
export default Login;
