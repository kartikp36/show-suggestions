import useSWR from 'swr';
import { Heading } from '@chakra-ui/layout';

import ShowsEmptyState from '../components/ShowsEmptyState';
import ShowTableSkeleton from '../components/ShowTableSkeleton';
import DashboardShell from '../components/DashboardShell';
import fetcher from '../utils/fetcher';
import ShowTable from '../components/ShowTable';
import { useAuth } from '../lib/auth';
import Page from '../components/Page';

const Dashboard = () => {
  const { user } = useAuth();
  const { data } = useSWR(user ? ['/api/list', user.token] : null, fetcher);

  if (!data) {
    return (
      <DashboardShell>
        <Heading m={2}>Home</Heading>
        <ShowTableSkeleton />
      </DashboardShell>
    );
  }

  return (
    <DashboardShell>
      <Heading m={2}>Home</Heading>
      {data.shows.length ? (
        <ShowTable shows={data.shows} />
      ) : (
        <ShowsEmptyState />
      )}
    </DashboardShell>
  );
};
const DashboardPage = () => (
  <Page name="Feedback" path="list">
    <Dashboard />
  </Page>
);
export default DashboardPage;
