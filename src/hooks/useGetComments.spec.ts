import { vi, describe, it, expect, Mock } from "vitest";
import { act, renderHook } from "@testing-library/react";
import { useGetComments } from "./useGetComments";

interface MockedWebSocket extends WebSocket {
  send: Mock;

  close: Mock;

  onopen: Mock | null;

  onmessage: Mock | null;

  onerror: Mock | null;

  onclose: Mock | null;
}

describe("useGetComments Hook", () => {
  it("should return comments", async () => {
    vi.useFakeTimers({ shouldAdvanceTime: true }).setSystemTime(
      "2024-01-01T12:00",
    );

    const mockWebSocket: MockedWebSocket = {
      send: vi.fn(),
      close: vi.fn(),
      onopen: null,
      onmessage: null,
      onerror: null,
      onclose: null,
    } as MockedWebSocket;

    vi.spyOn(global, "WebSocket").mockImplementationOnce(
      () => mockWebSocket as WebSocket,
    );

    const { result } = renderHook(() => useGetComments());

    act(() => {
      if (mockWebSocket.onopen) {
        mockWebSocket.onopen();
      }
    });

    const comment = JSON.stringify({
      name: "Jane Doe",
      picture: "jane.jpg",
      message: "Lorem ipsum dolor",
    });
    act(() => {
      if (mockWebSocket.onmessage) {
        mockWebSocket.onmessage({ data: comment } as MessageEvent);
      }
    });
    expect(result.current).toEqual([
      expect.objectContaining({
        name: "Jane Doe",
        picture: "jane.jpg",
        message: "Lorem ipsum dolor",
        time: "12:00:00, 1/1/2024",
      }),
    ]);

    vi.useRealTimers();
  });
});
