import { Box, Flex, Image, Textarea } from "@chakra-ui/react";
import { Dispatch, memo, SetStateAction } from "react";

import { ContactFormType } from "@/types/Types";

type Props = {
  children: string;
  form: ContactFormType;
  setForm: Dispatch<SetStateAction<ContactFormType>>;
  formprop: keyof ContactFormType;
};

const HomePageContactFormMessage = memo((props: Props) => {
  const { children, form, setForm, formprop } = props;

  return (
    <>
      <Flex
        direction={"row"}
        gap={"clamp(.8vw, 1vw, 1.2vw)"}
        mb={"6vh"}
        mt={"6vh"}
      >
        <Box
          w={"clamp(.5vw, 1vw, 1.5vw)"}
          display={"flex"}
          alignItems={"center"}
          justifyContent={"flex-end"}
          fontSize={"clamp(12px, 1.5vw, 35px)"}
          position={"relative"}
          bottom={"1vw"}
        >
          {children}
        </Box>

        <Box>
          <Box
            maxW={"80%"}
            position={"relative"}
            left={"50%"}
            transform={"translateX(-50%)"}
          >
            <Textarea
              autoresize
              height="auto"
              minHeight="unset"
              rows={1}
              fontSize={"clamp(12px, 1.5vw, 35px)"}
              position={"relative"}
              bottom={"clamp(3px, .1vw, 10px)"}
              typeof={formprop}
              value={form[formprop] as string}
              onChange={(e) => setForm({ ...form, [formprop]: e.target.value })}
            />
          </Box>
          <Box maxW={"100%"}>
            <Image
              src="/home_page_contact_underline.svg"
              height={"auto"}
              w={"clamp(80%, 100%, 100%)"}
              position={"relative"}
              bottom={"clamp(1px, .1vw, 10px)"}
            />
          </Box>
        </Box>
      </Flex>
    </>
  );
});
export default HomePageContactFormMessage;
