import { vi, describe, it, expect, afterAll } from "vitest";
import { render, screen } from "@testing-library/react";
import { Comments } from "./Comments";
import * as UseScrollToModule from "../../hooks/useScrollTo";

describe("Comments Component", () => {
  vi.mock("../../hooks/useGetComments.ts", () => ({
    useGetComments: () => [
      {
        id: "123",
        name: "Jane Doe",
        picture: "jane.jpg",
        message: "Lorem ipsum dolor",
        time: "12:00:00, 1/1/2024",
      },
      {
        id: "456",
        name: "John Smith",
        picture: "john.jpg",
        message: "Foo Bar",
        time: "13:00:00, 2/1/2024",
      },
    ],
  }));

  vi.mock("../../hooks/useScrollTo.ts", () => ({
    useScrollTo: () => ({
      current: {
        scrollTo: vi.fn(),
      },
    }),
  }));

  afterAll(() => {
    vi.restoreAllMocks();
  });

  it("should render", () => {
    render(<Comments />);

    expect(screen.getAllByRole("img", { name: "Avatar" })).toHaveLength(2);
    const avatars = screen.getAllByRole("img", { name: "Avatar" });
    expect(avatars[0]).toHaveAttribute("src", "jane.jpg");
    expect(avatars[1]).toHaveAttribute("src", "john.jpg");

    expect(screen.getByText("Jane Doe")).toBeInTheDocument();
    expect(screen.getByText("(12:00:00, 1/1/2024)")).toBeInTheDocument();
    expect(screen.getByText("Lorem ipsum dolor")).toBeInTheDocument();

    expect(screen.getByText("Foo Bar")).toBeInTheDocument();
    expect(screen.getByText("(13:00:00, 2/1/2024)")).toBeInTheDocument();
    expect(screen.getByText("John Smith")).toBeInTheDocument();
  });

  it("should attempt scroll of comments to bottom on receiving comments", () => {
    const scrollSpy = vi.spyOn(UseScrollToModule, "useScrollTo");

    render(<Comments />);

    expect(scrollSpy).toHaveBeenCalledOnce();
  });
});
