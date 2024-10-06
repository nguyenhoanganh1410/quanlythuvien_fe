import { FC } from 'react';
import Spinner from './Spinner';

const LoadingPage: FC = () => {
  return (
    <div className="absolute bottom-0 left-0 right-0 top-0 z-[999]">
      <Spinner />
    </div>
  );
};

export default LoadingPage;
