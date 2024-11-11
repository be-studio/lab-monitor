import {
  useState,
  useRef,
  useEffect,
  useCallback,
  PropsWithChildren,
} from "react";
import { Box, Spinner } from "@chakra-ui/react";
import { MdOutlinePlayArrow, MdOutlinePause } from "react-icons/md";
import { VideoControls } from "./VideoControls";
import { calculateRectangle } from "../../utility/calculateRectangle";
import { Annotation } from "../../utility/types";
import { VIDEO_FRAME_RATE } from "../../utility/constants";

interface Props {
  annotations: Annotation[][];

  isLoadingAnnotations: boolean;

  errorGettingAnnotations: unknown;
}

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
    top: 0,
  });
  const [frameDataInfo, setFrameDataInfo] = useState("");
  const [videoPosition, setVideoPosition] = useState(0);
  const [videoDuration, setVideoDuration] = useState(0);
  const [playbackIcon, setPlaybackIcon] = useState(<MdOutlinePlayArrow />);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Only on loaded metadata of the video will we have all the information about
  // video such as its native dimensions to be able to correctly calculate sizes
  // for the canvas and its position in relation to the size and position of the
  // rendered video.
  const handleLoadedMetadata = () => {
    const video = videoRef.current;

    if (video) {
      const renderedVideoHeight =
        video.videoHeight * (video.clientWidth / video.videoWidth);
      console.log(video.videoHeight, video.clientWidth, video.videoWidth);

      setCanvasDimensions({
        width: video.clientWidth,
        height: renderedVideoHeight,
        top: (video.clientHeight - renderedVideoHeight) / 2,
      });
    }
  };

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
          frameData.forEach((rectangle) => {
            const videoNativeDimensions = {
              width: video.videoWidth,
              height: video.videoHeight,
            };
            const [topLeftX, topLeftY, scaledWidth, scaledHeight] =
              calculateRectangle(
                rectangle,
                canvasDimensions,
                videoNativeDimensions,
              );
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

      if (videoDuration === 0) {
        setVideoDuration(() => (isNaN(video.duration) ? 0 : video.duration));
      }
      if (video.ended) {
        setPlaybackIcon(<MdOutlinePlayArrow />);
      }
    }
  }, [drawRectangles, videoDuration]);

  const handleResize = useCallback(() => {
    const video = videoRef.current;
    const canvas = canvasRef.current;

    if (video && canvas) {
      const renderedVideoHeight =
        video.videoHeight * (video.clientWidth / video.videoWidth);

      setCanvasDimensions({
        width: video.clientWidth,
        height: renderedVideoHeight,
        top: (video.clientHeight - renderedVideoHeight) / 2,
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
        <Box
          position="relative"
          width="fit-content"
          height="fit-content"
          margin="0 auto"
        >
          <video
            ref={videoRef}
            style={{
              width: "auto",
              height: "calc(100vh - 450px)",
              margin: "0 auto",
            }}
            poster="video-poster.jpg"
            playsInline
            muted
            aria-label="Video"
            onLoadedMetadata={handleLoadedMetadata}
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
            style={{ position: "absolute", top: canvasDimensions.top, left: 0 }}
            width={canvasDimensions.width}
            height={canvasDimensions.height}
            data-testid="canvas"
          />
        </Box>

        <VideoControls
          onVideoPlayback={handleVideoPlayback}
          playbackIcon={playbackIcon}
          frameDataInfo={frameDataInfo}
          onVideoScrub={handleVideoScrub}
          videoDuration={videoDuration}
          videoPosition={videoPosition}
        />
      </>
    )
  );
};
