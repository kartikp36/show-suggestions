import NextLink from 'next/link';
import PropTypes from 'prop-types';
import { Box, Link } from '@chakra-ui/layout';
import { format, parseISO } from 'date-fns';
import React from 'react';

import { Table, Td, Th, Tr } from './Table';
import AddSiteModal from './AddSiteModal';

const SiteTable = ({ sites }) => {
  return (
    <>
      <AddSiteModal>Add Sites</AddSiteModal>
      <Box overflowX="scroll">
        <Table w="full">
          <thead>
            <Tr>
              <Th>Name</Th>
              <Th>Site Link</Th>
              <Th>Feedback Link</Th>
              <Th>Date Added</Th>
              <Th>{''}</Th>
            </Tr>
          </thead>
          <tbody>
            {sites.map((site) => {
              return (
                <Box as="tr" key={site.id}>
                  <Td fontWeight="medium">{site.name} </Td>
                  <Td>{site.url} </Td>
                  <Td>
                    <NextLink href="/p/[siteId]" as={`/p/${site.id}`} passHref>
                      <Link color="cyan.800" fontWeight="medium">
                        View Feedback
                      </Link>
                    </NextLink>
                  </Td>
                  <Td>{format(parseISO(site.createdAt), 'PPpp')} </Td>
                </Box>
              );
            })}
          </tbody>
        </Table>
      </Box>
    </>
  );
};

export default SiteTable;

SiteTable.propTypes = {
  sites: PropTypes.array,
};
