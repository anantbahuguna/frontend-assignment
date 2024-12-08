import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import Pagination from "../components/Pagination/Pagination";

describe("Pagination Component", () => {
  test("renders pagination buttons correctly", () => {
    render(
      <Pagination
        totalItems={50}
        itemsPerPage={10}
        currentPage={0}
        onPageChange={jest.fn()}
        setItemsPerPage={jest.fn()}
        setCurrentPage={jest.fn()}
        visibleRange={2}
      />
    );

    // Check if pagination buttons are rendered
    expect(screen.getByText("1")).toBeInTheDocument();
    expect(screen.getByText("2")).toBeInTheDocument();
    expect(screen.getByText("3")).toBeInTheDocument();
  });

  test("handles page navigation correctly", () => {
    const onPageChange = jest.fn();
    render(
      <Pagination
        totalItems={50}
        itemsPerPage={10}
        currentPage={0}
        onPageChange={onPageChange}
        setItemsPerPage={jest.fn()}
        setCurrentPage={jest.fn()}
        visibleRange={2}
      />
    );

    fireEvent.click(screen.getByText("2"));
    expect(onPageChange).toHaveBeenCalledWith(1);
  });
});
