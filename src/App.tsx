import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { Layout } from "./components/Layout/Layout";

const theme = extendTheme({
  components: {
    Button: {
      baseStyle: {
        marginTop: "0.1em",
        border: "1px solid",
        borderColor: "gray.300",
      },
    },
  },
});

const App = () => {
  return (
    <ChakraProvider theme={theme}>
      <Layout />
    </ChakraProvider>
  );
};

export default App;
