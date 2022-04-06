import NextLink from 'next/link';
import PropTypes from 'prop-types';
import { Box, Link } from '@chakra-ui/layout';
import { format, parseISO } from 'date-fns';
import React from 'react';

import { Table, Td, Th, Tr } from './Table';
import AddSiteModal from './AddSiteModal';
import RemoveSiteButton from './RemoveSiteButton';
const SiteTable = ({ sites }) => {
  return (
    <>
      <AddSiteModal>Add Shows</AddSiteModal>
      <Box overflowX="scroll">
        <Table w="full">
          <thead>
            <Tr>
              <Th>Name</Th>
              <Th>Genre</Th>
              <Th>Comment Link</Th>
              <Th>Date Added</Th>
              <Th>{''}</Th>
            </Tr>
          </thead>
          <tbody>
            {sites.map((site) => {
              return (
                <Box as="tr" key={site.id}>
                  <Td fontWeight="medium">
                    <NextLink
                      href="/site/[siteId]"
                      as={`/site/${site.id}`}
                      passHref
                    >
                      <Link fontWeight="medium">{site.name}</Link>
                    </NextLink>
                  </Td>
                  <Td>{site.url} </Td>
                  <Td>
                    <NextLink
                      href="/feedback/[siteId]"
                      as={`/feedback/${site.id}`}
                      passHref
                    >
                      <Link color="cyan.800" fontWeight="medium">
                        View Comment
                      </Link>
                    </NextLink>
                  </Td>
                  <Td>{format(parseISO(site.createdAt), 'PPpp')} </Td>
                  <Td>
                    <RemoveSiteButton siteId={site.id} />
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

export default SiteTable;

SiteTable.propTypes = {
  sites: PropTypes.array,
};
