import React from 'react';
import { Heading, Box, Text } from '@chakra-ui/react';

import AddShowModal from './AddShowModal';

const ShowsEmptyState = () => {
  return (
    <Box
      backgroundColor="white"
      p={8}
      ml={16}
      mr={16}
      mb={16}
      mt={4}
      textAlign="center"
    >
      <Heading as="h3" size="md">
        {`There are no shows added yet`}
      </Heading>
      <Text>Be the first one here!</Text>
      <AddShowModal>Add a new show</AddShowModal>
    </Box>
  );
};
export default ShowsEmptyState;
