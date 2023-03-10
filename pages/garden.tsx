import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';

import { Inter } from '@next/font/google';
import styles from '../styles/Creations.module.css';

import Header from '../components/Header';
import CreationsGrid from '../components/CreationGrid';

const inter = Inter({ subsets: ['latin'] });

export default function Garden() {
  return (
    <>
      <Head>
        <title>Eden Art</title>
        <meta name='description' content='Create & Share AI Art' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <main className={styles.main}>
        <Header />
      </main>

      <section className={styles.creationsWrapper}>
        <CreationsGrid />
      </section>
    </>
  );
}
