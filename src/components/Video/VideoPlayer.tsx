import { useState, useRef, useEffect, useCallback } from "react";
import {
  Box,
  HStack,
  Button,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
} from "@chakra-ui/react";
import { Annotation } from "../../utility/types";

interface Props {
  annotations: Annotation[][];

  isLoadingAnnotations: boolean;

  errorGettingAnnotations: unknown;
}

const VIDEO_FRAME_RATE = 30;

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
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    const canvas = canvasRef.current;

    if (video && canvas) {
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
        const ctx = canvasRef.current.getContext("2d");

        if (!ctx) {
          return;
        }

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        const frameData = annotations[frame];
        setFrameDataInfo(
          `Frame ${frame}: ${frameData ? JSON.stringify(frameData) : ""}`,
        );
        if (frameData) {
          frameData.forEach((rect) => {
            const [x, y, width, height] = rect;
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
      if (video.paused) {
        video.play();
      } else {
        video.pause();
      }
    }
  };

  const handleVideoScrub = (value: number) => {
    setVideoPosition(value);
    if (videoRef?.current) {
      videoRef.current.currentTime = value;
    }
  };

  if (isLoadingAnnotations) {
    return <>Loading</>;
  }

  if (errorGettingAnnotations) {
    return <>There has been a problem loading the annotations</>;
  }

  return (
    annotations && (
      <>
        <Box position="relative">
          <video
            ref={videoRef}
            src="https://reach-industries-candidate-tests.s3.eu-west-2.amazonaws.com/FrontendCandidateTest-FINAL.mp4"
            style={{ width: "100%", height: "auto" }}
          >
            <track kind="captions" />
          </video>
          <canvas
            ref={canvasRef}
            style={{ position: "absolute", top: 0, left: 0 }}
            width={canvasDimensions.width}
            height={canvasDimensions.height}
          />
        </Box>

        <HStack>
          <Box width="50%">
            <Button onClick={handleVideoPlayback}>Play</Button>
          </Box>

          <Box width="50%" textAlign="right">
            {frameDataInfo}
          </Box>
        </HStack>

        <Slider
          aria-label="slider-ex-1"
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
