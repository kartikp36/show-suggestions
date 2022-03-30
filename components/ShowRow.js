/* eslint-disable react/prop-types */
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

const ShowRow = ({ show, user }) => {
  const [upvotes, setUpvotes] = useState(show.upVotes);
  console.log(show.id, upvotes);
  const handleVote = async () => {
    if (upvotes.includes(user.uid)) {
      await setUpvotes(upvotes.filter((e) => e != user.uid));
    } else {
      await setUpvotes(upvotes.push(user.uid));
    }
    console.log('after update', show.id, upvotes);
    updateShow(show.id, { ...show, upVotes: upvotes });
  };

  return (
    <Box as="tr" key={show.id}>
      <Td fontWeight="medium">
        <NextLink href="/show/[showId]" as={`/show/${show.id}`} passHref>
          <Link fontWeight="medium">{show.name}</Link>
        </NextLink>
      </Td>
      <Td>{show.type} </Td>
      <Td>{show.genre} </Td>
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
        <Button
          // isDisabled={}
          colorScheme="cyan"
          onClick={handleVote}
          leftIcon={<ArrowUpIcon />}
        >
          {upvotes.length}
        </Button>
      </Td>
      <Td>
        <Button
          colorScheme="red"
          onClick={() => {
            show.downVotes++;
            updateShow(show.id, show);
            updateUser(user.uid, user);
          }}
          leftIcon={<ArrowDownIcon />}
        >
          {show.downVotes}
        </Button>
      </Td>
    </Box>
  );
};

export default ShowRow;
