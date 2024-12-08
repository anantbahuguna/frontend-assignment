import React from "react";
import { screen, render } from "@testing-library/react";
import ProjectsTable from "../components/ProjectsTable/ProjectsTable";
import { mockProjectsData } from "./mocks/mockProjectsData";

describe("ProjectsTable Component", () => {
  test("renders projects table headers correctly", () => {
    render(<ProjectsTable projects={mockProjectsData} />);

    // Check if the headers are present
    expect(screen.getByText("S.No.")).toBeInTheDocument();
    expect(screen.getByText("Percentage funded")).toBeInTheDocument();
    expect(screen.getByText("Amount pledged")).toBeInTheDocument();
  });

  test("renders correct data in rows", () => {
    render(<ProjectsTable projects={mockProjectsData} />);

    // Check if row data matches
    expect(screen.getByText("0")).toBeInTheDocument(); // S.No.
    expect(screen.getByText("186")).toBeInTheDocument(); // Funded
    expect(screen.getByText("15823")).toBeInTheDocument(); // Pledged
  });

  test("renders 'No data available' when data is empty", () => {
    render(<ProjectsTable projects={[]} />);

    expect(
      screen.getByText("No data available", { exact: false })
    ).toBeInTheDocument();
  });

  test("renders 'No data available' when data is undefined", () => {
    render(<ProjectsTable />);

    expect(
      screen.getByText("No data available", { exact: false })
    ).toBeInTheDocument();
  });
});
