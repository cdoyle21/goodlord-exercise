import dynamic from 'next/dynamic';
import { FC } from 'react';

const ReferencingForm = dynamic(() => import('../components/pages/ReferencingForm'));

const Home: FC = () => {
  return <ReferencingForm />;
};

export default Home;
