import { useAuth } from '../lib/auth';
import Sites from '../components/Sites';
const Dashboard = () => {
  const auth = useAuth();
  if (!auth.user) {
    return 'Loading...';
  }
  return <Sites />;
};
export default Dashboard;
