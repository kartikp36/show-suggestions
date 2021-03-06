import useSWR from 'swr';
import { Heading } from '@chakra-ui/layout';

import SiteTableSkeleton from '../components/SiteTableSkeleton';
import DashboardShell from '../components/DashboardShell';
import fetcher from '../utils/fetcher';
import FeedbackTable from '../components/FeedbackTable';
import { useAuth } from '../lib/auth';
import Page from '../components/Page';
import FeedbackEmptyState from '../components/FeedbackEmptyState';

const MyFeedback = () => {
  const { user } = useAuth();
  const { data } = useSWR(user ? ['/api/feedback', user.token] : null, fetcher);

  if (!data) {
    return (
      <DashboardShell>
        <Heading m={2}>Your comments</Heading>
        <SiteTableSkeleton />
      </DashboardShell>
    );
  }

  return (
    <DashboardShell>
      <Heading m={2}>Your comments</Heading>
      {data.feedback.length ? (
        <FeedbackTable allFeedback={data.feedback} />
      ) : (
        <FeedbackEmptyState />
      )}
    </DashboardShell>
  );
};
const MyFeedbackPage = () => (
  <Page name="Feedback" path="/feedback">
    <MyFeedback />
  </Page>
);

export default MyFeedbackPage;
