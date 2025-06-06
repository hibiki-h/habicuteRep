import AxiosInstance from "@/api/todoListsApi";
import { Flex, Image, Box, Text, Stack } from "@chakra-ui/react";
import { memo, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { useForm } from "react-hook-form";

import LoginSignupPasswordresetPageButton from "../atoms/LoginSignupPasswordresetPageButton";

type FormType = {
  password: string;
};

const PasswordReset = memo(() => {
  const navigate = useNavigate();
  const { token } = useParams();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { handleSubmit, register } = useForm<FormType>();

  const submission = async (data: FormType) => {
    setIsLoading(true);
    console.log(`submissions data log :${data.password}`);

    try {
      const response = await AxiosInstance.post("api/password-reset/confirm/", {
        password: data.password,
        token: token,
      });

      console.log(`submission function response data :${response.data}`);
      if (response.status >= 200 && response.status < 300) {
        alert("成功");
        navigate("/login");
      } else {
        alert("パスワードリセット失敗、別のパスワードで入力してください");
      }
    } catch (error) {
      alert("パスワードリセット失敗、別のパスワードで入力してください");
      console.log(`Error during submission function :${error}`);
    } finally {
      setIsLoading(false);
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
          w={"clamp(350px, 55vw, 1400px)"}
        >
          <Flex justify={"space-between"} w={"80%"}>
            <Flex w={"30%"} justify={"center"}>
              <Image src="/singup_login_page_frame_top_left.svg" />
            </Flex>
            <Flex w={"30%"} justify={"center"}>
              <Image src="/singup_login_page_frame_top_right.svg" />
            </Flex>
          </Flex>

          <Box position={"relative"} bottom={"clamp(10px, 1.5vw, 20px)"}>
            <Text fontSize={"clamp(15px, 2vw, 50px)"}>Password reset form</Text>
          </Box>

          <form onSubmit={handleSubmit(submission)}>
            <Stack
              gap={"clamp(20px, 3vw, 110px)"}
              marginY={"clamp(10px, 3vw, 100px)"}
              position={"relative"}
              top={"clamp(25px, 2vw, 50px)"}
            >
              <Flex align={"center"} direction={"column"}>
                <Flex>
                  <Box
                    height={"clamp(14px, 2vw, 40px)"}
                    fontSize={"clamp(11px, 1.5vw, 32px)"}
                    textAlign={"center"}
                  >
                    <input
                      type="password"
                      placeholder="password"
                      autoComplete="off"
                      {...register("password", {
                        required: "password required",
                        minLength: {
                          value: 8,
                          message: "Password must be at least 8 characters",
                        },
                      })}
                      style={{
                        outline: "none",
                        boxShadow: "none",
                        width: "clamp(130px, 20vw, 500px)",
                      }}
                    />
                  </Box>
                </Flex>

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
          </form>

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
export default PasswordReset;
