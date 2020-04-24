import React from "react";
import "./App.css";
import { Flex, Heading, Box, Button, Link, Text } from "rebass";

function App() {
  return (
    <Box>
      <Flex px={2} color="white" bg="black" alignItems="center">
        <Text p={2} fontWeight="bold">
          Rebass
        </Text>
        <Box mx="auto" />
        <Link variant="nav" href="#!">
          Profile
        </Link>
      </Flex>
      <Flex alignItems="center" px={3} py={4} bg="muted">
        <Heading>Hello</Heading>
        <Box mx="auto" />
        <Button>Beep</Button>
        <Button ml={2} variant="secondary">
          Boop
        </Button>
      </Flex>
    </Box>
  );
}

export default App;
