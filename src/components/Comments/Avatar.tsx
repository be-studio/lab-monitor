import { Image } from "@chakra-ui/react";

interface Props {
  picture: string;
}

export const Avatar = ({ picture }: Props) => (
  <Image src={picture} width="40px" height="40px" borderRadius="50%" />
);
