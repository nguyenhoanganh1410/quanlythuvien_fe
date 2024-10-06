import { FC } from 'react';
import SupportCenterHeader from '../SupportCenterHeader';
import SupportCenterFooter from '../SupportCenterFooter';
import { Outlet } from 'react-router-dom';
import ChatBox from '../ChatBox';

type Props = {};

const LayoutSupport: FC<Props> = ({}) => {
  return (
    <div className="relative flex flex-col">
      <SupportCenterHeader />
      <Outlet />
      <SupportCenterFooter />
      <ChatBox />
    </div>
  );
};

export default LayoutSupport;
