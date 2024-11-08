import { useRef } from "react";
import { Box } from "@chakra-ui/react";
import { Comment } from "./Comment";
import { useGetComments } from "../../hooks/useGetComments";
import { useScrollTo } from "../../hooks/useScrollTo";

export const Comments = () => {
  const commentsRef = useRef<HTMLDivElement | null>(null);

  const comments = useGetComments();

  // Hook to auto-scroll comments div to bottom to bring latest comment
  // into view.
  useScrollTo(commentsRef, comments);

  return (
    <Box ref={commentsRef} height="100%" overflowY="scroll">
      {comments.map((comment) => (
        <Comment comment={comment} key={comment.id} />
      ))}
    </Box>
  );
};
