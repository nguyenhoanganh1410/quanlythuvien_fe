import React from 'react';
import { Outlet } from 'react-router-dom';
import LeftNav from '@/components/LeftNav';

const Layout: React.FC = () => {
  const hasAuth = true;

  if (!hasAuth) return <React.Fragment></React.Fragment>;

  return (
    <React.Fragment>
      <div className="flex overflow-auto">
        <LeftNav />
        <div className="w-full h-full">
          <Outlet />
        </div>
      </div>
    </React.Fragment>
  );
};

export default Layout;
