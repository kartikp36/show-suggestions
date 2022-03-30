import NextLink from 'next/link';
import PropTypes from 'prop-types';
import { Box, Link } from '@chakra-ui/layout';
import { ArrowDownIcon, ArrowUpIcon } from '@chakra-ui/icons';
import { Button } from '@chakra-ui/react';
import { format, parseISO } from 'date-fns';
import React, { useState } from 'react';
import pull from 'lodash';

import { Table, Td, Th, Tr } from './Table';
import AddShowModal from './AddShowModal';
import { updateShow, updateUser } from '../lib/database';
import { useAuth } from '../lib/auth';
import { mutate } from 'swr';
import ShowRow from './ShowRow';

const ShowTable = ({ shows }) => {
  const { user } = useAuth();

  return (
    <>
      <AddShowModal>Add Shows</AddShowModal>
      <Box overflowX="scroll">
        <Table w="full">
          <thead>
            <Tr>
              <Th>Show Name</Th>
              <Th>Movie/Series</Th>
              <Th>Genre</Th>
              <Th>Feedback Link</Th>
              <Th>Date Added</Th>
              <Th>Upvotes</Th>
              <Th>Downvotes</Th>
            </Tr>
          </thead>
          <tbody>
            {shows.map((show) => (
              <ShowRow key={show.id} show={show} user={user} />
            ))}
          </tbody>
        </Table>
      </Box>
    </>
  );
};

export default ShowTable;

ShowTable.propTypes = {
  shows: PropTypes.array,
};
