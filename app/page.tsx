'use client';

import React from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';

import { Inter } from 'next/font/google';
import stylesHeader from '../styles/Header.module.css';
import stylesCreationsGrid from '../styles/CreationsGrid.module.css';

import Header from './components/Header';
import CreationsGrid from './components/CreationsGrid';

const inter = Inter({ subsets: ['latin'] });

export default function Page() {
  return (
    <h1>{'Test'}</h1>
  );
}
