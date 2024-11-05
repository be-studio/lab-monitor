import { GridItem } from "@chakra-ui/react";

export const Content = () => {
  return (
    <>
      <GridItem bg="gray.100" area="main">
        Video Content
      </GridItem>

      <GridItem bg="white" area="footer">
        Comments
      </GridItem>
    </>
  );
};
