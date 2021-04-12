import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Box, Code } from '@chakra-ui/layout';
import { Td } from './Table';
import { Switch } from '@chakra-ui/react';
import { mutate } from 'swr';

import RemoveButton from './RemoveButton';
import { updateFeedback } from '../lib/database';
import { useAuth } from '../lib/auth';

const FeedbackRow = ({ id, author, text, status, route }) => {
  const [checked, setChecked] = useState(status == 'active');
  const auth = useAuth();

  const toggleFeedback = async () => {
    await updateFeedback(id, { status: !checked ? 'active' : 'pending' });
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
        isChecked={status == 'active'}
      />
      <Td>
        <RemoveButton feedbackId={id} />
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
