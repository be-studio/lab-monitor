import { vi, describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { VideoControls } from "./VideoControls";

describe("VideoControls Component", () => {
  it("should render", () => {
    render(
      <VideoControls
        onVideoPlayback={vi.fn()}
        playbackIcon={<></>}
        frameDataInfo={"Frame 1: []"}
        onVideoScrub={vi.fn()}
        videoDuration={100}
        videoPosition={1}
      />,
    );

    expect(
      screen.getByRole("button", { name: "Playback" }),
    ).toBeInTheDocument();
    expect(screen.getByTestId("video-frame-info")).toBeInTheDocument();
    expect(
      screen.getByRole("slider", { name: "Video Scrubber" }),
    ).toBeInTheDocument();
  });

  it("should render frame data information", () => {
    render(
      <VideoControls
        onVideoPlayback={vi.fn()}
        playbackIcon={<></>}
        frameDataInfo={"Frame 1: []"}
        onVideoScrub={vi.fn()}
        videoDuration={100}
        videoPosition={1}
      />,
    );

    expect(screen.getByTestId("video-frame-info")).toHaveTextContent(
      "Frame 1: []",
    );
  });

  it("should call video playback on clicking playback button", async () => {
    const user = userEvent.setup();
    const onVideoPlayback = vi.fn();

    render(
      <VideoControls
        onVideoPlayback={onVideoPlayback}
        playbackIcon={<></>}
        frameDataInfo={"Frame 1: []"}
        onVideoScrub={vi.fn()}
        videoDuration={100}
        videoPosition={1}
      />,
    );

    await user.click(screen.getByRole("button", { name: "Playback" }));

    expect(onVideoPlayback).toHaveBeenCalledOnce();
  });
});
