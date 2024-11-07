import { List, ListItem, Link } from "@chakra-ui/react";

export const Menu = () => {
  return (
    <List spacing={3}>
      <ListItem>
        <Link>Experiment 1</Link>
      </ListItem>

      <ListItem>
        <Link>Experiment 2</Link>
      </ListItem>

      <ListItem>
        <Link>Experiment 3</Link>
      </ListItem>
    </List>
  );
};
