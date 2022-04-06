import React from 'react';
import { Heading, Box, Text } from '@chakra-ui/react';

import AddSiteModal from './AddSiteModal';

const SitesEmptyState = () => {
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
        {`You haven't added any Shows`}
      </Heading>
      <Text>Add your favourite show!</Text>
      <AddSiteModal>Add new show</AddSiteModal>
    </Box>
  );
};
export default SitesEmptyState;
