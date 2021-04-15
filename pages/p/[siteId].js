import { useRef, useState } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { Button } from '@chakra-ui/button';
import useSWR, { mutate } from 'swr';
import fetcher from '../../utils/fetcher';
import { FormControl, FormLabel } from '@chakra-ui/form-control';
import { Input } from '@chakra-ui/input';
import { Box } from '@chakra-ui/layout';

import Feedback from '../../components/Feedback';
import { createFeedback } from '../../lib/database';
import { useAuth } from '../../lib/auth';

const SiteFeedback = () => {
  const auth = useAuth();
  const router = useRouter();
  const siteId = router.query?.siteId;
  const inputElement = useRef(null);

  const { data: siteData } = useSWR(`/api/p/${siteId}`, fetcher);
  const { data: feedbackData } = useSWR(
    auth.user ? [`/api/feedback/${siteId}`, auth.user?.token] : null,
    fetcher
  );
  const site = siteData?.site;
  const allFeedback = feedbackData?.feedback;

  const handleSubmit = (e) => {
    e.preventDefault();
    const newFeedback = {
      author: auth.user.name,
      authorId: auth.user.uid,
      siteId: router.query.siteId,
      text: inputElement.current.value,
      createdAt: new Date().toISOString(),
      provider: auth.user.provider,
      status: 'pending',
    };
    createFeedback(newFeedback);
    inputElement.current.value = '';
    mutate(
      [`/api/feedback/${siteId}`, auth.user.token],
      async (data) => ({
        feedback: [newFeedback, ...data.feedback],
      }),
      false
    );
  };
  return (
    <Box
      display="flex"
      flexDirection="column"
      width="full"
      maxWidth="700px"
      margin="auto"
    >
      <Box as="form" onSubmit={handleSubmit}>
        <FormControl my={8}>
          <FormLabel htmlFor="comment">Comment</FormLabel>
          <Input ref={inputElement} type="comment" id="comment" />
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
  );
};
export default SiteFeedback;

SiteFeedback.propTypes = {
  initialFeedback: PropTypes.array,
};
