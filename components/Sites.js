import React from 'react';
import { Heading, Box, Text, Button } from '@chakra-ui/react';
import Dashboard from './DashboardShell';

const Sites = () => {
  return (
    <Dashboard>
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
          You haven't added any sites
        </Heading>
        <Text>Add Your First Site</Text>
        <Button
          variant="solid"
          size="md"
          backgroundColor="gray.700"
          color="white"
          mt={4}
        >
          Add new site
        </Button>
      </Box>
    </Dashboard>
  );
};
export default Sites;
