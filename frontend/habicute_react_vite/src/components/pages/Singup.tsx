import { memo } from "react";
import LoginAndSingupPageLayout from "../organisms/LoginAndSingupPageLayout";

const Signup = memo(() => {
  return (
    <>
      <LoginAndSingupPageLayout
        pageTitle="Signup"
        toLink="/login"
        toLinkTitle="Login page"
      />
    </>
  );
});
export default Signup;
