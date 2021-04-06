import Head from 'next/head';
import { Button, Link, Heading } from '@chakra-ui/react';
import { useAuth } from '../lib/auth';
export default function Home() {
  const auth = useAuth();
  return (
    <div>
      <Head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
          if (document.cookie && document.cookie.includes('fast-feedback-auth')) {
            window.location.href = "/dashboard"
          }
        `,
          }}
        />
      </Head>
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
