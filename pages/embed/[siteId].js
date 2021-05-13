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

const ShowFeedback = () => {
  const { user } = useAuth();
  const inputElement = useRef(null);
  const router = useRouter();
  const showId = router.query?.showId;
  const { data: showData } = useSWR(`/api/show/${showId}`, fetcher);
  const { data: feedbackData } = useSWR(
    user ? [`/api/feedback/active/${showId}`, user?.token] : null,
    fetcher
  );
  const show = showData?.show;
  const allFeedback = feedbackData?.feedback;

  const handleSubmit = (e) => {
    e.preventDefault();
    const newFeedback = {
      showAuthorId: show.authorId,
      author: user.name,
      authorId: user.uid,
      showId: router.query.showId,
      text: inputElement.current.value,
      createdAt: new Date().toISOString(),
      provider: user.provider,
      status: 'active',
    };
    createFeedback(newFeedback);
    inputElement.current.value = '';
    mutate(
      [`/api/feedback/active/${showId}`, user.token],
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
export default ShowFeedback;

ShowFeedback.propTypes = {
  initialFeedback: PropTypes.array,
};
