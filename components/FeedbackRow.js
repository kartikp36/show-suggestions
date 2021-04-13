import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Box, Code } from '@chakra-ui/layout';
import { Td } from './Table';
import { Switch } from '@chakra-ui/react';
import { mutate } from 'swr';

import RemoveFeedbackButton from './RemoveFeedbackButton';
import { updateFeedback } from '../lib/database';
import { useAuth } from '../lib/auth';

const FeedbackRow = ({ id, author, text, status, route }) => {
  const isChecked = status === 'active';
  const auth = useAuth();

  const toggleFeedback = async (e) => {
    e.preventDefault();
    await updateFeedback(id, { status: isChecked ? 'pending' : 'active' });
    mutate(['/api/feedback', auth.user.token]);
  };

  return (
    <Box as="tr" key={id}>
      <Td fontWeight="medium">{author} </Td>
      <Td>{text} </Td>
      <Td>
        <Code>{route || '/'}</Code>
      </Td>
      <Switch
        colorScheme="green"
        mt={4}
        onChange={toggleFeedback}
        isChecked={isChecked}
      />
      <Td>
        <RemoveFeedbackButton feedbackId={id} />
      </Td>
    </Box>
  );
};

export default FeedbackRow;

FeedbackRow.propTypes = {
  id: PropTypes.string,
  author: PropTypes.string,
  text: PropTypes.string,
  status: PropTypes.string,
  route: PropTypes.string,
};
