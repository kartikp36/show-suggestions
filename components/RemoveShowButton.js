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

import { deleteShow } from '../lib/database';
import { useAuth } from '../lib/auth';

function RemoveShowButton({ showId }) {
  const auth = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const onClose = () => setIsOpen(false);
  const cancelRef = useRef();

  const onDelete = () => {
    deleteShow(showId);
    mutate(
      ['/api/list', auth.user.token],
      async (data) => {
        return {
          shows: data.shows.filter((show) => show.id !== showId),
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
              {'Delete Show'}
            </AlertDialogHeader>

            <AlertDialogBody>
              {"Are you sure? You can't undo this action."}
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button
                fontWeight="medium"
                colorScheme="red"
                onClick={onDelete}
                ml={3}
              >
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
}
export default RemoveShowButton;

RemoveShowButton.propTypes = {
  showId: PropTypes.string,
};
