import useSWR from 'swr';
import { Heading } from '@chakra-ui/layout';

import Sites from '../components/Sites';
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
        <Heading m={2}>Your Saved Sites</Heading>
        <SiteTableSkeleton />
      </DashboardShell>
    );
  }

  return (
    <DashboardShell>
      <Heading m={2}>Your Saved Sites</Heading>
      {data.sites ? <SiteTable sites={data.sites} /> : <Sites />}
    </DashboardShell>
  );
};
const DashboardPage = () => (
  <Page name="Feedback" path="/sites">
    <Dashboard />
  </Page>
);
export default DashboardPage;
