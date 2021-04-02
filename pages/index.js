import { Button } from '@chakra-ui/react';
import { useAuth } from '../lib/auth';
export default function Home() {
  const auth = useAuth();
  return (
    <div>
      <main>
        <h1>Fast Feedback</h1>
        <Button onClick={() => auth.signinWithGithub()}>Sign In</Button>
        <div>{auth?.user?.email}</div>
        {auth?.user && <Button onClick={() => auth.signout()}>Sign Out</Button>}
      </main>
    </div>
  );
}
