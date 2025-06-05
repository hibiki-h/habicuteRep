import { Box, Flex, Text, Textarea } from "@chakra-ui/react";
import { memo } from "react";

type Props = {
  children?: string;
  exampletext: string;
  formInputProps: string | undefined;
  InputName: string;
  onChangeInputForm: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
};

const TodoPageFormText = memo((props: Props) => {
  const {
    children,
    exampletext,
    formInputProps,
    InputName,
    onChangeInputForm,
  } = props;

  return (
    <>
      <Flex direction={"column"} gap={3} align={"center"}>
        <Flex>
          <Box
            display={"flex"}
            direction={"row"}
            justifyContent={"space-around"}
            alignItems={"center"}
            borderBottom={"1px solid #000"}
            w={"clamp(330px, 35vw, 1200px)"}
            p={"0 2vw"}
          >
            {children && (
              <Text flex={2} mb={".5vh"} fontSize={"clamp(13px, 1.2vw, 30px)"}>
                {children}
              </Text>
            )}
            <Textarea
              flex={9}
              whiteSpace={"pre-wrap"}
              textAlign={"center"}
              position={"relative"}
              bottom={".1vh"}
              height={"auto"}
              rows={1}
              autoresize
              mb={".5vh"}
              fontSize={"clamp(14px , 1.2vw , 30px)"}
              placeholder={`write here`}
              name={InputName}
              value={formInputProps}
              onChange={(e) => {
                onChangeInputForm(e);
              }}
              required
            />
          </Box>
        </Flex>
        <Box w={"clamp(330px, 35vw, 1200px)"}>
          <Text
            whiteSpace="pre-wrap"
            color={"gray.400"}
            textAlign={"center"}
            fontSize={"clamp(14px, 1.2vw, 30px)"}
          >
            {exampletext}
          </Text>
        </Box>
      </Flex>
    </>
  );
});
export default TodoPageFormText;
