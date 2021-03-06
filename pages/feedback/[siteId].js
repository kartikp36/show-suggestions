import { useRouter } from 'next/router';
import NextLink from 'next/link';
import useSWR from 'swr';
import { Heading } from '@chakra-ui/layout';
import { Breadcrumb, BreadcrumbItem } from '@chakra-ui/breadcrumb';
import Link from 'next/link';

import SiteTableSkeleton from '../../components/SiteTableSkeleton';
import Page from '../../components/Page';
import DashboardShell from '../../components/DashboardShell';
import fetcher from '../../utils/fetcher';
import FeedbackTable from '../../components/FeedbackTable';
import { useAuth } from '../../lib/auth';
import FeedbackEmptyState from '../../components/FeedbackEmptyState';

const SiteFeedback = () => {
  const { user } = useAuth();
  const { query } = useRouter();
  const { data } = useSWR(
    user ? [`/api/feedback/${query.siteId}`, user.token] : null,
    fetcher
  );

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
      <Breadcrumb mt="2">
        <BreadcrumbItem>
          <NextLink href="/feedback" passHref>
            <Link color="cyan.800" fontWeight="medium">
              Comments
            </Link>
          </NextLink>
        </BreadcrumbItem>
        <BreadcrumbItem>
          <NextLink href="/site/[siteId]" as={`/site/${query.siteId}`} passHref>
            <Link fontWeight="medium">{data.site.name}</Link>
          </NextLink>
        </BreadcrumbItem>
      </Breadcrumb>
      <Heading m={2}>{data.site.name}</Heading>
      {data.feedback.length ? (
        <FeedbackTable allFeedback={data.feedback} />
      ) : (
        <FeedbackEmptyState />
      )}
    </DashboardShell>
  );
};
const SiteFeedbackPage = () => (
  <Page name="My Feedback" path={`/feedback/${null}`}>
    <SiteFeedback />
  </Page>
);
export default SiteFeedbackPage;
