import { useAuth } from '../lib/auth';
import Sites from '../components/Sites';
import SiteTableSkeleton from '../components/SiteTableSkeleton';
import DashboardShell from '../components/DashboardShell';

const Dashboard = () => {
  const auth = useAuth();
  return (
    <DashboardShell>
      {!auth.user ? <SiteTableSkeleton /> : <Sites />}
    </DashboardShell>
  );
};
export default Dashboard;
