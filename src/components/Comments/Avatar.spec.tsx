import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Avatar } from "./Avatar";

describe("Avatar Component", () => {
  it("should render", () => {
    render(<Avatar picture="test.jpg" />);

    expect(screen.getByRole("img", { name: "Avatar" })).toBeInTheDocument();
  });

  it("should render with correct file", () => {
    render(<Avatar picture="test.jpg" />);

    expect(screen.getByRole("img", { name: "Avatar" })).toHaveAttribute(
      "src",
      "test.jpg",
    );
  });
});
