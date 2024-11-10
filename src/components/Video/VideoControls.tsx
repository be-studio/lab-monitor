import { ReactNode } from "react";
import {
  HStack,
  Box,
  Button,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
} from "@chakra-ui/react";
import { VIDEO_FRAME_RATE } from "../../utility/constants";

interface Props {
  onVideoPlayback: () => void;

  playbackIcon: ReactNode;

  frameDataInfo: string;

  onVideoScrub: (value: number) => void;

  videoDuration: number;

  videoPosition: number;
}

export const VideoControls = ({
  onVideoPlayback,
  playbackIcon,
  frameDataInfo,
  onVideoScrub,
  videoDuration,
  videoPosition,
}: Props) => {
  return (
    <>
      <HStack>
        <Box width="30%">
          <Button onClick={onVideoPlayback} aria-label="Playback">
            {playbackIcon}
          </Button>
        </Box>

        <Box
          width="70%"
          textAlign="right"
          fontSize={{ base: "0.65rem", md: "1rem" }}
          data-testid="video-frame-info"
        >
          {frameDataInfo}
        </Box>
      </HStack>

      <Slider
        aria-label="Video Scrubber"
        onChange={onVideoScrub}
        min={0}
        max={videoDuration}
        value={videoPosition}
        step={1 / VIDEO_FRAME_RATE}
      >
        <SliderTrack>
          <SliderFilledTrack />
        </SliderTrack>
        <SliderThumb />
      </Slider>
    </>
  );
};
