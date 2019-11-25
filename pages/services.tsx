import Card from '../components/Card';
import { withLayout } from '../components/layout/withLayout';
import { Main } from '../styles/Generics';
import { canAccessPage } from '../utils/functions/AuthChecker';
import { useRouter } from 'next/router';

const title = `Services`;
const description = `Services that I offer`;


export const servicesAuth = {
  isSecure: true,
  permitted: {
    groups: ['Administrator']
  }
};

const ServicesPage = () => {
  if (canAccessPage(servicesAuth)) {
    return (
      <Main>
        <Card>
          <p>
            Content will appear here of all the services that I offer, this include
            coding, maintenance, and even backups/updates for clients.
        </p>
        </Card>
      </Main>
    );
  } else {
    if (process.browser) {
      const router = useRouter();
      router.push('/unauthorized');
    }
    return null
  }
}
export default withLayout(ServicesPage, { title, description, useSEO: true, path: `/services` });
