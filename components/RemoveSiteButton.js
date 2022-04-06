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

import { deleteSite } from '../lib/database';
import { useAuth } from '../lib/auth';

function RemoveSiteButton({ siteId }) {
  const auth = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const onClose = () => setIsOpen(false);
  const cancelRef = useRef();

  const onDelete = () => {
    deleteSite(siteId);
    mutate(
      ['/api/sites', auth.user.token],
      async (data) => {
        return {
          sites: data.sites.filter((site) => site.id !== siteId),
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
        aria-label="Delete Show"
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
export default RemoveSiteButton;

RemoveSiteButton.propTypes = {
  siteId: PropTypes.string,
};
