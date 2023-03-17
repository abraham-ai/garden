'use client';

import { FC, ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
}

const GardenLayout: FC<LayoutProps> = ({ children }) => {
  return <div className='garden-layout-wrapper'>{children}</div>;
};

export default GardenLayout;
