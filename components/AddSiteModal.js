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
} from '@chakra-ui/react';
import { createSite } from '../lib/database';

const AddSiteModal = () => {
  const initialRef = useRef();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { handleSubmit, register } = useForm();

  const onAddSite = (values) => createSite(values);
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
