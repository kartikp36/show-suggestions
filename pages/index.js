import { Button, Link, Heading } from '@chakra-ui/react';
import { useAuth } from '../lib/auth';
export default function Home() {
  const auth = useAuth();
  return (
    <div>
      <main style={{ textAlign: 'center', margin: '8px' }}>
        <Heading>Fast Feedback</Heading>
        {!auth?.user ? (
          <Button onClick={() => auth.signinWithGithub()}>Sign In</Button>
        ) : (
          <Link href="/dashboard">View Dashboard</Link>
        )}
      </main>
    </div>
  );
}
