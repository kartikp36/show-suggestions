import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { DeleteIcon } from '@chakra-ui/icons';
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  IconButton,
  Button,
} from '@chakra-ui/react';
import { mutate } from 'swr';

import { deleteFeedback } from '../lib/database';
import { useAuth } from '../lib/auth';

function RemoveButton({ feedbackId }) {
  const auth = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const onClose = () => setIsOpen(false);
  const cancelRef = useRef();

  const onDelete = () => {
    deleteFeedback(feedbackId);
    mutate(
      ['/api/feedback', auth.user.token],
      async (data) => {
        return {
          feedback: data.feedback.filter(
            (feedback) => feedback.id !== feedbackId
          ),
        };
      },
      false
    );
    onClose();
  };

  return (
    <>
      <IconButton
        onClick={() => setIsOpen(true)}
        aria-label="Delete Feedback"
        icon={<DeleteIcon />}
        variant="ghost"
      />

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              {'Delete Feedback'}
            </AlertDialogHeader>

            <AlertDialogBody>
              {"Are you sure? You can't undo this action afterwards."}
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button colorScheme="red" onClick={onDelete} ml={3}>
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
}
export default RemoveButton;

RemoveButton.propTypes = {
  feedbackId: PropTypes.string,
};
