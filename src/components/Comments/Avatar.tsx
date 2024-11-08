import { Image } from "@chakra-ui/react";

interface Props {
  picture: string;
}

export const Avatar = ({ picture }: Props) => (
  <Image
    src={picture}
    width="3rem"
    height="3rem"
    borderRadius="50%"
    aria-label="Avatar"
    alt="Avatar"
  />
);
