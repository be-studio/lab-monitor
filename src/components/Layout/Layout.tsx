import {
  Grid,
  GridItem,
  Flex,
  Box,
  Drawer,
  DrawerBody,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
} from "@chakra-ui/react";
import { Header } from "./Header";
import { Menu } from "./Menu";
import { VideoContainer } from "../Video/VideoContainer";
import { Comments } from "../Comments/Comments";

export const Layout = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleOpenMobileMenu = () => {
    onOpen();
  };

  return (
    <>
      <Grid
        templateAreas={{
          base: `"header"
          "main"`,
          md: `"header header"
          "nav main"`,
        }}
        gridTemplateRows={{
          base: "3em 1fr",
          sm: "3em 1fr",
          md: "3em 1fr",
        }}
        gridTemplateColumns={{
          base: "1fr",
          md: "12em 1fr",
        }}
        width="100%"
        height="100vh"
        gap={0}
        color="blackAlpha.700"
      >
        <GridItem backgroundColor="gray.300" paddingLeft="1em" area="header">
          <Header onOpenMobileMenu={handleOpenMobileMenu} />
        </GridItem>

        <GridItem
          display={{ base: "none", md: "block" }}
          backgroundColor="gray.200"
          padding="1em"
          area="nav"
        >
          <Menu />
        </GridItem>

        <GridItem backgroundColor="gray.100" area="main">
          <Flex flexDirection="column">
            <Box flexShrink="1" flexGrow="0">
              <VideoContainer />
            </Box>

            <Box height={{ base: "200px", md: "200px" }}>
              <Comments />
            </Box>
          </Flex>
        </GridItem>
      </Grid>

      <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
        <DrawerOverlay display={{ base: "block", md: "none" }} />
        <DrawerContent
          display={{ base: "block", md: "none" }}
          backgroundColor="gray.200"
          width="10em"
          paddingTop="5em"
        >
          <DrawerCloseButton />
          <DrawerBody>
            <Menu />
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};
