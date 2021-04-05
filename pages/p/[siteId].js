import { Button } from '@chakra-ui/button';
import { FormControl, FormLabel } from '@chakra-ui/form-control';
import { Input } from '@chakra-ui/input';
import { Box } from '@chakra-ui/layout';
import Feedback from '../../components/Feedback';
import { getAllFeedback, getAllSites } from '../../lib/db-admin';

export const getStaticProps = async (context) => {
  const siteId = context.params.siteId;
  const feedback = await getAllFeedback(siteId);
  return {
    props: {
      initialFeedback: feedback,
    },
  };
};

export const getStaticPaths = async () => {
  const sites = await getAllSites();
  const paths = sites.map((site) => ({
    params: { siteId: site.id.toString() },
  }));
  return {
    paths,
    fallback: false,
  };
};

const SiteFeedback = ({ initialFeedback }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Hello');
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
          <Input type="comment" id="comment" />
          <Button mt={2} type="submit" fontWeight="medium">
            Add Comment
          </Button>
        </FormControl>
      </Box>
      {initialFeedback.map((feedback) => (
        <Feedback key={feedback.id} {...feedback} />
      ))}
    </Box>
  );
};
export default SiteFeedback;
