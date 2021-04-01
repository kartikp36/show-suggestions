import Head from 'next/head';
import styles from '../styles/Home.module.css';
import { useAuth } from '../lib/auth';
export default function Home() {
  const auth = useAuth();
  return (
    <div className={styles.container}>
      <Head>
        <title>Fast Feedback</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Fast Feedback</h1>
        <button onClick={() => auth.signinWithGithub()}>Sign In</button>
        <div>{auth?.user?.email}</div>
        {auth?.user && <button onClick={() => auth.signout()}>Sign Out</button>}
      </main>

      <footer className={styles.footer}>
        Fast Feedback demo - Lee Robinson
      </footer>
    </div>
  );
}
