import { vi, describe, it, expect } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { Annotations } from "./Annotations";
import * as DownloadFileModule from "../../utility/downloadFile";
import { Annotation } from "../../utility/types";

describe("Annotations Component", () => {
  it("should render without popup initially", () => {
    render(<Annotations annotations={[]} />);

    expect(
      screen.getByRole("button", { name: "Raw JSON Data" }),
    ).toBeInTheDocument();
  });

  it("should show popup on clicking 'Raw JSON Data' button", async () => {
    const user = userEvent.setup();

    render(<Annotations annotations={[]} />);

    expect(screen.getByTestId("raw-annotations-json-data")).not.toBeVisible();

    await user.click(screen.getByRole("button", { name: "Raw JSON Data" }));

    await waitFor(() => {
      expect(screen.getByTestId("raw-annotations-json-data")).toBeVisible();
    });
    expect(screen.getByRole("button", { name: "Download" })).toBeVisible();
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

    expect(screen.getByTestId("raw-annotations-json-data")).not.toBeVisible();

    await user.click(screen.getByRole("button", { name: "Raw JSON Data" }));

    await waitFor(() => {
      expect(screen.getByTestId("raw-annotations-json-data")).toBeVisible();
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
      expect(screen.getByRole("button", { name: "Download" })).toBeVisible();
    });

    await user.click(screen.getByRole("button", { name: "Download" }));

    expect(downloadSpy).toHaveBeenCalledOnce();
  });
});
