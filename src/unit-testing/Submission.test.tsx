import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import Submission from "../components/child/Submission";
import axiosAPI from "../axiosAPI";

describe("Submission Component", () => {
  it("fetches and displays the exercise word on mount", async () => {
    const mockPost = vi.spyOn(axiosAPI, "post").mockResolvedValueOnce({
      data: {
        id: 1,
        requested_text: "hello",
        level: "words",
        category: "basic",
      },
    });

    render(<Submission />);

    await waitFor(() => {
      expect(mockPost).toHaveBeenCalledWith("/exercises/");
      expect(screen.getByText("hello")).toBeInTheDocument();
    });
  });

  it("skips an exercise and fetches a new one", async () => {
    const mockDelete = vi.spyOn(axiosAPI, "delete").mockResolvedValueOnce({});
    const mockPost = vi.spyOn(axiosAPI, "post").mockResolvedValueOnce({
      data: {
        id: 2,
        requested_text: "new-word",
        level: "words",
        category: "basic",
      },
    });

    render(<Submission />);

    const skipButton = screen.getByRole("button", { name: /skip-button/i });
    fireEvent.click(skipButton);

    await waitFor(() => {
      expect(mockDelete).toHaveBeenCalledWith("/exercises/1/");
      expect(mockPost).toHaveBeenCalledWith("/exercises/");
    });
  });
});
