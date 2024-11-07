import { useRef, useEffect } from "react";
import { Box } from "@chakra-ui/react";
import { Comment } from "./Comment";
import { useGetComments } from "../../hooks/useGetComments";

export const Comments = () => {
  const commentsRef = useRef<HTMLDivElement | null>(null);

  const comments = useGetComments();

  useEffect(() => {
    if (commentsRef.current) {
      commentsRef.current.scrollTo({
        top: commentsRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [comments]);

  return (
    <Box ref={commentsRef} height="100%" overflowY="scroll">
      {comments.map((comment) => (
        <Comment comment={comment} key={comment.id} />
      ))}
    </Box>
  );
};
