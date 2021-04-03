import { Button, Link } from '@chakra-ui/react';
import { useAuth } from '../lib/auth';
export default function Home() {
  const auth = useAuth();
  return (
    <div>
      <main>
        <h1>Fast Feedback</h1>
        {!auth?.user ? (
          <Button onClick={() => auth.signinWithGithub()}>Sign In</Button>
        ) : (
          <Link href="/dashboard">View Dashboard</Link>
        )}
      </main>
    </div>
  );
}
