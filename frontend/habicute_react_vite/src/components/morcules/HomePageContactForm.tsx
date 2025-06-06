import { Box, Field, Fieldset, Flex, Image, Input } from "@chakra-ui/react";
import { Dispatch, memo, SetStateAction } from "react";

import { ContactFormType } from "@/types/Types";

type Props = {
  children: string;
  form: ContactFormType;
  setForm: Dispatch<SetStateAction<ContactFormType>>;
  formprop: keyof ContactFormType;
};

const HomePageContactForm = memo((props: Props) => {
  const { children, form, setForm, formprop } = props;

  return (
    <>
      <Flex direction={"row"} gap={"clamp(.8vw, 1vw, 1.2vw)"} mb={"5vh"}>
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
            left={"50%"}
            transform={"translateX(-50%)"}
            position={"relative"}
          >
            <Fieldset.Root>
              <Field.Root>
                <Input
                  height={"clamp(23px,1.5vw,50px)"}
                  mb={"clamp(5px, 1vw, 10px)"}
                  name={formprop}
                  type={formprop}
                  value={form[formprop as keyof ContactFormType]}
                  onChange={(e) =>
                    setForm({ ...form, [formprop]: e.target.value })
                  }
                  fontSize={"clamp(12px, 1.5vw, 35px)"}
                />
              </Field.Root>
            </Fieldset.Root>
          </Box>
          <Box maxW={"100%"}>
            <Image
              src="/home_page_contact_underline.svg"
              height={""}
              w={"clamp(80%, 100%, 100%)"}
              position={"relative"}
              bottom={"clamp(5px, 1vw, 8px)"}
            />
          </Box>
        </Box>
      </Flex>
    </>
  );
});
export default HomePageContactForm;
