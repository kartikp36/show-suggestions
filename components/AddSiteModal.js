import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { mutate } from 'swr';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  Input,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';

import { createSite } from '../lib/database';
import { useAuth } from '../lib/auth';

const AddSiteModal = ({ children }) => {
  const initialRef = useRef();
  const auth = useAuth();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const { handleSubmit, register } = useForm();

  const onAddSite = ({ name, url }) => {
    const newSite = {
      authorId: auth.user.uid,
      createdAt: new Date().toISOString(),
      name,
      url,
      status: 'active',
    };
    const { id } = createSite(newSite);

    toast({
      title: 'Success',
      description: "We've added your site.",
      status: 'success',
      duration: 4000,
      isClosable: true,
    });
    mutate(
      ['/api/sites', auth.user.token],
      async (data) => ({ sites: [{ id, ...newSite }, ...data.sites] }),
      false
    );
    onClose();
  };
  return (
    <>
      <Button
        alignSelf="flex-end"
        maxW="200"
        onClick={onOpen}
        variant="solid"
        size="md"
        backgroundColor="gray.700"
        color="white"
        mb={2}
      >
        {children}
      </Button>
      <Modal initialFocusRef={initialRef} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent as="form" onSubmit={handleSubmit(onAddSite)}>
          <ModalHeader fontWeight="bold">Add Sites</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Name</FormLabel>
              <Input
                name="name"
                {...register('name', {
                  required: 'Required',
                })}
                placeholder="My site"
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Link</FormLabel>
              <Input
                name="url"
                {...register('url', {
                  required: 'Required',
                })}
                placeholder="https://website.com"
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button type="submit" colorScheme="cyan" mr={3}>
              Add
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AddSiteModal;

AddSiteModal.propTypes = {
  children: PropTypes.node,
};
