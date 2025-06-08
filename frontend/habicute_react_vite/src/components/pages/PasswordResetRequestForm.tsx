import AxiosInstance from "@/api/todoListsApi";
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
import { ChangeEvent, FormEvent, memo, useState } from "react";
import { useNavigate } from "react-router";
import LoginSignupPasswordresetPageButton from "../atoms/LoginSignupPasswordresetPageButton";
import { useAuth } from "@/providers/AuthContext";

const PasswordResetRequestForm = memo(() => {
  const { handleEmailError, formData, setFormData } = useAuth();

  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const submission = async () => {
    setIsLoading(true);
    try {
      const response = await AxiosInstance.post("api/password-reset/", {
        email: formData.email,
      });
      console.log(`submission function response data :${response.data}`);
      if (response.status >= 200 && response.status < 300) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.log(`Error during submission function :${error}`);
      return false;
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent<HTMLInputElement>) => {
    setIsLoading(true);
    e.preventDefault();
    try {
      if (!handleEmailError(formData)) return;
      const result = await submission();
      if (result) {
        navigate("/login");
        alert(
          "あなたのメールアドレスに贈られたパスワードをもとにパスワードリセットをしてください"
        );
      } else {
        alert("入力されたメールアドレスが見つかりません");
      }
    } catch (error) {
      alert("入力されたメールアドレスが見つかりません");
      console.log(`password reset error log : ${error}`);
    } finally {
      setIsLoading(false);
      setFormData({ username: "", password: "", email: "" });
    }
  };

  return (
    <>
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
            <Text fontSize={"clamp(15px, 2vw, 50px)"}>Password reset form</Text>
          </Box>

          <Stack
            as={"form"}
            onSubmit={handleSubmit}
            gap={"clamp(20px, 2vw, 50px)"}
            marginY={"clamp(10px, 4vw, 100px)"}
            position={"relative"}
            top={"clamp(25px, 2vw, 40px)"}
          >
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

            <LoginSignupPasswordresetPageButton
              isLoading={isLoading}
              children="send mail"
            />
          </Stack>

          <HStack gap={"clamp(15px, 4vw, 50px)"}>
            <Button
              position={"relative"}
              top={"clamp(40px, 4.5vw, 110px)"}
              color={"gray.400"}
              _hover={{ color: "red.600" }}
              transition={".5s"}
              onClick={() => navigate("/signup")}
            >
              <Text fontSize={"clamp(11px, 1.2vw, 30px)"}>Signup page</Text>
            </Button>

            <Button
              position={"relative"}
              top={"clamp(40px, 4.5vw, 110px)"}
              color={"gray.400"}
              _hover={{ color: "red.600" }}
              transition={".5s"}
              h={"auto"}
              onClick={() => navigate("/login")}
            >
              <Text fontSize={"clamp(11px, 1.2vw, 30px)"}>Login page</Text>
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
    </>
  );
});
export default PasswordResetRequestForm;
