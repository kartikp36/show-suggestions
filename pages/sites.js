import useSWR from 'swr';
import { Heading } from '@chakra-ui/layout';
import { Tooltip, WrapItem, Button } from '@chakra-ui/react';

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
        <Heading m={2}>Shows</Heading>
        <SiteTableSkeleton />
      </DashboardShell>
    );
  } else {
    return (
      <DashboardShell>
        <WrapItem>
          <Tooltip
            label="Click on show names to comment about that show"
            placement="left"
            defaultIsOpen
          >
            <Heading m={2}>Shows</Heading>
          </Tooltip>
        </WrapItem>
        {data?.sites.length ? (
          <SiteTable sites={data.sites} />
        ) : (
          <SitesEmptyState />
        )}
      </DashboardShell>
    );
  }
};
const DashboardPage = () => (
  <Page name="Feedback" path="/sites">
    <Dashboard />
  </Page>
);
export default DashboardPage;
