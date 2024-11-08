import { CommentPub } from "../utility/types.ts";
import { useEffect, MutableRefObject } from "react";

export const useScrollTo = (
  ref: MutableRefObject<HTMLDivElement | null>,
  comments: CommentPub[],
) => {
  useEffect(() => {
    if (ref.current) {
      ref.current.scrollTo({
        top: ref.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [comments, ref]);
};
