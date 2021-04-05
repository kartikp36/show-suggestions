import React from 'react';
import {
  Box,
  Heading,
  Text,
  Divider,
  Icon,
  Flex,
  Code,
} from '@chakra-ui/react';
import { format, parseISO } from 'date-fns';

const Feedback = ({ author, text, createdAt }) => {
  return (
    <Box borderRadius={4} maxWidth="700px" w="full">
      <Flex align="center">
        <Heading size="sm" as="h3" mb={0} fontWeight="medium">
          {author}
        </Heading>
      </Flex>
      <Text color="gray.500" mb={4} fontSize="xs">
        {format(parseISO(createdAt), 'PPpp')}
      </Text>
      <Text color="gray.800">{text}</Text>
      <Divider bordorColor="gray.200" background="gray.200"></Divider>
    </Box>
  );
};

export default Feedback;
