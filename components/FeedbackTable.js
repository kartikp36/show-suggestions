import React from 'react';
import PropTypes from 'prop-types';
import { Table, Th, Tr } from './Table';

import FeedbackRow from './FeedbackRow';
import { Box } from '@chakra-ui/layout';

const FeedbackTable = ({ allFeedback }) => {
  return (
    <Box overflowX="scroll">
      <Table w="full">
        <thead>
          <Tr>
            <Th>Name</Th>
            <Th>Feedback</Th>
            <Th>Route</Th>
            <Th>Visible</Th>
            <Th>{''}</Th>
          </Tr>
        </thead>
        <tbody>
          {allFeedback.map((feedback) => (
            <FeedbackRow key={feedback.id} {...feedback} />
          ))}
        </tbody>
      </Table>
    </Box>
  );
};

export default FeedbackTable;

FeedbackTable.propTypes = {
  allFeedback: PropTypes.array,
};
