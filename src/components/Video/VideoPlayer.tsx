import {
  useState,
  useRef,
  useEffect,
  useCallback,
  PropsWithChildren,
} from "react";
import {
  Box,
  HStack,
  Button,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  Spinner,
} from "@chakra-ui/react";
import { MdOutlinePlayArrow, MdOutlinePause } from "react-icons/md";
import { Annotation } from "../../utility/types";

interface Props {
  annotations: Annotation[][];

  isLoadingAnnotations: boolean;

  errorGettingAnnotations: unknown;
}

const VIDEO_FRAME_RATE = 30;

const CenteredView = ({ children }: PropsWithChildren) => (
  <Box width="100%" height="100%" position="relative">
    <Box
      position="absolute"
      top="50%"
      left="50%"
      transform="translate(-50%, -50%)"
    >
      {children}
    </Box>
  </Box>
);

export const VideoPlayer = ({
  annotations,
  isLoadingAnnotations,
  errorGettingAnnotations,
}: Props) => {
  const [canvasDimensions, setCanvasDimensions] = useState({
    width: 0,
    height: 0,
  });
  const [frameDataInfo, setFrameDataInfo] = useState("");
  const [videoPosition, setVideoPosition] = useState(0);
  const [playbackIcon, setPlaybackIcon] = useState(<MdOutlinePlayArrow />);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const video = videoRef.current;
    const canvas = canvasRef.current;

    if (video && canvas) {
      // Need to set the canvas dimensions to match that of the video to
      // correctly draw the annotation rectangles.
      setCanvasDimensions({
        width: video.clientWidth,
        height: video.clientHeight,
      });
    }
  }, []);

  const drawRectangles = useCallback(
    (frame: number) => {
      const video = videoRef.current;
      const canvas = canvasRef.current;

      if (video && canvas) {
        const ctx = canvas.getContext("2d");

        if (!ctx) {
          return;
        }

        // Clear previously drawn rectangles first.
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        const frameData = annotations[frame];
        setFrameDataInfo(
          `Frame ${frame}: ${frameData ? JSON.stringify(frameData) : "-"}`,
        );
        if (frameData) {
          frameData.forEach((rect) => {
            const [x, y, width, height] = rect;
            // x and y represent coordinates for the centre of the rectangle
            // so need to calculate top left coordinates for canvas drawing.
            // Need to multiply the coordinates by how much the respective
            // canvas dimension is a proportion of the video's original
            // dimension.
            const topLeftX =
              (x - width / 2) * (canvasDimensions.width / video.videoWidth);
            const topLeftY =
              (y - height / 2) * (canvasDimensions.height / video.videoHeight);
            const scaledWidth =
              width * (canvasDimensions.width / video.videoWidth);
            const scaledHeight =
              height * (canvasDimensions.height / video.videoHeight);
            ctx.strokeStyle = "red";
            ctx.strokeRect(topLeftX, topLeftY, scaledWidth, scaledHeight);
          });
        }
      }
    },
    [annotations, canvasDimensions],
  );

  const handleTimeUpdate = useCallback(() => {
    const video = videoRef.current;

    if (video) {
      const currentFrame = Math.floor(video.currentTime * VIDEO_FRAME_RATE);
      setVideoPosition(video.currentTime);
      drawRectangles(currentFrame);

      if (video.ended) {
        setPlaybackIcon(<MdOutlinePlayArrow />);
      }
    }
  }, [drawRectangles]);

  const handleResize = useCallback(() => {
    const video = videoRef.current;
    const canvas = canvasRef.current;

    if (video && canvas) {
      setCanvasDimensions({
        width: video.clientWidth,
        height: video.clientHeight,
      });
      // Need to redraw rectangles for the current frame on resize of window.
      drawRectangles(Math.floor(video.currentTime * VIDEO_FRAME_RATE));
    }
  }, [drawRectangles]);

  useEffect(() => {
    const video = videoRef.current;

    if (video) {
      video.addEventListener("timeupdate", handleTimeUpdate);
    }
    window.addEventListener("resize", handleResize);

    return () => {
      if (video) {
        video.removeEventListener("timeupdate", handleTimeUpdate);
      }
      window.removeEventListener("resize", handleResize);
    };
  }, [annotations, handleResize, handleTimeUpdate]);

  const handleVideoPlayback = () => {
    const video = videoRef.current;

    if (video) {
      if (video.paused || video.ended) {
        video.play();
        setPlaybackIcon(<MdOutlinePause />);
      } else {
        video.pause();
        setPlaybackIcon(<MdOutlinePlayArrow />);
      }
    }
  };

  const handleVideoScrub = (value: number) => {
    setVideoPosition(value);
    if (videoRef.current) {
      videoRef.current.currentTime = value;
    }
  };

  if (isLoadingAnnotations) {
    return (
      <CenteredView>
        <Spinner />
      </CenteredView>
    );
  }

  if (errorGettingAnnotations) {
    return (
      <CenteredView>
        There has been a problem loading the annotations.
      </CenteredView>
    );
  }

  return (
    annotations && (
      <>
        <Box position="relative">
          <video
            ref={videoRef}
            style={{ width: "100%", height: "auto" }}
            poster="video-poster.jpg"
            playsInline
            muted
            aria-label="Video"
          >
            <source
              src="https://reach-industries-candidate-tests.s3.eu-west-2.amazonaws.com/FrontendCandidateTest-FINAL.mp4"
              type="video/mp4"
            />
            <track kind="captions" />
            Your browser does not support playing back this video.
          </video>
          <canvas
            ref={canvasRef}
            style={{ position: "absolute", top: 0, left: 0 }}
            width={canvasDimensions.width}
            height={canvasDimensions.height}
            data-testid="canvas"
          />
        </Box>

        <HStack>
          <Box width="30%">
            <Button onClick={handleVideoPlayback} aria-label="Playback">
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
          onChange={handleVideoScrub}
          min={0}
          max={videoRef?.current?.duration ? videoRef.current.duration : 0}
          value={videoPosition}
          step={1 / VIDEO_FRAME_RATE}
        >
          <SliderTrack>
            <SliderFilledTrack />
          </SliderTrack>
          <SliderThumb />
        </Slider>
      </>
    )
  );
};
