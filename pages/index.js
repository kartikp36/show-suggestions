import Head from 'next/head';
import { Button, Heading, Stack } from '@chakra-ui/react';

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
            window.location.href = "/sites"
          }
        `,
          }}
        />
      </Head>
      <main style={{ textAlign: 'center', margin: '8px' }}>
        <Heading>Show suggestions</Heading>
        {!auth?.user ? (
          <Stack mt="4" alignItems="center">
            <Button
              w="20%"
              backgroundColor="white"
              color="gray.900"
              fontWeight="medium"
              size="lg"
              _hover={{ bg: 'gray.100' }}
              onClick={() => auth.signinWithGoogle()}
            >
              Sign In with Google
            </Button>
            <Button
              w="20%"
              backgroundColor="gray.900"
              color="white"
              fontWeight="medium"
              size="lg"
              _hover={{ bg: 'gray.700' }}
              onClick={() => auth.signinWithGithub()}
            >
              Sign In with GitHub
            </Button>
          </Stack>
        ) : (
          <Button
            as="a"
            href="/sites"
            w="20%"
            backgroundColor="white"
            color="gray.900"
            fontWeight="medium"
            size="lg"
            _hover={{ bg: 'gray.100' }}
          >
            Take me to Homepage
          </Button>
        )}
      </main>
    </div>
  );
}
