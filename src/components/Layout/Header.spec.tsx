import { vi, describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Header } from "./Header";

describe("Header Component", () => {
  it("should render", () => {
    render(<Header onOpenMobileMenu={vi.fn()} />);

    expect(
      screen.getByRole("heading", {
        name: "Reach Industries Frontend Assessment",
      }),
    ).toBeInTheDocument();
  });
});
