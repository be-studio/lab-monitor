import { vi, describe, it, expect } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { Annotations } from "./Annotations";
import * as DownloadFileModule from "../../utility/downloadFile";
import { Annotation } from "../../utility/types";

describe("Annotations Component", () => {
  it("should render without modal initially", () => {
    render(<Annotations annotations={[]} />);

    expect(
      screen.getByRole("button", { name: "Raw JSON Data" }),
    ).toBeInTheDocument();
    expect(screen.queryByRole("dialog", { name: "Raw JSON Data" })).not.toBeInTheDocument();
  });

  it("should show modal on clicking 'Raw JSON Data' button", async () => {
    const user = userEvent.setup();

    render(<Annotations annotations={[]} />);

    expect(screen.queryByRole("dialog", { name: "Raw JSON Data" })).not.toBeInTheDocument();
    expect(screen.queryByTestId("raw-annotations-json-data")).not.toBeInTheDocument();
    expect(screen.queryByRole("button", { name: "Download" })).not.toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Raw JSON Data" }));

    await waitFor(() => {
      expect(screen.getByRole("dialog", { name: "Raw JSON Data" })).toBeInTheDocument();
    });
    expect(screen.getByTestId("raw-annotations-json-data")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Download" })).toBeInTheDocument();
  });

  it("should render with annotations", async () => {
    const annotations: Annotation[][] = [
      [[100, 200, 300, 400]],
      [],
      [
        [200, 300, 400, 500],
        [300, 400, 500, 600],
      ],
    ];

    const user = userEvent.setup();

    render(<Annotations annotations={annotations} />);

    await user.click(screen.getByRole("button", { name: "Raw JSON Data" }));

    await waitFor(() => {
      expect(screen.getByTestId("raw-annotations-json-data")).toBeInTheDocument();
    });
    expect(screen.getByTestId("raw-annotations-json-data")).toHaveTextContent(
      JSON.stringify(annotations),
    );
  });

  it("should call to download file on clicking 'Download' button", async () => {
    const downloadSpy = vi.spyOn(DownloadFileModule, "downloadFile");
    const user = userEvent.setup();
    global.URL.createObjectURL = vi.fn();
    global.URL.revokeObjectURL = vi.fn();

    render(<Annotations annotations={[]} />);

    await user.click(screen.getByRole("button", { name: "Raw JSON Data" }));

    await waitFor(() => {
      expect(screen.getByRole("button", { name: "Download" })).toBeInTheDocument();
    });

    await user.click(screen.getByRole("button", { name: "Download" }));

    expect(downloadSpy).toHaveBeenCalledOnce();
  });
});
