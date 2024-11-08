import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Comment } from "./Comment";

describe("Comment Component", () => {
  it("should render", () => {
    render(
      <Comment
        comment={{
          id: "123",
          name: "Jane Doe",
          picture: "jane.jpg",
          message: "Lorem ipsum dolor",
          time: "12:00:00, 1/1/2024",
        }}
      />,
    );

    expect(screen.getByRole("img", { name: "Avatar" })).toBeInTheDocument();
    expect(screen.getByTestId("comment-author-time")).toHaveTextContent(
      "Jane Doe (12:00:00, 1/1/2024)",
    );
    expect(screen.getByText("Lorem ipsum dolor")).toBeInTheDocument();
  });
});
