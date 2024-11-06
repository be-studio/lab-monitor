import { Box } from "@chakra-ui/react";
import { useGetAnnotations } from "../../hooks/useGetAnnotations";
import { VideoPlayer } from "./VideoPlayer";

export const VideoContainer = () => {
  const { isLoading, error, annotations } = useGetAnnotations();

  return (
    <Box padding="1rem">
      <VideoPlayer
        annotations={annotations}
        isLoadingAnnotations={isLoading}
        errorGettingAnnotations={error}
      />
    </Box>
  );
};
