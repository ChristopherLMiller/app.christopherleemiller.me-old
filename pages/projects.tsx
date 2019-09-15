import Card from '../components/Card';
import { withLayout } from '../components/layout/withLayout';
import { Main } from '../styles/Generics';

const title = `Projects`;
const description = `Projects I have built over the years in all the languages and tech stacks I have used.`;

const ProjectsPage = () => (
  <Main>
    <Card>
      <p>
        Plans for this page include a list of the programming projects i've done
        over the years, helped with etc.
      </p>
    </Card>
  </Main>
);

export default withLayout(ProjectsPage, title, description, true, `/projects`);
