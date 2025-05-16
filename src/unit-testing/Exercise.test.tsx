import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import Exercise from "../components/child/Exercise";
import axiosAPI from "../axiosAPI";

describe("Exercise Component", () => {
  it("fetches and displays the exercise word on mount", async () => {
    const mockPost = vi.spyOn(axiosAPI, "post").mockResolvedValueOnce({
      data: {
        id: 1,
        requested_text: "hello",
        level: "words",
        category: "basic",
      },
    });

    render(<Exercise />);

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

    render(<Exercise />);

    const skipButton = screen.getByRole("button", { name: /skip-button/i });
    fireEvent.click(skipButton);

    await waitFor(() => {
      expect(mockDelete).toHaveBeenCalledWith("/exercises/1/");
      expect(mockPost).toHaveBeenCalledWith("/exercises/");
    });
  });
});
