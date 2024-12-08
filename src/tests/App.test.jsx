import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import App from "../App"; // Adjust the path as necessary
import { mockProjectsData } from "./mocks/mockProjectsData";
import useFetchData from "../hooks/useFetchData";

jest.mock("../hooks/useFetchData");

describe("App Component", () => {
  test("matches snapshot for loading state", () => {
    useFetchData.mockReturnValue({
      data: [],
      isLoading: true,
      error: null,
    });

    const { asFragment } = render(<App />);
    expect(asFragment()).toMatchSnapshot();
  });

  test("renders App with fetched data", async () => {
    useFetchData.mockReturnValue({
      data: mockProjectsData,
      isLoading: false,
      error: null,
    });

    render(<App />);

    expect(screen.getByText("15823")).toBeInTheDocument();
    expect(screen.getByText("6859")).toBeInTheDocument();
  });

  test("renders error message when fetch fails", () => {
    useFetchData.mockReturnValue({
      data: [],
      loading: false,
      error: "Failed to fetch",
    });

    render(<App />);
    expect(
      screen.getByText("Failed to fetch", { exact: false })
    ).toBeInTheDocument();
  });
});
