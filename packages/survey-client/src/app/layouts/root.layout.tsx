import { Outlet } from 'react-router-dom';
import { Footer, Header } from '../components';

export default function RootLayout() {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}
