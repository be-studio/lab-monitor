import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Menu } from "./Menu";

describe("Menu Component", () => {
  it("should render", () => {
    render(<Menu />);

    expect(screen.getAllByRole("link")).toHaveLength(3);
  });

  it("should render links", () => {
    render(<Menu />);

    const links = screen.getAllByRole("link");
    expect(links[0]).toHaveTextContent("Experiment 1");
    expect(links[0]).toHaveAttribute("href", "#");
    expect(links[1]).toHaveTextContent("Experiment 2");
    expect(links[1]).toHaveAttribute("href", "#");
    expect(links[2]).toHaveTextContent("Experiment 3");
    expect(links[2]).toHaveAttribute("href", "#");
  });
});
