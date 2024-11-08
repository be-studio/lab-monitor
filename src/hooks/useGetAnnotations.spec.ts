import { vi, describe, it, expect } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";
import { useGetAnnotations } from "./useGetAnnotations";

describe("useGetAnnotations Hook", () => {
  const annotationsData = [
    [[100, 200, 300, 400]],
    [],
    [
      [200, 300, 400, 500],
      [300, 400, 500, 600],
    ],
  ];

  it("should return annotations", async () => {
    const fetchSpy = vi.spyOn(global, "fetch").mockImplementation(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(annotationsData),
      } as Response),
    );

    const { result } = renderHook(() => useGetAnnotations());

    expect(result.current.isLoading).toBe(true);

    await waitFor(() => {
      expect(fetchSpy).toHaveBeenCalledOnce();
    });
    expect(result.current.annotations).toEqual(annotationsData);
    expect(result.current.isLoading).toBe(false);
  });

  it("should return error if API response is not ok", async () => {
    const fetchSpy = vi
      .spyOn(global, "fetch")
      .mockImplementation(() => Promise.resolve({ ok: false } as Response));

    const { result } = renderHook(() => useGetAnnotations());

    await waitFor(() => {
      expect(fetchSpy).toHaveBeenCalledOnce();
    });
    expect(result.current.error).toEqual(
      new Error("Network response was not ok"),
    );
  });

  it("should return error if failed annotations response", async () => {
    const fetchSpy = vi.spyOn(global, "fetch").mockImplementation(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.reject("Error"),
      } as Response),
    );

    const { result } = renderHook(() => useGetAnnotations());

    await waitFor(() => {
      expect(fetchSpy).toHaveBeenCalledOnce();
    });
    expect(result.current.error).toEqual("Error");
  });
});
