import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { VideoPlayer } from "./VideoPlayer";

describe("VideoPlayer Component", () => {
  it("should render", () => {
    render(
      <VideoPlayer
        annotations={[]}
        isLoadingAnnotations={false}
        errorGettingAnnotations={false}
      />,
    );

    expect(screen.getByLabelText("Video")).toBeInTheDocument();
    expect(screen.getByTestId("canvas")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Playback" }),
    ).toBeInTheDocument();
    expect(screen.getByTestId("video-frame-info")).toBeInTheDocument();
    expect(screen.getByLabelText("Video Scrubber")).toBeInTheDocument();
  });

  it("should render a spinner if the annotations are loading", () => {
    render(
      <VideoPlayer
        annotations={[]}
        isLoadingAnnotations={true}
        errorGettingAnnotations={false}
      />,
    );

    expect(screen.getByText("Loading...")).toBeInTheDocument();
    expect(screen.queryByLabelText("Video")).not.toBeInTheDocument();
    expect(screen.queryByTestId("canvas")).not.toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: "Playback" }),
    ).not.toBeInTheDocument();
    expect(screen.queryByTestId("video-frame-info")).not.toBeInTheDocument();
    expect(screen.queryByLabelText("Video Scrubber")).not.toBeInTheDocument();
  });

  it("should render a message if there is an error fetching the annotations", () => {
    render(
      <VideoPlayer
        annotations={[]}
        isLoadingAnnotations={false}
        errorGettingAnnotations={new Error("error")}
      />,
    );

    expect(
      screen.getByText("There has been a problem loading the annotations."),
    ).toBeInTheDocument();
    expect(screen.queryByLabelText("Video")).not.toBeInTheDocument();
    expect(screen.queryByTestId("canvas")).not.toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: "Playback" }),
    ).not.toBeInTheDocument();
    expect(screen.queryByTestId("video-frame-info")).not.toBeInTheDocument();
    expect(screen.queryByLabelText("Video Scrubber")).not.toBeInTheDocument();
  });
});
