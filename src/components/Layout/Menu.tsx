import { List, ListItem, Link } from "@chakra-ui/react";

export const Menu = () => {
  return (
    <List spacing={3}>
      <ListItem>
        <Link href="#" fontWeight="bold">
          Experiment 1
        </Link>
      </ListItem>

      <ListItem>
        <Link href="#">Experiment 2</Link>
      </ListItem>

      <ListItem>
        <Link href="#">Experiment 3</Link>
      </ListItem>
    </List>
  );
};
