import React, { useRef } from 'react';
import { useForm } from 'react-hook-form';

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

const AddSiteModal = () => {
  const initialRef = useRef();
  const auth = useAuth();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const { handleSubmit, register } = useForm();

  const onAddSite = ({ site, url }) => {
    createSite({
      authorId: auth.user.uid,
      createdAt: new Date().toISOString(),
      site,
      url,
    });

    toast({
      title: 'Success',
      description: "We've added your site.",
      status: 'success',
      duration: 4000,
      isClosable: true,
    });
    onClose();
  };
  return (
    <>
      <Button
        onClick={onOpen}
        variant="solid"
        size="md"
        backgroundColor="gray.700"
        color="white"
        mt={4}
      >
        Add new site
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
                name="site"
                {...register('site', {
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
