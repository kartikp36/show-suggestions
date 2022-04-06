import React from 'react';
import PropTypes from 'prop-types';
import { Box, Heading, Text, Divider, Flex, Avatar } from '@chakra-ui/react';
import { format, parseISO } from 'date-fns';

const Feedback = ({ author, text, createdAt, photoUrl }) => {
  return (
    <Box borderRadius={4} maxWidth="700px" w="full">
      <Flex align="center">
        <Avatar size="md" m={2} src={photoUrl} />
        <Heading size="sm" as="h3" mb={2} fontWeight="medium">
          {author}
        </Heading>
      </Flex>
      <Text color="gray.500" mb={2} fontSize="xs">
        {format(parseISO(createdAt), 'PPpp')}
      </Text>
      <Text color="gray.800">{text}</Text>
      <Divider bordorcolor="gray.200" background="gray.200" mb={8}></Divider>
    </Box>
  );
};

export default Feedback;

Feedback.propTypes = {
  author: PropTypes.string,
  text: PropTypes.string,
  createdAt: PropTypes.string,
};
