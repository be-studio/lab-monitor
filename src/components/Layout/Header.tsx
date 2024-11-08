import { HStack, Box, Button, Heading } from "@chakra-ui/react";
import { MdMenu } from "react-icons/md";

interface Props {
  onOpenMobileMenu: () => void;
}

export const Header = ({ onOpenMobileMenu }: Props) => {
  return (
    <HStack>
      <Box display={{ base: "block", md: "none" }}>
        <Button
          backgroundColor="gray.300"
          aria-label="Open Menu"
          onClick={onOpenMobileMenu}
        >
          <MdMenu />
        </Button>
      </Box>

      <Box>
        <Heading fontSize={{ base: "1.1rem", sm: "1.5rem", md: "2rem" }}>
          Reach Industries Frontend Assessment
        </Heading>
      </Box>
    </HStack>
  );
};
