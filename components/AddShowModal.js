import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { useForm, Controller } from 'react-hook-form';
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
  Radio,
  RadioGroup,
  Stack,
} from '@chakra-ui/react';

import { createShow } from '../lib/database';
import { useAuth } from '../lib/auth';

const AddShowModal = ({ children }) => {
  const initialRef = useRef();
  const auth = useAuth();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const { handleSubmit, register, control } = useForm();
  const onAddShow = ({ name, type, genre }) => {
    console.log(type);
    const newShow = {
      authorId: auth.user.uid,
      createdAt: new Date().toISOString(),
      name,
      type: `Movie`,
      genre,
      upVotes: [],
      downVotes: [],
      status: 'active',
    };
    const { id } = createShow(newShow);

    toast({
      title: 'Success',
      description: "We've added your show.",
      status: 'success',
      duration: 4000,
      isClosable: true,
    });
    mutate(
      ['/api/list', auth.user.token],
      async (data) => ({ shows: [{ id, ...newShow }, ...data.shows] }),
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
        <ModalContent as="form" onSubmit={handleSubmit(onAddShow)}>
          <ModalHeader fontWeight="bold">Add shows</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Name</FormLabel>
              <Input
                name="name"
                {...register('name', {
                  required: 'Required',
                })}
                placeholder="My show"
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>{`It's a`} </FormLabel>

              {/* <RadioGroup name="type" defaultValue="Movie">
                <Stack direction="row">
                  <Radio value="Movie">Movie</Radio>
                  <Radio value="Series">Series</Radio>
                </Stack>
              </RadioGroup> */}

              {/* <Controller
                as={
                  <RadioGroup
                    aria-label="type"
                    // ref={register()}
                    name="type"
                    defaultValue="Movie"
                    isInline
                  >
                    <Radio value="Movie">Movie</Radio>
                    <Radio value="Series">Series</Radio>
                  </RadioGroup>
                }
                name="type"
                control={control}
              /> */}
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Genre</FormLabel>
              <Input
                name="genre"
                {...register('genre', {
                  required: 'Required',
                })}
                placeholder="Comedy"
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

export default AddShowModal;

AddShowModal.propTypes = {
  children: PropTypes.node,
};
