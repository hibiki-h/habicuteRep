import {
  Flex,
  Image,
  Box,
  Text,
  Stack,
  Input,
  Button,
  HStack,
} from "@chakra-ui/react";
import { Link, useNavigate } from "react-router";
import { ChangeEvent, FormEvent, memo, useState } from "react";
import AxiosInstance from "@/api/todoListsApi";
import { useAuth } from "@/providers/AuthContext";
import LoginSignupPasswordresetPageButton from "../atoms/LoginSignupPasswordresetPageButton";
import { UsersType } from "@/types/Types";

type Props = {
  pageTitle: string;
  toLink: string;
  toLinkTitle: string;
};

const LoginAndSingupPageLayout = memo((props: Props) => {
  const {
    login,
    formData,
    setFormData,
    handlePasswordError,
    handleEmailError,
  } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { pageTitle, toLink, toLinkTitle } = props;

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent<HTMLInputElement>) => {
    e.preventDefault();
    setIsLoading(true);
    if (pageTitle === "Signup") {
      try {
        const isPasswordValid = handlePasswordError(formData);
        const isEmailValid = handleEmailError(formData);

        if (!isPasswordValid || !isEmailValid) throw new Error();

        const isExistUser = await userExists(formData);

        if (!isExistUser) {
          await AxiosInstance.post("api/signup/", formData);
          alert(`成功！！`);
          navigate("/login");
        }
      } catch (error) {
        console.log(`error log :${error}`);
        return;
      } finally {
        setIsLoading(false);
      }
    } else if (pageTitle === "Login") {
      try {
        const isSuccess = await login(formData.username, formData.password);
        isSuccess
          ? navigate("/home")
          : alert("ユーザー名、パスワードが正しくありません");
      } catch (error) {
        alert(`ユーザーが見つかりません、登録したユーザーで入力してください`);
        console.log("Login Failed");
      } finally {
        setIsLoading(false);
      }
    }
  };

  const userExists = async (data: UsersType) => {
    try {
      const res = await AxiosInstance.get("api/users_exist/", {
        params: {
          username: data.username,
          email: data.email,
        },
      });
      return res;
    } catch (error) {
      console.log(`userExists error log :${error}`);
    }
  };

  return (
    <Flex
      direction={"column"}
      position={"absolute"}
      justify={"center"}
      align={"center"}
      h={"100vh"}
      w={"100vw"}
    >
      <Flex
        direction={"column"}
        align={"center"}
        justify={"center"}
        w={"clamp(350px, 55vw, 1300px)"}
      >
        <Flex justify={"space-between"} w={"80%"}>
          <Flex w={"30%"} justify={"center"}>
            <Image src="/singup_login_page_frame_top_left.svg" />
          </Flex>
          <Flex w={"30%"} justify={"center"}>
            <Image src="/singup_login_page_frame_top_right.svg" />
          </Flex>
        </Flex>

        <Box position={"relative"} bottom={"clamp(10px, 1.5vw, 30px)"}>
          <Text fontSize={"clamp(15px, 2vw, 50px)"}>{pageTitle}</Text>
        </Box>

        <Stack
          as={"form"}
          onSubmit={handleSubmit}
          gap={"clamp(20px, 2vw, 50px)"}
          marginY={"clamp(10px, 2vw, 90px)"}
          position={"relative"}
          top={"clamp(25px, 2vw, 40px)"}
        >
          <Flex align={"center"} direction={"column"}>
            <Input
              w={"clamp(130px, 20vw, 500px)"}
              height={"clamp(14px, 2vw, 35px)"}
              fontSize={"clamp(11px, 1.5vw, 30px)"}
              textAlign={"center"}
              placeholder="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
            />
            <Image
              w={"clamp(150px, 25vw, 600px)"}
              src="/signup_login_page_input_underline.svg"
              mt={"3px"}
            />
          </Flex>

          <Flex align={"center"} direction={"column"}>
            <Input
              w={"clamp(130px, 20vw, 500px)"}
              height={"clamp(14px, 2vw, 35px)"}
              fontSize={"clamp(11px, 1.5vw, 30px)"}
              textAlign={"center"}
              placeholder="password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              required
              autoComplete="off"
            />
            <Image
              w={"clamp(150px, 25vw, 600px)"}
              src="/signup_login_page_input_underline.svg"
              mt={"3px"}
            />
          </Flex>

          {pageTitle === "Signup" && (
            <Flex align={"center"} direction={"column"}>
              <Input
                w={"clamp(130px, 20vw, 500px)"}
                height={"clamp(14px, 2vw, 35px)"}
                fontSize={"clamp(11px, 1.5vw, 30px)"}
                textAlign={"center"}
                placeholder="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
              <Image
                w={"clamp(150px, 25vw, 600px)"}
                src="/signup_login_page_input_underline.svg"
                mt={"3px"}
              />
            </Flex>
          )}

          <LoginSignupPasswordresetPageButton
            isLoading={isLoading}
            children={"submit"}
          />
        </Stack>

        <HStack gap={"clamp(15px, 4vw, 50px)"}>
          <Button
            position={"relative"}
            top={"clamp(40px, 4.5vw, 110px)"}
            color={"gray.400"}
            _hover={{ color: "red.600" }}
            transition={".5s"}
            onClick={() => navigate(toLink)}
          >
            <Text fontSize={"clamp(11px, 1.2vw, 30px)"}>{toLinkTitle}</Text>
          </Button>

          <Button
            position={"relative"}
            top={"clamp(40px, 4.5vw, 110px)"}
            color={"gray.400"}
            _hover={{ color: "red.600" }}
            transition={".5s"}
          >
            <Link to="/password-reset-request-form">
              <Text fontSize={"clamp(11px, 1.2vw, 30px)"}>
                forgot password?
              </Text>
            </Link>
          </Button>
        </HStack>

        <Flex justify={"space-between"} w={"80%"}>
          <Flex w={"30%"} justify={"center"}>
            <Image src="/singup_login_page_frame_bottom_left.svg" />
          </Flex>
          <Flex w={"30%"} justify={"center"}>
            <Image src="/singup_login_page_frame_bottom_right.svg" />
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
});
export default LoginAndSingupPageLayout;
