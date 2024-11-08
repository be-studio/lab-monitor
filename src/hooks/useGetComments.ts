import { useState, useRef, useEffect } from "react";
import { CommentPub } from "../utility/types";

const WEBSOCKET_URL = "wss://ttchatsocket.lumi.systems:443/";

export const useGetComments = () => {
  const [comments, setComments] = useState<CommentPub[]>([]);
  const socketRef = useRef<WebSocket | null>(null);

  const padZeroes = (value: number) => (value < 10 ? "0" + value : value);

  useEffect(() => {
    socketRef.current = new WebSocket(WEBSOCKET_URL);

    socketRef.current.onopen = () => {
      console.log("Connection established with websocket");
    };

    socketRef.current.onmessage = (event) => {
      const newComment = JSON.parse(event.data) as CommentPub;

      // Need to generate unique IDs for each incoming comment to be used as
      // keys when the Comment component is iterated in the Comments
      // component.
      newComment.id = crypto.randomUUID();

      const now = new Date();
      newComment.time = `${now.getHours()}:${padZeroes(now.getMinutes())}:${padZeroes(now.getSeconds())}, ${now.getDate()}/${now.getMonth() + 1}/${now.getFullYear()}`;

      setComments((prevComments) => [...prevComments, newComment]);
    };

    socketRef.current.onclose = () => {
      console.log("Connection to websocket has been closed");
    };

    socketRef.current.onerror = (error) => {
      console.error(
        "There has been an error establishing a connection with websocket: ",
        error,
      );
    };

    return () => {
      if (socketRef.current) {
        socketRef.current.close();
      }
    };
  }, []);

  return comments;
};
