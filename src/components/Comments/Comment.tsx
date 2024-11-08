import { Flex, Box } from "@chakra-ui/react";
import { Avatar } from "./Avatar";
import { CommentPub } from "../../utility/types";

interface Props {
  comment: CommentPub;
}

export const Comment = ({ comment }: Props) => {
  const { name, picture, message, time } = comment;

  return (
    <Flex>
      <Box padding="0.5em" width="5em">
        <Avatar picture={picture} />
      </Box>

      <Box padding="0.5em" fontSize="0.8rem" flex="1">
        <span data-testid="comment-author-time">
          <strong>{name}</strong> ({time})
        </span>
        <br />
        {message}
      </Box>
    </Flex>
  );
};
