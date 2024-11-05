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
        sm: "60px 1fr 100px",
        md: "60px 1fr 100px",
      }}
      gridTemplateColumns={{
        sm: "1fr",
        md: "200px 1fr",
      }}
      width="100%"
      height="100vh"
      gap={0}
      color="blackAlpha.700"
      fontWeight="bold"
    >
      <Header />
      <GridItem display={{ sm: "none", md: "block" }} bg="gray.200" area="nav">
        Menu
      </GridItem>

      <Content />
    </Grid>
  );
};
