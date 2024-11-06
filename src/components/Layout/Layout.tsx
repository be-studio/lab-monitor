import { Grid, GridItem } from "@chakra-ui/react";
import { Header } from "./Header";
import { Content } from "./Content";

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
        md: "10em 1fr",
      }}
      width="100%"
      height="100vh"
      gap={0}
      color="blackAlpha.700"
    >
      <Header />
      <GridItem display={{ sm: "none", md: "block" }} bg="gray.200" area="nav">
        Menu
      </GridItem>

      <Content />
    </Grid>
  );
};
