import { Box, Heading } from "@chakra-ui/react";
import { useGetAnnotations } from "../../hooks/useGetAnnotations";
import { VideoPlayer } from "./VideoPlayer";
import { Annotations } from "./Annotations";

export const VideoContainer = () => {
  const { isLoading, error, annotations } = useGetAnnotations();

  return (
    <Box height="100%" maxHeight="100%" padding="2rem">
      <Heading
        fontSize={{ base: "1rem", sm: "1rem", md: "1.2rem" }}
        paddingBottom="0.25rem"
      >
        Experiment 1
      </Heading>

      <VideoPlayer
        annotations={annotations}
        isLoadingAnnotations={isLoading}
        errorGettingAnnotations={error}
      />

      <Annotations annotations={annotations} />
    </Box>
  );
};
