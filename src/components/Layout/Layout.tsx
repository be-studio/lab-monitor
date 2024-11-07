import { Grid, GridItem } from "@chakra-ui/react";
import { Header } from "./Header";
import { Menu } from "./Menu";
import { VideoContainer } from "../Video/VideoContainer";
import { Comments } from "../Comments/Comments";

export const Layout = () => {
  return (
    <Grid
      templateAreas={{
        sm: `"header"
          "main"
          "footer"`,
        md: `"header header"
          "nav main"
          "nav footer"`,
      }}
      gridTemplateRows={{
        sm: "3em 1fr 10em",
        md: "3em 1fr 10em",
      }}
      gridTemplateColumns={{
        sm: "1fr",
        md: "12rem 1fr",
      }}
      width="100%"
      height="100vh"
      gap={0}
      color="blackAlpha.700"
    >
      <GridItem background="gray.300" paddingLeft="1em" area="header">
        <Header />
      </GridItem>

      <GridItem
        display={{ sm: "none", md: "block" }}
        background="gray.200"
        padding="1em"
        area="nav"
      >
        <Menu />
      </GridItem>

      <GridItem background="gray.100" area="main">
        <VideoContainer />
      </GridItem>

      <GridItem background="white" area="footer">
        <Comments />
      </GridItem>
    </Grid>
  );
};
