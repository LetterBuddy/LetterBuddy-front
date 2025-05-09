import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { BrowserRouter } from "react-router-dom";
import Login from "../components/auth/Login";
import axiosAPI from "../axiosAPI";

describe("Login component", () => {
  beforeEach(() => {
    vi.spyOn(window.localStorage.__proto__, "setItem");
  });

  it("handles login submission", async () => {
    // render the login component inside a router
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );

    // check that all the components are rendered
    const usernameInput = screen.getByPlaceholderText(/User Name/i);
    const passwordInput = screen.getByPlaceholderText(/Password/i);
    const loginButton = screen.getByRole("button", { name: /Log In/i });

    // mimic a user typing in the username and password fields
    fireEvent.change(usernameInput, { target: { value: "string" } });
    fireEvent.change(passwordInput, { target: { value: "string1234" } });

    // fakes a successful login response with fake tokens
    const mockAxiosPost = vi.spyOn(axiosAPI, "post").mockResolvedValue({
      data: {
        access: "fake-access-token",
        refresh: "fake-refresh-token",
      },
    });

    // submit the form
    fireEvent.click(loginButton);

    // verify that the endpoint and data are correct
    await waitFor(() => {
      expect(mockAxiosPost).toHaveBeenCalledWith("/accounts/login/", {
        username: "string",
        password: "string1234",
      });
    });

    // verify that the local storage is set with the tokens
    expect(localStorage.setItem).toHaveBeenCalledWith(
      "access_token",
      "fake-access-token"
    );
    expect(localStorage.setItem).toHaveBeenCalledWith(
      "refresh_token",
      "fake-refresh-token"
    );
  });
});
