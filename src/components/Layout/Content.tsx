import { GridItem } from "@chakra-ui/react";
import { VideoContainer } from "../Video/VideoContainer";

export const Content = () => {
  return (
    <>
      <GridItem bg="gray.100" area="main">
        <VideoContainer />
      </GridItem>

      <GridItem bg="white" area="footer">Comments</GridItem>
    </>
  );
};
