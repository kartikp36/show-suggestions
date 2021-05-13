import { useRouter } from 'next/router';
import NextLink from 'next/link';
import useSWR from 'swr';
import { Heading } from '@chakra-ui/layout';
import { Breadcrumb, BreadcrumbItem } from '@chakra-ui/breadcrumb';
import Link from 'next/link';

import ShowTableSkeleton from '../../components/ShowTableSkeleton';
import Page from '../../components/Page';
import DashboardShell from '../../components/DashboardShell';
import fetcher from '../../utils/fetcher';
import FeedbackTable from '../../components/FeedbackTable';
import { useAuth } from '../../lib/auth';
import FeedbackEmptyState from '../../components/FeedbackEmptyState';

const ShowFeedback = () => {
  const { user } = useAuth();
  const { query } = useRouter();
  const { data } = useSWR(
    user ? [`/api/feedback/${query.showId}`, user.token] : null,
    fetcher
  );

  if (!data) {
    return (
      <DashboardShell>
        <Heading m={2}>Your Feedbacks</Heading>
        <ShowTableSkeleton />
      </DashboardShell>
    );
  }

  return (
    <DashboardShell>
      <Breadcrumb mt="2">
        <BreadcrumbItem>
          <NextLink href="/feedback" passHref>
            <Link color="cyan.800" fontWeight="medium">
              Feedback
            </Link>
          </NextLink>
        </BreadcrumbItem>
        <BreadcrumbItem>
          <NextLink href="/show/[showId]" as={`/show/${query.showId}`} passHref>
            <Link fontWeight="medium">{data.show.name}</Link>
          </NextLink>
        </BreadcrumbItem>
      </Breadcrumb>
      <Heading m={2}>{data.show.name}</Heading>
      {data.feedback.length ? (
        <FeedbackTable allFeedback={data.feedback} />
      ) : (
        <FeedbackEmptyState />
      )}
    </DashboardShell>
  );
};
const ShowFeedbackPage = () => (
  <Page name="My Feedback" path={`/feedback/${null}`}>
    <ShowFeedback />
  </Page>
);
export default ShowFeedbackPage;
