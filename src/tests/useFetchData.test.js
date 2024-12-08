import { renderHook, waitFor, act } from "@testing-library/react";
import useFetchData from "../hooks/useFetchData";
import { mockProjectsData } from "./mocks/mockProjectsData";

const API_URL =
  "https://raw.githubusercontent.com/saaslabsco/frontend-assignment/refs/heads/master/frontend-assignment.json";

global.fetch = jest.fn();

describe("useFetchData", () => {
  afterEach(() => {
    fetch.mockClear();
  });

  test("do nothing if no URL is provided", () => {
    // Render the hook
    const { result } = renderHook(() => useFetchData());

    // Assert initial state
    expect(result.current.data).toEqual([]);
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBe(null);

    expect(fetch).not.toHaveBeenCalled();
  });

  test("initial state is correct", () => {
    const { result } = renderHook(() => useFetchData(API_URL));

    expect(result.current.data).toEqual([]);
    expect(result.current.isLoading).toBe(true);
    expect(result.current.error).toBe(null);
  });

  test("fetches data successfully", async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: () => mockProjectsData,
    });
    const { result } = renderHook(() => useFetchData(API_URL));

    expect(result.current.isLoading).toBe(true);

    await waitFor(() => {
      expect(result.current.data).toEqual(mockProjectsData);
    });

    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBe(null);
  });
});
