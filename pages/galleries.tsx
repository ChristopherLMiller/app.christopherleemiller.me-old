import React from 'react';
import Card from '../components/Card';
import { withLayout } from '../components/layout/withLayout';
import { Main } from '../styles/Generics';

const title = `Galleries`;
const description = `A visual of all the things me!`;
const GalleriesPage = () => (
  <Main>
    <Card>
      <p>This will be a highly dynamic page containing all my galleries</p>
    </Card>
  </Main>
);

export default withLayout(
  GalleriesPage,
  title,
  description,
  true,
  `/galleries`
);
