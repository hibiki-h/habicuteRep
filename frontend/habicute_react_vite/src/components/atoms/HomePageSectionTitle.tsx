import { Box, Text } from "@chakra-ui/react";
import { memo } from "react";

type Props = {
  sectionTitle: string;
  sectionComment?: string;
};

const HomePageSectionTitle = memo((props: Props) => {
  const { sectionTitle, sectionComment } = props;

  return (
    <>
      <Box mb={"clamp(25px, 4vw, 400px)"}>
        <Text fontSize={"clamp(18px, 3vw, 50px)"}> {sectionTitle}</Text>
      </Box>
      {sectionComment && (
        <Box
          w="100%"
          display="flex"
          justifyContent="center"
          alignItems={"center"}
        >
          <Text
            w={"60%"}
            textAlign={"center"}
            whiteSpace={"pre-wrap"}
            fontSize={"clamp(12px, 1.5vw, 35px)"}
          >
            {sectionComment}
          </Text>
        </Box>
      )}
    </>
  );
});
export default HomePageSectionTitle;
