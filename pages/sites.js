import useSWR from 'swr';
import { Heading } from '@chakra-ui/layout';

import SitesEmptyState from '../components/SitesEmptyState';
import SiteTableSkeleton from '../components/SiteTableSkeleton';
import DashboardShell from '../components/DashboardShell';
import fetcher from '../utils/fetcher';
import SiteTable from '../components/SiteTable';
import { useAuth } from '../lib/auth';
import Page from '../components/Page';

const Dashboard = () => {
  const { user } = useAuth();
  const { data } = useSWR(user ? ['/api/sites', user.token] : null, fetcher);

  if (!data) {
    return (
      <DashboardShell>
        <Heading m={2}>Shows posted by you</Heading>
        <SiteTableSkeleton />
      </DashboardShell>
    );
  }

  return (
    <DashboardShell>
      <Heading m={2}>Shows posted by you</Heading>
      {data.sites.length ? (
        <SiteTable sites={data.sites} />
      ) : (
        <SitesEmptyState />
      )}
    </DashboardShell>
  );
};
const DashboardPage = () => (
  <Page name="Feedback" path="/sites">
    <Dashboard />
  </Page>
);
export default DashboardPage;
