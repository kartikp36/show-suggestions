import React, { useRef } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import useSWR, { mutate } from 'swr';
import { Button } from '@chakra-ui/button';
import { FormControl, FormLabel } from '@chakra-ui/form-control';
import { Input } from '@chakra-ui/input';
import { Box } from '@chakra-ui/layout';

import Feedback from '../../components/Feedback';
import DashboardShell from '../../components/DashboardShell';
import { createFeedback } from '../../lib/database';
import { useAuth } from '../../lib/auth';
import fetcher from '../../utils/fetcher';

const SiteFeedback = () => {
  const { user } = useAuth();
  const inputElement = useRef(null);
  const router = useRouter();
  const siteId = router.query?.siteId;
  const { data: siteData } = useSWR(`/api/site/${siteId}`, fetcher);
  const { data: feedbackData } = useSWR(
    user ? [`/api/feedback/active/${siteId}`, user?.token] : null,
    fetcher
  );
  const site = siteData?.site;
  const allFeedback = feedbackData?.feedback;

  const handleSubmit = (e) => {
    e.preventDefault();
    const newFeedback = {
      siteAuthorId: site.authorId,
      author: user.name,
      authorId: user.uid,
      siteId: router.query.siteId,
      text: inputElement.current.value,
      createdAt: new Date().toISOString(),
      provider: user.provider,
      status: 'active',
    };
    createFeedback(newFeedback);
    inputElement.current.value = '';
    mutate(
      [`/api/feedback/active/${siteId}`, user.token],
      async (data) => ({
        feedback: [newFeedback, ...data.feedback],
      }),
      false
    );
  };
  return (
    <DashboardShell>
      <Box display="flex" flexDirection="column" width="full">
        <Box as="form" onSubmit={handleSubmit}>
          <FormControl my={8}>
            <FormLabel htmlFor="comment">Comment</FormLabel>
            <Input
              bgColor="white"
              ref={inputElement}
              type="comment"
              id="comment"
            />
            <Button mt={2} type="submit" fontWeight="medium">
              Add Comment
            </Button>
          </FormControl>
        </Box>
        {allFeedback &&
          allFeedback.map((feedback) => (
            <Feedback key={feedback.id} {...feedback} />
          ))}
      </Box>
    </DashboardShell>
  );
};
export default SiteFeedback;

SiteFeedback.propTypes = {
  initialFeedback: PropTypes.array,
};
