import React from 'react';
import { Outlet } from 'react-router-dom';
import { Footer, Header } from '../components';

export default function RootLayout() {
  return (
    <React.Fragment>
      <Header />
      <Outlet />
      <Footer />
    </React.Fragment>
  );
}
