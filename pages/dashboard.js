import useSWR from 'swr';

import Sites from '../components/Sites';
import SiteTableSkeleton from '../components/SiteTableSkeleton';
import DashboardShell from '../components/DashboardShell';
import fetcher from '../utils/fetcher';
import SiteTable from '../components/SiteTable';

const Dashboard = () => {
  const { data } = useSWR('/api/sites', fetcher);

  if (!data) {
    return (
      <DashboardShell>
        <SiteTableSkeleton />
      </DashboardShell>
    );
  }

  return (
    <DashboardShell>
      {data.sites ? <SiteTable sites={data.sites} /> : <Sites />}
    </DashboardShell>
  );
};
export default Dashboard;
