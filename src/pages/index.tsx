import { GetServerSideProps } from 'next';
import dynamic from 'next/dynamic';
import { FC } from 'react';

const ReferencingForm = dynamic(() => import('../components/pages/ReferencingForm'));

interface Props {
  REFERENCES_SERVICE_LOCATION: string | undefined;
}

export const getServerSideProps: GetServerSideProps = async ({}): Promise<{ props: Props }> => {
  try {
    const { REFERENCES_SERVICE_LOCATION } = process.env;
    return {
      props: {
        REFERENCES_SERVICE_LOCATION,
      },
    };
  } catch (error) {
    console.log('error fetching Reference page', error);
    return {
      props: {
        REFERENCES_SERVICE_LOCATION: '',
      },
    };
  }
};

const Home: FC<Props> = ({ REFERENCES_SERVICE_LOCATION }) => {
  return <ReferencingForm referenceEndpoint={REFERENCES_SERVICE_LOCATION} />;
};

export default Home;
