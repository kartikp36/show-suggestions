import NextLink from 'next/link';
import PropTypes from 'prop-types';
import { Box, Link } from '@chakra-ui/layout';
import { format, parseISO } from 'date-fns';
import React from 'react';

import { Table, Td, Th, Tr } from './Table';
import AddShowModal from './AddShowModal';
import RemoveShowButton from './RemoveShowButton';
const ShowTable = ({ shows }) => {
  return (
    <>
      <AddShowModal>Add Shows</AddShowModal>
      <Box overflowX="scroll">
        <Table w="full">
          <thead>
            <Tr>
              <Th>Name</Th>
              <Th>Show Link</Th>
              <Th>Feedback Link</Th>
              <Th>Date Added</Th>
              <Th>{''}</Th>
            </Tr>
          </thead>
          <tbody>
            {shows.map((show) => {
              return (
                <Box as="tr" key={show.id}>
                  <Td fontWeight="medium">
                    <NextLink
                      href="/show/[showId]"
                      as={`/show/${show.id}`}
                      passHref
                    >
                      <Link fontWeight="medium">{show.name}</Link>
                    </NextLink>
                  </Td>
                  <Td>{show.url} </Td>
                  <Td>
                    <NextLink
                      href="/feedback/[showId]"
                      as={`/feedback/${show.id}`}
                      passHref
                    >
                      <Link color="cyan.800" fontWeight="medium">
                        View Feedback
                      </Link>
                    </NextLink>
                  </Td>
                  <Td>{format(parseISO(show.createdAt), 'PPpp')} </Td>
                  <Td>
                    <RemoveShowButton showId={show.id} />
                  </Td>
                </Box>
              );
            })}
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
