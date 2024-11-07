import { Box } from "@chakra-ui/react";
import { useGetAnnotations } from "../../hooks/useGetAnnotations";
import { VideoPlayer } from "./VideoPlayer";
import { Annotations } from "./Annotations";

export const VideoContainer = () => {
  const { isLoading, error, annotations } = useGetAnnotations();

  return (
    <Box height="100%" padding="2rem" overflowY="scroll">
      <VideoPlayer
        annotations={annotations}
        isLoadingAnnotations={isLoading}
        errorGettingAnnotations={error}
      />

      <Annotations annotations={annotations} />
    </Box>
  );
};
