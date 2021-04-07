import { Box, Code, Link } from '@chakra-ui/layout';
import React from 'react';
import { Table, Td, Th, Tr } from './Table';
import AddSiteModal from './AddSiteModal';
import { IconButton, Switch } from '@chakra-ui/react';
import { DeleteIcon } from '@chakra-ui/icons';
import RemoveButton from './RemoveButton';

const FeedbackTable = ({ allFeedback }) => {
  return (
    <>
      <AddSiteModal>Add Sites</AddSiteModal>
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
