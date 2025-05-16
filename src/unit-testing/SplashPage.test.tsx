import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { BrowserRouter } from "react-router-dom";
import SplashPage from "../pages/SplashPage";

describe("SplashPage", () => {
  it("renders the splash page content", () => {
    render(
      <BrowserRouter>
        <SplashPage />
      </BrowserRouter>
    );

    const label = screen.getByText(
      /a personal AI assistant to help your kids improve their handwriting/i
    );
    const image = screen.getByAltText("myPen");
    const getStartedButton = screen.getByRole("button", {
      name: /GET STARTED/i,
    });
    const alreadyHasAccountButton = screen.getByRole("button", {
      name: /I already have an account/i,
    });

    expect(label).toBeInTheDocument();
    expect(image).toBeInTheDocument();
    expect(getStartedButton).toBeInTheDocument();
    expect(getStartedButton).toHaveTextContent("GET STARTED");
    expect(alreadyHasAccountButton).toBeInTheDocument();
    expect(alreadyHasAccountButton).toHaveTextContent(
      "I already have an account"
    );
  });
});
