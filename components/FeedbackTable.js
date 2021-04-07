import React from 'react';
import PropTypes from 'prop-types';
import { Box, Code } from '@chakra-ui/layout';
import { Table, Td, Th, Tr } from './Table';
import { Switch } from '@chakra-ui/react';

import RemoveButton from './RemoveButton';

const FeedbackTable = ({ allFeedback }) => {
  return (
    <>
      <Table>
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
          {allFeedback.map((feedback) => {
            return (
              <Box as="tr" key={feedback.id}>
                <Td fontWeight="medium">{feedback.name} </Td>
                <Td>{feedback.text} </Td>
                <Td>
                  <Code>{'/'}</Code>
                </Td>
                <Switch
                  colorScheme="green"
                  mt={4}
                  defaultIsChecked={feedback.status == 'active'}
                />
                <Td>
                  <RemoveButton feedbackId={feedback.id} />
                </Td>
              </Box>
            );
          })}
        </tbody>
      </Table>
    </>
  );
};

export default FeedbackTable;

FeedbackTable.propTypes = {
  allFeedback: PropTypes.array,
};
