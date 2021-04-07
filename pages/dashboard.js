import useSWR from 'swr';

import Sites from '../components/Sites';
import SiteTableSkeleton from '../components/SiteTableSkeleton';
import DashboardShell from '../components/DashboardShell';
import fetcher from '../utils/fetcher';
import SiteTable from '../components/SiteTable';
import { useAuth } from '../lib/auth';
import { Heading } from '@chakra-ui/layout';

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
export default Dashboard;
