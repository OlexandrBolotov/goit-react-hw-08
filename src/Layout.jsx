import AppBar from './components/AppBar/AppBar';
import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <>
      <AppBar />
      <main style={{ padding: '24px' }}>
        <Outlet />
      </main>
    </>
  );
};

export default Layout;
