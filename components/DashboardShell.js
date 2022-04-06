import React from 'react';
import PropTypes from 'prop-types';
import NextLink from 'next/link';
import {
  Flex,
  Link,
  Stack,
  Avatar,
  Button,
  Popover,
  PopoverTrigger,
  Portal,
  PopoverContent,
  PopoverArrow,
  PopoverHeader,
  PopoverCloseButton,
  PopoverBody,
} from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';

import { useAuth } from '../lib/auth';

const DashboardShell = ({ children }) => {
  const { user, signout } = useAuth();
  return (
    <Flex flexDirection="column" backgroundColor="white">
      <Flex
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
        backgroundColor="white"
        pt={2}
        pb={2}
      >
        <Stack spacing={2} isInline ml={2} alignItems="center">
          <AddIcon m={2} />
          <NextLink href="/sites " passHref>
            <Link
              p={2}
              m={2}
              fontSize={{ base: '12px', md: '16px', lg: '16px' }}
            >
              Shows
            </Link>
          </NextLink>
          <NextLink href="/feedback" passHref>
            <Link
              m={2}
              p={2}
              fontSize={{ base: '12px', md: '16px', lg: '16px' }}
            >
              Comments
            </Link>
          </NextLink>
        </Stack>
        <Flex mr={2} alignItems="center">
          {/* <Link m={2} p={2} fontSize={{ base: '12px', md: '16px', lg: '16px' }}>
            Account
          </Link> */}
          {!user && (
            <NextLink href="/" passHref>
              <Link
                m={2}
                p={2}
                fontSize={{ base: '12px', md: '16px', lg: '16px' }}
              >
                Sign In
              </Link>
            </NextLink>
          )}
          {user && (
            <Popover>
              <PopoverTrigger>
                <Avatar size="md" m={2} src={user?.photoUrl} />
              </PopoverTrigger>
              <Portal>
                <PopoverContent>
                  <PopoverArrow />
                  <PopoverHeader>{`Hey there! ${user?.name}`}</PopoverHeader>
                  <PopoverCloseButton />
                  <PopoverBody>
                    <Button onClick={() => signout()} colorScheme="cyan">
                      Sign Out
                    </Button>
                  </PopoverBody>
                </PopoverContent>
              </Portal>
            </Popover>
          )}
        </Flex>
      </Flex>
      <Flex
        alignItems="stretch"
        justifyContent="flex-start"
        flexDirection="column"
        backgroundColor="gray.100"
        pb={'80%'}
        pl={'16%'}
        pr={'16%'}
      >
        {children}
      </Flex>
    </Flex>
  );
};

export default DashboardShell;

DashboardShell.propTypes = {
  children: PropTypes.node,
};
