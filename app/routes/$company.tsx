import { Page } from '@/components/Layout';
import { useParams } from '@remix-run/react';

const Company = () => {
  const { company } = useParams();
  console.log(company);
  return (
    <Page>
      <div></div>
    </Page>
  );
};

export default Company;
